// Re-trims the navbar/footer logos so they don't show a white halo when
// scaled up. The source PNG (and the WebP we converted from it) carries
// ~37% transparent/white padding around the FT mark. Run with:
//   npm i -D sharp  (already installed during favicon build)
//   node scripts/trim-logos.js

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
// Both logos go through the same trim + cut-out alpha-zero pass. The
// resulting marks are blue/black solids with transparent interior
// negative space, so they adapt to whichever background the navbar
// shows them on (dark hero, scrolled white pill, etc).
const inputs = [
  { src: 'public/logo.png',      out: 'public/logo.webp'      },
  { src: 'public/logowhite.png', out: 'public/logowhite.webp' },
];

async function trim(srcAbs) {
  // Two-pass trim: white border first, then alpha-transparent border.
  // Threshold tuned to catch the off-white halo around anti-aliased edges.
  const stage1 = await sharp(srcAbs).trim({ background: '#ffffff', threshold: 20 }).toBuffer();
  const stage2 = await sharp(stage1).trim({ threshold: 10 }).toBuffer();
  // Add 4% transparent safe-margin so the mark isn't flush to the navbar edge.
  const meta = await sharp(stage2).metadata();
  const side = Math.max(meta.width, meta.height);
  const pad  = Math.round(side * 0.04);
  const padded = await sharp(stage2)
    .extend({
      top:    pad + Math.round((side - meta.height) / 2),
      bottom: pad + Math.round((side - meta.height) / 2),
      left:   pad + Math.round((side - meta.width)  / 2),
      right:  pad + Math.round((side - meta.width)  / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // Knock the white "cut-outs" inside the F and T to fully transparent so
  // the mark adapts to whatever background it sits on (dark hero shows
  // through dark, white pill shows through white — no jarring white slivers
  // at 32x32 in the navbar). Any pixel with R/G/B > 240 and alpha > 0 is
  // treated as a cut-out and alpha-zeroed.
  const raw = await sharp(padded).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const buf = raw.data;
  const { width: w, height: h } = raw.info;
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i + 1], b = buf[i + 2], a = buf[i + 3];
    if (a > 0 && r > 240 && g > 240 && b > 240) {
      buf[i + 3] = 0;
    }
  }
  // Re-encode as PNG so the outer pipeline can detect the format.
  return sharp(buf, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
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
