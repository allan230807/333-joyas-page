'use client';

/* eslint-disable @next/next/no-img-element -- vistas previas locales (blob:) y miniaturas del panel */

import { useRef } from 'react';
import { IconoCerrar, IconoMas } from '@/components/iconos';
import type { ItemFoto } from './operaciones';

interface Props {
  items: ItemFoto[];
  onCambiar: (items: ItemFoto[]) => void;
  onQuitar: (item: ItemFoto) => void;
}

const MAXIMO = 12;

// Las fotos nuevas se muestran al instante (vista previa local) y se suben
// comprimidas al guardar. La primera es la portada de la joya.
export default function EditorFotos({ items, onCambiar, onQuitar }: Props) {
  const entrada = useRef<HTMLInputElement>(null);

  const agregar = (archivos: FileList | null) => {
    if (!archivos) return;
    const nuevas: ItemFoto[] = Array.from(archivos)
      .filter((a) => a.type.startsWith('image/'))
      .slice(0, MAXIMO - items.length)
      .map((archivo) => ({
        tipo: 'nueva',
        clave: crypto.randomUUID(),
        archivo,
        vistaPrevia: URL.createObjectURL(archivo),
      }));
    onCambiar([...items, ...nuevas]);
    if (entrada.current) entrada.current.value = '';
  };

  const mover = (desde: number, hacia: number) => {
    if (hacia < 0 || hacia >= items.length) return;
    const copia = [...items];
    const [item] = copia.splice(desde, 1);
    copia.splice(hacia, 0, item);
    onCambiar(copia);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-niebla">Fotos</p>
        <p className="text-xs text-niebla">
          {items.length}/{MAXIMO} · la primera es la portada
        </p>
      </div>

      <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((item, i) => {
          const src = item.tipo === 'nueva' ? item.vistaPrevia : item.foto.url;
          const clave = item.tipo === 'nueva' ? item.clave : item.foto.id;
          return (
            <li key={clave} className="relative aspect-[4/5] overflow-hidden border border-linea bg-carbon">
              <img src={src} alt="" className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 bg-oro px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-noche">
                  Portada
                </span>
              )}
              {item.tipo === 'nueva' && (
                <span className="absolute bottom-9 left-1 bg-noche/80 px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wider text-oro-claro">
                  Nueva
                </span>
              )}
              <button
                type="button"
                onClick={() => onQuitar(item)}
                aria-label="Quitar foto"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-noche/80 text-marfil"
              >
                <IconoCerrar tamano={14} />
              </button>
              <div className="absolute inset-x-0 bottom-0 flex bg-noche/80">
                <button
                  type="button"
                  onClick={() => mover(i, i - 1)}
                  disabled={i === 0}
                  aria-label="Mover antes"
                  className="h-8 flex-1 text-sm disabled:opacity-25"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => mover(i, i + 1)}
                  disabled={i === items.length - 1}
                  aria-label="Mover después"
                  className="h-8 flex-1 text-sm disabled:opacity-25"
                >
                  →
                </button>
              </div>
            </li>
          );
        })}

        {items.length < MAXIMO && (
          <li>
            <button
              type="button"
              onClick={() => entrada.current?.click()}
              className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 border border-dashed border-oro/50 text-oro-claro transition-colors hover:bg-carbon"
            >
              <IconoMas />
              <span className="text-[0.65rem] uppercase tracking-[0.2em]">Agregar</span>
            </button>
          </li>
        )}
      </ul>

      {/* accept="image/*" en el iPhone convierte las fotos HEIC a JPEG al elegirlas. */}
      <input
        ref={entrada}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => agregar(e.target.files)}
      />
    </div>
  );
}
