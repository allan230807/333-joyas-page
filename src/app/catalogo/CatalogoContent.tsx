"use client";

import { useState } from "react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/constants";
import ProductFilters from "@/components/catalog/ProductFilters";
import ProductGrid from "@/components/catalog/ProductGrid";
import { motion } from "framer-motion";

const soonCategories = ["anillos", "pendientes", "pulseras", "argollas"];

export default function CatalogoContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory
    ? MOCK_PRODUCTS.filter((product) => product.category?.slug === activeCategory)
    : MOCK_PRODUCTS;

  const isSoon = activeCategory && soonCategories.includes(activeCategory);

  return (
    <div className="flex flex-col gap-8">
      {/* Filters - arriba */}
      <ProductFilters
        categories={MOCK_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Content */}
      <main className="flex-grow">
        {isSoon ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-[#d4af37] flex items-center justify-center mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[#d4af37] text-3xl">✦</span>
            </motion.div>
            <h3 className="font-heading text-3xl text-[#0a0a14] mb-4">Próximamente</h3>
            <p className="text-muted text-body">Estamos preparando estas piezas para ti.</p>
          </motion.div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </main>
    </div>
  );
}
