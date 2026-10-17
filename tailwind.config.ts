import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noche: '#0b0b0c',
        carbon: '#141312',
        linea: '#2a2620',
        marfil: '#f3eee4',
        niebla: '#a39d92',
        oro: {
          DEFAULT: '#c9a45c',
          claro: '#ecd59f',
          oscuro: '#8f7036',
        },
        // Alias usados por las páginas legales.
        primary: '#f3eee4',
        muted: '#a39d92',
        accent: '#c9a45c',
        border: '#2a2620',
      },
      fontFamily: {
        serif: ['var(--fuente-serif)', 'Georgia', 'serif'],
        sans: ['var(--fuente-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--fuente-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        h2: ['clamp(2rem, 6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h3: ['1.5rem', { lineHeight: '1.25' }],
        body: ['1rem', { lineHeight: '1.75' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        contenedor: '1240px',
      },
      transitionTimingFunction: {
        suave: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        brillo: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
      },
      animation: {
        brillo: 'brillo 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
