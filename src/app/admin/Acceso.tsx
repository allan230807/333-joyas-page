'use client';

import { useState, type FormEvent } from 'react';
import { supabaseNavegador } from '@/lib/supabase/navegador';
import { MARCA } from '@/lib/marca';

export default function Acceso() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const entrar = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    const { error } = await supabaseNavegador().auth.signInWithPassword({ email: correo.trim(), password: clave });
    if (error) {
      // 400 = credenciales inválidas; cualquier otro caso suele ser la conexión.
      setError(error.status === 400 ? 'Correo o contraseña incorrectos.' : 'No se pudo conectar. Revisa tu internet e intenta de nuevo.');
    }
    setEnviando(false);
  };

  return (
    <div className="contenedor flex min-h-[85svh] items-center justify-center pt-16">
      <form onSubmit={entrar} className="w-full max-w-sm">
        <p className="rotulo text-center">Panel</p>
        <h1 className="mt-3 text-center font-serif text-4xl font-light">{MARCA.nombre}</h1>
        <p className="mt-2 text-center font-serif text-xl italic text-oro-claro">{MARCA.lema}</p>

        <label className="mt-10 block text-xs uppercase tracking-[0.2em] text-niebla" htmlFor="correo">
          Correo
        </label>
        <input
          id="correo"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="campo mt-2"
        />

        <label className="mt-5 block text-xs uppercase tracking-[0.2em] text-niebla" htmlFor="clave">
          Contraseña
        </label>
        <input
          id="clave"
          type="password"
          autoComplete="current-password"
          required
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="campo mt-2"
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <button type="submit" disabled={enviando} className="boton-oro mt-8 w-full disabled:opacity-60">
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
