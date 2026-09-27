import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// GET all products
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const db = getDb();
  const products = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `).all();

  return NextResponse.json({ products });
}

// POST create product
export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      short_description,
      price,
      currency,
      category_id,
      materials,
      featured,
      in_stock,
      sku,
      weight_grams,
      dimensions,
      images,
    } = body;

    if (!name || !slug || price === undefined) {
      return NextResponse.json(
        { error: 'Nombre, slug y precio son requeridos' },
        { status: 400 }
      );
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO products (name, slug, description, short_description, price, currency, category_id, materials, featured, in_stock, sku, weight_grams, dimensions, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      slug,
      description || '',
      short_description || '',
      price,
      currency || 'USD',
      category_id || null,
      JSON.stringify(materials || []),
      featured ? 1 : 0,
      in_stock ? 1 : 0,
      sku || '',
      weight_grams || null,
      dimensions || '',
      JSON.stringify(images || [])
    );

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
