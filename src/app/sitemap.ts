import type { MetadataRoute } from 'next';
import { obtenerJoyas } from '@/lib/catalogo';
import { MARCA } from '@/lib/marca';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const joyas = await obtenerJoyas();
  const fijas = ['', '/catalogo', '/nosotros', '/legal/privacidad', '/legal/terminos'].map((ruta) => ({
    url: `${MARCA.url}${ruta}`,
    changeFrequency: 'weekly' as const,
    priority: ruta === '' ? 1 : 0.6,
  }));
  return [
    ...fijas,
    ...joyas.map((j) => ({
      url: `${MARCA.url}/catalogo/${j.slug}`,
      lastModified: new Date(j.creada_en),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
