"use client";
/* ============================================================
 * ScaleAnimation.tsx
 * FactWise — "Scale Effortlessly. More Volume. More Complexity. Same Simplicity."
 *
 * Story (loops ~24s):
 *  1. HERO    — the finished EV Drivetrain card pulses in, four "?"
 *               floating around it hint at the complexity beneath.
 *  2. L1      — the product "explodes" into 4 top-level sub-assemblies
 *               arranged in an org chart; curved SVG cables draw from
 *               the root down to each one.
 *  3. L2      — Gearbox lights up as the focus branch; its 4 sub-BOM
 *               children sprout below it.
 *  4. L3      — Drive Shaft Assembly lights up; 3 sub-sub-BOM children
 *               sprout below it. (n-level depth.)
 *  5. ALT     — Bearing Set sprouts 3 alternate vendor cards to the
 *               right (SKF / Timken / NSK).
 *  6. VOLUME  — the whole tree shrinks and clone-stacks itself behind,
 *               with a "× 1,000 units" badge.
 *  7. COMBINE — three plant requisitions slide together and merge.
 *  8. RESULT  — finale: 40% faster + capability chips.
 *
 * Drop-in: place in src/components/methodology-animations/ and import.
 * Style is injected via a <style> tag with id="bs-style" so there's
 * no global-CSS dependency. Tailwind is optional here (we don't use it).
 * ============================================================ */

import { useEffect, useRef, useState } from "react";
import {
  Layers, Plus, Check, ArrowRight,
  Workflow, GitFork, Grid3x3, Cog
} from "lucide-react";
import { useLocalizedText } from "@/hooks/useLocalizedText";

/* ============ TYPES ============ */
type NodeLevel = 0 | 1 | 2 | 3 | "alt";

interface BOMNode {
  id: string;
  level: NodeLevel;
  sku: string;
  name: string;
  qty: number;
  parts?: number;
  /** Position in stage-% (0..100). */
  x: number;
  y: number;
  parent?: string;
  /** True for the L1/L2 branch we drill into. */
  focus?: boolean;
  /** True for the L2 node that has alternates. */
  altFocus?: boolean;
  /** For ALT nodes only — vendor label. */
  vendor?: string;
}

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface ScaleAnimationProps {
  /** Playback speed multiplier (default 1). */
  speed?: number;
  /** Fires whenever the active phase changes. */
  onPhaseChange?: (phase: Phase) => void;
}

/* ============ DATA ============ */
const ROOT: BOMNode = {
  id: "root", level: 0, sku: "EV-RX-7", name: "EV Drivetrain · RX-7",
  qty: 1, parts: 247, x: 50, y: 11,
};

const L1: BOMNode[] = [
  { id: "m01", level: 1, sku: "ASSY-M01", name: "Motor", qty: 1, parts: 48, x: 25, y: 33, parent: "root", focus: true },
  { id: "g02", level: 1, sku: "ASSY-G02", name: "Gearbox", qty: 1, parts: 62, x: 75, y: 33, parent: "root", focus: true },
];

const L2: BOMNode[] = [
  { id: "g21", level: 2, sku: "ITM-G21", name: "Gear Housing", qty: 1, x: 10, y: 58, parent: "m01", focus: true },
  { id: "g22", level: 2, sku: "SUB-G22", name: "Drive Shaft Assy", qty: 1, parts: 9, x: 40, y: 58, parent: "m01" },
  { id: "g23", level: 2, sku: "ITM-G23", name: "Bearing Set 32mm", qty: 4, x: 75, y: 58, parent: "g02", focus: true },
];

const L3: BOMNode[] = [
  { id: "s31", level: 3, sku: "PRT-S31", name: "Forged Shaft", qty: 1, x: 10, y: 83, parent: "g21" },
  { id: "s32", level: 3, sku: "PRT-S32", name: "Spline Coupling", qty: 2, x: 60, y: 83, parent: "g23" },
];

const ALT: BOMNode[] = [];

const NODES: BOMNode[] = [ROOT, ...L1, ...L2, ...L3, ...ALT];
const NODE_BY_ID: Record<string, BOMNode> =
  NODES.reduce((acc, n) => { acc[n.id] = n; return acc; }, {} as Record<string, BOMNode>);

interface Req { id: string; plant: string; lines: number; qty: number; color: string; x0: number; y0: number; }
const REQS: Req[] = [
  { id: "REQ-2417", plant: "Mumbai", lines: 18, qty: 1000, color: "#3666ff", x0: 4, y0: 4 },
  { id: "REQ-2418", plant: "Pune", lines: 22, qty: 1500, color: "#00b884", x0: 4, y0: 60 },
  { id: "REQ-2421", plant: "Delhi", lines: 14, qty: 800, color: "#f59e0b", x0: 4, y0: 116 },
];

/* ============ SCOPED CSS (prefix `bs-`) ============
 * Injected once into <head>. Avoids any Tailwind/global-CSS dependency
 * so the component is fully portable.
 */
