import type { SVGProps } from 'react';

// Íconos de línea fina, coherentes con el estilo de los tejidos.
type P = SVGProps<SVGSVGElement> & { tamano?: number };

function Base({ tamano = 20, children, ...props }: P) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconoMenu = (p: P) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h16" />
  </Base>
);

export const IconoCerrar = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const IconoBolsa = (p: P) => (
  <Base {...p}>
    <path d="M5 8h14l-1.2 12H6.2L5 8z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Base>
);

export const IconoFlecha = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IconoMas = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconoMenos = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const IconoBalanza = (p: P) => (
  <Base {...p}>
    <path d="M12 4v16M7 20h10M5 7h14" />
    <path d="M5 7l-3 6a3 3 0 0 0 6 0L5 7zM19 7l-3 6a3 3 0 0 0 6 0l-3-6z" />
  </Base>
);

export const IconoWhatsApp = (p: P) => (
  <Base {...p}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20z" />
    <path d="M9 9.5c.2 2 2.5 4.3 4.5 4.5l1-1.2 1.8.9c-.3 1-1.2 1.6-2.2 1.5A6.2 6.2 0 0 1 8.4 9.4c0-1 .5-1.9 1.5-2.2l.9 1.8L9 9.5z" />
  </Base>
);

export const IconoInstagram = (p: P) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </Base>
);

export const IconoUbicacion = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
);
