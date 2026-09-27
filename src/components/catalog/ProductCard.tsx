'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0]?.url || '/placeholder.jpg'
  const imageAlt = product.images[0]?.alt || product.name
  const [isHovered, setIsHovered] = useState(false)

  const priceFormatted = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price)

  const materials = typeof product.materials === 'string'
    ? JSON.parse(product.materials)
    : product.materials

  const weaveType = Array.isArray(materials) ? materials[0] : 'Oro'

  return (
    <Link href={`/catalogo/${product.slug}`} className="group block">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Weave animation background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`weave-${product.id}`} patternUnits="userSpaceOnUse" width="20" height="20">
                <path
                  d="M0 10 Q5 5 10 10 T20 10"
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="0.5"
                  className="animate-weave"
                />
                <path
                  d="M0 10 Q5 15 10 10 T20 10"
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="0.5"
                  className="animate-weave-reverse"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#weave-${product.id})`} />
          </svg>
        </div>

        {/* Animated lines overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-accent"
              style={{
                top: `${(i + 1) * 12}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          ))}
        </motion.div>

        {/* Product image */}
        <motion.div
          className="relative z-10 h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-primary/80 backdrop-blur-sm text-white text-xs px-3 py-1 uppercase tracking-wider">
            {product.category?.name || 'Oro'}
          </span>
        </div>

        {/* Weave type indicator */}
        <motion.div
          className="absolute bottom-4 left-4 z-20"
          initial={false}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="bg-accent/90 backdrop-blur-sm text-primary text-xs px-3 py-1 font-medium">
            {weaveType}
          </span>
        </motion.div>
      </div>

      <div className="mt-4">
        <p className="text-accent text-xs uppercase tracking-widest">
          {product.category?.name || 'Oro'}
        </p>
        <h3 className="font-heading text-lg md:text-xl mt-1 text-primary group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-muted text-body">{priceFormatted}</p>
          {product.in_stock && (
            <span className="text-xs text-green-600 font-medium">En stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
