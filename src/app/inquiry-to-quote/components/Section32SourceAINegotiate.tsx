'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

/* ──────────────────────────────────────────────────────────────────────
   SECTION 3.2 — Source in Minutes. Negotiate Using AI.
   Layout mirrors ReqSection31 (text-left + animation-right) and the
   animation is a TSX port of reference/21/SourceAINegotiateAnimation.jsx
   with the scripted cursor removed.
   ────────────────────────────────────────────────────────────────────── */

/* ============ ICONS ============ */
const SNI = {
    Chevron: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>),
    Bot: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 13} height={p.s || 13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" /><circle cx="9" cy="14" r="1.4" fill="currentColor" /><circle cx="15" cy="14" r="1.4" fill="currentColor" /><path d="M12 4v4M8 2v2M16 2v2" /></svg>),
    Check: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    Warn: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12" y2="17" /></svg>),
    Mail: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>),
    Bell: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
    Spark: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="currentColor"><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" /></svg>),
    Globe: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 11} height={p.s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" /></svg>),
    Send: (p: { s?: number }) => (<svg viewBox="0 0 24 24" width={p.s || 10} height={p.s || 10} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>),
};

/* ============ DATA ============ */
const SN_VENDORS = [
    { id: 'V1', name: 'Vendor A', tag: 'PCB·SMT', score: 94, region: 'CN', tone: '#3666ff' },
    { id: 'V2', name: 'Vendor B', tag: 'Electronics', score: 91, region: 'IN', tone: '#10b981' },
    { id: 'V3', name: 'Vendor C', tag: 'Motors', score: 88, region: 'DE', tone: '#8b5cf6' },
    { id: 'V4', name: 'Vendor D', tag: 'Tier-2', score: 82, region: 'US', tone: '#3666ff' },
    { id: 'V5', name: 'Vendor E', tag: 'Forging', score: 79, region: 'IN', tone: '#10b981' },
];


const SN_CHAT = [
    { who: 'bot', round: 'R1', text: 'Target landed ₹4.60L. Match or counter?' },
    { who: 'vendor', round: 'R1', text: 'Counter at ₹4.55L · FOB Mumbai' },
    { who: 'bot', round: 'R2', text: 'Quality A · Lead ≤14d locked. Push to ₹4.46L?' },
    { who: 'vendor', round: 'R2', text: 'Counter at ₹4.50L if Net-30' },
    { who: 'bot', round: 'R3', text: 'Net-30 accepted. Final ₹4.39L?' },
    { who: 'vendor', round: 'R3', text: 'Accepted. Locked.' },
];

// 11 phase steps with hold durations (ms). Drives the animation loop.
const SN_STEPS = [
    { hold: 900 },   // 0 — dropdown open
    { hold: 700 },   // 1 — category chosen
    { hold: 1400 },  // 2 — tiles fill
    { hold: 1100 },  // 3 — vendors picked
    { hold: 900 },   // 4 — send pressed
    { hold: 1200 },  // 5 — channel cut, on-platform live
    { hold: 1300 },  // 6 — bot msg 1
    { hold: 1300 },  // 7 — vendor msg 1
    { hold: 1400 },  // 8 — bot msg 2
    { hold: 1400 },  // 9 — vendor msg 2
    { hold: 1100 },  // 10 — locked
];

const STEPS_MENU = [
    { p: 1, title: 'Auto-Compose RFQ' },
    { p: 2, title: 'Submit RFQ' },
    { p: 3, title: 'AI-Powered Negotiation' },
    { p: 4, title: 'Locked at Best Price' },
];

// cursor step → menu step
const stepToMenu = (s: number) => {
    if (s <= 3) return 1;
    if (s <= 5) return 2;
    if (s <= 9) return 3;
    return 4;
};

