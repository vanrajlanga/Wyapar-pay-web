'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import {
  FAQSection,
  SecurityTipsSection,
  HowToGuide,
  InfoBanner,
} from '@/components/common';
import { ROUTES } from '@/constants';
import {
  MdAccountBalanceWallet,
  MdSend,
  MdGetApp,
  MdQrCode,
  MdPhone,
  MdEmail,
} from 'react-icons/md';

export default function UPIWalletPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'setup' | 'security' | 'faq'
  >('overview');

  const securityTips = [
    {
      title: 'Never share your UPI PIN with anyone',
      description:
        'Your UPI PIN is confidential. No company representative will ever ask for it.',
    },
    {
      title: 'Only use trusted devices for transactions',
      description:
        'Avoid using public or shared devices for financial transactions to prevent unauthorized access.',
    },
    {
      title: 'Verify the recipient before sending money',
      description:
        'Always double-check the UPI ID or phone number before confirming any transaction.',
    },
    {
      title: 'Keep your app updated',
      description:
        'Regular updates include security patches that protect your account from vulnerabilities.',
    },
  ];

  const setupSteps = [
    {
      title: 'Download the WyaparPay app',
      description:
        "Get the app from your device's app store. It's available for both iOS and Android.",
    },
    {
      title: 'Register with your mobile number',
      description:
        "Link your mobile number that's registered with your bank account. You'll receive an OTP for verification.",
    },
    {
      title: 'Create a UPI ID and set your PIN',
      description:
        'Choose a unique UPI ID and set a secure 4 or 6-digit PIN. This PIN will be required for all transactions.',
    },
    {
      title: 'Start using UPI for transactions',
      description:
        'Send money, pay bills, or make purchases directly from your bank account using your UPI ID.',
    },
  ];

  const faqItems = [
    {
      question: 'How do I reset my UPI PIN?',
      answer:
        'To reset your UPI PIN, go to the UPI settings in your WyaparPay app and select "Reset PIN". Follow the instructions to set a new PIN. You\'ll need your debit card details for verification.',
    },
    {
      question: 'What should I do if a transaction fails?',
      answer:
        "If a transaction fails, the amount will be refunded to your account within 2-3 business days. If it's not refunded automatically, contact our support team with your transaction ID.",
    },
    {
      question: 'Can I use UPI without internet?',
      answer:
        'No, UPI requires an active internet connection to process transactions. Make sure you have a stable connection before initiating any payment.',
    },
    {
      question: 'Is there a limit on UPI transactions?',
      answer:
        "Yes, there's typically a limit of ₹1,00,000 per transaction. Daily limits may vary based on your bank. Check with your bank for specific limits.",
    },
    {
      question: 'How secure is UPI?',
      answer:
        'UPI is very secure. It uses multi-factor authentication including device fingerprint, PIN, and OTP. Your financial details are never shared with merchants.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push(ROUTES.DASHBOARD)}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            UPI Wallet
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
            <MdAccountBalanceWallet size={64} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Manage Your UPI Wallet
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Send money, pay bills, and make purchases instantly using UPI. Safe,
            secure, and convenient.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <MdSend size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Send Money</h3>
            <p className="text-sm text-text-secondary">
              Transfer funds securely using our UPI service
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="inline-flex p-4 bg-secondary/10 rounded-full mb-4">
              <MdGetApp size={32} className="text-secondary" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Add Funds</h3>
            <p className="text-sm text-text-secondary">
              Easily add funds to your wallet using UPI
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
              <MdQrCode size={32} className="text-accent" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Scan & Pay</h3>
            <p className="text-sm text-text-secondary">
              Scan QR codes for instant payments
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-text-secondary hover:bg-background border border-border'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'setup'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-text-secondary hover:bg-background border border-border'
            }`}
          >
            How to Set Up
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'security'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-text-secondary hover:bg-background border border-border'
            }`}
          >
            Security Tips
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'faq'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-text-secondary hover:bg-background border border-border'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <InfoBanner
                variant="info"
                title="What is UPI?"
                description="UPI (Unified Payments Interface) is a real-time payment system that allows you to transfer money between bank accounts instantly using a mobile device. It's secure, fast, and works 24/7."
              />

              <Card className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Benefits of Using UPI
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-1">
                      <MdAccountBalanceWallet
                        size={20}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        Instant Transfers
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Money transfers happen in real-time, available 24/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                      <MdPhone size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        Simple & Easy
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Just use UPI ID or phone number to send money
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg mt-1">
                      <MdQrCode size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        Multiple Options
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Pay via QR code, UPI ID, phone number, or bank account
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent-success/10 rounded-lg mt-1">
                      <MdEmail size={20} className="text-accent-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        Bank-Grade Security
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Protected with multi-layer encryption and authentication
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="text-center">
                <Button size="lg" onClick={() => router.push(ROUTES.DASHBOARD)}>
                  Get Started with UPI
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'setup' && (
            <HowToGuide
              title="How to Set Up UPI Payments"
              description="Follow these simple steps to start using UPI for instant payments"
              steps={setupSteps}
            />
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <SecurityTipsSection title="Security Tips" tips={securityTips} />

              <InfoBanner
                variant="warning"
                title="Stay Alert"
                description="Be cautious of phishing attempts. WyaparPay will never ask for your UPI PIN, password, or OTP via call, email, or SMS. Always verify requests through the official app."
              />
            </div>
          )}

          {activeTab === 'faq' && (
            <FAQSection title="Frequently Asked Questions" items={faqItems} />
          )}
        </div>
      </main>
    </div>
  );
}
