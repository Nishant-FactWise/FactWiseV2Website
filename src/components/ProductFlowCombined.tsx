'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import './ProductFlowCombined.css';

/* ─── Node layout (from ProductFlowShowcase) ─────────────────────────
   Each node is centred at (x%, y%) of the 4/3 canvas. HX/HY are the
   half-dimensions in SVG viewBox units used to anchor the connectors. */
const HX = 8;
const HY = 5;

interface NodeDef { id: string; label: string; x: number; y: number }

const NODES: NodeDef[] = [
  { id: 'item-cat', label: 'Item Catalogue', x: 6, y: 8 },
  { id: 'proj-crea', label: 'Project Creation', x: 6, y: 22 },
  { id: 'req', label: 'Requisition', x: 6, y: 36 },
  { id: 'item-ana', label: 'Item Analytics', x: 6, y: 50 },
  { id: 'rfq', label: 'Auto RfQ Creation + Approvals', x: 28, y: 36 },
  { id: 'neg', label: 'Auto Negotiations', x: 48, y: 36 },
  { id: 'bid-ana', label: 'Bid Analysis & Shortlisting', x: 68, y: 36 },
  { id: 'quote-calc', label: 'AI-Powered Quote Calculator', x: 68, y: 55 },
  // Price sources that feed into RfQ Creation — centered above it (POs directly above)
  { id: 'contracts', label: 'Contracts', x: 19.5, y: 13 },
  { id: 'pos', label: 'POs', x: 28, y: 13 },
  { id: 'online-prices', label: 'Online Prices', x: 36.5, y: 13 },
  // Custom formula feeds the Quote Calculator (shown below it)
  { id: 'custom-formula', label: 'AI-Assisted Formula Calculations', x: 68, y: 75 },
  { id: 'po-crea', label: 'PO Creation', x: 92, y: 36 },
  { id: 'inv-crea', label: 'Automated Invoice Creation', x: 92, y: 50 },
  { id: 'gr', label: 'Goods Receipt', x: 92, y: 64 },
  { id: 'qc', label: 'Quality Check', x: 92, y: 78 },
  { id: 'pay', label: 'AI-Powered Payments', x: 92, y: 92 },
];

/* Short detail shown inside a node when it expands open. */
const NODE_DETAIL: Record<string, string> = {
  'item-cat': 'Standardized item master',
  'proj-crea': 'Project spun up instantly',
  'req': 'Multi-level requisition approvals',
  'item-ana': 'Live item & spend analytics',
  'rfq': 'Prices auto-filled from contracts & past POs',
  'neg': 'Platform-native negotiation — no emails',
  'bid-ana': 'Landed-cost bid comparison & scoring',
  'quote-calc': 'True landed cost with custom formulas',
  'contracts': 'Contract pricing terms on tap',
  'pos': 'Best prices from past POs',
  'online-prices': 'Live market price benchmarks',
  'custom-formula': 'Landed cost via custom formulas',
  'po-crea': 'One-click PO from the winning bid',
  'inv-crea': 'Vendor invoice created on-platform',
  'gr': 'Goods receipt verification',
  'qc': '4-way quality & contract match',
  'pay': 'Auto-release once conditions met',
};

const E = (cx: number) => cx + HX;
const W = (cx: number) => cx - HX;
const S = (cy: number) => cy + HY;
const N = (cy: number) => cy - HY;

