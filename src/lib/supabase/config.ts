// Credenciales públicas de Supabase. La clave anon es pública por diseño:
// la seguridad la dan las políticas RLS de la base, no ocultar esta clave.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const BUCKET_FOTOS = 'joyas';

export function supabaseConfigurado(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function urlPublicaFoto(ruta: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_FOTOS}/${ruta}`;
}
