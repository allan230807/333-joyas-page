import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  textarea?: boolean;
}

export function Input({ label, error, textarea, className = '', ...props }: InputProps) {
  const Component = textarea ? 'textarea' : 'input';
  
  return (
    <div className={`w-full ${className}`}>
      <label className="text-small font-medium text-primary mb-1 block">
        {label}
        {props.required && <span className="text-accent ml-1">*</span>}
      </label>
      <Component
        className="w-full border border-border bg-white px-4 py-3 text-body text-primary placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors rounded-none"
        {...(props as any)}
      />
      {error && (
        <p className="text-red-500 text-small mt-1">{error}</p>
      )}
    </div>
  );
}

export default Input;
