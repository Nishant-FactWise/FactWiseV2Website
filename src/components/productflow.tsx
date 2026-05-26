'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from './ui/ScrollReveal'

export default function ProductHubAnimation() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let script: HTMLScriptElement | null = null
    let disposed = false

    const SCRIPT = `(function(){
'use strict';
var __rid=(window.__phubRid||0)+1;window.__phubRid=__rid;
var ROOT=document.getElementById('phub-root');
if(!ROOT)return;

var PROMPTS={
  p2q:'Show me the inquiry to quote flow for raw materials with 3 vendors',
  r2po:'Raise a purchase requisition for 500 units and convert to PO',
  i2p:'Match this supplier invoice to the PO and release payment'
};

var CHAT_TOTAL=6600;
var CP={BLOB_END:0,EXPAND_END:0,TYPE_END:2400,PAUSE_END:3000,ENTER_END:3300,SEND_END:4300,PROCESS_END:6100,FADE_END:6600};

var AUTO_FLOWS=['p2q','r2po','i2p'];
var autoIdx=0;
var lastCycleNum=-1;

function ease(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function sparkle(size){
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#4A6FFF"/></svg>';
}
function arrowUp(color){
  return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+color+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
}

function userBubble(prompt){
  return '<div style="max-width:340px;background:#ffffff;border-radius:18px 18px 4px 18px;padding:16px 20px;box-shadow:0 4px 16px rgba(0,0,0,0.08)">'+
    '<p style="margin:0;color:#1A1D2E;font-size:14px;line-height:1.65;font-weight:400;font-family:var(--font-inter), sans-serif">'+escHtml(prompt)+'</p>'+
  '</div>';
}

function typingDot(procMs,idx,color){
  var period=1200;
  var offset=idx*(period/3);
  var ph=((procMs+offset)%period)/period;
  var bounce=Math.max(0,Math.sin(ph*Math.PI));
  var sc=(0.75+bounce*0.5).toFixed(3);
  var op=(0.35+bounce*0.65).toFixed(3);
  return '<div style="width:8px;height:8px;border-radius:50%;background:'+color+';transform:scale('+sc+');opacity:'+op+';flex-shrink:0"></div>';
}

function aiTypingRow(procMs,flowColor,opacity){
  var dots=typingDot(procMs,0,flowColor)+typingDot(procMs,1,flowColor)+typingDot(procMs,2,flowColor);
  return '<div style="display:flex;align-items:center;gap:12px;opacity:'+opacity.toFixed(3)+'">'+
    '<div style="width:36px;height:36px;border-radius:50%;background:#fff;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.08)">'+
      sparkle(18)+
    '</div>'+
    '<div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:6px 18px 18px 18px;padding:14px 20px;display:flex;gap:7px;align-items:center">'+
      dots+
    '</div>'+
  '</div>';
}

function renderChat(ms,flowKey,flowColor){
  var PROMPT=PROMPTS[flowKey]||'';
  var BG='transparent';
  var BAR_BG='#ffffff';
  var BAR_BORDER='rgba(0,0,0,0.12)';

  if(ms<CP.TYPE_END){
    var typingMs=ms-CP.EXPAND_END;
    var charCount=Math.min(PROMPT.length,Math.floor((typingMs/(CP.TYPE_END-CP.EXPAND_END))*PROMPT.length));
    var txt=PROMPT.slice(0,charCount);
    var cur=Math.floor(ms/500)%2===0
      ?'<span style="display:inline-block;width:2px;height:16px;background:rgba(0,0,0,0.8);vertical-align:middle;margin-left:2px;border-radius:1px"></span>':'';
    var done=(charCount>=PROMPT.length);
    var btnBg=done?flowColor:'rgba(0,0,0,0.06)';
    return '<div style="width:100%;height:100%;background:'+BG+';display:flex;align-items:center;justify-content:center">'+
      '<div style="width:500px;height:60px;border-radius:30px;background:'+BAR_BG+';border:1px solid '+BAR_BORDER+';display:flex;align-items:center;padding:0 8px 0 14px;gap:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08)">'+
        sparkle(20)+
        '<span style="flex:1;color:rgba(0,0,0,0.7);font-size:14px;font-weight:400;white-space:nowrap;overflow:hidden;font-family:var(--font-inter), sans-serif">'+escHtml(txt)+cur+'</span>'+
        '<div style="width:40px;height:40px;border-radius:50%;background:'+btnBg+';flex-shrink:0;display:flex;align-items:center;justify-content:center">'+arrowUp('#fff')+'</div>'+
      '</div>'+
    '</div>';
  }

  if(ms<CP.PAUSE_END){
    var pauseCur=Math.floor(ms/500)%2===0
      ?'<span style="display:inline-block;width:2px;height:16px;background:rgba(0,0,0,0.8);vertical-align:middle;margin-left:2px;border-radius:1px"></span>':'';
    return '<div style="width:100%;height:100%;background:'+BG+';display:flex;align-items:center;justify-content:center">'+
      '<div style="width:500px;height:60px;border-radius:30px;background:'+BAR_BG+';border:1px solid '+BAR_BORDER+';display:flex;align-items:center;padding:0 8px 0 14px;gap:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08)">'+
        sparkle(20)+
        '<span style="flex:1;color:rgba(0,0,0,0.7);font-size:14px;font-weight:400;white-space:nowrap;overflow:hidden;font-family:var(--font-inter), sans-serif">'+escHtml(PROMPT)+pauseCur+'</span>'+
        '<div style="width:40px;height:40px;border-radius:50%;background:'+flowColor+';flex-shrink:0;display:flex;align-items:center;justify-content:center">'+arrowUp('#fff')+'</div>'+
      '</div>'+
    '</div>';
  }

  if(ms<CP.ENTER_END){
    var ep=(ms-CP.PAUSE_END)/(CP.ENTER_END-CP.PAUSE_END);
    var btnSc;
    if(ep<0.35){btnSc=1-ep/0.35*0.22;}
    else if(ep<0.7){btnSc=0.78+(ep-0.35)/0.35*0.3;}
    else{btnSc=1.08-(ep-0.7)/0.3*0.08;}
    btnSc=btnSc.toFixed(4);
    var borderGlow='rgba(0,0,0,'+(0.08+clamp((0.35-ep)/0.35,0,1)*0.18).toFixed(3)+')';
    return '<div style="width:100%;height:100%;background:'+BG+';display:flex;align-items:center;justify-content:center">'+
      '<div style="width:500px;height:60px;border-radius:30px;background:'+BAR_BG+';border:1px solid '+borderGlow+';display:flex;align-items:center;padding:0 8px 0 14px;gap:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08)">'+
        sparkle(20)+
        '<span style="flex:1;color:rgba(0,0,0,0.7);font-size:14px;font-weight:400;white-space:nowrap;overflow:hidden;font-family:var(--font-inter), sans-serif">'+escHtml(PROMPT)+'</span>'+
        '<div style="width:40px;height:40px;border-radius:50%;background:'+flowColor+';flex-shrink:0;display:flex;align-items:center;justify-content:center;transform:scale('+btnSc+')">'+arrowUp('#fff')+'</div>'+
      '</div>'+
    '</div>';
  }

  if(ms<CP.SEND_END){
    var p2=ease((ms-CP.TYPE_END)/(CP.SEND_END-CP.TYPE_END));
    var barOp=clamp(1-p2*2.2,0,1).toFixed(3);
    var barSc=(1-p2*0.04).toFixed(4);
    var bubP=clamp((p2-0.25)/0.75,0,1);
    var bubOp=ease(bubP).toFixed(3);
    var bubY=Math.round((1-ease(bubP))*28);
    return '<div style="width:100%;height:100%;background:'+BG+';display:flex;flex-direction:column;justify-content:center;padding:0 64px;gap:20px;position:relative">'+
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">'+
        '<div style="width:500px;height:60px;border-radius:30px;background:'+BAR_BG+';border:1px solid '+BAR_BORDER+';display:flex;align-items:center;padding:0 8px 0 14px;gap:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);opacity:'+barOp+';transform:scale('+barSc+')">'+
          sparkle(20)+
          '<span style="flex:1;color:rgba(0,0,0,0.7);font-size:14px;font-weight:400;white-space:nowrap;overflow:hidden;font-family:var(--font-inter), sans-serif">'+escHtml(PROMPT)+'</span>'+
          '<div style="width:40px;height:40px;border-radius:50%;background:'+flowColor+';flex-shrink:0;display:flex;align-items:center;justify-content:center">'+arrowUp('#fff')+'</div>'+
        '</div>'+
      '</div>'+
      '<div style="display:flex;justify-content:flex-end;opacity:'+bubOp+';transform:translateY('+bubY+'px)">'+
        userBubble(PROMPT)+
      '</div>'+
      '<div style="height:64px;opacity:0"></div>'+
    '</div>';
  }

  if(ms<CP.PROCESS_END){
    var procMs=ms-CP.SEND_END;
    var introP=clamp(procMs/400,0,1);
    var aiOp=ease(introP);
    return '<div style="width:100%;height:100%;background:'+BG+';display:flex;flex-direction:column;justify-content:center;padding:0 64px;gap:20px">'+
      '<div style="display:flex;justify-content:flex-end">'+userBubble(PROMPT)+'</div>'+
      aiTypingRow(procMs,flowColor,aiOp)+
    '</div>';
  }

  var p3=ease((ms-CP.PROCESS_END)/(CP.FADE_END-CP.PROCESS_END));
  var sceneOp=clamp(1-p3,0,1).toFixed(3);
  var procMsFade=ms-CP.SEND_END;
  return '<div style="width:100%;height:100%;background:'+BG+';display:flex;flex-direction:column;justify-content:center;padding:0 64px;gap:20px;opacity:'+sceneOp+'">'+
    '<div style="display:flex;justify-content:flex-end">'+userBubble(PROMPT)+'</div>'+
    aiTypingRow(procMsFade,flowColor,1)+
  '</div>';
}

var C={p2q:'#3666ff',r2po:'#4b8bff',i2p:'#3666ff'};
var FLOWS={
  p2q:{title:'Inquiry to Quote',color:C.p2q,
    desc:'Customer RFQ to winning quote — faster and smarter.',
    nodes:['Project','RfQ Creation','Contracts','Negotiations','Bid Analysis','Quote'],
    bullets:['Instant project on customer RFQ landing','Best prices auto-filled from contracts & past POs','One-click RFQ dispatch with approval workflows','Platform-native negotiation — no emails','True landed cost with custom formulas','One-click customer quote from winning bids'],
    icons:['proj','rfq','contract','neg','bid','po']},
  r2po:{title:'Requisition to PO',color:C.r2po,
    desc:'Internal request to purchase order — structured and approved.',
    nodes:['Requisition','RfQ Creation + Approvals','Negotiations','Bid Analysis & Shortlisting','PO Creation'],
    bullets:['Raise requisitions with multi-level approvals','Convert approved reqs to RFQs — prices auto-filled','Structured vendor negotiation rounds','Landed cost analysis — shortlist best bids','Split quantities across vendors flexibly','Single-click PO generation post-approval'],
    icons:['req','rfq','neg','bid','po','po']},
  i2p:{title:'Invoice to Pay',color:C.i2p,
    desc:'Seller invoice to final payment — every step controlled.',
    nodes:['Seller Invoice Creation','Goods Receipt','Quality Check','Payments','Settled'],
    bullets:['Vendor creates invoice on-platform','4-way match: PO, GR, QC & contract terms','Flexible GR → QC → payment ordering','Auto-release payments once conditions met','Real-time invoice status for all stakeholders'],
    icons:['inv','gr','qc','pay','done']}
};

var curFlow='p2q';
var TABS=document.querySelectorAll('.ftab');
TABS.forEach(function(t){t.onclick=function(){
  var flow=t.dataset.flow;
  if(!flow)return;
  var idx=AUTO_FLOWS.indexOf(flow);
  if(idx>=0)autoIdx=idx;
  curFlow=flow;
  render.t0=null;flowBuilt=false;lastBulletCount=-1;lastCycleNum=-1;
  TABS.forEach(function(b){b.className='ftab'+(b.dataset.flow===curFlow?' active':'');});
}});

var ICO={
  proj:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>'},
  contract:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13l-5 5-3-3"/></svg>'},
  rfq:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'},
  neg:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M17 6H3M21 12H3M15 18H3"/></svg>'},
  bid:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>'},
  calc:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="12" y1="10" x2="12" y2="18"/><line x1="8" y1="14" x2="16" y2="14"/></svg>'},
  req:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>'},
  po:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>'},
  inv:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>'},
  gr:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>'},
  qc:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>'},
  pay:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>'},
  done:function(c){return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'}
};

function tk(){return '<svg width="7" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';}
function tkLg(){return '<svg width="10" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5 6.5-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';}

function chip(name,iconKey,done,dimmed,color){
  var ic=ICO[iconKey](done?'#18B87A':color);
  return '<div style="background:#ffffff;border-radius:12px;border:1.5px solid '+(done?'rgba(24,184,122,0.3)':'rgba(0,0,0,0.06)')+';padding:14px 16px;display:flex;align-items:center;gap:12px;width:100%;min-height:120px;box-sizing:border-box;opacity:1">'+
    '<div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;background:'+(done?'rgba(24,184,122,0.12)':'rgba(0,0,0,0.04)')+';display:flex;align-items:center;justify-content:center">'+ic+'</div>'+
    '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:500;color:'+(done?'#18B87A':'#1A1D2E')+'">'+name+'</div><div style="font-size:9px;color:#808080;margin-top:2px">'+(done?'Complete':'Pending')+'</div></div>'+
  '</div>';
}

function cardOpen(name,iconKey,color,bulletText){
  var ic=ICO[iconKey](color);
  return '<div style="background:#ffffff;border-radius:12px;border:1.5px solid '+color+'55;box-shadow:0 0 0 4px '+color+'0a,0 12px 32px '+color+'18;padding:16px;position:relative;width:100%;min-height:120px;box-sizing:border-box">'+
    '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,'+color+','+color+'77);border-radius:12px 12px 0 0"></div>'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">'+
      '<div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;background:'+color+'1a;border:1px solid '+color+'44;display:flex;align-items:center;justify-content:center">'+ic+'</div>'+
      '<div><div style="font-size:12px;font-weight:500;color:#1A1D2E">'+name+'</div><div style="font-size:9px;color:'+color+';margin-top:2px">Processing</div></div>'+
    '</div>'+
    '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:'+color+'08;border:1px solid '+color+'18;border-radius:8px">'+
      '<div style="width:13px;height:13px;border-radius:50%;flex-shrink:0;background:'+color+';display:flex;align-items:center;justify-content:center;margin-top:1px">'+tk()+'</div>'+
      '<span style="font-size:11px;color:rgba(0,0,0,0.85);line-height:1.45">'+bulletText+'</span>'+
    '</div>'+
  '</div>';
}

function buildInfoCard(flow,visibleCount){
  var bulletsHtml='';
  var total=flow.bullets.length;
  for(var b=0;b<total;b++){
    var isDone=b<visibleCount;
    var checkBg=isDone?'#18B87A':'#E2E8F0';
    var textOp=isDone?'1':'0.4';
    var border=b<total-1?'border-bottom:1px solid rgba(0,0,0,0.06);':'';
    
    bulletsHtml+=
      '<div style="display:flex;align-items:center;gap:14px;padding:12px 0;'+border+'transition:all 0.3s ease">'+
        '<div style="width:24px;height:24px;border-radius:50%;background:'+checkBg+';flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:background 0.3s ease">'+tkLg()+'</div>'+
        '<span style="font-size:14px;font-weight:400;color:rgba(0,0,0,0.7);line-height:1.4;opacity:'+textOp+';transition:opacity 0.3s ease">'+flow.bullets[b]+'</span>'+
      '</div>';
  }
  return '<div style="background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 12px 48px rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.05)">'+
    '<div style="margin-bottom:14px"><span style="text-transform:uppercase;letter-spacing:2.5px;font-size:10px;font-weight:700;color:'+flow.color+'"></span></div>'+
    '<h3 style="font-size:28px;font-weight:600;color:#1A1D2E;margin:0 0 12px 0;line-height:1.15;letter-spacing:-0.02em;font-family:var(--font-display), sans-serif">'+flow.title+'</h3>'+
    '<p style="font-size:14px;color:rgba(0,0,0,0.5);line-height:1.7;margin:0 0 24px 0">'+flow.desc+'</p>'+
    '<div style="display:flex;flex-direction:column">'+bulletsHtml+'</div>'+
  '</div>';
}

function paintDot(canvas,wrap,nodeEls,from,to,ms,dur,color){
  if(!canvas||!wrap)return;
  var wr=wrap.getBoundingClientRect();
  var dpr=window.devicePixelRatio||1;
  canvas.width=wr.width*dpr;canvas.height=wr.height*dpr;
  canvas.style.width=wr.width+'px';canvas.style.height=wr.height+'px';
  var ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);ctx.clearRect(0,0,wr.width,wr.height);
  var fEl=nodeEls[from],tEl=nodeEls[to];
  if(!fEl||!tEl)return;
  var fR=fEl.getBoundingClientRect(),tR=tEl.getBoundingClientRect();
  var fx=fR.left+fR.width/2-wr.left,fy=fR.top+fR.height/2-wr.top;
  var tx=tR.left+tR.width/2-wr.left,ty=tR.top+tR.height/2-wr.top;
  var raw=Math.min(1,ms/dur);
  var e=raw<0.5?2*raw*raw:1-Math.pow(-2*raw+2,2)/2;
  var cx=fx+(tx-fx)*e,cy=fy+(ty-fy)*e;
  var op=raw<0.1?raw/0.1:raw>0.9?(1-raw)/0.1:1;
  var hx=color.replace('#','');
  var r=parseInt(hx.slice(0,2),16),g=parseInt(hx.slice(2,4),16),bv=parseInt(hx.slice(4,6),16);
  for(var i=3;i>=1;i--){var tr=Math.max(0,raw-i*0.06);var te=tr<0.5?2*tr*tr:1-Math.pow(-2*tr+2,2)/2;
    ctx.beginPath();ctx.arc(fx+(tx-fx)*te,fy+(ty-fy)*te,3-i*0.5,0,Math.PI*2);
    ctx.fillStyle='rgba('+r+','+g+','+bv+','+(op*(0.25-i*0.06))+')';ctx.fill();}
  var glow=ctx.createRadialGradient(cx,cy,0,cx,cy,18);
  glow.addColorStop(0,'rgba('+r+','+g+','+bv+','+(op*0.35)+')');glow.addColorStop(1,'rgba('+r+','+g+','+bv+',0)');
  ctx.beginPath();ctx.arc(cx,cy,18,0,Math.PI*2);ctx.fillStyle=glow;ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,4.5,0,Math.PI*2);ctx.fillStyle='rgba('+r+','+g+','+bv+','+op+')';ctx.fill();
  ctx.beginPath();ctx.arc(cx,cy,1.8,0,Math.PI*2);ctx.fillStyle='rgba(0,0,0,'+(op*0.9)+')';ctx.fill();
}

function buildTL(){
  var f=FLOWS[curFlow];var phases=[];var acc=0;
  if(curFlow==='p2q'){
    phases.push({type:'node',idx:0,doneIndices:[0],start:acc,end:acc+1600});acc+=1600;
    phases.push({type:'dot',from:0,to:1,doneIndices:[0],start:acc,end:acc+400});acc+=400;
    phases.push({type:'node',idx:1,bullet:'Publishing digital RFQ to vendors',doneIndices:[0],start:acc,end:acc+1600});acc+=1600;
    phases.push({type:'dot',from:1,to:2,doneIndices:[0],start:acc,end:acc+400});acc+=400;
    phases.push({type:'node',idx:2,bullet:'Finalizing contract pricing terms',doneIndices:[0,2],start:acc,end:acc+1600});acc+=1600;
    phases.push({type:'dot',from:2,to:1,doneIndices:[0,2],start:acc,end:acc+400});acc+=400;
    phases.push({type:'node',idx:1,bullet:'Merging contract terms into RFQ',doneIndices:[0,1,2],start:acc,end:acc+1600});acc+=1600;
    phases.push({type:'dot',from:1,to:3,doneIndices:[0,1,2],start:acc,end:acc+400});acc+=400;
    phases.push({type:'node',idx:3,doneIndices:[0,1,2,3],start:acc,end:acc+1600});acc+=1600;
    phases.push({type:'dot',from:3,to:4,doneIndices:[0,1,2,3],start:acc,end:acc+400});acc+=400;
    phases.push({type:'node',idx:4,doneIndices:[0,1,2,3,4],start:acc,end:acc+1600});acc+=1600;
    phases.push({type:'dot',from:4,to:5,doneIndices:[0,1,2,3,4],start:acc,end:acc+400});acc+=400;
    phases.push({type:'node',idx:5,doneIndices:[0,1,2,3,4,5],start:acc,end:acc+1600});acc+=1600;
  } else {
    for(var i=0;i<f.nodes.length;i++){
      var di=[];for(var j=0;j<=i;j++)di.push(j);
      phases.push({type:'node',idx:i,doneIndices:di,start:acc,end:acc+2000});acc+=2000;
      if(i<f.nodes.length-1){
        var di2=[];for(var k=0;k<=i;k++)di2.push(k);
        phases.push({type:'dot',from:i,to:i+1,doneIndices:di2,start:acc,end:acc+500});acc+=500;
      }
    }
  }
  phases.push({type:'pause',start:acc,end:acc+3000});acc+=3000;
  return{phases:phases,total:acc};
}

var flowBuilt=false;
var lastFlowKey='';
var lastBulletCount=-1;

function ensureFlowDOM(){
  if(flowBuilt&&lastFlowKey===curFlow)return;
  lastFlowKey=curFlow;flowBuilt=true;lastBulletCount=-1;
  ROOT.innerHTML=
    '<div style="background:transparent;padding:20px 0">'+
      '<div style="display:flex;gap:40px;align-items:center;height:600px">'+
        '<div id="phub-left" style="flex:1;min-width:0;position:relative;display:flex;align-items:center;justify-content:center">'+
          '<canvas id="phub-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:40"></canvas>'+
          '<div id="phub-nodes" style="display:flex;align-items:center;gap:10px;position:relative;z-index:5;width:100%"></div>'+
          '<div id="phub-chat" style="position:absolute;inset:0;z-index:10;display:flex;align-items:center;justify-content:center"></div>'+
        '</div>'+
        '<div id="phub-info" style="width:360px;flex-shrink:0;align-self:flex-start"></div>'+
      '</div>'+
    '</div>';
}

function advanceFlow(){
  autoIdx=(autoIdx+1)%AUTO_FLOWS.length;
  curFlow=AUTO_FLOWS[autoIdx];
  TABS.forEach(function(b){b.className='ftab'+(b.dataset.flow===curFlow?' active':'');});
  flowBuilt=false;lastBulletCount=-1;
}

function render(now){
  if(window.__phubRid!==__rid)return;
  if(!window.__phubVisible)return;
  if(!render.t0)render.t0=now;
  var elapsed=now-render.t0;
  var flow=FLOWS[curFlow];
  // buildTL is cached — only rebuild when flow changes
  if(!render.tl||render.tlFlow!==curFlow){render.tl=buildTL();render.tlFlow=curFlow;}
  var tl=render.tl;
  var totalCycle=CHAT_TOTAL+tl.total;
  var cycleNum=Math.floor(elapsed/totalCycle);
  var cycle=elapsed%totalCycle;

  if(cycleNum!==lastCycleNum){
    if(lastCycleNum>=0){advanceFlow();}
    lastCycleNum=cycleNum;
    flow=FLOWS[curFlow];
    tl=buildTL();
  }

  ensureFlowDOM();
  var nodesWrap = document.getElementById('phub-nodes');
  var infoWrap = document.getElementById('phub-info');
  var chatWrap = document.getElementById('phub-chat');

  if(cycle<CHAT_TOTAL){
    if(nodesWrap) nodesWrap.style.display='none';
    if(chatWrap) {
      chatWrap.style.display='flex';
      chatWrap.innerHTML=renderChat(cycle,curFlow,flow.color);
    }
    if(infoWrap && lastBulletCount !== 0) {
       lastBulletCount = 0;
       infoWrap.innerHTML = buildInfoCard(flow, 0);
    }
    requestAnimationFrame(render);
    return;
  }

  if(chatWrap) chatWrap.style.display='none';
  if(nodesWrap) nodesWrap.style.display='flex';

  var flowCycle=cycle-CHAT_TOTAL;
  var phase=tl.phases[0];
  for(var pi=0;pi<tl.phases.length;pi++){
    if(flowCycle>=tl.phases[pi].start&&flowCycle<tl.phases[pi].end){phase=tl.phases[pi];break;}
  }
  var phaseMs=flowCycle-phase.start;

  if(!nodesWrap||!infoWrap){requestAnimationFrame(render);return;}

  var nodesHtml='';
  for(var ni=0;ni<flow.nodes.length;ni++){
    var isActive=phase.type==='node'&&phase.idx===ni;
    var isDone=(phase.doneIndices||[]).indexOf(ni)>=0;
    var dimmed=!isActive&&!isDone;
    var nodeName=flow.nodes[ni];
    var isFloating=nodeName==='Contracts';
    
    if(isFloating){
      var nodeWidth=isActive?'220px':'148px';
      nodesHtml+='<div id="pn-'+ni+'" style="position:absolute;left:50%;top:-160px;width:'+nodeWidth+';transform:translateX(-50%);z-index:60;transition:all 0.5s cubic-bezier(0.4, 0, 0.2, 1)">';
      if(isActive){nodesHtml+=cardOpen(nodeName,flow.icons[ni],flow.color,phase.bullet||flow.bullets[ni]);}
      else{nodesHtml+=chip(nodeName,flow.icons[ni],isDone,dimmed,flow.color);}
      nodesHtml+='</div>';
    } else {
      nodesHtml+='<div id="pn-'+ni+'" style="flex:1 1 0%;min-width:0;display:flex;flex-direction:column;z-index:5">';
      if(isActive){nodesHtml+=cardOpen(nodeName,flow.icons[ni],flow.color,phase.bullet||flow.bullets[ni]);}
      else{nodesHtml+=chip(nodeName,flow.icons[ni],isDone,dimmed,flow.color);}
      nodesHtml+='</div>';
    }
  }
  nodesWrap.innerHTML=nodesHtml;

  var visibleBullets=0;
  if(phase.type==='node')visibleBullets=phase.idx+1;
  else if(phase.type==='dot')visibleBullets=phase.from+1;
  else if(phase.type==='pause')visibleBullets=flow.nodes.length;

  if(visibleBullets!==lastBulletCount){
    lastBulletCount=visibleBullets;
    infoWrap.innerHTML=buildInfoCard(flow,visibleBullets);
  }

  if(phase.type==='dot'){
    requestAnimationFrame(function(){
      var cvs=document.getElementById('phub-canvas');
      var nrow=document.getElementById('phub-nodes');
      if(cvs&&nrow){
        var nels={};for(var k=0;k<flow.nodes.length;k++){nels[k]=document.getElementById('pn-'+k);}
        paintDot(cvs,nrow,nels,phase.from,phase.to,phaseMs,500,flow.color);
      }
    });
  }else{
    var cvs=document.getElementById('phub-canvas');
    if(cvs){var ctx=cvs.getContext('2d');if(ctx)ctx.clearRect(0,0,cvs.width,cvs.height);}
  }

  requestAnimationFrame(render);
}

// Pause rAF loop when element leaves viewport, resume when it returns
var visObs=new IntersectionObserver(function(entries){
  if(entries[0]){
    if(entries[0].isIntersecting){
      window.__phubVisible=true;
      requestAnimationFrame(render);
    } else {
      window.__phubVisible=false;
    }
  }
},{threshold:0.05});
visObs.observe(ROOT);

var obs=new IntersectionObserver(function(entries, observer){
  if(entries[0]&&entries[0].isIntersecting){
    observer.disconnect();
    requestAnimationFrame(render);
  }
},{threshold:0.1});
obs.observe(ROOT);
})();`

    const init = () => {
      if (disposed) return
      const root = document.getElementById('phub-root')
      if (!root) { requestAnimationFrame(init); return }
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = SCRIPT
      document.body.appendChild(script)
    }
    init()
    return () => { disposed = true; if (script && script.parentNode) script.parentNode.removeChild(script) }
  }, [])

  return (
    <div id="product-hub-animation" className="responsive-section-padding" style={{ position: 'relative', scrollMarginTop: '100px' }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', backgroundImage: "url('/TexturedGradient.webp')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '80px 0' }}>
        <div style={{ position: 'absolute', right: '-100px', bottom: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(54, 102, 255, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
        <div className="noise" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none', mixBlendMode: 'overlay' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ScrollReveal delay={0.1}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: '99px', background: '#eff6ff', border: '1px solid #dbeafe', color: '#3666ff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>
                AI-Powered Workflows
              </div>
            </ScrollReveal>
            
            <ScrollReveal type="kinetic">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
                Automate Every Way You Procure. <br />
                <span style={{ color: '#3666ff' }}>One Platform.</span>
              </h2>
            </ScrollReveal>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ color: '#64748b', maxWidth: '720px', fontSize: '18px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}
            >
              Every manufacturer procures differently — some start with a customer RFQ, some with a requisition, some with a vendor invoice. FactWise handles all three, end to end.
            </motion.p>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="ftab active" data-flow="p2q">Inquiry to Quote</button>
            <button className="ftab" data-flow="r2po">Requisition to PO</button>
            <button className="ftab" data-flow="i2p">Invoice to Pay</button>
          </div>
          
          <div id="phub-root" ref={rootRef} style={{ minHeight: '600px', background: 'transparent', overflow: 'hidden' }}></div>
        </div>
      </div>
      <style>{`
        .responsive-section-padding {
          padding: 48px 16px;
        }
        @media (min-width: 768px) {
          .responsive-section-padding {
            padding: 48px 40px;
          }
        }
        .ftab {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          padding: 10px 24px;
          border-radius: 99px;
          cursor: pointer;
          font-weight: 300;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }
        .ftab:hover {
          border-color: #cbd5e1;
          color: #475569;
        }
        .ftab.active {
          border-color: #4A6FFF;
          color: #ffffff;
          background: #4A6FFF;
          box-shadow: 0 4px 12px rgba(74, 111, 255, 0.25);
        }
        @keyframes bulletAppear {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
