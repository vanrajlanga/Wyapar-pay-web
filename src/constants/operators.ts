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
  kwikApiOperatorId?: string; // KWIKAPI operator ID (opid)
}

export const OPERATORS: Record<string, Operator> = {
  AIRTEL: {
    code: 'AIRTEL',
    name: 'Airtel',
    displayName: 'Airtel',
    type: 'both',
    color: '#E60000',
    kwikApiOperatorId: '1', // KWIKAPI operator ID (from operator_codes API)
  },
  JIO: {
    code: 'JIO',
    name: 'Jio',
    displayName: 'Jio',
    type: 'prepaid',
    color: '#0066B2',
    kwikApiOperatorId: '8', // KWIKAPI operator ID - "Reliance Jio"
  },
  VI: {
    code: 'VI',
    name: 'Vi',
    displayName: 'Vi (Vodafone Idea)',
    type: 'both',
    color: '#D32F2F',
    kwikApiOperatorId: '3', // KWIKAPI operator ID - "VI"
  },
  BSNL: {
    code: 'BSNL',
    name: 'BSNL',
    displayName: 'BSNL',
    type: 'both',
    color: '#FFD700',
    kwikApiOperatorId: '4', // KWIKAPI operator ID - "Bsnl Topup"
  },
  MTNL: {
    code: 'MTNL',
    name: 'MTNL',
    displayName: 'MTNL',
    type: 'both',
    color: '#0066CC',
    kwikApiOperatorId: '14', // KWIKAPI operator ID
  },
};

export const getOperatorByCode = (code: string): Operator | undefined => {
  return OPERATORS[code.toUpperCase()];
};

export const getAllOperators = (): Operator[] => {
  return Object.values(OPERATORS);
};
