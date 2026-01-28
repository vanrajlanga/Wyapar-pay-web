#!/usr/bin/env node

/**
 * Post-Build Script for Next.js Standalone Deployment
 *
 * This script runs after `next build` and prepares the build
 * for deployment by copying static assets to the correct locations.
 *
 * What it does:
 * 1. Copies .next/static to .next/standalone/.next/static (for standalone)
 * 2. Copies .next/static to _next/static (for web server access)
 * 3. Copies public/* to .next/standalone/public/ (for standalone)
 * 4. Copies public/* to project root (for web server access)
 *
 * This ensures assets work with Document Root set to project root.
 */

const fs = require('fs');
const path = require('path');

console.log('\n📦 Running post-build script...\n');

// Paths
const rootDir = path.join(__dirname, '..');
const staticSource = path.join(rootDir, '.next', 'static');
const staticDestStandalone = path.join(rootDir, '.next', 'standalone', '.next', 'static');
const staticDestRoot = path.join(rootDir, '_next', 'static');
const publicSource = path.join(rootDir, 'public');
const publicDestStandalone = path.join(rootDir, '.next', 'standalone', 'public');
const publicDestRoot = rootDir;

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
  // Step 1: Copy static files to standalone
  console.log('📁 Copying .next/static to standalone...');
  if (fs.existsSync(staticSource)) {
    copyDir(staticSource, staticDestStandalone);
    console.log('   ✅ Copied to .next/standalone/.next/static/');
  } else {
    console.warn('   ⚠️  .next/static not found');
  }

  // Step 2: Copy static files to project root (for web server access)
  console.log('📁 Copying .next/static to project root...');
  if (fs.existsSync(staticSource)) {
    copyDir(staticSource, staticDestRoot);
    console.log('   ✅ Copied to _next/static/');
  }

  // Step 3: Copy public files to standalone
  console.log('📁 Copying public files to standalone...');
  if (fs.existsSync(publicSource)) {
    copyDir(publicSource, publicDestStandalone);
    console.log('   ✅ Copied to .next/standalone/public/');
  } else {
    console.warn('   ⚠️  public folder not found');
  }

  // Step 4: Copy public files to project root (for web server access)
  console.log('📁 Copying public files to project root...');
  if (fs.existsSync(publicSource)) {
    const entries = fs.readdirSync(publicSource, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(publicSource, entry.name);
      const destPath = path.join(publicDestRoot, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    console.log('   ✅ Copied to project root/');
  }

  console.log('\n✅ Post-build complete!\n');
  console.log('📂 Files ready in both locations:');
  console.log('   • .next/standalone/ (self-contained)');
  console.log('   • Project root (for web server)\n');
  console.log('🚀 To deploy:');
  console.log('   1. Run: git pull && npm run build');
  console.log('   2. Restart Node.js app in Plesk');
  console.log('   3. Document Root: /wyaparpay.kabootz.in\n');

} catch (error) {
  console.error('❌ Post-build failed:', error.message);
  process.exit(1);
}
