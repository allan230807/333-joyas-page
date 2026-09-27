'use client';

import Link from 'next/link';
import { CloseIcon, PhoneIcon, MailIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, CONTACT_INFO } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-white flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button
              type="button"
              onClick={onClose}
              className="text-primary hover:text-muted transition-colors"
              aria-label="Cerrar menú"
            >
              <CloseIcon size={32} />
            </button>
          </div>

          <div className="flex-1 px-6 flex flex-col justify-center gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="font-heading text-h3 text-primary py-3 border-b border-border/50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="p-6 bg-surface mt-auto">
            <h4 className="font-heading text-lg mb-4 text-primary">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 text-muted hover:text-primary text-body transition-colors">
                <PhoneIcon size={20} />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-primary text-body transition-colors">
                <MailIcon size={20} />
                <span>{CONTACT_INFO.instagram_handle}</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
