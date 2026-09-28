import type { NavItem, FAQItem, Testimonial, CraftStep, Product, Category } from "@/types";

export const SESSION_COOKIE = 'joyas_session';

export const SITE_NAME = "333 Joyas";
export const SITE_DESCRIPTION =
  "Tienda emergente de prendas de oro de primera calidad. Delivery personal en Caracas. Oro como inversión.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://333joyas.com";

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/artesania" },
  { label: "Contacto", href: "#contacto" },
];

export const CONTACT_INFO = {
  phone: "04241933606",
  whatsapp: "https://wa.me/584241933606",
  instagram: "https://instagram.com/333joyas",
  instagram_handle: "@333joyas",
  address: "San Antonio de los Altos, Miranda, Venezuela",
  hours: "Lunes a Sábado, 9:00 - 18:00",
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/333joyas",
  whatsapp: "https://wa.me/584241933606",
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Qué tipo de oro venden?",
    answer:
      "Trabajamos exclusivamente con oro de 18 y 14 quilates de primera calidad. Cada pieza incluye su certificado de autenticidad y garantía de pureza.",
  },
  {
    question: "¿Hacen delivery en Caracas?",
    answer:
      "Sí, realizamos delivery personal en Caracas y zonas aledañas. El envío es gratuito para compras superiores a $500. También enviamos a todo el país mediante encomienda asegurada.",
  },
  {
    question: "¿El oro es una buena inversión?",
    answer:
      "El oro es uno de los activos más estables y seguros. A diferencia de otras joyas, las prendas de oro mantienen su valor en el tiempo y pueden ser revendidas fácilmente. Ofrecemos asesoría para que tu compra sea una inversión inteligente.",
  },
  {
    question: "¿Cómo puedo pagar?",
    answer:
      "Aceptamos transferencias bancarias, Zelle, PayPal y efectivo en nuestro punto de venta. Para delivery en Caracas, el pago puede realizarse contra entrega.",
  },
  {
    question: "¿Ofrecen garantía?",
    answer:
      "Todas nuestras prendas incluyen garantía de por vida sobre la pureza del oro. Si en algún momento deseas vender o empeñar tu pieza, te asesoramos en el proceso.",
  },
  {
    question: "¿Puedo ver las piezas antes de comprar?",
    answer:
      "Por supuesto. Coordinamos citas en nuestro punto de venta en San Antonio de los Altos para que veas y pruebes cada pieza antes de decidir. También enviamos fotos y videos por WhatsApp.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "María Rodríguez",
    location: "Caracas",
    text: "Compré un collar de oro 18k y la calidad es excepcional. El delivery fue rapidísimo y el trato muy profesional. Sin duda volveré a comprar.",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos Pérez",
    location: "Los Teques",
    text: "Invertí en varias cadenas de oro y ha sido una de las mejores decisiones. El valor se mantiene y la atención es de primera. Muy recomendado.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Martínez",
    location: "San Antonio de los Altos",
    text: "La confianza que transmiten es increíble. Me asesoraron sobre qué piezas comprar para inversión y el resultado ha sido excelente. Oro de verdad, no imitaciones.",
    rating: 5,
  },
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    title: "Selección de oro",
    description:
      "Cada pieza es seleccionada personalmente para garantizar la máxima pureza y calidad. Trabajamos solo con oro certificado de 18 y 14 quilates.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    imageAlt: "Selección de prendas de oro de primera calidad",
  },
  {
    title: "Verificación de pureza",
    description:
      "Cada prenda pasa por un riguroso proceso de verificación de pureza. Utilizamos métodos profesionales para garantizar que cada pieza cumple con los estándares más altos.",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=800&q=80",
    imageAlt: "Verificación de pureza del oro",
  },
  {
    title: "Entrega personal",
    description:
      "Realizamos delivery personal en Caracas para que recibas tu pieza de forma segura. Cada prenda se entrega en su estuche original con certificado de autenticidad.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
    imageAlt: "Entrega personal de prendas de oro",
  },
];

// Mock categories for development without Supabase
export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Anillos", slug: "anillos", description: "Anillos de oro de inversión", created_at: "2024-01-01" },
  { id: "2", name: "Collares", slug: "collares", description: "Collares de oro de primera calidad", created_at: "2024-01-01" },
  { id: "3", name: "Pendientes", slug: "pendientes", description: "Pendientes de oro", created_at: "2024-01-01" },
  { id: "4", name: "Pulseras", slug: "pulseras", description: "Pulseras de oro", created_at: "2024-01-01" },
];

