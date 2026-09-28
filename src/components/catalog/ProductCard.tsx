'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useState } from 'react'
import WeavePattern from './weavePatterns'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0]?.url || ''
  const imageAlt = product.images[0]?.alt || product.name
  const [isHovered, setIsHovered] = useState(false)

  const priceFormatted = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price)

  const materials = typeof product.materials === 'string'
    ? JSON.parse(product.materials)
    : product.materials

  const weaveType = Array.isArray(materials) && materials.length > 0 ? materials[0] : 'san-francisco'

  return (
    <Link href={`/catalogo/${product.slug}`} className="group block">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Weave pattern background - always visible, more prominent on hover */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={false}
          animate={isHovered ? { opacity: 0.6, scale: 1.05 } : { opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WeavePattern type={weaveType as never} />
        </motion.div>

        {/* Animated lines overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={false}
          animate={isHovered ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              style={{
                top: `${(i + 1) * 8}%`,
                left: '10%',
                right: '10%',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            />
          ))}
        </motion.div>

        {/* Product image */}
        {imageUrl ? (
          <motion.div
            className="relative z-20 h-full w-full"
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
        ) : (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-[#d4af37]/30 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-[#d4af37] text-2xl">✦</span>
              </motion.div>
              <p className="text-white/40 text-sm">Sin imagen</p>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-30">
          <span className="bg-[#0a0a14]/80 backdrop-blur-sm text-white text-xs px-3 py-1 uppercase tracking-wider">
            {product.category?.name || 'Oro'}
          </span>
        </div>

        {/* Weave type indicator */}
        <motion.div
          className="absolute bottom-4 left-4 z-30"
          initial={false}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="bg-[#d4af37]/90 backdrop-blur-sm text-[#0a0a14] text-xs px-3 py-1 font-medium">
            {weaveType}
          </span>
        </motion.div>
      </div>

      <div className="mt-4">
        <p className="text-[#d4af37] text-xs uppercase tracking-widest">
          {product.category?.name || 'Oro'}
        </p>
        <h3 className="font-heading text-lg md:text-xl mt-1 text-[#0a0a14] group-hover:text-[#d4af37] transition-colors duration-300">
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
