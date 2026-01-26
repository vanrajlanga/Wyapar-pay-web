import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'FAQs - WyaparPay',
  description: 'Frequently asked questions about WyaparPay services',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FAQsPage() {
  const faqs = [
    {
      category: 'Account & Registration',
      questions: [
        {
          q: 'How do I create a WyaparPay account?',
          a: 'Creating an account is simple! Click on "Sign Up" and provide your mobile number or email. Verify with OTP and set a password. You\'re all set!',
        },
        {
          q: 'Is it free to create an account?',
          a: 'Yes, creating a WyaparPay account is completely free. There are no hidden charges or subscription fees.',
        },
        {
          q: 'Can I use the same account on multiple devices?',
          a: 'Yes, you can access your WyaparPay account from multiple devices. Just log in with your credentials on any device.',
        },
      ],
    },
    {
      category: 'Mobile Recharge',
      questions: [
        {
          q: 'How do I recharge my mobile?',
          a: 'Go to Mobile Recharge, enter your 10-digit mobile number, select operator, choose amount or plan, and complete payment. Recharge is instant!',
        },
        {
          q: 'Which operators are supported?',
          a: 'We support all major operators including Jio, Airtel, Vi, BSNL, and MTNL.',
        },
        {
          q: 'How long does it take for recharge to reflect?',
          a: 'Most recharges are instant. In rare cases, it may take up to 5 minutes. You\'ll receive SMS confirmation once completed.',
        },
      ],
    },
    {
      category: 'Payments & Transactions',
      questions: [
        {
          q: 'What payment methods are accepted?',
          a: 'We accept UPI, Credit/Debit Cards, Net Banking, and Wallet payments.',
        },
        {
          q: 'Are there any transaction fees?',
          a: 'Mobile recharges and bill payments have zero convenience fees. Some services may have minimal charges which are clearly displayed.',
        },
        {
          q: 'How do I track my transactions?',
          a: 'Go to Transactions section in your dashboard to view all your transaction history with detailed information.',
        },
      ],
    },
    {
      category: 'Wallet & Balance',
      questions: [
        {
          q: 'How do I add money to my wallet?',
          a: 'Go to Wallet section, click "Add Money", enter amount, choose payment method, and complete payment. Money is added instantly.',
        },
        {
          q: 'Is my wallet balance secure?',
          a: 'Yes, your wallet is protected with bank-grade encryption. All transactions are secure and monitored 24/7.',
        },
        {
          q: 'Can I withdraw money from my wallet?',
          a: 'Yes, you can transfer wallet balance to your linked bank account. Go to Wallet → Transfer to Bank.',
        },
      ],
    },
    {
      category: 'Security & Privacy',
      questions: [
        {
          q: 'How secure is WyaparPay?',
          a: 'We use bank-grade encryption, two-factor authentication, and comply with all RBI guidelines. Your data and money are completely secure.',
        },
        {
          q: 'What should I do if I notice unauthorized transactions?',
          a: 'Immediately contact our support team at +91-7795445566 or email security@wyaparpay.com. We\'ll investigate and resolve the issue.',
        },
        {
          q: 'Is my personal information safe?',
          a: 'Yes, we follow strict data protection policies. Your information is encrypted and never shared with third parties without consent.',
        },
      ],
    },
    {
      category: 'Cashback & Offers',
      questions: [
        {
          q: 'How do I earn cashback?',
          a: 'You earn cashback on eligible transactions. Cashback is automatically credited to your wallet within 24-48 hours.',
        },
        {
          q: 'When will I receive my cashback?',
          a: 'Cashback is typically credited within 24-48 hours of transaction completion. You\'ll receive a notification once credited.',
        },
        {
          q: 'Can I use cashback for transactions?',
          a: 'Yes, cashback in your wallet can be used for any WyaparPay transactions, just like regular balance.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <HelpCircle className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about WyaparPay
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {faqs.map((category, catIdx) => (
                <div key={catIdx}>
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, idx) => (
                      <Card key={idx} className="p-6">
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer">
                            <h3 className="font-semibold text-gray-900 pr-4">
                              {faq.q}
                            </h3>
                            <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                          </summary>
                          <p className="mt-4 text-gray-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </details>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="/contact-us">
                  <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold">
                    Contact Support
                  </button>
                </a>
                <a href="/help-center">
                  <button className="px-6 py-2 border border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 rounded-lg font-semibold">
                    Visit Help Center
                  </button>
                </a>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

