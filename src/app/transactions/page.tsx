'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Badge, Spinner, Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import { transactionService } from '@/services/transaction.service';
import { logger } from '@/utils/logger';
import {
  MdPhone,
  MdFilterList,
  MdSearch,
  MdDownload,
  MdClose,
  MdTrendingUp,
  MdTrendingDown,
} from 'react-icons/md';
import type { Transaction, TransactionType } from '@/types';

export default function TransactionsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'success' | 'pending' | 'failed'
  >('all');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await transactionService.getTransactions({});
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      logger.error('Failed to load transactions', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...transactions];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date range filter
    if (dateRange.from) {
      filtered = filtered.filter(
        (t) => new Date(t.createdAt) >= new Date(dateRange.from)
      );
    }
    if (dateRange.to) {
      filtered = filtered.filter(
        (t) => new Date(t.createdAt) <= new Date(dateRange.to)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, statusFilter, typeFilter, searchQuery, dateRange]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    loadTransactions();
  }, [isAuthenticated, router]);

  useEffect(() => {
    applyFilters();
  }, [
    transactions,
    statusFilter,
    typeFilter,
    searchQuery,
    dateRange,
    applyFilters,
  ]);

  const clearFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
    setSearchQuery('');
    setDateRange({ from: '', to: '' });
  };

  const exportTransactions = () => {
    // Simple CSV export
    const csv = [
      ['Date', 'Type', 'Description', 'Amount', 'Status'].join(','),
      ...filteredTransactions.map((t) =>
        [
          new Date(t.createdAt).toLocaleDateString(),
          t.type,
          t.description,
          t.amount,
          t.status,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getTotalAmount = () => {
    return filteredTransactions
      .filter((t) => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getSuccessRate = () => {
    if (filteredTransactions.length === 0) return 0;
    const successful = filteredTransactions.filter(
      (t) => t.status === 'success'
    ).length;
    return Math.round((successful / filteredTransactions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            Transaction History
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-background rounded-lg transition-colors"
          >
            <MdFilterList size={24} className="text-text-secondary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {filteredTransactions.length}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <MdTrendingUp size={24} className="text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-text-primary">
                  ₹{getTotalAmount().toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-accent-success/10 rounded-lg">
                <MdTrendingUp size={24} className="text-accent-success" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-text-primary">
                  {getSuccessRate()}%
                </p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <MdTrendingDown size={24} className="text-secondary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Export */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search by description or transaction ID..."
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={exportTransactions}
            disabled={filteredTransactions.length === 0}
          >
            <MdDownload className="mr-2" />
            Export
          </Button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'success' | 'pending' | 'failed')}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'all')}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary"
                >
                  <option value="all">All Types</option>
                  <option value="mobile_recharge">Mobile Recharge</option>
                  <option value="dth_recharge">DTH Recharge</option>
                  <option value="electricity_bill">Electricity Bill</option>
                  <option value="water_bill">Water Bill</option>
                  <option value="gas_bill">Gas Bill</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, from: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, to: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-text-primary"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Quick Status Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'success', 'pending', 'failed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`
                px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
                ${
                  statusFilter === f
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-text-secondary hover:bg-background border border-border'
                }
              `}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                hover
                onClick={() =>
                  router.push(`${ROUTES.TRANSACTIONS}/${transaction.id}`)
                }
                className="p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MdPhone size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary mb-1">
                        {transaction.description}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-text-secondary">
                        <span>{transaction.type.replace(/_/g, ' ')}</span>
                        <span>•</span>
                        <span>
                          {new Date(transaction.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary text-lg mb-1">
                      ₹{transaction.amount}
                    </p>
                    <Badge
                      variant={
                        transaction.status === 'success'
                          ? 'success'
                          : transaction.status === 'failed'
                            ? 'error'
                            : 'warning'
                      }
                      size="sm"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-text-secondary mb-4">No transactions found</p>
            <button
              onClick={() => router.push(ROUTES.RECHARGE)}
              className="text-primary hover:text-primary-light font-medium transition-colors"
            >
              Make your first recharge →
            </button>
          </Card>
        )}
      </main>
    </div>
  );
}
