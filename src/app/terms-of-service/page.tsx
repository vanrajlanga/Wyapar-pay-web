import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - WyaparPay',
  description: 'WyaparPay Terms of Service - Terms and conditions for using our platform',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <FileText className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: November 20, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using WyaparPay services, you accept and agree to be bound by 
                  these Terms of Service. If you do not agree to these terms, please do not use 
                  our services.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To use WyaparPay services, you must:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Be a resident of India</li>
                  <li>Have a valid bank account or payment method</li>
                  <li>Provide accurate and complete information</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When creating an account, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as necessary</li>
                  <li>Keep your account credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  WyaparPay provides digital payment services including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Mobile recharge and DTH recharge</li>
                  <li>Bill payments (electricity, water, gas, etc.)</li>
                  <li>Digital wallet services</li>
                  <li>Money transfer and UPI payments</li>
                  <li>Loan services (subject to eligibility)</li>
                  <li>FASTag services</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Fees and Charges</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Most services on WyaparPay are free. However:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Mobile recharges and bill payments have zero convenience fees</li>
                  <li>Some services may have minimal charges (clearly displayed)</li>
                  <li>Third-party charges (bank, network) may apply</li>
                  <li>We reserve the right to modify fees with prior notice</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Transactions</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  All transactions are subject to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Verification and approval by us or our partners</li>
                  <li>Availability of funds in your account</li>
                  <li>Compliance with regulatory requirements</li>
                  <li>Our fraud prevention measures</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We are not liable for delays or failures due to third-party service providers.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Prohibited Activities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use the service for illegal or unauthorized purposes</li>
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit viruses or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to access our services</li>
                  <li>Engage in fraudulent or deceptive practices</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  WyaparPay shall not be liable for any indirect, incidental, special, or 
                  consequential damages arising from your use of our services. Our total 
                  liability shall not exceed the amount of fees paid by you in the 12 months 
                  preceding the claim.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may suspend or terminate your account if:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You violate these Terms of Service</li>
                  <li>You engage in fraudulent activities</li>
                  <li>Required by law or regulatory authorities</li>
                  <li>You request account closure</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  You may close your account at any time by contacting customer support.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify you 
                  of significant changes via email or app notification. Continued use of our 
                  services after changes constitutes acceptance of the new terms.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">11. RBI Compliance & Regulations</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  WyaparPay operates in compliance with Reserve Bank of India (RBI) guidelines:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Licensed as a Payment Aggregator under RBI Master Directions</li>
                  <li>Compliant with RBI guidelines on Prepaid Payment Instruments (PPI)</li>
                  <li>Adheres to KYC/AML guidelines as per RBI Master Direction on KYC</li>
                  <li>Follows RBI guidelines on Digital Payment Security</li>
                  <li>Maintains escrow accounts as per RBI requirements</li>
                  <li>Regular reporting and audits as mandated by RBI</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  All transactions are processed through RBI-approved payment gateways and banking partners.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">12. Transaction Limits & Restrictions</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As per RBI guidelines, the following limits apply:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Minimum transaction amount: ₹1</li>
                  <li>Maximum wallet balance: ₹2,00,000 (as per RBI PPI guidelines)</li>
                  <li>Daily transaction limit: As per your KYC level</li>
                  <li>Monthly transaction limit: As per your KYC level</li>
                  <li>KYC Level 1: ₹10,000/month limit</li>
                  <li>KYC Level 2: ₹2,00,000/month limit</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Limits may vary based on your KYC status and account type. Complete KYC for higher limits.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">13. Grievance Redressal</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As per RBI guidelines, we have a structured grievance redressal mechanism:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>All grievances are acknowledged within 24 hours</li>
                  <li>Resolution provided within 30 days</li>
                  <li>If unresolved, you may escalate to RBI Ombudsman</li>
                  <li>Grievance Officer contact: grievance@wyaparpay.com</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  For detailed grievance process, visit <a href="/grievance" className="text-orange-600 hover:underline">Grievance Redressal</a> page.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">14. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms of Service are governed by the laws of India, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                  <li>Reserve Bank of India Act, 1934 and related guidelines</li>
                  <li>Payment and Settlement Systems Act, 2007</li>
                  <li>Information Technology Act, 2000</li>
                  <li>Indian Contract Act, 1872</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka, India.
                </p>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For questions about these Terms of Service, contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Legal Department:</strong></p>
                  <p><strong>Email:</strong> legal@wyaparpay.com</p>
                  <p><strong>Phone:</strong> +91-7795445566</p>
                  <p><strong>Registered Office:</strong> WyaparPay Private Limited, Bangalore, Karnataka, India</p>
                  <p className="mt-4">
                    <strong>Grievance Officer:</strong> grievance@wyaparpay.com
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

