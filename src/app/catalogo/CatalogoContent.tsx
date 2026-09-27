"use client";

import { useState } from "react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/constants";
import ProductFilters from "@/components/catalog/ProductFilters";
import ProductGrid from "@/components/catalog/ProductGrid";

export default function CatalogoContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory
    ? MOCK_PRODUCTS.filter((product) => product.category?.slug === activeCategory)
    : MOCK_PRODUCTS;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 flex-shrink-0">
        <ProductFilters
          categories={MOCK_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </aside>
      <main className="flex-grow">
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
