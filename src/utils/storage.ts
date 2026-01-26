/**
 * Browser Storage Utilities
 * Safe localStorage and sessionStorage operations
 */

import { STORAGE_KEYS } from '@/constants';

class StorageService {
  private isClient = typeof window !== 'undefined';

  /**
   * Set item in localStorage
   */
  setItem(key: string, value: unknown): void {
    if (!this.isClient) return;

    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch {
      // Silently fail - localStorage errors are not critical
    }
  }

  /**
   * Get item from localStorage
   */
  getItem<T>(key: string): T | null {
    if (!this.isClient) return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      // Silently fail - localStorage errors are not critical
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    if (!this.isClient) return;

    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail - localStorage errors are not critical
    }
  }

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    if (!this.isClient) return;

    try {
      localStorage.clear();
    } catch {
      // Silently fail - localStorage errors are not critical
    }
  }

  /**
   * Save auth tokens
   */
  saveTokens(accessToken: string, refreshToken: string): void {
    this.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return this.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return this.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Remove auth tokens
   */
  clearTokens(): void {
    this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Save user data
   */
  saveUser(user: unknown): void {
    this.setItem(STORAGE_KEYS.USER_DATA, user);
  }

  /**
   * Get user data
   */
  getUser<T>(): T | null {
    return this.getItem<T>(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Remove user data
   */
  clearUser(): void {
    this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Clear all auth data
   */
  clearAuth(): void {
    this.clearTokens();
    this.clearUser();
  }
}

// Export singleton instance
export const storage = new StorageService();
