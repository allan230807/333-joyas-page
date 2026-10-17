'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { m } from 'framer-motion';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';
import { IconoCerrar } from '@/components/iconos';
import { QUILATES } from '@/lib/marca';
import { LISTA_TEJIDOS, TEJIDOS, type Tejido } from '@/lib/tejidos';
import type { Categoria, Joya, JoyaFoto } from '@/lib/tipos';
import EditorFotos from './EditorFotos';
import { guardarJoya, publicarCambios, sincronizarFotos, type DatosJoya, type ItemFoto } from './operaciones';

interface Props {
  joya: Joya | null; // null = nueva
  categorias: Categoria[];
  onCerrar: () => void;
  onGuardada: () => void;
}

// Acepta coma o punto decimal ("12,5" o "12.5"); vacío = null.
function aNumero(texto: string): number | null {
  const limpio = texto.trim().replace(',', '.');
  if (!limpio) return null;
  const n = Number(limpio);
  return Number.isFinite(n) ? n : NaN;
}

const aTexto = (n: number | null) => (n === null ? '' : String(n).replace('.', ','));

function Campo({ etiqueta, children, ayuda }: { etiqueta: string; children: ReactNode; ayuda?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-niebla">{etiqueta}</span>
      <div className="mt-2">{children}</div>
      {ayuda && <span className="mt-1 block text-xs text-niebla/80">{ayuda}</span>}
    </label>
  );
}

