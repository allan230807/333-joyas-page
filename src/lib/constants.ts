import type { NavItem, FAQItem, Testimonial, CraftStep, Product, Category } from "@/types";

export const SITE_NAME = "333 Joyas";
export const SITE_DESCRIPTION =
  "Joyeria artesanal de alta gama. Piezas unicas creadas con materiales nobles y tecnicas tradicionales de orfebreria.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://333joyas.com";

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Catalogo", href: "/catalogo" },
  { label: "Artesania", href: "/artesania" },
  { label: "Contacto", href: "#contacto" },
];

export const CONTACT_INFO = {
  phone: "+34 612 345 678",
  email: "info@333joyas.com",
  address: "Calle Gran Via 33, Madrid, Espana",
  hours: "Lunes a Sabado, 10:00 - 20:00",
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/333joyas",
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Cuales son los materiales que utilizan?",
    answer:
      "Trabajamos exclusivamente con oro de 18 quilates, plata de ley 925, platino y piedras preciosas certificadas. Cada material es seleccionado por nuestros maestros orfebres para garantizar la maxima calidad y durabilidad.",
  },
  {
    question: "Puedo solicitar una pieza personalizada?",
    answer:
      "Si. Ofrecemos un servicio completo de diseno a medida. Nuestro equipo trabajara contigo desde el boceto inicial hasta la pieza terminada. El proceso toma entre 4 y 8 semanas dependiendo de la complejidad del diseno.",
  },
  {
    question: "Cual es el plazo de entrega?",
    answer:
      "Las piezas de nuestro catalogo se envian en 3 a 5 dias habiles. Las piezas personalizadas requieren entre 4 y 8 semanas. Todos los envios incluyen seguro y seguimiento completo.",
  },
  {
    question: "Ofrecen garantia en sus piezas?",
    answer:
      "Todas nuestras joyas cuentan con una garantia de 2 anos que cubre defectos de fabricacion. Ademas, ofrecemos un servicio de mantenimiento y pulido de por vida para todas las piezas adquiridas.",
  },
  {
    question: "Como puedo cuidar mis joyas?",
    answer:
      "Recomendamos guardar cada pieza por separado en su estuche original, evitar el contacto con perfumes y productos quimicos, y retirar las joyas antes de dormir o realizar actividades fisicas. Ofrecemos servicio de limpieza profesional gratuito una vez al ano.",
  },
  {
    question: "Realizan envios internacionales?",
    answer:
      "Si, realizamos envios a toda Europa y America. Los envios internacionales se realizan mediante courier asegurado con entrega entre 5 y 10 dias habiles. Los aranceles e impuestos de importacion corren por cuenta del comprador.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Maria Gonzalez",
    location: "Madrid",
    text: "La atencion al detalle es impecable. Mi anillo de compromiso supero todas mis expectativas. Una pieza verdaderamente unica.",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos Fernandez",
    location: "Barcelona",
    text: "Encargue un collar personalizado para mi esposa y el resultado fue extraordinario. El proceso de diseno fue una experiencia en si misma.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Martinez",
    location: "Valencia",
    text: "Calidad excepcional y un servicio al cliente que refleja el lujo de sus piezas. No compraria joyeria en ningun otro lugar.",
    rating: 5,
  },
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    title: "Diseno",
    description:
      "Cada pieza comienza como un boceto a mano. Nuestros disenadores trabajan directamente con el cliente para capturar su vision y traducirla en un diseno tecnico preciso.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
    imageAlt: "Disenador creando boceto de joyeria a mano sobre papel",
  },
  {
    title: "Seleccion de materiales",
    description:
      "Seleccionamos cada gema y metal con criterios rigurosos. Solo trabajamos con proveedores certificados que garantizan el origen etico y la calidad superior de cada material.",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=800&q=80",
    imageAlt: "Seleccion de piedras preciosas sobre terciopelo negro",
  },
  {
    title: "Fundicion y forjado",
    description:
      "El metal se funde y moldea siguiendo tecnicas ancestrales combinadas con tecnologia de precision. Cada estructura se forja a mano para garantizar resistencia y perfeccion en cada curva.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800&q=80",
    imageAlt: "Orfebre trabajando metal fundido en taller de joyeria",
  },
  {
    title: "Engaste y montaje",
    description:
      "Las piedras se engarzan una a una con precision milimetrica. Este proceso requiere anos de experiencia y una mano absolutamente firme.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    imageAlt: "Detalle de engaste de piedra preciosa en anillo de oro",
  },
  {
    title: "Pulido y acabado",
    description:
      "La pieza recibe su brillo final mediante un proceso de pulido en multiples etapas. Cada joya es inspeccionada bajo lupa antes de recibir el sello de calidad 333.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    imageAlt: "Pulido final de pieza de joyeria artesanal",
  },
];

