'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const goldParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 2,
}))

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      {/* Animated gold particles */}
      {goldParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-body border border-accent/30 px-6 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Oro de inversión · Caracas
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl text-white font-heading leading-tight mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Tu patrimonio en{' '}
          <motion.span
            className="text-accent inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            oro
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Tienda emergente especializada en prendas de oro de primera calidad.
          Delivery personal en Caracas. Compra, vende o invierte con confianza.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link
            href="/catalogo"
            className="group relative inline-flex items-center gap-2 bg-accent text-primary px-10 py-4 font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            <span className="relative z-10">Ver Catálogo</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <Link
            href="https://wa.me/584241933606"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-accent/50 text-accent px-10 py-4 font-medium text-lg hover:bg-accent hover:text-primary transition-all duration-300"
          >
            WhatsApp Directo
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {['Oro 18k certificado', 'Delivery personal', 'Precios de inversión'].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom image strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=1920&q=80"
          alt="Oro de inversión"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-accent rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
