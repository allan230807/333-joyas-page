/**
 * Dataset de patrones de tejido para cadenas de oro.
 * Cada patrón define un tipo de tejido con su animación SVG/CSS.
 * 
 * Uso: <WeavePattern type="san-francisco" />
 */

'use client';

import { motion } from 'framer-motion';

export type WeaveType =
  | 'san-francisco'
  | 'militar'
  | 'cordon'
  | 'gucci'
  | 'venezolano'
  | 'italiano'
  | 'bizantino'
  | 'cartier'
  | 'ferrara'
  | 'espiga'
  | 'serpiente'
  | 'cabeza-leon'
  | 'cuban-link'
  | 'rope'
  | 'figaro'
  | 'wheat'
  | 'mariner'
  | 'anchor'
  | 'byzantine'
  | 'singapore';

interface WeavePatternProps {
  type: WeaveType;
  className?: string;
  animated?: boolean;
}

/**
 * Renderiza un patrón SVG animado según el tipo de tejido.
 */
export default function WeavePattern({ type, className = '', animated = true }: WeavePatternProps) {
  const patterns: Record<WeaveType, React.ReactNode> = {
    'san-francisco': <SanFrancisco animated={animated} />,
    militar: <Militar animated={animated} />,
    cordon: <Cordon animated={animated} />,
    gucci: <Gucci animated={animated} />,
    venezolano: <Venezolano animated={animated} />,
    italiano: <Italiano animated={animated} />,
    bizantino: <Bizantino animated={animated} />,
    cartier: <Cartier animated={animated} />,
    ferrara: <Ferrara animated={animated} />,
    espiga: <Espiga animated={animated} />,
    serpiente: <Serpiente animated={animated} />,
    'cabeza-leon': <CabezaLeon animated={animated} />,
    'cuban-link': <CubanLink animated={animated} />,
    rope: <Rope animated={animated} />,
    figaro: <Figaro animated={animated} />,
    wheat: <Wheat animated={animated} />,
    mariner: <Mariner animated={animated} />,
    anchor: <Anchor animated={animated} />,
    byzantine: <Byzantine animated={animated} />,
    singapore: <Singapore animated={animated} />,
  };

  return (
    <div className={`weave-pattern ${className}`} data-weave-type={type}>
      {patterns[type]}
    </div>
  );
}

/* ============ PATRONES INDIVIDUALES ============ */

function SanFrancisco({ animated }: { animated: boolean }) {
  const anim = animated ? { animate: { strokeDashoffset: [20, 0] } } : {};
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="sf-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M0 10 Q5 5 10 10 T20 10" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
          <path d="M0 10 Q5 15 10 10 T20 10" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sf-pattern)" />
      {animated && (
        <motion.rect
          width="100%"
          height="100%"
          fill="transparent"
          stroke="#c9a96e"
          strokeWidth="0.5"
          {...anim}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </svg>
  );
}

