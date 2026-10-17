'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Joya } from '@/lib/tipos';

// "Mi selección": las piezas que el cliente quiere consultar. No es un carrito
// con pago: al final se envía la lista por WhatsApp. Se guarda en el navegador.

export interface PiezaSeleccionada {
  id: string;
  slug: string;
  nombre: string;
  peso_gramos: number;
  precio_usd: number | null;
  foto: string | null;
}

interface Valor {
  piezas: PiezaSeleccionada[];
  abierta: boolean;
  abrir: () => void;
  cerrar: () => void;
  agregar: (joya: Joya) => void;
  quitar: (id: string) => void;
  contiene: (id: string) => boolean;
}

const Contexto = createContext<Valor | null>(null);
const CLAVE = '333joyas:seleccion';

export function ProveedorSeleccion({ children }: { children: ReactNode }) {
  const [piezas, setPiezas] = useState<PiezaSeleccionada[]>([]);
  const [abierta, setAbierta] = useState(false);
  const [cargada, setCargada] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setPiezas(JSON.parse(guardado));
    } catch {
      // Almacenamiento no disponible (modo privado): la selección vive solo en memoria.
    }
    setCargada(true);
  }, []);

  useEffect(() => {
    if (!cargada) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(piezas));
    } catch {
      // Ídem.
    }
  }, [piezas, cargada]);

  const agregar = useCallback((joya: Joya) => {
    setPiezas((actuales) =>
      actuales.some((p) => p.id === joya.id)
        ? actuales
        : [
            ...actuales,
            {
              id: joya.id,
              slug: joya.slug,
              nombre: joya.nombre,
              peso_gramos: joya.peso_gramos,
              precio_usd: joya.precio_usd,
              foto: joya.fotos[0]?.url ?? null,
            },
          ],
    );
    setAbierta(true);
  }, []);

  const valor = useMemo<Valor>(
    () => ({
      piezas,
      abierta,
      abrir: () => setAbierta(true),
      cerrar: () => setAbierta(false),
      agregar,
      quitar: (id) => setPiezas((actuales) => actuales.filter((p) => p.id !== id)),
      contiene: (id) => piezas.some((p) => p.id === id),
    }),
    [piezas, abierta, agregar],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSeleccion(): Valor {
  const valor = useContext(Contexto);
  if (!valor) throw new Error('useSeleccion debe usarse dentro de <ProveedorSeleccion>');
  return valor;
}
