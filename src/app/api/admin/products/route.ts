import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET all products
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ products: products || [] });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
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

    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        name,
        slug,
        description: description || '',
        short_description: short_description || '',
        price,
        currency: currency || 'USD',
        category_id: category_id || null,
        materials: materials || [],
        featured: featured || false,
        in_stock: in_stock !== false,
        sku: sku || '',
        weight_grams: weight_grams || null,
        dimensions: dimensions || '',
        images: images || [],
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