const CONN_PATHS: Record<string, string> = {
  'item-cat:rfq': `M ${E(6)} 8  L 15.5 8  L 15.5 36 L ${W(28)} 36`,
  'proj-crea:rfq': `M ${E(6)} 22 L 15.5 22 L 15.5 36 L ${W(28)} 36`,
  'req:rfq': `M ${E(6)} 36 L ${W(28)} 36`,
  'item-ana:rfq': `M ${E(6)} 50 L 15.5 50 L 15.5 36 L ${W(28)} 36`,
  // Price sources feed straight down into RfQ Creation (centered above it)
  'contracts:rfq': `M 19.5 16.5 L 19.5 25 L 28 25 L 28 ${N(36)}`,
  'pos:rfq': `M 28 16.5 L 28 ${N(36)}`,
  'online-prices:rfq': `M 36.5 16.5 L 36.5 25 L 28 25 L 28 ${N(36)}`,
  'rfq:neg': `M ${E(28)} 36 L ${W(48)} 36`,
  'neg:bid-ana': `M ${E(48)} 36 L ${W(68)} 36`,
  'bid-ana:po-crea': `M ${E(68)} 36 L ${W(92)} 36`,
  'bid-ana:quote-calc': `M 68 ${S(36)} L 68 ${N(55)}`,
  // Custom formula feeds up into the Quote Calculator
  'custom-formula:quote-calc': `M 68 ${N(75)} L 68 ${S(55)}`,
  'po-crea:inv-crea': `M 92 ${S(36)} L 92 ${N(50)}`,
  'inv-crea:gr': `M 92 ${S(50)} L 92 ${N(64)}`,
  'gr:qc': `M 92 ${S(64)} L 92 ${N(78)}`,
  'qc:pay': `M 92 ${S(78)} L 92 ${N(92)}`,
  'inv-crea:qc': `M ${W(92)} 50 L 82 50 L 82 78 L ${W(92)} 78`,
  'gr:pay': `M ${W(92)} 64 L 80 64 L 80 92 L ${W(92)} 92`,
};

const BYPASS_KEYS = new Set([
  'inv-crea:qc', 'gr:pay',
  'contracts:rfq', 'pos:rfq', 'online-prices:rfq', 'custom-formula:quote-calc',
]);

/* Source/feeder boxes that animate INTO a node while that node is open.
   e.g. when RfQ is open, Contracts / POs / Online Prices arrows draw into it. */
const FEEDERS: Record<string, string[]> = {
  'rfq': ['contracts', 'pos', 'online-prices'],
  'quote-calc': ['custom-formula'],
};

/* These source boxes render narrower so they sit side-by-side above RfQ. */
const SRC_NODES = new Set(['contracts', 'pos', 'online-prices']);

interface FlowDef {
  id: string;
  name: string;
  color: string;
  description: string;
  highlights: string[];
  dimmed: string[];
  runs: string[][];
  runLabels?: string[];
}

