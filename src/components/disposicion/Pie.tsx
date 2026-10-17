import Link from 'next/link';
import Logo from '@/components/marca/Logo';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { IconoInstagram, IconoUbicacion, IconoWhatsApp } from '@/components/iconos';
import { CONTACTO, ENLACE_INSTAGRAM, MARCA, NAVEGACION, QUILATES, enlaceWhatsApp } from '@/lib/marca';

export default function Pie() {
  return (
    <footer className="relative mt-auto border-t border-linea bg-carbon">
      <TejidoAnimado tejido="rolo" className="pointer-events-none absolute inset-x-0 -top-px h-6 w-full opacity-40" grosor={0.9} />
      <div className="contenedor grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-6 font-serif text-3xl font-light italic text-oro-claro">{MARCA.lema}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-niebla">
            Joyería exclusivamente en oro {QUILATES}k, con garantía de pureza.
          </p>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col gap-3 text-sm">
          <p className="rotulo mb-2">Explorar</p>
          {NAVEGACION.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit text-marfil/75 transition-colors hover:text-oro-claro">
              {item.etiqueta}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <p className="rotulo mb-2">Contacto</p>
          <a
            href={enlaceWhatsApp('Hola 333 Joyas, quisiera información.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-3 text-marfil/75 transition-colors hover:text-oro-claro"
          >
            <IconoWhatsApp tamano={18} /> {CONTACTO.telefono}
          </a>
          <a
            href={ENLACE_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-3 text-marfil/75 transition-colors hover:text-oro-claro"
          >
            <IconoInstagram tamano={18} /> @{CONTACTO.instagram}
          </a>
          <p className="flex items-start gap-3 text-marfil/75">
            <IconoUbicacion tamano={18} className="mt-0.5 shrink-0" /> {CONTACTO.direccion}
          </p>
        </div>
      </div>

      <div className="border-t border-linea">
        <div className="contenedor flex flex-col gap-3 py-6 text-xs text-niebla pb-seguro sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {MARCA.nombre}. Oro {QUILATES}k.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacidad" className="hover:text-marfil">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="hover:text-marfil">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
