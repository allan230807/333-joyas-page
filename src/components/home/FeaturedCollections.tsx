'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/catalog/ProductCard'
import AddToCartButton from '@/components/product/AddToCartButton'
import { Container } from '@/components/ui/Container'
import type { Product } from '@/types'

export default function FeaturedCollections() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products.filter((p: Product) => p.featured).slice(0, 4))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-sm" />
                <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants} className="group">
                <ProductCard product={product} />
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartButton product={product} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  )
}