function Interruptor({ activo, onCambiar, etiqueta }: { activo: boolean; onCambiar: (v: boolean) => void; etiqueta: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={() => onCambiar(!activo)}
      className="flex min-h-[48px] w-full items-center justify-between border border-linea px-4"
    >
      <span className="text-sm">{etiqueta}</span>
      <span className={`relative h-6 w-11 rounded-full transition-colors ${activo ? 'bg-oro' : 'bg-linea'}`}>
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-marfil transition-transform duration-300 ${
            activo ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  );
}

export default function EditorJoya({ joya, categorias, onCerrar, onGuardada }: Props) {
  const [nombre, setNombre] = useState(joya?.nombre ?? '');
  const [categoriaId, setCategoriaId] = useState(joya?.categoria.id ?? categorias[0]?.id ?? 0);
  const [tejido, setTejido] = useState<Tejido | null>(joya?.tejido ?? null);
  const [peso, setPeso] = useState(aTexto(joya?.peso_gramos ?? null));
  const [largo, setLargo] = useState(aTexto(joya?.largo_cm ?? null));
  const [ancho, setAncho] = useState(aTexto(joya?.ancho_mm ?? null));
  const [precio, setPrecio] = useState(aTexto(joya?.precio_usd ?? null));
  const [descripcion, setDescripcion] = useState(joya?.descripcion ?? '');
  const [disponible, setDisponible] = useState(joya?.disponible ?? true);
  const [destacada, setDestacada] = useState(joya?.destacada ?? false);
  const [publicada, setPublicada] = useState(joya?.publicada ?? true);
  const [fotos, setFotos] = useState<ItemFoto[]>(() => (joya?.fotos ?? []).map((foto) => ({ tipo: 'existente', foto })));
  const [eliminadas, setEliminadas] = useState<JoyaFoto[]>([]);
  const [progreso, setProgreso] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Libera las vistas previas locales al cerrar.
  useEffect(
    () => () => fotos.forEach((f) => f.tipo === 'nueva' && URL.revokeObjectURL(f.vistaPrevia)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const quitarFoto = (item: ItemFoto) => {
    setFotos((actuales) => actuales.filter((f) => f !== item));
    if (item.tipo === 'existente') setEliminadas((e) => [...e, item.foto]);
    else URL.revokeObjectURL(item.vistaPrevia);
  };

  const guardar = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const pesoN = aNumero(peso);
    const largoN = aNumero(largo);
    const anchoN = aNumero(ancho);
    const precioN = aNumero(precio);

    if (nombre.trim().length < 2) return setError('Escribe el nombre de la joya.');
    if (!pesoN || pesoN <= 0) return setError('El peso en gramos es obligatorio (por ejemplo 12,5).');
    if ([largoN, anchoN, precioN].some((n) => Number.isNaN(n) || (n !== null && n < 0)))
      return setError('Revisa largo, ancho y precio: deben ser números.');

    const datos: DatosJoya = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria_id: categoriaId,
      tejido,
      peso_gramos: pesoN,
      largo_cm: largoN,
      ancho_mm: anchoN,
      precio_usd: precioN,
      disponible,
      destacada,
      publicada,
    };

    try {
      setProgreso('Guardando datos…');
      const id = await guardarJoya(datos, joya?.id);
      await sincronizarFotos(id, fotos, eliminadas, setProgreso);
      setProgreso('Publicando…');
      await publicarCambios();
      onGuardada();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.');
      setProgreso('');
    }
  };

  const guardando = progreso !== '';

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={joya ? 'Editar joya' : 'Nueva joya'}>
      <m.div className="absolute inset-0 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={guardando ? undefined : onCerrar} />
      <m.form
        onSubmit={guardar}
        className="absolute inset-0 flex flex-col bg-noche md:inset-y-0 md:left-auto md:right-0 md:w-[560px] md:border-l md:border-linea"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-linea px-5 py-4" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
          <div>
            <p className="rotulo">Oro {QUILATES}k</p>
            <h2 className="font-serif text-2xl font-light">{joya ? 'Editar joya' : 'Nueva joya'}</h2>
          </div>
          <button type="button" onClick={onCerrar} disabled={guardando} className="flex h-11 w-11 items-center justify-center" aria-label="Cerrar">
            <IconoCerrar />
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto overscroll-contain px-5 py-6">
          <EditorFotos items={fotos} onCambiar={setFotos} onQuitar={quitarFoto} />

          <Campo etiqueta="Nombre">
            <input className="campo" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Cadena cubana 60 cm" maxLength={120} required />
          </Campo>

          <Campo etiqueta="Categoría">
            <select className="campo" value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))}>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </Campo>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-niebla">Tejido</p>
            <div className="mt-3 border border-linea bg-carbon p-4">
              {tejido ? (
                <>
                  <TejidoAnimado key={tejido} tejido={tejido} className="h-14 w-full" />
                  <p className="mt-2 text-center font-serif text-xl">{TEJIDOS[tejido].nombre}</p>
                </>
              ) : (
                <p className="py-5 text-center text-sm text-niebla">Sin tejido (anillo, dije, zarcillo…)</p>
              )}
            </div>
            <div className="sin-barra mt-3 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setTejido(null)}
                className={`chip ${tejido === null ? 'border-oro bg-oro text-noche' : 'border-linea text-marfil/75'}`}
              >
                Ninguno
              </button>
              {LISTA_TEJIDOS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTejido(t)}
                  className={`chip ${tejido === t ? 'border-oro bg-oro text-noche' : 'border-linea text-marfil/75'}`}
                >
                  {TEJIDOS[t].nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Campo etiqueta="Peso (g) *">
              <input className="campo" inputMode="decimal" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="12,5" required />
            </Campo>
            <Campo etiqueta="Material">
              <div className="campo flex items-center text-oro-claro">Oro {QUILATES}k</div>
            </Campo>
            <Campo etiqueta="Largo (cm)">
              <input className="campo" inputMode="decimal" value={largo} onChange={(e) => setLargo(e.target.value)} placeholder="60" />
            </Campo>
            <Campo etiqueta="Ancho (mm)">
              <input className="campo" inputMode="decimal" value={ancho} onChange={(e) => setAncho(e.target.value)} placeholder="4" />
            </Campo>
          </div>

          <Campo etiqueta="Precio (USD)" ayuda="Déjalo vacío para mostrar «Precio a consultar».">
            <input className="campo" inputMode="decimal" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Opcional" />
          </Campo>

          <Campo etiqueta="Descripción">
            <textarea
              className="campo min-h-[120px] py-3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              maxLength={2000}
              placeholder="Cierre, acabado, cuidados…"
            />
          </Campo>

          <div className="space-y-2">
            <Interruptor etiqueta="Publicada en el sitio" activo={publicada} onCambiar={setPublicada} />
            <Interruptor etiqueta="Disponible" activo={disponible} onCambiar={setDisponible} />
            <Interruptor etiqueta="Destacada en el inicio" activo={destacada} onCambiar={setDestacada} />
          </div>
        </div>

        <div className="border-t border-linea px-5 pt-4 pb-seguro">
          {error && (
            <p role="alert" className="mb-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button type="submit" disabled={guardando} className="boton-oro w-full disabled:opacity-70">
            {guardando ? progreso : joya ? 'Guardar cambios' : 'Crear joya'}
          </button>
        </div>
      </m.form>
    </div>
  );
}