// Mock categories for development without Supabase
export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Anillos", slug: "anillos", description: "Anillos de compromiso, alianzas y piezas unicas", created_at: "2024-01-01" },
  { id: "2", name: "Collares", slug: "collares", description: "Collares y colgantes artesanales", created_at: "2024-01-01" },
  { id: "3", name: "Pendientes", slug: "pendientes", description: "Pendientes y aros de diseno exclusivo", created_at: "2024-01-01" },
  { id: "4", name: "Pulseras", slug: "pulseras", description: "Pulseras y brazaletes de alta joyeria", created_at: "2024-01-01" },
];

// Mock products for development without Supabase
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Anillo Constelacion",
    slug: "anillo-constelacion",
    description: "Anillo de oro de 18 quilates con diamantes engarzados en disposicion estelar. Cada diamante ha sido seleccionado por su pureza y brillo excepcional. La estructura del anillo recrea la constelacion de Orion, convirtiendo cada pieza en un fragmento del firmamento.",
    short_description: "Oro 18k con diamantes en disposicion estelar",
    price: 3200,
    currency: "EUR",
    category_id: "1",
    category: { id: "1", name: "Anillos", slug: "anillos", description: null, created_at: "2024-01-01" },
    materials: ["Oro 18k", "Diamantes VVS1"],
    featured: true,
    in_stock: true,
    sku: "AN-001",
    weight_grams: 8,
    dimensions: "Talla 12-20",
    images: [
      { id: "1", product_id: "1", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80", alt: "Anillo Constelacion de oro con diamantes sobre fondo oscuro", position: 0, is_primary: true },
      { id: "2", product_id: "1", url: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80", alt: "Vista lateral del Anillo Constelacion mostrando el engaste", position: 1, is_primary: false },
    ],
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: "2",
    name: "Collar Eterno",
    slug: "collar-eterno",
    description: "Collar de platino con un solitario de zafiro azul de 2 quilates. La cadena esta compuesta por eslabones forjados individualmente, creando un movimiento fluido que acompana cada gesto. El zafiro central fue extraido de las minas de Ceylan y tallado en forma de gota.",
    short_description: "Platino con solitario de zafiro azul de 2ct",
    price: 5800,
    currency: "EUR",
    category_id: "2",
    category: { id: "2", name: "Collares", slug: "collares", description: null, created_at: "2024-01-01" },
    materials: ["Platino 950", "Zafiro natural 2ct"],
    featured: true,
    in_stock: true,
    sku: "CO-001",
    weight_grams: 15,
    dimensions: "42cm + 5cm extension",
    images: [
      { id: "3", product_id: "2", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80", alt: "Collar Eterno de platino con zafiro azul sobre terciopelo", position: 0, is_primary: true },
      { id: "4", product_id: "2", url: "https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=800&q=80", alt: "Detalle del zafiro azul del Collar Eterno", position: 1, is_primary: false },
    ],
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
  },
  {
    id: "3",
    name: "Pendientes Aurora",
    slug: "pendientes-aurora",
    description: "Pendientes de oro rosa con esmeraldas colombianas y pave de diamantes. Inspirados en la aurora boreal, cada pendiente presenta una cascada de piedras que captura y refleja la luz desde multiples angulos. Cierre de presion seguro y confortable.",
    short_description: "Oro rosa con esmeraldas y pave de diamantes",
    price: 4100,
    currency: "EUR",
    category_id: "3",
    category: { id: "3", name: "Pendientes", slug: "pendientes", description: null, created_at: "2024-01-01" },
    materials: ["Oro rosa 18k", "Esmeraldas colombianas", "Diamantes"],
    featured: true,
    in_stock: true,
    sku: "PE-001",
    weight_grams: 6,
    dimensions: "3.5cm largo",
    images: [
      { id: "5", product_id: "3", url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", alt: "Pendientes Aurora de oro rosa con esmeraldas", position: 0, is_primary: true },
    ],
    created_at: "2024-02-15",
    updated_at: "2024-02-15",
  },
  {
    id: "4",
    name: "Pulsera Herencia",
    slug: "pulsera-herencia",
    description: "Pulsera articulada de oro amarillo de 18 quilates con grabado filigrana hecho enteramente a mano. Cada eslabon es trabajado individualmente siguiendo la tecnica de filigrana espanola del siglo XVIII. Una pieza que conecta el presente con siglos de tradicion orfebre.",
    short_description: "Oro 18k con grabado filigrana artesanal",
    price: 2750,
    currency: "EUR",
    category_id: "4",
    category: { id: "4", name: "Pulseras", slug: "pulseras", description: null, created_at: "2024-01-01" },
    materials: ["Oro amarillo 18k"],
    featured: true,
    in_stock: true,
    sku: "PU-001",
    weight_grams: 22,
    dimensions: "18cm + 2cm extension",
    images: [
      { id: "6", product_id: "4", url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80", alt: "Pulsera Herencia de oro con grabado filigrana artesanal", position: 0, is_primary: true },
    ],
    created_at: "2024-03-01",
    updated_at: "2024-03-01",
  },
  {
    id: "5",
    name: "Anillo Solsticio",
    slug: "anillo-solsticio",
    description: "Solitario clasico en oro blanco con diamante talla brillante de 1.5 quilates, color D, pureza IF. El engarce de seis garras permite la maxima entrada de luz, potenciando el fuego y la brillantez de la piedra. Banda pulida de 2mm para un perfil elegante y atemporal.",
    short_description: "Oro blanco 18k con diamante solitario 1.5ct D/IF",
    price: 8900,
    currency: "EUR",
    category_id: "1",
    category: { id: "1", name: "Anillos", slug: "anillos", description: null, created_at: "2024-01-01" },
    materials: ["Oro blanco 18k", "Diamante 1.5ct D/IF"],
    featured: false,
    in_stock: true,
    sku: "AN-002",
    weight_grams: 5,
    dimensions: "Talla 10-18",
    images: [
      { id: "7", product_id: "5", url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80", alt: "Anillo Solsticio solitario de oro blanco con diamante brillante", position: 0, is_primary: true },
    ],
    created_at: "2024-03-15",
    updated_at: "2024-03-15",
  },
  {
    id: "6",
    name: "Collar Bizantino",
    slug: "collar-bizantino",
    description: "Collar de oro amarillo con tejido bizantino realizado eslabón por eslabon. Una pieza atemporal que rinde homenaje a una de las tecnicas de cadena mas refinadas de la historia de la orfebreria. El peso y la fluidez del tejido lo convierten en una pieza de presencia inconfundible.",
    short_description: "Tejido bizantino en oro amarillo 18k",
    price: 3650,
    currency: "EUR",
    category_id: "2",
    category: { id: "2", name: "Collares", slug: "collares", description: null, created_at: "2024-01-01" },
    materials: ["Oro amarillo 18k"],
    featured: false,
    in_stock: true,
    sku: "CO-002",
    weight_grams: 35,
    dimensions: "45cm",
    images: [
      { id: "8", product_id: "6", url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80", alt: "Collar Bizantino de oro amarillo con tejido artesanal", position: 0, is_primary: true },
    ],
    created_at: "2024-04-01",
    updated_at: "2024-04-01",
  },
];

