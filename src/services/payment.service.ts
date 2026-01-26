/**
 * Payment Service
 * Handles payment operations with Razorpay
 */

import { API_ENDPOINTS } from '@/constants';
import { apiService } from './api.service';

export interface CreatePaymentOrderRequest {
  amount: number;
  currency?: string;
  notes?: Record<string, string>;
}

export interface CreatePaymentOrderResponse {
  razorpay_order_id: string;
  razorpay_key: string;
  amount: number;
  currency: string;
  transactionId: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  order: {
    id: string;
    status: string;
    amount: number;
    currency: string;
  };
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

class PaymentService {
  private razorpayKeyId: string | null = null;

  /**
   * Initialize Razorpay by loading the SDK script
   */
  async initializeRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }

      // Load Razorpay SDK
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  /**
   * Set Razorpay key ID
   */
  setRazorpayKey(keyId: string): void {
    this.razorpayKeyId = keyId;
  }

  /**
   * Get Razorpay key ID
   */
  getRazorpayKey(): string {
    if (!this.razorpayKeyId) {
      throw new Error('Razorpay key not set. Please initialize payment service.');
    }
    return this.razorpayKeyId;
  }

  /**
   * Create a payment order
   */
  async createOrder(
    data: CreatePaymentOrderRequest
  ): Promise<CreatePaymentOrderResponse> {
    const response = await apiService.post<{
      success: boolean;
      message: string;
      data: CreatePaymentOrderResponse;
    }>(API_ENDPOINTS.PAYMENT.CREATE_ORDER, data);

    return response.data;
  }

  /**
   * Verify payment signature
   */
  async verifyPayment(
    data: VerifyPaymentRequest
  ): Promise<VerifyPaymentResponse> {
    const response = await apiService.post<{
      success: boolean;
      message: string;
      data: {
        transactionId: string;
        status: string;
        amount: number;
        paymentMethod: string;
        alreadyProcessed: boolean;
      };
    }>(API_ENDPOINTS.PAYMENT.VERIFY, data);

    return {
      success: response.success,
      message: response.message,
      order: {
        id: data.razorpay_order_id,
        status: response.data.status,
        amount: response.data.amount,
        currency: 'INR',
      },
    };
  }

  /**
   * Open Razorpay checkout
   */
  async openCheckout(options: RazorpayCheckoutOptions): Promise<void> {
    // Ensure Razorpay is loaded
    const isLoaded = await this.initializeRazorpay();
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    // Open Razorpay checkout
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  }

  /**
   * Create order and open checkout in one step
   */
  async initiatePayment(params: {
    amount: number;
    currency?: string;
    notes?: Record<string, string>;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    onSuccess: (response: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => void;
    onDismiss?: () => void;
  }): Promise<void> {
    try {
      // Step 1: Create order with backend
      const order = await this.createOrder({
        amount: params.amount,
        currency: params.currency || 'INR',
        notes: params.notes,
      });

      // Step 2: Open Razorpay checkout
      await this.openCheckout({
        key: order.razorpay_key,
        amount: order.amount * 100, // Convert rupees to paise for Razorpay SDK
        currency: order.currency,
        name: 'WyaparPay',
        description: 'Mobile Recharge',
        order_id: order.razorpay_order_id,
        prefill: params.prefill,
        theme: {
          color: '#00D4FF',
        },
        handler: params.onSuccess,
        modal: {
          ondismiss: params.onDismiss,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
