'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import Revelar, { aparecer } from '@/components/movimiento/Revelar';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { LISTA_TEJIDOS, TEJIDOS } from '@/lib/tejidos';

export default function GaleriaTejidos() {
  return (
    <section id="tejidos" className="seccion border-y border-linea bg-carbon">
      <div className="contenedor">
        <Revelar className="max-w-xl">
          <p className="rotulo">Tejidos</p>
          <h2 className="titulo mt-3">Cada cadena, su propio tejido</h2>
          <p className="mt-5 text-marfil/70">
            El tejido define cómo cae la cadena, cómo refleja la luz y cuánto resiste. Toca uno para ver las piezas
            disponibles.
          </p>
        </Revelar>

        <Revelar escalonar={0.07} as="ul" className="mt-12 grid gap-px bg-linea sm:grid-cols-2 lg:grid-cols-3">
          {LISTA_TEJIDOS.map((tejido, i) => (
            <m.li key={tejido} variants={aparecer} className="bg-carbon">
              <Link href={`/catalogo?tejido=${tejido}`} className="group block p-6 sm:p-8">
                <TejidoAnimado tejido={tejido} className="h-16 w-full sm:h-20" />
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl font-light transition-colors group-hover:text-oro-claro">
                    {TEJIDOS[tejido].nombre}
                  </h3>
                  <span className="text-[0.65rem] tracking-[0.3em] text-niebla">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-niebla">{TEJIDOS[tejido].descripcion}</p>
              </Link>
            </m.li>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
