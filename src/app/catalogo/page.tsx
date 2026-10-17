import type { Metadata } from 'next';
import { Suspense } from 'react';
import Migas from '@/components/disposicion/Migas';
import Revelar from '@/components/movimiento/Revelar';
import { obtenerCategorias, obtenerJoyas } from '@/lib/catalogo';
import { QUILATES } from '@/lib/marca';
import Catalogo from './Catalogo';

export const revalidate = 600;

export const metadata: Metadata = {
  title: `Catálogo en oro ${QUILATES}k`,
  description: `Cadenas, pulseras y piezas en oro ${QUILATES}k con su peso en gramos y tipo de tejido.`,
};

export default async function PaginaCatalogo() {
  const [joyas, categorias] = await Promise.all([obtenerJoyas(), obtenerCategorias()]);

  return (
    <div className="contenedor pb-24 pt-28 md:pt-36">
      <Migas items={[{ label: 'Inicio', href: '/' }, { label: 'Catálogo', href: '/catalogo' }]} />
      <Revelar className="mt-8">
        <p className="rotulo">Oro {QUILATES}k</p>
        <h1 className="titulo mt-3">Catálogo</h1>
      </Revelar>
      {/* useSearchParams necesita un límite de Suspense para generar la página. */}
      <Suspense>
        <Catalogo joyas={joyas} categorias={categorias} />
      </Suspense>
    </div>
  );
}
