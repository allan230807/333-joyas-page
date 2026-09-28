import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ products: products || [] });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ products: [] });
  }
}
