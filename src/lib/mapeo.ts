import { urlPublicaFoto } from './supabase/config';
import { esTejido } from './tejidos';
import type { Categoria, Joya, JoyaFoto } from './tipos';

// Conversión de filas de Supabase a objetos de la app. Sin dependencias de
// servidor: la usan tanto las páginas como el panel (navegador).

// Consulta única para joyas: categoría y fotos en una sola ida a la base.
export const SELECT_JOYA = `
  id, nombre, slug, descripcion, tejido, peso_gramos, largo_cm, ancho_mm,
  precio_usd, disponible, destacada, publicada, creada_en,
  categoria:categorias ( id, nombre, slug, orden ),
  fotos:joya_fotos ( id, ruta, ancho, alto, orden )
`;

export type FilaFoto = Omit<JoyaFoto, 'url'>;
export type FilaJoya = Omit<Joya, 'fotos' | 'tejido' | 'categoria'> & {
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
