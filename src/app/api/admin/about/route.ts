import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET about content
export async function GET() {
  try {
    const { data: content, error } = await supabase
      .from('about_content')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Error al obtener contenido' }, { status: 500 });
  }
}

// PUT update about content
export async function PUT(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { data: content, error } = await supabase
      .from('about_content')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Error al actualizar contenido' }, { status: 500 });
  }
}
