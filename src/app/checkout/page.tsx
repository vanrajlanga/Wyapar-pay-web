'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import {
  Lock,
  Shield,
  CheckCircle,
  Info,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRecharge } from '@/contexts/RechargeContext';
import { paymentService } from '@/services/payment.service';
import { rechargeService } from '@/services/recharge.service';

export default function CheckoutPage() {
  const router = useRouter();
  const rechargeContext = useRecharge();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rechargeDetails, setRechargeDetails] = useState<{
    mobileNumber: string;
    operator: string;
    circle: string;
    amount: number;
    operatorId: string;
  } | null>(null);

  useEffect(() => {
    // Initialize Razorpay
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (razorpayKey) {
      paymentService.setRazorpayKey(razorpayKey);
    }

    // Get recharge details from context or sessionStorage
    const storedMobileNumber = sessionStorage.getItem('recharge_mobile_number');
    const storedOperator = sessionStorage.getItem('recharge_operator');
    const storedOperatorId = sessionStorage.getItem('recharge_operator_id');
    const storedCircle = sessionStorage.getItem('recharge_circle_name');
    const storedAmount = sessionStorage.getItem('recharge_amount');

    if (storedMobileNumber && storedOperator && storedOperatorId && storedAmount) {
      setRechargeDetails({
        mobileNumber: storedMobileNumber,
        operator: storedOperator,
        circle: storedCircle || 'India',
        amount: parseFloat(storedAmount),
        operatorId: storedOperatorId,
      });
    } else if (
      rechargeContext.mobileNumber &&
      rechargeContext.operatorId &&
      rechargeContext.amount > 0
    ) {
      setRechargeDetails({
        mobileNumber: rechargeContext.mobileNumber,
        operator: rechargeContext.selectedOperator?.name || 'Unknown',
        circle: rechargeContext.circleName || 'India',
        amount: rechargeContext.amount,
        operatorId: rechargeContext.operatorId,
      });
    } else {
      // No recharge details, redirect to recharge page
      router.push('/recharge');
    }
  }, [rechargeContext, router]);

  const handlePayment = async () => {
    if (!agreeToTerms) {
      alert('Please accept the Terms & Conditions to proceed');
      return;
    }

    if (!rechargeDetails) {
      alert('Recharge details not found. Please start again.');
      router.push('/recharge');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Initiate Razorpay payment
      await paymentService.initiatePayment({
        amount: rechargeDetails.amount, // Backend will convert to paise
        currency: 'INR',
        notes: {
          mobile_number: rechargeDetails.mobileNumber,
          operator: rechargeDetails.operator,
          operator_id: rechargeDetails.operatorId,
        },
        prefill: {
          contact: rechargeDetails.mobileNumber,
        },
        onSuccess: async (response) => {
          console.log('Payment successful:', response);

          try {
            // Step 2: Verify payment with backend
            const verifyResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log('Payment verified:', verifyResponse);

            if (!verifyResponse.success) {
              throw new Error('Payment verification failed');
            }

            // Step 3: Process KWIKAPI recharge
            console.log('Processing KWIKAPI recharge...');
            const rechargeResult = await rechargeService.completeRecharge({
              mobileNumber: rechargeDetails.mobileNumber,
              amount: rechargeDetails.amount,
              operatorId: rechargeDetails.operatorId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            });

            console.log('Recharge result:', rechargeResult);

            // Store result in sessionStorage for status page
            sessionStorage.setItem('recharge_status', rechargeResult.status);
            sessionStorage.setItem(
              'recharge_result',
              JSON.stringify(rechargeResult)
            );

            // Redirect to status page
            if (rechargeResult.success) {
              router.push('/recharge/status?status=success');
            } else if (rechargeResult.status === 'TIMEOUT') {
              router.push('/recharge/status?status=pending');
            } else {
              router.push('/recharge/status?status=failed');
            }
          } catch (error: any) {
            console.error('Post-payment processing failed:', error);
            alert(
              `Payment successful but recharge processing failed: ${error.message}. Please contact support with your payment ID: ${response.razorpay_payment_id}`
            );
            setLoading(false);
          }
        },
        onDismiss: () => {
          console.log('Payment dismissed by user');
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      alert(`Payment failed: ${error.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  if (!rechargeDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const orderSummary = {
    items: [
      {
        name: `Mobile Recharge - ${rechargeDetails.operator}`,
        amount: rechargeDetails.amount,
      },
      { name: 'Service Fee', amount: 0 },
    ],
    subtotal: rechargeDetails.amount,
    discount: 0,
    total: rechargeDetails.amount,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Security Notice */}
              <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Secure Payment
                    </h3>
                    <p className="text-sm text-gray-700">
                      Your payment information is encrypted and secure. We use
                      industry-standard SSL encryption and PCI-DSS compliant
                      payment processing via Razorpay. We never store your
                      complete card details.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Recharge Details */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Recharge Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Mobile Number</span>
                    <span className="font-semibold">
                      {rechargeDetails.mobileNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Operator</span>
                    <span className="font-semibold">
                      {rechargeDetails.operator}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Circle</span>
                    <span className="font-semibold">{rechargeDetails.circle}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-semibold text-xl text-orange-600">
                      ₹{rechargeDetails.amount}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                <p className="text-gray-600 mb-4">
                  Click the button below to pay securely via Razorpay. You can
                  choose from multiple payment options including Credit/Debit
                  Card, UPI, Net Banking, and more.
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span className="text-sm text-gray-700">
                      Powered by Razorpay - India&apos;s most trusted payment gateway
                    </span>
                  </div>
                </div>
              </Card>

              {/* Terms & Conditions */}
              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 min-w-[20px] min-h-[20px]"
                  />
                  <label
                    htmlFor="agree-terms"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    I agree to the{' '}
                    <a
                      href="/terms-of-service"
                      className="text-orange-600 hover:underline"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy-policy"
                      className="text-orange-600 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    . I understand that this transaction is subject to RBI
                    guidelines and WyaparPay&apos;s refund policy.
                  </label>
                </div>
              </Card>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={!agreeToTerms || loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-6"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Pay Securely ₹{orderSummary.total}
                  </span>
                )}
              </Button>

              {/* Security Features */}
              <Card className="p-6 bg-gray-50">
                <h3 className="font-semibold mb-4">Security Features</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>PCI-DSS Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>RBI Approved Payment Gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>No Card Details Stored</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 my-6">
                  {orderSummary.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium">₹{item.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{orderSummary.subtotal}</span>
                  </div>
                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{orderSummary.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{orderSummary.total}</span>
                  </div>
                </div>

                {/* Important Information */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2 mb-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h4 className="font-semibold text-sm text-gray-900">
                      Payment Terms
                    </h4>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-1 ml-7">
                    <li>• Payment processed through Razorpay</li>
                    <li>• Refunds processed as per our Refund Policy</li>
                    <li>• Transaction subject to RBI guidelines</li>
                    <li>• Read Terms & Conditions before payment</li>
                  </ul>
                </div>

                {/* Support */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-2">Need Help?</p>
                  <a
                    href="/contact-us"
                    className="text-sm text-orange-600 hover:underline block"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/faqs"
                    className="text-sm text-orange-600 hover:underline block mt-1"
                  >
                    View FAQs
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
