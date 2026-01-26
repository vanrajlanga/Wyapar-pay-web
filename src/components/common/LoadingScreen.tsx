import React from 'react';
import { Spinner } from '@/components/ui';

interface LoadingScreenProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * LoadingScreen - Full-screen loading indicator
 *
 * @example
 * <LoadingScreen message="Loading your dashboard..." />
 */
export function LoadingScreen({
  message = 'Loading...',
  size = 'xl',
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Spinner size={size} />
      {message && (
        <p className="text-text-secondary animate-pulse">{message}</p>
      )}
    </div>
  );
}
