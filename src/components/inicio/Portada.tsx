'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { IconoWhatsApp } from '@/components/iconos';
import { MARCA, QUILATES, enlaceWhatsApp } from '@/lib/marca';

const SUAVE = [0.22, 1, 0.36, 1] as const;

// Cada letra del lema sube desde una máscara, una tras otra.
function LemaAnimado({ texto }: { texto: string }) {
  return (
    <span aria-label={texto} className="inline-block">
      {texto.split('').map((letra, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <m.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: SUAVE, delay: 0.25 + i * 0.055 }}
          >
            {letra === ' ' ? ' ' : letra}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export default function Portada() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  // Al bajar, el contenido sube un poco y se desvanece (efecto de profundidad).
  // Se basa en el scroll nativo, que el navegador calcula fuera del hilo principal.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -90]);
  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Resplandor dorado muy tenue detrás del lema. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(201,164,92,0.16) 0%, rgba(11,11,12,0) 65%)' }}
      />

      <m.div style={{ y, opacity: opacidad }} className="contenedor relative z-10 pt-24 text-center">
        <m.p
          className="rotulo"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.32em' }}
          transition={{ duration: 1.4, ease: SUAVE }}
        >
          {MARCA.nombre} · Oro {QUILATES}k
        </m.p>

        <h1 className="mt-6 font-serif text-[clamp(4.5rem,24vw,11rem)] font-light italic leading-[0.9] tracking-tight">
          <span className="texto-oro animate-brillo">
            <LemaAnimado texto={MARCA.lema} />
          </span>
        </h1>

        <m.div
          aria-hidden="true"
          className="mx-auto mt-8 h-px w-40 origin-center bg-gradient-to-r from-transparent via-oro to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: SUAVE, delay: 1 }}
        />

        <m.p
          className="mx-auto mt-8 max-w-md text-[1.05rem] leading-relaxed text-marfil/75"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: SUAVE, delay: 1.15 }}
        >
          Cadenas y piezas exclusivamente en oro {QUILATES}k, con su peso exacto y garantía de pureza.
        </m.p>

        <m.div
          className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: SUAVE, delay: 1.3 }}
        >
          <Link href="/catalogo" className="boton-oro">
            Ver catálogo
          </Link>
          <a
            href={enlaceWhatsApp('Hola 333 Joyas, quisiera información sobre sus piezas en oro 18k.')}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-linea"
          >
            <IconoWhatsApp tamano={18} /> Escríbenos
          </a>
        </m.div>
      </m.div>

      {/* Cadena que se dibuja a lo ancho, al pie de la portada. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))]">
        <TejidoAnimado tejido="cubano" className="h-14 w-full opacity-80 sm:h-16" grosor={1} />
      </div>
    </section>
  );
}
