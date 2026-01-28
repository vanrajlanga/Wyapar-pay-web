/**
 * Type Definitions
 * Centralized location for all TypeScript types and interfaces
 */

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'pending_kyc';
  kycStatus?: 'not_started' | 'pending' | 'approved' | 'rejected';
  panNumber?: string;
  aadhaarNumber?: string;
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  profileImage?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: string;
  preferences?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  language: 'en' | 'hi' | 'kn';
  currency: 'INR';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark';
}

// Auth Types
export interface LoginRequest {
  identifier: string; // email or phone
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  sessionId?: string;
}

export interface OtpRequest {
  identifier: string; // email or phone
}

export interface OtpVerifyRequest {
  identifier: string;
  otp: string;
}

// Wallet Types
export interface WalletBalance {
  balance: number;
  currency: string;
  lastUpdated: string;
}

// Transaction Types
export type TransactionType =
  | 'mobile_recharge'
  | 'dth_recharge'
  | 'electricity_bill'
  | 'water_bill'
  | 'gas_bill'
  | 'wallet_transfer'
  | 'wallet_topup';

export type TransactionStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'refunded';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  totalAmount: number;
  successAmount: number;
}

// Recharge Types
export interface RechargeOperator {
  code: string;
  name: string;
  displayName: string;
  type: 'prepaid' | 'postpaid' | 'both';
  logo?: string;
  color: string;
}

export interface RechargeCircle {
  code: string;
  name: string;
  displayName: string;
}

export interface RechargePlan {
  id: string;
  operator: string;
  circle: string;
  amount: number;
  validity: string;
  description: string;
  data?: string;
  voice?: string;
  sms?: string;
  benefits?: string[];
  category: 'topup' | 'data' | 'unlimited' | 'roaming' | 'special';
  popular?: boolean;
}

export interface RechargeRequest {
  mobileNumber: string;
  operator: string;
  circle?: string;
  amount: number;
  planId?: string;
}

export interface RechargeResponse {
  transactionId: string;
  status: TransactionStatus;
  message: string;
  operator: string;
  mobileNumber: string;
  amount: number;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  response?: unknown;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'type'> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'secondary';
  hover?: boolean;
  onClick?: () => void;
}
