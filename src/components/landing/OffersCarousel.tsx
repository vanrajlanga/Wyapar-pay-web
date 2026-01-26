'use client';

import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';
import { Gift, Percent, ArrowRight, Tag } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

const offers = [
  {
    id: 1,
    title: 'Get ₹100 Cashback',
    description: 'On first mobile recharge of ₹500 or more',
    code: 'MOBILE100',
    validity: 'Valid till 30 Nov 2025',
    discount: '20% OFF',
    image:
      'https://images.unsplash.com/photo-1583964970061-1b98019f2376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
  {
    id: 2,
    title: 'Flat ₹50 OFF',
    description: 'On electricity bill payment above ₹1000',
    code: 'POWER50',
    validity: 'Valid till 15 Nov 2025',
    discount: '₹50 OFF',
    image:
      'https://images.unsplash.com/photo-1571867424488-4565932edb41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
  {
    id: 3,
    title: 'DTH Mega Offer',
    description: 'Get 10% cashback on DTH recharge',
    code: 'DTH10',
    validity: 'Valid till 25 Nov 2025',
    discount: '10% Cashback',
    image:
      'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
  {
    id: 4,
    title: 'FASTag Bonus',
    description: 'Get ₹75 cashback on FASTag recharge',
    code: 'FASTAG75',
    validity: 'Valid till 10 Nov 2025',
    discount: '₹75 Cashback',
    image:
      'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=600',
  },
];

export function OffersCarousel() {
  return (
    <section
      id="offers"
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Exclusive Offers & Cashback
            </h2>
          </div>
          <Button variant="ghost" className="text-purple-600 hover:text-purple-700 font-semibold text-base hover:bg-purple-50">
            View All <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 rounded-2xl bg-white"
            >
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  fill
                />
                <div className="absolute top-3 right-3 z-10">
                  <Badge
                    variant="default"
                    className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400 shadow-lg"
                  >
                    <Percent className="h-3 w-3 mr-1" />
                    {offer.discount}
                  </Badge>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
                <h3 className="mb-3 text-xl font-bold text-gray-900">{offer.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {offer.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-lg text-sm border border-gray-200">
                    <Tag className="h-4 w-4 text-purple-600" />
                    <code className="text-xs font-mono font-semibold text-gray-800">{offer.code}</code>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4 font-medium">{offer.validity}</p>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl font-semibold py-6 transition-all hover:scale-[1.02]"
                >
                  Use Offer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
