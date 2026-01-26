/**
 * Type Guards
 * Runtime type checking utilities
 */

import type { User, Transaction } from '@/types';

/**
 * Type guard for User object
 */
export function isUser(obj: unknown): obj is User {
  if (typeof obj !== 'object' || obj === null) return false;
  const record = obj as Record<string, unknown>;
  return (
    'id' in record &&
    'name' in record &&
    'email' in record &&
    'phone' in record &&
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.email === 'string' &&
    typeof record.phone === 'string'
  );
}

/**
 * Type guard for Transaction object
 */
export function isTransaction(obj: unknown): obj is Transaction {
  if (typeof obj !== 'object' || obj === null) return false;
  const record = obj as Record<string, unknown>;
  return (
    'id' in record &&
    'type' in record &&
    'amount' in record &&
    'status' in record &&
    typeof record.id === 'string' &&
    typeof record.type === 'string' &&
    typeof record.amount === 'number' &&
    typeof record.status === 'string'
  );
}

/**
 * Type guard for API response
 */
export function isApiResponse<T>(
  obj: unknown
): obj is { success: boolean; data?: T; message?: string } {
  if (typeof obj !== 'object' || obj === null) return false;
  const record = obj as Record<string, unknown>;
  return 'success' in record && typeof record.success === 'boolean';
}
