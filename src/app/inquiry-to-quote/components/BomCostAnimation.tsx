'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

/* ============================================================
 * BOM & Cost Intelligence — animated dashboard
 * Mirrors the chrome / footer / narrative-popup pattern used by
 * RfqAnalyticsAnimation and QuoteGenAnimation so it integrates
 * cleanly into Section 3.1 of QuoteToOrderFlow.tsx.
 * ============================================================ */

interface BomCostAnimationProps {
  speed?: number;
  isAuto?: boolean;
  /** 1-4, set by the parent when user clicks a step. Null = follow autoplay. */
  controlledPhase?: number | null;
  /** Mirror of controlledPhase used for "done" highlighting in the parent menu. */
  activeMenuStep?: number | null;
  /** Fires whenever the current visible step changes (1..4). */
  onPhaseChange?: (phase: number) => void;
  onToggleAuto?: () => void;
}

/* ============ Icons ============ */
interface IcProps { s?: number }
const BI = {
  Layers: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 14} height={s || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Check: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Box: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 13} height={s || 13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Git: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  Play: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
  ),
  Pause: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="currentColor">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Arrow: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  Sheet: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 22} height={s || 22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><path d="M8 13h8M8 17h5M8 9h2" />
    </svg>
  ),
  Chip: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" />
      <line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="14" x2="22" y2="14" />
      <line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Star: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 10} height={s || 10} fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Trophy: ({ s }: IcProps) => (
    <svg viewBox="0 0 24 24" width={s || 11} height={s || 11} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a4 4 0 0 1 4 4v7H8V6a4 4 0 0 1 4-4z" />
    </svg>
  ),
};

/* ============ Data ============ */
interface FocusPrice { src: string; val: number; sub: string; color: string }
interface FocusPart { name: string; hint: string; qty: number; uom: string; prices: FocusPrice[]; bestIdx: number }
const PARTS_FOCUS: FocusPart = {
  name: 'Motor Housing',
  hint: 'MH-204',
  qty: 1,
  uom: 'EA',
  prices: [
    { src: 'Distributor', val: 131, sub: 'Electronic Manufacturer',  color: '#0ea5e9' },
    { src: 'Past PO',     val: 118, sub: 'PO-2024-3312 · Mar',   color: '#10b981' },
    { src: 'Quote',       val: 125, sub: 'Vendor C · 14 days',   color: '#f59e0b' },
    { src: 'Contract',    val: 119, sub: 'MSA · Vendor A',       color: '#8b5cf6' },
  ],
  bestIdx: 1,
};

type NodeLevel = 0 | 1 | 2 | 3 | 'alt';

interface BOMNode {
  id: string;
  level: NodeLevel;
  sku: string;
  name: string;
  qty: number;
  parts?: number;
  x: number;
  y: number;
  parent?: string;
  focus?: boolean;
  altFocus?: boolean;
  vendor?: string;
}

const ROOT: BOMNode = {
  id: 'root', level: 0, sku: 'EV-RX-7', name: 'EV Drivetrain · RX-7',
  qty: 1, parts: 247, x: 50, y: 11,
};

const L1: BOMNode[] = [
  { id: 'm01', level: 1, sku: 'ASSY-M01', name: 'Motor', qty: 1, parts: 48, x: 25, y: 33, parent: 'root', focus: true },
  { id: 'g02', level: 1, sku: 'ASSY-G02', name: 'Gearbox', qty: 1, parts: 62, x: 75, y: 33, parent: 'root', focus: true },
];

const L2: BOMNode[] = [
  { id: 'g21', level: 2, sku: 'ITM-G21', name: 'Gear Housing', qty: 1, x: 10, y: 58, parent: 'm01', focus: true },
  { id: 'g22', level: 2, sku: 'SUB-G22', name: 'Drive Shaft Assy', qty: 1, parts: 9, x: 40, y: 58, parent: 'm01' },
  { id: 'g23', level: 2, sku: 'ITM-G23', name: 'Bearing Set 32mm', qty: 4, x: 75, y: 58, parent: 'g02', focus: true },
];

const L3: BOMNode[] = [
  { id: 's31', level: 3, sku: 'PRT-S31', name: 'Forged Shaft', qty: 1, x: 10, y: 83, parent: 'g21' },
  { id: 's32', level: 3, sku: 'PRT-S32', name: 'Spline Coupling', qty: 2, x: 60, y: 83, parent: 'g23' },
  { id: 's33', level: 3, sku: 'PRT-S33', name: 'Inner Race 28mm', qty: 8, x: 90, y: 83, parent: 'g23' },
];

const NODES: BOMNode[] = [ROOT, ...L1, ...L2, ...L3];
const NODE_BY_ID: Record<string, BOMNode> =
  NODES.reduce((acc, n) => { acc[n.id] = n; return acc; }, {} as Record<string, BOMNode>);


