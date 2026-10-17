'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Logo from '@/components/marca/Logo';
import { IconoBolsa, IconoCerrar, IconoMenu, IconoWhatsApp } from '@/components/iconos';
import { useSeleccion } from '@/components/seleccion/SeleccionContexto';
import { CONTACTO, MARCA, NAVEGACION, enlaceWhatsApp } from '@/lib/marca';

export default function Cabecera() {
  const ruta = usePathname();
  const { piezas, abrir } = useSeleccion();
  const [conFondo, setConFondo] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 24);
    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  useEffect(() => setMenu(false), [ruta]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  // La portada del inicio tiene su propio fondo: ahí la cabecera es transparente.
  const transparente = ruta === '/' && !conFondo && !menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          transparente ? 'border-b border-transparent' : 'border-b border-linea/70 bg-noche/85 backdrop-blur-md'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="contenedor flex h-16 items-center justify-between md:h-20">
          <Logo />

          <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
            {NAVEGACION.map((item) => {
              const activo = item.href === ruta;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[0.72rem] uppercase tracking-[0.28em] transition-colors duration-300 ${
                    activo ? 'text-oro-claro' : 'text-marfil/70 hover:text-marfil'
                  }`}
                >
                  {item.etiqueta}
                  {activo && <span className="absolute -bottom-2 left-0 h-px w-full bg-oro" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={abrir}
              className="relative flex h-11 w-11 items-center justify-center text-marfil/80 transition-colors hover:text-oro-claro"
              aria-label={`Mi selección (${piezas.length})`}
            >
              <IconoBolsa tamano={21} />
              <AnimatePresence>
                {piezas.length > 0 && (
                  <m.span
                    key={piezas.length}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute right-1.5 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-oro px-1 text-[0.65rem] font-semibold text-noche"
                  >
                    {piezas.length}
                  </m.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              className="flex h-11 w-11 items-center justify-center text-marfil md:hidden"
              aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menu}
            >
              {menu ? <IconoCerrar tamano={22} /> : <IconoMenu tamano={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col bg-noche px-6 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <nav aria-label="Menú móvil" className="flex flex-col">
              {NAVEGACION.map((item, i) => (
                <m.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.06 + i * 0.06, duration: 0.6 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="flex items-center justify-between border-b border-linea py-5 font-serif text-4xl font-light text-marfil"
                  >
                    {item.etiqueta}
                    <span className="text-xs tracking-[0.3em] text-oro">0{i + 1}</span>
                  </Link>
                </m.div>
              ))}
            </nav>
            <m.div
              className="mt-auto pb-seguro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35 } }}
            >
              <p className="font-serif text-2xl italic text-oro-claro">{MARCA.lema}</p>
              <a
                href={enlaceWhatsApp('Hola 333 Joyas, quisiera información.')}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-oro mt-6 w-full"
              >
                <IconoWhatsApp tamano={18} /> {CONTACTO.telefono}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
