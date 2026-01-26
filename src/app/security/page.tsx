import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key } from 'lucide-react';

export const metadata = {
  title: 'Security - WyaparPay',
  description: 'Learn about WyaparPay security measures and how to keep your account safe',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Bank-Grade Encryption',
      desc: 'All transactions are encrypted using 256-bit SSL encryption, the same standard used by banks.',
    },
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      desc: 'Add an extra layer of security with OTP verification for sensitive operations.',
    },
    {
      icon: Eye,
      title: '24/7 Fraud Monitoring',
      desc: 'Our AI-powered system monitors all transactions in real-time to detect and prevent fraud.',
    },
    {
      icon: Key,
      title: 'Secure Payment Gateway',
      desc: 'We partner with PCI-DSS compliant payment processors to ensure secure transactions.',
    },
  ];

  const safetyTips = [
    'Never share your OTP or password with anyone',
    'Always log out from shared devices',
    'Enable two-factor authentication',
    'Use strong, unique passwords',
    'Keep your app updated',
    'Report suspicious activity immediately',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Shield className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Security & Privacy
            </h1>
            <p className="text-xl text-gray-600">
              Your security is our top priority. Learn how we protect your data and money.
            </p>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">How We Protect You</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {securityFeatures.map((feature, idx) => (
                <Card key={idx} className="p-6">
                  <feature.icon className="h-10 w-10 text-orange-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              ))}
            </div>

            {/* Safety Tips */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Safety Tips for You</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {safetyTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* What to Do */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  If You Notice Suspicious Activity
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Immediately change your password</li>
                  <li>• Contact support at +91-7795445566</li>
                  <li>• Report the issue via email: security@wyaparpay.com</li>
                  <li>• Review your transaction history</li>
                  <li>• Enable two-factor authentication</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  Red Flags to Watch For
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Unexpected OTP requests</li>
                  <li>• Unauthorized transactions</li>
                  <li>• Login from unknown devices</li>
                  <li>• Suspicious emails or calls</li>
                  <li>• Requests for your password or OTP</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Compliance & Certifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <h3 className="font-semibold mb-2">RBI Compliant</h3>
                <p className="text-sm text-gray-600">
                  Fully compliant with Reserve Bank of India guidelines
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-semibold mb-2">PCI-DSS Certified</h3>
                <p className="text-sm text-gray-600">
                  Payment Card Industry Data Security Standard certified
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-semibold mb-2">ISO 27001</h3>
                <p className="text-sm text-gray-600">
                  Information security management system certified
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

