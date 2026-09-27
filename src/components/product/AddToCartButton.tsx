'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  return (
    <motion.button
      onClick={handleAdd}
      disabled={!product.in_stock}
      className={`relative w-full py-3 font-medium uppercase tracking-widest transition-all duration-300 overflow-hidden ${
        product.in_stock
          ? 'bg-accent text-primary hover:bg-accent/90'
          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
      } ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        key={added ? 'added' : 'add'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        {added ? '✓ Agregado' : product.in_stock ? 'Agregar al Carrito' : 'Agotado'}
      </motion.span>
    </motion.button>
  );
}
