/**
 * Mobile Operator Constants
 * Supported telecom operators and their metadata
 */

export interface Operator {
  code: string;
  name: string;
  displayName: string;
  type: 'prepaid' | 'postpaid' | 'both';
  logo?: string;
  color: string;
}

export const OPERATORS: Record<string, Operator> = {
  AIRTEL: {
    code: 'AIRTEL',
    name: 'Airtel',
    displayName: 'Airtel',
    type: 'both',
    color: '#E60000',
  },
  JIO: {
    code: 'JIO',
    name: 'Jio',
    displayName: 'Jio',
    type: 'prepaid',
    color: '#0066B2',
  },
  VI: {
    code: 'VI',
    name: 'Vi',
    displayName: 'Vi (Vodafone Idea)',
    type: 'both',
    color: '#D32F2F',
  },
  BSNL: {
    code: 'BSNL',
    name: 'BSNL',
    displayName: 'BSNL',
    type: 'both',
    color: '#FFD700',
  },
  MTNL: {
    code: 'MTNL',
    name: 'MTNL',
    displayName: 'MTNL',
    type: 'both',
    color: '#0066CC',
  },
};

export const getOperatorByCode = (code: string): Operator | undefined => {
  return OPERATORS[code.toUpperCase()];
};

export const getAllOperators = (): Operator[] => {
  return Object.values(OPERATORS);
};
