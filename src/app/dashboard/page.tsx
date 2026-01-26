'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/utils/logger';
import { ROUTES } from '@/constants';
import type { Transaction } from '@/types';
import {
  MdPhone,
  MdLightbulb,
  MdLogout,
  MdSettings,
  MdSupport,
  MdClose,
} from 'react-icons/md';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState({ balance: 2450.0 });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push(ROUTES.LOGIN);
        return;
      }
      // Simulate loading user data
      setTimeout(() => {
        setLoading(false);
        // Mock transactions
        setRecentTransactions([
          {
            id: '1',
            userId: user?.id || '',
            type: 'mobile_recharge',
            amount: 299,
            description: 'Airtel Mobile Recharge',
            status: 'success',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            userId: user?.id || '',
            type: 'electricity_bill',
            amount: 1200,
            description: 'BESCOM Electricity Bill',
            status: 'success',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push(ROUTES.HOME);
    } catch (error) {
      logger.error('Logout failed', error);
    }
  };

  const handleAddMoney = async () => {
    if (!addMoneyAmount || parseFloat(addMoneyAmount) <= 0) return;

    const amount = parseFloat(addMoneyAmount);
    setBalance((prev) => ({ balance: prev.balance + amount }));

    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      userId: user?.id || '',
      type: 'wallet_topup',
      amount: amount,
      description: `Added ₹${amount} to wallet`,
      status: 'success',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRecentTransactions((prev) => [newTransaction, ...prev]);
    setShowAddMoneyModal(false);
    setAddMoneyAmount('');
  };

  const copyReferralCode = async () => {
    const referralCode = 'WYP2024USER';
    try {
      await navigator.clipboard.writeText(referralCode);
      // You could add a toast notification here
    } catch (err) {
      logger.error('Failed to copy to clipboard', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 text-blue-600 mx-auto mb-4">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-gray-600 animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => router.push(ROUTES.HOME)}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="WyaparPay"
                  width={24}
                  height={24}
                  className="rounded"
                />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                WyaparPay
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-5 5v-5z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-gray-900 font-medium">
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <MdLogout size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Manage your payments and transactions from your dashboard
          </p>
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  🎉 Mega Cashback Festival!
                </h3>
                <p className="text-orange-100 mb-3">
                  Get up to 25% cashback on all recharges & bill payments
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    Ends in 2 days
                  </span>
                  <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                    Claim Now
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">25%</div>
                <div className="text-sm text-orange-100">Cashback</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-medium mb-2">My Wallet</h2>
              <div className="text-3xl font-bold mb-1">
                ₹{balance.balance.toFixed(2)}
              </div>
              <p className="text-blue-100">Available Balance</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Money
              </button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => router.push(ROUTES.RECHARGE)}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MdPhone className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Mobile Recharge</p>
          </button>

          <button
            onClick={() => router.push(ROUTES.RECHARGE)}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MdLightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              Electricity Bill
            </p>
          </button>

          <button
            onClick={() => router.push(ROUTES.RECHARGE)}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                ></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">Gas Bill</p>
          </button>

          <button
            onClick={() => router.push(ROUTES.RECHARGE)}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">Water Bill</p>
          </button>
        </div>

        {/* Offers & Referrals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Special Offers */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                🔥 Hot Offers
              </h3>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                LIMITED TIME
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium text-gray-900">Mobile Recharge</p>
                  <p className="text-sm text-green-600">
                    Get ₹50 cashback on ₹500+
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">₹50</div>
                  <div className="text-xs text-gray-500">Cashback</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div>
                  <p className="font-medium text-gray-900">Electricity Bill</p>
                  <p className="text-sm text-blue-600">15% off up to ₹200</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">15%</div>
                  <div className="text-xs text-gray-500">Discount</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div>
                  <p className="font-medium text-gray-900">First Transaction</p>
                  <p className="text-sm text-purple-600">
                    100% cashback up to ₹100
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">100%</div>
                  <div className="text-xs text-gray-500">Cashback</div>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Program */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Refer & Earn</h3>
            </div>
            <p className="text-indigo-100 mb-4">
              Invite friends and earn ₹100 for each successful referral!
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Your Referral Code</span>
                <button
                  onClick={copyReferralCode}
                  className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-xl font-bold mt-1">WYP2024USER</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-semibold">3 Referrals</div>
                <div className="text-indigo-200">This month</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹300 Earned</div>
                <div className="text-indigo-200">Total rewards</div>
              </div>
            </div>
            <button className="w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-50 transition-colors">
              Share Referral Link
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <button
              onClick={() => router.push(ROUTES.TRANSACTIONS)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'mobile_recharge'
                          ? 'bg-green-100'
                          : transaction.type === 'electricity_bill'
                            ? 'bg-yellow-100'
                            : transaction.type === 'wallet_topup'
                              ? 'bg-green-100'
                              : 'bg-gray-100'
                      }`}
                    >
                      {transaction.type === 'mobile_recharge' ? (
                        <MdPhone className="w-5 h-5 text-green-600" />
                      ) : transaction.type === 'electricity_bill' ? (
                        <MdLightbulb className="w-5 h-5 text-yellow-600" />
                      ) : transaction.type === 'wallet_topup' ? (
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === 'wallet_topup'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'wallet_topup' ? '+' : '-'}₹
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
                <p>No transactions yet</p>
                <p className="text-sm">
                  Your transaction history will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Payment Gateway */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Payment Gateway
            </h4>
            <p className="text-gray-600 mb-4">Accept payments from customers</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Manage Gateway
            </button>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <MdSettings className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Account Settings
            </h4>
            <p className="text-gray-600 mb-4">
              Manage your profile and preferences
            </p>
            <button
              onClick={() => router.push(ROUTES.PROFILE)}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Open Settings
            </button>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MdSupport className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              24/7 Support
            </h4>
            <p className="text-gray-600 mb-4">
              Get help with your transactions
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Money to Wallet
              </h3>
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMoney();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(e.target.value)}
                  min="1"
                  max="50000"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Money
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="WyaparPay"
                    width={24}
                    height={24}
                    className="rounded"
                  />
                </div>
                <span className="ml-3 text-2xl font-bold">WyaparPay</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted partner for all payment solutions. Making
                transactions simple, secure, and fast.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Mobile Recharge
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Bill Payments
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Digital Wallet
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Payment Gateway
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 WyaparPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
