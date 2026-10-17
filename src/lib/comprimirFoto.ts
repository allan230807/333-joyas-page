'use client';

// Reduce una foto del teléfono antes de subirla: lado mayor a 2000 px y WebP
// (JPEG si el navegador no sabe codificar WebP, p. ej. Safari antiguo).
// Respeta la orientación EXIF, así las fotos verticales no quedan acostadas.

const LADO_MAXIMO = 2000;
const CALIDAD = 0.86;

export interface FotoComprimida {
  blob: Blob;
  ancho: number;
  alto: number;
  extension: 'webp' | 'jpg';
}

function aBlob(lienzo: HTMLCanvasElement, tipo: string): Promise<Blob | null> {
  return new Promise((resolver) => lienzo.toBlob(resolver, tipo, CALIDAD));
}

export async function comprimirFoto(archivo: File): Promise<FotoComprimida> {
  const imagen = await createImageBitmap(archivo, { imageOrientation: 'from-image' });
  const escala = Math.min(1, LADO_MAXIMO / Math.max(imagen.width, imagen.height));
  const ancho = Math.round(imagen.width * escala);
  const alto = Math.round(imagen.height * escala);

  const lienzo = document.createElement('canvas');
  lienzo.width = ancho;
  lienzo.height = alto;
  const ctx = lienzo.getContext('2d');
  if (!ctx) throw new Error('El navegador no permite procesar imágenes.');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(imagen, 0, 0, ancho, alto);
  imagen.close();

  const webp = await aBlob(lienzo, 'image/webp');
  if (webp && webp.type === 'image/webp') return { blob: webp, ancho, alto, extension: 'webp' };

  const jpeg = await aBlob(lienzo, 'image/jpeg');
  if (!jpeg) throw new Error('No se pudo convertir la foto.');
  return { blob: jpeg, ancho, alto, extension: 'jpg' };
}
