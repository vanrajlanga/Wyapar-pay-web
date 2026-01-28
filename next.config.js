/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [
    /middleware-manifest\.json$/,
    /app-build-manifest\.json$/,
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
  ],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Output standalone server for easier deployment
  output: 'standalone',

  // Output configuration for AWS Amplify
  // Amplify auto-detects Next.js and handles SSR/SSG
  // IMPORTANT: Do NOT use output: 'export' - it disables SSR and API routes
  // This ensures full support for:
  // - Server-side rendering (SSR)
  // - API routes (/app/api/*)
  // - Server-side functions
  // - Dynamic rendering
  // - Payment gateway integrations
  // - Email sending from server
  // - Backend API triggers
  
  // Ensure trailing slash is handled correctly for Amplify
  trailingSlash: false,
  
  // Increase static page generation timeout (default is 60s)
  // Important for pages that fetch data from APIs
  staticPageGenerationTimeout: 120,
  
  // ESLint configuration - ignore during builds to prevent warnings from failing deployment
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors/warnings. Only use this if you understand the risks.
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration - ignore during builds
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors. Only use this if you understand the risks.
    ignoreBuildErrors: false, // Keep this false to catch type errors
  },
  
  // Development optimizations for hot reloading
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config, { dev, isServer }) => {
      // Enable hot module replacement
      if (dev && !isServer) {
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 300,
          ignored: /node_modules/,
        };
      }
      
      return config;
    },
    
    // Faster refresh
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wyaparpay-profile-images.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  
  // Note: Rewrites don't work on AWS Amplify for API proxying
  // API calls should use NEXT_PUBLIC_API_URL directly
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/:path*',
  //     },
  //   ];
  // },
};

module.exports = withPWA(nextConfig);

