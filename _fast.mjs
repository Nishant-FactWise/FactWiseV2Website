import puppeteer from 'puppeteer-core';
import fs from 'fs';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = 'E:/New Folder/Antigravity Tool/Factwise/FactWiseV2Website/_shots';
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

const state = (page) => page.evaluate(() => {
  const flow = document.querySelector('.itpf-container');
  const r = flow?.getBoundingClientRect();
  const vh = window.innerHeight;
  const pos = flow?getComputedStyle(flow).position:null;
  const top = r?Math.round(r.top):null, bot = r?Math.round(r.bottom):null;
  const halfRest = pos==='relative' && bot>40 && bot<vh-40 && top<0; // section bottom stuck in view
  const pinned = pos==='fixed' && top===0;
  return { y:Math.round(scrollY), top, bot, pos, halfRest, pinned, vh };
});

// fast/momentum burst: 6 rapid large wheels then settle
async function burst(page, dir){ for(let k=0;k<6;k++){ await page.mouse.wheel({deltaY:dir*280}); await new Promise(r=>setTimeout(r,14)); } await new Promise(r=>setTimeout(r,850)); }

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:3000/invoice-to-pay',{waitUntil:'networkidle2',timeout:60000});
await new Promise(r=>setTimeout(r,1800));
await page.mouse.move(768,372);

const down=[], up=[];
console.log('DOWN (fast top→bottom):');
for(let i=0;i<14;i++){ await burst(page,1); const s=await state(page); down.push(s);
  const tag = s.halfRest?'<<HALF-REST':s.pinned?'PINNED':'';
  console.log(`  ${String(i).padStart(2)} y=${String(s.y).padStart(5)} top=${String(s.top).padStart(6)} bot=${String(s.bot).padStart(5)} ${s.pos.padEnd(8)} ${tag}`);
  if(s.halfRest) await page.screenshot({path:`${OUT}/FAST_down_${i}.png`});
  if(s.top<-1000 && s.pos==='relative') break; // reached footer past section
}

console.log('UP (fast bottom→top):');
for(let i=0;i<16;i++){ await burst(page,-1); const s=await state(page); up.push(s);
  const tag = s.halfRest?'<<HALF-REST':s.pinned?'PINNED':'';
  console.log(`  ${String(i).padStart(2)} y=${String(s.y).padStart(5)} top=${String(s.top).padStart(6)} bot=${String(s.bot).padStart(5)} ${s.pos.padEnd(8)} ${tag}`);
  if(s.halfRest) await page.screenshot({path:`${OUT}/FAST_up_${i}.png`});
  if(s.y<=2) break; // back at top
}

const anyHalf = down.concat(up).some(s=>s.halfRest);
const pinnedDown = down.some(s=>s.pinned);
const pinnedUp = up.some(s=>s.pinned);
console.log(`\nRESULT: half-rest=${anyHalf?'YES (bad)':'none (good)'} | caught/pinned going down=${pinnedDown} | caught/pinned going up=${pinnedUp}`);
await browser.close();
