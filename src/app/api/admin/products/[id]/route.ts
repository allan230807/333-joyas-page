import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

// GET single product
export async function GET(_request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const product = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `).get(id);

  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ product });
}

// PUT update product
export async function PUT(request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
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

    const db = getDb();
    const result = db.prepare(`
      UPDATE products SET
        name = ?, slug = ?, description = ?, short_description = ?,
        price = ?, currency = ?, category_id = ?, materials = ?,
        featured = ?, in_stock = ?, sku = ?, weight_grams = ?,
        dimensions = ?, images = ?, updated_at = datetime('now')
      WHERE id = ?
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
      JSON.stringify(images || []),
      id
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(_request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);

  if (result.changes === 0) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
