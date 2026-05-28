// Re-trims the navbar/footer logos so they don't show a white halo when
// scaled up. The source PNG (and the WebP we converted from it) carries
// ~37% transparent/white padding around the FT mark. Run with:
//   npm i -D sharp  (already installed during favicon build)
//   node scripts/trim-logos.js

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const inputs = [
  { src: 'public/logo.png',      out: 'public/logo.webp'      },
  { src: 'public/logowhite.webp', out: 'public/logowhite.webp' },
];

async function trim(srcAbs) {
  // Two-pass trim: white border first, then alpha-transparent border.
  // Threshold tuned to catch the off-white halo around anti-aliased edges.
  const stage1 = await sharp(srcAbs).trim({ background: '#ffffff', threshold: 20 }).toBuffer();
  const stage2 = await sharp(stage1).trim({ threshold: 10 }).toBuffer();
  // Add 4% transparent safe-margin so the mark isn't flush to the rounded
  // container edge in the navbar.
  const meta = await sharp(stage2).metadata();
  const side = Math.max(meta.width, meta.height);
  const pad  = Math.round(side * 0.04);
  return sharp(stage2)
    .extend({
      top:    pad + Math.round((side - meta.height) / 2),
      bottom: pad + Math.round((side - meta.height) / 2),
      left:   pad + Math.round((side - meta.width)  / 2),
      right:  pad + Math.round((side - meta.width)  / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
}

(async () => {
  for (const { src, out } of inputs) {
    const srcAbs = path.join(root, src);
    const outAbs = path.join(root, out);
    const before = fs.statSync(srcAbs).size;
    const trimmed = await trim(srcAbs);
    const meta = await sharp(trimmed).metadata();
    await sharp(trimmed)
      .webp({ quality: 92, nearLossless: true, effort: 6 })
      .toFile(outAbs);
    const after = fs.statSync(outAbs).size;
    console.log(`${src.padEnd(24)} -> ${out.padEnd(24)}  ${meta.width}x${meta.height}  ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`);
  }
})().catch(e => { console.error(e); process.exit(1); });
