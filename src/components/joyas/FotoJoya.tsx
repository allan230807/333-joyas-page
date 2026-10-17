'use client';

import Image from 'next/image';
import { useState } from 'react';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import type { Tejido } from '@/lib/tejidos';

interface Props {
  src: string | null;
  alt: string;
  sizes: string;
  prioridad?: boolean;
  tejido?: Tejido | null;
  /** Debe incluir la posición (relative o absolute): next/image con `fill` la necesita. */
  className: string;
}

// Foto que aparece con un fundido al terminar de cargar (sin parpadeo).
// Sin foto, muestra el tejido de la pieza en líneas como marcador elegante.
export default function FotoJoya({ src, alt, sizes, prioridad, tejido, className }: Props) {
  const [cargada, setCargada] = useState(false);

  return (
    <div className={`overflow-hidden bg-carbon ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={prioridad}
          onLoad={() => setCargada(true)}
          className={`object-cover transition-[opacity,transform] duration-[1200ms] ease-suave ${
            cargada ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <TejidoAnimado tejido={tejido ?? 'rolo'} className="h-16 w-4/5 opacity-70" />
        </div>
      )}
    </div>
  );
}