const NARRATIVE: Record<number, string> = {
  1: 'Build complex multi-level BOMs across multiple finished goods in a single import — FactWise auto-detects hierarchy, units, and approved alternates in seconds.',
  2: 'Approved alternates sit alongside the primary part on every line — ready to swap in the moment a vendor falls short, with no rebuilding required.',
  3: 'Four price sources — distributor rates, past POs, historical quotes, and contract prices — surface at the line item level before a single RFQ goes out.',
  4: 'Ask our AI any question about your BOM costs ',
};

/* ============ Styles ============ */
const BOM_STYLE = `
.bom-shell {
  position: relative; border-radius: 24px; background: white;
  border: 1px solid rgba(15,23,42,0.08); padding: 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12); overflow: hidden;
  display: flex; flex-direction: column; justify-content: space-between;
  user-select: none; height: 534px; min-height: 534px; max-height: 534px;
}
.bom-top { padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; }
.bom-top .left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.bom-top .logo { width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg,#4f46e5,#3666ff); color: white; display: grid; place-items: center; box-shadow: 0 4px 10px rgba(54,102,255,0.3); flex-shrink: 0; }
.bom-top .brand { font-size: 13px; font-weight: 700; color: #1e293b; letter-spacing: -0.01em; }
.bom-top .sep { color: #cbd5e1; font-size: 11px; }
.bom-top .crumb { font-size: 12px; font-weight: 500; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bom-top .pill { display: flex; align-items: center; gap: 7px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 3px 10px; flex-shrink: 0; }
.bom-top .pill .dot { width: 6px; height: 6px; border-radius: 50%; }
.bom-top .pill .dot.auto { background: #00b884; animation: bom-pulse 1.6s ease-in-out infinite; }
.bom-top .pill .dot.man  { background: #f59e0b; }
.bom-top .pill .lbl { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; }

.bom-stage { flex: 1; position: relative; margin-top: 12px; background: #fbfcfe; border: 1px solid rgba(15,23,42,0.05); border-radius: 16px; overflow: hidden; min-height: 0; }

.bom-stageHead { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px 12px; border-bottom: 1px solid rgba(15,23,42,0.05); }
.bom-stageHead .L { display: flex; align-items: center; gap: 10px; }
.bom-stageHead .pn { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 800; color: white; background: #3666ff; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 5px; }
.bom-stageHead .tt { font-size: 13px; font-weight: 800; color: #0f172a; letter-spacing: -0.015em; }
.bom-stageHead .R { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: #64748b; }
.bom-stageHead .R b { color: #0f172a; font-weight: 800; }

.bom-scene { position: absolute; inset: 53px 18px 90px 18px; opacity: 0; pointer-events: none; transition: opacity .35s ease; }
.bom-scene.on { opacity: 1; pointer-events: auto; }

/* Scene 1: Upload */
.s1-wrap { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 12px; }
.s1-drop { width: 100%; max-width: 460px; border: 2px dashed #c7d2fe; background: linear-gradient(180deg, rgba(238,242,255,0.6), rgba(238,242,255,0.2)); border-radius: 16px; padding: 22px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.s1-file { position: relative; width: 76px; height: 92px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 12px 32px rgba(54,102,255,0.18); display: flex; align-items: center; justify-content: center; color: #3666ff; animation: bom-bounce 1.6s ease-in-out infinite; }
.s1-file.done { animation: none; }
.s1-file .corner { position: absolute; top: 0; right: 0; width: 20px; height: 20px; background: #eef2ff; border-bottom-left-radius: 8px; border-left: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.s1-file .ext { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: #16a34a; color: white; font-family: 'JetBrains Mono', monospace; font-size: 8.5px; font-weight: 800; padding: 3px 7px; border-radius: 4px; letter-spacing: 0.06em; }
.s1-file .check { position: absolute; top: -10px; right: -10px; width: 26px; height: 26px; border-radius: 50%; background: #00b884; color: white; display: grid; place-items: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,184,132,0.4); animation: bom-pop .45s cubic-bezier(.34,1.56,.64,1) both; }
.s1-title { font-size: 15px; font-weight: 800; color: #0f172a; letter-spacing: -0.015em; text-align: center; }
.s1-sub { font-size: 12px; color: #64748b; line-height: 1.5; text-align: center; max-width: 360px; }
.s1-progress { width: 260px; height: 5px; background: #e0e7ff; border-radius: 99px; overflow: hidden; position: relative; }
.s1-progress .fill { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #3666ff, transparent); width: 60%; animation: bom-prog 1.4s ease-in-out infinite; }
.s1-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; max-width: 460px; margin-top: 4px; }
.s1-stat { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; text-align: center; animation: bom-popIn .5s cubic-bezier(.34,1.56,.64,1) both; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
.s1-stat:nth-child(1) { animation-delay: 0s; }
.s1-stat:nth-child(2) { animation-delay: .1s; }
.s1-stat:nth-child(3) { animation-delay: .2s; }
.s1-stat .v { font-family: 'JetBrains Mono', monospace; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1; }
.s1-stat .l { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 6px; }
.s1-stat .ic { color: #00b884; margin-right: 4px; vertical-align: -1px; }

/* Scene 2: Flowchart Tree */
.bs-graph { position: absolute; inset: 0; transition: transform .8s cubic-bezier(.22,.61,.36,1); transform-origin: center center; width: 100%; height: 100%; }
.bs-edges { position: absolute; inset: 0; pointer-events: none; }
.bs-edges svg { width: 100%; height: 100%; overflow: visible; }
.bs-edge { fill: none; stroke: #cbd5e1; stroke-width: 1.2; stroke-linecap: round; stroke-dasharray: 240; stroke-dashoffset: 240; transition: stroke-dashoffset .7s ease, stroke .4s ease; }
.bs-edge.in { stroke-dashoffset: 0; }
.bs-edge.lvl1 { stroke: #3666ff; stroke-opacity: 0.7; }
.bs-edge.lvl2 { stroke: #00b884; stroke-opacity: 0.7; }
.bs-edge.lvl3 { stroke: #8b5cf6; stroke-opacity: 0.7; }

.bs-node { position: absolute; transform: translate(-50%, -50%) scale(0.6); background: white; border: 1px solid rgba(15,23,42,0.1); border-radius: 9px; padding: 5px 8px; min-width: 76px; display: flex; flex-direction: column; gap: 1px; box-shadow: 0 6px 14px -6px rgba(15,23,42,0.18); opacity: 0; z-index: 2; pointer-events: none; transition: transform .55s cubic-bezier(.22,.61,.36,1), opacity .35s ease, border-color .4s ease, box-shadow .4s ease, filter .4s ease; }
.bs-node.in { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }
.bs-node .nhead { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.bs-node .nsku { font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 700; color: #94a3b8; letter-spacing: -0.01em; }
.bs-node .nqty { font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-variant-numeric: tabular-nums; }
.bs-node .nname { font-size: 10px; font-weight: 700; color: #0b1322; letter-spacing: -0.01em; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left; }
.bs-node .nfoot { font-size: 8.5px; font-weight: 600; color: #94a3b8; letter-spacing: 0.04em; text-align: left; }
.bs-node .alt-badge { font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 800; background: rgba(16,185,129,0.1); color: #059669; border: 1px solid rgba(16,185,129,0.18); padding: 1px 4px; border-radius: 4px; display: inline-block; margin-top: 2px; align-self: flex-start; }

.bs-node.l0 { background: linear-gradient(180deg, #ffffff 0%, #eef2ff 100%); border-color: rgba(54,102,255,0.3); padding: 6px 10px; min-width: 120px; box-shadow: 0 10px 22px -8px rgba(54,102,255,0.35); }
.bs-node.l0 .nsku  { color: #3666ff; }
.bs-node.l0 .nname { font-size: 11px; font-weight: 800; }
.bs-node.l0 .nqty  { background: rgba(54,102,255,0.12); color: #3666ff; }
.bs-node.l0::before { content: ""; position: absolute; inset: -4px; border-radius: 13px; border: 1.5px solid rgba(54,102,255,0.22); animation: bs-heroRing 2.4s ease-out infinite; opacity: 1; pointer-events: none; z-index: -1; }

.bs-node.l1 { min-width: 80px; }
.bs-node.l1.focus { border-color: rgba(0,184,132,0.4); background: linear-gradient(180deg, #ffffff 0%, #ecfbf3 100%); box-shadow: 0 10px 22px -8px rgba(0,184,132,0.3); }
.bs-node.l1.focus .nsku { color: #00b884; }

.bs-node.l2 { min-width: 76px; padding: 4px 7px; }
.bs-node.l2 .nname { font-size: 9.5px; font-weight: 600; }
.bs-node.l2.focus { border-color: rgba(139,92,246,0.4); background: linear-gradient(180deg, #ffffff 0%, #f5efff 100%); box-shadow: 0 10px 22px -8px rgba(139,92,246,0.3); }
.bs-node.l2.focus .nsku { color: #8b5cf6; }
.bs-node.l2.altFocus { border-color: rgba(0,184,132,0.4); background: linear-gradient(180deg, #ffffff 0%, #ecfbf3 100%); box-shadow: 0 10px 22px -8px rgba(0,184,132,0.3); }
.bs-node.l2.altFocus .nsku { color: #00b884; }

.bs-node.l3 { min-width: 70px; padding: 3px 7px; border-style: dashed; background: #fbfdfc; }
.bs-node.l3 .nname { font-size: 9px; font-weight: 600; color: #475569; }
.bs-node.l3 .nsku  { color: #8b5cf6; }

@keyframes bs-heroRing { 0% { transform: scale(0.92); opacity: 0.8; } 100% { transform: scale(1.18); opacity: 0; } }

/* Scene 3: Cost */
.s3-wrap { height: 100%; display: flex; flex-direction: column; gap: 12px; padding: 14px 14px 78px; }
.s3-part { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; }
.s3-part .L { display: flex; align-items: center; gap: 11px; }
.s3-part .pico { width: 36px; height: 36px; border-radius: 99px; background: #eff4ff; color: #3666ff; display: grid; place-items: center; }
.s3-part .pn { font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: -0.015em; }
.s3-part .pm { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #64748b; font-weight: 600; margin-top: 2px; letter-spacing: 0.02em; }
.s3-part .R { font-size: 9.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; text-align: right; }
.s3-part .R b { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #0f172a; }
.s3-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; flex: 1; }
.s3-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 9px 12px; position: relative; opacity: 0; transform: translateY(8px); transition: opacity .35s ease, transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
.s3-card.in { opacity: 1; transform: translateY(0); }
.s3-card.best { border-color: rgba(0,184,132,0.5); box-shadow: 0 6px 20px rgba(0,184,132,0.15); }
.s3-card .head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.s3-card .src { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
.s3-card .srcdot { width: 7px; height: 7px; border-radius: 50%; }
.s3-card .star { color: #00b884; opacity: 0; transition: opacity .3s ease; }
.s3-card.best .star { opacity: 1; }
.s3-card .val { font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1; }
.s3-card.best .val { color: #047857; }
.s3-card .sub { font-size: 9.5px; color: #94a3b8; margin-top: 3px; font-weight: 500; }
.s3-foot { background: linear-gradient(135deg, #ecfdf5, #f0fdfa); border: 1px solid #6ee7b7; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; opacity: 0; transform: translateY(6px); transition: opacity .4s ease, transform .4s ease; }
.s3-foot.in { opacity: 1; transform: translateY(0); }
.s3-foot .L { display: flex; align-items: center; gap: 10px; }
.s3-foot .L .ico { width: 30px; height: 30px; border-radius: 8px; background: #00b884; color: white; display: grid; place-items: center; }
.s3-foot .lt { font-size: 10px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.08em; }
.s3-foot .ls { font-size: 11px; color: #047857; margin-top: 2px; font-weight: 500; }
.s3-foot .R { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 800; color: #047857; letter-spacing: -0.025em; }

/* Scene 4: Diff */
.s4-wrap { height: 100%; display: flex; flex-direction: column; padding: 14px 14px 78px; gap: 11px; }
.s4-head { display: flex; align-items: center; gap: 10px; padding: 0 4px; }
.s4-head .col-l, .s4-head .col-r { flex: 1; display: flex; align-items: center; gap: 8px; }
.s4-head .col-r { padding-left: 36px; }
.s4-head .vlbl { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.06em; }
.s4-head .vlbl.v1 { background: #f1f5f9; color: #64748b; }
.s4-head .vlbl.v2 { background: #ecfdf5; color: #047857; }
.s4-head .vt { font-size: 11px; color: #94a3b8; font-weight: 600; }
.s4-changes { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.s4-row { display: grid; grid-template-columns: 1fr 28px 1fr 64px; align-items: center; gap: 8px; opacity: 0; transform: translateX(-6px); transition: opacity .4s ease, transform .4s ease; }
.s4-row.in { opacity: 1; transform: translateX(0); }
.s4-card { background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 9px 12px; display: flex; flex-direction: column; min-width: 0; }
.s4-card.from { background: #f8fafc; opacity: 0.75; }
.s4-card.to { border-color: #6ee7b7; background: linear-gradient(135deg, #f0fdf9, white); }
.s4-card .nm { font-size: 12.5px; font-weight: 700; color: #1e293b; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.s4-card.from .nm { color: #64748b; text-decoration: line-through; }
.s4-card.to .nm { color: #047857; }
.s4-card .sm { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #94a3b8; margin-top: 2px; font-weight: 600; }
.s4-arrow { display: grid; place-items: center; color: #3666ff; }
.s4-arrow .ac { width: 22px; height: 22px; border-radius: 50%; background: #eff4ff; border: 1.5px solid #c7d2fe; color: #3666ff; display: grid; place-items: center; }
.s4-delta { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 800; color: #b45309; text-align: right; padding-right: 4px; }
.s4-foot { margin-top: auto; padding: 12px 14px; border-radius: 12px; background: linear-gradient(135deg, #fef3c7, #fffbeb); border: 1px solid #fde68a; display: flex; align-items: center; justify-content: space-between; opacity: 0; transform: translateY(6px); transition: opacity .4s ease, transform .4s ease; }
.s4-foot.in { opacity: 1; transform: translateY(0); }
.s4-foot .L { display: flex; align-items: center; gap: 10px; min-width: 0; }
.s4-foot .L .ico { width: 30px; height: 30px; border-radius: 8px; background: #b45309; color: white; display: grid; place-items: center; }
.s4-foot .lt { font-size: 10px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.08em; }
.s4-foot .ls { font-size: 11px; color: #b45309; margin-top: 2px; font-weight: 500; }
.s4-foot .R { display: flex; align-items: baseline; gap: 8px; }
.s4-foot .R .old { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: #94a3b8; text-decoration: line-through; }
.s4-foot .R .new { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 800; color: #b45309; letter-spacing: -0.025em; }
.s4-foot .R .badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 800; background: #b45309; color: white; padding: 3px 8px; border-radius: 5px; letter-spacing: 0.04em; }

/* Scene 4 AI Chat */
.s4-chat { margin-top: 10px; background: white; border: 1px solid rgba(54,102,255,0.14); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; opacity: 0; transform: translateY(6px); transition: opacity .35s ease, transform .35s ease; }
.s4-chat.in { opacity: 1; transform: translateY(0); }
.s4-chat-user { display: flex; justify-content: flex-end; gap: 7px; align-items: flex-end; }
.s4-chat-user .bubble { background: #3666ff; color: white; font-size: 10px; font-weight: 600; padding: 6px 10px; border-radius: 10px 10px 2px 10px; max-width: 80%; line-height: 1.4; }
.s4-chat-user .av { width: 20px; height: 20px; border-radius: 50%; background: #e0e7ff; display: grid; place-items: center; font-size: 9px; flex-shrink: 0; }
.s4-chat-ai { display: flex; gap: 7px; align-items: flex-end; }
.s4-chat-ai .av { width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg,#3666ff,#00b884); display: grid; place-items: center; color: white; flex-shrink: 0; }
.s4-chat-ai .bubble { background: #f8faff; border: 1px solid rgba(54,102,255,0.12); color: #1e293b; font-size: 10px; font-weight: 500; padding: 6px 10px; border-radius: 10px 10px 10px 2px; max-width: 88%; line-height: 1.45; }
.s4-typing { display: flex; gap: 3px; align-items: center; padding: 6px 10px; }
.s4-typing span { width: 5px; height: 5px; border-radius: 50%; background: #94a3b8; animation: s4-dot 1.1s ease-in-out infinite; }
.s4-typing span:nth-child(2) { animation-delay: .18s; }
.s4-typing span:nth-child(3) { animation-delay: .36s; }
@keyframes s4-dot { 0%,80%,100% { transform: scale(0.7); opacity:0.4; } 40% { transform: scale(1); opacity:1; } }

.bom-revBadge { position: absolute; top: 14px; right: 18px; display: flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 1px solid #6ee7b7; color: #047857; padding: 4px 11px; border-radius: 999px; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800; letter-spacing: 0.06em; animation: bom-popIn .4s cubic-bezier(.34,1.56,.64,1) both; box-shadow: 0 4px 12px rgba(4,120,87,0.15); z-index: 5; }

.bom-narrative { position: absolute; left: 14px; right: 14px; bottom: 14px; display: flex; align-items: flex-start; gap: 11px; padding: 12px 14px; background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); z-index: 20; animation: bom-popIn .45s cubic-bezier(.22,1,.36,1) both; }
.bom-narrative .pdot { width: 7px; height: 7px; border-radius: 50%; background: #3666ff; margin-top: 5px; flex-shrink: 0; animation: bom-pulse 1.6s ease-in-out infinite; }
.bom-narrative .ntext { font-size: 11px; font-weight: 500; color: #64748b; line-height: 1.55; text-align: left; }

.bom-foot-ctl { padding-top: 12px; margin-top: 8px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: 10px; }
.bom-foot-ctl .L { display: flex; align-items: center; gap: 8px; }
.bom-foot-ctl button { width: 22px; height: 22px; border-radius: 6px; background: transparent; border: none; cursor: pointer; color: #64748b; display: grid; place-items: center; }
.bom-foot-ctl button:hover { background: #f1f5f9; color: #1e293b; }
.bom-foot-ctl .Lt { font-weight: 500; color: #64748b; font-size: 10.5px; }
.bom-foot-ctl .R { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 800; color: #3666ff; letter-spacing: 0.1em; text-transform: uppercase; }

@keyframes bom-popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
@keyframes bom-pop { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
@keyframes bom-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }
@keyframes bom-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
@keyframes bom-prog { 0% { transform: translateX(-130%); } 100% { transform: translateX(230%); } }
@keyframes bom-bar { to { transform: scaleX(1); } }
`;

