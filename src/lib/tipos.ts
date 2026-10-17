import type { Tejido } from './tejidos';

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  orden: number;
}

export interface JoyaFoto {
  id: string;
  ruta: string;
  url: string;
  ancho: number | null;
  alto: number | null;
  orden: number;
}

export interface Joya {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  categoria: Categoria;
  tejido: Tejido | null;
  peso_gramos: number;
  largo_cm: number | null;
  ancho_mm: number | null;
  precio_usd: number | null;
  disponible: boolean;
  destacada: boolean;
  publicada: boolean;
  fotos: JoyaFoto[];
  creada_en: string;
}

export interface Nosotros {
  titulo: string;
  texto: string;
}
