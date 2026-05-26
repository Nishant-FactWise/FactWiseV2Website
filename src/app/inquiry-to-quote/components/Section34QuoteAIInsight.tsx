'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────
   SECTION 3.4 — Automate Quote Generation. Win Every Time.
   TSX port of reference/21/QuoteAIInsightAnimation.jsx (no scripted cursor).
   ────────────────────────────────────────────────────────────────────── */

/* ============ ICONS ============ */
const QAI = {
    Check: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    Bot: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 13} height={p.s || 13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" /><circle cx="9" cy="14" r="1.4" fill="currentColor" /><circle cx="15" cy="14" r="1.4" fill="currentColor" /><path d="M12 4v4M8 2v2M16 2v2" /></svg>),
    Spark: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" /></svg>),
    Wand: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 13} height={p.s || 13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4l5 5L8 21H3v-5L15 4z" /><path d="M18 1l1.5 3L23 5.5 19.5 7 18 10l-1.5-3L13 5.5 16.5 4z" fill="currentColor" stroke="none" /></svg>),
    Send: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>),
    File: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>),
};

/* ============ DATA ============ */
const QA_SOURCES = [
    { id: 'S1', label: 'EVT-7741', name: 'Vendor A · pumps', tone: '#3666ff', rgb: '54,102,255', items: ['Pump Body', 'Stator Winding', 'O-ring Kit'], sub: 488000 },
    { id: 'S2', label: 'EVT-7740', name: 'Vendor B · drive', tone: '#10b981', rgb: '16,185,129', items: ['Shaft Assy', 'Bearings'], sub: 142000 },
    { id: 'S3', label: 'EVT-7738', name: 'Vendor C · ctrl', tone: '#8b5cf6', rgb: '139,92,246', items: ['Control Board', 'MCU + Caps'], sub: 196000 },
];

const QA_ROWS = [
    { src: 'S1', name: 'Pump Body', qty: 200, price: 1240 },
    { src: 'S1', name: 'Stator Winding', qty: 200, price: 920 },
    { src: 'S1', name: 'O-ring Kit', qty: 200, price: 280 },
    { src: 'S2', name: 'Shaft Assembly', qty: 200, price: 450 },
    { src: 'S2', name: 'Bearings · 6204', qty: 800, price: 80 },
    { src: 'S3', name: 'Control Board v3', qty: 200, price: 890 },
    { src: 'S3', name: 'MCU + Caps', qty: 200, price: 90 },
];

const QA_CATS = [
    { name: 'Electrical', pct: 41, color: '#8b5cf6' },
    { name: 'Mechanical', pct: 33, color: '#3666ff' },
    { name: 'Logistics', pct: 14, color: '#10b981' },
    { name: 'Duty + Tax', pct: 12, color: '#f59e0b' },
];

const QA_STEPS = [
    { hold: 700 },  // 0 — pick S1
    { hold: 700 },  // 1 — pick S2
    { hold: 700 },  // 2 — pick S3
    { hold: 800 },  // 3 — generate clicked (particles)
    { hold: 900 },  // 4 — rows appear
    { hold: 900 },  // 5 — totals tick
    { hold: 800 },  // 6 — ask AI
    { hold: 700 },  // 7 — typing
    { hold: 1500 }, // 8 — AI insight
    { hold: 1000 }, // 9 — send
];

const STEPS_MENU = [
    { p: 1, title: 'Select Best Bids' },
    { p: 2, title: 'One-Click Quote Generation' },
    { p: 3, title: 'Ask AI · Cost Insights' },
    { p: 4, title: 'Send · Win Every Time' },
];

const stepToMenu = (s: number) => {
    if (s <= 2) return 1;
    if (s <= 5) return 2;
    if (s <= 8) return 3;
    return 4;
};

