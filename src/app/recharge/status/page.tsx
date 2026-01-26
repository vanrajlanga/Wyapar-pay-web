'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
} from 'lucide-react';

export default function RechargeStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status'); // success | failed | pending

  const [rechargeResult, setRechargeResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get recharge result from sessionStorage
    const storedResult = sessionStorage.getItem('recharge_result');
    if (storedResult) {
      setRechargeResult(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  const handleNewRecharge = () => {
    // Clear recharge data
    sessionStorage.removeItem('recharge_status');
    sessionStorage.removeItem('recharge_result');
    sessionStorage.removeItem('recharge_mobile_number');
    sessionStorage.removeItem('recharge_operator');
    sessionStorage.removeItem('recharge_operator_id');
    sessionStorage.removeItem('recharge_circle_name');
    sessionStorage.removeItem('recharge_amount');

    router.push('/recharge');
  };

  const handleViewHistory = () => {
    router.push('/recharge/history');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Status */}
          {status === 'success' && (
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Recharge Successful!
                </h1>
                <p className="text-gray-600">
                  Your mobile recharge has been completed successfully
                </p>
              </div>

              {rechargeResult?.data && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Transaction Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Mobile Number</span>
                      <span className="font-semibold">
                        {rechargeResult.data.number}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-green-600">
                        ₹{rechargeResult.data.amount}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Operator Reference</span>
                      <span className="font-medium text-sm">
                        {rechargeResult.data.operator_ref}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Order ID</span>
                      <span className="font-medium text-sm">
                        {rechargeResult.data.order_id}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Date & Time</span>
                      <span className="font-medium">
                        {rechargeResult.data.date}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleNewRecharge}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  New Recharge
                </Button>
                <Button
                  onClick={handleViewHistory}
                  variant="outline"
                  className="border-gray-300"
                >
                  <Download className="h-5 w-5 mr-2" />
                  View History
                </Button>
              </div>
            </Card>
          )}

          {/* Failed Status */}
          {status === 'failed' && (
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Recharge Failed
                </h1>
                <p className="text-gray-600 mb-4">
                  {rechargeResult?.message ||
                    'Unfortunately, your recharge could not be completed'}
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    If your payment was deducted, it will be refunded to your
                    account within 5-7 business days.
                  </p>
                </div>
              </div>

              {rechargeResult?.data && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Transaction Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Mobile Number</span>
                      <span className="font-semibold">
                        {rechargeResult.data.number}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold">
                        ₹{rechargeResult.data.amount}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Order ID</span>
                      <span className="font-medium text-sm">
                        {rechargeResult.data.order_id}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleNewRecharge}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={() => router.push('/contact-us')}
                  variant="outline"
                  className="border-gray-300"
                >
                  Contact Support
                </Button>
              </div>
            </Card>
          )}

          {/* Pending Status */}
          {status === 'pending' && (
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-12 w-12 text-yellow-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Recharge Pending
                </h1>
                <p className="text-gray-600 mb-4">
                  Your recharge is being processed. This may take a few minutes.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    Please check your recharge history in a few minutes, or you
                    will receive an SMS confirmation once the recharge is
                    complete.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleViewHistory}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  <Download className="h-5 w-5 mr-2" />
                  View History
                </Button>
                <Button
                  onClick={handleNewRecharge}
                  variant="outline"
                  className="border-gray-300"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  New Recharge
                </Button>
              </div>
            </Card>
          )}

          {/* No Status */}
          {!status && (
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-12 w-12 text-gray-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  No Status Found
                </h1>
                <p className="text-gray-600">
                  Unable to find recharge status. Please try again.
                </p>
              </div>

              <Button
                onClick={handleNewRecharge}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Start New Recharge
              </Button>
            </Card>
          )}

          {/* Support Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">Need assistance?</p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact-us"
                className="text-sm text-orange-600 hover:underline"
              >
                Contact Support
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="/faqs"
                className="text-sm text-orange-600 hover:underline"
              >
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
