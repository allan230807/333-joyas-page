-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table with all fields matching the Product TypeScript type
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  category_id UUID REFERENCES categories(id),
  materials TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  sku TEXT UNIQUE NOT NULL,
  weight_grams INTEGER,
  dimensions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product images table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false
);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_product_images_product ON product_images(product_id);

-- RLS: Enable on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read product_images" ON product_images FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Allow authenticated insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete categories" ON categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert product_images" ON product_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update product_images" ON product_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete product_images" ON product_images FOR DELETE USING (auth.role() = 'authenticated');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Seed Data
INSERT INTO categories (id, name, slug, description) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Anillos', 'anillos', 'Anillos de plata y oro elaborados a mano.'),
  ('22222222-2222-2222-2222-222222222222', 'Collares', 'collares', 'Collares finos con detalles únicos.'),
  ('33333333-3333-3333-3333-333333333333', 'Pendientes', 'pendientes', 'Pendientes elegantes para cada ocasión.'),
  ('44444444-4444-4444-4444-444444444444', 'Pulseras', 'pulseras', 'Pulseras de diseño exclusivo.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (id, name, slug, description, short_description, price, currency, category_id, materials, featured, in_stock, sku) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Anillo Sello de Plata', 'anillo-sello-plata', 'Anillo de sello macizo elaborado en plata de ley 925. Diseño minimalista y atemporal.', 'Anillo de sello macizo en plata de ley.', 85.00, 'EUR', '11111111-1111-1111-1111-111111111111', ARRAY['Plata de Ley 925'], true, true, 'AN-001'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Collar Luna', 'collar-luna', 'Collar con colgante en forma de media luna. Delicado y perfecto para el día a día.', 'Collar delicado con colgante de luna.', 65.00, 'EUR', '22222222-2222-2222-2222-222222222222', ARRAY['Oro de 18k sobre Plata'], true, true, 'CO-001')
ON CONFLICT (slug) DO NOTHING;
