import { useState, useCallback } from 'react';

interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: unknown[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * useAsync - Hook for handling async operations with loading and error states
 *
 * @example
 * const { data, loading, error, execute } = useAsync(fetchUserData);
 *
 * // Execute the async function
 * useEffect(() => {
 *   execute(userId);
 * }, [userId]);
 *
 * if (loading) return <Spinner />;
 * if (error) return <ErrorAlert message={error.message} />;
 * return <div>{data}</div>;
 */
export function useAsync<T>(
  asyncFunction: (...args: unknown[]) => Promise<T>
): UseAsyncReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}
