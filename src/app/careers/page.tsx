import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Briefcase, Users, Zap, Heart, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Careers - Join WyaparPay',
  description: 'Build your career with India\'s fastest-growing fintech company',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Mumbai, Bangalore',
      type: 'Full-time',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Mumbai',
      type: 'Full-time',
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
    },
    {
      title: 'Customer Success Manager',
      department: 'Operations',
      location: 'Mumbai, Delhi',
      type: 'Full-time',
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Mumbai',
      type: 'Full-time',
    },
    {
      title: 'Security Engineer',
      department: 'Security',
      location: 'Bangalore',
      type: 'Full-time',
    },
  ];

  const benefits = [
    { icon: Zap, title: 'Competitive Salary', desc: 'Best-in-industry compensation' },
    { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage' },
    { icon: Briefcase, title: 'Flexible Work', desc: 'Remote and hybrid options' },
    { icon: Users, title: 'Great Culture', desc: 'Inclusive and collaborative' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Build Your Career with WyaparPay
            </h1>
            <p className="text-xl text-gray-600">
              Join India&apos;s fastest-growing fintech company and help shape 
              the future of digital payments.
            </p>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <benefit.icon className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="space-y-4">
              {openPositions.map((position, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At WyaparPay, we believe in creating an environment where everyone can 
                  thrive. We value diversity, encourage innovation, and celebrate success 
                  together.
                </p>
                <p>
                  Our culture is built on trust, transparency, and teamwork. We work hard, 
                  but we also make time for fun, learning, and personal growth.
                </p>
                <p>
                  Whether you&apos;re a recent graduate or a seasoned professional, if you&apos;re 
                  passionate about fintech and want to make a real impact, we&apos;d love to 
                  hear from you.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

