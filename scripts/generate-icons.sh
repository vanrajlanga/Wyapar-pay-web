#!/bin/bash

# Generate PWA icons from base icon
# This script creates all required icon sizes for PWA

SOURCE_ICON="public/icon.png"
ICONS_DIR="public/icons"

# Check if source icon exists
if [ ! -f "$SOURCE_ICON" ]; then
  echo "Error: Source icon not found at $SOURCE_ICON"
  echo "Please ensure icon.png exists in public/ directory"
  exit 1
fi

# Create icons directory
mkdir -p "$ICONS_DIR"

# Icon sizes from manifest.json
SIZES=(72 96 128 144 152 192 384 512)

echo "Generating PWA icons from $SOURCE_ICON..."

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
  for size in "${SIZES[@]}"; do
    convert "$SOURCE_ICON" -resize "${size}x${size}" "$ICONS_DIR/icon-${size}x${size}.png"
    echo "✓ Generated icon-${size}x${size}.png"
  done
# Check if sips (macOS) is available
elif command -v sips &> /dev/null; then
  for size in "${SIZES[@]}"; do
    sips -z "$size" "$size" "$SOURCE_ICON" --out "$ICONS_DIR/icon-${size}x${size}.png" > /dev/null 2>&1
    echo "✓ Generated icon-${size}x${size}.png"
  done
else
  echo "Error: Neither ImageMagick nor sips found."
  echo "Please install ImageMagick or use macOS sips"
  echo "Creating placeholder icons instead..."
  
  # Create placeholder using Node.js if available
  if command -v node &> /dev/null; then
    node -e "
    const fs = require('fs');
    const { createCanvas } = require('canvas');
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    
    sizes.forEach(size => {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#F97316';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold ' + (size/3) + 'px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('WP', size/2, size/2);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync('$ICONS_DIR/icon-' + size + 'x' + size + '.png', buffer);
      console.log('✓ Generated icon-' + size + 'x' + size + '.png');
    });
    " 2>/dev/null || echo "Node canvas not available. Please install ImageMagick or manually create icons."
  fi
fi

echo ""
echo "✅ Icon generation complete!"
echo "Icons saved to: $ICONS_DIR"

