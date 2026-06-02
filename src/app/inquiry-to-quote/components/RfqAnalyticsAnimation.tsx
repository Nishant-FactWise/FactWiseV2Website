'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ============ TYPES ============ */
interface RfqAnalyticsAnimationProps {
  speed?: number;
  isAuto?: boolean;
  controlledPhase?: number | null;
  activeMenuStep?: number | null;
  onPhaseChange?: (phase: number) => void;
  onToggleAuto?: () => void;
}

interface BidDetail {
  /** Per-piece quote in INR-equivalent — used for all maths once normalised. */
  q: number;
  /** Per-piece quote in the vendor's native currency — shown before normalisation. */
  qNative: number;
  /** Duty, insurance, packaging in INR (per piece). */
  d: number;
  i: number;
  p: number;
}

interface Bidder {
  fx: string;
  flag: string;
  name: string;
  L1: BidDetail;
  L2: BidDetail;
  [key: string]: string | BidDetail;
}

interface SvgProps {
  s?: number;
}

/* ============ ICONS ============ */
const RAI = {
  BarChart: ({ s }: SvgProps) => (
    <svg viewBox="0 0 24 24" width={s || 12} height={s || 12} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Trophy: ({ s }: SvgProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a4 4 0 0 1 4 4v7H8V6a4 4 0 0 1 4-4z" />
    </svg>
  ),
  Check: ({ s }: SvgProps) => (
    <svg viewBox="0 0 24 24" width={s || 10} height={s || 10} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Sparkle: ({ s }: SvgProps) => (
    <svg viewBox="0 0 24 24" width={s || 10} height={s || 10} fill="currentColor">
      <path d="M12 3l1.8 4.4L18.4 9 13.8 10.6 12 15l-1.8-4.4L5.6 9l4.6-1.6L12 3zM19 14l.9 2.2 2.2.9-2.2.9L19 19.2 18.1 17l-2.2-.9 2.2-.9L19 14zM5 14l.9 2.2 2.2.9-2.2.9L5 19.2 4.1 17l-2.2-.9 2.2-.9L5 14z"/>
    </svg>
  ),
  Play: ({ s }: SvgProps) => (
    <svg viewBox="0 0 24 24" width={s || 12} height={s || 12} fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
  ),
  Pause: ({ s }: SvgProps) => (
    <svg viewBox="0 0 24 24" width={s || 12} height={s || 12} fill="currentColor">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
};

/* ============ DATA ============ */
const RA_LI = [
  { id: 'L1' as const, name: 'Pump Body', qty: 200 },
  { id: 'L2' as const, name: 'Stator Winding', qty: 200 },
];

// FX rates used to convert native quotes → INR. Surfaced in the breadcrumb so
// the conversion isn't a black box for the reader.
const FX_USD_INR = 83.0;
const FX_EUR_INR = 90.5;

const RA_BIDS: Record<string, Bidder> = {
  A: {
    fx: 'INR', flag: 'IN', name: 'Vendor A',
    // Domestic vendor — native = INR, so qNative === q. Minimal landed add-ons.
    L1: { q: 1240, qNative: 1240, d: 0, i: 18, p: 22 },
    L2: { q: 920,  qNative: 920,  d: 0, i: 14, p: 18 },
  },
  B: {
    fx: 'INR', flag: 'CN', name: 'Vendor B',
    // Native INR quote × FX 83 ≈ INR. Heavy duty/insurance/packaging burden.
    L1: { q: 1180, qNative: 14.22, d: 248, i: 62, p: 58 },
    L2: { q:  880, qNative: 10.60, d: 186, i: 48, p: 44 },
  },
  C: {
    fx: 'EUR', flag: 'DE', name: 'Vendor C',
    // Native EUR quote × FX 90.5 ≈ INR. Moderate landed add-ons.
    L1: { q: 1290, qNative: 14.25, d: 148, i: 44, p: 38 },
    L2: { q:  960, qNative: 10.61, d: 112, i: 34, p: 30 },
  },
};

const RA_KEYS = ['A', 'B', 'C'];

/** Sum of per-piece INR-equivalent quotes across all line items. */
const raSumQuote = (k: string) => RA_LI.reduce((s, li) => {
  const bid = RA_BIDS[k][li.id] as BidDetail;
  return s + bid.q;
}, 0);

/** Sum of per-piece native-currency quotes across all line items. */
const raSumNativeQuote = (k: string) => RA_LI.reduce((s, li) => {
  const bid = RA_BIDS[k][li.id] as BidDetail;
  return s + bid.qNative;
}, 0);

const raInr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/**
 * Money formatter that respects whether we are *before* or *after* INR
 * normalisation. Small native unit prices (e.g. ₹14.22) keep two decimals so
 * the per-piece quote looks like a real quote slip; larger aggregates (totals
 * × 200) round to whole units so they stay legible.
 */
const raFormatPrice = (n: number, k: string, showNativeFirst: boolean) => {
  if (showNativeFirst) {
    const bid = RA_BIDS[k];
    if (bid.fx === 'INR') return '₹' + Math.round(n).toLocaleString('en-IN');
    if (bid.fx === 'INR') return '$' + (n >= 100 ? Math.round(n).toLocaleString('en-US') : n.toFixed(2));
    if (bid.fx === 'EUR') return '€' + (n >= 100 ? Math.round(n).toLocaleString('en-DE') : n.toFixed(2));
  }
  return '₹' + Math.round(n).toLocaleString('en-IN');
};

/* ============ STYLE ============ */
const RA_STYLE = `
.ra-body {
  position: relative; display: flex; flex-direction: column; gap: 10px;
  flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden;
  margin-top: 12px; padding-bottom: 80px;
  scrollbar-width: none; -ms-overflow-style: none;
}
.ra-body::-webkit-scrollbar { display: none; }
.ra-crumb { display: flex; align-items: center; gap: 5px; flex-wrap: wrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5px; color: #94a3b8;
  animation: ra-fadeIn .35s ease both; }
.ra-tok { padding: 2px 7px; border-radius: 5px; font-weight: 700; border: 1px solid transparent;
  background: #f8fafc; color: #cbd5e1; transition: all .3s ease; letter-spacing: 0.02em; }
.ra-tok.on.slate  { background: #f1f5f9; color: #334155; border-color: #cbd5e1; }
.ra-tok.on.amber  { background: #fef6e7; color: #b45309; border-color: #fde3ad; }
.ra-tok.on.violet { background: #f3f0ff; color: #6d28d9; border-color: #ddd5ff; }
.ra-tok.on.cyan   { background: #ecfeff; color: #0e7490; border-color: #a5f3fc; }
.ra-tok.on.rose   { background: #fff1f3; color: #be123c; border-color: #fecdd3; }
.ra-crumb .plus { color: #cbd5e1; font-weight: 700; }
.ra-crumb .norm { margin-left: 4px; font-size: 9px; color: #94a3b8; font-family: 'Inter', system-ui, sans-serif; font-weight: 500; }
.ra-grid { background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; position: relative; }
.ra-ghead { display: grid; grid-template-columns: 1.3fr repeat(3, 1fr); background: #f8fafc; border-bottom: 1px solid #e2e8f0; position: relative; z-index: 10; }
.ra-ghead > div { padding: 7px 8px; text-align: center; border-left: 1px solid #e2e8f0; }
.ra-ghead > div:first-child { text-align: left; border-left: none; padding-left: 12px; }
.ra-ghead .vCol { display: flex; flex-direction: column; gap: 1px; align-items: center; transition: background .35s ease, color .35s ease; position: relative; z-index: 10; }
.ra-ghead .vCol.naive { background: #eff4ff; }
.ra-ghead .vCol.true  { background: #ecfdf5; }
.ra-ghead .vCol.scanning { background: rgba(54,102,255,0.08); }
.ra-ghead .vCol.awarded { background: #ecfdf5; animation: ra-awardedPop .5s cubic-bezier(.34,1.56,.64,1) both; }
.ra-ghead .vCol .vMain { display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.01em; color: #334155; }
.ra-ghead .vCol.naive .vMain { color: #1e40af; }
.ra-ghead .vCol.true  .vMain { color: #047857; }
.ra-ghead .vCol.awarded .vMain { color: #047857; }
.ra-ghead .vCol .vFlag { width: 15px; height: 15px; border-radius: 3px; background: #e2e8f0; color: #64748b; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; display: grid; place-items: center; font-weight: 800; letter-spacing: 0; }
.ra-ghead .vCol .vFx { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; letter-spacing: 0.04em; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
.ra-ghead .vCol .vCat {
  margin-top: 2px; font-size: 7px; font-weight: 800; letter-spacing: 0.05em;
  text-transform: uppercase; padding: 1.5px 5px; border-radius: 99px;
  border: 1px solid transparent; opacity: 0; transform: translateY(-2px);
  transition: opacity .4s ease, transform .4s ease;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis;
}
.ra-ghead .vCol .vCat.in { opacity: 1; transform: translateY(0); animation: ra-catPop .45s cubic-bezier(.34,1.56,.64,1) both; }
.ra-ghead .vCol .vCat.competitive   { background: #ecfdf5; color: #047857; border-color: #6ee7b7; }
.ra-ghead .vCol .vCat.noncomp       { background: #fef6e7; color: #b45309; border-color: #fde3ad; }
.ra-ghead .vCol .vCat.excluded      { background: #f1f5f9; color: #64748b; border-color: #cbd5e1; text-decoration: line-through; }
@keyframes ra-catPop { 0% { opacity: 0; transform: translateY(-4px) scale(0.85); } 60% { opacity: 1; transform: translateY(0) scale(1.06); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
.ra-grow { display: grid; grid-template-columns: 1.3fr repeat(3, 1fr); border-bottom: 1px solid #f1f5f9; }
.ra-grow.in { animation: ra-rowIn .38s cubic-bezier(.22,1,.36,1) both; }
.ra-liCell { padding: 9px 12px; display: flex; align-items: center; gap: 8px; text-align: left; }
.ra-liCell .leaf { width: 6px; height: 6px; border-radius: 50%; background: #3666ff; flex-shrink: 0; }
.ra-liCell .liName { font-size: 10.5px; font-weight: 700; color: #1e293b; line-height: 1.2; letter-spacing: -0.005em; }
.ra-liCell .liQty  { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; color: #94a3b8; font-weight: 600; margin-top: 1px; letter-spacing: 0.04em; }
.ra-bid { padding: 8px 12px; border-left: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; min-height: 88px; transition: background .35s ease; }
.ra-bid.naive { background: rgba(239,244,255,0.5); }
.ra-bid.true  { background: rgba(236,253,245,0.5); }
.ra-bid.scanning { background: rgba(54,102,255,0.06); }
.ra-bid.awarded { background: rgba(236,253,245,0.8); }
.ra-bid .line { display: inline-flex; align-items: center; gap: 3px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; animation: ra-pop .38s cubic-bezier(.34,1.56,.64,1) both; }
.ra-bid .line.base { font-size: 11.5px; font-weight: 700; color: #334155; letter-spacing: -0.01em; }
.ra-bid .line.duty { font-size: 9px; font-weight: 600; color: #b45309; }
.ra-bid .line.ins  { font-size: 9px; font-weight: 600; color: #0e7490; }
.ra-bid .line.pkg  { font-size: 9px; font-weight: 600; color: #be123c; }
.ra-bid .line .lbl { opacity: 0.65; font-size: 8.5px; font-family: 'Inter', system-ui, sans-serif; font-weight: 600; letter-spacing: 0; }
.ra-bid .tot { margin-top: auto; padding-top: 5px; border-top: 1px dashed #e2e8f0; font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800; font-size: 10.5px; color: #1e293b; width: 100%; text-align: right; letter-spacing: -0.01em; }
.ra-bid.naive .tot { color: #1e40af; }
.ra-bid.true  .tot { color: #047857; }
.ra-totalRow { display: grid; grid-template-columns: 1.3fr repeat(3, 1fr); background: #f8fafc; border-top: 1px solid #e2e8f0; animation: ra-fadeIn .4s ease both; }
.ra-totalRow .lbl { padding: 10px 14px; font-size: 9px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; display: flex; align-items: center; gap: 6px; text-align: left; }
.ra-totalCell { padding: 10px 12px; text-align: right; border-left: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; transition: background .35s ease; }
.ra-totalCell.naive { background: #dbe5ff; }
.ra-totalCell.true  { background: #bbf2db; }
.ra-totalCell.scanning { background: rgba(54,102,255,0.08); }
.ra-totalCell.awarded { background: #bbf2db; }
.ra-totalCell .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800; font-size: 12.5px; color: #334155; letter-spacing: -0.02em; }
.ra-totalCell.naive .v { color: #1e3a8a; }
.ra-totalCell.true  .v { color: #047857; }
.ra-totalCell.awarded .v { color: #047857; }
.ra-totalCell .winTag { margin-top: 3px; font-size: 7.5px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 3px; animation: ra-pop .35s cubic-bezier(.34,1.56,.64,1) both; }
.ra-totalCell.naive .winTag { color: #1e40af; }
.ra-totalCell.true  .winTag { color: #047857; }
.ra-totalCell.awarded .winTag { color: #047857; }
.ra-scanOverlay { position: absolute; top: 0; bottom: 0; width: 33.33%; background: rgba(54,102,255,0.07); border-left: 2px solid rgba(54,102,255,0.3); border-right: 2px solid rgba(54,102,255,0.3); pointer-events: none; transition: left .55s cubic-bezier(.22,1,.36,1); }
.ra-scanOverlay::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, #3666ff, transparent); animation: ra-scanLine 1.2s ease-in-out infinite; }
@keyframes ra-scanLine { 0% { top: 0; opacity: 1; } 100% { top: 100%; opacity: 0; } }
.ra-awardedOverlay { position: absolute; top: 0; bottom: 0; width: 33.33%; left: 0; background: rgba(34,197,94,0.12); border-left: 3px solid #22c55e; border-right: 3px solid #22c55e; border-radius: 0; pointer-events: none; z-index: 1; animation: ra-awardedPop .6s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes ra-awardedPop { 0% { opacity: 0; transform: scaleY(0.92); } 60% { opacity: 1; transform: scaleY(1.02); } 100% { opacity: 1; transform: scaleY(1); } }
.ra-awardedBadge { position: absolute; top: -14px; left: 0; width: 33.33%; display: flex; justify-content: center; animation: ra-pop .5s cubic-bezier(.34,1.56,.64,1) .3s both; pointer-events: none; z-index: 10; }
.ra-awardedBadge .ab-inner {
  background: linear-gradient(135deg, #3666ff 0%, #1d4ed8 60%, #15803d 100%);
  color: white; font-size: 8px; font-weight: 800; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 3px 10px; border-radius: 99px;
  box-shadow: 0 6px 14px rgba(54,102,255,0.45), 0 0 0 3px rgba(54,102,255,0.12);
  display: flex; align-items: center; gap: 5px;
  position: relative; overflow: hidden;
}
.ra-awardedBadge .ab-inner::after {
  content: ''; position: absolute; inset: -50%;
  background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
  animation: ra-shimmer 2.2s linear infinite;
}
@keyframes ra-shimmer { 0% { transform: translateX(-60%); } 100% { transform: translateX(60%); } }

/* ── Narrative card ── */
.ra-narrative {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; align-items: flex-start; gap: 11px;
  padding: 11px 15px; background: white;
  border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  animation: ra-narrativeSlide .45s cubic-bezier(.22,1,.36,1) both;
}
@keyframes ra-narrativeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.ra-pulsingDot { width: 6px; height: 6px; border-radius: 50%; background: #3666ff; margin-top: 5px; flex-shrink: 0; animation: ra-pulse 1.6s ease-in-out infinite; }
.ra-narrativeText { font-size: 10.5px; font-weight: 500; color: #64748b; line-height: 1.55; text-align: left; }
@keyframes ra-fadeIn   { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ra-rowIn    { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ra-pop      { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes ra-pulse    { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
`;

export default function RfqAnalyticsAnimation({
  speed = 1,
  isAuto = true,
  controlledPhase = null,
  activeMenuStep = null,
  onPhaseChange,
  onToggleAuto,
}: RfqAnalyticsAnimationProps) {

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const VERSION = 'ra-v6';
    if (document.getElementById(VERSION)) return;
    ['ra-style','ra-v1','ra-v2','ra-v3','ra-v4','ra-v5'].forEach(id => document.getElementById(id)?.remove());
    const s = document.createElement('style');
    s.id = VERSION; s.textContent = RA_STYLE;
    document.head.appendChild(s);
  }, []);

  const [localPhase, setLocalPhase] = useState(0);
  const [localPopulated, setLocalPopulated] = useState(0);
  const [localLayers, setLocalLayers] = useState(0);
  const [localShowTrue, setLocalShowTrue] = useState(false);
  const [localWinner, setLocalWinner] = useState<string | null>(null);
  const [localScanCol, setLocalScanCol] = useState(0);
  // narrativeKey forces re-animation of the narrative card when step changes
  const [narrativeKey, setNarrativeKey] = useState(0);

  const cancelRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevMenuStepRef = useRef<number>(0);
  const onPhaseChangeRef = useRef(onPhaseChange);
  useEffect(() => { onPhaseChangeRef.current = onPhaseChange; });

  // Auto-scroll
  useEffect(() => {
    if (!bodyRef.current) return;
    if (localPhase >= 8) bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    else bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [localPhase]);

  useEffect(() => {
    if (!bodyRef.current || isAuto) return;
    if ((controlledPhase ?? 0) >= 8) bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    else bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [controlledPhase, isAuto]);

  // Bump narrativeKey whenever activeMenuStep changes so narrative re-animates
  useEffect(() => {
    const currentStep = !isAuto && activeMenuStep !== null ? activeMenuStep : 0;
    if (currentStep !== prevMenuStepRef.current) {
      prevMenuStepRef.current = currentStep;
      setNarrativeKey(k => k + 1);
    }
  }, [activeMenuStep, isAuto]);

  // Autoplay loop
  useEffect(() => {
    if (!isAuto) return;
    cancelRef.current = false;
    const mul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms / mul));

    async function run() {
      while (!cancelRef.current) {
        // ── reset ─────────────────────────────────────────────
        setLocalPhase(0); setLocalPopulated(0); setLocalLayers(0);
        setLocalShowTrue(false); setLocalWinner(null); setLocalScanCol(0);
        onPhaseChangeRef.current?.(0);
        await sleep(900);

        // ── STEP 1: vendor bids arrive (native currencies) ────
        if (cancelRef.current) return;
        setLocalPhase(1); onPhaseChangeRef.current?.(1);
        for (let i = 1; i <= RA_LI.length; i++) {
          if (cancelRef.current) return;
          setLocalPopulated(i); await sleep(350);
        }
        await sleep(500);
        if (cancelRef.current) return;
        setLocalPhase(2); setLocalWinner('B'); onPhaseChangeRef.current?.(2);
        await sleep(2000);

        // ── STEP 2: custom landed cost formula auto-applied ───
        if (cancelRef.current) return;
        setLocalPhase(3); onPhaseChangeRef.current?.(3); await sleep(800);
        // 3 layers: Duty, Insurance, Packaging
        for (let l = 1; l <= 3; l++) {
          if (cancelRef.current) return;
          setLocalLayers(l); setLocalPhase(3 + l); onPhaseChangeRef.current?.(3 + l); await sleep(900);
        }
        if (cancelRef.current) return;
        setLocalShowTrue(true); setLocalPhase(7); onPhaseChangeRef.current?.(7); await sleep(1700);

        // ── STEP 3: vendor performance categorisation ─────────
        if (cancelRef.current) return;
        setLocalPhase(8); onPhaseChangeRef.current?.(8); await sleep(2200);

        // ── STEP 4: AI recommends best bid ────────────────────
        if (cancelRef.current) return;
        setLocalPhase(9); onPhaseChangeRef.current?.(9);
        setLocalScanCol(4); setLocalWinner('A'); await sleep(5000);
      }
    }

    run();
    return () => { cancelRef.current = true; };
  }, [speed, isAuto]);

  // Resolve active values
  let activePhase = localPhase;
  let activePopulated = localPopulated;
  let activeLayers = localLayers;
  let activeShowTrue = localShowTrue;
  let activeWinner = localWinner;
  let activeScanCol = localScanCol;

  if (!isAuto && controlledPhase !== null) {
    activePhase = controlledPhase; activeScanCol = 0;
    if (controlledPhase === 0)      { activePopulated=0; activeLayers=0; activeShowTrue=false; activeWinner=null; }
    else if (controlledPhase === 1) { activePopulated=2; activeLayers=0; activeShowTrue=false; activeWinner=null; }
    else if (controlledPhase === 2) { activePopulated=2; activeLayers=0; activeShowTrue=false; activeWinner='B'; }
    else if (controlledPhase === 3) { activePopulated=2; activeLayers=0; activeShowTrue=false; activeWinner='B'; }
    else if (controlledPhase === 4) { activePopulated=2; activeLayers=1; activeShowTrue=false; activeWinner='B'; }
    else if (controlledPhase === 5) { activePopulated=2; activeLayers=2; activeShowTrue=false; activeWinner='B'; }
    else if (controlledPhase === 6) { activePopulated=2; activeLayers=3; activeShowTrue=false; activeWinner='B'; }
    else if (controlledPhase === 7) { activePopulated=2; activeLayers=3; activeShowTrue=true;  activeWinner='B'; }
    else if (controlledPhase === 8) { activePopulated=2; activeLayers=3; activeShowTrue=true;  activeWinner='B'; }
    else if (controlledPhase >= 9)  { activePopulated=2; activeLayers=3; activeShowTrue=true;  activeWinner='A'; activeScanCol=4; }
  }

  const totalAtLayer = (k: string) => {
    let t = raSumQuote(k);
    const bid = RA_BIDS[k];
    if (activeLayers >= 1) t += RA_LI.reduce((s, li) => s + (bid[li.id] as BidDetail).d, 0);
    if (activeLayers >= 2) t += RA_LI.reduce((s, li) => s + (bid[li.id] as BidDetail).i, 0);
    if (activeLayers >= 3) t += RA_LI.reduce((s, li) => s + (bid[li.id] as BidDetail).p, 0);
    return t;
  };

  const getActiveMenuStep = (): number => {
    if (!isAuto && activeMenuStep !== null) return activeMenuStep;
    // Step 1: vendor bids arrive (phases 1-2)
    if (activePhase >= 1 && activePhase <= 2) return 1;
    // Step 2: custom landed cost formula auto-applied (phases 3-7)
    if (activePhase >= 3 && activePhase <= 7) return 2;
    // Step 3: vendor performance categorisation (phase 8)
    if (activePhase === 8) return 3;
    // Step 4: AI Recommended best bid (phase 9+)
    if (activePhase >= 9) return 4;
    return 0;
  };

  // ── Narrative text — aligned to the 4 left-menu steps ──
  const getNarrativeText = (): string => {
    const step = getActiveMenuStep();
    switch (step) {
      case 1:
        return 'Vendors quote in their native currencies — INR, EUR, INR. On raw unit price the overseas bids look most competitive, but that hides every add-on yet to come.';
      case 2:
        return 'Your custom landed cost formula auto-applies — duty, freight, insurance, packaging — and every bid is normalised to your currency. True cost surfaces in seconds.';
      case 3:
        return 'Every vendor gets categorised against your criteria — competitive, non-competitive, or excluded — so you see at a glance who is actually in play.';
      case 4:
        return 'FactWise Recommended Analytics scans every bid and highlights the best per item based on your criteria — every award decision backed by intelligence, not instinct.';
      default:
        return 'FactWise is computing true landed costs across all vendor bids — layering duties, freight, and insurance, then normalising to a single currency so every comparison is on equal footing.';
    }
  };

  const step = getActiveMenuStep();

  return (
    <div className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col justify-between select-none" style={{ height: '514px', minHeight: '514px', maxHeight: '514px' }}>

      {/* Top Chrome Bar */}
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-left">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[12px] font-bold text-slate-800 tracking-tight shrink-0">Analytics Engine</span>
            <span className="text-slate-300 text-[10px]">/</span>
            <span className="text-[11px] font-medium text-slate-500 truncate"></span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
          <span className={'size-1.5 rounded-full ' + (isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')} />
          <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            {isAuto ? 'Auto-Pilot' : 'Manual'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="ra-body">

        {/* Breadcrumb */}
        {activePhase >= 1 && (
          <div className="min-h-[1.5rem] flex items-center py-0.5">
            {activePhase >= 3 ? (
              <div className="ra-crumb">
                <span>Total =</span>
                <span className="ra-tok on slate">Quote</span>
                <span className="plus">+</span>
                <span className={'ra-tok ' + (activeLayers >= 1 ? 'on amber' : '')}>Duty</span>
                <span className="plus">+</span>
                <span className={'ra-tok ' + (activeLayers >= 2 ? 'on cyan' : '')}>Insurance</span>
                <span className="plus">+</span>
                <span className={'ra-tok ' + (activeLayers >= 3 ? 'on rose' : '')}>Packaging</span>
                <span className="norm">· → INR @ {FX_USD_INR}/{FX_EUR_INR}</span>
              </div>
            ) : (
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Vendor Bids · Mixed Currencies</div>
            )}
          </div>
        )}

        {/* Matrix Grid */}
        {activePhase >= 1 && (
          <div className="ra-grid">
            <div className="ra-ghead font-mono">
              <div className="text-left font-sans text-slate-400 pl-3">Line item</div>
              {RA_KEYS.map((k) => {
                let cls = activeWinner === k ? (activeWinner === 'A' ? 'true' : 'naive') : '';
                if (activePhase >= 9 && activeScanCol === 4 && k === 'A') cls += ' awarded';
                // Category labels appear from phase 8 onwards (Step 3 — categorise)
                const showCat = activePhase >= 8;
                const catCls =
                  k === 'A' ? 'competitive' :
                  k === 'C' ? 'noncomp'    :
                  'excluded';
                const catLbl =
                  k === 'A' ? 'Competitive' :
                  k === 'C' ? 'Non-Comp'    :
                  'Excluded';
                return (
                  <div key={k} className={'vCol ' + cls}>
                    <div className="vMain font-bold">
                      <span className="vFlag font-bold text-[8.5px]">{RA_BIDS[k].flag}</span>
                      <span>Vendor {k}</span>
                    </div>
                    <span className="vFx text-[8px] font-semibold">{RA_BIDS[k].fx}</span>
                    <span className={`vCat ${catCls} ${showCat ? 'in' : ''}`}>{catLbl}</span>
                  </div>
                );
              })}
            </div>

            {RA_LI.map((li, idx) => {
              if (idx >= activePopulated) return null;
              return (
                <div key={li.id} className="ra-grow in" style={{ animationDelay: (idx * 55) + 'ms' }}>
                  <div className="ra-liCell">
                    <span className="leaf" />
                    <div className="min-w-0">
                      <div className="liName truncate">{li.name}</div>
                      <div className="liQty">{li.qty} EA</div>
                    </div>
                  </div>
                  {RA_KEYS.map((k) => {
                    const c = RA_BIDS[k][li.id] as BidDetail;
                    const isWin = activeWinner === k;
                    let cls = isWin ? (activeWinner === 'A' ? 'true' : 'naive') : '';
                    if (activePhase >= 9 && activeScanCol === 4 && k === 'A') cls += ' awarded';
                    // Add-ons (duty/freight/insurance) are quoted in INR. While no add-ons
                    // are layered yet, show the quote in the vendor's native currency.
                    // Once any add-on appears, normalise the quote to INR so we never mix
                    // currencies on the same line.
                    const showNative = activePhase <= 2;
                    const baseDisplay = showNative
                      ? raFormatPrice(c.qNative, k, true)
                      : raFormatPrice(c.q, k, false);
                    const tot = c.q
                      + (activeLayers >= 1 ? c.d : 0)
                      + (activeLayers >= 2 ? c.i : 0)
                      + (activeLayers >= 3 ? c.p : 0);
                    return (
                      <div key={k} className={'ra-bid ' + cls}>
                        <span className="line base">{baseDisplay}</span>
                        {activeLayers >= 1 && c.d > 0 && <span className="line duty"><span className="lbl">Duty </span>{raInr(c.d)}</span>}
                        {activeLayers >= 2 && <span className="line ins"><span className="lbl">Insurance </span>{raInr(c.i)}</span>}
                        {activeLayers >= 3 && <span className="line pkg"><span className="lbl">Packaging </span>{raInr(c.p)}</span>}
                        {activeLayers > 0 && <div className="tot">{raFormatPrice(tot, k, false)}</div>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
 
            {activePopulated >= RA_LI.length && (
              <div className="ra-totalRow border-t border-slate-200">
                <div className="lbl text-slate-500 font-bold flex items-center gap-1.5 pl-3">
                  <span className="truncate">
                    {activePhase <= 2
                      ? 'Quote total · qty 200'
                      : activeShowTrue
                        ? 'Total cost · qty 200 · INR'
                        : 'Running total · qty 200 · INR'}
                  </span>
                </div>
                {RA_KEYS.map((k) => {
                  const isWin = activeWinner === k;
                  let cls = isWin ? (activeWinner === 'A' ? 'true' : 'naive') : '';
                  if (activePhase >= 10 && activeScanCol > 0 && activeScanCol < 4) {
                    if (RA_KEYS.indexOf(k) + 1 === activeScanCol) cls += ' scanning';
                  }
                  if (activePhase >= 9 && activeScanCol === 4 && k === 'A') cls += ' awarded';
                  const showNative = activePhase <= 2;
                  const t = showNative ? raSumNativeQuote(k) : totalAtLayer(k);
                  return (
                    <div key={k} className={'ra-totalCell ' + cls}>
                      <div className="v">{raFormatPrice(t * 200, k, showNative)}</div>
                      {isWin && (
                        <div className="winTag flex items-center gap-1 font-extrabold uppercase">
                          {activeWinner === 'A' ? <><RAI.Sparkle s={9} /><span>AI Pick</span></> : <span>Lowest quote</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* AI Recommended overlay — single clean pop on the winning column */}
            {activePhase >= 9 && activeScanCol === 4 && (
              <>
                <div className="ra-awardedOverlay" style={{ left: '30.2%', width: '23.3%' }} />
                <div className="ra-awardedBadge" style={{ left: '30.2%', width: '23.3%' }}>
                  <div className="ab-inner"><RAI.Sparkle s={9} /><span>AI Recommended</span></div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Narrative card — re-animates on step change via key */}
        {step > 0 && (
          <div key={narrativeKey} className="ra-narrative">
            <span className="ra-pulsingDot" />
            <span className="ra-narrativeText">{getNarrativeText()}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
        <div className="flex items-center gap-1.5">
          <button onClick={() => onToggleAuto?.()} className="size-5 rounded-md hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-slate-500" title={isAuto ? 'Pause Autoplay' : 'Resume Autoplay'}>
            {isAuto ? <RAI.Pause s={11} /> : <RAI.Play s={11} />}
          </button>
          <span className="font-medium text-slate-500">
            {isAuto ? 'Autopilot Active (Cycling 15s lifecycle)' : 'Paused (Select phases on the left guide)'}
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">FactWise Engine</span>
      </div>
    </div>
  );
}