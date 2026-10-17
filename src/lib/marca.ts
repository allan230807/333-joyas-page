// Identidad y datos de contacto de 333 Joyas. Un solo lugar para todo el sitio.

export const MARCA = {
  nombre: '333 Joyas',
  lema: 'God First',
  descripcion:
    'Joyería en oro 18k. Cadenas, pulseras y piezas pesadas frente a ti, con garantía de pureza y delivery en Caracas.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://333joyas.com',
} as const;

// Única pureza con la que se trabaja: no se ofrece ni se almacena otro quilataje.
export const QUILATES = 18;
export const PUREZA_MILESIMAS = 750; // 18/24 = 75 % de oro puro

export const CONTACTO = {
  telefono: '0424-193-3606',
  whatsapp: '584241933606',
  instagram: '333joyas',
  direccion: 'San Antonio de los Altos, Miranda, Venezuela',
  horario: 'Lunes a sábado, 9:00 a 18:00',
} as const;

export function enlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const ENLACE_INSTAGRAM = `https://instagram.com/${CONTACTO.instagram}`;

export const NAVEGACION = [
  { etiqueta: 'Inicio', href: '/' },
  { etiqueta: 'Catálogo', href: '/catalogo' },
  { etiqueta: 'Tejidos', href: '/#tejidos' },
  { etiqueta: 'Nosotros', href: '/nosotros' },
] as const;