/* ============ STYLE ============ */
const SN_STYLE = `
.sn-root { position: relative; width: 100%; height: 549px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background: white;
  border-radius: 22px; overflow: hidden; border: 1px solid rgba(15,23,42,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  display: flex; flex-direction: column; min-width: 0; }
.sn-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.sn-url { padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px; color: #64748b; }
.sn-pill { margin-left: auto; display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; background: rgba(54,102,255,0.08); border: 1px solid rgba(54,102,255,0.2); border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700;
  color: #3666ff; letter-spacing: 0.14em; text-transform: uppercase; }
.sn-pill .d { width: 5px; height: 5px; border-radius: 50%; background: #3666ff;
  box-shadow: 0 0 0 3px rgba(54,102,255,0.2); animation: sn-pulse 1.4s ease-in-out infinite; }
@keyframes sn-pulse { 0%,100% { transform: scale(1); opacity: 1;} 50% { transform: scale(1.5); opacity: 0.55;} }

.sn-grid { position: relative; display: grid; grid-template-columns: 1fr 1.05fr;
  flex: 1; min-height: 0; min-width: 0; }
.sn-left { padding: 12px 12px 12px 14px; display: flex; flex-direction: column; gap: 9px;
  border-right: 1px solid #eef1f6; min-width: 0; overflow: hidden; }
.sn-right { padding: 12px 14px 12px 12px; display: flex; flex-direction: column; gap: 9px; min-width: 0; overflow: hidden; }
.sn-card { background: white; border: 1px solid #e9eef5; border-radius: 11px;
  padding: 10px 11px; transition: border-color .4s, box-shadow .4s; }
.sn-card.glow { border-color: rgba(54,102,255,0.4);
  box-shadow: 0 12px 28px -14px rgba(54,102,255,0.35); }
.sn-card-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.sn-card-hd .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #94a3b8; }
.sn-card-hd .v { font-size: 10.5px; font-weight: 700; color: #0b1322; display: inline-flex; align-items: center; gap: 4px; }
.sn-dd { position: relative; display: flex; align-items: center; gap: 6px;
  padding: 7px 9px; background: white; border: 1.5px solid #e9eef5; border-radius: 8px;
  font-size: 11px; font-weight: 600; color: #0b1322; transition: all .3s; }
.sn-dd.act { border-color: #3666ff; box-shadow: 0 0 0 4px rgba(54,102,255,0.1); }
.sn-dd .placeholder { color: #94a3b8; font-weight: 500; }
.sn-dd .chev { margin-left: auto; color: #94a3b8; transition: transform .3s; }
.sn-dd.act .chev { transform: rotate(180deg); color: #3666ff; }
.sn-dd-menu { position: absolute; left: 0; right: 0; top: calc(100% + 4px);
  background: white; border: 1px solid #e9eef5; border-radius: 8px;
  box-shadow: 0 12px 24px -8px rgba(15,23,42,0.15); padding: 4px;
  opacity: 0; transform: translateY(-4px); pointer-events: none;
  transition: opacity .2s, transform .2s; z-index: 3; }
.sn-dd-menu.show { opacity: 1; transform: translateY(0); }
.sn-dd-item { padding: 5px 8px; border-radius: 6px; font-size: 10.5px; font-weight: 500;
  color: #475569; display: flex; align-items: center; justify-content: space-between; }
.sn-dd-item.hov { background: rgba(54,102,255,0.07); color: #3666ff; }
.sn-dd-item .key { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #94a3b8; }
.sn-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
.sn-tile { background: #fafbff; border: 1px dashed #d8e2ff; border-radius: 9px;
  padding: 7px 9px; opacity: 0; transform: translateY(6px);
  transition: opacity .4s, transform .4s, border-color .4s, background .4s; }
.sn-tile.in { opacity: 1; transform: translateY(0); }
.sn-tile.filled { background: rgba(54,102,255,0.06); border-style: solid;
  border-color: rgba(54,102,255,0.3); }
.sn-tile .k { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px;
  font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #94a3b8; }
.sn-tile.filled .k { color: #3666ff; }
.sn-tile .v { margin-top: 2px; font-size: 12px; font-weight: 800; color: #0b1322;
  font-variant-numeric: tabular-nums; }
.sn-tile .s { margin-top: 1px; font-size: 8.5px; color: #94a3b8; }
.sn-warns { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.sn-warn { display: inline-flex; align-items: center; gap: 3px; padding: 2.5px 7px;
  background: #fef3c7; border: 1px solid #fde68a; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 700;
  color: #b45309; opacity: 0; transform: translateY(-3px);
  transition: opacity .4s, transform .4s; }
.sn-warn.in { opacity: 1; transform: translateY(0); }
.sn-vlist { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
.sn-vrow { display: flex; align-items: center; gap: 6px; padding: 5px 7px;
  background: white; border: 1px solid #e9eef5; border-radius: 7px;
  opacity: 0; transform: translateX(-6px);
  transition: opacity .4s, transform .4s, border-color .4s, box-shadow .4s; }
.sn-vrow.in { opacity: 1; transform: translateX(0); }
.sn-vrow.picked { box-shadow: 0 6px 14px -8px rgba(54,102,255,0.35); }
.sn-vrow .av { width: 18px; height: 18px; border-radius: 4.5px; color: white;
  display: grid; place-items: center; font-size: 8px; font-weight: 800; flex-shrink: 0; }
.sn-vrow .info { min-width: 0; flex: 1; }
.sn-vrow .info .n { font-size: 9.5px; font-weight: 700; color: #0b1322; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }
.sn-vrow .info .t { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.sn-vrow .score { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px;
  font-weight: 800; color: #00b884; flex-shrink: 0; }
.sn-send { display: flex; align-items: center; gap: 7px; justify-content: center;
  padding: 9px 12px; background: linear-gradient(180deg, #4A6FFF 0%, #2f59ff 100%);
  color: white; border-radius: 9px; font-size: 11px; font-weight: 700;
  box-shadow: 0 8px 18px -6px rgba(54,102,255,0.5);
  transition: transform .25s; }
.sn-send.pressed { transform: scale(0.97); }
.sn-chans { display: flex; gap: 7px; }
.sn-chan { flex: 1; position: relative; padding: 6px 8px; border-radius: 7px;
  background: white; border: 1px solid #e9eef5; display: flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 600; color: #475569; transition: all .4s; }
.sn-chan.dead { color: #cbd5e1; background: #fafbff; }
.sn-chan.dead::before { content: ""; position: absolute; left: 9px; right: 9px; top: 50%;
  height: 1.5px; background: #ef4444; transform: scaleX(0); transform-origin: left;
  transition: transform .55s ease; }
.sn-chan.dead.cut::before { transform: scaleX(1); }
.sn-chan.live { background: #ecfdf5; border-color: #a7f3d0; color: #047857; }
.sn-chan .ico { display: grid; place-items: center; width: 17px; height: 17px;
  border-radius: 5px; background: #f4f6fa; color: inherit; }
.sn-chan.live .ico { background: #d1fae5; }
.sn-chan .badge { margin-left: auto; padding: 1px 5px; border-radius: 99px;
  background: #d1fae5; color: #047857; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8px; font-weight: 800; opacity: 0; transition: opacity .4s; }
.sn-chan.live .badge { opacity: 1; }
.sn-stage { background: white; border: 1px solid #e9eef5; border-radius: 11px; padding: 10px 11px;
  display: flex; flex-direction: column; gap: 7px; flex: 1; min-height: 0;
  box-shadow: 0 8px 24px -10px rgba(15,23,42,0.08); }
.sn-stage-hd { display: flex; align-items: center; gap: 7px; }
.sn-stage-hd .b { width: 22px; height: 22px; border-radius: 6px;
  background: #3666ff; color: white;
  display: grid; place-items: center; box-shadow: 0 0 0 3px rgba(54,102,255,0.15); }
.sn-stage-hd .ttl { font-size: 11px; font-weight: 700; color: #0b1322; }
.sn-stage-hd .ttl span { color: #3666ff; }
.sn-stage-hd .rnd { margin-left: auto; padding: 2px 7px; border-radius: 99px;
  background: rgba(54,102,255,0.08); color: #3666ff; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 800; letter-spacing: 0.06em; }
.sn-split { display: flex; flex-direction: column;
  flex: 1; min-height: 0; }
.sn-chat { display: flex; flex-direction: column; gap: 4px; padding-right: 4px;
  overflow: hidden; min-height: 0; min-width: 0; }
.sn-msg { display: flex; gap: 5px; opacity: 0; transform: translateY(4px);
  transition: opacity .35s, transform .35s; }
.sn-msg.in { opacity: 1; transform: translateY(0); }
.sn-msg .bub { padding: 5px 8px; border-radius: 9px; font-size: 9.5px; line-height: 1.35;
  max-width: 85%; font-weight: 500; }
.sn-msg.bot .av { width: 16px; height: 16px; border-radius: 50%;
  background: #3666ff;
  display: grid; place-items: center; color: white; flex-shrink: 0; }
.sn-msg.bot .bub { background: rgba(54,102,255,0.08); color: #1d4ed8; border-bottom-left-radius: 3px; }
.sn-msg.vendor { justify-content: flex-end; }
.sn-msg.vendor .bub { background: #f6f8fc; color: #1A1D2E; border: 1px solid #e9eef5;
  border-bottom-right-radius: 3px; }
.sn-msg.vendor .av { order: 2; width: 16px; height: 16px; border-radius: 50%;
  background: #3666ff; color: white; display: grid; place-items: center;
  font-size: 7.5px; font-weight: 800; flex-shrink: 0; }
.sn-msg .bub .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800; }
.sn-msg .bub .tag { display: inline-block; margin-right: 3px; padding: 0.5px 4px;
  background: rgba(54,102,255,0.12); color: #3666ff; border-radius: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 800; }
.sn-msg.vendor .bub .tag { background: #dbeafe; color: #1d4ed8; }
.sn-ticker { background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%); border: 1px solid #e2e8f0;
  border-radius: 9px; padding: 10px 10px; display: flex; flex-direction: column; gap: 6px;
  color: #0b1322; min-width: 0; }
.sn-ticker .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  letter-spacing: 0.16em; text-transform: uppercase; color: #94a3b8; }
.sn-ticker .price { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 19px;
  font-weight: 900; color: #059669; line-height: 1; transition: color .3s; }
.sn-ticker .delta { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  font-weight: 800; color: #059669; }
.sn-svgWrap { background: #f1f5f9; border-radius: 7px; padding: 3px;
  flex: 1; min-height: 60px; position: relative; overflow: hidden; }
.sn-svgWrap svg { width: 100%; height: 100%; }
.sn-crit { display: flex; flex-wrap: wrap; gap: 4px; padding-top: 4px; }
.sn-crit .chip { padding: 1.5px 6px; border-radius: 99px; background: #f1f5f9;
  color: #64748b; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px;
  font-weight: 700; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 2.5px;
  transition: all .3s; border: 1px solid #e2e8f0; }
.sn-crit .chip.act { background: rgba(16,185,129,0.1); color: #059669;
  border-color: rgba(16,185,129,0.35); }
.sn-foot { padding: 8px 13px 9px; background: white; border-top: 1px solid rgba(15,23,42,0.06);
  display: flex; align-items: center; gap: 10px; }
.sn-foot .seal { display: flex; align-items: center; gap: 5px; padding: 3px 8px;
  background: white; border: 1px solid #e9eef5; border-radius: 99px;
  font-size: 9.5px; font-weight: 600; color: #475569; }
.sn-foot .stamp { margin-left: auto; padding: 4px 9px; border-radius: 7px;
  background: #ecfdf5; border: 1.5px solid #a7f3d0; color: #047857;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; font-weight: 900;
  letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;
  opacity: 0; transform: scale(0.92); transition: opacity .35s, transform .35s; }
.sn-foot .stamp.in { opacity: 1; transform: scale(1); }
`;

