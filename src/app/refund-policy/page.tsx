import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy - WyaparPay',
  description: 'WyaparPay Refund Policy - How refunds are processed',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RefundPolicyPage() {
  const refundScenarios = [
    {
      scenario: 'Failed Transaction',
      eligible: true,
      timeline: '24-48 hours',
      desc: 'If payment is deducted but transaction fails, refund is automatic',
    },
    {
      scenario: 'Duplicate Payment',
      eligible: true,
      timeline: '3-5 business days',
      desc: 'If you are charged twice for the same transaction',
    },
    {
      scenario: 'Wrong Number Recharge',
      eligible: true,
      timeline: '5-7 business days',
      desc: 'If you recharge wrong number (subject to verification)',
    },
    {
      scenario: 'Successful Recharge',
      eligible: false,
      desc: 'Refunds not available for successful transactions',
    },
    {
      scenario: 'Bill Payment',
      eligible: false,
      desc: 'Bill payments are non-refundable once processed',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <RefreshCw className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Refund Policy
            </h1>
            <p className="text-xl text-gray-600">
              Understanding our refund process and policies
            </p>
          </div>
        </section>

        {/* Refund Scenarios */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Refund Scenarios</h2>
            <div className="space-y-4 mb-16">
              {refundScenarios.map((item, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start gap-4">
                    {item.eligible ? (
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{item.scenario}</h3>
                        {item.eligible && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Eligible
                          </span>
                        )}
                        {!item.eligible && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            Not Eligible
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{item.desc}</p>
                      {item.timeline && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Processing time: {item.timeline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Refund Process */}
            <Card className="p-8 mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">How to Request a Refund</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Contact Support', desc: 'Reach out via phone, email, or chat' },
                  { step: '2', title: 'Provide Details', desc: 'Share transaction ID and reason' },
                  { step: '3', title: 'Verification', desc: 'We verify your request' },
                  { step: '4', title: 'Refund Processed', desc: 'Amount credited to source' },
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

            {/* Important Notes */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-4">Automatic Refunds</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Failed transactions are automatically refunded</li>
                  <li>• No action required from your side</li>
                  <li>• Refund appears in 24-48 hours</li>
                  <li>• You&apos;ll receive SMS/email confirmation</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold mb-4">Manual Refund Requests</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Contact support with transaction details</li>
                  <li>• Provide reason for refund request</li>
                  <li>• Verification may take 3-5 business days</li>
                  <li>• Refund processed after approval</li>
                </ul>
              </Card>
            </div>

            {/* Refund Timeline Details */}
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Refund Processing Timelines</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold mb-2">Automatic Refunds (Failed Transactions)</h3>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Processing Time: 24-48 hours from transaction failure</li>
                    <li>• Credit to Source: 3-5 business days (depending on bank)</li>
                    <li>• Notification: SMS and email confirmation sent</li>
                    <li>• No action required from customer</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">Manual Refund Requests</h3>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Acknowledgment: Within 24 hours of request</li>
                    <li>• Investigation: 3-5 business days</li>
                    <li>• Approval & Processing: 2-3 business days after approval</li>
                    <li>• Credit to Source: 3-5 business days</li>
                    <li>• Total Timeline: 7-15 business days</li>
                  </ul>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Complex cases may take up to 30 days</li>
                    <li>• Requires additional documentation</li>
                    <li>• May involve third-party verification</li>
                    <li>• Regular updates provided via email/SMS</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Important Notes */}
            <Card className="p-8 mb-8 bg-yellow-50 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold mb-4">Important Information</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Refund Method:</strong> Refunds are processed to the original payment method used for the transaction.</p>
                <p><strong>Bank Processing:</strong> Once we process the refund, your bank may take 3-5 business days to credit the amount to your account.</p>
                <p><strong>Refund Status:</strong> Track your refund status in the app or contact support with your transaction ID.</p>
                <p><strong>Non-Refundable Services:</strong> Bill payments, successful recharges, and completed transactions are generally non-refundable unless there&apos;s a technical error on our part.</p>
                <p><strong>RBI Guidelines:</strong> All refunds are processed as per RBI guidelines and regulations.</p>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Need to Request a Refund?</h2>
              <p className="mb-6 text-orange-50">
                Contact our support team and we&apos;ll help you process your refund request
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/contact-us">
                  <Button className="bg-white text-orange-600 hover:bg-gray-100">
                    Contact Support
                  </Button>
                </a>
                <a href="/grievance">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    File a Grievance
                  </Button>
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

