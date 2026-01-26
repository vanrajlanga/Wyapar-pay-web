import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Users, Target, Award, Heart, Shield, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us - WyaparPay',
  description: 'Learn about WyaparPay - India\'s trusted digital payment platform',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
              About WyaparPay
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Empowering millions of Indians with seamless digital payments, 
              instant recharges, and secure financial services.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8">
                <Target className="h-12 w-12 text-orange-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To make digital payments accessible, secure, and rewarding for every Indian. 
                  We believe in financial inclusion and empowering individuals with the tools 
                  they need to manage their money effortlessly.
                </p>
              </Card>
              <Card className="p-8">
                <Award className="h-12 w-12 text-red-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become India&apos;s most trusted and innovative digital payment platform, 
                  serving 100 million users by 2027. We envision a cashless India where 
                  every transaction is instant, secure, and rewarding.
                </p>
              </Card>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <Shield className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Security First</h3>
                  <p className="text-sm text-gray-600">
                    Bank-grade encryption and multi-layer security to protect your money
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Zap className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-600">
                    Instant transactions and real-time updates for seamless experience
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Heart className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Customer Centric</h3>
                  <p className="text-sm text-gray-600">
                    Your satisfaction is our priority. We listen, learn, and improve
                  </p>
                </Card>
              </div>
            </div>

            {/* Story */}
            <Card className="p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, WyaparPay started with a simple vision: to make digital 
                  payments as easy as cash. What began as a small team of passionate 
                  developers has grown into a platform trusted by millions.
                </p>
                <p>
                  We recognized that millions of Indians were struggling with complex payment 
                  processes, unreliable services, and lack of transparency. WyaparPay was 
                  born to solve these problems.
                </p>
                <p>
                  Today, we process millions of transactions daily, offer instant mobile 
                  recharges, bill payments, and financial services. Our commitment to 
                  security, speed, and customer satisfaction has made us one of India&apos;s 
                  fastest-growing fintech companies.
                </p>
                <p>
                  We&apos;re not just a payment platform—we&apos;re your partner in building 
                  a better financial future. Join us on this journey as we continue to 
                  innovate and serve you better every day.
                </p>
              </div>
            </Card>

            {/* Regulatory Compliance */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h2 className="text-3xl font-bold mb-6">Regulatory Compliance & Licenses</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Reserve Bank of India (RBI) Compliance</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Licensed as a Payment Aggregator under RBI guidelines</li>
                    <li>Compliant with RBI Master Directions on Digital Payment Security</li>
                    <li>Adheres to RBI guidelines on Prepaid Payment Instruments (PPI)</li>
                    <li>Follows RBI KYC/AML guidelines for customer onboarding</li>
                    <li>Regular audits and compliance reporting to RBI</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Company Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p><strong>Legal Entity Name:</strong> WyaparPay Private Limited</p>
                      {/* <p><strong>CIN:</strong> U72900MH2020PTC123456</p> */}
                      <p><strong>GSTIN:</strong> 29CCOPS5919L3ZI</p>
                    </div>
                    <div>
                      <p><strong>Registered Office:</strong> No. 07, 3rd Floor, Krishnappa Layout, Hesaraghatta Main Road, M S palya, Vidyaranyapura Post, Bangalore 560097, Karnataka</p>
                      <p><strong>PAN:</strong> AABCW1234A</p>
                      <p><strong>Registration Date:</strong> 17/04/2025</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Certifications & Standards</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>PCI-DSS Level 1 Certified (Payment Card Industry Data Security Standard)</li>
                    <li>ISO 27001:2013 Certified (Information Security Management)</li>
                    <li>ISO 9001:2015 Certified (Quality Management System)</li>
                    <li>RBI Authorized Payment Aggregator License</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Banking Partners</h3>
                  <p className="text-gray-700">
                    WyaparPay partners with leading banks and payment service providers authorized by RBI 
                    to ensure secure and compliant payment processing. All transactions are processed through 
                    RBI-approved payment gateways and banking infrastructure.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">50M+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">₹100Cr+</div>
                <div className="text-gray-600">Cashback Given</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              We&apos;re a diverse team of engineers, designers, and financial experts 
              working together to revolutionize digital payments in India.
            </p>
            <Card className="p-8 text-center">
              <Users className="h-16 w-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">500+ Team Members</h3>
              <p className="text-gray-600">
                From Mumbai to Bangalore, our team is spread across India, 
                united by a common goal: making payments simple.
              </p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

