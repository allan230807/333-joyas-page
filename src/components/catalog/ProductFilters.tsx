'use client'

import { Category } from '@/types'

interface ProductFiltersProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="border-b border-border pb-4 mb-8">
      <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onCategoryChange(null)}
          className={`text-small uppercase tracking-widest whitespace-nowrap pb-2 ${
            activeCategory === null
              ? 'text-primary border-b-2 border-accent'
              : 'text-muted hover:text-primary'
          }`}
        >
          Todos
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className={`text-small uppercase tracking-widest whitespace-nowrap pb-2 ${
              activeCategory === category.slug
                ? 'text-primary border-b-2 border-accent'
                : 'text-muted hover:text-primary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductFilters;
