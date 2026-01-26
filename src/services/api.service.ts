/**
 * API Service
 * Centralized HTTP client with error handling, timeout, and logging
 */

import { API_CONFIG, ERROR_MESSAGES } from '@/constants';
import { logger } from '@/utils/logger';
import { storage } from '@/utils/storage';
import type { ApiError as IApiError } from '@/types';

/**
 * Custom API Error class
 */
export class ApiError extends Error implements IApiError {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API Service Class
 */
class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Internal request method with timeout and error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const url = `${this.baseUrl}${endpoint}`;

    // Get token from storage
    const token = storage.getAccessToken();

    // Log API call
    logger.logApiCall(
      options.method || 'GET',
      endpoint,
      options.body ? JSON.parse(options.body as string) : undefined
    );

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      // Parse response
      const data = await response.json();

      // Log response
      logger.logApiResponse(endpoint, response.status, data);

      // Handle non-OK responses
      if (!response.ok) {
        throw new ApiError(
          data.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle specific error types
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        logger.error('API request timeout', error, { endpoint });
        throw new ApiError('Request timeout. Please try again.');
      }

      // Network error
      logger.error('API network error', error, { endpoint });
      throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, customToken?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: unknown, customToken?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: unknown, customToken?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, customToken?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data: unknown,
    customToken?: string
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: customToken ? { Authorization: `Bearer ${customToken}` } : {},
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
