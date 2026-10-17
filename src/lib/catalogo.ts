import { cache } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { urlPublicaFoto } from './supabase/config';
import { supabasePublico } from './supabase/servidor';
import { esTejido } from './tejidos';
import type { Categoria, Joya, JoyaFoto, Nosotros } from './tipos';

// Consulta única para joyas: categoría y fotos en una sola ida a la base.
export const SELECT_JOYA = `
  id, nombre, slug, descripcion, tejido, peso_gramos, largo_cm, ancho_mm,
  precio_usd, disponible, destacada, publicada, creada_en,
  categoria:categorias ( id, nombre, slug, orden ),
  fotos:joya_fotos ( id, ruta, ancho, alto, orden )
`;

type FilaFoto = Omit<JoyaFoto, 'url'>;
type FilaJoya = Omit<Joya, 'fotos' | 'tejido' | 'categoria'> & {
  tejido: string | null;
  categoria: Categoria | Categoria[] | null;
  fotos: FilaFoto[] | null;
};

const NUMERO = (v: unknown) => (v === null || v === undefined ? null : Number(v));

export function aJoya(fila: FilaJoya): Joya {
  const categoria = Array.isArray(fila.categoria) ? fila.categoria[0] : fila.categoria;
  return {
    ...fila,
    categoria: categoria ?? { id: 0, nombre: 'Joya', slug: 'joya', orden: 0 },
    tejido: esTejido(fila.tejido) ? fila.tejido : null,
    peso_gramos: Number(fila.peso_gramos),
    largo_cm: NUMERO(fila.largo_cm),
    ancho_mm: NUMERO(fila.ancho_mm),
    precio_usd: NUMERO(fila.precio_usd),
    fotos: [...(fila.fotos ?? [])]
      .sort((a, b) => a.orden - b.orden)
      .map((f) => ({ ...f, url: urlPublicaFoto(f.ruta) })),
  };
}

async function conCliente<T>(vacio: T, consulta: (db: SupabaseClient) => Promise<T>): Promise<T> {
  const db = supabasePublico();
  if (!db) return vacio;
  try {
    return await consulta(db);
  } catch (error) {
    console.error('[catalogo]', error);
    return vacio;
  }
}

export const obtenerCategorias = cache(() =>
  conCliente<Categoria[]>([], async (db) => {
    const { data, error } = await db.from('categorias').select('id, nombre, slug, orden').order('orden');
    if (error) throw error;
    return data;
  }),
);

export const obtenerJoyas = cache(() =>
  conCliente<Joya[]>([], async (db) => {
    const { data, error } = await db
      .from('joyas')
      .select(SELECT_JOYA)
      .eq('publicada', true)
      .order('creada_en', { ascending: false });
    if (error) throw error;
    return (data as unknown as FilaJoya[]).map(aJoya);
  }),
);

export const obtenerJoya = cache((slug: string) =>
  conCliente<Joya | null>(null, async (db) => {
    const { data, error } = await db
      .from('joyas')
      .select(SELECT_JOYA)
      .eq('slug', slug)
      .eq('publicada', true)
      .maybeSingle();
    if (error) throw error;
    return data ? aJoya(data as unknown as FilaJoya) : null;
  }),
);

const NOSOTROS_POR_DEFECTO: Nosotros = {
  titulo: 'Joyería en oro 18k, hecha para durar',
  texto:
    'Somos una joyería de San Antonio de los Altos, Miranda. Trabajamos únicamente con oro de 18 quilates: cada pieza se pesa frente a ti y se entrega con su garantía de pureza. Atención personal y delivery en Caracas.',
};

export const obtenerNosotros = cache(() =>
  conCliente<Nosotros>(NOSOTROS_POR_DEFECTO, async (db) => {
    const { data, error } = await db.from('nosotros').select('titulo, texto').eq('id', 1).maybeSingle();
    if (error) throw error;
    return data ?? NOSOTROS_POR_DEFECTO;
  }),
);

// Destacadas primero; si no hay suficientes, completa con las más recientes.
export function elegirDestacadas(joyas: Joya[], cantidad: number): Joya[] {
  const destacadas = joyas.filter((j) => j.destacada);
  const resto = joyas.filter((j) => !j.destacada);
  return [...destacadas, ...resto].slice(0, cantidad);
}
