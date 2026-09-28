// In-memory database for Vercel serverless (resets on each deploy)
// For production, use a real database like Supabase or Firebase

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  currency: string;
  category_id: number;
  materials: string[];
  featured: boolean;
  in_stock: boolean;
  sku: string;
  weight_grams: number;
  dimensions: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface AboutContent {
  title: string;
  description: string;
  image: string;
  features: { icon: string; title: string; description: string }[];
  investmentTitle: string;
  investmentDescription: string;
}

// In-memory store (persists during the server's lifetime)
let products: Product[] = [];
let categories: Category[] = [
  { id: 1, name: 'Anillos', slug: 'anillos', description: 'Anillos de oro de inversión' },
  { id: 2, name: 'Collares', slug: 'collares', description: 'Collares de oro de primera calidad' },
  { id: 3, name: 'Pendientes', slug: 'pendientes', description: 'Pendientes de oro' },
  { id: 4, name: 'Pulseras', slug: 'pulseras', description: 'Pulseras de oro' },
];
let aboutContent: AboutContent = {
  title: 'Tu inversión en oro, en manos confiables',
  description: 'Somos una joyería de confianza ubicada en San Antonio de los Altos, Miranda. Nos especializamos en la venta de prendas de oro de primera calidad, ofreciendo un servicio personalizado y delivery en Caracas.',
  image: '',
  features: [
    { icon: '🛡️', title: 'Confianza', description: 'Somos una tienda emergente comprometida con la transparencia y la calidad en cada transacción.' },
    { icon: '💎', title: 'Primera Calidad', description: 'Trabajamos exclusivamente con oro certificado de 18 y 14 quilates. Cada pieza incluye su garantía de pureza.' },
    { icon: '🚚', title: 'Delivery Personal', description: 'Realizamos entregas personales en Caracas para que recibas tu inversión de forma segura y directa.' },
    { icon: '📈', title: 'Oro como Inversión', description: 'El oro es uno de los activos más estables. Te asesoramos para que tu compra sea una inversión inteligente.' },
  ],
  investmentTitle: '¿Por qué invertir en oro?',
  investmentDescription: 'El oro ha sido un refugio de valor durante siglos. A diferencia de otras inversiones, las prendas de oro mantienen su valor en el tiempo y pueden ser revendidas fácilmente. En 333 Joyas te ofrecemos piezas de primera calidad con la garantía de autenticidad que necesitas para tu inversión.',
};

// ============ PRODUCTS ============

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products.filter((p) => p.category_id === categoryId);
}

export function createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Product {
  const newProduct: Product = {
    ...data,
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id: number, data: Partial<Product>): Product | undefined {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  products[index] = {
    ...products[index],
    ...data,
    id,
    updated_at: new Date().toISOString(),
  };
  return products[index];
}

export function deleteProduct(id: number): boolean {
  const length = products.length;
  products = products.filter((p) => p.id !== id);
  return products.length < length;
}

// ============ CATEGORIES ============

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id);
}

// ============ ABOUT SECTION ============

export function getAboutContent(): AboutContent {
  return aboutContent;
}

export function updateAboutContent(data: Partial<AboutContent>): AboutContent {
  aboutContent = { ...aboutContent, ...data };
  return aboutContent;
}
