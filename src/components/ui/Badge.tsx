import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 uppercase tracking-wider text-xs font-body whitespace-nowrap';
  
  const variants = {
    default: 'bg-primary/5 text-primary',
    accent: 'bg-accent/10 text-accent'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;
