'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { rechargeService } from '@/services/recharge.service';
import { logger } from '@/utils/logger';
import type {
  RechargeOperator,
  RechargeCircle,
  RechargePlan,
  RechargeRequest,
  RechargeResponse,
} from '@/types';

interface RechargeContextType {
  // State
  selectedOperator: RechargeOperator | null;
  selectedCircle: RechargeCircle | null;
  selectedPlan: RechargePlan | null;
  mobileNumber: string;
  amount: number;
  isLoading: boolean;
  operatorId: string | null; // KWIKAPI operator ID
  circleCode: string | null; // KWIKAPI circle code
  circleName: string | null; // KWIKAPI circle name

  // Setters
  setSelectedOperator: (operator: RechargeOperator | null) => void;
  setSelectedCircle: (circle: RechargeCircle | null) => void;
  setSelectedPlan: (plan: RechargePlan | null) => void;
  setMobileNumber: (number: string) => void;
  setAmount: (amount: number) => void;
  setOperatorId: (id: string | null) => void;
  setCircleCode: (code: string | null) => void;
  setCircleName: (name: string | null) => void;

  // Actions
  detectOperator: (mobileNumber: string) => Promise<void>;
  processRecharge: (data: RechargeRequest) => Promise<RechargeResponse>;
  resetRecharge: () => void;
}

const RechargeContext = createContext<RechargeContextType | undefined>(
  undefined
);

export function RechargeProvider({ children }: { children: ReactNode }) {
  const [selectedOperator, setSelectedOperator] =
    useState<RechargeOperator | null>(null);
  const [selectedCircle, setSelectedCircle] = useState<RechargeCircle | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] = useState<RechargePlan | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [operatorId, setOperatorId] = useState<string | null>(null);
  const [circleCode, setCircleCode] = useState<string | null>(null);
  const [circleName, setCircleName] = useState<string | null>(null);

  const detectOperator = async (mobile: string) => {
    setIsLoading(true);
    try {
      const result = await rechargeService.detectOperator({
        mobileNumber: mobile,
      });
      // You would map the operator code to the operator object here
      logger.info('Operator detected', result);
      setMobileNumber(mobile);
    } catch (error) {
      logger.error('Error detecting operator', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const processRecharge = async (data: RechargeRequest) => {
    setIsLoading(true);
    try {
      const result = await rechargeService.processMobileRecharge(data);
      logger.info('Recharge processed', result);
      return result;
    } catch (error) {
      logger.error('Error processing recharge', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetRecharge = () => {
    setSelectedOperator(null);
    setSelectedCircle(null);
    setSelectedPlan(null);
    setMobileNumber('');
    setAmount(0);
    setOperatorId(null);
    setCircleCode(null);
    setCircleName(null);
  };

  const value: RechargeContextType = {
    selectedOperator,
    selectedCircle,
    selectedPlan,
    mobileNumber,
    amount,
    isLoading,
    operatorId,
    circleCode,
    circleName,
    setSelectedOperator,
    setSelectedCircle,
    setSelectedPlan,
    setMobileNumber,
    setAmount,
    setOperatorId,
    setCircleCode,
    setCircleName,
    detectOperator,
    processRecharge,
    resetRecharge,
  };

  return (
    <RechargeContext.Provider value={value}>
      {children}
    </RechargeContext.Provider>
  );
}

export function useRecharge() {
  const context = useContext(RechargeContext);
  if (context === undefined) {
    throw new Error('useRecharge must be used within a RechargeProvider');
  }
  return context;
}
