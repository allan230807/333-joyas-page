'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { IconoCerrar, IconoWhatsApp } from '@/components/iconos';
import { formatoPeso, formatoPrecio } from '@/lib/formato';
import { MARCA, QUILATES, enlaceWhatsApp } from '@/lib/marca';
import { useSeleccion } from './SeleccionContexto';

// Panel inferior en teléfonos y lateral en escritorio con las piezas elegidas.
export default function CajonSeleccion() {
  const { piezas, abierta, cerrar, quitar } = useSeleccion();

  useEffect(() => {
    if (!abierta) return;
    const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && cerrar();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', alTeclear);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', alTeclear);
    };
  }, [abierta, cerrar]);

  const pesoTotal = piezas.reduce((suma, p) => suma + p.peso_gramos, 0);
  const mensaje = [
    `Hola ${MARCA.nombre}, me interesan estas piezas en oro ${QUILATES}k:`,
    ...piezas.map((p) => `• ${p.nombre} (${formatoPeso(p.peso_gramos)}) ${MARCA.url}/catalogo/${p.slug}`),
    `Peso total: ${formatoPeso(pesoTotal)}`,
  ].join('\n');

  return (
    <AnimatePresence>
      {abierta && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Mi selección">
          <m.button
            type="button"
            aria-label="Cerrar"
            onClick={cerrar}
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <m.aside
            className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-2xl border-t border-linea bg-carbon md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[420px] md:rounded-none md:border-l md:border-t-0"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-linea md:hidden" />
            <div className="flex items-center justify-between px-6 pb-4 pt-5 md:pt-8">
              <div>
                <p className="rotulo">Oro {QUILATES}k</p>
                <h2 className="mt-1 font-serif text-3xl font-light">Mi selección</h2>
              </div>
              <button type="button" onClick={cerrar} className="flex h-11 w-11 items-center justify-center text-marfil/70" aria-label="Cerrar">
                <IconoCerrar />
              </button>
            </div>

            {piezas.length === 0 ? (
              <div className="px-6 pb-12 pt-6 text-center">
                <p className="text-niebla">Aún no has elegido piezas.</p>
                <Link href="/catalogo" onClick={cerrar} className="boton-linea mt-6">
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-linea overflow-y-auto overscroll-contain px-6">
                  {piezas.map((p) => (
                    <li key={p.id} className="flex items-center gap-4 py-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-noche">
                        {p.foto && <Image src={p.foto} alt={p.nombre} fill sizes="64px" className="object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link href={`/catalogo/${p.slug}`} onClick={cerrar} className="line-clamp-2 font-serif text-lg leading-tight">
                          {p.nombre}
                        </Link>
                        <p className="mt-1 text-sm text-niebla">
                          {formatoPeso(p.peso_gramos)} · {formatoPrecio(p.precio_usd)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => quitar(p.id)}
                        className="flex h-10 w-10 items-center justify-center text-niebla hover:text-marfil"
                        aria-label={`Quitar ${p.nombre}`}
                      >
                        <IconoCerrar tamano={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-linea px-6 pt-5 pb-seguro">
                  <div className="mb-4 flex justify-between text-sm">
                    <span className="text-niebla">Peso total</span>
                    <span>{formatoPeso(pesoTotal)}</span>
                  </div>
                  <a href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" className="boton-oro w-full">
                    <IconoWhatsApp tamano={18} /> Consultar por WhatsApp
                  </a>
                </div>
              </>
            )}
          </m.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