const BS_STYLE = `
.bs-dash { position: relative; width: 100%; height: 100%; background: transparent;
  display: flex; flex-direction: column;
  font-family: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif; color: #0b1322;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

.bs-body { flex: 1; display: flex; min-height: 0; }
.bs-rail { width: 56px; padding: 16px 0; background: rgba(248,250,252,0.6);
  border-right: 1px solid rgba(15,23,42,0.05);
  display: flex; flex-direction: column; align-items: center; gap: 12px; }
.bs-railIc { width: 32px; height: 32px; border-radius: 10px; display: grid;
  place-items: center; color: #94a3b8; transition: all .3s ease; }
.bs-railIc.active { background: #00b884; color: white; box-shadow: 0 6px 14px rgba(0,184,132,0.35); }
.bs-railIc.accent { background: rgba(0,184,132,0.1); color: #00b884; }

.bs-main { flex: 1; padding: 18px 20px; display: flex; flex-direction: column;
  gap: 12px; min-width: 0; }

.bs-headStrip { display: flex; align-items: flex-start; justify-content: space-between; }
.bs-headStrip h3 { margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; }
.bs-headStrip .bs-sub { margin: 3px 0 0; font-size: 9px; font-weight: 700;
  letter-spacing: 0.1em; color: #94a3b8; text-transform: uppercase; }
.bs-livePill { display: inline-flex; align-items: center; gap: 5px; background: #f1f5f9;
  padding: 4px 9px; border-radius: 99px; font-size: 9px; font-weight: 700; color: #475569;
  letter-spacing: 0.08em; text-transform: uppercase; }
.bs-livePill::before { content: ""; width: 5px; height: 5px; border-radius: 50%;
  background: #00b884; box-shadow: 0 0 0 3px rgba(0,184,132,0.15);
  animation: bs-pulse 1.6s ease-in-out infinite; }
@keyframes bs-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }

.bs-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.bs-stat { background: rgba(248,250,252,0.6); border: 1px solid rgba(15,23,42,0.05);
  border-radius: 12px; padding: 10px 12px; position: relative; overflow: hidden;
  transition: all .45s cubic-bezier(.22,.61,.36,1); }
.bs-stat .si { width: 22px; height: 22px; border-radius: 6px; display: grid;
  place-items: center; margin-bottom: 6px;
  background: rgba(0,184,132,0.12); color: #00b884; }
.bs-stat.blue   .si { background: rgba(54,102,255,0.10); color: #3666ff; }
.bs-stat.amber  .si { background: rgba(245,158,11,0.12); color: #f59e0b; }
.bs-stat.violet .si { background: rgba(139,92,246,0.12); color: #8b5cf6; }
.bs-stat .n  { font-size: 18px; font-weight: 800; letter-spacing: -0.02em;
  line-height: 1; font-variant-numeric: tabular-nums; }
.bs-stat .ll { font-size: 8.5px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px; }
.bs-stat.active        { background: white; border-color: rgba(0,184,132,0.25);  box-shadow: 0 6px 20px -8px rgba(0,184,132,0.25); }
.bs-stat.active.blue   { border-color: rgba(54,102,255,0.25);  box-shadow: 0 6px 20px -8px rgba(54,102,255,0.25); }
.bs-stat.active.violet { border-color: rgba(139,92,246,0.25);  box-shadow: 0 6px 20px -8px rgba(139,92,246,0.25); }

/* Stage */
.bs-stage { background: linear-gradient(180deg, rgba(248,250,252,0.8) 0%, rgba(239,246,252,0.4) 100%);
  border: 1px solid rgba(15,23,42,0.05); border-radius: 14px; padding: 12px;
  flex: 1; position: relative; overflow: hidden; min-height: 0; display: flex; flex-direction: column; }
.bs-stageHead { display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 6px; position: relative; z-index: 5; flex-shrink: 0; }
.bs-stageHead h4 { margin: 0; font-size: 11px; font-weight: 800; color: #334155; letter-spacing: -0.02em; }
.bs-levelBadge { font-family: 'JetBrains Mono', monospace; font-size: 9px;
  font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px;
  background: rgba(54,102,255,0.08); color: #3666ff; }
.bs-dots { display: flex; gap: 4px; align-items: center; }
.bs-pd { width: 6px; height: 6px; border-radius: 50%; background: #e2e8f0; transition: all .3s ease; }
.bs-pd.on { background: #00b884; box-shadow: 0 0 0 3px rgba(0,184,132,0.15); width: 16px; border-radius: 99px; }
.bs-pd.done { background: #0fd49b; }

.bs-caption { display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  background: #f0f9ff; color: #0c4a6e; border: 1px solid #bae6fd;
  border-radius: 10px; padding: 12px 18px; font-size: 13px; font-weight: 600; line-height: 1.4;
  transition: opacity .4s ease, transform .4s ease;
  opacity: 0; transform: translateY(4px); pointer-events: none; z-index: 9; }
.bs-caption.on { opacity: 1; transform: translateY(0); }
.bs-caption .cd { width: 9px; height: 9px; border-radius: 50%; background: #0891b2;
  box-shadow: 0 0 8px rgba(8,145,178,0.4); flex-shrink: 0; }

.bs-scene { position: absolute; inset: 12px 12px 12px 12px; top: 34px;
  opacity: 0; transition: opacity .45s ease; pointer-events: none; }
.bs-scene.on { opacity: 1; }

/* HERO */
.bs-heroStage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.bs-heroProduct { width: 230px; padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #eef2ff 100%);
  border: 1px solid rgba(54,102,255,0.2); border-radius: 16px;
  box-shadow: 0 24px 50px -16px rgba(54,102,255,0.3);
  transform: scale(0.85); opacity: 0;
  transition: all .7s cubic-bezier(.22,.61,.36,1);
  text-align: center; position: relative; z-index: 3; }
.bs-heroProduct.in { transform: scale(1); opacity: 1; }
.bs-heroProduct::after { content: ""; position: absolute; inset: -6px; border-radius: 22px;
  border: 1.5px solid rgba(54,102,255,0.3);
  animation: bs-heroRing 2.4s ease-out infinite; opacity: 0; pointer-events: none; }
.bs-heroProduct.in::after { opacity: 1; }
@keyframes bs-heroRing { 0% { transform: scale(0.92); opacity: 0.8; } 100% { transform: scale(1.18); opacity: 0; } }
.bs-heroImg { width: 80px; height: 80px; margin: 0 auto 10px;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-radius: 14px; display: grid; place-items: center; color: #3666ff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); }
.bs-heroTag { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
  color: #3666ff; background: rgba(54,102,255,0.1); padding: 2px 7px; border-radius: 4px;
  display: inline-block; margin-bottom: 6px; letter-spacing: 0.04em; }
.bs-heroTitle { font-size: 15px; font-weight: 800; letter-spacing: -0.01em; }
.bs-heroMeta { font-size: 10.5px; color: #64748b; margin-top: 3px; }
.bs-heroStats { display: flex; justify-content: center; gap: 12px; margin-top: 10px;
  padding-top: 9px; border-top: 1px dashed rgba(15,23,42,0.1); }
.bs-heroStats .hs { text-align: center; }
.bs-heroStats .hs .v { font-size: 14px; font-weight: 800; color: #00b884; font-variant-numeric: tabular-nums; line-height: 1; }
.bs-heroStats .hs .l { font-size: 8px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
.bs-q { position: absolute; font-size: 22px; font-weight: 800; color: #f59e0b;
  animation: bs-qBob 2.2s ease-in-out infinite; opacity: 0; transition: opacity .4s ease; }
.bs-q.in { opacity: 0.85; }
@keyframes bs-qBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

/* GRAPH */
.bs-graph { position: absolute; inset: 0;
  transition: transform .8s cubic-bezier(.22,.61,.36,1);
  transform-origin: center center; }
.bs-edges { position: absolute; inset: 0; pointer-events: none; }
.bs-edges svg { width: 100%; height: 100%; overflow: visible; }
.bs-edge { fill: none; stroke: #cbd5e1; stroke-width: 1.2;
  stroke-linecap: round; stroke-dasharray: 240; stroke-dashoffset: 240;
  transition: stroke-dashoffset .7s ease, stroke .4s ease; }
.bs-edge.in { stroke-dashoffset: 0; }
.bs-edge.lvl1 { stroke: #3666ff; stroke-opacity: 0.7; }
.bs-edge.lvl2 { stroke: #00b884; stroke-opacity: 0.7; }
.bs-edge.lvl3 { stroke: #8b5cf6; stroke-opacity: 0.7; }
.bs-edge.alt  { stroke: #00b884; stroke-opacity: 0.6; stroke-dasharray: 3 3; }
.bs-edge.alt.in { stroke-dashoffset: 0; }

.bs-node { position: absolute; transform: translate(-50%, -50%) scale(0.6);
  background: white; border: 1px solid rgba(15,23,42,0.1);
  border-radius: 9px; padding: 5px 8px; min-width: 70px;
  display: flex; flex-direction: column; gap: 1px;
  box-shadow: 0 6px 14px -6px rgba(15,23,42,0.18);
  opacity: 0; z-index: 2; pointer-events: none;
  transition: transform .55s cubic-bezier(.22,.61,.36,1), opacity .35s ease, border-color .4s ease, box-shadow .4s ease, filter .4s ease; }
.bs-node.in { transform: translate(-50%, -50%) scale(1); opacity: 1; }
.bs-node.dim { filter: grayscale(0.4); opacity: 0.55; }
.bs-node .nhead { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.bs-node .nsku { font-family: 'JetBrains Mono', monospace; font-size: 8px;
  font-weight: 700; color: #94a3b8; letter-spacing: -0.01em; }
.bs-node .nqty { font-family: 'JetBrains Mono', monospace; font-size: 8px;
  font-weight: 700; color: #64748b;
  background: #f1f5f9; padding: 1px 4px; border-radius: 3px;
  font-variant-numeric: tabular-nums; }
.bs-node .nname { font-size: 10px; font-weight: 700; color: #0b1322;
  letter-spacing: -0.01em; line-height: 1.15;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bs-node .nfoot { font-size: 8.5px; font-weight: 600; color: #94a3b8; letter-spacing: 0.04em; }

.bs-node.l0 { background: linear-gradient(180deg, #ffffff 0%, #eef2ff 100%);
  border-color: rgba(54,102,255,0.3); padding: 7px 10px; min-width: 120px;
  box-shadow: 0 10px 22px -8px rgba(54,102,255,0.35); }
.bs-node.l0 .nsku  { color: #3666ff; }
.bs-node.l0 .nname { font-size: 11.5px; font-weight: 800; }
.bs-node.l0 .nqty  { background: rgba(54,102,255,0.12); color: #3666ff; }
.bs-node.l0::before { content: ""; position: absolute; inset: -4px; border-radius: 13px;
  border: 1.5px solid rgba(54,102,255,0.22);
  animation: bs-heroRing 2.4s ease-out infinite; opacity: 1; pointer-events: none; z-index: -1; }

.bs-node.l1 { min-width: 80px; }
.bs-node.l1.focus { border-color: rgba(0,184,132,0.4);
  background: linear-gradient(180deg, #ffffff 0%, #ecfbf3 100%);
  box-shadow: 0 10px 22px -8px rgba(0,184,132,0.3); }
.bs-node.l1.focus .nsku { color: #00b884; }

.bs-node.l2 { min-width: 76px; padding: 4px 7px; }
.bs-node.l2 .nname { font-size: 9.5px; font-weight: 600; }
.bs-node.l2.focus { border-color: rgba(139,92,246,0.4);
  background: linear-gradient(180deg, #ffffff 0%, #f5efff 100%);
  box-shadow: 0 10px 22px -8px rgba(139,92,246,0.3); }
.bs-node.l2.focus .nsku { color: #8b5cf6; }
.bs-node.l2.altFocus { border-color: rgba(0,184,132,0.4);
  background: linear-gradient(180deg, #ffffff 0%, #ecfbf3 100%);
  box-shadow: 0 10px 22px -8px rgba(0,184,132,0.3); }
.bs-node.l2.altFocus .nsku { color: #00b884; }

.bs-node.l3 { min-width: 70px; padding: 3px 7px; border-style: dashed; background: #fbfdfc; }
.bs-node.l3 .nname { font-size: 9px; font-weight: 600; color: #475569; }
.bs-node.l3 .nsku  { color: #8b5cf6; }

.bs-node.alt { min-width: 90px; padding: 3px 7px;
  background: linear-gradient(90deg, #ffffff 0%, #ecfbf3 100%);
  border: 1px dashed rgba(0,184,132,0.45); }
.bs-node.alt .nname { font-size: 9px; font-weight: 700; }
.bs-node.alt .vendor { font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px; font-weight: 800; color: #00b884;
  background: rgba(0,184,132,0.12); padding: 1px 4px; border-radius: 3px; }
.bs-node.alt .altPill { background: #00b884; color: white;
  font-size: 7px; font-weight: 800; padding: 1px 4px; border-radius: 3px;
  letter-spacing: 0.06em; }

/* VOLUME */
.bs-volStage { position: absolute; inset: 0; }
.bs-volClone { position: absolute; inset: 0; transition: all .55s cubic-bezier(.22,.61,.36,1); }
.bs-volBadge { position: absolute; right: 8px; top: 0;
  background: linear-gradient(135deg, #00b884 0%, #3666ff 100%);
  color: white; padding: 8px 14px; border-radius: 10px; text-align: center; z-index: 9;
  box-shadow: 0 10px 22px -8px rgba(0,184,132,0.4);
  opacity: 0; transform: translateY(-6px) scale(0.9);
  transition: all .5s cubic-bezier(.22,.61,.36,1); }
.bs-volBadge.in { opacity: 1; transform: translateY(0) scale(1); }
.bs-volBadge .v { font-size: 22px; font-weight: 800; letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums; line-height: 1; }
.bs-volBadge .l { font-size: 9px; font-weight: 700; opacity: 0.92;
  letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; }
.bs-volTotal { position: absolute; left: 50%; bottom: 18px;
  transform: translateX(-50%); transition: all .5s cubic-bezier(.22,.61,.36,1); }
.bs-volTotalInner { display: inline-flex; align-items: baseline; gap: 6px;
  background: white; border: 1px solid rgba(0,184,132,0.3); border-radius: 10px;
  padding: 6px 14px; box-shadow: 0 10px 22px -10px rgba(0,184,132,0.35); }
.bs-volTotalInner .v { font-size: 22px; font-weight: 800; color: #00b884;
  font-variant-numeric: tabular-nums; letter-spacing: -0.02em; line-height: 1; }
.bs-volTotalInner .l { font-size: 10px; font-weight: 700; color: #475569;
  letter-spacing: 0.08em; text-transform: uppercase; }

/* COMBINE */
.bs-combineStage { position: absolute; inset: 0; }
.bs-reqCard { position: absolute; width: 132px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-left-width: 3px;
  border-radius: 9px; padding: 7px 10px;
  box-shadow: 0 6px 14px -6px rgba(15,23,42,0.18);
  transition: all .9s cubic-bezier(.5,.05,.5,1); }
.bs-reqCard .rh { display: flex; justify-content: space-between; align-items: center; }
.bs-reqCard .rh .rn { font-size: 10px; font-weight: 700; color: #0b1322; }
.bs-reqCard .rh .ri { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #94a3b8; }
.bs-reqCard .rm { font-size: 9.5px; color: #64748b; margin-top: 4px; display: flex; gap: 10px; }
.bs-combinedOut { position: absolute;
  background: linear-gradient(180deg, #ffffff 0%, #f1fbf6 100%);
  border: 1.5px solid rgba(0,184,132,0.45); border-radius: 12px; padding: 12px 14px;
  box-shadow: 0 18px 30px -10px rgba(0,184,132,0.35);
  transition: all .6s cubic-bezier(.22,.61,.36,1);
  width: 220px; opacity: 0; transform: scale(0.85); }
.bs-combinedOut.in { opacity: 1; transform: scale(1); }
.bs-combinedOut .coTag { display: inline-block; background: #00b884; color: white;
  font-size: 9px; font-weight: 800; padding: 3px 7px; border-radius: 4px; letter-spacing: 0.06em; }
.bs-combinedOut h5 { margin: 6px 0 4px; font-size: 13px; font-weight: 800; }
.bs-combinedOut .coMeta { font-size: 10px; color: #64748b; }
.bs-combinedOut .coStats { display: flex; gap: 14px; margin-top: 8px; padding-top: 8px;
  border-top: 1px dashed rgba(15,23,42,0.1); }
.bs-combinedOut .coStat .v { font-size: 16px; font-weight: 800; color: #00b884;
  font-variant-numeric: tabular-nums; line-height: 1; }
.bs-combinedOut .coStat .l { font-size: 8.5px; font-weight: 700; color: #94a3b8;
  letter-spacing: 0.06em; text-transform: uppercase; margin-top: 2px; }
.bs-mergeLine { position: absolute; height: 1.5px;
  background: linear-gradient(90deg, rgba(0,184,132,0) 0%, rgba(0,184,132,0.65) 100%);
  transform-origin: left center; opacity: 0; transition: opacity .4s ease; }
.bs-mergeLine.in { opacity: 1; }
.bs-mergeLine::after { content: ""; position: absolute; right: -5px; top: -3px;
  border: 4px solid transparent; border-left-color: #00b884; }

/* FINALE */
.bs-finale { position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; padding: 0 14px; }
.bs-fbig { font-size: 54px; font-weight: 800; letter-spacing: -0.04em;
  background: linear-gradient(135deg, #00b884 0%, #3666ff 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1; }
.bs-fsub { font-size: 13px; font-weight: 700; color: #475569; letter-spacing: 0.08em;
  text-transform: uppercase; margin-top: -4px; }
.bs-compare { display: flex; gap: 14px; align-items: center;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
  padding: 10px 16px; box-shadow: 0 12px 28px -10px rgba(15,23,42,0.15); margin-top: 4px; }
.bs-compare .col { text-align: center; }
.bs-compare .col .v { font-size: 16px; font-weight: 800; font-variant-numeric: tabular-nums; }
.bs-compare .col .l { font-size: 9px; font-weight: 700; color: #94a3b8;
  margin-top: 2px; letter-spacing: 0.08em; text-transform: uppercase; }
.bs-compare .col.before .v { color: #94a3b8; text-decoration: line-through; }
.bs-compare .col.after  .v { color: #00b884; }
.bs-compare .arrow { color: #00b884; }
.bs-fchips { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; justify-content: center; }
.bs-fchip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px;
  background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 999px;
  font-size: 10px; font-weight: 600; color: #475569;
  box-shadow: 0 4px 10px -6px rgba(15,23,42,0.15);
  opacity: 0; transform: translateY(4px); transition: all .4s ease; }
.bs-fchip.in { opacity: 1; transform: translateY(0); }
.bs-fchip .ic { color: #00b884; }

/* Feature pills */
.bs-pills { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.bs-pill { display: flex; align-items: center; gap: 9px; padding: 9px 12px;
  background: white; border: 1px solid rgba(15,23,42,0.07); border-radius: 10px;
  font-size: 11.5px; font-weight: 600; color: #334155; transition: all .4s ease; }
.bs-pill .pi { width: 24px; height: 24px; border-radius: 6px;
  background: rgba(54,102,255,0.08); color: #3666ff;
  display: grid; place-items: center; flex-shrink: 0; }
.bs-pill .pd { width: 7px; height: 7px; border-radius: 50%; background: #e2e8f0;
  margin-left: auto; transition: all .4s ease; }
.bs-pill.lit { border-color: rgba(0,184,132,0.4);
  background: linear-gradient(180deg, #ffffff 0%, #f1fbf6 100%);
  box-shadow: 0 8px 22px -8px rgba(0,184,132,0.3); }
.bs-pill.lit .pd { background: #00b884; box-shadow: 0 0 0 4px rgba(0,184,132,0.15); }
.bs-pill.lit .pi { background: rgba(0,184,132,0.12); color: #00b884; }
`;

