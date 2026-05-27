// Verify all three product-page flow sections survive fast/momentum scrolling
// (no half-rest, the pin engages, no page errors). Adapted from _fast.mjs.
import puppeteer from 'puppeteer-core';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const ROUTES = [
  { path: '/inquiry-to-quote',   sel: '.qtof-container' },
  { path: '/requisitions-to-po', sel: '.rtpf-container' },
  { path: '/invoice-to-pay',     sel: '.itpf-container' },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

const state = (page, sel) => page.evaluate((sel) => {
  const flow = document.querySelector(sel);
  const r = flow?.getBoundingClientRect();
  const vh = window.innerHeight;
  const pos = flow ? getComputedStyle(flow).position : null;
  const top = r ? Math.round(r.top) : null, bot = r ? Math.round(r.bottom) : null;
  const halfRest = pos === 'relative' && bot > 40 && bot < vh - 40 && top < 0;
  const pinned = pos === 'fixed' && top === 0;
  return { y: Math.round(scrollY), top, bot, pos, halfRest, pinned, vh };
}, sel);

// fast/momentum burst: 6 rapid large wheels then settle
async function burst(page, dir) {
  for (let k = 0; k < 6; k++) { await page.mouse.wheel({ deltaY: dir * 280 }); await new Promise(r => setTimeout(r, 14)); }
  await new Promise(r => setTimeout(r, 850));
}

let overallBad = false;
for (const { path, sel } of ROUTES) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1800));
  await page.mouse.move(768, 372);

  const down = [], up = [];
  for (let i = 0; i < 14; i++) {
    await burst(page, 1); const s = await state(page, sel); down.push(s);
    if (s.top < -1000 && s.pos === 'relative') break;
  }
  for (let i = 0; i < 16; i++) {
    await burst(page, -1); const s = await state(page, sel); up.push(s);
    if (s.y <= 2) break;
  }

  const anyHalf = down.concat(up).some(s => s.halfRest);
  const pinnedDown = down.some(s => s.pinned);
  const pinnedUp = up.some(s => s.pinned);
  const reachedTop = up.some(s => s.y <= 2);
  const reachedBottom = down.some(s => s.top < -1000 && s.pos === 'relative');
  const bad = anyHalf || !pinnedDown || !reachedTop || errs.length > 0;
  if (bad) overallBad = true;
  console.log(`${path.padEnd(20)} half-rest=${anyHalf ? 'YES(bad)' : 'none'} | pinnedDown=${pinnedDown} pinnedUp=${pinnedUp} | reachedBottom=${reachedBottom} reachedTop=${reachedTop} | pageerrors=${errs.length} ${bad ? '  <<< PROBLEM' : 'OK'}`);
  if (errs.length) console.log('    ' + errs.slice(0, 3).join('\n    '));
  await page.close();
}

console.log('\nVERDICT: ' + (overallBad ? 'PROBLEM on at least one route' : 'all three OK'));
await browser.close();
