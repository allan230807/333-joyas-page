import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseConfigurado } from './config';

// Lectura pública (páginas del sitio): sin cookies, para que Next pueda
// cachear las páginas. RLS solo deja ver joyas publicadas.
export function supabasePublico(): SupabaseClient | null {
  if (!supabaseConfigurado()) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Con la sesión del usuario (cookies): para rutas que deben saber quién llama.
export function supabaseConSesion(): SupabaseClient {
  const almacen = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => almacen.getAll(),
      setAll: (lista: { name: string; value: string; options: CookieOptions }[]) => {
        try {
          lista.forEach(({ name, value, options }) => almacen.set(name, value, options));
        } catch {
          // Llamado desde un Server Component: no puede escribir cookies.
        }
      },
    },
  });
}
