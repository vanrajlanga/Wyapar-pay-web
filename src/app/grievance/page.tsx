import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { AlertCircle, FileText, Mail, Phone, Clock } from 'lucide-react';

export const metadata = {
  title: 'Grievance Redressal - WyaparPay',
  description: 'File a grievance or complaint with WyaparPay',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GrievancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <AlertCircle className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Grievance Redressal
            </h1>
            <p className="text-xl text-gray-600">
              We take your concerns seriously. File a grievance and we&apos;ll resolve it promptly.
            </p>
          </div>
        </section>

        {/* Grievance Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">File a Grievance</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name" 
                      required
                      inputMode="text"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      required
                      inputMode="email"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input 
                      type="tel" 
                      placeholder="+91 1234567890" 
                      required
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Transaction ID (if applicable)</label>
                    <Input 
                      placeholder="Enter transaction ID"
                      inputMode="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]">
                    <option>Select category</option>
                    <option>Transaction Issue</option>
                    <option>Account Issue</option>
                    <option>Refund Request</option>
                    <option>Service Complaint</option>
                    <option>Security Concern</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <Input 
                    placeholder="Brief description of your grievance" 
                    required
                    inputMode="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Detailed Description *</label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[150px]"
                    placeholder="Please provide detailed information about your grievance..."
                    required
                    inputMode="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Supporting Documents</label>
                  <input
                    type="file"
                    multiple
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload screenshots, receipts, or any relevant documents (Max 5MB each)
                  </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Submit Grievance
                </Button>
              </form>
            </Card>

            {/* Process */}
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-8 text-center">Grievance Resolution Process</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Submit', desc: 'File your grievance online' },
                  { step: '2', title: 'Acknowledge', desc: 'Receive confirmation within 24 hours' },
                  { step: '3', title: 'Investigate', desc: 'We review and investigate your case' },
                  { step: '4', title: 'Resolve', desc: 'Get resolution within 7-15 days' },
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

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Mail className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-600">grievance@wyaparpay.com</p>
              </Card>
              <Card className="p-6 text-center">
                <Phone className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-gray-600">+91-7795445566</p>
              </Card>
              <Card className="p-6 text-center">
                <Clock className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-gray-600">24 hours acknowledgment</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

