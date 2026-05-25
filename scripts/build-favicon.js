// One-shot icon builder. Trims white/transparent edges from public/logo.png
// and emits high-resolution icons in src/app/ so Next's metadata picks them up:
//   - icon.png       (512×512) — primary high-res icon
//   - apple-icon.png (180×180) — iOS home-screen icon
//   - favicon.ico    (16, 32, 48 multi-size)
// Requires:  npm i -D sharp png-to-ico
// Run with:  node scripts/build-favicon.js

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;

const SRC = path.join(__dirname, '..', 'public', 'logo.png');
const APP_DIR = path.join(__dirname, '..', 'src', 'app');

async function trimmed() {
  // First pass: remove white border, then transparent border.
  // Threshold tuned to catch off-white pixels (anti-aliasing halo).
  const stage1 = await sharp(SRC)
    .trim({ background: '#ffffff', threshold: 20 })
    .toBuffer();
  const stage2 = await sharp(stage1).trim({ threshold: 10 }).toBuffer();

  // Add 6% transparent padding so the mark isn't flush to the favicon edge.
  const meta = await sharp(stage2).metadata();
  const side = Math.max(meta.width, meta.height);
  const pad = Math.round(side * 0.06);
  return sharp(stage2)
    .extend({
      top: pad + Math.round((side - meta.height) / 2),
      bottom: pad + Math.round((side - meta.height) / 2),
      left: pad + Math.round((side - meta.width) / 2),
      right: pad + Math.round((side - meta.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
}

async function emit(buf, size, outPath) {
  await sharp(buf)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`  wrote ${path.relative(process.cwd(), outPath)} (${size}×${size})`);
}

(async () => {
  console.log('trimming edges from', path.relative(process.cwd(), SRC));
  const base = await trimmed();
  const meta = await sharp(base).metadata();
  console.log(`  trimmed canvas: ${meta.width}×${meta.height}`);

  await emit(base, 512, path.join(APP_DIR, 'icon.png'));
  await emit(base, 180, path.join(APP_DIR, 'apple-icon.png'));

  // .ico: bundle 16, 32, 48 PNGs
  const tmpDir = path.join(__dirname, '.ico-tmp');
  fs.mkdirSync(tmpDir, { recursive: true });
  const sizes = [16, 32, 48];
  const tmpFiles = [];
  for (const s of sizes) {
    const f = path.join(tmpDir, `${s}.png`);
    await sharp(base)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(f);
    tmpFiles.push(f);
  }
  const ico = await pngToIco(tmpFiles);
  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), ico);
  console.log('  wrote src/app/favicon.ico (16/32/48 multi-size)');
  fs.rmSync(tmpDir, { recursive: true, force: true });

  console.log('done.');
})().catch(e => {
  console.error(e);
  process.exit(1);
});
