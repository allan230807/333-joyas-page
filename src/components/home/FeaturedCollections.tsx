'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types'
import { ProductCard } from '@/components/catalog/ProductCard'
import AddToCartButton from '@/components/product/AddToCartButton'
import { Container } from '@/components/ui/Container'

interface FeaturedCollectionsProps {
  products: Product[]
}

export default function FeaturedCollections({ products }: FeaturedCollectionsProps) {
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

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => (
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
        ) : (
          <div className="text-center text-muted font-body py-8">
            <p>Próximamente nuevas piezas en nuestra colección.</p>
          </div>
        )}
      </Container>
    </section>
  )
}
