import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a mock client that returns empty data when not configured
const createMockClient = (): SupabaseClient => {
  return {
    from: () => ({
      select: () => ({ then: (resolve: (value: { data: unknown[]; error: null }) => void) => resolve({ data: [], error: null }) }),
      insert: () => ({ select: () => ({ single: () => ({ then: (resolve: (value: { data: null; error: string }) => void) => resolve({ data: null, error: 'Supabase no configurado' }) }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => ({ then: (resolve: (value: { data: null; error: string }) => void) => resolve({ data: null, error: 'Supabase no configurado' }) }) }) }) }),
      delete: () => ({ eq: () => ({ then: (resolve: (value: { error: string | null }) => void) => resolve({ error: null }) }) }),
      order: () => ({ then: (resolve: (value: { data: unknown[]; error: null }) => void) => resolve({ data: [], error: null }) }),
      eq: () => ({ single: () => ({ then: (resolve: (value: { data: null; error: string }) => void) => resolve({ data: null, error: 'No encontrado' }) }) }),
    }),
  } as unknown as SupabaseClient;
};

export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
