'use client';

import { m, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const SUAVE = [0.22, 1, 0.36, 1] as const;

export const aparecer: Variants = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: SUAVE } },
};

interface Props {
  children: ReactNode;
  className?: string;
  retraso?: number;
  /** Separación entre hijos que usen `variants={aparecer}`. */
  escalonar?: number;
  as?: 'div' | 'section' | 'ul' | 'li' | 'header';
}

// Aparece al entrar en pantalla, una sola vez. Solo anima opacity y transform,
// que el navegador resuelve en la GPU sin recalcular el diseño.
export default function Revelar({ children, className, retraso = 0, escalonar, as = 'div' }: Props) {
  const Componente = m[as];
  return (
    <Componente
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={
        escalonar
          ? { oculto: {}, visible: { transition: { staggerChildren: escalonar, delayChildren: retraso } } }
          : {
              oculto: aparecer.oculto,
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: SUAVE, delay: retraso } },
            }
      }
    >
      {children}
    </Componente>
  );
}
