'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRecharge } from '@/contexts/RechargeContext';
import { Button, Input, Card } from '@/components/ui';
import { ROUTES } from '@/constants';
import { rechargeService } from '@/services/recharge.service';
import { logger } from '@/utils/logger';
import { MdPhone, MdArrowBack } from 'react-icons/md';
import type { RechargeOperator } from '@/types';

export default function RechargePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    setMobileNumber,
    setSelectedOperator,
    setAmount,
    setOperatorId,
    setCircleCode,
    setCircleName,
  } = useRecharge();

  const [mobile, setMobile] = useState('');
  const [operators, setOperators] = useState<RechargeOperator[]>([]);
  const [selectedOp, setSelectedOp] = useState<string>('');
  const [detectedCircle, setDetectedCircle] = useState<string>('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    loadOperators();
  }, [isAuthenticated, router]);

  const loadOperators = async () => {
    try {
      const ops = await rechargeService.getOperators();
      setOperators(ops);
    } catch (error) {
      logger.error('Failed to load operators', error);
    }
  };

  const handleDetectOperator = async () => {
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      logger.log('🔍 Starting operator detection for:', mobile);

      const result = await rechargeService.detectOperator({
        mobileNumber: mobile,
      });

      logger.log('✅ Detection Response:', result);
      logger.log('📋 Extracted values:', {
        operatorId: result.operatorId,
        circleCode: result.circleCode,
        circleName: result.circleName,
      });

      // Set operator code from KWIKAPI response
      setSelectedOp(result.operatorCode);
      setDetectedCircle(result.circleName || '');
      setMobileNumber(mobile);

      // Store KWIKAPI data in context for plans fetching
      logger.log('💾 Storing in context...');
      setOperatorId(result.operatorId || null);
      setCircleCode(result.circleCode || null);
      setCircleName(result.circleName || null);

      // Also persist to sessionStorage as backup for page navigation
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('recharge_operatorId', result.operatorId || '');
        sessionStorage.setItem('recharge_circleCode', result.circleCode || '');
        sessionStorage.setItem('recharge_circleName', result.circleName || '');
        sessionStorage.setItem('recharge_operatorCode', result.operatorCode || '');
        sessionStorage.setItem('recharge_operatorName', result.operatorName || '');
        logger.log('💾 Also stored in sessionStorage for persistence');
      }

      logger.log('✅ Stored in context:', {
        operatorId: result.operatorId,
        circleCode: result.circleCode,
        circleName: result.circleName,
      });

      // Show success message with detected info
      const message = result.circleName
        ? `Detected: ${result.operatorName} in ${result.circleName}`
        : `Detected: ${result.operatorName}`;
      setSuccessMessage(message);

      logger.log('✅ Operator detected successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect operator');
      logger.error('❌ Operator detection failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowsePlans = () => {
    if (!selectedOp) {
      setError('Please select an operator first');
      return;
    }

    if (!mobile) {
      setError('Please enter mobile number first');
      return;
    }

    // Store mobile number for plans page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('recharge_mobile_number', mobile);
      logger.log('💾 Stored mobile number for plans:', mobile);
    }

    // Set context
    setMobileNumber(mobile);

    // Navigate to plans
    router.push(ROUTES.RECHARGE_PLANS);
  };

  const handleProceed = () => {
    if (!selectedOp) {
      setError('Please select an operator');
      return;
    }

    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Get operator details
    const operator = operators.find((op) => op.code === selectedOp);
    if (operator) {
      setSelectedOperator(operator);
    }

    // Set context
    setMobileNumber(mobile);
    setAmount(parseFloat(rechargeAmount));

    // Store all recharge data in sessionStorage for checkout page
    const operatorId = sessionStorage.getItem('recharge_operatorId');
    const operatorName = sessionStorage.getItem('recharge_operatorName') || operator?.name || 'Unknown';
    const circleName = sessionStorage.getItem('recharge_circleName') || detectedCircle || 'India';

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('recharge_mobile_number', mobile);
      sessionStorage.setItem('recharge_amount', rechargeAmount);
      sessionStorage.setItem('recharge_operator', operatorName);
      sessionStorage.setItem('recharge_operator_id', operatorId || '');
      sessionStorage.setItem('recharge_circle_name', circleName);
      logger.log('💾 Stored recharge details for checkout:', {
        mobile,
        amount: rechargeAmount,
        operator: operatorName,
        operatorId,
        circle: circleName,
      });
    }

    // Redirect to checkout
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-secondary-light border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-background-card rounded-lg transition-colors"
          >
            <MdArrowBack size={24} />
          </button>
          <h1 className="text-2xl font-display font-bold text-white">
            Mobile Recharge
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Card className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-accent-error/20 border border-accent-error/50 rounded-lg text-accent-error text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Mobile Number Input */}
          <div>
            <label className="block text-white font-medium mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <Input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={setMobile}
                icon={<MdPhone size={20} />}
                className="flex-1"
                disabled={loading}
              />
              <Button
                onClick={handleDetectOperator}
                loading={loading}
                disabled={mobile.length !== 10 || loading}
              >
                Detect
              </Button>
            </div>
          </div>

          {/* Operator Selection */}
          <div>
            <label className="block text-white font-medium mb-2">
              Select Operator
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {operators.map((operator) => (
                <button
                  key={operator.code}
                  onClick={() => setSelectedOp(operator.code)}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${selectedOp === operator.code
                      ? 'border-primary bg-primary/10'
                      : 'border-white/10 bg-background-card hover:bg-background-hover'
                    }
                  `}
                >
                  <div className="font-medium text-gray-900">{operator.name}</div>
                  <div className="text-sm text-gray-600">
                    {operator.displayName}
                  </div>
                </button>
              ))}
            </div>

            {/* Show detected circle */}
            {detectedCircle && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="text-sm text-blue-400">
                  <span className="font-medium">Circle:</span> {detectedCircle}
                </div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-black font-medium mb-2">
              Enter Amount
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={rechargeAmount}
              onChange={setRechargeAmount}
              disabled={!selectedOp}
              className="text-gray-900"
            />

            {/* Quick Amounts */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[99, 149, 299, 499].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setRechargeAmount(amount.toString())}
                  disabled={!selectedOp}
                  className="py-2 px-3 bg-background-card hover:bg-background-hover border border-gray/10 rounded-lg text-gray-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Browse Plans Button */}
          {selectedOp && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleBrowsePlans}
            >
              Browse Plans
            </Button>
          )}

          {/* Proceed Button */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleProceed}
            disabled={!mobile || !selectedOp || !rechargeAmount}
          >
            Proceed to Pay
          </Button>
        </Card>
      </main>
    </div>
  );
}
