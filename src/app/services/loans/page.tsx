import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { TrendingUp, Zap, Shield, CheckCircle, DollarSign, Clock } from 'lucide-react';

export const metadata = {
  title: 'Instant Loans - WyaparPay',
  description: 'Get instant personal loans up to ₹5 lakhs with quick approval and flexible repayment',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function LoansPage() {
  const features = [
    { icon: Zap, title: 'Instant Approval', desc: 'Get approved in minutes' },
    { icon: DollarSign, title: 'Up to ₹5 Lakhs', desc: 'Flexible loan amounts' },
    { icon: Clock, title: 'Quick Disbursal', desc: 'Money in your account within 24 hours' },
    { icon: Shield, title: 'Secure Process', desc: '100% secure and confidential' },
  ];

  const eligibility = [
    'Indian citizen aged 21-60 years',
    'Minimum monthly income ₹15,000',
    'Valid bank account',
    'Valid ID proof (Aadhaar/PAN)',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <TrendingUp className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Instant Personal Loans
            </h1>
            <p className="text-xl text-gray-600">
              Get instant personal loans up to ₹5 lakhs with quick approval, 
              flexible repayment options, and competitive interest rates.
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

            {/* Loan Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Loan Features</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Loan Amount</h3>
                      <p className="text-sm text-gray-600">₹10,000 to ₹5,00,000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Interest Rate</h3>
                      <p className="text-sm text-gray-600">Starting from 10.99% per annum</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Tenure</h3>
                      <p className="text-sm text-gray-600">12 to 60 months</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Processing Fee</h3>
                      <p className="text-sm text-gray-600">2% to 6% of loan amount</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Eligibility Criteria</h2>
                <div className="space-y-3">
                  {eligibility.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* How It Works */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Apply Online', desc: 'Fill simple application form' },
                  { step: '2', title: 'Get Approved', desc: 'Instant approval in minutes' },
                  { step: '3', title: 'Upload Documents', desc: 'Submit required documents' },
                  { step: '4', title: 'Receive Money', desc: 'Money credited within 24 hours' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-600">{item.step}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
              <p className="mb-6 text-orange-50">
                Get instant personal loan approval and receive money in your account within 24 hours
              </p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Apply for Loan Now
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