const FLOWS: FlowDef[] = [
  {
    id: 'q2o',
    name: 'Inquiry to Quote',
    color: '#3666ff',
    description:
      'From project creation to final quote — structure procurement with competitive bidding, multi-round negotiations, and data-driven shortlisting.',
    highlights: [
      'Multi-vendor RfQ with structured approvals',
      'Real-time negotiation tracking per line item',
      'Automated bid comparison and scoring engine',
    ],
    dimmed: [
      'Quote calculator with landed cost analysis',
      'Project-level spend visibility dashboard',
    ],
    runs: [['proj-crea', 'rfq', 'neg', 'bid-ana', 'quote-calc']],
  },
  {
    id: 'r2po',
    name: 'Requisition to PO',
    color: '#4b8bff',
    description:
      'From internal demand to approved purchase order — capture requisitions, source competitively, and convert winning bids into compliant POs.',
    highlights: [
      'Department-level requisition capture',
      'Competitive sourcing with structured RfQ',
      'One-click PO generation from winning bid',
    ],
    dimmed: [
      'Budget validation and approval workflows',
      'Supplier performance benchmarking',
    ],
    runs: [['req', 'rfq', 'neg', 'bid-ana', 'po-crea']],
  },
  {
    id: 'i2p',
    name: 'Invoice to Pay',
    color: '#3666ff',
    description:
      'From purchase order to final payment — choose the right verification path based on your supplier trust level and order criticality.',
    highlights: [
      'Three-way matching: PO, GR, and Invoice',
      'Flexible bypass routes for trusted suppliers',
      'Automated payment release after approvals',
    ],
    dimmed: [
      'Real-time payment status tracking',
      'Early payment discount capture',
    ],
    runs: [
      ['inv-crea', 'gr', 'qc', 'pay'],
      ['inv-crea', 'qc', 'pay'],
      ['inv-crea', 'gr', 'pay'],
    ],
    runLabels: [
      'Full path — Invoice → GR → QC → Pay',
      'Express — Invoice → QC → Pay (skip GR)',
      'Direct — Invoice → GR → Pay (skip QC)',
    ],
  },
  {
    id: 'others',
    name: 'Additional modules',
    color: '#4b8bff',
    description:
      'Every sourcing event runs on clean data, market intelligence, and agreed terms. FactWise gives you the building blocks to source smarter — before a single RFQ goes out.',
    highlights: [
      'Item Analytics - Track market indexes and price trends — know exactly when to buy',
      'Item Catalogue - Every item, every specification, structured and reusable across every event.',
      'Contracts - Agreed prices, quantities, and terms — automatically referenced across every event and PO',
    ],
    dimmed: [
      //'Category & supplier benchmarking',
      //'Demand and consumption trends',
    ],
    runs: [
      ['item-cat', 'rfq', 'neg', 'bid-ana', 'po-crea'],
      ['item-ana', 'rfq', 'neg', 'bid-ana', 'po-crea'],
    ],
    runLabels: [
      'Item Catalogue → PO Creation',
      'Item Analytics → PO Creation',
    ],
  },
];

