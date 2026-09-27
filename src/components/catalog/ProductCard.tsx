'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0]?.url || '/placeholder.jpg'
  const imageAlt = product.images[0]?.alt || product.name

  const priceFormatted = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price)

  return (
    <Link href={`/catalogo/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>
      <div className="mt-4">
        <p className="text-accent text-xs uppercase tracking-widest">
          {product.category?.name || 'Joyas'}
        </p>
        <h3 className="font-heading text-lg md:text-xl mt-1 text-primary group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-muted text-body mt-2">{priceFormatted}</p>
      </div>
    </Link>
  )
}

export default ProductCard;
