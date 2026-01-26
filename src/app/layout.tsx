import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { UserProvider } from '@/contexts/UserContext';
import { RechargeProvider } from '@/contexts/RechargeContext';
import { StructuredData } from '@/components/common/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wyaparpay.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WyaparPay - India\'s Fastest Digital Payment & Recharge Platform',
    template: '%s | WyaparPay',
  },
  description:
    'WyaparPay - India\'s trusted digital payment platform. Recharge mobile, pay bills, send money via UPI, get FASTag, and apply for instant loans. Secure, fast, and convenient payments for millions of Indians.',
  keywords: [
    'digital payment India',
    'mobile recharge online',
    'UPI payment app',
    'bill payment online India',
    'FASTag recharge',
    'instant loan India',
    'digital wallet India',
    'online payment gateway',
    'money transfer India',
    'cashless payment',
    'fintech India',
    'payment app',
    'recharge app',
    'bill payment app',
    'UPI wallet',
    'digital banking',
    'online recharge',
    'electricity bill payment',
    'water bill payment',
    'gas bill payment',
    'DTH recharge',
    'broadband recharge',
    'insurance payment',
    'credit card payment',
    'loan EMI payment',
    'RBI approved payment',
    'secure payment gateway',
    'instant money transfer',
  ],
  authors: [{ name: 'WyaparPay' }],
  creator: 'WyaparPay',
  publisher: 'WyaparPay',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'WyaparPay',
    title: 'WyaparPay - India\'s Fastest Digital Payment & Recharge Platform',
    description:
      'Secure digital payments, mobile recharge, bill payments, UPI transfers, FASTag, and instant loans. Trusted by millions of Indians for fast and secure transactions.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'WyaparPay - Digital Payment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WyaparPay - India\'s Fastest Digital Payment Platform',
    description:
      'Secure digital payments, mobile recharge, bill payments, UPI transfers, and instant loans. Trusted by millions of Indians.',
    images: [`${siteUrl}/logo.png`],
    creator: '@wyaparpay',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-IN': siteUrl,
      'en': siteUrl,
      'hi': `${siteUrl}/hi`,
    },
  },
  category: 'Finance',
  classification: 'Financial Services',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WyaparPay',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/wyaparpay-icon.png', sizes: 'any' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: '/wyaparpay-icon.png',
    shortcut: '/wyaparpay-icon.png',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#F97316', // Orange-500 matching website theme
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  userScalable: true, // Allow users to zoom (accessibility requirement)
  viewportFit: 'cover', // Support for notched devices (iPhone X+)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wyaparpay.com';
  
  // Structured Data (JSON-LD) for Fintech Business
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'WyaparPay',
    description:
      'India\'s trusted digital payment platform offering mobile recharge, bill payments, UPI transfers, FASTag, and instant loans.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    telephone: '+91-XXXXX-XXXXX', // Update with actual contact number
    email: 'support@wyaparpay.com', // Update with actual email
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: [
      'Mobile Recharge',
      'Bill Payment',
      'UPI Money Transfer',
      'FASTag Recharge',
      'Instant Loans',
      'Digital Wallet',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '10000',
    },
    sameAs: [
      'https://www.facebook.com/wyaparpay',
      'https://x.com/wyaparpay',
      'https://www.instagram.com/wyaparpay',
      'https://www.threads.com/@wyaparpay',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WyaparPay',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'India\'s fastest and most secure digital payment platform for mobile recharge, bill payments, UPI transfers, and financial services.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };

  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <StructuredData data={[structuredData, organizationSchema]} />
        <ErrorBoundary>
          <AuthProvider>
            <UserProvider>
              <RechargeProvider>{children}</RechargeProvider>
            </UserProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
