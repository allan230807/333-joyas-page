import { cache } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SELECT_JOYA, aJoya, type FilaJoya } from './mapeo';
import { supabasePublico } from './supabase/servidor';
import type { Categoria, Joya, Nosotros } from './tipos';

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
    'Somos una joyería de San Antonio de los Altos, Miranda. Trabajamos únicamente con oro de 18 quilates y cada pieza incluye su garantía de pureza. Atención personal y delivery en Caracas.',
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
