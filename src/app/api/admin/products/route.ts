import { NextResponse } from 'next/server';
import { getProducts, createProduct, type Product } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET all products
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const products = getProducts();
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

    const product = createProduct({
      name,
      slug,
      description: description || '',
      short_description: short_description || '',
      price,
      currency: currency || 'USD',
      category_id: category_id || 0,
      materials: materials || [],
      featured: featured || false,
      in_stock: in_stock !== false,
      sku: sku || '',
      weight_grams: weight_grams || 0,
      dimensions: dimensions || '',
      images: images || [],
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
