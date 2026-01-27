/**
 * Recharge Service
 * Handles mobile recharge operations
 */

import { API_ENDPOINTS } from '@/constants';
import { apiService } from './api.service';
import type {
  RechargeOperator,
  RechargeCircle,
  RechargePlan,
  RechargeRequest,
  RechargeResponse,
} from '@/types';

export interface DetectOperatorRequest {
  mobileNumber: string;
}

export interface DetectOperatorResponse {
  operatorCode: string;
  operatorName: string;
  circleCode?: string;
  circleName?: string;
  operatorId?: string;
  creditBalance?: string;
}

class RechargeService {
  /**
   * Detect operator from mobile number
   */
  async detectOperator(
    data: DetectOperatorRequest
  ): Promise<DetectOperatorResponse> {
    return apiService.post<DetectOperatorResponse>(
      API_ENDPOINTS.RECHARGE.DETECT_OPERATOR,
      data
    );
  }

  /**
   * Get all operators
   */
  async getOperators(): Promise<RechargeOperator[]> {
    return apiService.get<RechargeOperator[]>(
      API_ENDPOINTS.RECHARGE.GET_OPERATORS
    );
  }

  /**
   * Get circles for an operator
   */
  async getCircles(operatorCode: string): Promise<RechargeCircle[]> {
    return apiService.get<RechargeCircle[]>(
      API_ENDPOINTS.RECHARGE.GET_CIRCLES(operatorCode)
    );
  }

  /**
   * Get all circles from database (cached from KWIKAPI)
   */
  async getAllCircles(): Promise<Array<{ circleCode: string; circleName: string }>> {
    return apiService.get<Array<{ circleCode: string; circleName: string }>>(
      API_ENDPOINTS.RECHARGE.GET_ALL_CIRCLES
    );
  }

  /**
   * Fetch and store circles from KWIKAPI (Admin only - rate limited to 2 hits/day)
   */
  async fetchAndStoreCircles(): Promise<{
    success: boolean;
    circlesStored: number;
    message: string;
  }> {
    return apiService.post<{
      success: boolean;
      circlesStored: number;
      message: string;
    }>(API_ENDPOINTS.RECHARGE.FETCH_AND_STORE_CIRCLES, {});
  }

  /**
   * Get all operators from database (cached from KWIKAPI)
   * Returns operators with KWIKAPI operator IDs
   */
  async getAllOperatorsFromDB(): Promise<Array<{
    operatorId: string;
    operatorName: string;
    serviceType: string;
    status: string;
    amountMinimum: number;
    amountMaximum: number;
  }>> {
    return apiService.get(API_ENDPOINTS.RECHARGE.GET_ALL_OPERATORS);
  }

  /**
   * Fetch and store operators from KWIKAPI (Admin only - rate limited to 15 hits/day)
   */
  async fetchAndStoreOperators(): Promise<{
    success: boolean;
    operatorsStored: number;
    message: string;
  }> {
    return apiService.post<{
      success: boolean;
      operatorsStored: number;
      message: string;
    }>(API_ENDPOINTS.RECHARGE.FETCH_AND_STORE_OPERATORS, {});
  }

  /**
   * Get recharge plans from KWIKAPI
   */
  async getPlans(params: {
    operator: string;
    circle?: string;
    category?: string;
    operatorId?: string; // KWIKAPI operator ID from detection
    circleCode?: string; // KWIKAPI circle code from detection
  }): Promise<RechargePlan[]> {
    // Map parameters to backend format
    const queryParams = new URLSearchParams();
    queryParams.append('operatorCode', params.operator);
    if (params.circleCode) queryParams.append('circleCode', params.circleCode);
    if (params.circle) queryParams.append('circleCode', params.circle);
    if (params.category) queryParams.append('category', params.category);
    if (params.operatorId) queryParams.append('operatorId', params.operatorId);

    return apiService.get<RechargePlan[]>(
      `${API_ENDPOINTS.RECHARGE.GET_PLANS}?${queryParams.toString()}`
    );
  }

  /**
   * Validate recharge before processing
   */
  async validateRecharge(
    data: RechargeRequest
  ): Promise<{ valid: boolean; message?: string }> {
    return apiService.post<{ valid: boolean; message?: string }>(
      API_ENDPOINTS.RECHARGE.VALIDATE,
      data
    );
  }

  /**
   * Process mobile recharge
   */
  async processMobileRecharge(
    data: RechargeRequest
  ): Promise<RechargeResponse> {
    return apiService.post<RechargeResponse>(
      API_ENDPOINTS.RECHARGE.PROCESS_MOBILE,
      data
    );
  }

