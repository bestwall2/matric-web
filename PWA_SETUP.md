# PWA Setup Instructions

Your Next.js app has been configured as a Progressive Web App (PWA) using `next-pwa`.

## What's Been Configured

1. ✅ `next-pwa` package added to dependencies
2. ✅ Next.js config updated with PWA settings
3. ✅ Manifest.json created with sports app metadata
4. ✅ Layout updated with PWA metadata
5. ⚠️ Icon files need to be generated

## Generating PWA Icons

You need to generate PNG icon files from the SVG icon. Here are your options:

### Option 1: Online Tools (Easiest)

1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/) or [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
2. Upload `public/icon.svg`
3. Generate all required sizes:
   - 72x72
   - 96x96
   - 128x128
   - 144x144
   - 152x152
   - 192x192
   - 384x384
   - 512x512
4. Download and place all PNG files in the `public/` directory

### Option 2: Using ImageMagick (Command Line)

```bash
# Install ImageMagick if not already installed
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Generate all icon sizes
for size in 72 96 128 144 152 192 384 512; do
  convert public/icon.svg -resize ${size}x${size} public/icon-${size}x${size}.png
done
```

### Option 3: Using Node.js Script

Install sharp:
```bash
npm install --save-dev sharp
```

Then run:
```bash
node generate-icons.js
```

## Testing Your PWA

1. Build your app:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Open in Chrome/Edge and check:
   - Open DevTools → Application → Manifest (should show your manifest)
   - Open DevTools → Application → Service Workers (should show registered worker)
   - Look for "Install" button in the address bar

4. Test on mobile:
   - Open the site on your mobile browser
   - Look for "Add to Home Screen" option
   - Install and test offline functionality

## PWA Features Enabled

- ✅ Offline support via service worker
- ✅ App-like experience (standalone display)
- ✅ Installable on mobile and desktop
- ✅ Caching strategy for better performance
- ✅ App shortcuts (Matches & Channels)
- ✅ RTL support for Arabic

## Notes

- PWA is **disabled in development mode** (only works in production build)
- Service worker is automatically generated in `public/` directory after build
- Icons are required for full PWA functionality - the app will work without them but won't be installable

