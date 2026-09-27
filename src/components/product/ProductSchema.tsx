import { Product } from '@/types'
import { SITE_URL } from '@/lib/constants'

interface ProductSchemaProps {
  product: Product
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: '333 Joyas',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/catalogo/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.price,
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ProductSchema;
