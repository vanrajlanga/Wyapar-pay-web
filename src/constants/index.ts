/**
 * Application Constants
 * Centralized location for all constants to avoid magic strings
 */

// Storage keys for localStorage
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'language',
  THEME: 'theme',
  BIOMETRIC_ENABLED: 'biometric_enabled',
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    REQUEST_OTP: '/auth/request-otp',
    OTP_LOGIN: '/auth/otp-login',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
    DOCUMENTS: '/user/documents',
    KYC: '/user/kyc',
  },
  WALLET: {
    BALANCE: '/wallet/balance',
    TRANSACTIONS: '/wallet/transactions',
    TRANSFER: '/wallet/transfer',
  },
  NOTIFICATIONS: {
    REGISTER_DEVICE: '/notifications/register-device',
    PREFERENCES: '/notifications/preferences',
    STATS: '/notifications/stats',
  },
  PAYMENT: {
    CREATE_ORDER: '/payment/create-order',
    VERIFY: '/payment/verify',
  },
  RECHARGE: {
    DETECT_OPERATOR: '/recharge/detect-operator',
    GET_OPERATORS: '/recharge/operators',
    GET_ALL_OPERATORS: '/recharge/all-operators',
    FETCH_AND_STORE_OPERATORS: '/recharge/fetch-operators',
    GET_CIRCLES: (operatorCode: string) => `/recharge/circles/${operatorCode}`,
    GET_ALL_CIRCLES: '/recharge/all-circles',
    FETCH_AND_STORE_CIRCLES: '/recharge/fetch-circles',
    GET_PLANS: '/recharge/plans',
    VALIDATE: '/recharge/validate',
    PROCESS_MOBILE: '/recharge/mobile',
    GET_HISTORY: '/recharge/history',
    GET_FAVORITES: '/recharge/favorites',
    ADD_FAVORITE: '/recharge/favorites',
    REMOVE_FAVORITE: (id: string) => `/recharge/favorites/${id}`,
    KWIKAPI_BALANCE: '/recharge/kwikapi/balance',
    KWIKAPI_RECHARGE: '/recharge/kwikapi/recharge',
    KWIKAPI_STATUS: '/recharge/kwikapi/status',
  },
  TRANSACTIONS: {
    GET_ALL: '/transactions',
    GET_BY_ID: (id: string) => `/transactions/${id}`,
    GET_SUMMARY: '/transactions/summary/overview',
    GET_RECENT: '/transactions/recent/list',
    GET_BY_CATEGORY: (category: string) => `/transactions/category/${category}`,
    SEARCH: '/transactions/search/query',
    GET_STATS: '/transactions/stats/analytics',
    UPDATE_STATUS: (id: string) => `/transactions/${id}/status`,
  },
} as const;

// Default test credentials (only for development)
export const DEFAULT_TEST_CREDENTIALS = {
  PHONE: '1234567899',
  EMAIL: 'admin@wyaparpay.com',
  PASSWORD: 'admin',
  OTP: '123456',
} as const;

// App theme colors
export const THEME_COLORS = {
  PRIMARY: '#00D4FF',
  SECONDARY: '#0F0F23',
  BACKGROUND: '#0F0F23',
  WHITE: '#FFFFFF',
  ERROR: '#FF3B30',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: 'rgba(255, 255, 255, 0.6)',
} as const;

// Validation patterns
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PASSWORD_MIN_LENGTH: 6,
  OTP_LENGTH: 6,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_CREDENTIALS: 'Invalid credentials. Please check and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please verify your email.',
  VERIFICATION_SUCCESS: 'Email verified successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PREFERENCES_UPDATED: 'Preferences updated successfully.',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  OTP_LOGIN: '/otp-login',
  OTP_VERIFY: '/otp-verify',
  EMAIL_VERIFY: '/email-verify',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ACCOUNT_DETAILS: '/account-details',
  PREFERENCES: '/preferences',
  SECURITY: '/security',
  RECHARGE: '/recharge',
  RECHARGE_PLANS: '/recharge/plans',
  RECHARGE_REVIEW: '/recharge/review',
  RECHARGE_STATUS: '/recharge/status',
  RECHARGE_HISTORY: '/recharge/history',
  TRANSACTIONS: '/transactions',
  PAYMENT_SUCCESS: '/payment-success',
  UPI_WALLET: '/upi-wallet',
} as const;