// Mock products for development without Supabase
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Collar Venezolano 18k",
    slug: "collar-venezolano-18k",
    description: "Collar de oro 18 quilates con tejido venezolano tradicional. Primera calidad, ideal para inversión. Cada pieza es única y viene con certificado de autenticidad.",
    short_description: "Oro 18k tejido venezolano",
    price: 2500,
    currency: "USD",
    category_id: "2",
    category: { id: "2", name: "Collares", slug: "collares", description: null, created_at: "2024-01-01" },
    materials: ["Oro 18k"],
    featured: true,
    in_stock: true,
    sku: "CO-VZ-001",
    weight_grams: 25,
    dimensions: "45cm",
    images: [],
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: "2",
    name: "Cadena Oro Italiano",
    slug: "cadena-oro-italiano",
    description: "Cadena de oro italiano 14k con eslabones finos. Perfecta para uso diario o inversión. Diseño elegante y atemporal.",
    short_description: "Oro 14k italiano",
    price: 1800,
    currency: "USD",
    category_id: "2",
    category: { id: "2", name: "Collares", slug: "collares", description: null, created_at: "2024-01-01" },
    materials: ["Oro 14k"],
    featured: true,
    in_stock: true,
    sku: "CO-IT-001",
    weight_grams: 18,
    dimensions: "50cm",
    images: [],
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
  },
  {
    id: "3",
    name: "Anillo Clásico Oro",
    slug: "anillo-clasico-oro",
    description: "Anillo clásico de oro 18k. Diseño atemporal, primera calidad. Ideal para regalo o inversión.",
    short_description: "Oro 18k clásico",
    price: 1200,
    currency: "USD",
    category_id: "1",
    category: { id: "1", name: "Anillos", slug: "anillos", description: null, created_at: "2024-01-01" },
    materials: ["Oro 18k"],
    featured: true,
    in_stock: true,
    sku: "AN-CL-001",
    weight_grams: 8,
    dimensions: "Talla 10-20",
    images: [],
    created_at: "2024-02-15",
    updated_at: "2024-02-15",
  },
  {
    id: "4",
    name: "Pulsera Oro Brillante",
    slug: "pulsera-oro-brillante",
    description: "Pulsera de oro brillante 14k. Elegante y versátil. Perfecta para cualquier ocasión.",
    short_description: "Oro 14k brillante",
    price: 1500,
    currency: "USD",
    category_id: "4",
    category: { id: "4", name: "Pulseras", slug: "pulseras", description: null, created_at: "2024-01-01" },
    materials: ["Oro 14k"],
    featured: true,
    in_stock: true,
    sku: "PU-BR-001",
    weight_grams: 15,
    dimensions: "18cm",
    images: [],
    created_at: "2024-03-01",
    updated_at: "2024-03-01",
  },
  {
    id: "5",
    name: "Pendientes Oro Fino",
    slug: "pendientes-oro-fino",
    description: "Pendientes de oro fino 18k. Diseño minimalista y elegante.",
    short_description: "Oro 18k fino",
    price: 900,
    currency: "USD",
    category_id: "3",
    category: { id: "3", name: "Pendientes", slug: "pendientes", description: null, created_at: "2024-01-01" },
    materials: ["Oro 18k"],
    featured: false,
    in_stock: true,
    sku: "PE-FN-001",
    weight_grams: 4,
    dimensions: "2cm",
    images: [],
    created_at: "2024-03-15",
    updated_at: "2024-03-15",
  },
  {
    id: "6",
    name: "Collar Oro Premium",
    slug: "collar-oro-premium",
    description: "Collar de oro premium 18k con diseño exclusivo. Primera calidad garantizada. Ideal para inversión.",
    short_description: "Oro 18k premium",
    price: 3200,
    currency: "USD",
    category_id: "2",
    category: { id: "2", name: "Collares", slug: "collares", description: null, created_at: "2024-01-01" },
    materials: ["Oro 18k"],
    featured: false,
    in_stock: true,
    sku: "CO-PR-001",
    weight_grams: 30,
    dimensions: "48cm",
    images: [],
    created_at: "2024-04-01",
    updated_at: "2024-04-01",
  },
];
