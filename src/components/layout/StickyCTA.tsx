'use client';

import { PhoneIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-4 py-3 block md:hidden"
    >
      <Button
        variant="primary"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => window.location.href = `tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`}
      >
        <PhoneIcon size={20} />
        <span>Consultar disponibilidad</span>
      </Button>
    </motion.div>
  );
}
