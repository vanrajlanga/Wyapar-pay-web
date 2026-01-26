'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { userService } from '@/services/user.service';
import { storage } from '@/utils/storage';
import { logger } from '@/utils/logger';
import type { User, UserPreferences } from '@/types';

interface UserContextType {
  userData: User | null;
  preferences: UserPreferences | null;
  isLoading: boolean;
  loadUserData: () => Promise<void>;
  loadPreferences: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (data: Partial<UserPreferences>) => Promise<void>;
  togglePreference: (key: keyof UserPreferences, value: unknown) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultPreferences: UserPreferences = {
  language: 'en',
  currency: 'INR',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  theme: 'dark',
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user data from storage on mount
  useEffect(() => {
    const storedUser = storage.getUser<User>();
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const profile = await userService.getProfile();
      setUserData(profile);
      storage.saveUser(profile);
      logger.info('User data loaded');
    } catch (error) {
      logger.error('Error loading user data', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreferences = async () => {
    setIsLoading(true);
    try {
      const prefs = await userService.getPreferences();
      setPreferences(prefs);
      logger.info('Preferences loaded');
    } catch (error) {
      logger.error('Error loading preferences', error);
      // Use default preferences if API fails
      setPreferences(defaultPreferences);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updated = await userService.updateProfile(data);
      setUserData(updated);
      storage.saveUser(updated);
      logger.info('Profile updated');
    } catch (error) {
      logger.error('Error updating profile', error);
      throw error;
    }
  };

  const updatePreferences = async (data: Partial<UserPreferences>) => {
    try {
      const updated = await userService.updatePreferences(data);
      setPreferences(updated);
      logger.info('Preferences updated');
    } catch (error) {
      logger.error('Error updating preferences', error);
      throw error;
    }
  };

  const togglePreference = async (key: keyof UserPreferences, value: unknown) => {
    if (!preferences) return;

    const updated = {
      ...preferences,
      [key]: value,
    };

    try {
      await updatePreferences(updated);
    } catch (error) {
      logger.error('Error toggling preference', error);
      throw error;
    }
  };

  const value: UserContextType = {
    userData,
    preferences,
    isLoading,
    loadUserData,
    loadPreferences,
    updateProfile,
    updatePreferences,
    togglePreference,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
