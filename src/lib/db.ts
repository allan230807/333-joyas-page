import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const ABOUT_FILE = path.join(DATA_DIR, 'about.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize JSON files if they don't exist
function ensureFile(filePath: string, defaultData: unknown) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

// Initialize data files
function initializeData() {
  // Users - always ensure admin exists with correct password hash
  const bcrypt = require('bcryptjs');
  const adminHash = bcrypt.hashSync('Akira100*', 10);
  ensureFile(USERS_FILE, [
    {
      id: 1,
      email: 'ararciahurtado@gmail.com',
      password_hash: adminHash,
      role: 'admin',
      created_at: new Date().toISOString(),
    },
  ]);

  // Update admin password if hash is invalid
  const users = getUsers();
  const admin = users.find((u) => u.email === 'ararciahurtado@gmail.com');
  if (admin && admin.password_hash === '$2a$10$placeholder') {
    admin.password_hash = adminHash;
    writeJson(USERS_FILE, users);
  }

  // Categories
  ensureFile(CATEGORIES_FILE, [
    { id: 1, name: 'Anillos', slug: 'anillos', description: 'Anillos de oro de inversión' },
    { id: 2, name: 'Collares', slug: 'collares', description: 'Collares de oro de primera calidad' },
    { id: 3, name: 'Pendientes', slug: 'pendientes', description: 'Pendientes de oro' },
    { id: 4, name: 'Pulseras', slug: 'pulseras', description: 'Pulseras de oro' },
  ]);

  // Products
  ensureFile(PRODUCTS_FILE, [
    {
      id: 1,
      name: 'Collar Venezolano 18k',
      slug: 'collar-venezolano-18k',
      description: 'Collar de oro 18 quilates con tejido venezolano tradicional. Primera calidad, ideal para inversión.',
      short_description: 'Oro 18k tejido venezolano',
      price: 2500,
      currency: 'USD',
      category_id: 2,
      materials: ['Oro 18k'],
      featured: true,
      in_stock: true,
      sku: 'CO-VZ-001',
      weight_grams: 25,
      dimensions: '45cm',
      images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Cadena Oro Italiano',
      slug: 'cadena-oro-italiano',
      description: 'Cadena de oro italiano 14k con eslabones finos. Perfecta para uso diario o inversión.',
      short_description: 'Oro 14k italiano',
      price: 1800,
      currency: 'USD',
      category_id: 2,
      materials: ['Oro 14k'],
      featured: true,
      in_stock: true,
      sku: 'CO-IT-001',
      weight_grams: 18,
      dimensions: '50cm',
      images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Anillo Clásico Oro',
      slug: 'anillo-clasico-oro',
      description: 'Anillo clásico de oro 18k. Diseño atemporal, primera calidad.',
      short_description: 'Oro 18k clásico',
      price: 1200,
      currency: 'USD',
      category_id: 1,
      materials: ['Oro 18k'],
      featured: true,
      in_stock: true,
      sku: 'AN-CL-001',
      weight_grams: 8,
      dimensions: 'Talla 10-20',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Pulsera Oro Brillante',
      slug: 'pulsera-oro-brillante',
      description: 'Pulsera de oro brillante 14k. Elegante y versátil.',
      short_description: 'Oro 14k brillante',
      price: 1500,
      currency: 'USD',
      category_id: 4,
      materials: ['Oro 14k'],
      featured: true,
      in_stock: true,
      sku: 'PU-BR-001',
      weight_grams: 15,
      dimensions: '18cm',
      images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Pendientes Oro Fino',
      slug: 'pendientes-oro-fino',
      description: 'Pendientes de oro fino 18k. Diseño minimalista.',
      short_description: 'Oro 18k fino',
      price: 900,
      currency: 'USD',
      category_id: 3,
      materials: ['Oro 18k'],
      featured: false,
      in_stock: true,
      sku: 'PE-FN-001',
      weight_grams: 4,
      dimensions: '2cm',
      images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 6,
      name: 'Collar Oro Premium',
      slug: 'collar-oro-premium',
      description: 'Collar de oro premium 18k con diseño exclusivo. Primera calidad garantizada.',
      short_description: 'Oro 18k premium',
      price: 3200,
      currency: 'USD',
      category_id: 2,
      materials: ['Oro 18k'],
      featured: false,
      in_stock: true,
      sku: 'CO-PR-001',
      weight_grams: 30,
      dimensions: '48cm',
      images: ['https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=800&q=80'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  // About section
  ensureFile(ABOUT_FILE, {
    title: 'Tu inversión en oro, en manos confiables',
    description: 'Somos una tienda emergente ubicada en San Antonio de los Altos, Miranda. Nos especializamos en la venta de prendas de oro de primera calidad, ofreciendo un servicio personalizado y delivery en Caracas.',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d729e2e2?w=1200&q=80',
    features: [
      { icon: '🛡️', title: 'Confianza', description: 'Somos una tienda emergente comprometida con la transparencia y la calidad en cada transacción.' },
      { icon: '💎', title: 'Primera Calidad', description: 'Trabajamos exclusivamente con oro certificado de 18 y 14 quilates. Cada pieza incluye su garantía de pureza.' },
      { icon: '🚚', title: 'Delivery Personal', description: 'Realizamos entregas personales en Caracas para que recibas tu inversión de forma segura y directa.' },
      { icon: '📈', title: 'Oro como Inversión', description: 'El oro es uno de los activos más estables. Te asesoramos para que tu compra sea una inversión inteligente.' },
    ],
    investmentTitle: '¿Por qué invertir en oro?',
    investmentDescription: 'El oro ha sido un refugio de valor durante siglos. A diferencia de otras inversiones, las prendas de oro mantienen su valor en el tiempo y pueden ser revendidas fácilmente. En 333 Joyas te ofrecemos piezas de primera calidad con la garantía de autenticidad que necesitas para tu inversión.',
  });
}

// Generic read/write helpers
function readJson<T>(filePath: string, defaultValue: T): T {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

function writeJson(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Initialize on first import
initializeData();

// ============ USERS ============

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}

export function getUsers(): User[] {
  return readJson<User[]>(USERS_FILE, []);
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.email === email);
}

export function getUserById(id: number): User | undefined {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

export function createUser(email: string, passwordHash: string, role: string = 'user'): User {
  const users = getUsers();
  const newUser: User = {
    id: Math.max(0, ...users.map((u) => u.id)) + 1,
    email,
    password_hash: passwordHash,
    role,
    created_at: new Date().toISOString(),
  };
  users.push(newUser);
  writeJson(USERS_FILE, users);
  return newUser;
}

// ============ SESSIONS ============

export interface Session {
  id: string;
  user_id: number;
  expires_at: string;
  created_at: string;
}

export function createSession(userId: number): Session {
  const sessions = readJson<Session[]>(SESSIONS_FILE, []);
  const session: Session = {
    id: crypto.randomUUID(),
    user_id: userId,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
  };
  sessions.push(session);
  writeJson(SESSIONS_FILE, sessions);
  return session;
}

export function getSession(id: string): Session | undefined {
  const sessions = readJson<Session[]>(SESSIONS_FILE, []);
  return sessions.find((s) => s.id === id);
}

export function deleteSession(id: string): void {
  const sessions = readJson<Session[]>(SESSIONS_FILE, []);
  writeJson(SESSIONS_FILE, sessions.filter((s) => s.id !== id));
}

// ============ CATEGORIES ============

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export function getCategories(): Category[] {
  return readJson<Category[]>(CATEGORIES_FILE, []);
}

export function getCategoryById(id: number): Category | undefined {
  return getCategories().find((c) => c.id === id);
}

// ============ PRODUCTS ============

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

export function getProducts(): Product[] {
  return readJson<Product[]>(PRODUCTS_FILE, []);
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.featured);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return getProducts().filter((p) => p.category_id === categoryId);
}

export function createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...data,
    id: Math.max(0, ...products.map((p) => p.id)) + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  products.push(newProduct);
  writeJson(PRODUCTS_FILE, products);
  return newProduct;
}

export function updateProduct(id: number, data: Partial<Product>): Product | undefined {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  products[index] = {
    ...products[index],
    ...data,
    id,
    updated_at: new Date().toISOString(),
  };
  writeJson(PRODUCTS_FILE, products);
  return products[index];
}

export function deleteProduct(id: number): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  writeJson(PRODUCTS_FILE, filtered);
  return true;
}

// ============ ABOUT SECTION ============

export interface AboutContent {
  title: string;
  description: string;
  image: string;
  features: { icon: string; title: string; description: string }[];
  investmentTitle: string;
  investmentDescription: string;
}

export function getAboutContent(): AboutContent {
  return readJson<AboutContent>(ABOUT_FILE, {
    title: 'Tu inversión en oro, en manos confiables',
    description: 'Somos una tienda emergente ubicada en San Antonio de los Altos, Miranda.',
    image: '',
    features: [],
    investmentTitle: '',
    investmentDescription: '',
  });
}

export function updateAboutContent(data: Partial<AboutContent>): AboutContent {
  const current = getAboutContent();
  const updated = { ...current, ...data };
  writeJson(ABOUT_FILE, updated);
  return updated;
}
