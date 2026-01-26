import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - WyaparPay',
  description: 'Get in touch with WyaparPay customer support',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <MessageCircle className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              We&apos;re here to help! Get in touch with our support team
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 text-center">
                <Phone className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">24/7 Customer Support</p>
                <p className="text-lg font-semibold text-orange-600">+91-7795445566</p>
              </Card>
              <Card className="p-6 text-center">
                <Mail className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">We respond within 24 hours</p>
                <p className="text-lg font-semibold text-orange-600">support@wyaparpay.com</p>
              </Card>
              <Card className="p-6 text-center">
                <MapPin className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Registered Office</h3>
                <p className="text-gray-600 mb-4">Visit us at our office</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  WyaparPay Private Limited<br />
                  Bangalore, Karnataka, India<br />
                  PIN: 400001
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                      placeholder="Your name" 
                      inputMode="text"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input 
                      type="tel" 
                      placeholder="+91 1234567890"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input 
                      placeholder="What is this regarding?"
                      inputMode="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
                      placeholder="Tell us how we can help..."
                      inputMode="text"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                    Send Message
                  </Button>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <Clock className="h-8 w-8 text-orange-600 mb-4" />
                  <h3 className="font-semibold mb-2">Support Hours</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Phone Support:</strong> 24/7</p>
                    <p><strong>Email Support:</strong> 24/7</p>
                    <p><strong>Chat Support:</strong> 9 AM - 9 PM IST</p>
                    <p><strong>Office Hours:</strong> Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/help-center" className="block text-orange-600 hover:underline">
                      Help Center
                    </a>
                    <a href="/faqs" className="block text-orange-600 hover:underline">
                      Frequently Asked Questions
                    </a>
                    <a href="/security" className="block text-orange-600 hover:underline">
                      Security & Privacy
                    </a>
                    <a href="/grievance" className="block text-orange-600 hover:underline">
                      Grievance Redressal
                    </a>
                  </div>
                </Card>

                <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                  <h3 className="font-semibold mb-4 text-gray-900">Grievance Officer</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Name:</strong> Grievance Officer</p>
                    <p><strong>Email:</strong> grievance@wyaparpay.com</p>
                    <p><strong>Phone:</strong> +91-7795445566</p>
                    <p><strong>Response Time:</strong> Within 30 days as per RBI guidelines</p>
                    <p className="text-xs text-gray-600 mt-3">
                      As per RBI guidelines, all grievances are acknowledged within 24 hours 
                      and resolved within 30 days. If unresolved, you may escalate to RBI Ombudsman.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

