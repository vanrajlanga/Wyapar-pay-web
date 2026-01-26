'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { useForm } from '@/hooks/useForm';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/landing/Footer';
import { ROUTES, VALIDATION } from '@/constants';
import Link from 'next/link';
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdCheckCircle,
  MdSecurity,
  MdSpeed,
  MdArrowForward,
} from 'react-icons/md';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  // Redirect to dashboard if already authenticated
  useAuthGuard({ redirectTo: ROUTES.DASHBOARD, requireAuth: false });

  const { values, errors, handleChange, handleSubmit, loading, clearError } =
    useForm({
      initialValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
      validate: (values) => {
        const errors: Record<string, string> = {};

        if (!values.name.trim()) errors.name = 'Name is required';

        if (!values.email.trim()) {
          errors.email = 'Email is required';
        } else if (!VALIDATION.EMAIL_REGEX.test(values.email)) {
          errors.email = 'Invalid email format';
        }

        if (!values.phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!VALIDATION.PHONE_REGEX.test(values.phone)) {
          errors.phone = 'Invalid phone number (10 digits starting with 6-9)';
        }

        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
          errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
        }

        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
      },
      onSubmit: async (values) => {
        await register({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });
        router.push(`${ROUTES.EMAIL_VERIFY}?email=${values.email}`);
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
                  Start Your Digital Payment Journey
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Join millions who trust WyaparPay for secure, instant payments
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MdSpeed size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Instant Transactions
                    </h3>
                    <p className="text-gray-600">
                      Lightning-fast payments and recharges in seconds
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MdSecurity size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Bank-Grade Security
                    </h3>
                    <p className="text-gray-600">
                      Your data is protected with end-to-end encryption
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MdCheckCircle size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      100% Verified
                    </h3>
                    <p className="text-gray-600">
                      Trusted by 10M+ users across India
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">10M+</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">99.9%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-xl shadow-lg border p-8">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MdPerson size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Fill in your details to get started
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.general && (
                  <ErrorAlert
                    message={errors.general}
                    onClose={() => clearError('general')}
                  />
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdPerson className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdEmail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={values.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                      placeholder="Create a password"
                      value={values.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={values.confirmPassword}
                      onChange={(e) =>
                        handleChange('confirmPassword', e.target.value)
                      }
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.confirmPassword
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MdCheckCircle
                    className="text-orange-600 flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  <p>
                    By signing up, you agree to our{' '}
                    <Link
                      href="/terms"
                      className="text-orange-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      className="text-orange-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg font-semibold"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
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
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <Link
                  href={ROUTES.LOGIN}
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Sign In
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
