import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { supabaseConSesion } from '@/lib/supabase/servidor';

// El panel llama aquí después de guardar para que el sitio muestre los
// cambios al instante (las páginas están cacheadas). Solo un administrador
// verificado por Supabase puede hacerlo.
export async function POST() {
  const supabase = supabaseConSesion();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Sin sesión' }, { status: 401 });

  const { data: esAdmin } = await supabase.rpc('es_admin');
  if (!esAdmin) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}
