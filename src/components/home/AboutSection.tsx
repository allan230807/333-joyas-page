'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const features = [
  {
    icon: '🛡️',
    title: 'Confianza',
    description: 'Somos una tienda emergente comprometida con la transparencia y la calidad en cada transacción.',
  },
  {
    icon: '💎',
    title: 'Primera Calidad',
    description: 'Trabajamos exclusivamente con oro certificado de 18 y 14 quilates. Cada pieza incluye su garantía de pureza.',
  },
  {
    icon: '🚚',
    title: 'Delivery Personal',
    description: 'Realizamos entregas personales en Caracas para que recibas tu inversión de forma segura y directa.',
  },
  {
    icon: '📈',
    title: 'Oro como Inversión',
    description: 'El oro es uno de los activos más estables. Te asesoramos para que tu compra sea una inversión inteligente.',
  },
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            Quiénes Somos
          </span>
          <h2 className="text-h2 text-primary font-heading mt-4">
            Tu inversión en oro, en manos confiables
          </h2>
          <p className="text-muted text-body mt-6 max-w-2xl mx-auto font-body leading-relaxed">
            Somos una tienda emergente ubicada en San Antonio de los Altos, Miranda.
            Nos especializamos en la venta de prendas de oro de primera calidad,
            ofreciendo un servicio personalizado y delivery en Caracas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-heading text-xl text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted text-body font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-primary p-12 text-center"
        >
          <h3 className="text-h3 text-white font-heading mb-4">
            ¿Por qué invertir en oro?
          </h3>
          <p className="text-white/70 text-body max-w-3xl mx-auto font-body leading-relaxed">
            El oro ha sido un refugio de valor durante siglos. A diferencia de otras inversiones,
            las prendas de oro mantienen su valor en el tiempo y pueden ser revendidas fácilmente.
            En 333 Joyas te ofrecemos piezas de primera calidad con la garantía de autenticidad
            que necesitas para tu inversión.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
