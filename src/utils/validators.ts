/**
 * Validation utility functions
 */

import { VALIDATION } from '@/constants';

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE_REGEX.test(phone);
}

/**
 * Validate password
 */
export function isValidPassword(password: string): boolean {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
}

/**
 * Validate OTP
 */
export function isValidOTP(otp: string): boolean {
  return otp.length === VALIDATION.OTP_LENGTH && /^\d+$/.test(otp);
}

/**
 * Get password strength
 */
export function getPasswordStrength(password: string): {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
} {
  let score = 0;

  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Contains lowercase
  if (/[a-z]/.test(password)) score++;

  // Contains uppercase
  if (/[A-Z]/.test(password)) score++;

  // Contains number
  if (/\d/.test(password)) score++;

  // Contains special character
  if (/[^a-zA-Z\d]/.test(password)) score++;

  if (score <= 2) {
    return { score, label: 'Weak', color: '#FF3B30' };
  }
  if (score <= 4) {
    return { score, label: 'Fair', color: '#FF9500' };
  }
  if (score <= 5) {
    return { score, label: 'Good', color: '#34C759' };
  }
  return { score, label: 'Strong', color: '#00D4FF' };
}

/**
 * Sanitize input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