function CheckIcon({ size = 11 }: { size?: number }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="none">
      <polyline points="2,6 5,9.5 10,2.5" stroke="white" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function ProductFlowCombined() {
  const [flowIdx, setFlowIdx] = useState(0);
  const [runIdx, setRunIdx] = useState(0);
  const [revealed, setRevealed] = useState(1);
  const [revealedMax, setRevealedMax] = useState(1);
  const [drawLine, setDrawLine] = useState(-1);
  const epochRef = useRef(0);

  useEffect(() => {
    setRevealedMax(m => Math.max(m, revealed));
  }, [revealed]);

  const flow = FLOWS[flowIdx];
  const steps = flow.runs[runIdx];
  const n = steps.length;
  const isLastRun = runIdx >= flow.runs.length - 1;
  const animEpoch = epochRef.current;

  /* Sequencer — drives the step-by-step animation */
  useEffect(() => {
    if (drawLine !== -1) return;

    // While a node with feeder boxes is open, hold longer so the feed-in
    // arrows (e.g. Contracts / POs / Online Prices → RfQ) can draw in.
    const curId = steps[revealed - 1];
    const feederCount = (FEEDERS[curId] || []).length;
    const baseDelay = revealed < n
      ? 1100                          // pause on the open card before drawing next
      : isLastRun ? 3500 : 1600;
    const delay = baseDelay + feederCount * 600;

    const t = setTimeout(() => {
      if (revealed < n) {
        setDrawLine(revealed - 1);
      } else if (!isLastRun) {
        epochRef.current++;
        setRunIdx(p => p + 1);
        setRevealed(1);
        setDrawLine(-1);
      } else {
        epochRef.current++;
        setFlowIdx(p => (p + 1) % FLOWS.length);
        setRunIdx(0);
        setRevealed(1);
        setRevealedMax(1);
        setDrawLine(-1);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [revealed, drawLine, n, isLastRun]);

  const selectFlow = (idx: number) => {
    epochRef.current++;
    setFlowIdx(idx);
    setRunIdx(0);
    setRevealed(1);
    setRevealedMax(1);
    setDrawLine(-1);
  };

  const flowSet = new Set(steps);
  const visited = new Set(steps.slice(0, revealed));
  const currentId = steps[revealed - 1];

  const animFromId = drawLine >= 0 ? steps[drawLine] : null;
  const animToId = drawLine >= 0 ? steps[drawLine + 1] : null;
  const animPath = animFromId && animToId
    ? CONN_PATHS[`${animFromId}:${animToId}`] : null;

  const traversedEdges = new Set(
    Array.from({ length: Math.max(0, revealed - 1) }, (_, i) => `${steps[i]}:${steps[i + 1]}`)
  );
  const isLit = (fromId: string, toId: string) => traversedEdges.has(`${fromId}:${toId}`);

  const sidebarRevealed = flow.runs.length > 1 ? revealedMax : revealed;

  /* productflow-style details: all bullets shown, first N checked green.
     Progress is mapped onto the bullet count so the final bullet still ticks
     when a flow has fewer steps than bullets (e.g. Invoice to Pay = 4 steps,
     5 bullets). The counter only increases within a flow, so checks stay green. */
  const bullets = [...flow.highlights, ...flow.dimmed];
  const maxSteps = Math.max(...flow.runs.map(r => r.length));
  const doneCount = Math.min(bullets.length, Math.round((sidebarRevealed / maxSteps) * bullets.length));

  return (
    <div id="product-flow-combined" className="pfc-responsive-pad" style={{ position: 'relative', scrollMarginTop: '100px' }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', backgroundImage: "url('/TexturedGradient.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '80px 0' }}>
        <div style={{ position: 'absolute', right: '-100px', bottom: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(54, 102, 255, 0.15) 0%, transparent 70%)', pointerEvents: 'none', willChange: 'transform' }} />
        <div className="noise" style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
          {/* Heading (productflow) */}
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

          {/* Tabs */}
          <div className="pfc-tabs">
            {FLOWS.map((f, i) => (
              <button
                key={f.id}
                className={`pfc-tab${flowIdx === i ? ' is-on' : ''}`}
                style={flowIdx === i ? { background: f.color, borderColor: f.color, boxShadow: `0 4px 12px ${f.color}40` } : {}}
                onClick={() => selectFlow(i)}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Two cards on the gradient: flowchart + details */}
          <div className="pfc-grid">

            {/* ════ LEFT — flowchart card ════ */}
            <div className="pfc-chart-card">
              <div className="pfc-left">
                <div className="pfc-canvas">
                  <svg className="pfc-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <marker id="pfc-arr-dim" viewBox="0 0 10 10" refX="10" refY="5"
                        markerWidth="1.7" markerHeight="1.4" markerUnits="userSpaceOnUse" orient="auto">
                        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="rgba(15,23,42,0.16)" />
                      </marker>
                      {FLOWS.map(f => (
                        <marker key={f.id} id={`pfc-arr-${f.id}`}
                          viewBox="0 0 10 10" refX="10" refY="5"
                          markerWidth="2" markerHeight="1.7" markerUnits="userSpaceOnUse" orient="auto">
                          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={f.color} />
                        </marker>
                      ))}
                    </defs>

                    {/* dim background — full chart always visible */}
                    {Object.entries(CONN_PATHS).map(([key, d]) => (
                      <path key={key} d={d}
                        className={`pfc-bg-conn${BYPASS_KEYS.has(key) ? ' is-bypass' : ''}`}
                        markerEnd="url(#pfc-arr-dim)"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}

                    {/* completed lit paths for the current run */}
                    {Object.entries(CONN_PATHS).map(([key, d]) => {
                      const [fromId, toId] = key.split(':');
                      if (!isLit(fromId, toId)) return null;
                      if (fromId === animFromId && toId === animToId) return null;
                      return (
                        <path key={`lit-${key}`} d={d}
                          className="pfc-lit-conn"
                          stroke={flow.color} strokeWidth="2" fill="none" opacity="0.9"
                          strokeLinecap="round" strokeLinejoin="round"
                          markerEnd={`url(#pfc-arr-${flow.id})`}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}

                    {/* currently animating connector */}
                    {animPath && (
                      <motion.path
                        key={`ap-${flowIdx}-${runIdx}-${drawLine}`}
                        d={animPath}
                        stroke={flow.color} strokeWidth="2.5" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.65, ease: 'easeInOut' }}
                        onAnimationComplete={() => {
                          if (epochRef.current === animEpoch) {
                            setDrawLine(-1);
                            setRevealed(p => p + 1);
                          }
                        }}
                      />
                    )}

                    {/* feed-in lines — source boxes flowing into the open node, same
                        flowing-dotted style as the rest (Contracts/POs/Online → RfQ,
                        Custom Formula → Quote Calc) */}
                    {(FEEDERS[currentId] || []).map((srcId) => {
                      const d = CONN_PATHS[`${srcId}:${currentId}`];
                      if (!d) return null;
                      return (
                        <path
                          key={`feed-${flowIdx}-${runIdx}-${revealed}-${srcId}`}
                          d={d}
                          className="pfc-lit-conn"
                          stroke={flow.color} strokeWidth="2" fill="none" opacity="0.9"
                          strokeLinecap="round" strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          markerEnd={`url(#pfc-arr-${flow.id})`}
                        />
                      );
                    })}
                  </svg>

                  {/* Node cards */}
                  {NODES.map(node => {
                    const inFlow = flowSet.has(node.id);
                    const isVisited = visited.has(node.id);
                    const isCurrent = node.id === currentId && isVisited;
                    // Seller Invoice stays popped open across all 3 Invoice-to-Pay paths
                    const isOpen = isCurrent
                      || (flow.id === 'i2p' && node.id === 'inv-crea');
                    // Feeder/source boxes light up while their target node is open
                    const feederActive = (FEEDERS[currentId] || []).includes(node.id);

                    let cls = 'pfc-node';
                    if (SRC_NODES.has(node.id)) cls += ' pfc-node--src';
                    if (isOpen) cls += ' is-current';
                    else if (isVisited || feederActive) cls += ' is-done';
                    else if (inFlow) cls += ' in-flow';

                    return (
                      <div key={node.id} className={cls}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          '--nc': flow.color,
                          '--ng': `${flow.color}2e`,
                        } as React.CSSProperties}
                      >
                        {isOpen ? (
                          <div className="pfc-node-open">
                            <div className="pfc-node-open-head">
                              <span className="pfc-node-open-dot" />
                              <span className="pfc-node-open-label">{node.label}</span>
                            </div>
                            <div className="pfc-node-open-detail">
                              <span className="pfc-node-open-check"><CheckIcon size={7} /></span>
                              <span>{NODE_DETAIL[node.id] || 'Processing'}</span>
                            </div>
                          </div>
                        ) : node.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ════ RIGHT — details panel card (productflow style) ════ */}
            <div className="pfc-details-card">
              <div className="pfc-sidebar">
                <AnimatePresence mode="wait">
                  <motion.div key={flowIdx} className="pfc-sidebar-inner"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>

                    <div className="pfc-sidebar-top" style={{ '--nc': flow.color } as React.CSSProperties}>
                      {/* productflow's eyebrow is intentionally empty — kept for identical spacing */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ textTransform: 'uppercase', letterSpacing: '2.5px', fontSize: '10px', fontWeight: 700, color: flow.color }} />
                      </div>
                      <h3 className="pfc-sidebar-title">{flow.name}</h3>
                      <p className="pfc-sidebar-desc">{flow.description}</p>

                      <ul className="pfc-list">
                        {bullets.map((b, i) => (
                          <li key={`${flowIdx}-${i}`} className={`pfc-feat${i < doneCount ? ' is-done' : ''}`}>
                            <span className="pfc-feat-check">
                              <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                                <path d="M1 5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="pfc-feat-text">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pfc-responsive-pad { padding: 48px 16px; }
        @media (min-width: 768px) { .pfc-responsive-pad { padding: 48px 40px; } }
      `}</style>
    </div>
  );
}
