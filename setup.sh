#!/bin/bash

# WyaparPay Website Setup Script
# This script helps you get started with the website

echo "🚀 Setting up WyaparPay Website..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_API_TIMEOUT=30000

# Environment
NEXT_PUBLIC_ENV=development

# App Configuration
NEXT_PUBLIC_APP_NAME=WyaparPay
NEXT_PUBLIC_APP_VERSION=1.0.0
EOF
    echo "✅ .env.local created!"
else
    echo "ℹ️  .env.local already exists, skipping..."
fi

echo ""
echo "✨ Setup complete! ✨"
echo ""
echo "📋 Next steps:"
echo "  1. Make sure your backend API is running on http://localhost:3000"
echo "  2. Update .env.local if your API URL is different"
echo "  3. Run 'npm run dev' to start the development server (port 3001)"
echo "  4. Open http://localhost:3001 in your browser"
echo ""
echo "⚠️  Port Configuration:"
echo "  - Backend API: http://localhost:3000"
echo "  - Website: http://localhost:3001"
echo ""
echo "📚 For more information, check the README.md file"
echo ""

