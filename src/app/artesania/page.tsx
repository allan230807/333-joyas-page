'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedStep({ step, index }: { step: { title: string; description: string; icon: string }; index: number }) {
  return (
    <ScrollReveal delay={index * 0.2}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center my-20 md:my-36">
        <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
          <div className="relative aspect-square max-w-md mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full border border-[#d4af37]/20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border border-[#d4af37]/30"
              animate={{ scale: [1.05, 1, 1.05], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-7xl"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {step.icon}
              </motion.span>
            </div>
          </div>
        </div>
        <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
          <motion.span
            className="text-[#d4af37] text-sm tracking-[0.3em] font-body uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          >
            Paso {index + 1}
          </motion.span>
          <motion.h2
            className="text-h3 font-heading text-white mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          >
            {step.title}
          </motion.h2>
          <motion.p
            className="text-white/60 text-body mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          >
            {step.description}
          </motion.p>
        </div>
      </div>
    </ScrollReveal>
  );
}

const steps = [
  {
    title: 'Selección',
    description: 'Elegimos personalmente cada joya nueva, buscando las piezas con mejor acabado y pureza. Cada pieza es evaluada por nuestros expertos.',
    icon: '🔍',
  },
  {
    title: 'Verificación',
    description: 'Cada pieza pasa por un riguroso control de calidad. Autenticidad y pureza garantizadas con certificado incluido.',
    icon: '✓',
  },
  {
    title: 'Publicación',
    description: 'Las joyas verificadas se publican en nuestro catálogo, listas para ti. Solo las mejores piezas llegan a nuestra tienda.',
    icon: '✦',
  },
];

export default function ArtesaniaPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div ref={ref} className="min-h-screen bg-[#0a0a14]">
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0f1528] to-[#0a0a14]"
          style={{ y: backgroundY }}
        />

        {/* Subtle particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#d4af37]/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <Container className="relative z-10 text-center py-20">
          <motion.span
            className="text-[#d4af37] text-sm tracking-[0.4em] uppercase font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nuestro Proceso
          </motion.span>
          <motion.h1
            className="text-h2 md:text-6xl text-white font-heading mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            El arte detrás de cada pieza
          </motion.h1>
          <motion.p
            className="text-white/60 text-body mt-6 max-w-2xl mx-auto font-body leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Cada joya pasa por un proceso de selección y verificación riguroso.
            <br />
            Solo las mejores piezas llegan a nuestro catálogo.
          </motion.p>
        </Container>
      </div>

      {/* Steps */}
      <div className="py-16">
        <Container>
          {steps.map((step, index) => (
            <AnimatedStep key={step.title} step={step} index={index} />
          ))}
        </Container>
      </div>

      {/* CTA */}
      <div className="py-24">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-h3 font-heading text-white mb-6">
              Descubre el resultado de nuestra pasión
            </h2>
            <Link
              href="/catalogo"
              className="inline-block bg-[#d4af37] text-[#0a0a14] px-10 py-4 font-medium uppercase tracking-widest hover:bg-[#d4af37]/90 transition-colors"
            >
              Explorar el catálogo
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
