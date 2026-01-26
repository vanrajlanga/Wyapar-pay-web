'use client';

import { Smartphone, Star, Download, QrCode } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

export function AppDownloadSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-red-600 to-orange-600 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-white/30 shadow-lg">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold">Rated 4.8 on App Stores</span>
            </div>

            <h2 className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Download WyaparPay App
              <br />
              <span className="text-yellow-300">for Better Experience</span>
            </h2>

            <p className="text-xl text-white/95 mb-10 leading-relaxed max-w-xl">
              Get exclusive app-only offers, faster transactions, and manage
              everything on the go. Available on iOS and Android.
            </p>

            {/* Features */}
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-lg">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-base font-bold">Lightning Fast</div>
                  <div className="text-sm text-white/80">
                    Recharge in under 10 seconds
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-lg">
                  <Download className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-base font-bold">50M+ Downloads</div>
                  <div className="text-sm text-white/80">
                    Join millions of users
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </div>
                <div>
                  <div className="text-base font-bold">
                    Exclusive App Offers
                  </div>
                  <div className="text-sm text-white/80">
                    Get extra cashback & rewards
                  </div>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden"
              >
                <ImageWithFallback
                  src="/Get_on_iOS.jpg"
                  alt="Download on the App Store"
                  className="h-20 w-56 object-contain cursor-pointer"
                />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden"
              >
                <ImageWithFallback
                  src="/Get_On_Android.png"
                  alt="Get it on Google Play"
                  className="h-20 w-56 object-contain cursor-pointer"
                />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <QrCode className="h-12 w-12 text-white/80" />
              <div className="text-sm text-white/80">
                Scan QR code to download
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative lg:block hidden">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-[3rem] blur-2xl opacity-50"></div>
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1658480023495-dc8cae9e781e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMG1vYmlsZSUyMHBheW1lbnR8ZW58MXx8fHwxNzYyMDg5NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="WyaparPay App Preview"
                      className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
