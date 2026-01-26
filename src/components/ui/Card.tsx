import React from 'react';
import type { CardProps } from '@/types';

const variantClasses = {
  default: 'bg-white border-gray-200',
  primary: 'bg-primary/10 border-primary/30',
  secondary: 'bg-gray-50 border-gray-200',
};

export function Card({
  variant = 'default',
  hover = false,
  onClick,
  className = '',
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        ${variantClasses[variant]}
        border rounded-xl p-4
        ${hover ? 'hover:bg-background-hover transition-all duration-200 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
