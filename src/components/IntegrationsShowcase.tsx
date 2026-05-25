'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

// Sub revealed (3-way branch style) when a suite pill is clicked
const SUITE_SUBMODULES: Record<string, { cx: number; items: { label: string; tip: string }[] }> = {
  source: {
    cx: 444,
    items: [
      { label: 'RFQ / RFI / RFP', tip: 'Run sourcing events and collect structured bids from vendors.' },
      { label: 'Bid Analytics',   tip: 'Compare bids, run scenarios, and pick the best landed cost.' },
      { label: 'Quote',           tip: 'Generate the customer-facing quote in one click.' },
      { label: 'BOM Cost',        tip: 'Roll up BOM costs with live prices and alternates.' },
      { label: 'Contracts',       tip: 'Store, search and track contract terms and expiry.' },
    ],
  },
  procure: {
    cx: 530,
    items: [
      { label: 'Requisitions', tip: 'Raise and combine internal purchase requests.' },
      { label: 'Approvals',    tip: 'Route approvals by value, category and policy.' },
      { label: 'Purchase Orders', tip: 'Issue multi-vendor POs in one click.' },
      { label: 'Goods Receipt',   tip: 'Record receipts against POs.' },
      { label: 'Quality Check',   tip: 'Inspect and accept/reject received goods.' },
    ],
  },
  pay: {
    cx: 616,
    items: [
      { label: 'Invoice Capture', tip: 'Ingest supplier invoices automatically.' },
      { label: '3-Way Match',     tip: 'Validate invoice against PO, GR and contract terms.' },
      { label: 'Payments',        tip: 'Release controlled payments once matched.' },
      { label: 'Audit Trail',     tip: 'Full immutable history of every action.' },
    ],
  },
};

type Tip = { x: number; y: number; title: string; body: string; kind: 'factwise' | 'external' } | null;

