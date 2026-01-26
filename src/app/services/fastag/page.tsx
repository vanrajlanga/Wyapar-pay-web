import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Car, Zap, Shield, CheckCircle, CreditCard, MapPin } from 'lucide-react';

export const metadata = {
  title: 'FASTag - WyaparPay',
  description: 'Get FASTag for seamless toll payments and enjoy cashless highway travel',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FASTagPage() {
  const benefits = [
    'No waiting at toll plazas',
    'Automatic toll deduction',
    'Real-time balance updates',
    'Easy recharge options',
    'Accepted at all toll plazas',
    'Track your toll expenses',
  ];

  const features = [
    { icon: Zap, title: 'Instant Activation', desc: 'Get FASTag activated instantly' },
    { icon: Shield, title: 'Secure Payments', desc: 'Bank-grade security' },
    { icon: MapPin, title: 'Nationwide', desc: 'Accepted across India' },
    { icon: CreditCard, title: 'Easy Recharge', desc: 'Recharge anytime, anywhere' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Car className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              FASTag Services
            </h1>
            <p className="text-xl text-gray-600">
              Get FASTag for seamless toll payments. No more waiting at toll plazas. 
              Enjoy cashless highway travel across India.
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

            {/* Benefits */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose FASTag?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* How It Works */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">How FASTag Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get FASTag</h3>
                  <p className="text-sm text-gray-600">
                    Apply for FASTag and get it delivered to your address
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Recharge Balance</h3>
                  <p className="text-sm text-gray-600">
                    Recharge your FASTag wallet with required amount
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Drive Through</h3>
                  <p className="text-sm text-gray-600">
                    Drive through toll plazas without stopping
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Get Your FASTag Today</h2>
              <p className="mb-6 text-orange-50">
                Experience hassle-free toll payments and enjoy seamless highway travel
              </p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Apply for FASTag
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

