#!/usr/bin/env node

/**
 * Post-Build Script for Next.js Standalone Deployment
 *
 * This script runs after `next build` and prepares the standalone
 * build for deployment by copying static assets to the correct locations.
 *
 * What it does:
 * 1. Copies .next/static to .next/standalone/.next/static
 * 2. Copies public/* to .next/standalone/public/*
 *
 * This ensures all assets are self-contained in the standalone folder.
 */

const fs = require('fs');
const path = require('path');

console.log('\n📦 Running post-build script...\n');

// Paths
const rootDir = path.join(__dirname, '..');
const staticSource = path.join(rootDir, '.next', 'static');
const staticDest = path.join(rootDir, '.next', 'standalone', '.next', 'static');
const publicSource = path.join(rootDir, 'public');
const publicDest = path.join(rootDir, '.next', 'standalone', 'public');

/**
 * Recursively copy directory
 */
function copyDir(src, dest) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Step 1: Copy static files
  console.log('📁 Copying .next/static to standalone...');
  if (fs.existsSync(staticSource)) {
    copyDir(staticSource, staticDest);
    console.log('   ✅ Static files copied');
  } else {
    console.warn('   ⚠️  .next/static not found (this might be normal for some builds)');
  }

  // Step 2: Copy public files
  console.log('📁 Copying public files to standalone...');
  if (fs.existsSync(publicSource)) {
    copyDir(publicSource, publicDest);
    console.log('   ✅ Public files copied');
  } else {
    console.warn('   ⚠️  public folder not found');
  }

  console.log('\n✅ Post-build complete!\n');
  console.log('📂 Your standalone build is ready at: .next/standalone/\n');
  console.log('🚀 To deploy:');
  console.log('   1. Upload .next/standalone/* to /wyaparpay.kabootz.in/');
  console.log('   2. Or run `git pull && npm run deploy` on server');
  console.log('   3. Restart Node.js app in Plesk\n');

} catch (error) {
  console.error('❌ Post-build failed:', error.message);
  process.exit(1);
}
