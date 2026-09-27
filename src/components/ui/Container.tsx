import * as React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({ children, className = '', as: Component = 'div', ...props }: ContainerProps) {
  return (
    <Component className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </Component>
  );
}

export default Container;
