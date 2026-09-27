'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { XIcon, PlusIcon, MinusIcon, TrashIcon } from '@/components/icons';

// Product ID can be number (from JSON db) or string (from Supabase type)
type ProductId = number | string;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  const handleUpdateQuantity = (productId: ProductId, quantity: number) => {
    updateQuantity(Number(productId), quantity);
  };

  const handleRemoveItem = (productId: ProductId) => {
    removeItem(Number(productId));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(price);

  const handleWhatsApp = () => {
    const message = items
      .map((i) => `• ${i.product.name} x${i.quantity} - ${formatPrice(i.product.price * i.quantity)}`)
      .join('\n');
    const fullMessage = `Hola 333 Joyas, me interesa comprar:\n\n${message}\n\nTotal: ${formatPrice(totalPrice)}`;
    window.open(`https://wa.me/584241933606?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-xl text-primary">Tu Carrito</h2>
              <button
                onClick={closeCart}
                className="p-2 text-muted hover:text-primary transition-colors"
              >
                <XIcon size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-20 bg-gray-100 overflow-hidden shrink-0">
                        {item.product.images[0]?.url && (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-primary truncate">{item.product.name}</h3>
                        <p className="text-accent font-medium mt-1">{formatPrice(item.product.price)}</p>

                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 border border-border flex items-center justify-center hover:bg-gray-50"
                          >
                            <MinusIcon size={14} />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 border border-border flex items-center justify-center hover:bg-gray-50"
                          >
                            <PlusIcon size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 self-start"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Total</span>
                  <span className="font-heading text-2xl text-primary">{formatPrice(totalPrice)}</span>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 text-white py-4 font-medium uppercase tracking-widest hover:bg-green-700 transition-colors"
                >
                  Comprar por WhatsApp
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-muted hover:text-red-600 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
