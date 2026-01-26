import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  showBackLink?: boolean;
}

/**
 * AuthLayout - Shared layout for authentication pages
 * Provides consistent structure for login, register, and other auth pages
 *
 * @example
 * <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
 *   <LoginForm />
 * </AuthLayout>
 */
export function AuthLayout({
  title,
  subtitle,
  children,
  showBackLink = true,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-text-secondary">{subtitle}</p>
        </div>

        {/* Content Card */}
        <div className="bg-background-card border border-white/10 rounded-2xl p-8">
          {children}
        </div>

        {/* Back Link */}
        {showBackLink && (
          <div className="mt-6 text-center">
            <Link
              href={ROUTES.HOME}
              className="text-text-tertiary hover:text-text-secondary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