/* ============ COMPONENT ============ */
export default function Section32SourceAINegotiate({ isActive = true }: { isActive?: boolean }) {
  const t = useLocalizedText();
    const [step, setStep] = useState<number>(0);
    const [isAuto, setIsAuto] = useState<boolean>(true);

    // Inject styles once
    useEffect(() => {
        if (typeof document === 'undefined') return;
        if (document.getElementById('sn-style-v1')) return;
        const el = document.createElement('style');
        el.id = 'sn-style-v1';
        el.textContent = SN_STYLE;
        document.head.appendChild(el);
    }, []);

    // Auto-cycle through cursor steps when active + auto
    useEffect(() => {
        if (!isAuto || !isActive) return;
        const hold = SN_STEPS[step]?.hold || 1200;
        const t = setTimeout(() => {
            setStep((s) => (s + 1) % SN_STEPS.length);
        }, hold);
        return () => clearTimeout(t);
    }, [step, isAuto, isActive]);

    // Click a left-menu step → jump to a representative animation step + pause
    const goManual = (menuP: number) => {
        setIsAuto(false);
        if (menuP === 1) setStep(3);          // RFQ composed
        else if (menuP === 2) setStep(5);     // channel cut
        else if (menuP === 3) setStep(9);     // chat in progress
        else setStep(10);                     // locked
    };

    // Phase flags
    const ddOpen = step === 0 || step === 1;
    const categoryChosen = step >= 1;
    const tilesIn = step >= 2;
    const tilesFilled = step >= 2;
    const vendorsIn = step >= 2;
    const vendorsPicked = step >= 3;
    const sendPressed = step === 4;
    const channelCut = step >= 5;
    const messagesShown = Math.max(0, step - 5);
    const round = step < 7 ? 'R1' : step < 9 ? 'R2' : 'R3';
    const lockedIn = step === 10;

    const activeMenu = stepToMenu(step);

    return (
        <div id="quote-section-3-2" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            {/* LEFT: text + step list */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6 text-left"
            >
                <div
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                    {t('Section 3.2 · Intelligent Sourcing')}
                </div>
                <h3
                    className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {t('Source in Minutes.')} <br />
                    <span className="text-[#3666ff]">{t('Negotiate Using AI.')}</span>
                </h3>
                <p
                    className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    {t('FactWise auto-selects vendors from manufacturer tags and part history, pre-fills target prices, and flags warnings before you send. Category templates get your event live in minutes — and vendors respond directly on the platform.')}
                </p>
                <p
                    className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    {t("When it's time to negotiate, FactWise's AI drives every vendor to their best price against your criteria — or take control yourself. Every counter-offer tracked, every round visible. Better prices, every time.")}
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
                                }`}>{t(item.title)}</span>
                            </div>
                            {activeMenu === item.p && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />{t('Active')}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* RIGHT: animation card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 75, damping: 14 }}
                className="lg:col-span-6 order-2 lg:order-2 relative"
            >
                <div className="sn-root">
                    <div className="sn-chrome">
                        <div className="sn-url">{t('app.factwise.io / sourcing / new-event')}</div>
                        <div className="sn-pill"><span className="d" />{t('FW Autobot · AI Negotiating')}</div>
                    </div>

                    <div className="sn-grid">
                        {/* LEFT — event setup */}
                        <div className="sn-left">
                            {/* Category dropdown */}
                            <div className={`sn-card ${categoryChosen ? 'glow' : ''}`}>
                                <div className="sn-card-hd">
                                    <span className="l">{t('01 · Category')}</span>
                                    <span className="v" style={{ color: categoryChosen ? '#3666ff' : '#94a3b8' }}>
                                        {categoryChosen ? t('Template loaded') : t('Choose template')}
                                    </span>
                                </div>
                                <div className={`sn-dd ${ddOpen ? 'act' : ''}`}>
                                    {!categoryChosen && <span className="placeholder">{t('Select category…')}</span>}
                                    {categoryChosen && <span>{t('Electronics · PCB · SMT')}</span>}
                                    <span className="chev"><SNI.Chevron s={11} /></span>
                                    <div className={`sn-dd-menu ${ddOpen ? 'show' : ''}`}>
                                        <div className={`sn-dd-item ${step === 1 ? 'hov' : ''}`}>
                                            <span>{t('Electronics · PCB · SMT')}</span><span className="key">12 {t('items')}</span>
                                        </div>
                                        <div className="sn-dd-item">
                                            <span>{t('Mechanical · Forging')}</span><span className="key">8 {t('items')}</span>
                                        </div>
                                        <div className="sn-dd-item">
                                            <span>{t('Logistics · 3PL')}</span><span className="key">4 {t('items')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Auto-filled tiles */}
                            <div className="sn-card">
                                <div className="sn-card-hd">
                                    <span className="l">{t('02 · Auto-filled')}</span>
                                    <span className="v" style={{ color: tilesFilled ? '#3666ff' : '#94a3b8' }}>
                                        <SNI.Spark s={10} /> {t('from history')}
                                    </span>
                                </div>
                                <div className="sn-tiles">
                                    {[
                                        { k: 'Target price', v: '₹4.60L', s: 'last 6m avg' },
                                        { k: 'Line items', v: '12', s: 'BOM pulled' },
                                        { k: 'Closes in', v: '48h', s: 'auto reminders' },
                                    ].map((tile, i) => (
                                        <div key={i} className={`sn-tile ${tilesIn ? 'in' : ''} ${tilesFilled ? 'filled' : ''}`}
                                            style={{ transitionDelay: `${i * 0.08}s` }}>
                                        <div className="k">{t(tile.k)}</div>
                                        <div className="v">{tile.v}</div>
                                        <div className="s">{t(tile.s)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="sn-warns">
                                    {[
                                        'Price floor: −8% historic',
                                        'Lead time risk: V4',
                                        'Currency: 3 FX needed',
                                    ].map((w, i) => (
                                        <div key={i} className={`sn-warn ${tilesFilled ? 'in' : ''}`}
                                            style={{ transitionDelay: `${0.35 + i * 0.08}s` }}>
                                            <SNI.Warn s={9} />{t(w)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Vendor auto-pick */}
                            <div className="sn-card">
                                <div className="sn-card-hd">
                                    <span className="l">{t('03 · Vendors auto-picked')}</span>
                                    <span className="v" style={{ color: vendorsPicked ? '#3666ff' : '#94a3b8' }}>
                                        {t('by tag + history')}
                                    </span>
                                </div>
                                <div className="sn-vlist">
                                    {SN_VENDORS.map((v, i) => (
                                        <div key={v.id} className={`sn-vrow ${vendorsIn ? 'in' : ''} ${vendorsPicked ? 'picked' : ''}`}
                                            style={{ transitionDelay: `${0.5 + i * 0.07}s`, borderColor: vendorsPicked ? `${v.tone}66` : '#e9eef5' }}>
                                            <div className="av" style={{ background: v.tone }}>{v.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
                                            <div className="info">
                                                <div className="n">{v.name}</div>
                                                <div className="t">{v.tag} · {v.region}</div>
                                            </div>
                                            <div className="score">{v.score}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Send button */}
                            <div className={`sn-send ${sendPressed ? 'pressed' : ''}`}>
                                <SNI.Send s={11} />{t('Send Event · invite 5 vendors')}
                            </div>
                        </div>

                        {/* RIGHT — channels + AI negotiation */}
                        <div className="sn-right">
                            {/* Channels */}
                            <div className="sn-card" style={{ padding: '9px 11px' }}>
                                <div className="sn-card-hd">
                                    <span className="l">{t('04 · Channel')}</span>
                                    <span className="v" style={{ color: channelCut ? '#047857' : '#94a3b8' }}>
                                        <SNI.Bell s={9} /> {t('Auto-reminders on')}
                                    </span>
                                </div>
                                <div className="sn-chans">
                                    <div className={`sn-chan dead ${channelCut ? 'cut' : ''}`}>
                                        <span className="ico"><SNI.Mail s={11} /></span>
                                        {t('Email back-and-forth')}
                                    </div>
                                    <div className={`sn-chan ${channelCut ? 'live' : ''}`}>
                                        <span className="ico"><SNI.Globe s={11} /></span>
                                        {t('On-platform reply')}
                                        <span className="badge">{t('LIVE')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* AI Stage */}
                            <div className="sn-stage">
                                <div className="sn-stage-hd">
                                    <div className="b"><SNI.Bot s={13} /></div>
                                    <div className="ttl">FW Autobot <span>{t('· auto-negotiating')}</span></div>
                                    <div className="rnd">{round}</div>
                                </div>

                                <div className="sn-split">
                                    {/* Chat */}
                                    <div className="sn-chat">
                                        {SN_CHAT.map((m, i) => (
                                            <div key={i} className={`sn-msg ${m.who} ${i < messagesShown ? 'in' : ''}`}
                                                style={{ transitionDelay: `${i * 0.04}s` }}>
                                                {m.who === 'bot' && <div className="av"><SNI.Bot s={10} /></div>}
                                                <div className="bub">
                                                    <span className="tag">{m.round}</span>
                                                    {m.text.split(/(₹[\d.]+L?)/).map((part, j) => /₹/.test(part)
                                                        ? <span key={j} className="mono">{part}</span>
                                                        : <React.Fragment key={j}>{t(part)}</React.Fragment>)}
                                                </div>
                                                {m.who === 'vendor' && <div className="av">V</div>}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sn-foot">
                        <div className="seal"><SNI.Bot s={11} /> {t('Negotiation · 3 rounds')}</div>
                        <div className={`stamp ${lockedIn ? 'in' : ''}`}>
                            <SNI.Check s={10} /> {t('LOCKED · ₹4.39L · saved 4.6%')}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