  /**
   * Get recharge history
   */
  async getHistory(params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<RechargeResponse[]> {
    const queryParams = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : '';
    return apiService.get<RechargeResponse[]>(
      `${API_ENDPOINTS.RECHARGE.GET_HISTORY}${queryParams ? `?${queryParams}` : ''}`
    );
  }

  /**
   * Get favorite recharges
   */
  async getFavorites(): Promise<unknown[]> {
    return apiService.get<unknown[]>(API_ENDPOINTS.RECHARGE.GET_FAVORITES);
  }

  /**
   * Add favorite recharge
   */
  async addFavorite(data: {
    mobileNumber: string;
    operator: string;
    nickname?: string;
  }): Promise<unknown> {
    return apiService.post<unknown>(API_ENDPOINTS.RECHARGE.ADD_FAVORITE, data);
  }

  /**
   * Remove favorite recharge
   */
  async removeFavorite(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(
      API_ENDPOINTS.RECHARGE.REMOVE_FAVORITE(id)
    );
  }

  /**
   * Get KWIKAPI wallet balance
   */
  async getKwikApiBalance(forceRefresh = false): Promise<{
    response: {
      balance: string;
      plan_credit: string;
    };
  }> {
    const queryParams = forceRefresh ? '?forceRefresh=true' : '';
    return apiService.get(
      `${API_ENDPOINTS.RECHARGE.KWIKAPI_BALANCE}${queryParams}`
    );
  }

  /**
   * Process recharge with KWIKAPI
   */
  async processKwikApiRecharge(data: {
    mobileNumber: string;
    amount: number;
    operatorId: string;
    orderId: string;
  }): Promise<{
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    order_id: string;
    opr_id: string;
    balance: string;
    number: string;
    provider: string;
    amount: string;
    charged_amount: string;
    message: string;
  }> {
    return apiService.post(API_ENDPOINTS.RECHARGE.KWIKAPI_RECHARGE, {
      number: data.mobileNumber,
      amount: data.amount,
      opid: data.operatorId,
      state_code: 0,
      order_id: data.orderId,
    });
  }

  /**
   * Check KWIKAPI recharge status
   */
  async checkKwikApiStatus(orderId: string): Promise<{
    response: {
      order_id: string;
      operator_ref: string;
      opr_id: string;
      status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
      number: string;
      amount: string;
      service: string;
      charged_amount: string;
      closing_balance: string;
      available_balance: string;
      pid: string;
      date: string;
    };
  }> {
    return apiService.get(
      `${API_ENDPOINTS.RECHARGE.KWIKAPI_STATUS}?orderId=${orderId}`
    );
  }

  /**
   * Complete recharge flow: Payment + KWIKAPI recharge + Status polling
   */
  async completeRecharge(params: {
    mobileNumber: string;
    amount: number;
    operatorId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
  }): Promise<{
    success: boolean;
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'TIMEOUT';
    message: string;
    data?: any;
  }> {
    try {
      // Generate unique order ID for KWIKAPI
      const kwikApiOrderId = `${Date.now()}${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

      // Step 1: Process recharge with KWIKAPI
      const rechargeResponse = await this.processKwikApiRecharge({
        mobileNumber: params.mobileNumber,
        amount: params.amount,
        operatorId: params.operatorId,
        orderId: kwikApiOrderId,
      });

      console.log('KWIKAPI Recharge Response:', rechargeResponse);

      // Step 2: Poll status (max 3 attempts)
      await this.sleep(5000); // Wait 5 seconds

      for (let attempt = 1; attempt <= 3; attempt++) {
        const statusResponse = await this.checkKwikApiStatus(kwikApiOrderId);
        const status = statusResponse.response.status;

        console.log(`Status Check Attempt ${attempt}/3:`, status);

        if (status === 'SUCCESS') {
          return {
            success: true,
            status: 'SUCCESS',
            message: 'Recharge successful!',
            data: statusResponse.response,
          };
        } else if (status === 'FAILED') {
          return {
            success: false,
            status: 'FAILED',
            message: 'Recharge failed',
            data: statusResponse.response,
          };
        } else if (status === 'PENDING') {
          if (attempt < 3) {
            await this.sleep(30000); // Wait 30 seconds
          } else {
            return {
              success: false,
              status: 'TIMEOUT',
              message: 'Status check timeout - please check later',
            };
          }
        }
      }

      return {
        success: false,
        status: 'TIMEOUT',
        message: 'Status check timeout - please check later',
      };
    } catch (error: any) {
      console.error('Complete recharge failed:', error);
      throw error;
    }
  }

  /**
   * Sleep utility for polling delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const rechargeService = new RechargeService();
