/**
 * i18n Configuration
 * Internationalization setup for multi-language support
 */

// For now, we'll use a simple approach. In production, you'd use i18next or react-intl
// This is a placeholder structure that matches the mobile app

export const translations = {
  en: {
    common: {
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
    },
    dashboard: {
      title: 'Dashboard',
      balance: 'Balance',
      recentTransactions: 'Recent Transactions',
      quickActions: 'Quick Actions',
    },
    recharge: {
      title: 'Mobile Recharge',
      mobileNumber: 'Mobile Number',
      operator: 'Operator',
      amount: 'Amount',
      browsePlans: 'Browse Plans',
      proceed: 'Proceed',
    },
    transactions: {
      title: 'Transactions',
      all: 'All',
      success: 'Success',
      pending: 'Pending',
      failed: 'Failed',
      noTransactions: 'No transactions found',
    },
  },
  hi: {
    common: {
      welcome: 'स्वागत है',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      back: 'वापस',
      next: 'अगला',
      submit: 'जमा करें',
    },
    auth: {
      login: 'लॉगिन',
      register: 'पंजीकरण',
      logout: 'लॉगआउट',
      email: 'ईमेल',
      password: 'पासवर्ड',
      forgotPassword: 'पासवर्ड भूल गए?',
      dontHaveAccount: 'खाता नहीं है?',
      alreadyHaveAccount: 'पहले से खाता है?',
    },
    dashboard: {
      title: 'डैशबोर्ड',
      balance: 'शेष राशि',
      recentTransactions: 'हाल के लेनदेन',
      quickActions: 'त्वरित क्रियाएं',
    },
    recharge: {
      title: 'मोबाइल रिचार्ज',
      mobileNumber: 'मोबाइल नंबर',
      operator: 'ऑपरेटर',
      amount: 'राशि',
      browsePlans: 'योजनाएं देखें',
      proceed: 'आगे बढ़ें',
    },
    transactions: {
      title: 'लेनदेन',
      all: 'सभी',
      success: 'सफल',
      pending: 'लंबित',
      failed: 'विफल',
      noTransactions: 'कोई लेनदेन नहीं मिला',
    },
  },
  kn: {
    common: {
      welcome: 'ಸ್ವಾಗತ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      error: 'ದೋಷ',
      success: 'ಯಶಸ್ಸು',
      cancel: 'ರದ್ದುಮಾಡಿ',
      confirm: 'ದೃಢೀಕರಿಸಿ',
      save: 'ಉಳಿಸಿ',
      delete: 'ಅಳಿಸಿ',
      edit: 'ಸಂಪಾದಿಸಿ',
      back: 'ಹಿಂದೆ',
      next: 'ಮುಂದೆ',
      submit: 'ಸಲ್ಲಿಸಿ',
    },
    auth: {
      login: 'ಲಾಗಿನ್',
      register: 'ನೋಂದಣಿ',
      logout: 'ಲಾಗ್ಔಟ್',
      email: 'ಇಮೇಲ್',
      password: 'ಪಾಸ್ವರ್ಡ್',
      forgotPassword: 'ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?',
      dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
      alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    },
    dashboard: {
      title: 'ಡ್ಯಾಶ್ಬೋರ್ಡ್',
      balance: 'ಬಾಕಿ',
      recentTransactions: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',
      quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    },
    recharge: {
      title: 'ಮೊಬೈಲ್ ರೀಚಾರ್ಜ್',
      mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      operator: 'ಆಪರೇಟರ್',
      amount: 'ಮೊತ್ತ',
      browsePlans: 'ಯೋಜನೆಗಳನ್ನು ನೋಡಿ',
      proceed: 'ಮುಂದುವರಿಸಿ',
    },
    transactions: {
      title: 'ವಹಿವಾಟುಗಳು',
      all: 'ಎಲ್ಲಾ',
      success: 'ಯಶಸ್ವಿ',
      pending: 'ಬಾಕಿ ಉಳಿದಿದೆ',
      failed: 'ವಿಫಲವಾಗಿದೆ',
      noTransactions: 'ಯಾವುದೇ ವಹಿವಾಟುಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    },
  },
};

export type Language = 'en' | 'hi' | 'kn';

// Simple translation function (placeholder)
export function t(key: string, lang: Language = 'en'): string {
  const keys = key.split('.');
  let value: unknown = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}
