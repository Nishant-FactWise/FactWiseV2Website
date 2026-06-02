'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────
   SECTION 3.3 — See True Landed Cost. Shortlist with Confidence.
   TSX port of reference/21/LandedCostXRayAnimation.jsx (no scripted cursor).
   ────────────────────────────────────────────────────────────────────── */

/* ============ ICONS ============ */
const LCI = {
    Check: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    Trophy: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 12} height={p.s || 12} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 4H4v3a3 3 0 0 0 3 3" /><path d="M17 4h3v3a3 3 0 0 1-3 3" /></svg>),
    Spark: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" /></svg>),
    Calc: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><circle cx="8" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="16" cy="12" r="1" /><line x1="8" y1="18" x2="16" y2="18" /></svg>),
    Scan: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18" /></svg>),
};

/* ============ DATA ============ */
type BidCell = { q: number; d: number; f: number; i: number };

const LC_ITEMS = [
    { id: 'I1', name: 'Pump Body', qty: 200 },
    { id: 'I2', name: 'Stator Winding', qty: 200 },
    { id: 'I3', name: 'O-ring Kit', qty: 200 },
];
const LC_VENDORS = [
    { id: 'A', name: 'Vendor A', loc: 'IN', fx: 'INR', tone: '#3666ff' },
    { id: 'B', name: 'Vendor B', loc: 'CN', fx: 'INR', tone: '#10b981' },
    { id: 'C', name: 'Vendor C', loc: 'DE', fx: 'EUR', tone: '#8b5cf6' },
];
const LC_BIDS: Record<string, Record<string, BidCell>> = {
    A: { I1: { q: 1240, d: 0,   f: 60,  i: 18 }, I2: { q: 920, d: 0,   f: 45,  i: 14 }, I3: { q: 280, d: 0,  f: 20, i: 8 } },
    B: { I1: { q: 1180, d: 142, f: 185, i: 42 }, I2: { q: 880, d: 106, f: 140, i: 34 }, I3: { q: 260, d: 32, f: 60, i: 14 } },
    C: { I1: { q: 1290, d: 64,  f: 120, i: 28 }, I2: { q: 960, d: 48,  f: 95,  i: 22 }, I3: { q: 295, d: 14, f: 38, i: 10 } },
};
const LC_LAYERS = [
    { k: 'q' as const, name: 'Quote',     tone: '#64748b', bg: '#f1f5f9' },
    { k: 'd' as const, name: 'Duty',      tone: '#d97706', bg: '#fef3c7' },
    { k: 'f' as const, name: 'Freight',   tone: '#3666ff', bg: '#dbeafe' },
    { k: 'i' as const, name: 'Insurance', tone: '#10b981', bg: '#d1fae5' },
];

const lcSum = (vid: string, items: typeof LC_ITEMS, keys: ('q' | 'd' | 'f' | 'i')[]) =>
    items.reduce((s, it) => s + keys.reduce((ss, k) => ss + LC_BIDS[vid][it.id][k], 0) * it.qty, 0);
const lcInr = (n: number) => '₹' + n.toLocaleString('en-IN');
const lcL = (n: number) => '₹' + (n / 100000).toFixed(2) + 'L';

// 10 cursor steps (same as reference)
const LC_STEPS = [
    { hold: 1100 }, { hold: 900 },  { hold: 1100 }, { hold: 700 },
    { hold: 1300 }, { hold: 1100 }, { hold: 1100 }, { hold: 1200 },
    { hold: 1200 }, { hold: 1100 },
];

const STEPS_MENU = [
    { p: 1, title: 'Raw Vendor Quotes' },
    { p: 2, title: 'Apply Landed-Cost Formula' },
    { p: 3, title: 'Layers Revealed · Currency Flipped' },
    { p: 4, title: 'FW Recommended · Shortlist' },
];

const stepToMenu = (s: number) => {
    if (s <= 2) return 1;
    if (s === 3) return 2;
    if (s >= 4 && s <= 6) return 3;
    return 4;
};

