// Tipos de tejido de las cadenas y pulseras. Los slugs deben coincidir con el
// CHECK de joyas.tejido en supabase/migrations/20261017000000_joyas_18k.sql.
// El dibujo animado de cada uno está en components/tejidos/TejidoAnimado.tsx.

export const TEJIDOS = {
  rolo: {
    nombre: 'Rolo',
    descripcion: 'Eslabones redondos iguales, unidos uno a uno. Clásico y resistente.',
  },
  cubano: {
    nombre: 'Cubano',
    descripcion: 'Eslabones gruesos y torcidos que quedan planos sobre la piel.',
  },
  franco: {
    nombre: 'Franco',
    descripcion: 'Eslabones en V entrelazados en cuatro caras. Muy firme.',
  },
  gucci: {
    nombre: 'Gucci',
    descripcion: 'Eslabones ovalados con una barra central, estilo marinero.',
  },
  figaro: {
    nombre: 'Fígaro',
    descripcion: 'Tres eslabones cortos y uno largo, en secuencia.',
  },
  cordon: {
    nombre: 'Cordón',
    descripcion: 'Eslabones trenzados en espiral, como una soga.',
  },
  espiga: {
    nombre: 'Espiga',
    descripcion: 'Eslabones inclinados que forman hojas de trigo.',
  },
  singapur: {
    nombre: 'Singapur',
    descripcion: 'Eslabones torcidos que reflejan la luz en ondas.',
  },
  bizantino: {
    nombre: 'Bizantino',
    descripcion: 'Anillos entrelazados en bloques, textura densa.',
  },
  veneciana: {
    nombre: 'Veneciana',
    descripcion: 'Eslabones cuadrados en forma de caja.',
  },
} as const;

export type Tejido = keyof typeof TEJIDOS;

export const LISTA_TEJIDOS = Object.keys(TEJIDOS) as Tejido[];

export function esTejido(valor: unknown): valor is Tejido {
  return typeof valor === 'string' && valor in TEJIDOS;
}
