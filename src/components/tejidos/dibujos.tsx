import type { ReactElement } from 'react';
import type { Tejido } from '@/lib/tejidos';

// Geometría de cada tejido en una franja de 60 de alto (eje en y = 30).
// `unidad` dibuja un período del patrón a partir de x = 0; el componente lo
// repite y lo desplaza exactamente un período para que el bucle no tenga saltos.
// `fijas` son trazos continuos que no se repiten (bordes, ejes).

export interface Dibujo {
  periodo: number;
  unidad: ReactElement;
  fijas?: ReactElement;
}

const Y = 30;

// Elipse como path (centro cx, cy; radios rx, ry), opcionalmente rotada.
function Elipse({ cx, cy = Y, rx, ry, giro = 0 }: { cx: number; cy?: number; rx: number; ry: number; giro?: number }) {
  return (
    <path
      d={`M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0`}
      transform={giro ? `rotate(${giro} ${cx} ${cy})` : undefined}
    />
  );
}

const LINEA_LARGA = (y: number) => <path d={`M -400 ${y} H 800`} />;

export const DIBUJOS: Record<Tejido, Dibujo> = {
  // Anillo plano + anillo de canto, alternados.
  rolo: {
    periodo: 24,
    unidad: (
      <>
        <Elipse cx={0} rx={12} ry={8} />
        <Elipse cx={12} rx={11} ry={2.4} />
      </>
    ),
  },

  // Eslabones gruesos torcidos que se apoyan planos: doble trazo en uno de
  // cada dos para sugerir el volumen sin recargar.
  cubano: {
    periodo: 18,
    unidad: (
      <>
        <Elipse cx={0} rx={12} ry={6.5} giro={-22} />
        <Elipse cx={0} rx={6} ry={2.2} giro={-22} />
        <Elipse cx={9} rx={12} ry={6.5} giro={22} />
      </>
    ),
  },

  // V anidadas entre dos bordes.
  franco: {
    periodo: 9,
    unidad: (
      <>
        <path d="M 0 20 L 7 30 L 0 40" />
        <path d="M 3.5 24.5 L 7 30 L 3.5 35.5" />
      </>
    ),
    fijas: (
      <>
        {LINEA_LARGA(19)}
        {LINEA_LARGA(41)}
      </>
    ),
  },

  // Óvalo con barra central y un eslabón de unión de canto.
  gucci: {
    periodo: 32,
    unidad: (
      <>
        <Elipse cx={0} rx={12} ry={8.5} />
        <path d="M 0 21.5 V 38.5" />
        <Elipse cx={16} rx={6} ry={2} />
      </>
    ),
  },

  // Tres eslabones cortos y uno largo.
  figaro: {
    periodo: 72,
    unidad: (
      <>
        <Elipse cx={7} rx={6} ry={5} />
        <Elipse cx={21} rx={6} ry={5} />
        <Elipse cx={35} rx={6} ry={5} />
        <Elipse cx={56} rx={14} ry={5} />
      </>
    ),
  },

  // Espiral de soga: eslabones inclinados muy juntos entre dos bordes.
  cordon: {
    periodo: 7,
    unidad: <Elipse cx={0} rx={11} ry={3.6} giro={-52} />,
    fijas: (
      <>
        {LINEA_LARGA(21)}
        {LINEA_LARGA(39)}
      </>
    ),
  },

  // Hojas de trigo a ambos lados de un eje.
  espiga: {
    periodo: 12,
    unidad: (
      <>
        <path d="M 0 30 Q 6 21 13 19" />
        <path d="M 0 30 Q 6 39 13 41" />
      </>
    ),
    fijas: LINEA_LARGA(Y),
  },

  // Dos ondas cruzadas con trazos diagonales de luz.
  singapur: {
    periodo: 24,
    unidad: (
      <>
        <path d="M 0 30 C 6 19 12 19 12 30 S 18 41 24 30" />
        <path d="M 0 30 C 6 41 12 41 12 30 S 18 19 24 30" />
        <path d="M 4 26 L 8 22" />
        <path d="M 16 38 L 20 34" />
      </>
    ),
  },

  // Dos óvalos cruzados en X (el "nudo" bizantino) y un anillo de unión.
  bizantino: {
    periodo: 20,
    unidad: (
      <>
        <Elipse cx={7} rx={8.5} ry={4.5} giro={55} />
        <Elipse cx={7} rx={8.5} ry={4.5} giro={-55} />
        <Elipse cx={16} rx={4} ry={2.4} />
      </>
    ),
  },

  // Cajas cuadradas con su cara interior, unidas por un trazo.
  veneciana: {
    periodo: 16,
    unidad: (
      <>
        <path d="M 0 23 H 11 V 37 H 0 Z" />
        <path d="M 3 26 H 8 V 34 H 3 Z" />
        <path d="M 11 30 H 16" />
      </>
    ),
  },
};