/* ============ HOOK: animated counter ============ */
function useCount(target: number, active: boolean, dur = 1000): number {
  const [v, setV] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    if (!active) { setV(0); fromRef.current = 0; return; }
    const start = performance.now();
    const from = fromRef.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(from + (target - from) * eased);
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick); else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

/* ============ MAIN COMPONENT ============ */
export default function ScaleAnimation({ speed = 0.5, onPhaseChange }: ScaleAnimationProps) {
  const t = useLocalizedText();

  useEffect(() => {
    if (document.getElementById("bs-style")) return;
    const s = document.createElement("style");
    s.id = "bs-style"; s.textContent = BS_STYLE;
    document.head.appendChild(s);
  }, []);

  const [phase, setPhase] = useState<Phase>(2);
  const [l1n, setL1n] = useState(0);
  const [l2n, setL2n] = useState(0);
  const [l3n, setL3n] = useState(0);
  const [rfqStep, setRfqStep] = useState(0);

  const cancelRef = useRef(false);
  const speedMul = Math.max(0.3, Number(speed) || 1);

  useEffect(() => {
    cancelRef.current = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms / speedMul));

    async function loop() {
      while (!cancelRef.current) {
        setL1n(0); setL2n(0); setL3n(0); setRfqStep(0);

        // Phase 2 — L1
        setPhase(2); onPhaseChange?.(2);
        for (let i = 1; i <= L1.length; i++) { if (cancelRef.current) return; setL1n(i); await sleep(350); }
        await sleep(1000);

        // Phase 3 — L2
        setPhase(3); onPhaseChange?.(3);
        for (let i = 1; i <= L2.length; i++) { if (cancelRef.current) return; setL2n(i); await sleep(300); }
        await sleep(1000);

        // Phase 4 — L3
        setPhase(4); onPhaseChange?.(4);
        for (let i = 1; i <= L3.length; i++) { if (cancelRef.current) return; setL3n(i); await sleep(300); }
        await sleep(1400);

        // Phase 5 — RFQ scene: cards fan in, then RFQ card highlights
        setPhase(5); onPhaseChange?.(5);
        setRfqStep(0);
        await sleep(200);
        for (let i = 1; i <= 3; i++) { if (cancelRef.current) return; setRfqStep(i); await sleep(350); }
        await sleep(300);
        setRfqStep(4); // arrow + RFQ card appear
        await sleep(3000);
      }
    }
    void loop();
    return () => { cancelRef.current = true; };
  }, [speedMul, onPhaseChange]);

  const stageTitle =
    phase === 2 ? "Level 1 — Sub-Assemblies" :
    phase === 3 ? "Level 2 — Sub-BOM" :
    phase === 4 ? "Level 3 — Sub-Sub-BOM" :
    "RFQ · Multi-Plant Merge";

  const stageLevel =
    phase === 2 ? "L1" :
    phase === 3 ? "L1 › L2" :
    phase === 4 ? "L1 › L2 › L3" : null;

  interface Edge { key: string; from: BOMNode; to: BOMNode; level: string; shown: boolean; }
  const edges: Edge[] = [
    ...L1.map((n, i) => ({ key: "e-root-" + n.id, from: ROOT, to: n, level: "lvl1", shown: phase >= 2 && l1n > i })),
    ...L2.map((n, i) => ({ key: "e-g02-" + n.id, from: NODE_BY_ID[n.parent!], to: n, level: "lvl2", shown: phase >= 3 && l2n > i })),
    ...L3.map((n, i) => ({ key: "e-g22-" + n.id, from: NODE_BY_ID[n.parent!], to: n, level: "lvl3", shown: phase >= 4 && l3n > i })),
  ];

  const graphTransform = phase === 4 ? "scale(1.04) translateY(-3%)" : "scale(1)";

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden">

      {/* Dynamic Inject Style element */}
      <style dangerouslySetInnerHTML={{ __html: BS_STYLE }} />

      {/* Main Dashboard Frame */}
      <div className="relative w-full max-w-[691px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-200/70 z-10 overflow-hidden flex flex-col" style={{ height: 577 }}>

        {/* Browser Chrome Header */}
        <div className="flex items-center justify-between px-4 bg-slate-50/90 backdrop-blur-md border-b border-slate-100 shrink-0" style={{ height: 32 }}>
          <div className="flex gap-1.5">
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full shadow-xs transition-transform hover:scale-110" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 max-w-xs mx-auto">
            <div className="h-5 bg-white/80 backdrop-blur-md rounded-md border border-slate-200/60 flex items-center px-3 gap-1.5 shadow-2xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7.5px] text-slate-400 font-mono select-none tracking-tight">factwise.io/sourcing/bom-explorer</span>
            </div>
          </div>
          <div className="w-10 shrink-0" />
        </div>

        {/* Dashboard Content */}
        <div className="bs-dash">
          <div className="bs-body">
            <div className="bs-rail">
              <div className="bs-railIc active"><GitFork className="w-4 h-4" /></div>
              <div className="bs-railIc"><Grid3x3 className="w-4 h-4" /></div>
              <div className="bs-railIc"><Layers className="w-4 h-4" /></div>
              <div className="bs-railIc accent"><Plus className="w-4 h-4" /></div>
            </div>

            <div className="bs-main">
              <div className="bs-headStrip">
                <div>
                  <h3>{t("BOM Explorer · RFQ")}</h3>
                  <div className="bs-sub">{t("Multi-level · Sub-BOMs · At any scale")}</div>
                </div>
                <div className="bs-livePill">{t("Live")}</div>
              </div>

              <div className="bs-stage">
                <div className="bs-stageHead">
                  <h4>
                    {stageTitle}
                    {stageLevel && <span className="bs-levelBadge">{stageLevel}</span>}
                  </h4>
                  <div className="bs-dots">
                    {[2, 3, 4, 5].map((i) => (
                      <div key={i} className={"bs-pd " + (phase === i ? "on" : phase > i ? "done" : "")} />
                    ))}
                  </div>
                </div>

                {/* BOM graph — visible during phases 2–4 */}
                <SceneGraph
                  active={phase >= 2 && phase <= 4}
                  phase={phase}
                  l1n={l1n} l2n={l2n} l3n={l3n} altn={0}
                  edges={edges}
                  graphTransform={graphTransform}
                />

                {/* Scale callout — visible during BOM phases */}
                <div style={{
                  position: "absolute", bottom: 14, right: 14, zIndex: 10,
                  background: "linear-gradient(135deg, #eff4ff 0%, #dbeafe 100%)",
                  border: "1.5px solid rgba(54,102,255,0.25)", borderRadius: 12,
                  padding: "10px 16px", boxShadow: "0 8px 24px -8px rgba(54,102,255,0.3)",
                  display: "flex", flexDirection: "column", gap: 4, minWidth: 110,
                  opacity: phase <= 4 ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#1e3a8a", letterSpacing: "-0.02em", lineHeight: 1 }}>3000 items</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#3666ff", letterSpacing: "-0.02em", lineHeight: 1 }}>100 vendors</span>
                  </div>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>{t("At any scale")}</span>
                </div>

                {/* RFQ scene — visible during phase 5 */}
                <div className={"bs-scene " + (phase === 5 ? "on" : "")}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 24px", gap: 20 }}>
                    {/* Req cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {REQS.map((r, i) => (
                        <div key={r.id} style={{
                          padding: "8px 14px", borderRadius: 8, background: "white",
                          borderLeft: `3px solid ${r.color}`,
                          boxShadow: "0 4px 12px -6px rgba(15,23,42,0.15)",
                          fontSize: 11, fontWeight: 700, color: "#334155", whiteSpace: "nowrap",
                          display: "flex", alignItems: "center", gap: 8,
                          opacity: rfqStep > i ? 1 : 0,
                          transform: rfqStep > i ? "translateX(0)" : "translateX(-18px)",
                          transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                        }}>
                          <span style={{ color: r.color, fontWeight: 800 }}>{r.plant}</span>
                          <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: 10 }}>{r.qty.toLocaleString()} {t("qty")}</span>
                        </div>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div style={{
                      flex: 1, display: "flex", alignItems: "center",
                      opacity: rfqStep >= 4 ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}>
                      <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, rgba(0,184,132,0.3) 0%, rgba(0,184,132,0.9) 100%)" }} />
                      <div style={{ color: "#00b884", fontSize: 14, marginLeft: -1, lineHeight: 1 }}>▶</div>
                    </div>

                    {/* RFQ card */}
                    <div style={{
                      padding: "16px 20px", flexShrink: 0,
                      background: "linear-gradient(180deg, #ffffff 0%, #f1fbf6 100%)",
                      border: `2px solid ${rfqStep >= 4 ? "rgba(0,184,132,0.6)" : "rgba(0,184,132,0.2)"}`,
                      borderRadius: 14,
                      boxShadow: rfqStep >= 4
                        ? "0 0 0 5px rgba(0,184,132,0.12), 0 20px 40px -10px rgba(0,184,132,0.4)"
                        : "0 4px 20px -8px rgba(0,184,132,0.15)",
                      opacity: rfqStep >= 4 ? 1 : 0,
                      transform: rfqStep >= 4 ? "scale(1)" : "scale(0.88)",
                      transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>
                      <span style={{ background: "#00b884", color: "white", fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.06em" }}>RFQ</span>
                      <div style={{ fontSize: 17, fontWeight: 800, marginTop: 7, color: "#0b1322", letterSpacing: "-0.01em" }}>RFQ-EVT-9043</div>
                      <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{t("3 plants · 100 vendors")}</div>
                      <div style={{ display: "flex", gap: 18, marginTop: 11, paddingTop: 9, borderTop: "1px dashed rgba(15,23,42,0.1)" }}>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: "#00b884", lineHeight: 1 }}>−12%</div>
                          <div style={{ fontSize: 8.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>{t("Price")}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: "#3666ff", lineHeight: 1 }}>3×</div>
                          <div style={{ fontSize: 8.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>{t("Leverage")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* end bs-stage */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ STAT / PILL ============ */
function BSPill({ icon, label, lit }: { icon: React.ReactNode; label: string; lit?: boolean }) {
  return (
    <div className={"bs-pill" + (lit ? " lit" : "")}>
      <div className="pi">{icon}</div>
      <span>{label}</span>
      <div className="pd" />
    </div>
  );
}

/* ============ SCENE: HERO ============ */
function SceneHero({ active }: { active: boolean }) {
  const t = useLocalizedText();
  return (
    <div className={"bs-scene " + (active ? "on" : "")}>
      <div className="bs-heroStage">
        <div className={"bs-heroProduct " + (active ? "in" : "")}>
          <div className="bs-heroImg"><Cog className="w-11 h-11" strokeWidth={1.6} /></div>
          <div className="bs-heroTag">{ROOT.sku}</div>
          <div className="bs-heroTitle">{t(ROOT.name)}</div>
          <div className="bs-heroMeta">{t("Tier-1 OEM · Production unit")}</div>
          <div className="bs-heroStats">
            <div className="hs"><div className="v">4</div><div className="l">{t("Levels")}</div></div>
            <div className="hs"><div className="v">{ROOT.parts}</div><div className="l">{t("Parts")}</div></div>
            <div className="hs"><div className="v">18</div><div className="l">{t("Vendors")}</div></div>
          </div>
        </div>
        <div className={"bs-q " + (active ? "in" : "")} style={{ left: "12%", top: "22%", animationDelay: "0s" }}>?</div>
        <div className={"bs-q " + (active ? "in" : "")} style={{ right: "12%", top: "18%", animationDelay: ".3s" }}>?</div>
        <div className={"bs-q " + (active ? "in" : "")} style={{ left: "10%", bottom: "20%", animationDelay: ".6s" }}>?</div>
        <div className={"bs-q " + (active ? "in" : "")} style={{ right: "14%", bottom: "24%", animationDelay: ".9s" }}>?</div>
      </div>
    </div>
  );
}

/* ============ SCENE: BOM GRAPH ============ */
interface SceneGraphProps {
  active: boolean;
  phase: Phase;
  l1n: number; l2n: number; l3n: number; altn: number;
  edges: { key: string; from: BOMNode; to: BOMNode; level: string; shown: boolean }[];
  graphTransform: string;
}
function SceneGraph({ active, phase, l1n, l2n, l3n, altn, edges, graphTransform }: SceneGraphProps) {
  const t = useLocalizedText();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 300 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    setDims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const isShown = (n: BOMNode): boolean => {
    if (n.id === "root") return phase >= 1;
    if (n.level === 1) return phase >= 2 && l1n > L1.indexOf(n);
    if (n.level === 2) return phase >= 3 && l2n > L2.indexOf(n);
    if (n.level === 3) return phase >= 4 && l3n > L3.indexOf(n);
    if (n.level === "alt") return phase >= 5 && altn > ALT.indexOf(n);
    return false;
  };
  const isDim = (n: BOMNode): boolean => {
    return false;
  };

  /** Convert % coords → pixel path, matching CSS left/top percentages exactly */
  function edgePathPx(p: BOMNode, c: BOMNode): string {
    const { w, h } = dims;
    // node y offset: bottom of parent node, top of child node (approx 3% of height)
    const exitPx = h * 0.03;
    const entryPx = h * 0.03;
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

  return (
    <div className={"bs-scene " + (active ? "on" : "")}>
      <div ref={containerRef} className="bs-graph" style={{ transform: graphTransform }}>
        {/* Edges — SVG in pixel space so curves align with CSS-positioned nodes */}
        <div className="bs-edges">
          <svg width={dims.w} height={dims.h} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {edges.map((e) => (
              <path key={e.key}
                d={edgePathPx(e.from, e.to)}
                className={"bs-edge " + e.level + (e.shown ? " in" : "")}
                pathLength={240}
              />
            ))}
          </svg>
        </div>

        {/* Nodes */}
        {NODES.map((n) => {
          const shown = isShown(n);
          const dim = isDim(n);
          const lvlClass = n.level === "alt" ? "lalt alt" : "l" + n.level;
          const cls = "bs-node " + lvlClass
            + (n.focus ? " focus" : "")
            + (n.altFocus ? " altFocus" : "")
            + (shown ? " in" : "")
            + (dim ? " dim" : "");
          return (
            <div key={n.id} className={cls} style={{ left: n.x + "%", top: n.y + "%" }}>
              {n.level === "alt" ? (
                <>
                  <div className="nhead">
                    <span className="altPill">ALT</span>
                    <span className="vendor">{n.vendor}</span>
                  </div>
                  <div className="nname">{t(n.name)}</div>
                </>
              ) : (
                <>
                  <div className="nhead">
                    <span className="nsku">{n.sku}</span>
                    <span className="nqty">×{n.qty}</span>
                  </div>
                  <div className="nname">{t(n.name)}</div>
                  {n.parts && n.level !== 0 && <div className="nfoot">{n.parts} {t("parts")}</div>}
                  {n.level === 2 && n.altFocus && phase >= 5 && (
                    <div className="nfoot" style={{ color: "#069668" }}>{t("+3 alternates")}</div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



/* ============ SCENE: COMBINE ============ */
function SceneCombine({ active, combined }: { active: boolean; combined: boolean }) {
  const t = useLocalizedText();
  return (
    <div className={"bs-scene " + (active ? "on" : "")}>
      <div className="bs-combineStage">
        {REQS.map((it, i) => (
          <div key={it.id} className="bs-reqCard" style={{
            left: combined ? "50%" : "24px",
            top: combined ? "50%" : `calc(50% + ${(i - 1) * 58 - 22}px)`,
            transform: combined
              ? `translate(-50%, calc(-50% - 6px)) scale(0.7)`
              : "translate(0,0) scale(1)",
            opacity: combined ? 0 : 1,
            transitionDelay: combined ? `${i * 60}ms` : "0ms",
            borderLeftColor: it.color,
          }}>
            <div className="rh">
              <span className="rn">{it.plant}</span>
              <span className="ri">{it.id}</span>
            </div>
            <div className="rm">
              <span>{it.lines} {t("lines")}</span>
              <span style={{ color: it.color, fontWeight: 700 }}>{it.qty.toLocaleString()} {t("qty")}</span>
            </div>
          </div>
        ))}
        {REQS.map((it, i) => (
          <div key={"ml-" + it.id} className={"bs-mergeLine " + (combined ? "in" : "")} style={{
            left: 164,
            top: `calc(50% + ${(i - 1) * 58}px)`,
            width: 100,
            transform: `rotate(${(i - 1) * -14}deg)`,
            transitionDelay: `${100 + i * 70}ms`,
          }} />
        ))}
        <div className={"bs-combinedOut " + (combined ? "in" : "")} style={{
          right: 24, top: "50%",
          transform: combined ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0.85)",
        }}>
          <span className="coTag">RFQ</span>
          <h5>{t("RFQ-EVT-9043 · 3 plants")}</h5>
          <div className="coMeta">{t("54 lines · 3,300 units · 100 vendors")}</div>
          <div className="coStats">
            <div className="coStat"><div className="v">−12%</div><div className="l">{t("Quoted price")}</div></div>
            <div className="coStat"><div className="v">3×</div><div className="l">{t("Vendor leverage")}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ SCENE: FINALE ============ */
function SceneFinale({ active, chips }: { active: boolean; chips: number }) {
  const t = useLocalizedText();
  const v = useCount(40, active, 1300);
  void chips;
  return (
    <div className={"bs-scene " + (active ? "on" : "")}>
      <div className="bs-finale">
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <div className="bs-fbig">{v}%</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0b1322" }}>{t("faster")}</div>
        </div>
        <div className="bs-fsub">{t("At any scale")}</div>
        <div className="bs-compare">
          <div className="col before"><div className="v">480 min</div><div className="l">{t("Manual")}</div></div>
          <div className="arrow"><ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} /></div>
          <div className="col after"><div className="v">48 min</div><div className="l">FactWise</div></div>
        </div>
      </div>
    </div>
  );
}
