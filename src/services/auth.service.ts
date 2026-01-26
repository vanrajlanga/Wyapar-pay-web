/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { API_ENDPOINTS } from '@/constants';
import { apiService } from './api.service';
import { storage } from '@/utils/storage';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  OtpRequest,
  OtpVerifyRequest,
} from '@/types';

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    // Don't save tokens on registration - email verification required
    return response;
  }

  /**
   * Login with email/phone and password
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    // Save tokens and user data
    if (response.tokens?.accessToken && response.tokens?.refreshToken) {
      storage.saveTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken
      );
      storage.saveUser(response.user);
    }

    return response;
  }

  /**
   * Request OTP for login
   */
  async requestOtp(data: OtpRequest): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      API_ENDPOINTS.AUTH.REQUEST_OTP,
      data
    );
  }

  /**
   * Login with OTP
   */
  async loginWithOtp(data: OtpVerifyRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.OTP_LOGIN,
      data
    );

    // Save tokens and user data
    if (response.tokens?.accessToken && response.tokens?.refreshToken) {
      storage.saveTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken
      );
      storage.saveUser(response.user);
    }

    return response;
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { token }
    );
  }

  /**
   * Resend verification email
   */
  async resendVerification(userId: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      { userId }
    );
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT, {});
    } finally {
      // Always clear local data, even if API call fails
      storage.clearAuth();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = storage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    // Update tokens
    if (response.tokens?.accessToken && response.tokens?.refreshToken) {
      storage.saveTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken
      );
    }

    return response;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!storage.getAccessToken();
  }

  /**
   * Get current user from storage
   */
  getCurrentUser() {
    return storage.getUser();
  }
}

// Export singleton instance
export const authService = new AuthService();
