'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

function AnimatedJewel({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          stroke="#d4af37"
          strokeWidth="2"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, 30] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="5 10"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Diamond shape */}
        <motion.path
          d="M100 40 L140 100 L100 160 L60 100 Z"
          stroke="#d4af37"
          strokeWidth="2"
          fill="none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: 'center' }}
        />
        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + Math.cos((i * Math.PI) / 4) * 80}
            cy={100 + Math.sin((i * Math.PI) / 4) * 80}
            r="2"
            fill="#d4af37"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
          />
        ))}
      </motion.svg>
    </motion.div>
  )
}

const steps = [
  {
    number: '01',
    title: 'Selección',
    description: 'Elegimos personalmente cada joya nueva, buscando las piezas con mejor acabado y pureza.',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Verificación',
    description: 'Cada pieza pasa por un riguroso control de calidad. Autenticidad y pureza garantizadas.',
    icon: '✓',
  },
  {
    number: '03',
    title: 'Publicación',
    description: 'Las joyas verificadas se publican en nuestro catálogo, listas para ti.',
    icon: '✦',
  },
]

export default function AboutSection() {
  return (
    <section className="py-32 bg-[#0a0a14] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <AnimatedJewel delay={0} />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.span
            className="text-[#d4af37] text-xs tracking-[0.4em] uppercase font-body"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nuestro Proceso
          </motion.span>
          <motion.h2
            className="text-h2 md:text-5xl text-white font-heading mt-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            De la selección a tus manos
          </motion.h2>
          <motion.p
            className="text-white/60 text-body mt-6 max-w-xl mx-auto font-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Cada joya pasa por un proceso de selección y verificación riguroso.
            <br />
            Solo las mejores piezas llegan a nuestro catálogo.
          </motion.p>
        </motion.div>

        {/* Steps with animated connection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#d4af37]/40 to-[#d4af37]/10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}

              <div className="text-center group">
                {/* Number */}
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-[#d4af37]/20 mb-8 relative"
                  whileHover={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#d4af37] text-3xl font-heading">{step.number}</span>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#d4af37]/10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h3 className="font-heading text-xl text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-body font-body leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="inline-block border border-[#d4af37]/20 px-12 py-8">
            <p className="text-white text-lg md:text-xl font-heading italic leading-relaxed">
              "Solo publicamos lo que nosotros mismos llevaríamos puestos"
            </p>
            <span className="text-[#d4af37] text-sm mt-4 block">— 333 Joyas</span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
