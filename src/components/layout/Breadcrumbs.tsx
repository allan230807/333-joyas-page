import Link from 'next/link';
import { ChevronRight } from '@/components/icons';
import { BreadcrumbItem } from '@/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://333joyas.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-small">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {isLast || !item.href ? (
                  <span
                    className={light ? "text-white font-medium" : "text-primary font-medium"}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className={light ? "text-white/60 hover:text-accent transition-colors" : "text-muted hover:text-accent transition-colors"}
                    >
                      {item.label}
                    </Link>
                    <ChevronRight size={14} className={light ? "text-white/40" : "text-muted"} aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