/* ============ STYLE ============ */
const QA_STYLE = `
.qa-root { position: relative; width: 100%; height: 549px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background: white;
  border-radius: 22px; overflow: hidden; border: 1px solid rgba(15,23,42,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  display: flex; flex-direction: column; min-width: 0; }
.qa-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.qa-url { padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; color: #64748b; }
.qa-pill { margin-left: auto; padding: 3px 9px; background: rgba(54,102,255,0.08);
  border: 1px solid rgba(54,102,255,0.2); border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700;
  color: #3666ff; letter-spacing: 0.14em; text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 5px; }
.qa-pill .d { width: 5px; height: 5px; border-radius: 50%; background: #3666ff;
  box-shadow: 0 0 0 3px rgba(54,102,255,0.2); animation: qa-pulse 1.4s ease-in-out infinite; }
@keyframes qa-pulse { 0%,100% { transform: scale(1); opacity: 1;} 50% { transform: scale(1.5); opacity: 0.55;} }
.qa-grid { position: relative; display: grid; grid-template-columns: 195px 1fr 220px;
  flex: 1; min-height: 0; min-width: 0; transition: grid-template-columns .55s cubic-bezier(0.4,0,0.2,1); }
.qa-grid.l-hidden { grid-template-columns: 0px 1fr 220px; }
.qa-col { padding: 11px; min-width: 0; display: flex; flex-direction: column; gap: 9px; min-height: 0; }
.qa-col.l { border-right: 1px solid #eef1f6; overflow: hidden;
  transition: opacity .4s ease, padding .55s cubic-bezier(0.4,0,0.2,1), border-color .4s ease; }
.qa-grid.l-hidden .qa-col.l { opacity: 0; padding-left: 0; padding-right: 0; border-color: transparent; pointer-events: none; }
.qa-col.r { border-left: 1px solid #eef1f6; background: white; }
.qa-h { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  letter-spacing: 0.12em; text-transform: uppercase; color: #94a3b8; font-weight: 800;
  display: flex; align-items: center; gap: 5px; }
.qa-h .n { background: #3666ff; color: white; padding: 1px 5px; border-radius: 99px; font-size: 8px; }
.qa-src { position: relative; background: white; border: 1.5px solid #e9eef5;
  border-radius: 9px; padding: 8px 9px; transition: all .4s; }
.qa-src.on { background: linear-gradient(135deg, #fafbff 0%, white 100%); }
.qa-src .top { display: flex; align-items: center; gap: 6px; }
.qa-src .ck { width: 15px; height: 15px; border-radius: 4px; border: 1.5px solid #cbd5e1;
  display: grid; place-items: center; color: white; background: white; flex-shrink: 0;
  transition: all .3s; }
.qa-src .lbl { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  font-weight: 800; color: #94a3b8; letter-spacing: 0.06em; }
.qa-src .nm { font-size: 10.5px; font-weight: 700; color: #0b1322; margin-top: 2px; line-height: 1.2; }
.qa-src .items { margin-top: 3px; display: flex; flex-wrap: wrap; gap: 2px; }
.qa-src .item { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  padding: 1px 5px; border-radius: 99px; background: #f4f6fa; color: #64748b; }
.qa-src .sub { margin-top: 5px; display: flex; align-items: center; justify-content: space-between;
  padding-top: 4px; border-top: 1px dashed #eef1f6; }
.qa-src .sub .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5px;
  letter-spacing: 0.07em; color: #94a3b8; text-transform: uppercase; font-weight: 700; }
.qa-src .sub .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px;
  font-weight: 800; color: #0b1322; }
.qa-gen { margin-top: auto; padding: 9px 11px; border-radius: 9px;
  background: linear-gradient(180deg, #4A6FFF 0%, #2f59ff 100%); color: white;
  font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 6px;
  box-shadow: 0 10px 24px -8px rgba(54,102,255,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
  transition: all .3s; opacity: 0.55; }
.qa-gen.ready { opacity: 1; }
.qa-gen.glow { animation: qa-genGlow 1.4s ease-in-out infinite; }
@keyframes qa-genGlow {
  0%,100% { transform: scale(1); box-shadow: 0 10px 24px -8px rgba(54,102,255,0.5); }
  50% { transform: scale(1.03); box-shadow: 0 14px 30px -6px rgba(54,102,255,0.75); }
}
.qa-gen.pressed { transform: scale(0.96); }
.qa-doc { background: white; border: 1px solid #e9eef5; border-radius: 12px;
  padding: 11px 12px; box-shadow: 0 14px 32px -16px rgba(15,23,42,0.12);
  flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 7px; }
.qa-doc-hd { display: flex; align-items: center; gap: 7px; padding-bottom: 7px;
  border-bottom: 1.5px solid #f1f5f9; }
.qa-doc-hd .ic { width: 20px; height: 20px; border-radius: 5px;
  background: #eff4ff; color: #3666ff; display: grid; place-items: center; }
.qa-doc-hd .t { font-size: 11px; font-weight: 800; color: #0b1322; }
.qa-doc-hd .id { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #94a3b8; }
.qa-doc-hd .mark { margin-left: auto; padding: 2px 7px; border-radius: 99px;
  background: #f3f0ff; color: #3666ff; border: 1px solid #ddd5ff;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 800;
  letter-spacing: 0.05em; }
.qa-rows { display: flex; flex-direction: column; gap: 1px; flex: 1; overflow: hidden; min-height: 0; }
.qa-row { display: grid; grid-template-columns: 4px 1fr 32px 56px; gap: 6px; align-items: center;
  padding: 3.5px 5px; border-radius: 5px; font-size: 9.5px;
  opacity: 0; transform: translateX(-4px);
  transition: opacity .4s, transform .4s, background .3s; }
.qa-row.in { opacity: 1; transform: translateX(0); }
.qa-row .bar { width: 3px; height: 18px; border-radius: 2px; }
.qa-row .nm { color: #0b1322; font-weight: 600; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }
.qa-row .qty { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  color: #94a3b8; text-align: right; }
.qa-row .px { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px;
  font-weight: 700; color: #0b1322; text-align: right; }
.qa-row.pulse { background: rgba(54,102,255,0.08); }
.qa-tots { display: flex; flex-direction: column; gap: 2px; padding-top: 6px;
  border-top: 1.5px dashed #e9eef5; }
.qa-tot-r { display: grid; grid-template-columns: 1fr auto; align-items: center;
  font-size: 10px; color: #475569; }
.qa-tot-r .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  letter-spacing: 0.05em; text-transform: uppercase; color: #94a3b8; font-weight: 700; }
.qa-tot-r .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px;
  font-weight: 800; color: #0b1322; transition: opacity .3s; }
.qa-tot-r.final { padding: 5px 8px; margin-top: 3px;
  background: linear-gradient(135deg, #eff4ff 0%, #dbeafe 100%);
  border: 1px solid rgba(54,102,255,0.2); border-radius: 7px; }
.qa-tot-r.final .l { color: #64748b; }
.qa-tot-r.final .v { color: #1e3a8a; font-size: 13px; }
.qa-particle { position: absolute; width: 8px; height: 8px; border-radius: 50%;
  pointer-events: none; z-index: 6; }
.qa-particle.go { animation: qa-fly 1s cubic-bezier(0.4,0,0.2,1) forwards; }
@keyframes qa-fly {
  0% { opacity: 0; }
  10% { opacity: 1; }
  100% { opacity: 0; transform: scale(0.4); }
}
.qa-ai { background: white; color: #0b1322; border-radius: 12px;
  padding: 10px 11px; display: flex; flex-direction: column; gap: 7px;
  min-height: 0; flex: 1; border: 1px solid #e9eef5;
  box-shadow: 0 8px 24px -10px rgba(15,23,42,0.1); }
.qa-ai-hd { display: flex; align-items: center; gap: 6px; }
.qa-ai-hd .b { width: 22px; height: 22px; border-radius: 6px;
  background: rgba(54,102,255,0.1); color: #3666ff; display: grid; place-items: center; }
.qa-ai-hd .t { font-size: 10.5px; font-weight: 800; color: #0b1322; }
.qa-ai-hd .t span { color: #3666ff; }
.qa-ai-hd .badge { margin-left: auto; padding: 1px 6px; border-radius: 99px;
  background: rgba(54,102,255,0.08); color: #3666ff; border: 1px solid rgba(54,102,255,0.2);
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 800;
  letter-spacing: 0.07em; }
.qa-prompt { display: flex; align-items: center; gap: 6px; padding: 6px 8px;
  background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 7px; font-size: 9.5px; color: #475569; }
.qa-prompt .cur { display: inline-block; width: 1.5px; height: 10px; background: #3666ff;
  animation: qa-blink 0.9s steps(2) infinite; vertical-align: middle; margin-left: 1px; }
@keyframes qa-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
.qa-answer { display: flex; gap: 6px; align-items: flex-start;
  opacity: 0; transform: translateY(4px);
  transition: opacity .4s, transform .4s; }
.qa-answer.in { opacity: 1; transform: translateY(0); }
.qa-answer .av { width: 18px; height: 18px; border-radius: 50%;
  background: rgba(54,102,255,0.1); color: #3666ff;
  display: grid; place-items: center; flex-shrink: 0; }
.qa-answer .body { flex: 1; min-width: 0; }
.qa-answer .body .head { font-size: 9.5px; font-weight: 600; color: #0b1322; margin-bottom: 4px; line-height: 1.3; }
.qa-answer .body .head b { color: #3666ff; }
.qa-chartRow { display: flex; gap: 9px; align-items: center; }
.qa-donut { width: 55px; height: 55px; position: relative; flex-shrink: 0; }
.qa-donut .mid { position: absolute; inset: 0; display: grid; place-items: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px; font-weight: 800;
  color: #3666ff; line-height: 1; }
.qa-bars { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.qa-bar { display: grid; grid-template-columns: 56px 1fr 25px; gap: 5px; align-items: center;
  font-size: 9px; color: #64748b; }
.qa-bar .nm { font-weight: 600; color: #0b1322; white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis; }
.qa-bar .track { height: 5px; background: #f1f5f9; border-radius: 99px;
  position: relative; overflow: hidden; }
.qa-bar .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 99px;
  width: 0%; transition: width .9s cubic-bezier(0.4,0,0.2,1); }
.qa-bar .pct { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800;
  text-align: right; color: #475569; }
.qa-insight { display: flex; gap: 5px; align-items: flex-start;
  padding: 5px 7px; background: rgba(54,102,255,0.05);
  border: 1px solid rgba(54,102,255,0.15); border-radius: 7px;
  font-size: 9.5px; color: #475569; line-height: 1.35;
  opacity: 0; transform: translateY(3px); transition: opacity .4s .3s, transform .4s .3s; }
.qa-insight.in { opacity: 1; transform: translateY(0); }
.qa-insight b { color: #3666ff; font-weight: 800; }
.qa-send-wrap { display: flex; align-items: center; gap: 7px; padding-top: 5px;
  margin-top: auto; border-top: 1px dashed #e2e8f0; }
.qa-stat { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  color: #94a3b8; letter-spacing: 0.04em; }
.qa-stat strong { color: #059669; font-weight: 800; }
.qa-send { margin-left: auto; padding: 5px 9px; border-radius: 7px;
  background: linear-gradient(180deg, #4A6FFF 0%, #2f59ff 100%); color: white;
  font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;
  box-shadow: 0 6px 14px -4px rgba(54,102,255,0.45);
  transition: transform .25s; }
.qa-send.glow { animation: qa-sendGlow 1.4s ease-in-out infinite; }
@keyframes qa-sendGlow {
  0%,100% { transform: scale(1); box-shadow: 0 6px 14px -4px rgba(54,102,255,0.45); }
  50% { transform: scale(1.06); box-shadow: 0 12px 24px -4px rgba(54,102,255,0.75); }
}
.qa-send.click { transform: scale(0.92); }
`;

