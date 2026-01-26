'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { Select, SelectItem } from '@/components/ui';
import { Button } from '@/components/ui';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { ROUTES } from '@/constants';
import {
  Smartphone,
  Tv,
  Zap,
  CreditCard,
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-8 pb-16 md:pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-5 py-2.5 rounded-full mb-6 shadow-sm border border-purple-200/50">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">
                India&apos;s Most Trusted Payment Platform
              </span>
            </div>
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Pay, Recharge
              </span>
              <br />
              <span className="text-gray-900">& Manage Bills</span>
              <br />
              <span className="text-gray-700">in One Place</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              Experience seamless payments with instant cashbacks, exclusive
              offers, and secure transactions. Join millions of happy users.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg transition-shadow">
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1 font-extrabold">
                  50M+
                </div>
                <div className="text-sm text-gray-600 font-medium">Active Users</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg transition-shadow">
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-1 font-extrabold">
                  ₹100Cr+
                </div>
                <div className="text-sm text-gray-600 font-medium">Cashback Given</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg transition-shadow">
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1 font-extrabold">
                  99.9%
                </div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push(ROUTES.REGISTER)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-xl hover:shadow-2xl font-semibold px-8 py-6 text-base transition-all hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(ROUTES.LOGIN)}
                className="border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 px-8 py-6 text-base font-semibold transition-all hover:scale-105"
              >
                Download App
              </Button>
            </div>
          </div>

          {/* Right Content - Quick Action Card */}
          <div className="max-w-md mx-auto lg:mx-0 lg:ml-auto lg:mr-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Quick Recharge</h3>
            </div>
            <Tabs defaultValue="mobile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger
                  value="mobile"
                  className="flex flex-col gap-1 py-3"
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="text-xs">Mobile</span>
                </TabsTrigger>
                <TabsTrigger value="dth" className="flex flex-col gap-1 py-3">
                  <Tv className="h-4 w-4" />
                  <span className="text-xs">DTH</span>
                </TabsTrigger>
                <TabsTrigger
                  value="electricity"
                  className="flex flex-col gap-1 py-3"
                >
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">Electricity</span>
                </TabsTrigger>
                <TabsTrigger value="card" className="flex flex-col gap-1 py-3">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs">Card</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mobile" className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="mobile"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="Enter 10 digit mobile number"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="operator"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Operator
                  </label>
                  <Select placeholder="Choose operator">
                    <SelectItem value="jio">Jio</SelectItem>
                    <SelectItem value="airtel">Airtel</SelectItem>
                    <SelectItem value="vi">Vi</SelectItem>
                    <SelectItem value="bsnl">BSNL</SelectItem>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base min-h-[44px]"
                  />
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-4 rounded-xl text-sm font-semibold border border-green-200 shadow-sm">
                  🎉 Get 5% cashback on your first recharge!
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl font-semibold py-6 transition-all hover:scale-[1.02]">
                  Proceed to Recharge
                </Button>
              </TabsContent>

              <TabsContent value="dth" className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="dth-id"
                    className="text-sm font-medium text-gray-700"
                  >
                    Subscriber ID
                  </label>
                  <input
                    id="dth-id"
                    placeholder="Enter subscriber ID"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="dth-operator"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Operator
                  </label>
                  <Select placeholder="Choose operator">
                    <SelectItem value="tatasky">Tata Play</SelectItem>
                    <SelectItem value="airtel">Airtel Digital TV</SelectItem>
                    <SelectItem value="dish">Dish TV</SelectItem>
                    <SelectItem value="sun">Sun Direct</SelectItem>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="dth-amount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <input
                    id="dth-amount"
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md font-semibold">
                  Proceed to Recharge
                </Button>
              </TabsContent>

              <TabsContent value="electricity" className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="consumer"
                    className="text-sm font-medium text-gray-700"
                  >
                    Consumer Number
                  </label>
                  <input
                    id="consumer"
                    placeholder="Enter consumer number"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="board"
                    className="text-sm font-medium text-gray-700"
                  >
                    Electricity Board
                  </label>
                  <Select placeholder="Select board">
                    <SelectItem value="adani">Adani Electricity</SelectItem>
                    <SelectItem value="tata">Tata Power</SelectItem>
                    <SelectItem value="bses">BSES</SelectItem>
                    <SelectItem value="mseb">MSEB</SelectItem>
                  </Select>
                </div>
                <Button variant="outline" className="w-full">
                  Fetch Bill
                </Button>
              </TabsContent>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="card-number"
                    className="text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    placeholder="Enter last 4 digits"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="bank"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Bank
                  </label>
                  <Select placeholder="Choose bank">
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="sbi">SBI Card</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                  </Select>
                </div>
                <Button variant="outline" className="w-full">
                  Fetch Bill
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
