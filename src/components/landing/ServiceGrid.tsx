'use client';

import { Card } from '@/components/ui';
import {
  Smartphone,
  Tv,
  Zap,
  Flame,
  Droplet,
  Wifi,
  Phone,
  CreditCard,
  Car,
  GraduationCap,
  Home,
  Shield,
  Briefcase,
} from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    name: 'Mobile Prepaid',
    color: 'from-blue-500 to-blue-600',
    popular: true,
  },
  {
    icon: Phone,
    name: 'Mobile Postpaid',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Tv,
    name: 'DTH Recharge',
    color: 'from-pink-500 to-pink-600',
    popular: true,
  },
  { icon: Zap, name: 'Electricity', color: 'from-yellow-500 to-yellow-600' },
  { icon: Flame, name: 'Gas Cylinder', color: 'from-orange-500 to-orange-600' },
  { icon: Droplet, name: 'Water Bill', color: 'from-cyan-500 to-cyan-600' },
  { icon: Wifi, name: 'Broadband', color: 'from-indigo-500 to-indigo-600' },
  {
    icon: CreditCard,
    name: 'Credit Card',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Car,
    name: 'FASTag',
    color: 'from-blue-500 to-cyan-600',
    popular: true,
  },
  {
    icon: GraduationCap,
    name: 'Education Fee',
    color: 'from-purple-500 to-pink-600',
  },
  { icon: Home, name: 'Rent Payment', color: 'from-red-500 to-red-600' },
  { icon: Shield, name: 'Insurance', color: 'from-teal-500 to-teal-600' },
];

const financialServices = [
  {
    icon: Briefcase,
    name: 'Personal Loan',
    color: 'from-green-500 to-emerald-600',
    offer: 'Up to ₹5 Lakh',
  },
  {
    icon: Home,
    name: 'Home Loan',
    color: 'from-blue-500 to-blue-600',
    offer: 'Low Interest',
  },
  {
    icon: CreditCard,
    name: 'Credit Card',
    color: 'from-purple-500 to-purple-600',
    offer: 'Instant Approval',
  },
  {
    icon: GraduationCap,
    name: 'Education Loan',
    color: 'from-orange-500 to-orange-600',
    offer: 'Easy EMI',
  },
];

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  name: string;
  color: string;
  popular?: boolean;
  offer?: string;
}

function ServiceCard({
  icon: Icon,
  name,
  color,
  popular,
  offer,
}: ServiceCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 rounded-xl bg-white">
      <div className="p-6 flex flex-col items-center text-center gap-3">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <span className="text-sm text-gray-800 font-semibold">{name}</span>
        {popular && (
          <span className="absolute top-2 right-2 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2.5 py-1 rounded-full shadow-md">
            Popular
          </span>
        )}
        {offer && (
          <span className="text-xs font-semibold text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full border border-green-200">
            {offer}
          </span>
        )}
      </div>
    </Card>
  );
}

export function ServiceGrid() {
  return (
    <div className="space-y-16">
      {/* Main Services */}
      <section id="recharge">
        <div className="text-center mb-10">
          <h2 className="mb-3 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Recharge & Bill Payments
          </h2>
          <p className="text-gray-600 text-lg">Quick and easy payments for all your needs</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </section>

      {/* Financial Services */}
      <section id="financial">
        <div className="text-center mb-10">
          <h2 className="mb-3 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Financial Services & Loans
          </h2>
          <p className="text-gray-600 text-lg">Unlock financial freedom with our loan solutions</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {financialServices.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}
