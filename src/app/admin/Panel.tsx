'use client';

/* eslint-disable @next/next/no-img-element -- miniaturas del panel, sin optimizar a propósito */

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { IconoMas } from '@/components/iconos';
import { formatoPeso, formatoPrecio } from '@/lib/formato';
import { supabaseNavegador } from '@/lib/supabase/navegador';
import { TEJIDOS } from '@/lib/tejidos';
import type { Categoria, Joya, Nosotros } from '@/lib/tipos';
import EditorJoya from './EditorJoya';
import { borrarJoya, guardarNosotros, leerNosotros, listarCategorias, listarJoyas, publicarCambios } from './operaciones';

type Pestana = 'joyas' | 'nosotros';

function FilaJoya({ joya, onEditar, onBorrada }: { joya: Joya; onEditar: () => void; onBorrada: () => void }) {
  const [confirmar, setConfirmar] = useState(false);
  const [borrando, setBorrando] = useState(false);

  const borrar = async () => {
    setBorrando(true);
    try {
      await borrarJoya(joya);
      await publicarCambios();
      onBorrada();
    } catch (e) {
      alertarError(e);
      setBorrando(false);
    }
  };

  return (
    <li className="flex items-center gap-4 border-b border-linea py-4">
      <button type="button" onClick={onEditar} className="flex min-w-0 flex-1 items-center gap-4 text-left">
        <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-carbon">
          {joya.fotos[0] ? (
            <img src={joya.fotos[0].url} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : joya.tejido ? (
            <TejidoAnimado tejido={joya.tejido} className="absolute inset-0 h-full w-full" />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-tight">{joya.nombre}</p>
          <p className="mt-1 text-xs text-niebla">
            {joya.categoria.nombre}
            {joya.tejido && ` · ${TEJIDOS[joya.tejido].nombre}`} · {formatoPeso(joya.peso_gramos)} · {formatoPrecio(joya.precio_usd)}
          </p>
          <p className="mt-1 flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.18em]">
            {!joya.publicada && <span className="text-red-300">Oculta</span>}
            {!joya.disponible && <span className="text-niebla">Agotada</span>}
            {joya.destacada && <span className="text-oro-claro">Destacada</span>}
            <span className="text-niebla">{joya.fotos.length} fotos</span>
          </p>
        </div>
      </button>
      {confirmar ? (
        <div className="flex shrink-0 flex-col gap-1">
          <button type="button" onClick={borrar} disabled={borrando} className="min-h-[36px] bg-red-900/60 px-3 text-xs">
            {borrando ? '…' : 'Sí, borrar'}
          </button>
          <button type="button" onClick={() => setConfirmar(false)} className="min-h-[36px] px-3 text-xs text-niebla">
            Cancelar
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirmar(true)} className="min-h-[44px] shrink-0 px-3 text-xs text-niebla hover:text-red-300">
          Borrar
        </button>
      )}
    </li>
  );
}

function alertarError(e: unknown) {
  // Sin window.alert: el error se muestra en consola y en la cabecera del panel.
  console.error(e);
  window.dispatchEvent(new CustomEvent('panel-error', { detail: e instanceof Error ? e.message : String(e) }));
}

function EditorNosotros() {
  const [datos, setDatos] = useState<Nosotros | null>(null);
  const [estado, setEstado] = useState('');

  useEffect(() => {
    leerNosotros().then((n) => setDatos(n ?? { titulo: '', texto: '' }));
  }, []);

  if (!datos) return <p className="py-10 text-niebla">Cargando…</p>;

  const guardar = async () => {
    setEstado('Guardando…');
    try {
      await guardarNosotros(datos);
      await publicarCambios();
      setEstado('Guardado ✓');
    } catch (e) {
      setEstado(e instanceof Error ? e.message : 'Error');
    }
  };

  return (
    <div className="max-w-2xl space-y-5 py-6">
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-niebla">Título</span>
        <input className="campo mt-2" value={datos.titulo} onChange={(e) => setDatos({ ...datos, titulo: e.target.value })} />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-niebla">Texto</span>
        <textarea className="campo mt-2 min-h-[200px] py-3" value={datos.texto} onChange={(e) => setDatos({ ...datos, texto: e.target.value })} />
      </label>
      <div className="flex items-center gap-4">
        <button type="button" onClick={guardar} className="boton-oro">
          Guardar
        </button>
        <span className="text-sm text-niebla">{estado}</span>
      </div>
    </div>
  );
}

export default function Panel({ correo }: { correo: string }) {
  const [pestana, setPestana] = useState<Pestana>('joyas');
  const [joyas, setJoyas] = useState<Joya[] | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editando, setEditando] = useState<Joya | 'nueva' | null>(null);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    try {
      const [j, c] = await Promise.all([listarJoyas(), listarCategorias()]);
      setJoyas(j);
      setCategorias(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar');
    }
  }, []);

  useEffect(() => {
    cargar();
    const alError = (e: Event) => setError((e as CustomEvent<string>).detail);
    window.addEventListener('panel-error', alError);
    return () => window.removeEventListener('panel-error', alError);
  }, [cargar]);

  return (
    <div className="contenedor pb-24 pt-24 md:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="rotulo">Panel</p>
          <h1 className="mt-2 font-serif text-4xl font-light">Administración</h1>
          <p className="mt-1 text-xs text-niebla">{correo}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" className="boton-linea min-h-[44px] px-4">
            Ver sitio
          </Link>
          <button type="button" onClick={() => supabaseNavegador().auth.signOut()} className="boton-linea min-h-[44px] px-4">
            Salir
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-8 flex gap-6 border-b border-linea">
        {(['joyas', 'nosotros'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPestana(p)}
            className={`-mb-px min-h-[44px] border-b text-xs uppercase tracking-[0.24em] ${
              pestana === p ? 'border-oro text-oro-claro' : 'border-transparent text-niebla'
            }`}
          >
            {p === 'joyas' ? `Joyas${joyas ? ` (${joyas.length})` : ''}` : 'Nosotros'}
          </button>
        ))}
      </div>

      {pestana === 'nosotros' ? (
        <EditorNosotros />
      ) : (
        <>
          <button type="button" onClick={() => setEditando('nueva')} className="boton-oro mt-6 w-full sm:w-auto">
            <IconoMas tamano={18} /> Nueva joya
          </button>
          {joyas === null ? (
            <p className="py-10 text-niebla">Cargando…</p>
          ) : joyas.length === 0 ? (
            <p className="py-10 text-niebla">Aún no hay joyas. Crea la primera con sus fotos.</p>
          ) : (
            <ul className="mt-4">
              {joyas.map((j) => (
                <FilaJoya key={j.id} joya={j} onEditar={() => setEditando(j)} onBorrada={cargar} />
              ))}
            </ul>
          )}
        </>
      )}

      <AnimatePresence>
        {editando && (
          <EditorJoya
            key={editando === 'nueva' ? 'nueva' : editando.id}
            joya={editando === 'nueva' ? null : editando}
            categorias={categorias}
            onCerrar={() => setEditando(null)}
            onGuardada={() => {
              setEditando(null);
              cargar();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
