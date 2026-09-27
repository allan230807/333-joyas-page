'use client'

import { motion } from 'framer-motion'
import { FAQ_ITEMS } from '@/lib/constants'
import { Container } from '@/components/ui/Container'
import { Accordion } from '@/components/ui/Accordion'

export default function FAQ() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 text-center text-primary font-heading">
            Preguntas frecuentes
          </h2>
          <p className="text-muted text-body text-center mt-4 mb-12 font-body max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestras piezas y servicios
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </Container>
    </section>
  )
}
