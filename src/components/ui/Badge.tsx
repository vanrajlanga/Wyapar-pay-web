import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-white/10 text-white',
  success: 'bg-accent-success/20 text-accent-success',
  error: 'bg-accent-error/20 text-accent-error',
  warning: 'bg-accent-warning/20 text-accent-warning',
  info: 'bg-primary/20 text-primary',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        inline-flex items-center rounded-full font-medium
        ${className}
      `}
    >
      {children}
    </span>
  );
}
