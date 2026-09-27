'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CRAFT_STEPS } from '@/lib/constants'
import { Container } from '@/components/ui/Container'

export default function CraftSection() {
  const steps = CRAFT_STEPS.slice(0, 3)

  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-h2 text-primary font-heading">
            El arte de la orfebreria
          </h2>
          <p className="text-muted text-body mt-4 font-body max-w-2xl">
            Cada pieza recorre un camino de precision y dedicacion antes de llegar a tus manos
          </p>
        </motion.div>

        <div className="flex flex-col space-y-20">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1
            return (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <span className="text-accent text-small tracking-widest block mb-4 font-body">
                    0{index + 1}
                  </span>
                  <h3 className="text-h3 text-primary font-heading mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted text-body font-body">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/artesania"
            className="inline-block bg-secondary text-white px-8 py-3 font-medium hover:bg-secondary/90 transition-colors font-body"
          >
            Conocer el proceso completo
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
