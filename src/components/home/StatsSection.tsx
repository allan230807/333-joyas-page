'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Container } from '@/components/ui/Container'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const startTime = Date.now()

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        start = Math.floor(progress * target)
        setCount(start)
        if (progress >= 1) clearInterval(timer)
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading text-accent">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 500, suffix: '+', label: 'Clientes Satisfechos' },
  { value: 1500, suffix: '+', label: 'Piezas Vendidas' },
  { value: 18, suffix: 'k', label: 'Oro Certificado' },
  { value: 100, suffix: '%', label: 'Garantía de Pureza' },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
