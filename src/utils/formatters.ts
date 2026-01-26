/**
 * Utility functions for formatting data
 */

/**
 * Format currency (INR)
 */
export function formatCurrency(
  amount: number,
  currency: string = 'INR'
): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'time' = 'short'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'time') {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  }

  if (format === 'long') {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(d);
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Assuming Indian phone numbers
  if (phone.length === 10) {
    return phone.replace(/(\d{5})(\d{5})/, '$1 $2');
  }
  return phone;
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSec < 60) return 'Just now';
  if (diffInMin < 60)
    return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return formatDate(d);
}

/**
 * Mask sensitive data (e.g., phone number, card number)
 */
export function maskSensitive(value: string, visibleChars: number = 4): string {
  if (value.length <= visibleChars) return value;
  const masked = '*'.repeat(value.length - visibleChars);
  return masked + value.slice(-visibleChars);
}
