const GRAMOS = new Intl.NumberFormat('es-VE', { maximumFractionDigits: 2 });
const USD = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const formatoPeso = (gramos: number) => `${GRAMOS.format(gramos)} g`;

export const formatoPrecio = (usd: number | null) => (usd === null ? 'Precio a consultar' : USD.format(usd));

// "Cadena Cubana 60 cm" -> "cadena-cubana-60-cm"
export function aSlug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
