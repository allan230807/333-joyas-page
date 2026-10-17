import Link from 'next/link';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="333 Joyas, inicio" className={`group inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-serif text-[1.65rem] font-light leading-none tracking-[0.04em] text-marfil transition-colors duration-500 group-hover:text-oro-claro">
        333
      </span>
      <span className="text-[0.62rem] font-medium uppercase tracking-[0.42em] text-oro">Joyas</span>
    </Link>
  );
}
