'use client';

import { IconoBolsa, IconoWhatsApp } from '@/components/iconos';
import { useSeleccion } from '@/components/seleccion/SeleccionContexto';
import { formatoPeso } from '@/lib/formato';
import { MARCA, QUILATES, enlaceWhatsApp } from '@/lib/marca';
import type { Joya } from '@/lib/tipos';

export default function AccionesJoya({ joya }: { joya: Joya }) {
  const { agregar, contiene, abrir } = useSeleccion();
  const elegida = contiene(joya.id);
  const mensaje = `Hola ${MARCA.nombre}, me interesa "${joya.nombre}" en oro ${QUILATES}k (${formatoPeso(
    joya.peso_gramos,
  )}). ${MARCA.url}/catalogo/${joya.slug}`;

  const whatsapp = (
    <a href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" className="boton-oro flex-1">
      <IconoWhatsApp tamano={18} /> Consultar
    </a>
  );
  const seleccion = (
    <button
      type="button"
      onClick={() => (elegida ? abrir() : agregar(joya))}
      className="boton-linea flex-1"
      aria-label={elegida ? 'Ver mi selección' : 'Añadir a mi selección'}
    >
      <IconoBolsa tamano={18} /> {elegida ? 'En tu selección' : 'Añadir'}
    </button>
  );

  return (
    <>
      <div className="mt-8 hidden gap-3 lg:flex">
        {whatsapp}
        {seleccion}
      </div>

      {/* Barra fija abajo en el teléfono: el botón de compra siempre a mano. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-noche/95 px-4 pt-3 backdrop-blur-md pb-seguro lg:hidden">
        <div className="flex gap-3">
          {seleccion}
          {whatsapp}
        </div>
      </div>
    </>
  );
}
