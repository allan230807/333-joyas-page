'use client';

import { useState, useEffect } from "react";
import ProductFilters from "@/components/catalog/ProductFilters";
import ProductGrid from "@/components/catalog/ProductGrid";
import { motion } from "framer-motion";
import type { Product, Category } from "@/types";

const soonCategories = ["anillos", "pendientes", "pulseras", "argollas"];

export default function CatalogoContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json()),
    ]).then(([productsData, categoriesData]) => {
      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category?.slug === activeCategory)
    : products;

  const isSoon = activeCategory && soonCategories.includes(activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Filters - arriba */}
      <ProductFilters
        categories={categories}
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
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-muted text-body">No hay productos disponibles.</p>
            <p className="text-muted/60 text-sm mt-2">Agrega productos desde el panel de administración.</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </main>
    </div>
  );
}