export default function IntegrationsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [expandedSuite, setExpandedSuite] = useState<string | null>(null);
  const [tip, setTip] = useState<Tip>(null);

  // Position a tooltip above the hovered SVG node, relative to the diagram container
  const showTip = (el: SVGGraphicsElement, body: string, kind: 'factwise' | 'external', title: string) => {
    if (!diagramRef.current) return;
    const cr = diagramRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setTip({ x: r.left - cr.left + r.width / 2, y: r.top - cr.top, title, body, kind });
  };
  const hideTip = () => setTip(null);
  


  // Staggered node entrance
  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll(".anim-node");
    nodes?.forEach((n, i) => {
      const el = n as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = `opacity 0.6s ${i * 0.06}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s ${i * 0.06}s cubic-bezier(0.22, 1, 0.36, 1)`;
      
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, []);

  const PATHS = [
    { d: "M 192,64  H 736",               dur: 3.8, begin: 0,    begin2: 1.9 },
    { d: "M 334,64  V 150",               dur: 1.0, begin: 0.3 },
    { d: "M 730,64  V 150",               dur: 1.0, begin: 0.7 },
    { d: "M 334,186 V 270 H 468",         dur: 2.0, begin: 0.5 },
    { d: "M 730,186 V 270 H 594",         dur: 2.0, begin: 0.9 },
    { d: "M 392,270 H 468",               dur: 1.4, begin: 0.6 },
    { d: "M 594,270 H 670",               dur: 1.1, begin: 0.2 },
    { d: "M 832,270 H 876",               dur: 0.8, begin: 1.4 },
    { d: "M 530,308 V 352",               dur: 1.0, begin: 0.8 },
    { d: "M 530,388 V 418 H 444 V 438",   dur: 1.3, begin: 0.4 },
    { d: "M 530,388 V 438",               dur: 1.0, begin: 0.8 },
    { d: "M 530,388 V 418 H 616 V 438",   dur: 1.3, begin: 1.1 },
  ];

  // Pill node helper
  // variant "external" = dashed grey outline (systems FactWise connects to)
  // variant "factwise" = solid blue accent (FactWise's own modules) — default
  const Pill = ({ x, y, w, h = 36, label, rx = 9, large = false, variant = "factwise", onClick, active = false, tooltip }: { x: number, y: number, w: number, h?: number, label: string, rx?: number, large?: boolean, variant?: "factwise" | "external", onClick?: () => void, active?: boolean, tooltip?: string }) => {
    const isExternal = variant === "external";
    const defaultFill = large ? "#3666ff" : (active ? "#3666ff" : "#FFFFFF");
    const defaultStroke = large ? "none" : (active ? "#3666ff" : (isExternal ? "#CBD5E1" : "#BFD0FF"));
    const defaultText = large ? "#FFFFFF" : (active ? "#FFFFFF" : (isExternal ? "#94A3B8" : "#3666ff"));
    const fontSize = large ? 19 : 13;
    const fontWeight = large ? "800" : (isExternal ? "600" : "700");
    const title = isExternal ? "CONNECTS TO" : "FACTWISE";

    return (
      <g className="anim-node" style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
        {large && (
          <>
            {/* Soft pulsing glow behind main hub */}
            <rect x={x - 22} y={y - h / 2 - 22} width={w + 44} height={h + 44} rx={22}
              fill="#3666ff" opacity={0.06} />
            <rect x={x - 12} y={y - h / 2 - 12} width={w + 24} height={h + 24} rx={18}
              fill="#3666ff" opacity={0.1} />
          </>
        )}
        <rect
          x={x} y={y - h / 2} width={w} height={h} rx={rx}
          fill={defaultFill}
          stroke={defaultStroke}
          strokeWidth={large ? 0 : 1.5}
          strokeDasharray={isExternal ? "4 3" : undefined}
          style={{ transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
          onMouseEnter={e => {
            if (tooltip) showTip(e.currentTarget, tooltip, isExternal ? 'external' : 'factwise', title);
            if (!large && !active) {
              e.currentTarget.style.stroke = "#3666ff";
              e.currentTarget.style.fill = "#F8FAFF";
              const txt = e.currentTarget.parentElement?.querySelector("text");
              if (txt) {
                txt.style.fill = "#3666ff";
                txt.style.fontWeight = "700";
              }
            } else if (large) {
              e.currentTarget.style.filter = "brightness(1.08) saturate(1.05)";
            }
          }}
          onMouseLeave={e => {
            hideTip();
            if (!large && !active) {
              e.currentTarget.style.stroke = defaultStroke;
              e.currentTarget.style.fill = defaultFill;
              const txt = e.currentTarget.parentElement?.querySelector("text");
              if (txt) {
                txt.style.fill = defaultText;
                txt.style.fontWeight = fontWeight;
              }
            } else if (large) {
              e.currentTarget.style.filter = "none";
            }
          }}
        />
        {large && (
          <rect x={x + 1} y={y - h / 2 + 1} width={w - 2} height={h * 0.35} rx={rx}
            fill="rgba(255,255,255,0.12)" pointerEvents="none" />
        )}
        <text
          x={x + w / 2} y={y}
          dominantBaseline="central" textAnchor="middle"
          fill={defaultText} fontSize={fontSize}
          fontFamily="Inter, sans-serif" fontWeight={fontWeight}
          letterSpacing="-0.015em"
          style={{ transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)", pointerEvents: "none" }}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 bg-white overflow-hidden"
    >
      {/* Background Glows & Noise */}
      <div 
        className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-40"
        style={{ 
          background: 'radial-gradient(circle, rgba(54, 102, 255, 0.2) 0%, rgba(54, 102, 255, 0.05) 30%, transparent 70%)',
          willChange: 'transform'
        }} 
      />
      <div 
        className="absolute -left-32 -top-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{ 
          background: 'radial-gradient(circle, rgba(54, 102, 255, 0.15) 0%, transparent 70%)',
        }} 
      />
      <div className="absolute inset-0 noise opacity-20 pointer-events-none" />

      <div 
        className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10"
      >
        <div className="mb-24">
          <SectionHeader
            label="Integrations"
            title={
              <>
                FactWise runs Source-to-Pay. <span className="text-[#3666ff]">It plugs into the systems you already have.</span>
              </>
            }
            description="FactWise owns the Source → Procure → Pay workflow end-to-end — RFQs, quotes, requisitions, POs, goods receipt, quality checks, invoice matching and payments. It connects to your existing ERP, CRM, BOM, inventory and supplier systems via APIs, MCP and pre-built integrations — so you keep your systems of record and FactWise orchestrates the procurement on top."
            align="center"
          />
        </div>

        <div
          ref={sectionRef}
          className="relative w-full"
        >
          {/* Dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(54, 102, 255, 0.12) 1.5px, transparent 1.5px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div ref={diagramRef} className="relative z-10">
            {/* Hover tooltip — clarifies "FactWise does this" vs "connects to your system" */}
            <AnimatePresence>
              {tip && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute z-30 w-[230px] -translate-x-1/2 -translate-y-full"
                  style={{ left: tip.x, top: tip.y - 12 }}
                >
                  <div className="rounded-xl bg-white shadow-[0_12px_40px_-8px_rgba(15,23,42,0.25)] border border-slate-100 px-3.5 py-2.5">
                    <div
                      className="text-[9px] font-bold tracking-[0.12em] mb-1 flex items-center gap-1.5"
                      style={{ color: tip.kind === 'external' ? '#94A3B8' : '#3666ff' }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: tip.kind === 'external' ? '#CBD5E1' : '#3666ff' }}
                      />
                      {tip.kind === 'external' ? 'CONNECTS TO · YOUR SYSTEM' : 'BUILT INTO FACTWISE'}
                    </div>
                    <div className="text-[12px] leading-snug text-slate-600">{tip.body}</div>
                  </div>
                  {/* caret */}
                  <div className="mx-auto h-2 w-2 rotate-45 bg-white border-r border-b border-slate-100 -mt-1" />
                </motion.div>
              )}
            </AnimatePresence>

            <svg
              viewBox={`0 0 945 ${expandedSuite ? 660 : 530}`}
              className="w-full max-w-[945px] mx-auto overflow-visible block"
              style={{ transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes flipCard3D {
                  0%, 35% {
                    transform: rotateY(0deg);
                  }
                  45%, 85% {
                    transform: rotateY(180deg);
                  }
                  95%, 100% {
                    transform: rotateY(360deg);
                  }
                }
                .flip-container {
                  perspective: 1000px;
                  width: 48px;
                  height: 48px;
                }
                .flip-card-inner {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  text-align: center;
                  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                  transform-style: preserve-3d;
                  animation: flipCard3D 6s infinite ease-in-out;
                }
                .flip-card-front, .flip-card-back {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  backface-visibility: hidden;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                }
                .flip-card-front {
                  transform: rotateY(0deg);
                }
                .flip-card-back {
                  transform: rotateY(180deg);
                }
              `}} />

              {/* ── Dashed connection paths ── */}
              <g fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.48">
                <path d="M 192,64  H 736" />
                <path d="M 334,64  V 150" />
                <path d="M 730,64  V 150" />
                <path d="M 334,186 V 270 H 468" />
                <path d="M 730,186 V 270 H 594" />
                <path d="M 132,270 H 172" />
                <path d="M 392,270 H 468" />
                <path d="M 594,270 H 670" />
                <path d="M 832,270 H 876" />
                <path d="M 530,308 V 352" />
                <path d="M 530,388 V 418 H 444 V 438" />
                <path d="M 530,388 V 438" />
                <path d="M 530,388 V 418 H 616 V 438" />
              </g>

              {/* ── Junction dots ── */}
              <circle cx="334" cy="64"  r="4" fill="#3666ff" />
              <circle cx="730" cy="64"  r="4" fill="#3666ff" />
              <circle cx="530" cy="388" r="4" fill="#3666ff" />

              {/* ── Animated traveling dots ── */}
              {PATHS.map(({ d, dur, begin, begin2 }, i) => (
                <g key={i}>
                  <circle r="3.5" fill="#3666ff" opacity="0">
                    <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
                    <animate attributeName="opacity" values="0;1;1;0"
                      keyTimes="0;0.07;0.93;1" dur={`${dur}s`}
                      repeatCount="indefinite" begin={`${begin}s`} />
                  </circle>
                  {begin2 !== undefined && (
                    <circle r="3.5" fill="#3666ff" opacity="0">
                      <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin2}s`} />
                      <animate attributeName="opacity" values="0;1;1;0"
                        keyTimes="0;0.07;0.93;1" dur={`${dur}s`}
                        repeatCount="indefinite" begin={`${begin2}s`} />
                    </circle>
                  )}
                </g>
              ))}

              {/* ── App icon grid (far left) ── */}
              <rect x="5" y="217" width="123" height="110" rx="14"
                fill="none" stroke="#3666ff" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.25" />
              {[
                {
                  x: 12,
                  y: 222,
                  front: { bg: "#0066B2", label: "SAP", tc: "#ffffff", fs: 14, fw: "700" },
                  back: { bg: "#1A1A1A", label: "NS", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0s"
                },
                {
                  x: 68,
                  y: 222,
                  front: { bg: "#00A1E0", label: "SF", tc: "#ffffff", fs: 16, fw: "700" },
                  back: { bg: "#0078D4", label: "D365", tc: "#ffffff", fs: 12, fw: "700" },
                  delay: "0.3s"
                },
                {
                  x: 12,
                  y: 278,
                  front: { bg: "#CC0000", label: "DK", tc: "#ffffff", fs: 16, fw: "700" },
                  back: { bg: "#003DA5", label: "MO", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0.6s"
                },
                {
                  x: 68,
                  y: 278,
                  front: { bg: "#1B5E20", label: "OC", tc: "#ffffff", fs: 16, fw: "700" },
                  back: { bg: "#4A154B", label: "SL", tc: "#ffffff", fs: 16, fw: "700" },
                  delay: "0.9s"
                }
              ].map(({ x, y, front, back, delay }, i) => (
                <foreignObject key={i} x={x} y={y} width="48" height="48" className="anim-node">
                  <div className="flip-container select-none">
                    <div className="flip-card-inner" style={{ animationDelay: delay }}>
                      {/* Front Face */}
                      <div className="flip-card-front" style={{ backgroundColor: front.bg }}>
                        <span 
                          style={{ 
                            color: front.tc, 
                            fontSize: `${front.fs}px`, 
                            fontWeight: front.fw,
                            fontFamily: "Inter, sans-serif"
                          }}
                        >
                          {front.label}
                        </span>
                      </div>
                      {/* Back Face */}
                      <div className="flip-card-back" style={{ backgroundColor: back.bg }}>
                        <span 
                          style={{ 
                            color: back.tc, 
                            fontSize: `${back.fs}px`, 
                            fontWeight: back.fw,
                            fontFamily: "Inter, sans-serif"
                          }}
                        >
                          {back.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </foreignObject>
              ))}

              {/* Zone label — external systems */}
              <text x={158} y={26} fill="#94A3B8" fontSize={11} fontWeight="700"
                fontFamily="Inter, sans-serif" letterSpacing="0.08em">
                CONNECTS TO  ·  YOUR EXISTING SYSTEMS
              </text>

              {/* ── TOP ROW (cy=64) — External systems FactWise connects to ── */}
              <Pill x={158} y={64} w={68}  label="ERP"              variant="external" tooltip="Syncs POs, invoices & financials with your ERP (SAP, Oracle, NetSuite). FactWise connects to it — it doesn't replace it." />
              <Pill x={248} y={64} w={72}  label="CRM"              variant="external" tooltip="Pulls customer demand & inquiries from your CRM. Connected, not owned by FactWise." />
              <Pill x={338} y={64} w={128} label="BOM / Parts"      variant="external" tooltip="Imports BOMs & part masters from your PLM / engineering systems." />
              <Pill x={490} y={64} w={130} label="Inventory"        variant="external" tooltip="Reads live stock levels from your inventory / WMS to drive demand." />
              <Pill x={648} y={64} w={152} label="Supplier Network" variant="external" tooltip="Connects to your existing supplier directory & catalogs." />

              {/* ── MIDDLE ROW (cy=168) — How things plug in ── */}
              <Pill x={296}  y={168} w={76}  label="API / MCP"     tooltip="FactWise capability — REST APIs + MCP so AI agents can query and act on every module." />
              <Pill x={636}  y={168} w={188} label="Notifications" tooltip="FactWise capability — webhooks & alerts to Slack, email and Teams." />

              {/* ── MAIN ROW (cy=270) — The S2P hub ── */}
              <Pill x={172}  y={270} w={220} label="Custom AI Agent Marketplace ↗" tooltip="FactWise capability — build & install custom AI agents on top of FactWise." />

              {/* CENTER HUB — FactWise */}
              <Pill x={456} y={270} w={148} h={76} rx={18} label="FactWise" large tooltip="The Source-to-Pay platform that runs on top of the systems you already have." />

              <Pill x={670}  y={270} w={162} label="Analytics" tooltip="FactWise capability — built-in procurement dashboards & savings reporting." />

              {/* Snowflake-style icon — external data warehouse */}
              <g className="anim-node" style={{ cursor: "default" }}>
                <rect x={876} y={248} width={60} height={44} rx={11}
                  fill="#FFFFFF" stroke="#CBD5E1" strokeWidth={1.5} strokeDasharray="4 3"
                  style={{ transition: "stroke 0.3s ease, fill 0.3s ease" }}
                  onMouseEnter={e => {
                    showTip(e.currentTarget, "Exports procurement data to your warehouse (Snowflake, BigQuery, Databricks) for BI.", 'external', 'CONNECTS TO');
                    e.currentTarget.style.stroke = "#3666ff";
                    e.currentTarget.style.fill = "#F8FAFF";
                  }}
                  onMouseLeave={e => {
                    hideTip();
                    e.currentTarget.style.stroke = "#CBD5E1";
                    e.currentTarget.style.fill = "#FFFFFF";
                  }}
                />
                <line x1={906} y1={256} x2={906} y2={284} stroke="#3666ff" strokeWidth={2.5} strokeLinecap="round" pointerEvents="none" />
                <line x1={894} y1={263} x2={918} y2={277} stroke="#3666ff" strokeWidth={2.5} strokeLinecap="round" pointerEvents="none" />
                <line x1={918} y1={263} x2={894} y2={277} stroke="#3666ff" strokeWidth={2.5} strokeLinecap="round" pointerEvents="none" />
                <circle cx={906} cy={270} r={3.5} fill="#3666ff" pointerEvents="none" />
              </g>

              {/* ── ORCHESTRATION (cy=370) — FactWise's AI engine ── */}
              <Pill x={468} y={370} w={124} label="AI Workflows" tooltip="FactWise engine — AI automates RFQs, bid analysis, approvals & invoice matching." />

              {/* ── 3 FactWise solution suites (cy=456) — click to expand sub-modules ── */}
              <Pill x={406} y={456} w={76} label="Source"  tooltip="FactWise module — Source-to-Contract. Click to see what's inside." onClick={() => setExpandedSuite(s => s === 'source'  ? null : 'source')}  active={expandedSuite === 'source'} />
              <Pill x={492} y={456} w={76} label="Procure" tooltip="FactWise module — Procure-to-Pay. Click to see what's inside."     onClick={() => setExpandedSuite(s => s === 'procure' ? null : 'procure')} active={expandedSuite === 'procure'} />
              <Pill x={578} y={456} w={76} label="Pay"     tooltip="FactWise module — Invoice-to-Pay. Click to see what's inside."     onClick={() => setExpandedSuite(s => s === 'pay'     ? null : 'pay')}     active={expandedSuite === 'pay'} />

              {/* ── Expanded sub-modules — same 3-way branch style as AI Workflows ── */}
              <AnimatePresence mode="wait">
                {expandedSuite && (() => {
                  const suite = SUITE_SUBMODULES[expandedSuite];
                  const n = suite.items.length;
                  const spacing = 140;
                  const subW = 130;
                  const subY = 545;          // sub-module chip center Y
                  const elbowY = 502;        // where the bus branches horizontally
                  const xs = suite.items.map((_, i) => suite.cx - ((n - 1) * spacing) / 2 + i * spacing);
                  const busLeft = Math.min(suite.cx, xs[0]);
                  const busRight = Math.max(suite.cx, xs[n - 1]);
                  return (
                    <motion.g
                      key={expandedSuite}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Branch connector: stub down from suite, horizontal bus, drop to each chip */}
                      <g fill="none" stroke="#BFD0FF" strokeWidth="1.5" strokeDasharray="5 4">
                        <path d={`M ${suite.cx},474 V ${elbowY}`} />
                        <path d={`M ${busLeft},${elbowY} H ${busRight}`} />
                        {xs.map((cx, i) => <path key={i} d={`M ${cx},${elbowY} V ${subY - 18}`} />)}
                      </g>
                      <circle cx={suite.cx} cy={474} r={4} fill="#3666ff" />

                      {/* Flowing dots — continue the diagram's "balls" animation down each branch */}
                      {xs.map((cx, i) => {
                        const d = `M ${suite.cx},474 V ${elbowY} H ${cx} V ${subY - 18}`;
                        return (
                          <circle key={`flow-${i}`} r="3.5" fill="#3666ff" opacity="0">
                            <animateMotion path={d} dur="1.8s" repeatCount="indefinite" begin={`${i * 0.22}s`} />
                            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1"
                              dur="1.8s" repeatCount="indefinite" begin={`${i * 0.22}s`} />
                          </circle>
                        );
                      })}

                      {/* Sub-module chips — identical font & structure to the suite pills */}
                      {suite.items.map((item, i) => (
                        <motion.g
                          key={item.label}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.05 + i * 0.05 }}
                        >
                          <Pill x={xs[i] - subW / 2} y={subY} w={subW} label={item.label} tooltip={item.tip} />
                        </motion.g>
                      ))}
                    </motion.g>
                  );
                })()}
              </AnimatePresence>

              {/* Zone label — FactWise's own modules (drops below when expanded) */}
              <text x={530} y={expandedSuite ? 590 : 500} fill="#3666ff" fontSize={11} fontWeight="700"
                fontFamily="Inter, sans-serif" letterSpacing="0.08em" textAnchor="middle"
                style={{ transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                {expandedSuite ? 'CLICK THE SUITE AGAIN TO COLLAPSE' : 'FACTWISE MODULES  ·  SOURCE-TO-PAY'}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
