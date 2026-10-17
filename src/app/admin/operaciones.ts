'use client';

import { comprimirFoto } from '@/lib/comprimirFoto';
import { aSlug } from '@/lib/formato';
import { SELECT_JOYA, aJoya, type FilaJoya } from '@/lib/mapeo';
import { BUCKET_FOTOS } from '@/lib/supabase/config';
import { supabaseNavegador } from '@/lib/supabase/navegador';
import type { Tejido } from '@/lib/tejidos';
import type { Categoria, Joya, JoyaFoto, Nosotros } from '@/lib/tipos';

// Todas las escrituras van directo a Supabase con la sesión del administrador.
// La autorización real la hace RLS en la base (es_admin()), no este código.

export interface DatosJoya {
  nombre: string;
  descripcion: string;
  categoria_id: number;
  tejido: Tejido | null;
  peso_gramos: number;
  largo_cm: number | null;
  ancho_mm: number | null;
  precio_usd: number | null;
  disponible: boolean;
  destacada: boolean;
  publicada: boolean;
}

export type ItemFoto =
  | { tipo: 'existente'; foto: JoyaFoto }
  | { tipo: 'nueva'; clave: string; archivo: File; vistaPrevia: string };

const db = () => supabaseNavegador();

function fallar(error: { message: string } | null, contexto: string): void {
  if (error) throw new Error(`${contexto}: ${error.message}`);
}

export async function listarJoyas(): Promise<Joya[]> {
  const { data, error } = await db().from('joyas').select(SELECT_JOYA).order('creada_en', { ascending: false });
  fallar(error, 'No se pudieron cargar las joyas');
  return (data as unknown as FilaJoya[]).map(aJoya);
}

export async function listarCategorias(): Promise<Categoria[]> {
  const { data, error } = await db().from('categorias').select('id, nombre, slug, orden').order('orden');
  fallar(error, 'No se pudieron cargar las categorías');
  return data ?? [];
}

// Crea o actualiza la joya y devuelve su id. El slug sale del nombre; si ya
// existe otra joya con ese slug se agrega -2, -3...
export async function guardarJoya(datos: DatosJoya, id?: string): Promise<string> {
  if (id) {
    const { error } = await db().from('joyas').update(datos).eq('id', id);
    fallar(error, 'No se pudo guardar la joya');
    return id;
  }
  const base = aSlug(datos.nombre) || 'joya';
  for (let intento = 1; intento <= 20; intento++) {
    const slug = intento === 1 ? base : `${base}-${intento}`;
    const { data, error } = await db().from('joyas').insert({ ...datos, slug }).select('id').single();
    if (!error) return data.id as string;
    if (error.code !== '23505') fallar(error, 'No se pudo crear la joya'); // 23505 = slug repetido
  }
  throw new Error('No se encontró un nombre de enlace libre para esta joya.');
}

// Aplica la lista final de fotos: borra las quitadas, sube las nuevas
// (comprimidas) y guarda el orden. La primera es la portada.
export async function sincronizarFotos(
  joyaId: string,
  items: ItemFoto[],
  eliminadas: JoyaFoto[],
  alProgresar: (mensaje: string) => void,
): Promise<void> {
  if (eliminadas.length) {
    alProgresar('Quitando fotos…');
    const { error } = await db().from('joya_fotos').delete().in('id', eliminadas.map((f) => f.id));
    fallar(error, 'No se pudieron quitar las fotos');
    await db().storage.from(BUCKET_FOTOS).remove(eliminadas.map((f) => f.ruta));
  }

  const nuevas = items.filter((i) => i.tipo === 'nueva').length;
  let subidas = 0;
  for (let orden = 0; orden < items.length; orden++) {
    const item = items[orden];
    if (item.tipo === 'existente') {
      if (item.foto.orden !== orden) {
        const { error } = await db().from('joya_fotos').update({ orden }).eq('id', item.foto.id);
        fallar(error, 'No se pudo ordenar las fotos');
      }
      continue;
    }
    subidas++;
    alProgresar(`Subiendo foto ${subidas} de ${nuevas}…`);
    const foto = await comprimirFoto(item.archivo);
    const ruta = `${joyaId}/${crypto.randomUUID()}.${foto.extension}`;
    const { error: errorSubida } = await db()
      .storage.from(BUCKET_FOTOS)
      .upload(ruta, foto.blob, { contentType: foto.blob.type, cacheControl: '31536000', upsert: false });
    fallar(errorSubida, `No se pudo subir la foto ${subidas}`);
    const { error } = await db().from('joya_fotos').insert({ joya_id: joyaId, ruta, ancho: foto.ancho, alto: foto.alto, orden });
    if (error) {
      await db().storage.from(BUCKET_FOTOS).remove([ruta]); // no dejar archivos huérfanos
      fallar(error, `No se pudo registrar la foto ${subidas}`);
    }
  }
}

export async function borrarJoya(joya: Joya): Promise<void> {
  const { error } = await db().from('joyas').delete().eq('id', joya.id); // sus filas de fotos caen en cascada
  fallar(error, 'No se pudo borrar la joya');
  if (joya.fotos.length) await db().storage.from(BUCKET_FOTOS).remove(joya.fotos.map((f) => f.ruta));
}

export async function leerNosotros(): Promise<Nosotros | null> {
  const { data } = await db().from('nosotros').select('titulo, texto').eq('id', 1).maybeSingle();
  return data;
}

export async function guardarNosotros(nosotros: Nosotros): Promise<void> {
  const { error } = await db().from('nosotros').upsert({ id: 1, ...nosotros, actualizado_en: new Date().toISOString() });
  fallar(error, 'No se pudo guardar');
}

// Pide al servidor que regenere las páginas para que el cambio se vea ya.
export async function publicarCambios(): Promise<void> {
  await fetch('/api/revalidar', { method: 'POST' }).catch(() => undefined);
}
