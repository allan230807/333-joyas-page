'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBagIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-white/60 hover:text-[#d4af37] transition-colors"
      aria-label="Abrir carrito"
    >
      <ShoppingBagIcon size={24} />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
