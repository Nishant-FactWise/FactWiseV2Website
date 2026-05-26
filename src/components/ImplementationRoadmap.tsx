"use client";

import React, { useRef, useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Phase 1: onboarding checklist ─────────────────────────────────────────── */
function Phase1Visual() {
  const [checked, setChecked] = useState(0);
  const dead = useRef(false);

  useEffect(() => {
    dead.current = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    async function run() {
      while (!dead.current) {
        setChecked(0);
        await sleep(800);
        for (let i = 1; i <= 5; i++) {
          if (dead.current) return;
          setChecked(i);
          await sleep(600);
        }
        await sleep(2400);
      }
    }
    run();
    return () => { dead.current = true; };
  }, []);

  const rows = [
    "Expert onboarding from Day 1",
    "Legacy data migration",
    "Approval chain setup",
    "Role-based access config",
    "Full team training",
  ];

  return (
    <div className="w-full h-full flex flex-col gap-0 p-4 justify-center">
      {rows.map((label, i) => {
        const done = checked > i;
        const active = checked === i;
        return (
          <div
            key={label}
            className="flex items-center gap-3 py-2 border-b last:border-b-0"
            style={{ borderColor: "rgba(15,23,42,0.05)", opacity: done || active ? 1 : 0.35, transition: "opacity 0.3s ease" }}
          >
            {/* Circle check */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
              style={{
                background: done ? "#3666ff" : "transparent",
                border: `2px solid ${done ? "#3666ff" : active ? "#3666ff" : "#cbd5e1"}`,
              }}
            >
              {done && (
                <svg viewBox="0 0 12 12" width={9} height={9} fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round">
                  <polyline points="2,6 5,9 10,3"/>
                </svg>
              )}
              {active && !done && (
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#3666ff" }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                />
              )}
            </div>
            {/* Label */}
            <span
              className="text-[12px] font-medium"
              style={{ color: done ? "#1A1D2E" : active ? "#3666ff" : "#64748b" }}
            >
              {label}
            </span>
            {/* Done badge */}
            {done && (
              <span className="ml-auto text-[9px] font-bold text-[#00b884]">Done</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Phase 2: before/after bars ────────────────────────────────────────────── */
function Phase2Visual() {
  const [step, setStep] = useState(0);
  const dead = useRef(false);

  useEffect(() => {
    dead.current = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    async function run() {
      while (!dead.current) {
        setStep(0); await sleep(600);
        for (let i = 1; i <= 4; i++) { if (dead.current) return; setStep(i); await sleep(700); }
        await sleep(3000);
      }
    }
    run();
    return () => { dead.current = true; };
  }, []);

  const metrics = [
    { label: "RFQ TURNAROUND", before: "3 days", after: "2 hrs", bW: 88, aW: 22 },
    { label: "APPROVAL CYCLE",  before: "5 days", after: "40 min", bW: 100, aW: 18 },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 p-4 justify-center">
      {metrics.map((m, mi) => {
        const showB = step >= mi * 2 + 1; const showA = step >= mi * 2 + 2;
        return (
          <div key={m.label} className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black tracking-widest text-slate-400">{m.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-slate-400 w-8">Before</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#ef4444,#f87171)" }}
                  initial={{ width: "0%" }} animate={{ width: showB ? `${m.bW}%` : "0%" }} transition={{ duration: 0.6, ease: "easeOut" }}/>
              </div>
              <motion.span className="text-[10px] font-bold text-slate-500 w-10 text-right"
                initial={{ opacity: 0 }} animate={{ opacity: showB ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                {m.before}
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-slate-400 w-8">After</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#00b884,#34d399)" }}
                  initial={{ width: "0%" }} animate={{ width: showA ? `${m.aW}%` : "0%" }} transition={{ duration: 0.6, ease: "easeOut" }}/>
              </div>
              <motion.span className="text-[10px] font-bold text-[#00b884] w-10 text-right"
                initial={{ opacity: 0 }} animate={{ opacity: showA ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                {m.after}
              </motion.span>
            </div>
          </div>
        );
      })}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34,1.56,0.64,1] }}
            className="self-center flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold text-white"
            style={{ background: "#00b884", boxShadow: "0 6px 18px rgba(0,184,132,0.35)" }}>
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
            </svg>
            80% faster
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Phase 3: bar chart + trend line ───────────────────────────────────────── */
function Phase3Visual() {
  const [barsIn, setBarsIn] = useState(false);
  const [lineIn, setLineIn] = useState(false);
  const [chipIn, setChipIn] = useState(false);
  const dead = useRef(false);

  useEffect(() => {
    dead.current = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    async function run() {
      while (!dead.current) {
        setBarsIn(false); setLineIn(false); setChipIn(false);
        await sleep(500); setBarsIn(true);
        await sleep(900); setLineIn(true);
        await sleep(700); setChipIn(true);
        await sleep(3200);
      }
    }
    run();
    return () => { dead.current = true; };
  }, []);

  const bars = [
    { q: "Q1", h: 38, color: "#f5c97a" },
    { q: "Q2", h: 52, color: "#f5c97a" },
    { q: "Q3", h: 64, color: "#f5c97a" },
    { q: "Q4", h: 82, color: "#e8a020" },
  ];
  const trendPts = "20,72 70,58 120,42 180,18";

  return (
    <div className="w-full h-full flex flex-col p-4 justify-center">
      <div className="relative" style={{ height: 110 }}>
        <svg viewBox="0 0 200 90" width="100%" height="100%" className="overflow-visible">
          {bars.map((b, i) => {
            const x = 18 + i * 46; const y = 82 - b.h;
            return (
              <g key={b.q}>
                <motion.rect x={x} width={32} rx={5} fill={b.color}
                  initial={{ height: 0, y: 82 }}
                  animate={barsIn ? { height: b.h, y } : { height: 0, y: 82 }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.23,1,0.32,1] }}/>
                <text x={x + 16} y={88} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="Inter,sans-serif">{b.q}</text>
              </g>
            );
          })}
          <motion.polyline points={trendPts} fill="none" stroke="#e8a020" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={lineIn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}/>
          {lineIn && trendPts.split(" ").map((pt, i) => {
            const [cx, cy] = pt.split(",").map(Number);
            return (
              <motion.circle key={i} cx={cx} cy={cy} r={3} fill="white" stroke="#e8a020" strokeWidth="1.8"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.3, ease: [0.34,1.56,0.64,1] }}/>
            );
          })}
        </svg>
      </div>

      {/* Chips row — below the chart, never overlapping */}
      <div className="flex items-center justify-end gap-2 mt-2">
        <AnimatePresence>
          {chipIn && (
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34,1.56,0.64,1] }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-white"
              style={{ background: "#e8a020", boxShadow: "0 4px 14px rgba(232,160,32,0.4)" }}>
              <svg viewBox="0 0 12 12" width={10} height={10} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <polyline points="2,8 6,4 10,8"/><line x1="6" y1="4" x2="6" y2="11"/>
              </svg>
              +15%
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {chipIn && (
            <motion.div initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold"
              style={{ background: "rgba(232,160,32,0.15)", color: "#b87a10", border: "1px solid rgba(232,160,32,0.3)" }}>
              <svg viewBox="0 0 12 12" width={9} height={9} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6" cy="6" r="4.5"/><path d="M6 3v3l2 1"/>
              </svg>
              Margins going up
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Card data ─────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: "setup", phase: "Phase 01", timeline: "WEEKS 2–8",
    accent: "#3666ff", accentBg: "rgba(54,102,255,0.07)", accentBorder: "rgba(54,102,255,0.18)", cardBg: "#f0f4ff",
    title: "Go Live. With Full Support.",
    desc: "Our team works alongside yours — configuring workflows, migrating your catalogue, and training every user. By week 8, FactWise runs your procurement exactly the way your business needs.",
    features: ["Expert onboarding from Day 1","Legacy data migration & validation","Role-based access & approval chains"],
    Visual: Phase1Visual,
  },
  {
    id: "ops", phase: "Phase 02", timeline: "MONTHS 3–6",
    accent: "#00b884", accentBg: "rgba(0,184,132,0.07)", accentBorder: "rgba(0,184,132,0.22)", cardBg: "#f0faf6",
    popular: true,
    title: "Replace Manual Work. Gain Speed.",
    desc: "RFQs that took days now take hours. Vendor follow-ups are automated. Approvals move without chasing. Your team focuses on decisions that matter.",
    features: ["Autonomous procurement approvals","Real-time supply chain visibility","Advanced vendor performance tracking"],
    Visual: Phase2Visual,
  },
  {
    id: "savings", phase: "Phase 03", timeline: "MONTHS 6–12",
    accent: "#e8a020", accentBg: "rgba(232,160,32,0.07)", accentBorder: "rgba(232,160,32,0.22)", cardBg: "#fdf8ee",
    title: "Unlock Savings. Compound Intelligence.",
    desc: "With months of procurement history, the intelligence compounds. You know what you paid, what's fair, and where to push back. Costs come down. Margins go up.",
    features: ["Auditable ROI & cost savings","Strategic sourcing & forecasting","Consolidated multi-entity reporting"],
    Visual: Phase3Visual,
  },
];

/* ─── Single Card ────────────────────────────────────────────────────────────── */
function PhaseCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.23,1,0.32,1] }}
      className="group relative flex flex-col rounded-[20px] overflow-hidden"
      style={{
        background: "white",
        border: (card as { popular?: boolean }).popular ? `1.5px solid ${card.accent}` : "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 12px 40px -8px rgba(0,0,0,0.10)",
      }}
      whileHover={{ y: -6, scale: 1.013, boxShadow: "0 8px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.10)",
        transition: { duration: 0.35, ease: [0.23,1,0.32,1] } }}>

      {/* Mini animation panel */}
      <div className="mx-4 mt-4 rounded-[12px] overflow-hidden"
        style={{ height: 200, background: "#f8fafc", border: `1px solid ${card.accentBorder}` }}>
        <card.Visual />
      </div>

      {/* Timeline pill */}
      <div className="px-5 pt-4">
        <span className="text-[10px] font-black tracking-widest px-3 py-1 rounded-full"
          style={{ background: card.accentBg, color: card.accent, border: `1px solid ${card.accentBorder}` }}>
          {card.timeline}
        </span>
      </div>

      {/* Text */}
      <div className="px-5 pt-3 pb-5 flex flex-col gap-3 flex-1">
        <h3 className="text-[18px] font-bold text-[#1A1D2E] leading-[1.25] tracking-[-0.2px]">{card.title}</h3>
        <p className="text-[13px] text-slate-500 leading-[1.6] font-light">{card.desc}</p>
        <div className="flex flex-col gap-2 mt-1">
          {card.features.map(f => (
            <div key={f} className="flex items-center gap-2 text-[12.5px] text-slate-600">
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: card.accentBg }}>
                <svg viewBox="0 0 12 12" width={9} height={9} fill="none" stroke={card.accent} strokeWidth="2.2" strokeLinecap="round">
                  <polyline points="2,6 5,9 10,3"/>
                </svg>
              </span>
              {f}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Flow strip ─────────────────────────────────────────────────────────────── */
const FLOW_STEPS = ["Onboarding","Catalogue Setup","Workflow Config","Team Training","Go Live","Automation","Negotiations","Savings"];

function FlowStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="mt-12">
      <p className="text-center text-[11px] font-medium tracking-widest uppercase text-slate-400 mb-5">End-to-end implementation journey</p>
      <div className="flex items-center flex-wrap justify-center bg-white rounded-2xl border border-slate-100 px-6 py-4"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)" }}>
        {FLOW_STEPS.map((step, i) => (
          <motion.div key={step} className="flex items-center"
            initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.07, ease: "easeOut" }}>
            <span className="text-[12px] font-medium rounded-full px-3.5 py-1.5 whitespace-nowrap cursor-default transition-all duration-200 hover:scale-105"
              style={i === FLOW_STEPS.length - 1
                ? { background: "rgba(0,184,132,0.1)", color: "#00b884", border: "1px solid rgba(0,184,132,0.25)" }
                : { background: "#f7f8fa", color: "#4a4844", border: "1px solid #e5e3de" }}>
              {step}
            </span>
            {i < FLOW_STEPS.length - 1 && (
              <span className="w-6 flex items-center justify-center text-slate-300">
                <svg viewBox="0 0 14 14" width={12} height={12} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 7h8M8 4l3 3-3 3"/>
                </svg>
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────────── */
export default function ImplementationRoadmap() {
  return (
    <section id="roadmap" className="relative py-12 px-4 md:px-10" style={{ scrollMarginTop: "100px" }}>
      <div className="relative overflow-hidden rounded-[24px] py-20 md:py-28">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 noise opacity-40 pointer-events-none mix-blend-overlay" />
        <div className="absolute -right-32 -bottom-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(54,102,255,0.22) 0%, rgba(54,102,255,0.08) 35%, transparent 70%)" }}/>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Rocket className="w-3 h-3" /><span>Implementation Journey</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-4 leading-[1.1]">
                From Sign-Up to Savings.{" "}<span className="italic text-[#3666ff]">Faster Than You Think.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-base md:text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                You&apos;re live in weeks, efficient in months, and saving within the year.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CARDS.map((card, i) => <PhaseCard key={card.id} card={card} index={i} />)}
          </div>


        </div>
      </div>
    </section>
  );
}
