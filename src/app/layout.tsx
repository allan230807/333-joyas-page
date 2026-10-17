import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import '@/styles/globals.css';
import Cabecera from '@/components/disposicion/Cabecera';
import Pie from '@/components/disposicion/Pie';
import ProveedorMovimiento from '@/components/movimiento/ProveedorMovimiento';
import CajonSeleccion from '@/components/seleccion/CajonSeleccion';
import { ProveedorSeleccion } from '@/components/seleccion/SeleccionContexto';
import JsonLd from '@/components/seo/JsonLd';
import { CONTACTO, MARCA, QUILATES } from '@/lib/marca';

// next/font sirve las fuentes desde el propio dominio (sin ir a Google en cada
// visita) y evita el salto de texto mientras cargan.
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--fuente-serif',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--fuente-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(MARCA.url),
  title: {
    default: `${MARCA.nombre} · ${MARCA.lema} · Joyería en oro ${QUILATES}k`,
    template: `%s · ${MARCA.nombre}`,
  },
  description: MARCA.descripcion,
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    siteName: MARCA.nombre,
    title: `${MARCA.nombre} · ${MARCA.lema}`,
    description: MARCA.descripcion,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-[100svh] flex-col">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'JewelryStore',
            name: MARCA.nombre,
            slogan: MARCA.lema,
            url: MARCA.url,
            telephone: CONTACTO.telefono,
            address: { '@type': 'PostalAddress', streetAddress: CONTACTO.direccion, addressCountry: 'VE' },
          }}
        />
        <ProveedorMovimiento>
          <ProveedorSeleccion>
            <Cabecera />
            <main className="flex-1">{children}</main>
            <Pie />
            <CajonSeleccion />
          </ProveedorSeleccion>
        </ProveedorMovimiento>
      </body>
    </html>
  );
}
