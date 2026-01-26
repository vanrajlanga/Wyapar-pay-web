import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Newspaper, Mail, Calendar, FileText } from 'lucide-react';

export const metadata = {
  title: 'Press - WyaparPay Media Center',
  description: 'Latest news, press releases, and media resources from WyaparPay',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PressPage() {
  const pressReleases = [
    {
      date: 'November 15, 2025',
      title: 'WyaparPay Reaches 50 Million Active Users Milestone',
      excerpt: 'Company celebrates major growth milestone with record-breaking user adoption...',
    },
    {
      date: 'October 20, 2025',
      title: 'WyaparPay Launches Instant Loan Services',
      excerpt: 'New feature enables users to get instant personal loans up to ₹5 lakhs...',
    },
    {
      date: 'September 10, 2025',
      title: 'WyaparPay Partners with Leading Banks for FASTag Services',
      excerpt: 'Strategic partnership expands FASTag network across India...',
    },
    {
      date: 'August 5, 2025',
      title: 'WyaparPay Introduces AI-Powered Fraud Detection',
      excerpt: 'Advanced security features protect users from fraudulent transactions...',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Press & Media Center
            </h1>
            <p className="text-xl text-gray-600">
              Latest news, press releases, and media resources from WyaparPay
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Newspaper className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        {release.date}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                      <p className="text-gray-600 mb-4">{release.excerpt}</p>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Media Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Press Kit</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Download our company overview, logos, and key facts
                </p>
                <Button variant="outline">Download</Button>
              </Card>
              <Card className="p-6 text-center">
                <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Brand Assets</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Logos, images, and brand guidelines
                </p>
                <Button variant="outline">Download</Button>
              </Card>
              <Card className="p-6 text-center">
                <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fact Sheet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Key statistics and company information
                </p>
                <Button variant="outline">Download</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 text-center">
              <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-gray-600 mb-6">
                For media inquiries, interview requests, or press releases, 
                please contact our media team.
              </p>
              <div className="space-y-2 mb-6">
                <p className="font-semibold">Email: press@wyaparpay.com</p>
                <p className="font-semibold">Phone: +91-22-1234-5678</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                Contact Media Team
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

