import * as React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-block font-body rounded-none uppercase tracking-widest transition-all duration-200 text-center';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:text-accent'
  };

  const sizes = {
    sm: 'px-4 py-2 text-small',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body font-medium'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
