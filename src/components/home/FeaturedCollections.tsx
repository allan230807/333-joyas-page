'use client'

import { motion } from 'framer-motion'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Container } from '@/components/ui/Container'

export default function FeaturedCollections() {
  const featuredProducts = MOCK_PRODUCTS.filter(product => product.featured).slice(0, 4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 text-center text-primary font-heading">
            Colecciones
          </h2>
          <p className="text-muted text-body text-center mt-4 mb-12 font-body max-w-2xl mx-auto">
            Explora nuestras lineas de diseno exclusivo
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
