'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';

// Official X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    Services: [
      { name: 'Mobile Recharge', href: '/services/mobile-recharge' },
      { name: 'Bill Payments', href: '/services/bill-payments' },
      { name: 'Loans', href: '/services/loans' },
      { name: 'FASTag', href: '/services/fastag' },
    ],
    Support: [
      { name: 'Help Center', href: '/help-center' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Security', href: '/security' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Grievance', href: '/grievance' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-auto flex items-center flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="WyaparPay"
                  width={180}
                  height={50}
                  className="h-12 w-auto object-contain max-w-[180px]"
                  priority={false}
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.src = '/wyaparpay-icon.png';
                    e.currentTarget.className = 'h-12 w-auto object-contain max-w-[180px]';
                  }}
                />
              </div>
            </div>
            <p className="text-sm mb-4 text-gray-400 leading-relaxed">
              Your trusted digital payment platform for recharges, bill
              payments, and financial services.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@wyaparpay.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91-7795445566</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white mb-3 text-sm font-semibold">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-white mb-2 font-semibold">
              Subscribe to our newsletter
            </h4>
            <p className="text-sm mb-4">
              Get the latest offers and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">© 2025 WyaparPay. All rights reserved.</div>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/wyaparpay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white transition-all hover:scale-110 hover:shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/wyaparpay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gradient-to-br from-[#E4405F] via-[#FCAF45] to-[#833AB4] hover:from-[#D32A4A] hover:via-[#E89F35] hover:to-[#722A9F] text-white transition-all hover:scale-110 hover:shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/wyaparpay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-black hover:bg-gray-900 text-white transition-all hover:scale-110 hover:shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="X (formerly Twitter)"
            >
              <XIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.threads.com/@wyaparpay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-black hover:bg-gray-900 transition-all hover:scale-110 hover:shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Threads"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Threads_logo.jpeg"
                alt="Threads"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/wyaparpay/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#0077B5] hover:bg-[#006399] transition-all hover:scale-110 hover:shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/LinkedIn_Logo.jpeg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
