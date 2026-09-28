-- Esquema de base de datos para 333 Joyas
-- Ejecutar en Supabase Dashboard -> SQL Editor

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  category_id INTEGER REFERENCES categories(id),
  materials TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  sku TEXT,
  weight_grams DECIMAL(8, 2),
  dimensions TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de contenido "Nosotros"
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT DEFAULT '',
  features JSONB DEFAULT '[]',
  investment_title TEXT DEFAULT '',
  investment_description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar categorías iniciales
INSERT INTO categories (name, slug, description) VALUES
  ('Anillos', 'anillos', 'Anillos de oro de inversión'),
  ('Collares', 'collares', 'Collares de oro de primera calidad'),
  ('Pendientes', 'pendientes', 'Pendientes de oro'),
  ('Pulseras', 'pulseras', 'Pulseras de oro')
ON CONFLICT (slug) DO NOTHING;

-- Insertar contenido "Nosotros" inicial
INSERT INTO about_content (id, title, description, features, investment_title, investment_description)
VALUES (
  1,
  'Tu inversión en oro, en manos confiables',
  'Somos una joyería de confianza ubicada en San Antonio de los Altos, Miranda. Nos especializamos en la venta de prendas de oro de primera calidad, ofreciendo un servicio personalizado y delivery en Caracas.',
  '[
    {"icon": "🛡️", "title": "Confianza", "description": "Somos una tienda emergente comprometida con la transparencia y la calidad en cada transacción."},
    {"icon": "💎", "title": "Primera Calidad", "description": "Trabajamos exclusivamente con oro certificado de 18 y 14 quilates. Cada pieza incluye su garantía de pureza."},
    {"icon": "🚚", "title": "Delivery Personal", "description": "Realizamos entregas personales en Caracas para que recibas tu inversión de forma segura y directa."},
    {"icon": "📈", "title": "Oro como Inversión", "description": "El oro es uno de los activos más estables. Te asesoramos para que tu compra sea una inversión inteligente."}
  ]'::jsonb,
  '¿Por qué invertir en oro?',
  'El oro ha sido un refugio de valor durante siglos. A diferencia de otras inversiones, las prendas de oro mantienen su valor en el tiempo y pueden ser revendidas fácilmente. En 333 Joyas te ofrecemos piezas de primera calidad con la garantía de autenticidad que necesitas para tu inversión.'
)
ON CONFLICT (id) DO NOTHING;

-- Habilitar RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

-- Polítodos de lectura pública
CREATE POLICY "Allow public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON about_content FOR SELECT USING (true);

-- Polítodos de escritura (solo admin - se maneja desde el servidor)
CREATE POLICY "Allow all operations" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON about_content FOR ALL USING (true) WITH CHECK (true);
