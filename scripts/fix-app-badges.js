const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');
const androidPath = path.join(publicDir, 'Get_On_Android.png');
const iosPath = path.join(publicDir, 'Get_on_iOS.jpg');

async function fixBadges() {
  try {
    // Read Android image and get its metadata
    const androidImg = sharp(androidPath);
    const androidMeta = await androidImg.metadata();
    console.log(`Original Android: ${androidMeta.width}x${androidMeta.height}`);

    // Trim white/transparent edges from Android image
    const androidTrimmed = await androidImg
      .trim({ threshold: 10 })
      .toBuffer();

    const androidTrimmedMeta = await sharp(androidTrimmed).metadata();
    console.log(`Trimmed Android: ${androidTrimmedMeta.width}x${androidTrimmedMeta.height}`);

    // Read iOS image
    const iosImg = sharp(iosPath);
    const iosMeta = await iosImg.metadata();
    console.log(`Original iOS: ${iosMeta.width}x${iosMeta.height}`);

    // Set target dimensions - same size for both
    const targetWidth = 540;
    const targetHeight = 180;

    console.log(`Target size for both: ${targetWidth}x${targetHeight}`);

    // Resize both images to temporary files
    const androidTemp = path.join(publicDir, 'Get_On_Android_temp.png');
    const iosTemp = path.join(publicDir, 'Get_on_iOS_temp.jpg');

    await sharp(androidTrimmed)
      .resize(targetWidth, targetHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent background
      })
      .png()
      .toFile(androidTemp);

    await iosImg
      .resize(targetWidth, targetHeight, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // white background for JPEG
      })
      .jpeg({ quality: 95 })
      .toFile(iosTemp);

    // Replace original files
    fs.renameSync(androidTemp, androidPath);
    fs.renameSync(iosTemp, iosPath);

    // Verify final sizes
    const finalAndroid = await sharp(androidPath).metadata();
    const finalIOS = await sharp(iosPath).metadata();
    console.log(`Final Android: ${finalAndroid.width}x${finalAndroid.height}`);
    console.log(`Final iOS: ${finalIOS.width}x${finalIOS.height}`);
    console.log('✅ Badges fixed!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

fixBadges();

