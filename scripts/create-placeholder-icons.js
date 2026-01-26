#!/usr/bin/env node

/**
 * Create placeholder PWA icons
 * Generates simple colored square icons with "WP" text
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../public/icons');
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Simple SVG to PNG conversion using base64 data URL approach
// Since we don't have image libraries, we'll create SVG icons that browsers can use
function createSVGIcon(size) {
  const fontSize = Math.floor(size / 3);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#F97316" rx="${size * 0.15}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">WP</text>
</svg>`;
}

console.log('Creating placeholder PWA icons...');

SIZES.forEach(size => {
  const svgContent = createSVGIcon(size);
  // Save as SVG first, then we'll convert or use as is
  const svgPath = path.join(ICONS_DIR, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  
  console.log(`✓ Created icon-${size}x${size}.svg`);
});

console.log('\n✅ Placeholder icons created as SVG files');
console.log('Note: For production, convert these to PNG using ImageMagick or similar tool');
console.log('Example: convert icon-144x144.svg icon-144x144.png');

