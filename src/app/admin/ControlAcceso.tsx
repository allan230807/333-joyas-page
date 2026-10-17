'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabaseConfigurado } from '@/lib/supabase/config';
import { supabaseNavegador } from '@/lib/supabase/navegador';
import Acceso from './Acceso';
import Panel from './Panel';

type Estado = 'cargando' | 'sin-sesion' | 'sin-permiso' | 'admin';

// Muestra el acceso, o el panel si la sesión es de un administrador. Esto solo
// decide qué pantalla ver: aunque alguien la saltara, RLS rechazaría sus cambios.
export default function ControlAcceso() {
  const [estado, setEstado] = useState<Estado>('cargando');
  const [sesion, setSesion] = useState<Session | null>(null);

  useEffect(() => {
    if (!supabaseConfigurado()) return;
    const supabase = supabaseNavegador();

    const evaluar = async (s: Session | null) => {
      setSesion(s);
      if (!s) return setEstado('sin-sesion');
      const { data } = await supabase.rpc('es_admin');
      setEstado(data ? 'admin' : 'sin-permiso');
    };

    supabase.auth.getSession().then(({ data }) => evaluar(data.session));
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => {
      // Diferido: llamar a Supabase dentro del callback puede bloquear el cliente.
      setTimeout(() => evaluar(s), 0);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigurado()) {
    return (
      <div className="contenedor flex min-h-[70svh] items-center justify-center pt-20 text-center">
        <p className="max-w-md text-niebla">
          Falta configurar Supabase: define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY (ver README).
        </p>
      </div>
    );
  }

  if (estado === 'cargando') return <div className="min-h-[70svh]" />;
  if (estado === 'sin-sesion') return <Acceso />;
  if (estado === 'sin-permiso') {
    return (
      <div className="contenedor flex min-h-[70svh] flex-col items-center justify-center pt-20 text-center">
        <p className="max-w-md text-niebla">La cuenta {sesion?.user.email} no tiene permisos de administrador.</p>
        <button type="button" onClick={() => supabaseNavegador().auth.signOut()} className="boton-linea mt-6">
          Salir
        </button>
      </div>
    );
  }
  return <Panel correo={sesion?.user.email ?? ''} />;
}
