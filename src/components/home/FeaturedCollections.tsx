'use client'

import { motion } from 'framer-motion'
import { MOCK_PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/catalog/ProductCard'
import AddToCartButton from '@/components/product/AddToCartButton'
import { Container } from '@/components/ui/Container'

export default function FeaturedCollections() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-24 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-body">
            Lo Más Destacado
          </span>
          <h2 className="text-h2 text-primary font-heading mt-4">
            Piezas Seleccionadas
          </h2>
          <p className="text-muted text-body mt-4 max-w-2xl mx-auto font-body">
            Las prendas más buscadas por nuestros clientes. Oro de primera calidad, listo para invertir.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <ProductCard product={product} />
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <AddToCartButton product={product} />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
