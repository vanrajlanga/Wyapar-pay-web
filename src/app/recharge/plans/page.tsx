'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRecharge } from '@/contexts/RechargeContext';
import { Button, Card } from '@/components/ui';
import { ROUTES } from '@/constants';
import { rechargeService } from '@/services/recharge.service';
import { logger } from '@/utils/logger';
import { MdArrowBack, MdCheckCircle } from 'react-icons/md';
import type { RechargePlan, RechargeOperator } from '@/types';

export default function RechargePlansPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    mobileNumber,
    selectedOperator,
    operatorId,
    circleCode,
    circleName,
    setSelectedPlan,
    setAmount,
    setOperatorId,
    setCircleCode,
    setCircleName,
  } = useRecharge();

  const [plans, setPlans] = useState<RechargePlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('POPULAR');

  // Local state for operatorId/circleCode with sessionStorage fallback
  const [localOperatorId, setLocalOperatorId] = useState<string | null>(null);
  const [localCircleCode, setLocalCircleCode] = useState<string | null>(null);

  // Initialize from context or sessionStorage on mount
  useEffect(() => {
    logger.info('🔍 Plans Page - Context Values:', {
      mobileNumber,
      selectedOperator: selectedOperator?.code,
      operatorId,
      circleCode,
      circleName,
    });

    // If context values are missing, try sessionStorage
    if (!operatorId || !circleCode) {
      logger.info('⚠️ Context values missing, checking sessionStorage...');
      const storedOperatorId = sessionStorage.getItem('recharge_operatorId');
      const storedCircleCode = sessionStorage.getItem('recharge_circleCode');
      const storedCircleName = sessionStorage.getItem('recharge_circleName');
      const storedOperatorCode = sessionStorage.getItem('recharge_operatorCode');

      logger.info('📦 SessionStorage values:', {
        storedOperatorId,
        storedCircleCode,
        storedCircleName,
        storedOperatorCode,
      });

      if (storedOperatorId && storedCircleCode) {
        logger.info('✅ Restored from sessionStorage');
        setLocalOperatorId(storedOperatorId);
        setLocalCircleCode(storedCircleCode);

        // Also update context
        setOperatorId(storedOperatorId);
        setCircleCode(storedCircleCode);
        if (storedCircleName) setCircleName(storedCircleName);
      } else {
        logger.warn('❌ No values in sessionStorage either');
      }
    } else {
      setLocalOperatorId(operatorId);
      setLocalCircleCode(circleCode);
    }
  }, []);

  const categories = [
    { value: 'POPULAR', label: 'Popular' },
    { value: 'DATA', label: 'Data' },
    { value: 'UNLIMITED', label: 'Unlimited' },
    { value: 'TALKTIME', label: 'Talktime' },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    // Use local state values which include sessionStorage fallback
    const effectiveOperatorId = localOperatorId || operatorId;
    const effectiveCircleCode = localCircleCode || circleCode;

    // Check if we have detection data
    if (!mobileNumber || !effectiveOperatorId || !effectiveCircleCode) {
      logger.warn('Missing required data for plans fetch', {
        mobileNumber,
        effectiveOperatorId,
        effectiveCircleCode,
        contextOperatorId: operatorId,
        contextCircleCode: circleCode,
        localOperatorId,
        localCircleCode,
      });
      setError('Please detect operator first. Redirecting...');
      setTimeout(() => {
        router.push(ROUTES.RECHARGE);
      }, 2000);
      return;
    }

    fetchPlans();
  }, [isAuthenticated, selectedCategory, operatorId, circleCode, localOperatorId, localCircleCode]);

  const fetchPlans = async () => {
    // Use effective values from local state or context
    const effectiveOperatorId = localOperatorId || operatorId;
    const effectiveCircleCode = localCircleCode || circleCode;

    // Get operator from sessionStorage if not in context
    let effectiveOperator = selectedOperator;
    if (!effectiveOperator) {
      const storedOperatorCode = sessionStorage.getItem('recharge_operatorCode');
      const storedOperatorName = sessionStorage.getItem('recharge_operatorName');
      if (storedOperatorCode) {
        effectiveOperator = {
          code: storedOperatorCode,
          name: storedOperatorName || storedOperatorCode,
        } as RechargeOperator;
        logger.info('📦 Using operator from sessionStorage:', effectiveOperator);
      }
    }

    if (!effectiveOperator || !effectiveOperatorId || !effectiveCircleCode) {
      const errorMsg = 'Missing data - Please detect operator first';
      logger.error(errorMsg, {
        hasOperator: !!effectiveOperator,
        hasOperatorId: !!effectiveOperatorId,
        hasCircleCode: !!effectiveCircleCode,
      });
      setError(errorMsg);
      return;
    }

    setLoading(true);
    setError('');

    try {
      logger.info('🔍 Fetching plans with KWIKAPI data:', {
        operator: effectiveOperator.code,
        operatorName: effectiveOperator.name,
        operatorId: effectiveOperatorId,
        circleCode: effectiveCircleCode,
        category: selectedCategory,
      });

      const fetchedPlans = await rechargeService.getPlans({
        operator: effectiveOperator.code,
        operatorId: effectiveOperatorId,
        circleCode: effectiveCircleCode,
        category: selectedCategory,
      });

      setPlans(fetchedPlans);
      logger.info(`✅ Fetched ${fetchedPlans.length} plans from KWIKAPI`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch plans';
      setError(errorMsg);
      logger.error('❌ Plans fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: RechargePlan) => {
    logger.info('📋 Plan selected:', plan);

    // Set context
    setSelectedPlan(plan);
    setAmount(plan.amount);

    // Get effective values
    const effectiveOperatorId = localOperatorId || operatorId;
    const effectiveCircleCode = localCircleCode || circleCode;
    const effectiveMobileNumber = mobileNumber || sessionStorage.getItem('recharge_mobile_number') || '';
    const effectiveOperatorName = selectedOperator?.name || sessionStorage.getItem('recharge_operatorName') || 'Unknown';
    const effectiveCircleName = circleName || sessionStorage.getItem('recharge_circleName') || 'India';

    // Store all recharge data in sessionStorage for checkout
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('recharge_mobile_number', effectiveMobileNumber);
      sessionStorage.setItem('recharge_amount', plan.amount.toString());
      sessionStorage.setItem('recharge_operator', effectiveOperatorName);
      sessionStorage.setItem('recharge_operator_id', effectiveOperatorId || '');
      sessionStorage.setItem('recharge_circle_name', effectiveCircleName);

      logger.info('💾 Stored plan details for checkout:', {
        mobile: effectiveMobileNumber,
        amount: plan.amount,
        operator: effectiveOperatorName,
        operatorId: effectiveOperatorId,
        circle: effectiveCircleName,
        planId: plan.id,
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
          <div>
            <h1 className="text-2xl font-display font-bold text-white">
              Select Plan
            </h1>
            <p className="text-sm text-gray-400">
              {mobileNumber} • {selectedOperator?.name}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-accent-error/20 border border-accent-error/50 rounded-lg text-accent-error text-sm">
            {error}
          </div>
        )}

        {/* Category Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`
                px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white'
                    : 'bg-background-card text-gray-400 hover:bg-background-hover'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-400">Loading plans from KWIKAPI...</p>
          </div>
        )}

        {/* Plans List */}
        {!loading && plans.length > 0 && (
          <div className="space-y-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleSelectPlan(plan)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-primary">
                        ₹{plan.amount}
                      </span>
                      <span className="text-sm text-gray-400 bg-background-card px-2 py-1 rounded">
                        {plan.validity}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 mb-3">
                      {plan.description}
                    </p>

                    {plan.benefits && plan.benefits.length > 0 && (
                      <div className="space-y-1">
                        {plan.benefits.slice(0, 3).map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-xs text-gray-400"
                          >
                            <MdCheckCircle className="flex-shrink-0 mt-0.5 text-green-500" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {plan.data && plan.data !== 'NA' && (
                      <div className="mt-2 inline-block px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                        📊 {plan.data}
                      </div>
                    )}
                  </div>

                  <button className="ml-4 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors">
                    Select
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && plans.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400">No plans available for this category</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedCategory('POPULAR')}
            >
              View Popular Plans
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
