import Link from 'next/link';
import TejidoAnimado from '@/components/tejidos/TejidoAnimado';

export default function NoEncontrada() {
  return (
    <div className="contenedor flex min-h-[80svh] flex-col items-center justify-center pt-20 text-center">
      <p className="rotulo">Error 404</p>
      <h1 className="titulo mt-4">Esta pieza no está aquí</h1>
      <TejidoAnimado tejido="espiga" className="mt-10 h-12 w-full max-w-sm" />
      <p className="mt-8 max-w-sm text-niebla">Puede que la página haya cambiado o que la pieza ya no esté disponible.</p>
      <Link href="/catalogo" className="boton-oro mt-10">
        Ver catálogo
      </Link>
    </div>
  );
}
