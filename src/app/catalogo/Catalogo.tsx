'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { m } from 'framer-motion';
import TarjetaJoya from '@/components/joyas/TarjetaJoya';
import { TEJIDOS, esTejido, type Tejido } from '@/lib/tejidos';
import type { Categoria, Joya } from '@/lib/tipos';

interface Props {
  joyas: Joya[];
  categorias: Categoria[];
}

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`chip ${activo ? 'border-oro bg-oro text-noche' : 'border-linea text-marfil/75 hover:border-oro/60'}`}
    >
      {children}
    </button>
  );
}

// Filtros en la URL (?categoria=cadenas&tejido=cubano): se pueden compartir y
// el botón "atrás" del teléfono los respeta.
export default function Catalogo({ joyas, categorias }: Props) {
  const router = useRouter();
  const ruta = usePathname();
  const parametros = useSearchParams();
  const categoria = parametros.get('categoria');
  const tejidoParam = parametros.get('tejido');
  const tejido: Tejido | null = esTejido(tejidoParam) ? tejidoParam : null;

  const fijar = (clave: 'categoria' | 'tejido', valor: string | null) => {
    const siguiente = new URLSearchParams(parametros.toString());
    if (valor) siguiente.set(clave, valor);
    else siguiente.delete(clave);
    const consulta = siguiente.toString();
    router.replace(consulta ? `${ruta}?${consulta}` : ruta, { scroll: false });
  };

  // Solo se ofrecen las categorías y tejidos que tienen piezas.
  const categoriasConPiezas = categorias.filter((c) => joyas.some((j) => j.categoria.slug === c.slug));
  const tejidosConPiezas = useMemo(
    () => (Object.keys(TEJIDOS) as Tejido[]).filter((t) => joyas.some((j) => j.tejido === t)),
    [joyas],
  );

  const visibles = joyas.filter(
    (j) => (!categoria || j.categoria.slug === categoria) && (!tejido || j.tejido === tejido),
  );

  if (joyas.length === 0) {
    return (
      <div className="mt-16 border border-linea px-6 py-20 text-center">
        <p className="font-serif text-3xl font-light">Muy pronto</p>
        <p className="mx-auto mt-3 max-w-sm text-niebla">Estamos fotografiando las piezas. Escríbenos y te mostramos lo disponible.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="sticky top-16 z-20 -mx-5 space-y-3 border-b border-linea bg-noche/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 md:top-20">
        {categoriasConPiezas.length > 1 && (
          <div className="sin-barra flex gap-2 overflow-x-auto">
            <Chip activo={!categoria} onClick={() => fijar('categoria', null)}>
              Todo
            </Chip>
            {categoriasConPiezas.map((c) => (
              <Chip key={c.slug} activo={categoria === c.slug} onClick={() => fijar('categoria', c.slug)}>
                {c.nombre}
              </Chip>
            ))}
          </div>
        )}
        {tejidosConPiezas.length > 0 && (
          <div className="sin-barra flex gap-2 overflow-x-auto">
            <Chip activo={!tejido} onClick={() => fijar('tejido', null)}>
              Todos los tejidos
            </Chip>
            {tejidosConPiezas.map((t) => (
              <Chip key={t} activo={tejido === t} onClick={() => fijar('tejido', t)}>
                {TEJIDOS[t].nombre}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.24em] text-niebla">
        {visibles.length} {visibles.length === 1 ? 'pieza' : 'piezas'}
      </p>

      {visibles.length === 0 ? (
        <p className="py-20 text-center text-niebla">No hay piezas con esos filtros.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
          {visibles.map((joya, i) => (
            <m.li
              key={`${categoria}-${tejido}-${joya.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(i, 8) * 0.05 }}
            >
              <TarjetaJoya joya={joya} prioridad={i < 4} />
            </m.li>
          ))}
        </ul>
      )}
    </div>
  );
}
