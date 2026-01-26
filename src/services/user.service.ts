/**
 * User Service
 * Handles user profile and preferences
 */

import { API_ENDPOINTS } from '@/constants';
import { apiService } from './api.service';
import type { User, UserPreferences } from '@/types';

class UserService {
  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    return apiService.get<User>(API_ENDPOINTS.USER.PROFILE);
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    return apiService.put<User>(API_ENDPOINTS.USER.PROFILE, data);
  }

  /**
   * Get user preferences
   */
  async getPreferences(): Promise<UserPreferences> {
    return apiService.get<UserPreferences>(API_ENDPOINTS.USER.PREFERENCES);
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    data: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    return apiService.put<UserPreferences>(
      API_ENDPOINTS.USER.PREFERENCES,
      data
    );
  }

  /**
   * Upload profile image
   */
  async uploadProfileImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    // Note: This endpoint would need multipart/form-data support
    // Implementation would differ from regular JSON API calls
    return apiService.post<{ url: string }>(
      `${API_ENDPOINTS.USER.PROFILE}/image`,
      formData
    );
  }
}

// Export singleton instance
export const userService = new UserService();
