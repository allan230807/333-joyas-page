import Link from 'next/link';
import Revelar from '@/components/movimiento/Revelar';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { IconoFlecha, IconoWhatsApp } from '@/components/iconos';
import { CONTACTO, MARCA, enlaceWhatsApp } from '@/lib/marca';
import type { Nosotros } from '@/lib/tipos';

export default function NosotrosBreve({ nosotros }: { nosotros: Nosotros }) {
  return (
    <section className="seccion border-t border-linea bg-carbon">
      <div className="contenedor grid gap-14 lg:grid-cols-2 lg:items-center">
        <Revelar>
          <p className="rotulo">Nosotros</p>
          <h2 className="titulo mt-3">{nosotros.titulo}</h2>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-marfil/75">{nosotros.texto}</p>
          <Link href="/nosotros" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-oro-claro">
            Conócenos <IconoFlecha tamano={16} />
          </Link>
        </Revelar>

        <Revelar retraso={0.15} className="border border-linea p-8 text-center sm:p-12">
          <p className="font-serif text-5xl font-light italic">
            <span className="texto-oro animate-brillo">{MARCA.lema}</span>
          </p>
          <TejidoAnimado tejido="franco" className="mx-auto mt-8 h-10 w-full max-w-xs" />
          <p className="mx-auto mt-8 max-w-xs text-sm text-niebla">{CONTACTO.horario}</p>
          <a
            href={enlaceWhatsApp('Hola 333 Joyas, quisiera agendar una cita.')}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-oro mt-6 w-full sm:w-auto"
          >
            <IconoWhatsApp tamano={18} /> Agendar una cita
          </a>
        </Revelar>
      </div>
    </section>
  );
}
