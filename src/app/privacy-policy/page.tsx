import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Shield, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - WyaparPay',
  description: 'WyaparPay Privacy Policy - How we collect, use, and protect your data',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Shield className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: November 20, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  WyaparPay (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our mobile application and website.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By using WyaparPay, you agree to the collection and use of information in accordance 
                  with this policy.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Name, email address, phone number</li>
                      <li>Date of birth and gender</li>
                      <li>Address and location data</li>
                      <li>Government-issued ID documents (for KYC)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Financial Information</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Bank account details (for transactions)</li>
                      <li>Payment card information (encrypted)</li>
                      <li>Transaction history</li>
                      <li>Wallet balance and usage</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technical Information</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Device information and identifiers</li>
                      <li>IP address and location data</li>
                      <li>App usage and analytics data</li>
                      <li>Cookies and similar technologies</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process transactions and send notifications</li>
                  <li>To verify your identity and prevent fraud</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>To send promotional offers and updates (with consent)</li>
                  <li>To analyze usage patterns and improve user experience</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>256-bit SSL encryption for all data transmission</li>
                  <li>Secure servers with regular security audits</li>
                  <li>Two-factor authentication for sensitive operations</li>
                  <li>Regular security updates and patches</li>
                  <li>Access controls and employee training</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We do not sell your personal information. We may share data with:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Service providers who assist in operations (under strict confidentiality)</li>
                  <li>Banks and payment processors (for transaction processing)</li>
                  <li>Regulatory authorities (as required by law)</li>
                  <li>Legal entities (in case of legal proceedings)</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                  <li>File a complaint with regulatory authorities</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and provide personalized content. You can manage cookie preferences in your browser settings.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Children&apos;s Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our services are not intended for users under 18 years of age. We do not knowingly 
                  collect personal information from children. If you believe we have collected information 
                  from a child, please contact us immediately.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
                  You are advised to review this policy periodically.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">10. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations (as per RBI guidelines, minimum 5 years)</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain transaction records as required by law</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Financial transaction records are retained for a minimum of 5 years as per RBI guidelines.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">11. Compliance with Indian Laws</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  WyaparPay complies with:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Information Technology Act, 2000</strong> and its amendments</li>
                  <li><strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong></li>
                  <li><strong>Digital Personal Data Protection Act, 2023</strong> (when applicable)</li>
                  <li><strong>RBI Master Directions</strong> on Digital Payment Security</li>
                  <li><strong>RBI Guidelines</strong> on KYC/AML</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">12. International Data Transfers</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your data is primarily stored and processed in India. In case of any international 
                  transfers, we ensure adequate safeguards are in place as per applicable laws. 
                  We do not transfer sensitive financial data outside India without explicit consent 
                  and regulatory approval.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Data Protection Officer:</strong></p>
                  <p><strong>Email:</strong> privacy@wyaparpay.com</p>
                  <p><strong>Phone:</strong> +91-7795445566</p>
                  <p><strong>Address:</strong> WyaparPay Private Limited, Bangalore, Karnataka, India</p>
                  <p className="mt-4 text-sm">
                    <strong>For Grievances:</strong> grievance@wyaparpay.com<br />
                    <strong>Response Time:</strong> Within 30 days as per RBI guidelines
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

