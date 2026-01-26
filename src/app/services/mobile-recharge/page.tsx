import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Smartphone, Zap, Gift, Shield, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Mobile Recharge - WyaparPay',
  description: 'Instant mobile recharge for all operators with exclusive cashback offers',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MobileRechargePage() {
  const features = [
    { icon: Zap, title: 'Instant Recharge', desc: 'Recharge your mobile in seconds' },
    { icon: Gift, title: 'Cashback Offers', desc: 'Get up to 5% cashback on every recharge' },
    { icon: Shield, title: '100% Secure', desc: 'Bank-grade security for all transactions' },
    { icon: CheckCircle, title: 'All Operators', desc: 'Support for all major operators' },
  ];

  const operators = ['Jio', 'Airtel', 'Vi', 'BSNL', 'MTNL'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Smartphone className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Mobile Recharge
            </h1>
            <p className="text-xl text-gray-600">
              Recharge your prepaid or postpaid mobile instantly with exclusive 
              cashback offers and zero convenience fees.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {features.map((feature, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <feature.icon className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </Card>
              ))}
            </div>

            {/* How It Works */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Enter Mobile Number</h3>
                  <p className="text-sm text-gray-600">
                    Enter your 10-digit mobile number and select your operator
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Amount</h3>
                  <p className="text-sm text-gray-600">
                    Select from popular recharge plans or enter custom amount
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Pay & Recharge</h3>
                  <p className="text-sm text-gray-600">
                    Complete payment and get instant recharge confirmation
                  </p>
                </div>
              </div>
            </Card>

            {/* Supported Operators */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Supported Operators</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {operators.map((operator) => (
                  <Card key={operator} className="px-6 py-4">
                    <span className="font-semibold">{operator}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Recharge?</h2>
              <p className="mb-6 text-orange-50">
                Get started with instant mobile recharge and enjoy exclusive cashback offers
              </p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Start Recharging Now
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