export default function Section34QuoteAIInsight({ isActive = true }: { isActive?: boolean }) {
    const [step, setStep] = useState<number>(0);
    const [isAuto, setIsAuto] = useState<boolean>(true);
    const [particles, setParticles] = useState<Array<{ id: number; startX: number; startY: number; endX: number; endY: number; color: string; delay: number }>>([]);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        if (document.getElementById('qa-style-v1')) return;
        const el = document.createElement('style');
        el.id = 'qa-style-v1';
        el.textContent = QA_STYLE;
        document.head.appendChild(el);
    }, []);

    useEffect(() => {
        if (!isAuto || !isActive) return;
        const hold = QA_STEPS[step]?.hold || 1200;
        const t = setTimeout(() => setStep((s) => (s + 1) % QA_STEPS.length), hold);
        return () => clearTimeout(t);
    }, [step, isAuto, isActive]);

    // Burst particles when generate is clicked
    useEffect(() => {
        if (step !== 3) return;
        const bursts = [];
        for (let i = 0; i < 12; i++) {
            bursts.push({
                id: Date.now() + i,
                startX: 18 + (i % 3) * 2,
                startY: 20 + (i % 3) * 18,
                endX: 50 + (i % 4) * 6,
                endY: 35 + (i % 4) * 8,
                color: QA_SOURCES[i % 3].tone,
                delay: i * 50,
            });
        }
        setParticles(bursts);
        const cleanup = setTimeout(() => setParticles([]), 1400);
        return () => clearTimeout(cleanup);
    }, [step]);

    const goManual = (menuP: number) => {
        setIsAuto(false);
        if (menuP === 1) setStep(2);
        else if (menuP === 2) setStep(5);
        else if (menuP === 3) setStep(8);
        else setStep(9);
    };

    // Phase flags
    const s1On = step >= 0;
    const s2On = step >= 1;
    const s3On = step >= 2;
    const allPicked = step >= 2;
    const genGlow = step === 3 || step === 2;
    const genPressed = step === 3;
    const showAllRows = step >= 4;
    const totalsIn = step >= 5;
    const askActive = step >= 6;
    const typing = step === 7;
    const answerIn = step >= 8;
    const insightIn = step >= 8;
    const sendGlow = step === 9;
    const sendClick = step === 9;

    // Totals
    const subtotal = QA_ROWS.reduce((s, r) => s + r.qty * r.price, 0);
    const landed = Math.round(subtotal * 0.085);
    const markup = Math.round(subtotal * 0.18);
    const total = subtotal + landed + markup;

    // Typed prompt
    const promptFull = 'Where is my biggest expense?';
    const promptLen = askActive
        ? (typing ? Math.floor(promptFull.length * 0.6) : (step >= 8 ? promptFull.length : Math.floor(promptFull.length * 0.3)))
        : 0;
    const promptText = promptFull.slice(0, promptLen);

    const activeMenu = stepToMenu(step);

    return (
        <div id="quote-section-3-4" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            {/* LEFT */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                    Section 3.4 · Quote Generation
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Automate Quote Generation. <br />
                    <span className="text-[#3666ff]">Built to Win.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Select the best bids — FactWise generates the customer quote in one click. Every line item priced, every landed cost calculated, every BOM rolled up automatically. No manual calculation, no margin errors.
                </p>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Then ask FactWise AI anything about your quote — where the biggest expense lies, how costs shift across volumes, what to sharpen. Every insight you need to protect margin and send the quote first.
                </p>

                <div className="flex flex-col gap-2 mt-8 text-left">
                    {STEPS_MENU.map((item) => (
                        <div
                            key={item.p}
                            onClick={() => goManual(item.p)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${activeMenu === item.p
                                ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {activeMenu === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${activeMenu === item.p
                                    ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                    : activeMenu > item.p
                                    ? 'border-[#00b884] bg-[#00b884] text-white'
                                    : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${activeMenu === item.p ? 'text-[#3666ff]' : activeMenu > item.p ? 'text-slate-700' : 'text-slate-500'
                                }`}>{item.title}</span>
                            </div>
                            {activeMenu === item.p && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 75, damping: 14 }}
                className="lg:col-span-6 order-2 lg:order-2 relative"
            >
                <div className="qa-root">
                    <div className="qa-chrome">
                        <div className="qa-url">app.factwise.io / quote / build</div>
                        <div className="qa-pill"><span className="d" />FW Insight · AI assist</div>
                    </div>

                    <div className={`qa-grid${step >= 3 ? ' l-hidden' : ''}`}>
                        {/* LEFT — sources */}
                        <div className="qa-col l">
                            <div className="qa-h"><span className="n">01</span>Select best bids</div>
                            {QA_SOURCES.map((s, i) => {
                                const on = (i === 0 && s1On) || (i === 1 && s2On) || (i === 2 && s3On);
                                return (
                                    <div key={s.id}
                                        className={`qa-src ${on ? 'on' : ''}`}
                                        style={{
                                            borderColor: on ? s.tone : '#e9eef5',
                                            boxShadow: on ? `0 8px 18px -8px ${s.tone}44` : undefined,
                                        }}
                                    >
                                        <div className="top">
                                            <div className="ck" style={on ? { background: s.tone, borderColor: s.tone } : undefined}>
                                                {on && <QAI.Check s={8} />}
                                            </div>
                                            <span className="lbl" style={on ? { color: s.tone } : undefined}>{s.label}</span>
                                        </div>
                                        <div className="nm">{s.name}</div>
                                        <div className="items">
                                            {s.items.map((it, j) => (
                                                <span key={j} className="item"
                                                    style={on ? { background: `rgba(${s.rgb}, 0.1)`, color: s.tone } : undefined}>
                                                    {it}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="sub">
                                            <span className="l">Best bid · sub</span>
                                            <span className="v">₹{(s.sub / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className={`qa-gen ${allPicked ? 'ready' : ''} ${genGlow ? 'glow' : ''} ${genPressed ? 'pressed' : ''}`}>
                                <QAI.Wand s={12} /> Generate quote
                            </div>
                        </div>

                        {/* CENTRE — doc */}
                        <div className="qa-col" style={{ padding: '11px' }}>
                            <div className="qa-doc">
                                <div className="qa-doc-hd">
                                    <div className="ic"><QAI.File s={12} /></div>
                                    <div>
                                        <div className="t">Customer quote</div>
                                        <div className="id">QT-1109 · Acme Robotics · 200 units</div>
                                    </div>
                                    <div className="mark">Auto-rolled</div>
                                </div>

                                <div className="qa-rows">
                                    {QA_ROWS.map((r, i) => {
                                        const src = QA_SOURCES.find((s) => s.id === r.src)!;
                                        return (
                                            <div key={i} className={`qa-row ${showAllRows ? 'in' : ''} ${step === 4 ? 'pulse' : ''}`}
                                                style={{ transitionDelay: `${0.1 + i * 0.09}s` }}>
                                                <div className="bar" style={{ background: src.tone }} />
                                                <span className="nm">{r.name}</span>
                                                <span className="qty">×{r.qty}</span>
                                                <span className="px">₹{(r.qty * r.price).toLocaleString('en-IN')}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="qa-tots">
                                    <div className="qa-tot-r">
                                        <span className="l">Subtotal</span>
                                        <span className="v" style={{ opacity: totalsIn ? 1 : 0.3 }}>
                                            ₹{(totalsIn ? subtotal : 0).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <div className="qa-tot-r">
                                        <span className="l">Landed cost · auto</span>
                                        <span className="v" style={{ opacity: totalsIn ? 1 : 0.3 }}>
                                            +₹{(totalsIn ? landed : 0).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <div className="qa-tot-r">
                                        <span className="l">Markup · 18%</span>
                                        <span className="v" style={{ opacity: totalsIn ? 1 : 0.3 }}>
                                            +₹{(totalsIn ? markup : 0).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <div className="qa-tot-r final">
                                        <span className="l">Customer total</span>
                                        <span className="v">₹{(totalsIn ? total : 0).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — AI ask */}
                        <div className="qa-col r">
                            <div className="qa-h"><span className="n">02</span>Ask AI · your quote</div>
                            <div className="qa-ai">
                                <div className="qa-ai-hd">
                                    <div className="b"><QAI.Bot s={12} /></div>
                                    <div className="t">FW Insight <span>· ask anything</span></div>
                                    <div className="badge">AI</div>
                                </div>

                                <div className="qa-prompt">
                                    <QAI.Spark s={10} />
                                    <span>{promptText}</span>
                                    {askActive && <span className="cur" />}
                                </div>

                                <div className={`qa-answer ${answerIn ? 'in' : ''}`}>
                                    <div className="av"><QAI.Bot s={11} /></div>
                                    <div className="body">
                                        <div className="head">
                                            <b>Electrical</b> is your top spend — pricing pressure here moves the quote most.
                                        </div>
                                        <div className="qa-chartRow">
                                            <svg className="qa-donut" viewBox="0 0 36 36">
                                                {(() => {
                                                    let acc = 0;
                                                    return QA_CATS.map((c, i) => {
                                                        const len = (c.pct / 100) * 100;
                                                        const dash = `${answerIn ? len : 0} ${100 - len + 0.001}`;
                                                        const off = -acc;
                                                        acc += len;
                                                        return (
                                                            <circle key={i} cx="18" cy="18" r="15.9" fill="none"
                                                                stroke={c.color} strokeWidth="4"
                                                                strokeDasharray={dash} strokeDashoffset={off}
                                                                pathLength="100"
                                                                style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)', transformOrigin: 'center', transform: 'rotate(-90deg)' }} />
                                                        );
                                                    });
                                                })()}
                                                <foreignObject x="0" y="0" width="36" height="36">
                                                    <div className="mid">{answerIn ? '41%' : ''}</div>
                                                </foreignObject>
                                            </svg>
                                            <div className="qa-bars">
                                                {QA_CATS.map((c, i) => (
                                                    <div key={i} className="qa-bar">
                                                        <span className="nm">{c.name}</span>
                                                        <span className="track">
                                                            <span className="fill"
                                                                style={{ width: answerIn ? `${c.pct * 2.4}%` : 0, background: c.color, transitionDelay: `${0.15 + i * 0.1}s` }} />
                                                        </span>
                                                        <span className="pct">{answerIn ? `${c.pct}%` : '—'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`qa-insight ${insightIn ? 'in' : ''}`}>
                                    <QAI.Spark s={10} />
                                    <span>
                                        <b>Tip:</b> at 1000 units, your unit cost drops <b>13%</b> — bid tighter on volume to win this RFQ.
                                    </span>
                                </div>

                                <div className="qa-send-wrap">
                                    <span className="qa-stat">
                                        Built in <strong>4m 22s</strong> · normally 1h+
                                    </span>
                                    <div className={`qa-send ${sendGlow ? 'glow' : ''} ${sendClick ? 'click' : ''}`}>
                                        <QAI.Send s={10} /> Send
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Particles burst */}
                        {particles.map((p) => (
                            <div key={p.id} className="qa-particle go"
                                style={{
                                    left: `${p.startX}%`,
                                    top: `${p.startY}%`,
                                    background: p.color,
                                    boxShadow: `0 0 12px ${p.color}`,
                                    animationDelay: `${p.delay}ms`,
                                }} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
