'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

// Cliente del navegador para el panel de administración. Guarda la sesión en
// cookies, así el servidor puede verificar al administrador (ver /api/revalidar).
let cliente: SupabaseClient | null = null;

export function supabaseNavegador(): SupabaseClient {
  cliente ??= createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return cliente;
}
