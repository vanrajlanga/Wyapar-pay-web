'use client';

import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import {
  ArrowRight,
  Zap,
  Smartphone,
  CreditCard,
  BadgePercent,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

const categories = [
  {
    title: 'Mobile Recharge',
    subtitle: 'Get 10% Cashback',
    description: 'On first prepaid & postpaid recharge',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    image:
      'https://images.unsplash.com/photo-1695648443061-a14bc74bf29d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
  {
    title: 'Bill Payments',
    subtitle: 'Save Time & Money',
    description: 'Pay all your bills in one place',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    image:
      'https://images.unsplash.com/photo-1758691031582-0ce1b43749e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
  {
    title: 'Loans & Credit',
    subtitle: 'Instant Approval',
    description: 'Get loans up to ₹5 lakh',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
    image:
      'https://images.unsplash.com/photo-1680251590844-53784815ded4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
];

export function CategoryBanner() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-5 py-2.5 rounded-full mb-5 shadow-sm border border-orange-200/50">
            <BadgePercent className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-semibold">Trending This Week</span>
          </div>
          <h2 className="mb-4 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most loved services with exclusive deals and amazing offers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 rounded-2xl bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fill
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color} shadow-xl flex items-center justify-center backdrop-blur-sm bg-opacity-90`}
                  >
                    <category.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
                <div className="mb-3">
                  <div
                    className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${category.color} text-white shadow-md`}
                  >
                    {category.subtitle}
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{category.title}</h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {category.description}
                </p>
                <Button
                  variant="ghost"
                  className="group-hover:gap-3 transition-all p-0 font-semibold text-orange-600 hover:text-orange-700"
                >
                  Explore Now
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
