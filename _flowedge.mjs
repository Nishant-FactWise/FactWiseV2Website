// Deep-link-from-bottom test (adapted from _edge.mjs) for all three flows +
// screenshots of each pinned panel to confirm content clears the navbar.
import puppeteer from 'puppeteer-core';
import fs from 'fs';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'E:/New Folder/Antigravity Tool/Factwise/FactWiseV2Website/_shots';
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { path: '/inquiry-to-quote',   sel: '.qtof-container', tag: 'qtof', panels: 4 },
  { path: '/requisitions-to-po', sel: '.rtpf-container', tag: 'rtpf', panels: 5 },
  { path: '/invoice-to-pay',     sel: '.itpf-container', tag: 'itpf', panels: 5 },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

for (const { path, sel, tag, panels } of ROUTES) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.setViewport({ width: 1536, height: 744 });
  await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1800));
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await new Promise(r => setTimeout(r, 800));
  await page.mouse.move(768, 372);
  const st = () => page.evaluate((sel) => { const f = document.querySelector(sel); const r = f.getBoundingClientRect(); return { y: Math.round(scrollY), top: Math.round(r.top), pos: getComputedStyle(f).position }; }, sel);
  let pinnedSeen = false, reachedTop = false;
  for (let i = 0; i < 16; i++) {
    for (let k = 0; k < 6; k++) { await page.mouse.wheel({ deltaY: -280 }); await new Promise(r => setTimeout(r, 14)); }
    await new Promise(r => setTimeout(r, 850));
    const s = await st();
    if (s.pos === 'fixed' && s.top === 0) pinnedSeen = true;
    if (s.y <= 2) { reachedTop = true; break; }
  }
  console.log(`${path.padEnd(20)} pinned-on-way-up=${pinnedSeen} reached-top=${reachedTop} pageerrors=${errs.length} ${(pinnedSeen && reachedTop && !errs.length) ? 'OK' : '<<< PROBLEM'}`);
  if (errs.length) console.log('    ' + errs.slice(0, 3).join('\n    '));
  await page.close();
}

// Screenshot each panel of inquiry (alignment change) by stepping forward from top.
const page = await browser.newPage();
await page.setViewport({ width: 1536, height: 744 });
await page.goto('http://localhost:3000/inquiry-to-quote', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 1800));
await page.mouse.move(768, 372);
// scroll down to engage the pin
for (let k = 0; k < 8; k++) { await page.mouse.wheel({ deltaY: 200 }); await new Promise(r => setTimeout(r, 30)); }
await new Promise(r => setTimeout(r, 700));
for (let p = 0; p < 4; p++) {
  await page.screenshot({ path: `${OUT}/qtof_panel_${p}.png` });
  // advance one panel
  await page.mouse.wheel({ deltaY: 280 });
  await new Promise(r => setTimeout(r, 1000));
}
console.log('\nSaved inquiry panel screenshots to _shots/qtof_panel_0..3.png');
await browser.close();
