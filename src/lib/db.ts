import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'joyas.db');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: Database.Database | null = null;
let initialized = false;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.pragma('busy_timeout = 5000');
  }
  return db;
}

export function initializeDb(): void {
  if (initialized) return;
  initialized = true;

  const db = getDb();

  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      short_description TEXT,
      price REAL NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'USD',
      category_id INTEGER,
      materials TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      in_stock INTEGER NOT NULL DEFAULT 1,
      sku TEXT,
      weight_grams REAL,
      dimensions TEXT,
      images TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Seed admin user if not exists
  try {
    const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('ararciahurtado@gmail.com');
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hash = bcrypt.hashSync('Akira100*', 10);
      db.prepare('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)').run(
        'ararciahurtado@gmail.com',
        hash,
        'admin'
      );
    }
  } catch (e) {
    console.error('Error seeding admin:', e);
  }

  // Seed categories if not exists
  try {
    const catCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
    if (catCount.count === 0) {
      const insertCat = db.prepare('INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)');
      insertCat.run('Anillos', 'anillos', 'Anillos de oro de inversión');
      insertCat.run('Collares', 'collares', 'Collares de oro de primera calidad');
      insertCat.run('Pendientes', 'pendientes', 'Pendientes de oro');
      insertCat.run('Pulseras', 'pulseras', 'Pulseras de oro');
    }
  } catch (e) {
    console.error('Error seeding categories:', e);
  }

  // Seed products if not exists
  try {
    const prodCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    if (prodCount.count === 0) {
      const insertProd = db.prepare(`
        INSERT INTO products (name, slug, description, short_description, price, currency, category_id, materials, featured, in_stock, sku, weight_grams, dimensions, images)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const products = [
        {
          name: 'Collar Venezolano 18k',
          slug: 'collar-venezolano-18k',
          description: 'Collar de oro 18 quilates con tejido venezolano tradicional. Primera calidad, ideal para inversión.',
          short_description: 'Oro 18k tejido venezolano',
          price: 2500,
          currency: 'USD',
          category_id: 2,
          materials: JSON.stringify(['Oro 18k']),
          featured: 1,
          in_stock: 1,
          sku: 'CO-VZ-001',
          weight_grams: 25,
          dimensions: '45cm',
          images: JSON.stringify(['/images/products/collar-1.jpg']),
        },
        {
          name: 'Cadena Oro Italiano',
          slug: 'cadena-oro-italiano',
          description: 'Cadena de oro italiano 14k con eslabones finos. Perfecta para uso diario o inversión.',
          short_description: 'Oro 14k italiano',
          price: 1800,
          currency: 'USD',
          category_id: 2,
          materials: JSON.stringify(['Oro 14k']),
          featured: 1,
          in_stock: 1,
          sku: 'CO-IT-001',
          weight_grams: 18,
          dimensions: '50cm',
          images: JSON.stringify(['/images/products/cadena-1.jpg']),
        },
        {
          name: 'Anillo Clásico Oro',
          slug: 'anillo-clasico-oro',
          description: 'Anillo clásico de oro 18k. Diseño atemporal, primera calidad.',
          short_description: 'Oro 18k clásico',
          price: 1200,
          currency: 'USD',
          category_id: 1,
          materials: JSON.stringify(['Oro 18k']),
          featured: 1,
          in_stock: 1,
          sku: 'AN-CL-001',
          weight_grams: 8,
          dimensions: 'Talla 10-20',
          images: JSON.stringify(['/images/products/anillo-1.jpg']),
        },
        {
          name: 'Pulsera Oro Brillante',
          slug: 'pulsera-oro-brillante',
          description: 'Pulsera de oro brillante 14k. Elegante y versátil.',
          short_description: 'Oro 14k brillante',
          price: 1500,
          currency: 'USD',
          category_id: 4,
          materials: JSON.stringify(['Oro 14k']),
          featured: 1,
          in_stock: 1,
          sku: 'PU-BR-001',
          weight_grams: 15,
          dimensions: '18cm',
          images: JSON.stringify(['/images/products/pulsera-1.jpg']),
        },
        {
          name: 'Pendientes Oro Fino',
          slug: 'pendientes-oro-fino',
          description: 'Pendientes de oro fino 18k. Diseño minimalista.',
          short_description: 'Oro 18k fino',
          price: 900,
          currency: 'USD',
          category_id: 3,
          materials: JSON.stringify(['Oro 18k']),
          featured: 0,
          in_stock: 1,
          sku: 'PE-FN-001',
          weight_grams: 4,
          dimensions: '2cm',
          images: JSON.stringify(['/images/products/pendientes-1.jpg']),
        },
        {
          name: 'Collar Oro Premium',
          slug: 'collar-oro-premium',
          description: 'Collar de oro premium 18k con diseño exclusivo. Primera calidad garantizada.',
          short_description: 'Oro 18k premium',
          price: 3200,
          currency: 'USD',
          category_id: 2,
          materials: JSON.stringify(['Oro 18k']),
          featured: 0,
          in_stock: 1,
          sku: 'CO-PR-001',
          weight_grams: 30,
          dimensions: '48cm',
          images: JSON.stringify(['/images/products/collar-premium-1.jpg']),
        },
      ];

      for (const p of products) {
        insertProd.run(
          p.name, p.slug, p.description, p.short_description, p.price, p.currency,
          p.category_id, p.materials, p.featured, p.in_stock, p.sku, p.weight_grams,
          p.dimensions, p.images
        );
      }
    }
  } catch (e) {
    console.error('Error seeding products:', e);
  }
}

// Lazy initialization - only runs when DB is actually accessed
export { getDb };
