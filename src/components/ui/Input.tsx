'use client';

import React from 'react';
import type { InputProps } from '@/types';

export function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  icon,
  className = '',
  inputMode,
  autoComplete,
  maxLength,
  ...restProps
}: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          inputMode={
            inputMode ||
            (type === 'tel' ? 'tel' :
            type === 'email' ? 'email' :
            type === 'number' ? 'numeric' :
            'text')
          }
          autoComplete={
            autoComplete ||
            (type === 'tel' ? 'tel' :
            type === 'email' ? 'email' :
            undefined)
          }
          maxLength={maxLength}
          {...restProps}
          className={`
            w-full px-4 py-3 ${icon ? 'pl-10' : ''}
            bg-gray-50 border border-gray-300
            rounded-lg text-gray-900 placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            min-h-[44px] text-base
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-accent-error">{error}</p>}
    </div>
  );
}
