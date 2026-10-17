import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { MARCA } from '@/lib/marca';

export interface Miga {
  label: string;
  href: string;
}

// Migas de pan con su marcado de datos estructurados para buscadores.
export default function Migas({ items }: { items: Miga[] }) {
  return (
    <nav aria-label="Ruta" className="text-[0.7rem] uppercase tracking-[0.22em] text-niebla">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            item: `${MARCA.url}${item.href}`,
          })),
        }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-linea">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="line-clamp-1 text-marfil/80">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-oro-claro">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