/* ============================================================
 * Component
 * ============================================================ */
export default function BomCostAnimation({
  speed = 1,
  isAuto = true,
  controlledPhase = null,
  activeMenuStep = null,
  onPhaseChange,
  onToggleAuto,
}: BomCostAnimationProps) {
  const t = useLocalizedText();
  const manualPhase = activeMenuStep ?? controlledPhase;

  /* Inject stylesheet once */
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const VERSION = 'bom-v2';
    if (document.getElementById(VERSION)) return;
    ['bom-anim-style', 'bom-v1'].forEach(id => document.getElementById(id)?.remove());
    const s = document.createElement('style');
    s.id = VERSION;
    s.textContent = BOM_STYLE;
    document.head.appendChild(s);
  }, []);

  /* ---------- State ---------- */
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [s1Phase, setS1Phase]   = useState<number>(0); // 0 idle, 1 drop, 2 parsing, 3 done
  
  // Step 2 Flowchart Tree States
  const [s2SubPhase, setS2SubPhase] = useState<number>(2); // 2 = L1, 3 = L2, 4 = L3
  const [s2L1n, setS2L1n] = useState<number>(0);
  const [s2L2n, setS2L2n] = useState<number>(0);
  const [s2L3n, setS2L3n] = useState<number>(0);

  const [s3Cards, setS3Cards]   = useState<number>(0); // 0..4
  const [s3Best,  setS3Best]    = useState<boolean>(false);
  const [s4Chat,  setS4Chat]    = useState<number>(0); // 0=hidden,1=user typing,2=user msg,3=ai typing,4=ai reply

  const cancelRef = useRef<boolean>(false);
  const onPhaseChangeRef = useRef(onPhaseChange);
  useEffect(() => { onPhaseChangeRef.current = onPhaseChange; }, [onPhaseChange]);

  const s2ContainerRef = useRef<HTMLDivElement>(null);
  const [s2Dims, setS2Dims] = useState({ w: 600, h: 300 });

  useEffect(() => {
    const el = s2ContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setS2Dims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    setS2Dims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const isShown = (n: BOMNode): boolean => {
    if (n.id === 'root') return true;
    if (n.level === 1) return s2L1n > L1.indexOf(n);
    if (n.level === 2) return s2L2n > L2.indexOf(n);
    if (n.level === 3) return s2L3n > L3.indexOf(n);
    return false;
  };

  const edges = [
    ...L1.map((n, i) => ({ key: 'e-root-' + n.id, from: ROOT, to: n, level: 'lvl1', shown: s2L1n > i })),
    ...L2.map((n, i) => ({ key: 'e-' + n.parent + '-' + n.id, from: NODE_BY_ID[n.parent!], to: n, level: 'lvl2', shown: s2L2n > i })),
    ...L3.map((n, i) => ({ key: 'e-' + n.parent + '-' + n.id, from: NODE_BY_ID[n.parent!], to: n, level: 'lvl3', shown: s2L3n > i })),
  ];

  function edgePathPx(p: BOMNode, c: BOMNode): string {
    const { w, h } = s2Dims;
    const exitPx = h * 0.035;
    const entryPx = h * 0.035;
    const px = (p.x / 100) * w;
    const py = (p.y / 100) * h + exitPx;
    const cx = (c.x / 100) * w;
    const cy = (c.y / 100) * h - entryPx;
    const midY = (py + cy) / 2;

    const r = 8;
    if (Math.abs(px - cx) < 2) {
      return `M ${px} ${py} L ${cx} ${cy}`;
    }
    const dir = cx > px ? 1 : -1;
    const rX = Math.min(r, Math.abs(cx - px) / 2);
    const rY = Math.min(r, Math.abs(midY - py) / 2);

    return `M ${px} ${py} L ${px} ${midY - rY} Q ${px} ${midY} ${px + dir * rX} ${midY} L ${cx - dir * rX} ${midY} Q ${cx} ${midY} ${cx} ${midY + rY} L ${cx} ${cy}`;
  }

  /* ---------- Autoplay loop ---------- */
  useEffect(() => {
    if (!isAuto) return;
    cancelRef.current = false;
    const mul = Math.max(0.3, Number(speed) || 1);
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms / mul));

    async function run() {
      while (!cancelRef.current) {
        // Step 1
        setCurrentStep(1); onPhaseChangeRef.current?.(1);
        setS1Phase(0);
        setS2SubPhase(2); setS2L1n(0); setS2L2n(0); setS2L3n(0);
        setS3Cards(0); setS3Best(false); setS4Chat(0);
        await sleep(500); if (cancelRef.current) return;
        setS1Phase(1); await sleep(900); if (cancelRef.current) return;
        setS1Phase(2); await sleep(1400); if (cancelRef.current) return;
        setS1Phase(3); await sleep(2000); if (cancelRef.current) return;

        // Step 2
        setCurrentStep(2); onPhaseChangeRef.current?.(2);
        setS2SubPhase(2); setS2L1n(0); setS2L2n(0); setS2L3n(0);
        await sleep(300); if (cancelRef.current) return;
        
        // Stagger L1
        for (let i = 1; i <= L1.length; i++) {
          setS2L1n(i); await sleep(350); if (cancelRef.current) return;
        }
        await sleep(1100); if (cancelRef.current) return;

        // Stagger L2
        setS2SubPhase(3);
        for (let i = 1; i <= L2.length; i++) {
          setS2L2n(i); await sleep(300); if (cancelRef.current) return;
        }
        await sleep(1100); if (cancelRef.current) return;

        // Stagger L3
        setS2SubPhase(4);
        for (let i = 1; i <= L3.length; i++) {
          setS2L3n(i); await sleep(300); if (cancelRef.current) return;
        }
        await sleep(2200); if (cancelRef.current) return;

        // Step 3
        setCurrentStep(3); onPhaseChangeRef.current?.(3);
        setS3Cards(0); setS3Best(false);
        await sleep(400); if (cancelRef.current) return;
        for (let i = 1; i <= 4; i++) {
          setS3Cards(i); await sleep(380); if (cancelRef.current) return;
        }
        await sleep(450); if (cancelRef.current) return;
        setS3Best(true); await sleep(2200); if (cancelRef.current) return;

        // Step 4
        setCurrentStep(4); onPhaseChangeRef.current?.(4);
        setS4Chat(0);
        await sleep(400); if (cancelRef.current) return;
        setS4Chat(1); await sleep(600); if (cancelRef.current) return;  // user typing
        setS4Chat(2); await sleep(800); if (cancelRef.current) return;  // user msg shown
        setS4Chat(3); await sleep(900); if (cancelRef.current) return;  // ai typing
        setS4Chat(4); await sleep(2500); if (cancelRef.current) return; // ai reply shown
      }
    }
    run();
    return () => { cancelRef.current = true; };
  }, [isAuto, speed]);

  /* ---------- Manual: snap to a step ---------- */
  useEffect(() => {
    if (isAuto || manualPhase == null) return;
    const applyManualPhase = () => {
      setCurrentStep(manualPhase);
      if (manualPhase === 1) {
        setS1Phase(3);
      } else if (manualPhase === 2) {
        setS2SubPhase(4);
        setS2L1n(L1.length);
        setS2L2n(L2.length);
        setS2L3n(L3.length);
      } else if (manualPhase === 3) {
        setS3Cards(4); setS3Best(true);
      } else if (manualPhase === 4) {
        setS4Chat(4);
      }
    };
    queueMicrotask(applyManualPhase);
    onPhaseChangeRef.current?.(manualPhase);
  }, [manualPhase, isAuto]);

  /* ---------- Render helpers ---------- */
  const STEP_META: Record<number, { tag: string; title: string }> = {
    1: { tag: 'STEP 01', title: 'BOM Upload & Auto-Parse' },
    2: { tag: 'STEP 02', title: 'Multi-Level BOM with Alternates' },
    3: { tag: 'STEP 03', title: 'Line-Level Cost Intelligence' },
    4: { tag: 'STEP 04', title: 'Ask AI About Your BOM' },
  };
  const meta = STEP_META[currentStep] || STEP_META[1];

  return (
    <div className="bom-shell">

      {/* Top chrome */}
      <div className="bom-top">
        <div className="left">
          
          <span className="brand">{t('BOM Editor')}</span>
          <span className="sep">/</span>
          <span className="crumb">{t('FG-1041 · Smart Pump Assembly')}</span>
        </div>
        <div className="pill">
          <span className={'dot ' + (isAuto ? 'auto' : 'man')} />
          <span className="lbl">{isAuto ? t('Auto-Pilot') : t('Manual')}</span>
        </div>
      </div>

      {/* Stage */}
      <div className="bom-stage">

        {/* Stage header */}
        <div className="bom-stageHead">
          <div className="L">
            <span className="pn">{meta.tag}</span>
            <span className="tt">{t(meta.title)}</span>
          </div>
          <div className="R">
            {currentStep >= 2 && <span><b>7</b> {t('lines')} · <b>3</b> {t('tiers')} · <b>2</b> {t('alts')}</span>}
          </div>
        </div>


        {/* Scene 1 */}
        <div className={'bom-scene ' + (currentStep === 1 ? 'on' : '')}>
          <div className="s1-wrap">
            <div className="s1-drop">
              <div className={'s1-file ' + (s1Phase >= 3 ? 'done' : '')}>
                <BI.Sheet s={30} />
                <span className="corner" />
                <span className="ext">XLSX</span>
                {s1Phase >= 3 && <span className="check"><BI.Check s={12} /></span>}
              </div>
              <div className="s1-title">
                {s1Phase <= 1 ? t('Drop your BOM') :
                 s1Phase === 2 ? t('Parsing multi-level BOM…') :
                 t('BOM imported successfully')}
              </div>
              <div className="s1-sub">
                {s1Phase <= 1
                  ? t('Any format — Excel, CSV, supplier spec. Multi-level, alternates and revisions all handled.')
                  : s1Phase === 2
                  ? t('Detecting hierarchy, units of measure, alternates and revision history…')
                  : t('Seven lines parsed across three tiers — two approved alternates detected and linked at the line level.')}
              </div>
              {s1Phase === 2 && <div className="s1-progress"><div className="fill" /></div>}
            </div>
          </div>
        </div>

        {/* Scene 2 */}
        <div className={'bom-scene ' + (currentStep === 2 ? 'on' : '')} style={{ inset: '53px 14px 90px 14px' }}>
          {/* Micro-breadcrumbs header */}
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-slate-800">
                {s2SubPhase === 2 ? t('Level 1 — Sub-Assemblies') :
                 s2SubPhase === 3 ? t('Level 2 — Sub-BOM') :
                 t('Level 3 — Sub-Sub-BOM')}
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">
                {s2SubPhase === 2 ? 'L1' :
                 s2SubPhase === 3 ? 'L1 › L2' :
                 'L1 › L2 › L3'}
              </span>
            </div>
            {/* Sub-phase dots */}
            <div className="flex gap-1">
              {[2, 3, 4].map((p) => (
                <div
                  key={p}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    s2SubPhase === p
                      ? 'bg-emerald-500 w-3'
                      : s2SubPhase > p
                      ? 'bg-emerald-400'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Flowchart container */}
          <div ref={s2ContainerRef} className="bs-graph">
            <div className="bs-edges">
              <svg width={s2Dims.w} height={s2Dims.h} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                {edges.map((e) => (
                  <path
                    key={e.key}
                    d={edgePathPx(e.from, e.to)}
                    className={'bs-edge ' + e.level + (e.shown ? ' in' : '')}
                    pathLength={240}
                  />
                ))}
              </svg>
            </div>

            {NODES.map((n) => {
              const shown = isShown(n);
              const isG23 = n.id === 'g23';
              const lvlClass = 'l' + n.level;
              const cls = 'bs-node ' + lvlClass
                + (n.focus ? ' focus' : '')
                + (shown ? ' in' : '');
              return (
                <div key={n.id} className={cls} style={{ left: n.x + '%', top: n.y + '%' }}>
                  <div className="nhead">
                    <span className="nsku">{n.sku}</span>
                    <span className="nqty">×{n.qty}</span>
                  </div>
                  <div className="nname">{n.name}</div>
                  {n.parts && n.level !== 0 && <div className="nfoot">{n.parts} {t('parts')}</div>}
                  {isG23 && shown && (
                    <span className="alt-badge">+2 ALT</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scene 3 */}
        <div className={'bom-scene ' + (currentStep === 3 ? 'on' : '')}>
          <div className="s3-wrap">
            <div className="s3-part">
              <div className="L">
                <div className="pico"><BI.Chip s={16} /></div>
                <div>
                  <div className="pn">{PARTS_FOCUS.name}</div>
                  <div className="pm">{PARTS_FOCUS.hint} · Qty {PARTS_FOCUS.qty} {PARTS_FOCUS.uom}</div>
                </div>
              </div>
              <div className="R">
                    <div>{t('price sources')}</div>
                    <b>4 {t('matched')}</b>
              </div>
            </div>

            <div className="s3-grid">
              {PARTS_FOCUS.prices.map((p, i) => {
                const visible = s3Cards > i;
                const isBest = s3Best && i === PARTS_FOCUS.bestIdx;
                return (
                  <div key={p.src} className={'s3-card ' + (visible ? 'in ' : '') + (isBest ? 'best' : '')}>
                    <div className="head">
                      <span className="src">
                        <span className="srcdot" style={{ background: p.color }} />
                        {t(p.src)}
                      </span>
                      <span className="star"><BI.Star s={11} /></span>
                    </div>
                    <div className="val">${p.val}</div>
                    <div className="sub">{p.sub}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Scene 4 — AI Chat only */}
        <div className={'bom-scene ' + (currentStep === 4 ? 'on' : '')}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '14px 18px 90px' }}>
            <div className={'s4-chat ' + (s4Chat >= 1 ? 'in' : '')} style={{ flex: 'unset' }}>
              {/* User typing indicator */}
              {s4Chat === 1 && (
                <div className="s4-chat-user">
                  <div className="bubble" style={{ background: '#e0e7ff', color: '#3666ff' }}>
                    <div className="s4-typing"><span/><span/><span/></div>
                  </div>
                  <div className="av">U</div>
                </div>
              )}
              {/* User message */}
              {s4Chat >= 2 && (
                <div className="s4-chat-user">
                  <div className="bubble">{t('How do I add multiple BOMs for different finished goods?')}</div>
                  <div className="av">U</div>
                </div>
              )}
              {/* AI typing */}
              {s4Chat === 3 && (
                <div className="s4-chat-ai">
                  <div className="av">
                    <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="12" height="8" rx="2"/><path d="M8 2v3M5 1v2M11 1v2"/><circle cx="6" cy="9" r="1"/><circle cx="10" cy="9" r="1"/></svg>
                  </div>
                  <div className="bubble"><div className="s4-typing"><span/><span/><span/></div></div>
                </div>
              )}
              {/* AI reply */}
              {s4Chat >= 4 && (
                <div className="s4-chat-ai">
                  <div className="av">
                    <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="12" height="8" rx="2"/><path d="M8 2v3M5 1v2M11 1v2"/><circle cx="6" cy="9" r="1"/><circle cx="10" cy="9" r="1"/></svg>
                  </div>
                  <div className="bubble">{t('Upload all finished goods in one sheet — FactWise auto-detects each BOM hierarchy, links alternates, and rolls up costs per product instantly.')}</div>
                </div>
              )}
            </div>
            {/* Input bar hint */}
            {s4Chat >= 1 && (
              <div style={{ marginTop: 10, padding: '8px 12px', background: '#f8faff', border: '1px solid rgba(54,102,255,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3666ff', opacity: 0.7, flexShrink: 0, animation: 'bom-pulse 1.6s ease-in-out infinite' }} />
                <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}>{t('Ask our AI any question about your BOM costs')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Narrative popup */}
        <div key={currentStep} className="bom-narrative">
          <span className="pdot" />
          <span className="ntext">{t(NARRATIVE[currentStep])}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bom-foot-ctl">
        <div className="L">
          <button onClick={() => onToggleAuto?.()} title={isAuto ? 'Pause Autoplay' : 'Resume Autoplay'}>
            {isAuto ? <BI.Pause s={11} /> : <BI.Play s={11} />}
          </button>
          <span className="Lt">
            {isAuto ? t('Autopilot active · cycling through all four steps') : t('Paused · click any step on the left to inspect')}
          </span>
        </div>
        <span className="R">{t('FactWise Engine')}</span>
      </div>
    </div>
  );
}
