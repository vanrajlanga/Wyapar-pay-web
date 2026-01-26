'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card, Input, Badge } from '@/components/ui';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { Header } from '@/components/layout/Header';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { ROUTES } from '@/constants';
import { userService } from '@/services/user.service';
import { transactionService } from '@/services/transaction.service';
import { logger } from '@/utils/logger';
import {
  MdPerson,
  MdEdit,
  MdCreditCard,
  MdNotifications,
  MdSecurity,
  MdHistory,
  MdEmail,
  MdPhone,
  MdCameraAlt,
  MdCheckCircle,
  MdVpnKey,
  MdShield,
} from 'react-icons/md';
import type { User, UserPreferences, Transaction } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, refreshUser } = useAuth();

  // Protect route
  const { isLoading: authLoading } = useAuthGuard({ redirectTo: ROUTES.LOGIN });

  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'transactions' | 'payments' | 'notifications' | 'security'
  >('profile');

  // Temporary state for editing
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    if (!authLoading) {
      loadProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const [profileData, preferencesData, transactionsData] =
        await Promise.all([
          userService.getProfile(),
          userService.getPreferences(),
          transactionService.getRecentTransactions(5),
        ]);
      setUser(profileData);
      setPreferences(preferencesData);
      setRecentTransactions(transactionsData);
      setEditedName(profileData.name);
      setEditedEmail(profileData.email);
      setEditedPhone(profileData.phone);
    } catch (error) {
      logger.error('Failed to load profile data', error, {
        userId: authUser?.id,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const updatedUser = await userService.updateProfile({
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
      });
      setUser(updatedUser);
      await refreshUser();
      setEditMode(false);
    } catch (error) {
      logger.error('Failed to update profile', error, { userId: user?.id });
    }
  };

  const handleToggleNotification = async (type: 'email' | 'sms' | 'push') => {
    if (!preferences) return;
    try {
      const updatedPreferences = await userService.updatePreferences({
        notifications: {
          ...preferences.notifications,
          [type]: !preferences.notifications[type],
        },
      });
      setPreferences(updatedPreferences);
    } catch (error) {
      logger.error('Failed to update preferences', error, {
        userId: user?.id,
        notificationType: type,
      });
    }
  };

  if (authLoading || loading) {
    return <LoadingScreen message="Loading your profile..." />;
  }

  if (!user) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(ROUTES.DASHBOARD)}
              className="text-gray-600 hover:text-orange-600 transition-colors flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Profile & Settings
            </h1>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                    <MdCameraAlt size={20} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-text-primary mb-1">
                  {user.name}
                </h2>
                <Badge variant="success" className="mb-4">
                  {user.kycStatus === 'approved' ? 'Premium' : 'Basic'}
                </Badge>

                <div className="w-full space-y-3 mt-4">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdPerson size={20} />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'transactions'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdHistory size={20} />
                    <span>Transaction History</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'payments'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdCreditCard size={20} />
                    <span>Payment Methods</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdNotifications size={20} />
                    <span>Notifications</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'security'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MdSecurity size={20} />
                    <span>Security</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-text-primary">
                    Profile Information
                  </h3>
                  {!editMode ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(true)}
                    >
                      <MdEdit className="mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditMode(false);
                          setEditedName(user.name);
                          setEditedEmail(user.email);
                          setEditedPhone(user.phone);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold"
                        size="sm"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Full Name
                    </label>
                    {editMode ? (
                      <Input
                        type="text"
                        value={editedName}
                        onChange={(value) => setEditedName(value)}
                      />
                    ) : (
                      <p className="text-text-primary font-medium">
                        {user.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                      <MdEmail size={16} />
                      Email Address
                    </label>
                    {editMode ? (
                      <Input
                        type="email"
                        value={editedEmail}
                        onChange={(value) => setEditedEmail(value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-text-primary font-medium">
                          {user.email}
                        </p>
                        {user.isEmailVerified && (
                          <MdCheckCircle
                            className="text-accent-success"
                            size={20}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                      <MdPhone size={16} />
                      Phone Number
                    </label>
                    {editMode ? (
                      <Input
                        type="tel"
                        value={editedPhone}
                        onChange={(value) => setEditedPhone(value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-text-primary font-medium">
                          {user.phone}
                        </p>
                        {user.isPhoneVerified && (
                          <MdCheckCircle
                            className="text-accent-success"
                            size={20}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Account Status
                    </label>
                    <Badge
                      variant={user.status === 'active' ? 'success' : 'warning'}
                    >
                      {user.status}
                    </Badge>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      KYC Status
                    </label>
                    <Badge
                      variant={
                        user.kycStatus === 'approved'
                          ? 'success'
                          : user.kycStatus === 'rejected'
                            ? 'error'
                            : 'warning'
                      }
                    >
                      {user.kycStatus}
                    </Badge>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Member Since
                    </label>
                    <p className="text-text-primary font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Transaction History Tab */}
            {activeTab === 'transactions' && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Transaction History
                </h3>

                {recentTransactions.length > 0 ? (
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-background-hover transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-orange-100 rounded-lg">
                            <MdHistory size={24} className="text-orange-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {new Date(transaction.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-text-primary text-lg">
                            ₹{transaction.amount}
                          </p>
                          <Badge
                            variant={
                              transaction.status === 'success'
                                ? 'success'
                                : transaction.status === 'failed'
                                  ? 'error'
                                  : 'warning'
                            }
                            size="sm"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MdHistory
                      size={64}
                      className="text-text-tertiary mx-auto mb-4"
                    />
                    <p className="text-text-secondary">No transactions yet</p>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => router.push(ROUTES.TRANSACTIONS)}
                  >
                    View All Transactions
                  </Button>
                </div>
              </Card>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payments' && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Payment Methods
                </h3>

                <div className="space-y-4">
                  {/* UPI */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <MdCreditCard size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">UPI</p>
                        <p className="text-sm text-text-secondary">
                          Linked UPI accounts
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  {/* Cards */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <MdCreditCard size={24} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">
                          Debit/Credit Cards
                        </p>
                        <p className="text-sm text-text-secondary">
                          Saved cards
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Card
                    </Button>
                  </div>

                  {/* Net Banking */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <MdCreditCard size={24} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">
                          Net Banking
                        </p>
                        <p className="text-sm text-text-secondary">
                          Linked bank accounts
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Bank
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && preferences && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MdEmail size={24} className="text-orange-600" />
                      <div>
                        <p className="font-semibold text-text-primary">
                          Email Notifications
                        </p>
                        <p className="text-sm text-text-secondary">
                          Receive updates via email
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notifications.email
                          ? 'bg-gradient-to-r from-orange-500 to-red-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.notifications.email
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MdPhone size={24} className="text-secondary" />
                      <div>
                        <p className="font-semibold text-text-primary">
                          SMS Notifications
                        </p>
                        <p className="text-sm text-text-secondary">
                          Receive updates via SMS
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('sms')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notifications.sms
                          ? 'bg-gradient-to-r from-orange-500 to-red-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.notifications.sms
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MdNotifications size={24} className="text-accent" />
                      <div>
                        <p className="font-semibold text-text-primary">
                          Push Notifications
                        </p>
                        <p className="text-sm text-text-secondary">
                          Receive app notifications
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleNotification('push')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notifications.push
                          ? 'bg-gradient-to-r from-orange-500 to-red-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.notifications.push
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <MdVpnKey size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">
                          Change Password
                        </p>
                        <p className="text-sm text-text-secondary">
                          Update your account password
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <MdShield size={24} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-text-secondary">
                          Add an extra layer of security
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="p-4 bg-background rounded-lg border-l-4 border-accent-success">
                    <div className="flex items-start gap-3">
                      <MdCheckCircle
                        className="text-accent-success mt-1"
                        size={20}
                      />
                      <div>
                        <p className="font-semibold text-text-primary mb-1">
                          Your account is secure
                        </p>
                        <p className="text-sm text-text-secondary">
                          Last login:{' '}
                          {user.lastLoginAt
                            ? new Date(user.lastLoginAt).toLocaleString()
                            : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
