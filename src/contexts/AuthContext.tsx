'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { authService } from '@/services/auth.service';
import { storage } from '@/utils/storage';
import { logger } from '@/utils/logger';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  OtpRequest,
  OtpVerifyRequest,
} from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  requestOtp: (data: OtpRequest) => Promise<void>;
  loginWithOtp: (data: OtpVerifyRequest) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = storage.getUser<User>();
        const token = storage.getAccessToken();

        if (storedUser && token) {
          setUser(storedUser);
        }
      } catch (error) {
        logger.error('Error initializing auth', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      setUser(response.user);
      logger.info('Login successful');
    } catch (error) {
      logger.error('Login failed', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      await authService.register(data);
      logger.info('Registration successful');
    } catch (error) {
      logger.error('Registration failed', error);
      throw error;
    }
  };

  const requestOtp = async (data: OtpRequest) => {
    try {
      await authService.requestOtp(data);
      logger.info('OTP requested successfully');
    } catch (error) {
      logger.error('OTP request failed', error);
      throw error;
    }
  };

  const loginWithOtp = async (data: OtpVerifyRequest) => {
    try {
      const response = await authService.loginWithOtp(data);
      setUser(response.user);
      logger.info('OTP login successful');
    } catch (error) {
      logger.error('OTP login failed', error);
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      await authService.verifyEmail(token);
      logger.info('Email verified successfully');
    } catch (error) {
      logger.error('Email verification failed', error);
      throw error;
    }
  };

  const resendVerification = async (userId: string) => {
    try {
      await authService.resendVerification(userId);
      logger.info('Verification email resent');
    } catch (error) {
      logger.error('Resend verification failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      logger.info('Logout successful');
    } catch (error) {
      logger.error('Logout failed', error);
      // Still clear local state even if API call fails
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const storedUser = storage.getUser<User>();
      setUser(storedUser);
    } catch (error) {
      logger.error('Error refreshing user', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    requestOtp,
    loginWithOtp,
    verifyEmail,
    resendVerification,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
