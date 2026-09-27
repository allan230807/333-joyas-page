'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row w-full bg-primary overflow-hidden">
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 z-10 bg-primary"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          variants={itemVariants}
          className="text-accent text-small tracking-widest uppercase mb-6 block font-body"
        >
          Joyeria artesanal de alta gama
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-h1 text-white font-heading leading-tight"
        >
          Piezas unicas creadas para perdurar
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-white/70 text-body mt-6 font-body max-w-lg"
        >
          Cada joya es el resultado de siglos de tradicion orfebre, materiales nobles seleccionados a mano y un diseno que trasciende tendencias.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-8">
          <Link 
            href="/catalogo"
            className="inline-block bg-accent text-primary px-8 py-3 font-medium hover:bg-accent/90 transition-colors font-body"
          >
            Ver catalogo
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 md:relative md:w-1/2 h-full opacity-30 md:opacity-100 z-0">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full relative"
        >
          <Image
            src="https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=1200&q=80"
            alt="Coleccion de joyeria artesanal de alta gama"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
