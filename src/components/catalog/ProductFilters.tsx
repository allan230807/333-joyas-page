'use client';

import { motion } from 'framer-motion';
import { Category } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="border-b border-border pb-6">
      <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar justify-center">
        <button
          onClick={() => onCategoryChange(null)}
          className="relative text-small uppercase tracking-widest whitespace-nowrap pb-2 px-1"
        >
          <span className={activeCategory === null ? 'text-[#0a0a14]' : 'text-muted hover:text-[#0a0a14]'}>
            Todos
          </span>
          {activeCategory === null && (
            <motion.div
              layoutId="filter-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className="relative text-small uppercase tracking-widest whitespace-nowrap pb-2 px-1"
          >
            <span className={activeCategory === category.slug ? 'text-[#0a0a14]' : 'text-muted hover:text-[#0a0a14]'}>
              {category.name}
            </span>
            {activeCategory === category.slug && (
              <motion.div
                layoutId="filter-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilters;