function Militar({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="mil-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect x="0" y="0" width="5" height="5" fill="#c9a96e" />
          <rect x="5" y="5" width="5" height="5" fill="#c9a96e" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mil-pattern)" opacity="0.3" />
      {animated && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={i * 20 + 10}
              x2="100"
              y2={i * 20 + 10}
              stroke="#c9a96e"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Cordon({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="cor-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="2" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cor-pattern)" />
      {animated && (
        <>
          {[...Array(10)].map((_, i) => (
            <motion.circle
              key={i}
              cx={(i % 5) * 20 + 10}
              cy={Math.floor(i / 5) * 20 + 10}
              r="2"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Gucci({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="guc-pattern" patternUnits="userSpaceOnUse" width="30" height="30">
          <circle cx="15" cy="15" r="8" fill="none" stroke="#c9a96e" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
          <line x1="15" y1="0" x2="15" y2="10" stroke="#c9a96e" strokeWidth="0.5" />
          <line x1="15" y1="20" x2="15" y2="30" stroke="#c9a96e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guc-pattern)" />
      {animated && (
        <>
          {[...Array(9)].map((_, i) => (
            <motion.circle
              key={i}
              cx={(i % 3) * 33 + 16}
              cy={Math.floor(i / 3) * 33 + 16}
              r="6"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, delay: i * 0.2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Venezolano({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="ven-pattern" patternUnits="userSpaceOnUse" width="16" height="16">
          <path d="M0 8 L8 0 L16 8 L8 16 Z" fill="none" stroke="#c9a96e" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ven-pattern)" />
      {animated && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${(i % 5) * 20} ${Math.floor(i / 5) * 20 + 8} L${(i % 5) * 20 + 8} ${Math.floor(i / 5) * 20} L${(i % 5) * 20 + 16} ${Math.floor(i / 5) * 20 + 8} L${(i % 5) * 20 + 8} ${Math.floor(i / 5) * 20 + 16} Z`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Italiano({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="ita-pattern" patternUnits="userSpaceOnUse" width="12" height="12">
          <ellipse cx="6" cy="6" rx="4" ry="2" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ita-pattern)" />
      {animated && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx={(i % 5) * 20 + 10}
              cy={Math.floor(i / 5) * 25 + 12}
              rx="4"
              ry="2"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Bizantino({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="biz-pattern" patternUnits="userSpaceOnUse" width="24" height="24">
          <rect x="4" y="4" width="8" height="8" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <rect x="12" y="12" width="8" height="8" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#biz-pattern)" />
      {animated && (
        <>
          {[...Array(16)].map((_, i) => (
            <motion.rect
              key={i}
              x={(i % 4) * 25 + 5}
              y={Math.floor(i / 4) * 25 + 5}
              width="8"
              height="8"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 10, delay: i * 0.1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Cartier({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="car-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#c9a96e" strokeWidth="1" />
          <circle cx="10" cy="10" r="3" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#car-pattern)" />
      {animated && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${(i % 5) * 20 + 10} ${Math.floor(i / 5) * 20} L${(i % 5) * 20 + 20} ${Math.floor(i / 5) * 20 + 10} L${(i % 5) * 20 + 10} ${Math.floor(i / 5) * 20 + 20} L${(i % 5) * 20} ${Math.floor(i / 5) * 20 + 10} Z`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 6, delay: i * 0.1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Ferrara({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="fer-pattern" patternUnits="userSpaceOnUse" width="14" height="14">
          <path d="M0 7 Q3.5 3.5 7 7 T14 7" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fer-pattern)" />
      {animated && (
        <>
          {[...Array(14)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0 ${i * 7 + 7} Q${i % 2 === 0 ? '3.5 3.5' : '3.5 10.5'} ${i * 7 + 7} ${i * 7 + 7} T100 ${i * 7 + 7}`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Espiga({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="esp-pattern" patternUnits="userSpaceOnUse" width="10" height="20">
          <path d="M5 0 L10 10 L5 20 L0 10 Z" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#esp-pattern)" />
      {animated && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${(i % 10) * 10 + 5} ${Math.floor(i / 10) * 33} L${(i % 10) * 10 + 10} ${Math.floor(i / 10) * 33 + 10} L${(i % 10) * 10 + 5} ${Math.floor(i / 10) * 33 + 20} L${(i % 10) * 10} ${Math.floor(i / 10) * 33 + 10} Z`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 1.5, delay: i * 0.03, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Serpiente({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="ser-pattern" patternUnits="userSpaceOnUse" width="30" height="10">
          <path d="M0 5 Q7.5 0 15 5 T30 5" fill="none" stroke="#c9a96e" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ser-pattern)" />
      {animated && (
        <motion.path
          d="M0 5 Q7.5 0 15 5 T30 5"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="1.5"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </svg>
  );
}

function CabezaLeon({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="cl-pattern" patternUnits="userSpaceOnUse" width="25" height="25">
          <path d="M12.5 5 L17.5 12.5 L12.5 20 L7.5 12.5 Z" fill="none" stroke="#c9a96e" strokeWidth="1" />
          <circle cx="12.5" cy="12.5" r="2" fill="#c9a96e" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cl-pattern)" />
      {animated && (
        <>
          {[...Array(16)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${(i % 4) * 25 + 12.5} ${Math.floor(i / 4) * 25 + 5} L${(i % 4) * 25 + 17.5} ${Math.floor(i / 4) * 25 + 12.5} L${(i % 4) * 25 + 12.5} ${Math.floor(i / 4) * 25 + 20} L${(i % 4) * 25 + 7.5} ${Math.floor(i / 4) * 25 + 12.5} Z`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function CubanLink({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="cub-pattern" patternUnits="userSpaceOnUse" width="16" height="16">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="#c9a96e" strokeWidth="1" transform="rotate(45 8 8)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cub-pattern)" />
      {animated && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.rect
              key={i}
              x={(i % 5) * 20 + 4}
              y={Math.floor(i / 5) * 20 + 4}
              width="12"
              height="12"
              rx="2"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ rotate: [45, 135, 45] }}
              transition={{ duration: 4, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Rope({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="rope-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M0 10 Q5 0 10 10 T20 10" fill="none" stroke="#c9a96e" strokeWidth="1.5" />
          <path d="M0 10 Q5 20 10 10 T20 10" fill="none" stroke="#b8944d" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rope-pattern)" />
      {animated && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0 ${i * 20 + 10} Q5 ${i * 20} 10 ${i * 20 + 10} T20 ${i * 20 + 10}`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1.5"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Figaro({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="fig-pattern" patternUnits="userSpaceOnUse" width="30" height="10">
          <ellipse cx="8" cy="5" rx="6" ry="3" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <ellipse cx="22" cy="5" rx="6" ry="3" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <ellipse cx="36" cy="5" rx="6" ry="3" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fig-pattern)" />
      {animated && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx={(i % 10) * 10 + 5}
              cy={Math.floor(i / 10) * 33 + 5}
              rx="6"
              ry="3"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ scaleX: [1, 1.1, 1] }}
              transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Wheat({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="wheat-pattern" patternUnits="userSpaceOnUse" width="12" height="24">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <path d="M6 12 L12 18 L6 24 L0 18 Z" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wheat-pattern)" />
      {animated && (
        <>
          {[...Array(50)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${(i % 10) * 10 + 6} ${Math.floor(i / 10) * 20} L${(i % 10) * 10 + 12} ${Math.floor(i / 10) * 20 + 6} L${(i % 10) * 10 + 6} ${Math.floor(i / 10) * 20 + 12} L${(i % 10) * 10} ${Math.floor(i / 10) * 20 + 6} Z`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, delay: i * 0.03, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Mariner({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="mar-pattern" patternUnits="userSpaceOnUse" width="20" height="10">
          <path d="M0 5 Q5 0 10 5 Q15 10 20 5" fill="none" stroke="#c9a96e" strokeWidth="1" />
          <line x1="10" y1="0" x2="10" y2="10" stroke="#c9a96e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mar-pattern)" />
      {animated && (
        <>
          {[...Array(10)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${i * 10} 5 Q${i * 10 + 5} 0 ${i * 10 + 10} 5 Q${i * 10 + 15} 10 ${i * 10 + 20} 5`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ scaleY: [1, 1.3, 1] }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Anchor({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="anchor-pattern" patternUnits="userSpaceOnUse" width="24" height="12">
          <path d="M0 6 Q6 0 12 6 Q18 12 24 6" fill="none" stroke="#c9a96e" strokeWidth="1" />
          <line x1="12" y1="0" x2="12" y2="12" stroke="#c9a96e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#anchor-pattern)" />
      {animated && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${i * 12} 6 Q${i * 12 + 6} 0 ${i * 12 + 12} 6 Q${i * 12 + 18} 12 ${i * 12 + 24} 6`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="1"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Byzantine({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="byz-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect x="2" y="2" width="7" height="7" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <rect x="11" y="11" width="7" height="7" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#byz-pattern)" />
      {animated && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.rect
              key={i}
              x={(i % 5) * 20 + 3}
              y={Math.floor(i / 5) * 20 + 3}
              width="7"
              height="7"
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 8, delay: i * 0.1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

function Singapore({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="sing-pattern" patternUnits="userSpaceOnUse" width="16" height="16">
          <path d="M0 8 L8 0 L16 8 L8 16 Z" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
          <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="none" stroke="#b8944d" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sing-pattern)" />
      {animated && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${(i % 5) * 20} ${Math.floor(i / 5) * 20 + 8} L${(i % 5) * 20 + 8} ${Math.floor(i / 5) * 20} L${(i % 5) * 20 + 16} ${Math.floor(i / 5) * 20 + 8} L${(i % 5) * 20 + 8} ${Math.floor(i / 5) * 20 + 16} Z`}
              fill="none"
              stroke="#c9a96e"
              strokeWidth="0.8"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 6, delay: i * 0.1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

/* ============ DATASET DE TEJIDOS ============ */

export const WEAVE_TYPES: { type: WeaveType; name: string; description: string }[] = [
  { type: 'san-francisco', name: 'San Francisco', description: 'Tejido fino y delicado, ideal para cadenas elegantes' },
  { type: 'militar', name: 'Militar', description: 'Tejido robusto y resistente, estilo clásico' },
  { type: 'cordon', name: 'Cordón', description: 'Tejido en espiral, muy flexible y cómodo' },
  { type: 'gucci', name: 'Gucci', description: 'Tejido circular entrelazado, estilo italiano' },
  { type: 'venezolano', name: 'Venezolano', description: 'Tejido en rombo, tradicional de Venezuela' },
  { type: 'italiano', name: 'Italiano', description: 'Tejido en óvalo, elegante y refinado' },
  { type: 'bizantino', name: 'Bizantino', description: 'Tejido en cuadrado, complejo y duradero' },
  { type: 'cartier', name: 'Cartier', description: 'Tejido en diamante, lujoso y llamativo' },
  { type: 'ferrara', name: 'Ferrara', description: 'Tejido ondulado, italiano clásico' },
  { type: 'espiga', name: 'Espiga', description: 'Tejido en forma de espiga, resistente' },
  { type: 'serpiente', name: 'Serpiente', description: 'Tejido en ondas fluidas, sedoso al tacto' },
  { type: 'cabeza-leon', name: 'Cabeza de León', description: 'Tejido en rombo con centro, imponente' },
  { type: 'cuban-link', name: 'Cuban Link', description: 'Tejido en eslabones ovalados, grueso y pesado' },
  { type: 'rope', name: 'Rope', description: 'Tejido en torsión, similar a una cuerda' },
  { type: 'figaro', name: 'Figaro', description: 'Tejido alternado 3+1, italiano clásico' },
  { type: 'wheat', name: 'Wheat', description: 'Tejido en V, similar a espigas de trigo' },
  { type: 'mariner', name: 'Mariner', description: 'Tejido naval con línea central' },
  { type: 'anchor', name: 'Anchor', description: 'Tejido marino clásico con cruce' },
  { type: 'byzantine', name: 'Byzantine', description: 'Tejido imperial, cuadrado entrelazado' },
  { type: 'singapore', name: 'Singapore', description: 'Tejido en rombo doble, moderno' },
];
