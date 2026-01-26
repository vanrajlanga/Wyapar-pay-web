import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Blog - WyaparPay Insights',
  description: 'Latest articles, tips, and insights about digital payments and fintech',
};

// Force dynamic rendering to prevent build-time timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips to Maximize Your Cashback Rewards',
      excerpt: 'Learn how to earn more cashback on every transaction and make the most of your digital payments.',
      author: 'Priya Sharma',
      date: 'November 18, 2025',
      category: 'Tips & Tricks',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    },
    {
      id: 2,
      title: 'Understanding UPI: The Future of Digital Payments',
      excerpt: 'A comprehensive guide to UPI payments and how they\'re revolutionizing the way India pays.',
      author: 'Rahul Kumar',
      date: 'November 15, 2025',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
    {
      id: 3,
      title: 'How to Secure Your Digital Wallet',
      excerpt: 'Essential security practices to keep your digital wallet and transactions safe from fraud.',
      author: 'Anjali Patel',
      date: 'November 12, 2025',
      category: 'Security',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    },
    {
      id: 4,
      title: 'FASTag: Everything You Need to Know',
      excerpt: 'Complete guide to FASTag - how it works, benefits, and how to get started.',
      author: 'Vikram Singh',
      date: 'November 10, 2025',
      category: 'Services',
      image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800',
    },
    {
      id: 5,
      title: 'Mobile Recharge Hacks: Save Money Every Month',
      excerpt: 'Smart strategies to save money on mobile recharges and get the best deals.',
      author: 'Sneha Reddy',
      date: 'November 8, 2025',
      category: 'Tips & Tricks',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    },
    {
      id: 6,
      title: 'The Rise of Digital Payments in India',
      excerpt: 'Exploring how digital payments are transforming India\'s economy and financial landscape.',
      author: 'Amit Verma',
      date: 'November 5, 2025',
      category: 'Industry',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
  ];

  const categories = ['All', 'Tips & Tricks', 'Education', 'Security', 'Services', 'Industry'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              WyaparPay Blog
            </h1>
            <p className="text-xl text-gray-600">
              Insights, tips, and stories about digital payments and fintech
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Tag className="h-4 w-4" />
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Blog</h2>
              <p className="text-gray-600 mb-6">
                Get the latest articles and insights delivered to your inbox
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold">
                  Subscribe
                </button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

