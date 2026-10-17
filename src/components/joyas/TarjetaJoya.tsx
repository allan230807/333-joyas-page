import Link from 'next/link';
import FotoJoya from './FotoJoya';
import { formatoPeso, formatoPrecio } from '@/lib/formato';
import { QUILATES } from '@/lib/marca';
import { TEJIDOS } from '@/lib/tejidos';
import type { Joya } from '@/lib/tipos';

interface Props {
  joya: Joya;
  prioridad?: boolean;
  sizes?: string;
}

export default function TarjetaJoya({
  joya,
  prioridad,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
}: Props) {
  const foto = joya.fotos[0];
  const segunda = joya.fotos[1];

  return (
    <Link href={`/catalogo/${joya.slug}`} className="group block">
      <div className="relative aspect-[4/5]">
        <FotoJoya src={foto?.url ?? null} alt={joya.nombre} sizes={sizes} prioridad={prioridad} tejido={joya.tejido} className="absolute inset-0" />
        {/* En escritorio, la segunda foto aparece al pasar el cursor. */}
        {segunda && (
          <FotoJoya
            src={segunda.url}
            alt=""
            sizes={sizes}
            className="absolute inset-0 hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block"
          />
        )}
        <span className="absolute left-3 top-3 border border-oro/40 bg-noche/70 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-oro-claro backdrop-blur-sm">
          {QUILATES}k
        </span>
        {!joya.disponible && (
          <span className="absolute right-3 top-3 bg-marfil px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-noche">
            Agotada
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-oro transition-transform duration-700 ease-suave group-hover:scale-x-100" />
      </div>
      <div className="pt-4">
        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-niebla">
          {joya.categoria.nombre}
          {joya.tejido && ` · ${TEJIDOS[joya.tejido].nombre}`}
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-serif text-xl font-light leading-snug text-marfil transition-colors group-hover:text-oro-claro sm:text-2xl">
          {joya.nombre}
        </h3>
        <p className="mt-1.5 text-sm text-niebla">
          <span className="text-marfil/90">{formatoPeso(joya.peso_gramos)}</span>
          <span className="mx-2 text-linea">|</span>
          {formatoPrecio(joya.precio_usd)}
        </p>
      </div>
    </Link>
  );
}
