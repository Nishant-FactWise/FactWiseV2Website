// One-shot WebP converter. Requires sharp:
//   npm i -D sharp
//   node scripts/build-webp.js
//
// Emits .webp alongside each source PNG with reasonable quality settings:
//   - Gradient/texture backgrounds: quality 82 (visually lossless, big shrink)
//   - Logos (sharp edges): quality 92 + near-lossless

const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const targets = [
  { src: 'public/TexturedGradient.png',  quality: 82, smartSubsample: true },
  { src: 'public/logo.png',              quality: 92, nearLossless: true },
  { src: 'public/logowhite.png',         quality: 92, nearLossless: true },
];

(async () => {
  for (const { src, quality, nearLossless, smartSubsample } of targets) {
    const inPath  = path.join(root, src);
    const outPath = inPath.replace(/\.png$/i, '.webp');
    const opts = { quality, effort: 6 };
    if (nearLossless) opts.nearLossless = true;
    if (smartSubsample) opts.smartSubsample = true;
    await sharp(inPath).webp(opts).toFile(outPath);
    const fs = require('fs');
    const inSize  = fs.statSync(inPath).size;
    const outSize = fs.statSync(outPath).size;
    const pct = Math.round((1 - outSize / inSize) * 100);
    console.log(`${src.padEnd(34)} ${(inSize/1024).toFixed(0)} KB -> ${(outSize/1024).toFixed(0)} KB  (-${pct}%)`);
  }
})().catch(e => { console.error(e); process.exit(1); });
