import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * useAuthGuard - Hook to protect routes and handle authentication redirects
 *
 * @example
 * // Protect a route (requires authentication)
 * function DashboardPage() {
 *   const { isLoading } = useAuthGuard({ redirectTo: '/login' });
 *   if (isLoading) return <LoadingScreen />;
 *   // Page content
 * }
 *
 * @example
 * // Public route (redirect if already authenticated)
 * function LoginPage() {
 *   useAuthGuard({ redirectTo: '/dashboard', requireAuth: false });
 *   // Login form
 * }
 */
export function useAuthGuard({
  redirectTo,
  requireAuth = true,
}: UseAuthGuardOptions = {}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Require authentication
    if (requireAuth && !isAuthenticated && redirectTo) {
      router.push(redirectTo);
    }

    // Already authenticated (e.g., on login page)
    if (!requireAuth && isAuthenticated && redirectTo) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  return { isLoading, isAuthenticated };
}
