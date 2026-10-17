'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import FotoJoya from '@/components/joyas/FotoJoya';
import type { Tejido } from '@/lib/tejidos';
import type { JoyaFoto } from '@/lib/tipos';

interface Props {
  fotos: JoyaFoto[];
  nombre: string;
  tejido: Tejido | null;
}

// Teléfono: deslizamiento nativo con imán (scroll-snap), el más fluido posible
// porque lo resuelve el navegador. Escritorio: foto grande + miniaturas.
export default function GaleriaFotos({ fotos, nombre, tejido }: Props) {
  const carril = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);

  if (fotos.length === 0) {
    return <FotoJoya src={null} alt={nombre} sizes="100vw" tejido={tejido} className="relative aspect-[4/5] w-full" />;
  }

  const alDesplazar = () => {
    const el = carril.current;
    if (el) setActual(Math.round(el.scrollLeft / el.clientWidth));
  };

  const irA = (i: number) => {
    const el = carril.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
    setActual(i);
  };

  return (
    <div className="lg:grid lg:grid-cols-[72px_1fr] lg:items-start lg:gap-4 lg:self-start">
      {fotos.length > 1 && (
        <div className="hidden flex-col gap-3 lg:flex">
          {fotos.map((foto, i) => (
            <button
              key={foto.id}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative aspect-[4/5] overflow-hidden border transition-colors ${
                i === actual ? 'border-oro' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={foto.url} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <div
          ref={carril}
          onScroll={alDesplazar}
          className="sin-barra flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {fotos.map((foto, i) => (
            <div key={foto.id} className="relative w-full shrink-0 snap-center">
              <FotoJoya
                src={foto.url}
                alt={i === 0 ? nombre : `${nombre}, foto ${i + 1}`}
                sizes="(max-width: 1024px) 100vw, 55vw"
                prioridad={i === 0}
                className="absolute inset-0"
              />
            </div>
          ))}
        </div>

        {fotos.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2 lg:hidden">
            {fotos.map((foto, i) => (
              <span
                key={foto.id}
                className={`h-[3px] rounded-full transition-all duration-500 ease-suave ${
                  i === actual ? 'w-8 bg-oro-claro' : 'w-3 bg-marfil/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
