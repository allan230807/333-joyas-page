'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function GoldParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#d4af37]"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, #0a0a14 0%, #050508 100%)',
            'radial-gradient(ellipse at 80% 50%, #0a0a14 0%, #050508 100%)',
            'radial-gradient(ellipse at 50% 20%, #0a0a14 0%, #050508 100%)',
            'radial-gradient(ellipse at 20% 50%, #0a0a14 0%, #050508 100%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Gold particles */}
      {[...Array(20)].map((_, i) => (
        <GoldParticle key={i} delay={i * 0.2} x={Math.random() * 100} y={Math.random() * 100} />
      ))}

      {/* Content */}
      <motion.div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center" style={{ y, opacity }}>
        {/* Small brand name above */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-[#d4af37] text-sm tracking-[0.5em] uppercase font-heading">
            333 Joyas
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block text-[#d4af37] text-sm md:text-base tracking-[0.3em] uppercase mb-8 font-body border border-[#d4af37]/30 px-8 py-3"
            animate={{ borderColor: ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.6)', 'rgba(212, 175, 55, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tu joyería de confianza
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl text-white font-heading leading-tight mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Tu patrimonio en{' '}
          <motion.span
            className="inline-block bg-gradient-to-r from-[#d4af37] via-[#f5e6c8] to-[#d4af37] bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            oro
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-white/80 text-xl md:text-2xl max-w-3xl mx-auto mb-14 font-body leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Prendas de oro de la más alta calidad, seleccionadas y verificadas por expertos.
          <br className="hidden md:block" />
          Delivery personal en Caracas. Compra, vende o invierte con confianza.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/catalogo"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#e6c87a] text-[#0a0a14] px-12 py-5 font-bold text-lg overflow-hidden rounded-sm shadow-lg shadow-[#d4af37]/25 transition-shadow hover:shadow-xl hover:shadow-[#d4af37]/40"
            >
              <span className="relative z-10">Ver Catálogo</span>
              <motion.span className="relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                →
              </motion.span>
              <motion.div className="absolute inset-0 bg-white/20" initial={{ x: '-100%' }} whileHover={{ x: '0%' }} transition={{ duration: 0.3 }} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://wa.me/584241933606"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-[#d4af37]/60 text-[#d4af37] px-12 py-5 font-bold text-lg hover:bg-[#d4af37] hover:text-[#0a0a14] transition-all duration-300 rounded-sm"
            >
              <span>WhatsApp</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-10 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {['Oro 18k certificado', 'Delivery personal', 'Precios de inversión', 'Garantía de pureza'].map((badge) => (
            <motion.span
              key={badge}
              className="flex items-center gap-2 cursor-default"
              whileHover={{ scale: 1.1, color: 'rgba(212, 175, 55, 0.8)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="w-2 h-2 bg-[#d4af37] rounded-full" />
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center pt-3">
          <motion.div
            className="w-1.5 h-3 bg-[#d4af37] rounded-full"
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
