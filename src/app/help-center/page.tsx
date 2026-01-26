import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { HelpCircle, Search, MessageCircle, Book, Video, FileText } from 'lucide-react';

export const metadata = {
  title: 'Help Center - WyaparPay',
  description: 'Get help with your account, transactions, and services',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HelpCenterPage() {
  const categories = [
    {
      icon: MessageCircle,
      title: 'Getting Started',
      articles: 12,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Book,
      title: 'Account & Profile',
      articles: 8,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Video,
      title: 'Payments & Transactions',
      articles: 15,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: FileText,
      title: 'Troubleshooting',
      articles: 10,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const popularArticles = [
    'How to recharge my mobile?',
    'How to add money to wallet?',
    'How to change password?',
    'How to update profile?',
    'Transaction failed - what to do?',
    'How to contact customer support?',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <HelpCircle className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                How can we help you?
              </h1>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.articles} articles</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Popular Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article, idx) => (
                <Card key={idx} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <span className="text-gray-700">{article}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to assist you
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Chat with Us
                </Button>
                <Button variant="outline">
                  Email Support
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

