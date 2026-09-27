'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductImage } from '@/types'

interface ProductGalleryProps {
  images: ProductImage[]
  productName?: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const mainImage = images[selectedIndex]

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative aspect-square md:aspect-[3/4] w-full overflow-hidden bg-surface">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {images.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 shrink-0 overflow-hidden bg-surface border-2 transition-colors duration-300 ${
                selectedIndex === index
                  ? 'border-accent'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery;
