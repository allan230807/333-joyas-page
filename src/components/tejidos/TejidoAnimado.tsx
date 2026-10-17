'use client';

import { useId, useRef, type CSSProperties } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { TEJIDOS, type Tejido } from '@/lib/tejidos';
import { DIBUJOS } from './dibujos';

const ANCHO = 240;
const ALTO = 60;
const VELOCIDAD = 10; // unidades por segundo de la deriva

interface Props {
  tejido: Tejido;
  className?: string;
  /** Grosor del trazo en px de pantalla (no se escala con el SVG). */
  grosor?: number;
}

// Dibuja el tejido en líneas finas: se revela de izquierda a derecha al entrar
// en pantalla y luego deriva despacio con un brillo dorado que lo recorre.
// Solo se anima un recorte y un desplazamiento (no cada eslabón), así se
// mantiene fluido en teléfonos; fuera de pantalla queda en pausa.
export default function TejidoAnimado({ tejido, className, grosor = 1.15 }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const visible = useInView(ref, { margin: '0px 0px -8% 0px' });
  const reducir = useReducedMotion() ?? false;
  const id = useId().replace(/:/g, '');
  const { periodo, unidad, fijas } = DIBUJOS[tejido];
  const copias = Math.ceil(ANCHO / periodo) + 3;
  const animar = visible && !reducir;

  const deriva: CSSProperties = {
    ['--periodo' as string]: `${periodo}px`,
    animationDuration: `${periodo / VELOCIDAD}s`,
    animationPlayState: animar ? 'running' : 'paused',
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Tejido ${TEJIDOS[tejido].nombre}`}
      className={className}
    >
      <defs>
        <linearGradient id={`oro-${id}`} gradientUnits="userSpaceOnUse" x1={-ANCHO} y1="0" x2={0} y2="0">
          <stop offset="0" stopColor="#9c7a3c" />
          <stop offset="0.5" stopColor="#f3dca4" />
          <stop offset="1" stopColor="#9c7a3c" />
          {animar && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to={`${ANCHO * 2} 0`}
              dur="4.5s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
        <clipPath id={`revelar-${id}`}>
          <m.rect
            x={0}
            y={0}
            height={ALTO}
            initial={{ width: reducir ? ANCHO : 0 }}
            animate={visible || reducir ? { width: ANCHO } : undefined}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          />
        </clipPath>
      </defs>

      <g
        clipPath={`url(#revelar-${id})`}
        fill="none"
        stroke={`url(#oro-${id})`}
        strokeWidth={grosor}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tejido-trazo"
      >
        {fijas}
        <g className="tejido-deriva" style={deriva}>
          {Array.from({ length: copias }, (_, k) => (
            <g key={k} transform={`translate(${(k - 1) * periodo} 0)`}>
              {unidad}
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
