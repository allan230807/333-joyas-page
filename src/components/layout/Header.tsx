'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuIcon, SearchIcon } from '@/components/icons';
import { NAV_ITEMS } from '@/lib/constants';
import Container from '@/components/ui/Container';
import MobileNav from './MobileNav';
import CartButton from '@/components/cart/CartButton';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-sm border-b border-border ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="font-heading text-xl md:text-2xl text-primary">
              333 Joyas
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-small uppercase tracking-widest text-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <CartButton />
              <button
                type="button"
                className="hidden md:block text-muted hover:text-primary transition-colors"
                aria-label="Buscar"
              >
                <SearchIcon size={20} />
              </button>

              <button
                type="button"
                className="md:hidden text-primary"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Menú"
              >
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </Container>
      </header>
      
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
    </>
  );
}
