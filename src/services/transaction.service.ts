/**
 * Transaction Service
 * Handles transaction history and wallet operations
 */

import { API_ENDPOINTS } from '@/constants';
import { apiService } from './api.service';
import type { Transaction, TransactionSummary, WalletBalance } from '@/types';

class TransactionService {
  /**
   * Get wallet balance
   */
  async getBalance(): Promise<WalletBalance> {
    return apiService.get<WalletBalance>(API_ENDPOINTS.WALLET.BALANCE);
  }

  /**
   * Get all transactions
   */
  async getTransactions(params?: {
    limit?: number;
    offset?: number;
    type?: string;
    status?: string;
  }): Promise<Transaction[]> {
    const queryParams = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : '';
    return apiService.get<Transaction[]>(
      `${API_ENDPOINTS.TRANSACTIONS.GET_ALL}${queryParams ? `?${queryParams}` : ''}`
    );
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(id: string): Promise<Transaction> {
    return apiService.get<Transaction>(
      API_ENDPOINTS.TRANSACTIONS.GET_BY_ID(id)
    );
  }

  /**
   * Get transaction summary
   */
  async getTransactionSummary(): Promise<TransactionSummary> {
    return apiService.get<TransactionSummary>(
      API_ENDPOINTS.TRANSACTIONS.GET_SUMMARY
    );
  }

  /**
   * Get recent transactions
   */
  async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    return apiService.get<Transaction[]>(
      `${API_ENDPOINTS.TRANSACTIONS.GET_RECENT}?limit=${limit}`
    );
  }

  /**
   * Get transactions by category
   */
  async getTransactionsByCategory(category: string): Promise<Transaction[]> {
    return apiService.get<Transaction[]>(
      API_ENDPOINTS.TRANSACTIONS.GET_BY_CATEGORY(category)
    );
  }

  /**
   * Search transactions
   */
  async searchTransactions(query: string): Promise<Transaction[]> {
    return apiService.post<Transaction[]>(API_ENDPOINTS.TRANSACTIONS.SEARCH, {
      query,
    });
  }

  /**
   * Get transaction statistics
   */
  async getTransactionStats(): Promise<unknown> {
    return apiService.get<unknown>(API_ENDPOINTS.TRANSACTIONS.GET_STATS);
  }
}

// Export singleton instance
export const transactionService = new TransactionService();
