import React from 'react';
import { MdError, MdClose } from 'react-icons/md';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  variant?: 'error' | 'warning' | 'info';
}

const variantStyles = {
  error: {
    bg: 'bg-accent-error/20',
    border: 'border-accent-error/50',
    text: 'text-accent-error',
    icon: 'text-accent-error',
  },
  warning: {
    bg: 'bg-accent-warning/20',
    border: 'border-accent-warning/50',
    text: 'text-accent-warning',
    icon: 'text-accent-warning',
  },
  info: {
    bg: 'bg-primary/20',
    border: 'border-primary/50',
    text: 'text-primary',
    icon: 'text-primary',
  },
};

/**
 * ErrorAlert - Reusable alert component for displaying errors, warnings, and info
 *
 * @example
 * <ErrorAlert
 *   message="Login failed. Please try again."
 *   onClose={() => setError('')}
 * />
 */
export function ErrorAlert({
  message,
  onClose,
  variant = 'error',
}: ErrorAlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        flex items-start gap-3 p-3 rounded-lg border
        ${styles.bg} ${styles.border} ${styles.text}
      `}
      role="alert"
    >
      <MdError size={20} className={`flex-shrink-0 mt-0.5 ${styles.icon}`} />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-75 transition-opacity"
          aria-label="Close alert"
        >
          <MdClose size={20} />
        </button>
      )}
    </div>
  );
}
