import { NextResponse } from 'next/server';
import { getAboutContent, updateAboutContent } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET about content
export async function GET() {
  const content = getAboutContent();
  return NextResponse.json({ content });
}

// PUT update about content
export async function PUT(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = updateAboutContent(body);
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    console.error('Error updating about:', error);
    return NextResponse.json({ error: 'Error al actualizar contenido' }, { status: 500 });
  }
}
