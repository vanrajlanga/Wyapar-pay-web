import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Receipt, Zap, Gift, Shield, CheckCircle, Lightbulb, Tv, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Bill Payments - WyaparPay',
  description: 'Pay all your bills in one place - electricity, water, gas, DTH, and more',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function BillPaymentsPage() {
  const billTypes = [
    { icon: Lightbulb, name: 'Electricity', desc: 'Pay electricity bills instantly' },
    { icon: Tv, name: 'DTH', desc: 'Recharge your DTH connection' },
    { icon: CreditCard, name: 'Credit Card', desc: 'Pay credit card bills' },
    { icon: Receipt, name: 'Water & Gas', desc: 'Utility bill payments' },
  ];

  const benefits = [
    'Zero convenience fees',
    'Instant payment confirmation',
    'Exclusive cashback offers',
    '24/7 availability',
    'Multiple payment options',
    'Auto-pay facility',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Receipt className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bill Payments
            </h1>
            <p className="text-xl text-gray-600">
              Pay all your bills in one place - electricity, water, gas, DTH, 
              credit cards, and more. Fast, secure, and rewarding.
            </p>
          </div>
        </section>

        {/* Bill Types */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Pay All Your Bills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {billTypes.map((bill, idx) => (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <bill.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{bill.name}</h3>
                  <p className="text-sm text-gray-600">{bill.desc}</p>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose WyaparPay?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 text-center">
                <Zap className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Instant Payments</h3>
                <p className="text-sm text-gray-600">
                  Get instant confirmation for all bill payments
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Gift className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Cashback Rewards</h3>
                <p className="text-sm text-gray-600">
                  Earn cashback on every bill payment
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">100% Secure</h3>
                <p className="text-sm text-gray-600">
                  Bank-grade security for all transactions
                </p>
              </Card>
            </div>

            {/* CTA */}
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Start Paying Bills Now</h2>
              <p className="mb-6 text-orange-50">
                Experience hassle-free bill payments with instant confirmations and cashback
              </p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Pay Bills Now
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

