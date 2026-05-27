import puppeteer from 'puppeteer-core';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push(String(e)));
await page.setViewport({ width: 1536, height: 744 });
await page.goto('http://localhost:3000/invoice-to-pay',{waitUntil:'networkidle2',timeout:60000});
await new Promise(r=>setTimeout(r,1800));
// land directly at the bottom (deep-link / reload scenario)
await page.evaluate(()=>window.scrollTo(0, document.documentElement.scrollHeight));
await new Promise(r=>setTimeout(r,800));
await page.mouse.move(768,372);
const st = () => page.evaluate(()=>{const f=document.querySelector('.itpf-container');const r=f.getBoundingClientRect();return {y:Math.round(scrollY),top:Math.round(r.top),pos:getComputedStyle(f).position};});
let pinnedSeen=false, reachedTop=false;
console.log('UP from fresh bottom:');
for(let i=0;i<16;i++){
  for(let k=0;k<6;k++){ await page.mouse.wheel({deltaY:-280}); await new Promise(r=>setTimeout(r,14)); }
  await new Promise(r=>setTimeout(r,850));
  const s = await st();
  if(s.pos==='fixed'&&s.top===0) pinnedSeen=true;
  if(s.y<=2) reachedTop=true;
  console.log(`  ${String(i).padStart(2)} y=${String(s.y).padStart(5)} top=${String(s.top).padStart(6)} ${s.pos} ${pinnedSeen&&s.pos==='fixed'?'PINNED':''}`);
  if(reachedTop) break;
}
console.log(`\nRESULT: pinned-on-way-up=${pinnedSeen} | reached-top=${reachedTop} | pageerrors=${errs.length}`);
if(errs.length) console.log(errs.slice(0,5).join('\n'));
await browser.close();
