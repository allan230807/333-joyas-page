import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Migas from '@/components/disposicion/Migas';
import TarjetaJoya from '@/components/joyas/TarjetaJoya';
import Revelar from '@/components/movimiento/Revelar';
import JsonLd from '@/components/seo/JsonLd';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { obtenerJoya, obtenerJoyas } from '@/lib/catalogo';
import { formatoPeso, formatoPrecio } from '@/lib/formato';
import { MARCA, PUREZA_MILESIMAS, QUILATES } from '@/lib/marca';
import { TEJIDOS } from '@/lib/tejidos';
import AccionesJoya from './AccionesJoya';
import GaleriaFotos from './GaleriaFotos';

export const revalidate = 600;

interface Props {
  params: { slug: string };
}

// Pre-genera las fichas existentes; las nuevas se generan en su primera visita.
export async function generateStaticParams() {
  const joyas = await obtenerJoyas();
  return joyas.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const joya = await obtenerJoya(params.slug);
  if (!joya) return { title: 'Pieza no encontrada' };
  const descripcion = `${joya.nombre} en oro ${QUILATES}k · ${formatoPeso(joya.peso_gramos)}${
    joya.tejido ? ` · tejido ${TEJIDOS[joya.tejido].nombre}` : ''
  }`;
  return {
    title: joya.nombre,
    description: descripcion,
    alternates: { canonical: `/catalogo/${joya.slug}` },
    openGraph: {
      title: `${joya.nombre} · ${MARCA.nombre}`,
      description: descripcion,
      images: joya.fotos.slice(0, 1).map((f) => ({ url: f.url, width: f.ancho ?? undefined, height: f.alto ?? undefined })),
    },
  };
}

export default async function PaginaJoya({ params }: Props) {
  const [joya, todas] = await Promise.all([obtenerJoya(params.slug), obtenerJoyas()]);
  if (!joya) notFound();

  const relacionadas = todas.filter((j) => j.id !== joya.id && j.categoria.id === joya.categoria.id).slice(0, 4);

  const ficha = [
    ['Material', `Oro ${QUILATES}k`],
    ['Pureza', `${PUREZA_MILESIMAS} milésimas`],
    ['Peso', formatoPeso(joya.peso_gramos)],
    joya.tejido ? ['Tejido', TEJIDOS[joya.tejido].nombre] : null,
    joya.largo_cm ? ['Largo', `${joya.largo_cm} cm`] : null,
    joya.ancho_mm ? ['Ancho', `${joya.ancho_mm} mm`] : null,
  ].filter((fila): fila is string[] => fila !== null);

  return (
    <div className="pb-28 pt-16 md:pt-28 lg:pb-24">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: joya.nombre,
          description: joya.descripcion || `${joya.nombre} en oro ${QUILATES}k`,
          image: joya.fotos.map((f) => f.url),
          material: `Oro ${QUILATES}k`,
          weight: { '@type': 'QuantitativeValue', value: joya.peso_gramos, unitCode: 'GRM' },
          brand: { '@type': 'Brand', name: MARCA.nombre },
          ...(joya.precio_usd !== null && {
            offers: {
              '@type': 'Offer',
              price: joya.precio_usd,
              priceCurrency: 'USD',
              availability: joya.disponible ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              url: `${MARCA.url}/catalogo/${joya.slug}`,
            },
          }),
        }}
      />

      <div className="lg:contenedor lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <GaleriaFotos fotos={joya.fotos} nombre={joya.nombre} tejido={joya.tejido} />

        <div className="contenedor pt-8 lg:sticky lg:top-28 lg:self-start lg:px-0 lg:pt-0">
          <Migas
            items={[
              { label: 'Catálogo', href: '/catalogo' },
              { label: joya.categoria.nombre, href: `/catalogo?categoria=${joya.categoria.slug}` },
              { label: joya.nombre, href: `/catalogo/${joya.slug}` },
            ]}
          />

          <Revelar className="mt-6">
            <h1 className="font-serif text-4xl font-light leading-tight sm:text-5xl">{joya.nombre}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="border border-oro/50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-oro-claro">
                Oro {QUILATES}k
              </span>
              <span className="text-lg">{formatoPrecio(joya.precio_usd)}</span>
              {!joya.disponible && <span className="text-sm text-niebla">· Agotada, consulta disponibilidad</span>}
            </div>
          </Revelar>

          <Revelar retraso={0.1}>
            <dl className="mt-8 grid grid-cols-2 border-t border-linea">
              {ficha.map(([termino, valor]) => (
                <div key={termino} className="border-b border-linea py-4 odd:pr-4 even:border-l even:pl-4">
                  <dt className="text-[0.65rem] uppercase tracking-[0.24em] text-niebla">{termino}</dt>
                  <dd className="mt-1 font-serif text-2xl font-light">{valor}</dd>
                </div>
              ))}
            </dl>
          </Revelar>

          {joya.tejido && (
            <Revelar retraso={0.15} className="mt-8 border border-linea bg-carbon p-5">
              <p className="rotulo">Tejido {TEJIDOS[joya.tejido].nombre}</p>
              <TejidoAnimado tejido={joya.tejido} className="mt-4 h-16 w-full" />
              <p className="mt-4 text-sm leading-relaxed text-niebla">{TEJIDOS[joya.tejido].descripcion}</p>
            </Revelar>
          )}

          {joya.descripcion && (
            <p className="mt-8 whitespace-pre-line leading-relaxed text-marfil/80">{joya.descripcion}</p>
          )}

          <AccionesJoya joya={joya} />
        </div>
      </div>

      {relacionadas.length > 0 && (
        <section className="contenedor mt-24">
          <Revelar>
            <p className="rotulo">{joya.categoria.nombre}</p>
            <h2 className="mt-3 font-serif text-3xl font-light sm:text-4xl">También te puede gustar</h2>
          </Revelar>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {relacionadas.map((j) => (
              <li key={j.id}>
                <TarjetaJoya joya={j} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