/* ============ STYLE ============ */
const LC_STYLE = `
.lc-root { position: relative; width: 100%; height: 549px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background: white;
  border-radius: 22px; overflow: hidden; border: 1px solid rgba(15,23,42,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  display: flex; flex-direction: column; min-width: 0; }
.lc-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.lc-url { padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; color: #64748b; }
.lc-toggleWrap { margin-left: auto; display: flex; align-items: center; gap: 6px; }
.lc-toggle { display: inline-flex; align-items: center; gap: 7px; padding: 4px 10px;
  background: white; border: 1.5px solid #e9eef5; border-radius: 99px;
  font-size: 10.5px; font-weight: 700; color: #64748b; transition: all .3s; }
.lc-toggle.act { border-color: #3666ff; color: #1e3a8a; background: #eff4ff;
  box-shadow: 0 0 0 4px rgba(54,102,255,0.1); }
.lc-toggle .sw { width: 22px; height: 12px; border-radius: 99px; background: #e2e8f0;
  position: relative; transition: background .3s; }
.lc-toggle .sw::after { content: ""; position: absolute; left: 2px; top: 2px;
  width: 8px; height: 8px; border-radius: 50%; background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2); transition: transform .3s; }
.lc-toggle.act .sw { background: #3666ff; }
.lc-toggle.act .sw::after { transform: translateX(10px); }
.lc-main { position: relative; flex: 1; min-height: 0; padding: 12px; display: grid;
  grid-template-columns: 1fr 215px; gap: 12px; min-width: 0; }
.lc-grid-wrap { position: relative; background: #fbfcfe; border: 1px solid rgba(15,23,42,0.06);
  border-radius: 12px; padding: 11px; display: flex; flex-direction: column; gap: 7px;
  min-height: 0; min-width: 0; box-shadow: 0 6px 20px -8px rgba(15,23,42,0.08);
  overflow: hidden; }
.lc-grid-hd { display: flex; align-items: center; gap: 7px; }
.lc-grid-hd .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #94a3b8; }
.lc-grid-hd .mode { margin-left: auto; padding: 2px 7px; border-radius: 99px;
  background: #f4f6fa; border: 1px solid #e2e8f0;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 800;
  color: #64748b; letter-spacing: 0.06em; transition: all .3s; }
.lc-grid-hd .mode.act { background: #eff4ff; border-color: #d8e2ff; color: #1e3a8a; }
.lc-tbl { display: grid; grid-template-columns: 92px repeat(3, 1fr); gap: 4px; align-content: start; }
.lc-vhead { padding: 5px 7px; display: flex; align-items: center; gap: 5px;
  background: #fbfcfe; border: 1px solid #eef1f6; border-radius: 7px; transition: all .35s; }
.lc-vhead .av { width: 17px; height: 17px; border-radius: 5px; color: white;
  display: grid; place-items: center; font-size: 8px; font-weight: 800; flex-shrink: 0; }
.lc-vhead .info { min-width: 0; flex: 1; }
.lc-vhead .info .n { font-size: 9.5px; font-weight: 700; color: #0b1322; line-height: 1.1;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lc-vhead .info .fx { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5px; color: #94a3b8; letter-spacing: 0.06em; }
.lc-vhead .info .fx.flip { color: #047857; }
.lc-icell { padding: 5px 7px; font-size: 10px; font-weight: 600; color: #475569;
  display: flex; flex-direction: column; justify-content: center; gap: 1px;
  background: #fbfcfe; border: 1px solid #eef1f6; border-radius: 7px; }
.lc-icell .qty { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  color: #94a3b8; letter-spacing: 0.04em; }
.lc-cell { position: relative; height: 34px; border-radius: 7px; overflow: hidden;
  background: white; border: 1px solid #eef1f6; }
.lc-cell .stack { position: absolute; left: 0; right: 0; bottom: 0; display: flex;
  flex-direction: column-reverse; transition: opacity .4s; }
.lc-cell .layer { width: 100%; transition: height .55s cubic-bezier(0.4,0,0.2,1); }
.lc-cell .num { position: absolute; right: 6px; top: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px; font-weight: 800;
  color: #0b1322; transition: color .3s; z-index: 2; }
.lc-cell .num .delta { font-size: 8px; color: #94a3b8; font-weight: 700; margin-left: 2px; }
.lc-cell.win { box-shadow: inset 0 0 0 1.5px #3666ff;
  background: linear-gradient(180deg, #eff4ff 0%, white 100%); }
.lc-tot { background: white; border: 1px solid rgba(15,23,42,0.08); color: #0b1322;
  border-radius: 7px; padding: 7px 8px;
  display: flex; flex-direction: column; gap: 2px; align-items: flex-end;
  transition: transform .55s cubic-bezier(0.4,0,0.2,1), background .35s, border-color .35s, box-shadow .35s; position: relative; }
.lc-tot.up    { transform: translateY(-3px); background: linear-gradient(135deg, #eff4ff 0%, #dbeafe 100%);
  border-color: rgba(54,102,255,0.25); box-shadow: 0 8px 20px -8px rgba(54,102,255,0.2); }
.lc-tot.down  { transform: translateY(3px); opacity: 0.55; }
.lc-tot .l    { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5px;
  letter-spacing: 0.14em; text-transform: uppercase; color: #94a3b8; }
.lc-tot .v    { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px;
  font-weight: 900; color: #0b1322; }
.lc-tot.up .v { color: #1e3a8a; }
.lc-tot .d    { display: inline-flex; align-items: center; gap: 3px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 800;
  color: #047857; }
.lc-tot .d.bad { color: #dc2626; }
.lc-scan { position: absolute; left: 0; right: 0; height: 60px;
  background: linear-gradient(180deg, transparent 0%, rgba(54,102,255,0.18) 50%, transparent 100%);
  pointer-events: none; opacity: 0; z-index: 3;
  border-top: 1.5px solid rgba(54,102,255,0.5); border-bottom: 1.5px solid rgba(54,102,255,0.5);
  box-shadow: 0 0 24px rgba(54,102,255,0.45); }
.lc-scan.on { animation: lc-scan 1.4s ease-in-out forwards; }
@keyframes lc-scan { 0% { top: 0%; opacity: 0.9; } 100% { top: 100%; opacity: 0; } }
.lc-pin { position: absolute; top: -10px; right: -8px; padding: 2.5px 6px;
  background: white; border: 1.5px solid #fde68a; color: #b45309;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 800;
  border-radius: 99px; box-shadow: 0 4px 10px -3px rgba(180,83,9,0.25);
  letter-spacing: 0.05em; opacity: 0; transform: scale(0.7);
  transition: opacity .35s, transform .35s; }
.lc-pin.show { opacity: 1; transform: scale(1); }
.lc-pin.dead { opacity: 0.4; text-decoration: line-through; color: #94a3b8;
  border-color: #e2e8f0; }
.lc-trophy { position: absolute; top: -12px; left: -4px; padding: 3.5px 6px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 900;
  border-radius: 99px; display: inline-flex; align-items: center; gap: 3px;
  box-shadow: 0 6px 14px -3px rgba(217,119,6,0.5);
  opacity: 0; transform: translateY(-4px) scale(0.7);
  transition: opacity .4s, transform .4s; }
.lc-trophy.show { opacity: 1; transform: translateY(0) scale(1); }
.lc-legend { display: flex; gap: 8px; padding-top: 4px; border-top: 1px dashed #eef1f6;
  margin-top: auto; flex-wrap: wrap; }
.lc-legend .it { display: inline-flex; align-items: center; gap: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  font-weight: 700; color: #64748b; letter-spacing: 0.04em; }
.lc-legend .sw { width: 9px; height: 9px; border-radius: 2.5px; }
.lc-rail { display: flex; flex-direction: column; gap: 9px; min-width: 0; }
.lc-card { background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
  padding: 10px 11px; box-shadow: 0 6px 20px -8px rgba(15,23,42,0.08); }
.lc-rec-hd { display: flex; align-items: center; gap: 6px; margin-bottom: 7px; }
.lc-rec-hd .b { width: 22px; height: 22px; border-radius: 6px;
  background: linear-gradient(135deg, #0b1322 0%, #1f2a5e 100%); color: #00d196;
  display: grid; place-items: center; box-shadow: 0 0 0 3px rgba(0,209,150,0.15); }
.lc-rec-hd .ttl { font-size: 10.5px; font-weight: 700; color: #0b1322; }
.lc-rec-hd .ttl span { color: #00b884; }
.lc-conf { display: flex; align-items: center; gap: 8px;
  padding: 8px 9px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0; border-radius: 9px; }
.lc-conf .num { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 22px;
  font-weight: 900; color: #047857; line-height: 1; transition: opacity .4s; }
.lc-conf .lbl { font-size: 9.5px; color: #047857; font-weight: 600; line-height: 1.3; }
.lc-conf .lbl strong { font-weight: 800; color: #064e3b; }
.lc-conf .ring { width: 34px; height: 34px; }
.lc-conf.dim .num, .lc-conf.dim .ring { opacity: 0.25; }
.lc-reasons { margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
.lc-reason { font-size: 9.5px; color: #334155; display: flex; align-items: flex-start; gap: 5px;
  opacity: 0; transform: translateX(-4px);
  transition: opacity .35s, transform .35s; line-height: 1.35; }
.lc-reason.in { opacity: 1; transform: translateX(0); }
.lc-reason .ck { width: 11px; height: 11px; border-radius: 50%; background: #d1fae5; color: #047857;
  display: grid; place-items: center; flex-shrink: 0; margin-top: 1px; }
.lc-reason b { color: #0b1322; font-weight: 700; }
.lc-award { margin-top: 9px; padding: 8px 11px; border-radius: 9px;
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%); color: white;
  font-size: 10.5px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 6px;
  box-shadow: 0 8px 18px -6px rgba(245,158,11,0.55);
  transition: transform .25s, opacity .35s; opacity: 0.4; }
.lc-award.glow { opacity: 1; box-shadow: 0 12px 30px -6px rgba(245,158,11,0.75),
  inset 0 1px 0 rgba(255,255,255,0.4); animation: lc-pulseBtn 1.4s ease-in-out infinite; }
@keyframes lc-pulseBtn { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
.lc-kpis { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
.lc-kpi { padding: 6px 8px; background: #fbfcfe; border: 1px solid #eef1f6; border-radius: 8px; }
.lc-kpi .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5px;
  letter-spacing: 0.06em; text-transform: uppercase; color: #94a3b8; font-weight: 700; }
.lc-kpi .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11.5px;
  font-weight: 800; color: #0b1322; margin-top: 1px; }
.lc-kpi .v.good { color: #047857; }
.lc-kpi .v.bad  { color: #b91c1c; }
`;

