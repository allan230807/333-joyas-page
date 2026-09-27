import Link from 'next/link';
import { PhoneIcon, MailIcon, MapPinIcon } from '@/components/icons';
import { NAV_ITEMS, CONTACT_INFO, SITE_DESCRIPTION } from '@/lib/constants';
import Container from '@/components/ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-heading text-h3 text-white">
              333 Joyas
            </Link>
            <p className="text-white/70 text-body line-clamp-3">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6 text-white">Navegación</h4>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6 text-white">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/legal/privacidad"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terminos"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-6 text-white">Contacto</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                  <PhoneIcon size={20} className="shrink-0" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
                  <MailIcon size={20} className="shrink-0" />
                  <span>{CONTACT_INFO.instagram_handle}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPinIcon size={20} className="shrink-0 mt-1" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-small">
          <p>&copy; {currentYear} 333 Joyas. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
