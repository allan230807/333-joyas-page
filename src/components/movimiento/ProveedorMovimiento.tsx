'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

// LazyMotion + domAnimation carga solo las animaciones que usa el sitio
// (~15 kB en vez de ~34 kB): importante en datos móviles. `strict` obliga a
// usar `m.*` en lugar de `motion.*`. reducedMotion="user" respeta la opción
// "reducir movimiento" del teléfono.
export default function ProveedorMovimiento({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
