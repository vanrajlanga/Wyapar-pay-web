'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { useForm } from '@/hooks/useForm';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import {
  MdEmail,
  MdLock,
  MdPhone,
  MdSecurity,
  MdVerifiedUser,
  MdFlashOn,
  MdArrowForward,
} from 'react-icons/md';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  // Redirect to dashboard if already authenticated
  useAuthGuard({ redirectTo: ROUTES.DASHBOARD, requireAuth: false });

  const { values, errors, handleChange, handleSubmit, loading, clearError } =
    useForm({
      initialValues: {
        identifier: '',
        password: '',
      },
      validate: (values) => {
        const errors: Record<string, string> = {};
        if (!values.identifier)
          errors.identifier = 'Email or phone is required';
        if (!values.password) errors.password = 'Password is required';
        return errors;
      },
      onSubmit: async (values) => {
        await login(values);
        router.push(ROUTES.DASHBOARD);
      },
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              {/* Welcome Section */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome Back! 👋
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Sign in to continue your seamless payment experience
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MdFlashOn size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Instant Payments
                    </h3>
                    <p className="text-gray-600">
                      Recharge & pay bills in seconds
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MdSecurity size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Secure Transactions
                    </h3>
                    <p className="text-gray-600">
                      Protected with bank-grade encryption
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MdVerifiedUser size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Trusted Platform
                    </h3>
                    <p className="text-gray-600">10M+ satisfied customers</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">50M+</div>
                  <p className="text-sm text-gray-600 mt-1">Transactions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">99.9%</div>
                  <p className="text-sm text-gray-600 mt-1">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    ₹500Cr+
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Processed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-xl shadow-lg border p-8">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MdLock size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <ErrorAlert
                    message={errors.general}
                    onClose={() => clearError('general')}
                  />
                )}

                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdEmail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="identifier"
                      type="text"
                      inputMode="text"
                      autoComplete="username"
                      placeholder="Enter your email or phone"
                      value={values.identifier}
                      onChange={(e) =>
                        handleChange('identifier', e.target.value)
                      }
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base min-h-[44px] ${
                        errors.identifier ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.identifier && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.identifier}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      inputMode="text"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base min-h-[44px] ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg font-semibold"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                  <MdArrowForward className="ml-2" size={20} />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* OTP Login */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push(ROUTES.OTP_LOGIN)}
                className="w-full border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <MdPhone size={20} className="mr-2" />
                Login with OTP
              </Button>

              {/* Sign Up Link */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    New to WyaparPay?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href={ROUTES.REGISTER}
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Create Account
                  <MdArrowForward size={20} />
                </Link>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link
                href={ROUTES.HOME}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
