import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const db = getDb();
  const categories = db.prepare('SELECT * FROM categories ORDER BY name').all();

  return NextResponse.json({ categories });
}
