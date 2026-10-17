import type { Metadata } from 'next';
import Migas from '@/components/disposicion/Migas';
import Revelar from '@/components/movimiento/Revelar';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { IconoInstagram, IconoUbicacion, IconoWhatsApp } from '@/components/iconos';
import { obtenerNosotros } from '@/lib/catalogo';
import { CONTACTO, ENLACE_INSTAGRAM, MARCA, QUILATES, enlaceWhatsApp } from '@/lib/marca';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `${MARCA.nombre}: joyería exclusivamente en oro ${QUILATES}k en San Antonio de los Altos, Miranda.`,
};

export default async function PaginaNosotros() {
  const nosotros = await obtenerNosotros();

  return (
    <div className="pb-24 pt-28 md:pt-36">
      <div className="contenedor">
        <Migas items={[{ label: 'Inicio', href: '/' }, { label: 'Nosotros', href: '/nosotros' }]} />

        <Revelar className="mx-auto mt-16 max-w-3xl text-center">
          <p className="rotulo">Nosotros</p>
          <h1 className="titulo mt-4">{nosotros.titulo}</h1>
          <TejidoAnimado tejido="gucci" className="mx-auto mt-10 h-12 w-full max-w-md" />
          <p className="mt-10 whitespace-pre-line text-lg leading-relaxed text-marfil/80">{nosotros.texto}</p>
        </Revelar>

        <Revelar retraso={0.1} className="mx-auto mt-20 max-w-3xl border-y border-linea py-14 text-center">
          <p className="font-serif text-[clamp(3.5rem,14vw,7rem)] font-light italic leading-none">
            <span className="texto-oro animate-brillo">{MARCA.lema}</span>
          </p>
          <p className="mx-auto mt-6 max-w-md text-niebla">
            Es nuestro lema y la forma en que trabajamos: con honestidad en cada gramo de oro {QUILATES}k que entregamos.
          </p>
        </Revelar>

        <Revelar retraso={0.15} className="mx-auto mt-16 grid max-w-3xl gap-px bg-linea sm:grid-cols-3">
          <a
            href={enlaceWhatsApp('Hola 333 Joyas, quisiera información.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-noche p-8 text-center transition-colors hover:bg-carbon"
          >
            <IconoWhatsApp className="text-oro" />
            <span className="text-sm">{CONTACTO.telefono}</span>
          </a>
          <a
            href={ENLACE_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-noche p-8 text-center transition-colors hover:bg-carbon"
          >
            <IconoInstagram className="text-oro" />
            <span className="text-sm">@{CONTACTO.instagram}</span>
          </a>
          <div className="flex flex-col items-center gap-3 bg-noche p-8 text-center">
            <IconoUbicacion className="text-oro" />
            <span className="text-sm">{CONTACTO.direccion}</span>
          </div>
        </Revelar>
      </div>
    </div>
  );
}
