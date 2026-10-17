import Link from 'next/link';
import Revelar from '@/components/movimiento/Revelar';
import TarjetaJoya from '@/components/joyas/TarjetaJoya';
import { IconoFlecha } from '@/components/iconos';
import type { Joya } from '@/lib/tipos';

export default function Destacadas({ joyas }: { joyas: Joya[] }) {
  if (joyas.length === 0) return null;

  return (
    <section className="seccion">
      <div className="contenedor">
        <Revelar className="flex items-end justify-between gap-6">
          <div>
            <p className="rotulo">Colección</p>
            <h2 className="titulo mt-3">Piezas destacadas</h2>
          </div>
          <Link href="/catalogo" className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-oro-claro sm:flex">
            Ver todo <IconoFlecha tamano={16} />
          </Link>
        </Revelar>
      </div>

      {/* Teléfono: carrusel con desplazamiento nativo e imán por tarjeta.
          Escritorio: cuadrícula. */}
      <Revelar
        retraso={0.1}
        className="sin-barra mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:contenedor lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible"
      >
        {joyas.map((joya, i) => (
          <div key={joya.id} className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
            <TarjetaJoya joya={joya} prioridad={i < 2} sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 25vw" />
          </div>
        ))}
      </Revelar>

      <div className="contenedor mt-10 sm:hidden">
        <Link href="/catalogo" className="boton-linea w-full">
          Ver todo el catálogo
        </Link>
      </div>
    </section>
  );
}
