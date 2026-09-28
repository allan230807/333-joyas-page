'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function GoldParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-accent"
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

function FloatingRing({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute rounded-full border border-accent/10"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20 + delay * 5, repeat: Infinity, ease: 'linear' }}
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
            'radial-gradient(ellipse at 20% 50%, #1a1a2e 0%, #0f0f1a 100%)',
            'radial-gradient(ellipse at 80% 50%, #1a1a2e 0%, #0f0f1a 100%)',
            'radial-gradient(ellipse at 50% 20%, #1a1a2e 0%, #0f0f1a 100%)',
            'radial-gradient(ellipse at 20% 50%, #1a1a2e 0%, #0f0f1a 100%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Gold particles */}
      {[...Array(15)].map((_, i) => (
        <GoldParticle key={i} delay={i * 0.3} x={Math.random() * 100} y={Math.random() * 100} />
      ))}

      {/* Floating rings */}
      <FloatingRing delay={0} size={300} x={-5} y={10} />
      <FloatingRing delay={1} size={200} x={85} y={60} />
      <FloatingRing delay={2} size={150} x={70} y={-5} />

      {/* Content */}
      <motion.div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center" style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block text-accent text-sm md:text-base tracking-[0.4em] uppercase mb-8 font-body border border-accent/30 px-8 py-3"
            animate={{ borderColor: ['rgba(201, 169, 110, 0.3)', 'rgba(201, 169, 110, 0.6)', 'rgba(201, 169, 110, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Oro de inversión · Caracas
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
            className="inline-block bg-gradient-to-r from-accent via-[#f5e6c8] to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
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
          Tienda emergente especializada en prendas de oro de primera calidad.
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
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-accent to-[#d4b87a] text-primary px-12 py-5 font-bold text-lg overflow-hidden rounded-sm shadow-lg shadow-accent/25 transition-shadow hover:shadow-xl hover:shadow-accent/40"
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
              className="inline-flex items-center gap-3 border-2 border-accent/60 text-accent px-12 py-5 font-bold text-lg hover:bg-accent hover:text-primary transition-all duration-300 rounded-sm"
            >
              <span>WhatsApp</span>
              <span>💬</span>
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
              whileHover={{ scale: 1.1, color: 'rgba(201, 169, 110, 0.8)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="w-2 h-2 bg-accent rounded-full" />
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
            className="w-1.5 h-3 bg-accent rounded-full"
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