export default function Section33LandedCostXRay({ isActive = true }: { isActive?: boolean }) {
    const [step, setStep] = useState<number>(0);
    const [isAuto, setIsAuto] = useState<boolean>(true);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        if (document.getElementById('lc-style-v1')) return;
        const el = document.createElement('style');
        el.id = 'lc-style-v1';
        el.textContent = LC_STYLE;
        document.head.appendChild(el);
    }, []);

    useEffect(() => {
        if (!isAuto || !isActive) return;
        const hold = LC_STEPS[step]?.hold || 1200;
        const t = setTimeout(() => setStep((s) => (s + 1) % LC_STEPS.length), hold);
        return () => clearTimeout(t);
    }, [step, isAuto, isActive]);

    const goManual = (menuP: number) => {
        setIsAuto(false);
        if (menuP === 1) setStep(1);
        else if (menuP === 2) setStep(3);
        else if (menuP === 3) setStep(6);
        else setStep(9);
    };

    // Phase flags
    const naive = step <= 2;
    const toggleOn = step >= 3;
    const scanRun = step === 3;
    const showDuty = step >= 4;
    const showFreight = step >= 5;
    const showInsur = step >= 6;
    const fxFlip = step >= 6;
    const winnerOn = step >= 7;
    const aiReveal = step >= 8;
    const awardGlow = step >= 9;

    const visibleKeys: ('q' | 'd' | 'f' | 'i')[] = ['q'];
    if (showDuty) visibleKeys.push('d');
    if (showFreight) visibleKeys.push('f');
    if (showInsur) visibleKeys.push('i');

    const totals: Record<string, number> = Object.fromEntries(LC_VENDORS.map((v) => [v.id, lcSum(v.id, LC_ITEMS, visibleKeys)]));
    const ordered = LC_VENDORS.map((v) => v.id).sort((a, b) => totals[a] - totals[b]);
    const winnerId = ordered[0];

    const allCellMax = (() => {
        let m = 0;
        LC_VENDORS.forEach((v) => LC_ITEMS.forEach((it) => {
            const c = LC_BIDS[v.id][it.id];
            m = Math.max(m, c.q + c.d + c.f + c.i);
        }));
        return m;
    })();

    const activeMenu = stepToMenu(step);

    return (
        <div id="quote-section-3-3" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
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
                    Section 3.3 · Landed Cost Analytics
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Know your True Landed Cost. <br />
                    <span className="text-[#3666ff]">Before you Quote.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    FactWise automatically applies your custom landed cost formulas across every bid — normalizing currencies and factoring in duties, freight, insurance, and packaging. Drill into vendor performance at a glance — competitive, non-competitive, and excluded bids per supplier. FactWise Recommended Analytics surfaces the best bid per item based on your own criteria — so when you quote your customer, every number is backed by true cost, not guesswork.
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
                <div className="lc-root">
                    <div className="lc-chrome">
                        <div className="lc-url">app.factwise.io / compare / RFQ-208</div>
                        <div className="lc-toggleWrap">
                            <div className={`lc-toggle ${toggleOn ? 'act' : ''}`}>
                                <LCI.Calc s={11} />
                                Apply landed-cost formula
                                <span className="sw" />
                            </div>
                        </div>
                    </div>

                    <div className="lc-main">
                        <div className="lc-grid-wrap">
                            <div className="lc-grid-hd">
                                <LCI.Scan s={11} />
                                <span className="l">Bid comparison · per-unit</span>
                                <span className={`mode ${toggleOn ? 'act' : ''}`}>
                                    {toggleOn ? 'LANDED COST · INR' : 'RAW QUOTE'}
                                </span>
                            </div>

                            <div className="lc-tbl">
                                <div />
                                {LC_VENDORS.map((v) => (
                                    <div key={v.id} className="lc-vhead">
                                        <div className="av" style={{ background: v.tone }}>{v.id}</div>
                                        <div className="info">
                                            <div className="n">{v.name}</div>
                                            <div className={`fx ${fxFlip && v.fx !== 'INR' ? 'flip' : ''}`}>
                                                {v.loc} · {fxFlip && v.fx !== 'INR' ? `${v.fx}→INR` : v.fx}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {LC_ITEMS.map((it) => (
                                    <React.Fragment key={it.id}>
                                        <div className="lc-icell">
                                            <span style={{ fontWeight: 700, color: '#0b1322' }}>{it.name}</span>
                                            <span className="qty">qty {it.qty}</span>
                                        </div>
                                        {LC_VENDORS.map((v) => {
                                            const c = LC_BIDS[v.id][it.id];
                                            const totalCell = visibleKeys.reduce((s, k) => s + c[k], 0);
                                            return (
                                                <div key={v.id + it.id} className={`lc-cell ${winnerOn && v.id === winnerId ? 'win' : ''}`}>
                                                    <span className="num">
                                                        {lcInr(totalCell)}
                                                        {toggleOn && (c.d + c.f + c.i) > 0 && (
                                                            <span className="delta"> +{lcInr(totalCell - c.q)}</span>
                                                        )}
                                                    </span>
                                                    <div className="stack">
                                                        {LC_LAYERS.map((L) => {
                                                            if (L.k !== 'q' && !visibleKeys.includes(L.k)) {
                                                                return <div key={L.k} className="layer" style={{ height: 0, background: L.bg }} />;
                                                            }
                                                            const pct = (c[L.k] / allCellMax) * 100;
                                                            return <div key={L.k} className="layer"
                                                                style={{ height: `${pct}%`, background: L.bg, opacity: 0.7 }} />;
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}

                                <div className="lc-icell" style={{ background: 'transparent', border: 'none', padding: '7px 4px' }}>
                                    <span style={{ fontWeight: 800, color: '#0b1322', fontSize: 10.5 }}>Total · 200 units</span>
                                    <span className="qty">3 items rolled up</span>
                                </div>
                                {LC_VENDORS.map((v) => {
                                    const isWin = winnerOn && v.id === winnerId;
                                    const isB = v.id === 'B';
                                    return (
                                        <div key={v.id} className={`lc-tot ${isWin ? 'up' : (winnerOn && isB ? 'down' : '')}`}>
                                            <span className="l">{v.name}</span>
                                            <span className="v">{lcL(totals[v.id])}</span>
                                            <span className={`d ${(toggleOn && isB) ? 'bad' : ''}`}>
                                                {isWin ? '★ TRUE LOW' : isB && naive ? '★ LOWEST' : isB && toggleOn ? '↑ +18% hidden' : ''}
                                            </span>
                                            {v.id === 'B' && (
                                                <span className={`lc-pin ${naive ? 'show' : (toggleOn ? 'show dead' : '')}`}>
                                                    Lowest quote
                                                </span>
                                            )}
                                            {isWin && (
                                                <span className="lc-trophy show"><LCI.Trophy s={10} /> BEST</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="lc-legend">
                                {LC_LAYERS.map((L) => (
                                    <span key={L.k} className="it">
                                        <span className="sw" style={{ background: L.bg, opacity: 0.85 }} />{L.name}
                                    </span>
                                ))}
                                <span className="it" style={{ marginLeft: 'auto', color: '#0b1322' }}>FX → INR · auto</span>
                            </div>

                            {scanRun && <div className="lc-scan on" />}
                        </div>

                        <div className="lc-rail">
                            <div className="lc-card">
                                <div className="lc-rec-hd">
                                    <div className="b"><LCI.Spark s={12} /></div>
                                    <div className="ttl">FW <span>Recommended</span></div>
                                </div>
                                <div className={`lc-conf ${aiReveal ? '' : 'dim'}`}>
                                    <svg viewBox="0 0 36 36" className="ring">
                                        <circle cx="18" cy="18" r="15" fill="none" stroke="#a7f3d0" strokeWidth="3" />
                                        <circle cx="18" cy="18" r="15" fill="none" stroke="#047857" strokeWidth="3.5"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 15}`}
                                            strokeDashoffset={`${2 * Math.PI * 15 * (aiReveal ? (1 - 0.94) : 1)}`}
                                            style={{ transition: 'stroke-dashoffset 1s ease', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                                        />
                                    </svg>
                                    <div>
                                        <div className="num">{aiReveal ? '94%' : '—'}</div>
                                        <div className="lbl"><strong>Confidence · Vendor {winnerId}</strong><br />per your criteria</div>
                                    </div>
                                </div>
                                <div className="lc-reasons">
                                    {[
                                        <><b>True low cost</b> after duty + freight</>,
                                        <><b>0 excluded bids</b> · 4 competitive</>,
                                        <><b>Lead time A+</b> · domestic · 7 days</>,
                                        <><b>Risk score A</b> · 14 prior POs</>,
                                    ].map((r, i) => (
                                        <div key={i} className={`lc-reason ${aiReveal ? 'in' : ''}`}
                                            style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
                                            <span className="ck"><LCI.Check s={7} /></span>{r}
                                        </div>
                                    ))}
                                </div>
                                <div className={`lc-award ${awardGlow ? 'glow' : ''}`}>
                                    <LCI.Trophy s={12} /> Shortlist · {LC_VENDORS.find((v) => v.id === winnerId)?.name} · {lcL(totals[winnerId])}
                                </div>
                            </div>

                            <div className="lc-card" style={{ padding: '10px 11px' }}>
                                <div className="lc-rec-hd" style={{ marginBottom: 6 }}>
                                    <div className="b" style={{ background: '#eff4ff', color: '#3666ff' }}>
                                        <LCI.Calc s={11} />
                                    </div>
                                    <div className="ttl">Bid analytics</div>
                                </div>
                                <div className="lc-kpis">
                                    <div className="lc-kpi"><div className="l">Competitive</div><div className="v good">4</div></div>
                                    <div className="lc-kpi"><div className="l">Excluded</div><div className="v bad">0</div></div>
                                    <div className="lc-kpi"><div className="l">Savings</div><div className="v good">−{totals.B ? ((1 - totals[winnerId] / totals.B) * 100).toFixed(1) : '0'}%</div></div>
                                    <div className="lc-kpi"><div className="l">Cycle</div><div className="v">3 d</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
