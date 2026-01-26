'use client';

import { Card } from '@/components/ui';
import { Shield, Zap, Gift, Headphones, Lock, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description:
      '256-bit SSL encryption ensures your transactions are always safe and secure.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description:
      'Lightning-fast recharges and bill payments processed within seconds.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Gift,
    title: 'Cashback & Rewards',
    description:
      'Earn cashback on every transaction with exclusive offers and deals.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Round-the-clock customer support to help you with any queries.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description:
      'Your personal information is encrypted and never shared with third parties.',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: TrendingUp,
    title: 'Best Rates',
    description: 'Competitive rates and lowest transaction fees in the market.',
    color: 'from-pink-500 to-pink-600',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Visual Banner */}
        <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="relative h-64 md:h-96">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1680251590844-53784815ded4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&h=600"
              alt="Secure Payments"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-pink-900/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 drop-shadow-2xl">
                <h2 className="text-white mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
                  Trusted by 50 Million+ Users
                </h2>
                <p className="text-xl md:text-2xl text-white drop-shadow-lg max-w-3xl mx-auto font-medium">
                  Your money is safe with bank-grade security and instant
                  processing
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className="mb-3 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Why Choose WyaparPay?
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the best-in-class digital payment platform with unmatched
            features and benefits designed for your convenience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-white border-0 shadow-lg group"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
