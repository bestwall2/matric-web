const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const publicDir = path.join(__dirname, 'public');
const iconSvg = path.join(publicDir, 'icon.svg');

async function generateIcons() {
  if (!fs.existsSync(iconSvg)) {
    console.error('icon.svg not found in public directory!');
    process.exit(1);
  }

  console.log('Generating PWA icons...');
  
  for (const size of sizes) {
    try {
      await sharp(iconSvg)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, `icon-${size}x${size}.png`));
      console.log(`✓ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to generate icon-${size}x${size}.png:`, error.message);
    }
  }
  
  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);

