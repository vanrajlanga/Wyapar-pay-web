'use client';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { CategoryBanner } from '@/components/landing/CategoryBanner';
import { ServiceGrid } from '@/components/landing/ServiceGrid';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { OffersCarousel } from '@/components/landing/OffersCarousel';
import { Footer } from '@/components/landing/Footer';
import { AppDownloadSection } from '@/components/landing/AppDownloadSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />

        <CategoryBanner />

        <div className="container mx-auto px-4 py-12">
          <ServiceGrid />
        </div>

        <OffersCarousel />

        <FeaturesSection />

        <AppDownloadSection />

        <Footer />
      </main>
    </div>
  );
}
