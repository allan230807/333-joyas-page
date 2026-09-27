import { NextResponse } from 'next/server';
import { getProducts, getProductsByCategory } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('category');

  try {
    const products = categoryId
      ? getProductsByCategory(parseInt(categoryId))
      : getProducts();

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}
