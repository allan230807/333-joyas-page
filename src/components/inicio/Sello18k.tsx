'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useReducedMotion } from 'framer-motion';
import Revelar, { aparecer } from '@/components/movimiento/Revelar';
import { PUREZA_MILESIMAS, QUILATES } from '@/lib/marca';

function Contador({ hasta }: { hasta: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reducir = useReducedMotion();
  const [valor, setValor] = useState(reducir ? hasta : 0);

  useEffect(() => {
    if (!visible || reducir) return;
    const control = animate(0, hasta, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValor(Math.round(v)) });
    return () => control.stop();
  }, [visible, reducir, hasta]);

  return <span ref={ref}>{valor}</span>;
}

const PROMESAS = [
  { titulo: 'Un solo quilataje', texto: `Trabajamos exclusivamente con oro de ${QUILATES} quilates.` },
  { titulo: 'Peso exacto', texto: 'Cada pieza indica su peso en gramos, para que sepas exactamente cuánto oro llevas.' },
  { titulo: 'Garantía de pureza', texto: 'Todas las piezas incluyen garantía sobre la pureza del oro.' },
];

export default function Sello18k() {
  return (
    <section className="seccion overflow-hidden">
      <div className="contenedor grid items-center gap-14 lg:grid-cols-2">
        <Revelar className="text-center lg:text-left">
          <p className="rotulo">Nuestra promesa</p>
          <p className="mt-4 font-serif text-[clamp(7rem,34vw,15rem)] font-light leading-[0.85]">
            <span className="texto-oro animate-brillo">{QUILATES}k</span>
          </p>
          <p className="mt-6 text-marfil/70">
            <span className="font-serif text-4xl text-marfil">
              <Contador hasta={PUREZA_MILESIMAS} />
            </span>{' '}
            milésimas de oro puro en cada pieza.
          </p>
        </Revelar>

        <Revelar escalonar={0.12} as="ul" className="divide-y divide-linea border-y border-linea">
          {PROMESAS.map((p, i) => (
            <m.li key={p.titulo} variants={aparecer} className="flex gap-6 py-7">
              <span className="font-serif text-xl text-oro">0{i + 1}</span>
              <div>
                <h3 className="font-serif text-2xl font-light">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-niebla">{p.texto}</p>
              </div>
            </m.li>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
