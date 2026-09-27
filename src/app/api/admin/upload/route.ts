import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No se recibieron archivos' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        continue;
      }

      // Validate file size (max 5MB)
      if (buffer.length > 5 * 1024 * 1024) {
        continue;
      }

      const ext = file.type === 'image/jpeg' ? '.jpg' :
                  file.type === 'image/png' ? '.png' :
                  file.type === 'image/webp' ? '.webp' : '.gif';

      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      urls.push(`/images/products/${filename}`);
    }

    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Error al subir archivos' }, { status: 500 });
  }
}
