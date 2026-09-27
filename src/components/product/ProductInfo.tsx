import { Product } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const priceFormatted = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price)

  return (
    <div className="flex flex-col w-full font-body">
      {product.category && (
        <div className="self-start">
          <Badge variant="accent">{product.category.name}</Badge>
        </div>
      )}

      <h1 className="font-heading text-h2 text-primary mt-4">
        {product.name}
      </h1>

      <p className="text-h3 text-accent mt-4 font-heading">
        {priceFormatted}
      </p>

      <p className="text-muted text-body mt-6">
        {product.description}
      </p>

      {product.materials && product.materials.length > 0 && (
        <div className="mt-8">
          <h3 className="text-small uppercase tracking-widest text-muted mb-3">
            Materiales
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.materials.map((material, index) => (
              <Badge key={index} variant="default">
                {material}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {(product.dimensions || product.weight_grams) && (
        <div className="mt-4 flex flex-col gap-1">
          {product.dimensions && (
            <p className="text-small text-muted">
              Dimensiones: {product.dimensions}
            </p>
          )}
          {product.weight_grams && (
            <p className="text-small text-muted">
              Peso: {product.weight_grams} g
            </p>
          )}
        </div>
      )}

      <div className="mt-8">
        <Button variant="primary" className="w-full">
          Consultar disponibilidad
        </Button>
        <Button variant="secondary" className="w-full mt-3">
          Contactar por WhatsApp
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <p className="text-small">
          {product.in_stock ? (
            <span className="text-green-600">Disponible</span>
          ) : (
            <span className="text-accent">Bajo pedido</span>
          )}
        </p>
        
        {product.sku && (
          <p className="text-small text-muted mt-4">
            Ref: {product.sku}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductInfo;
