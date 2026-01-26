'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { Menu, User, Gift, Bell } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Recharge & Bills', href: '#recharge' },
    { name: 'Financial Services', href: '#financial' },
    { name: 'Offers', href: '#offers' },
    { name: 'Refer & Earn', href: '#refer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If href is a hash anchor
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If we're not on the homepage, navigate there first
      if (pathname !== ROUTES.HOME) {
        router.push(`${ROUTES.HOME}${href}`);
        // Scroll to anchor after navigation (wait for page to load)
        setTimeout(() => {
          scrollToAnchor(href);
        }, 300);
      } else {
        // We're already on homepage, just scroll
        scrollToAnchor(href);
      }
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const scrollToAnchor = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      // Account for sticky header height (64px = h-16)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push(ROUTES.HOME)}
          >
            <div className="relative h-8 w-auto flex items-center">
              <Image
                src="/logo.png"
                alt="WyaparPay Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain max-w-[140px]"
                priority
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = '/wyaparpay-icon.png';
                }}
              />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              WyaparPay
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-700 hover:text-orange-600 transition-colors text-sm font-medium cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button className="relative hidden sm:flex p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hidden sm:flex p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <Gift className="h-5 w-5" />
            </button>
            {isAuthenticated ? (
              <Button
                onClick={() => router.push(ROUTES.DASHBOARD)}
                className="hidden sm:flex bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md font-semibold"
              >
                Dashboard
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => router.push(ROUTES.LOGIN)}
                className="hidden sm:flex"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
            role="button"
            aria-label="Close menu"
          />
          <div 
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-lg p-6 overflow-y-auto"
            style={{
              paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
              paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
            }}
          >
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lg py-3 px-4 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors min-h-[44px] flex items-center cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
              <Button
                onClick={() => {
                  router.push(ROUTES.LOGIN);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 w-full"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
