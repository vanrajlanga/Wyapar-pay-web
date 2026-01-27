'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRecharge } from '@/contexts/RechargeContext';
import { Button, Input, Card } from '@/components/ui';
import { ROUTES } from '@/constants';
import { OPERATORS, getOperatorByCode } from '@/constants/operators';
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
  const [detectedOperator, setDetectedOperator] = useState<{
    code: string;
    name: string;
    operatorId: string;
    circleCode: string;
    circleName: string;
  } | null>(null);
  const [circles, setCircles] = useState<Array<{ circleCode: string; circleName: string }>>([]);
  const [selectedCircleCode, setSelectedCircleCode] = useState<string>('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCircles, setLoadingCircles] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    loadOperators();
    loadCircles();
  }, [isAuthenticated, router]);

  const loadOperators = async () => {
    try {
      const ops = await rechargeService.getOperators();
      setOperators(ops);
    } catch (error) {
      logger.error('Failed to load operators', error);
    }
  };

  const loadCircles = async () => {
    try {
      setLoadingCircles(true);
      const circlesData = await rechargeService.getAllCircles();
      setCircles(circlesData);
    } catch (error) {
      logger.error('Failed to load circles', error);
    } finally {
      setLoadingCircles(false);
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

      // Store detected operator info and auto-select it
      setDetectedOperator({
        code: result.operatorCode,
        name: result.operatorName,
        operatorId: result.operatorId || '',
        circleCode: result.circleCode || '',
        circleName: result.circleName || '',
      });

      // Auto-select the detected operator
      setSelectedOp(result.operatorCode);
      setSelectedCircleCode(result.circleCode || '');
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

  const handleManualOperatorSelect = (operatorCode: string) => {
    setSelectedOp(operatorCode);

    // Get operator from static mapping
    const operatorInfo = getOperatorByCode(operatorCode);

    // If user manually selects different operator from detected one
    if (detectedOperator && operatorCode !== detectedOperator.code) {
      // Use static mapping for KWIKAPI operator ID
      logger.log('🔄 User manually selected different operator, using static mapping');
      if (operatorInfo?.kwikApiOperatorId) {
        setOperatorId(operatorInfo.kwikApiOperatorId);
        logger.log(`✅ Set operatorId from mapping: ${operatorInfo.kwikApiOperatorId}`);
      } else {
        setOperatorId(null);
        logger.warn(`⚠️ No KWIKAPI ID mapping found for ${operatorCode}`);
      }
      // Keep the selected circle or clear if needed
      // User will need to select circle manually
    } else if (detectedOperator && operatorCode === detectedOperator.code) {
      // User selected the detected operator, restore KWIKAPI data from detection
      logger.log('✅ User selected detected operator, restoring KWIKAPI data');
      setOperatorId(detectedOperator.operatorId);
      setCircleCode(detectedOperator.circleCode);
      setCircleName(detectedOperator.circleName);
      setSelectedCircleCode(detectedOperator.circleCode);
    }
  };

  const handleCircleSelect = (circleCode: string) => {
    setSelectedCircleCode(circleCode);
    const circle = circles.find(c => c.circleCode === circleCode);
    if (circle) {
      setCircleCode(circleCode);
      setCircleName(circle.circleName);
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

    if (!selectedCircleCode) {
      setError('Please select a circle first');
      return;
    }

    // Get operator info from mapping
    const operatorInfo = getOperatorByCode(selectedOp);

    // Determine effective operatorId (from detection or from static mapping)
    let effectiveOperatorId = sessionStorage.getItem('recharge_operatorId');

    // If user manually selected different operator, use static mapping
    if (detectedOperator && selectedOp !== detectedOperator.code) {
      effectiveOperatorId = operatorInfo?.kwikApiOperatorId || null;
      logger.log('📝 Using static mapping for manually selected operator:', {
        operator: selectedOp,
        operatorId: effectiveOperatorId,
      });
    }

    const effectiveCircleCode = selectedCircleCode;

    if (!effectiveOperatorId || !effectiveCircleCode) {
      setError('⚠️ Missing operator or circle information. Please ensure operator and circle are selected.');
      return;
    }

    // Store all data in sessionStorage for plans page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('recharge_mobile_number', mobile);
      sessionStorage.setItem('recharge_operatorId', effectiveOperatorId);
      sessionStorage.setItem('recharge_circleCode', effectiveCircleCode);
      sessionStorage.setItem('recharge_operatorCode', selectedOp);
      sessionStorage.setItem('recharge_operatorName', operatorInfo?.name || selectedOp);

      const circleName = circles.find(c => c.circleCode === effectiveCircleCode)?.circleName || effectiveCircleCode;
      sessionStorage.setItem('recharge_circleName', circleName);

      logger.log('💾 Stored complete recharge data:', {
        mobile,
        operatorId: effectiveOperatorId,
        circleCode: effectiveCircleCode,
        operatorCode: selectedOp,
      });
    }

    // Set context
    setMobileNumber(mobile);
    setOperatorId(effectiveOperatorId);
    setCircleCode(effectiveCircleCode);

    // Navigate to plans
    logger.log('✅ Navigating to plans with data:', {
      selectedOp,
      operatorId: effectiveOperatorId,
      circleCode: effectiveCircleCode,
    });
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

            {/* Show detected operator info below mobile field */}
            {detectedOperator && (
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">Detected:</span>{' '}
                    <span className="text-white">{detectedOperator.name}</span>
                    {detectedOperator.circleName && (
                      <span className="text-gray-400"> • {detectedOperator.circleName}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                  onClick={() => handleManualOperatorSelect(operator.code)}
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
          </div>

          {/* Circle Selection - Show when operator is selected */}
          {selectedOp && (
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Select Circle {selectedCircleCode && <span className="text-gray-600 text-sm">(Current: {circles.find(c => c.circleCode === selectedCircleCode)?.circleName || selectedCircleCode})</span>}
              </label>
              <select
                value={selectedCircleCode}
                onChange={(e) => handleCircleSelect(e.target.value)}
                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                disabled={loadingCircles}
              >
                <option value="" className="text-gray-500">Select a circle...</option>
                {circles.map((circle) => (
                  <option key={circle.circleCode} value={circle.circleCode} className="text-gray-900">
                    {circle.circleName}
                  </option>
                ))}
              </select>
              {selectedOp && detectedOperator && selectedOp !== detectedOperator.code && (
                <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-sm text-blue-400">
                    ℹ️ <strong>Note:</strong> You manually corrected the operator.
                  </div>
                  <div className="text-xs text-blue-400/80 mt-1">
                    Browse Plans will use <strong>{getOperatorByCode(selectedOp)?.name || selectedOp}</strong> with your selected circle. Make sure both are correct before proceeding.
                  </div>
                </div>
              )}
            </div>
          )}

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
