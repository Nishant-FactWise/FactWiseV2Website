'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Cpu,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Database,
  Terminal,
  ArrowRight,
  Zap,
  Server,
  ArrowLeftRight,
  Cloud,
  Laptop,
  Activity,
  Layers,
  FileText,
  Workflow,
  Download,
  Upload,
  Bot,
  Gauge,
  CheckCheck,
} from 'lucide-react';
import { useLocalizedText } from '@/hooks/useLocalizedText';


const STEPS = [
  { num: '01', label: 'Let FactWise Respond For You', short: 'AI Repository' },
  { num: '02', label: 'Connect Once. Respond Automatically.', short: 'Open APIs' },
  { num: '03', label: 'Respond Your Way', short: 'Respond' },
];
const TOTAL = STEPS.length;
const SLIDE_DUR = 0.55;

const gradientBg =
  'radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), ' +
  'radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), ' +
  'white';

/* ======================================================================
   GLOBAL SUPPLIER DASHBOARD STYLES (Exact 520px height, clean spacing)
====================================================================== */
const SUPP_DASH_STYLE = `
.sd-root { position: relative; width: 100%; height: 520px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background: white; border-radius: 20px; overflow: hidden;
  border: 1px solid rgba(15,23,42,0.08); box-shadow: 0 16px 48px rgba(0,0,0,0.10);
  display: flex; flex-direction: column; min-width: 0; text-align: left; }
.sd-chrome { display: flex; align-items: center; gap: 8px; padding: 8px 14px;
  background: white; border-bottom: 1px solid #eef1f6; flex-shrink: 0; height: 42px; }
.sd-url { padding: 3px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px; color: #64748b; }
.sd-pill { margin-left: auto; display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; background: rgba(54,102,255,0.08); border: 1px solid rgba(54,102,255,0.2);
  border-radius: 99px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 700; color: #3666ff; letter-spacing: 0.14em; text-transform: uppercase; }
.sd-pill .d { width: 5px; height: 5px; border-radius: 50%; background: #3666ff;
  box-shadow: 0 0 0 3px rgba(54,102,255,0.2); animation: sd-pulse 1.4s ease-in-out infinite; }
@keyframes sd-pulse { 0%,100% { transform: scale(1); opacity: 1;} 50% { transform: scale(1.5); opacity: 0.55;} }
.sd-body { position: relative; flex: 1; min-height: 0; padding: 12px 14px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; }
.sd-card { background: #fbfcfe; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px; padding: 10px 12px; transition: all .4s; }
.sd-card.glow { border-color: rgba(54,102,255,0.4); box-shadow: 0 8px 24px -10px rgba(54,102,255,0.3); }
.sd-btn { padding: 7px 14px; border-radius: 8px; background: linear-gradient(180deg, #4A6FFF 0%, #2f59ff 100%); color: white; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 6px; box-shadow: 0 6px 16px -4px rgba(54,102,255,0.5); transition: all .3s; cursor: pointer; }
.sd-btn.glow { animation: sd-btnGlow 1.4s ease-in-out infinite; }
@keyframes sd-btnGlow { 0%,100% { transform: scale(1); box-shadow: 0 6px 16px -4px rgba(54,102,255,0.5); } 50% { transform: scale(1.03); box-shadow: 0 10px 24px -4px rgba(54,102,255,0.8); } }

/* Animated Data Packet across API / Flowchart */
@keyframes pktMoveRight { 0% { left: 0%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { left: 92%; opacity: 0; } }
@keyframes pktMoveLeft { 0% { right: 0%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { right: 92%; opacity: 0; } }
.pkt-r { position: absolute; height: 6px; width: 14px; border-radius: 99px; background: #3666ff; box-shadow: 0 0 10px #3666ff; animation: pktMoveRight 1.8s infinite linear; }
.pkt-l { position: absolute; height: 6px; width: 14px; border-radius: 99px; background: #10b981; box-shadow: 0 0 10px #10b981; animation: pktMoveLeft 1.8s infinite linear; }
`;

/* step helper */
const stepToMenu = (s: number, totalPhases: number) => {
  if (s <= 1) return 1;
  if (s <= 3) return 2;
  if (s <= 6) return 3;
  return 4;
};

/* ══════════════════════════════════════════════════════════════════════
   FEATURE 1: RESPOND YOUR WAY (MANUAL vs EXCEL vs PLATFORM)
   Visualizing the 3 choices clearly + intuitive round-trip animation
══════════════════════════════════════════════════════════════════════ */
const F1_MENU = [
  { p: 1, title: 'Download Structured RFQ Template (.xlsx)' },
  { p: 2, title: 'Fill Prices Offline & Drag-n-Drop Upload' },
  { p: 3, title: 'Instant 100% Auto-Mapping to Platform Grid' },
  { p: 4, title: 'One-Click Error-Free Quote Submission' },
];

function Feature1RespondYourWay({ isActive = true }: { isActive?: boolean }) {
  const t = useLocalizedText();
  const [step, setStep] = useState<number>(0);
  const [isAuto, setIsAuto] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuto || !isActive) return;
    const hold = step === 0 ? 1100 : step === 3 ? 1400 : step === 6 ? 1400 : 1100;
    const t = setTimeout(() => setStep((s) => (s + 1) % 10), hold);
    return () => clearTimeout(t);
  }, [step, isAuto, isActive]);

  const goManual = (p: number) => {
    setIsAuto(false);
    if (p === 1) setStep(0);
    else if (p === 2) setStep(3);
    else if (p === 3) setStep(5);
    else setStep(8);
  };

  const activeMenu = stepToMenu(step, 10);
  const isParsing = step === 3 || step === 4;
  const isMapped = step >= 5;
  const isSubmitted = step >= 8;

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* LEFT COLUMN: Exact Wording + Progress Menu */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 space-y-3.5 text-left"
      >
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10.5px] font-semibold uppercase tracking-[0.12em]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
          {t('Feature 03 · Total Flexibility')}
        </div>

        <h3
          className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.16]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('Respond Your Way')} <br />
          <span className="text-[#3666ff]">{t('Manual, Excel, or Platform — Your Choice.')}</span>
        </h3>

        <p className="text-slate-600 text-[14px] leading-[1.62] font-normal text-left" style={{ fontFamily: 'var(--font-inter)' }}>
          {t('Not every supplier works the same way. FactWise gives you the flexibility to respond however works best for your team. Log in and respond directly on the platform with full visibility of every RFQ, quote, and PO—or work offline in Excel, fill in your prices, and upload it back in seconds with zero manual reformatting required.')}
        </p>

        <div className="text-[13.5px] font-bold text-[#3666ff] tracking-tight pt-1">
          {t('Your workflow. Your way. Every time.')}
        </div>

        {/* 4-Step Progress Menu */}
        <div className="flex flex-col gap-1.5 pt-1 text-left">
          {F1_MENU.map((item) => (
            <div
              key={item.p}
              onClick={() => goManual(item.p)}
              className={`relative flex items-center justify-between w-full rounded-xl py-2.5 px-3.5 transition-all duration-300 group cursor-pointer overflow-hidden ${
                activeMenu === item.p
                  ? 'bg-white border border-[#3666ff]/80 shadow-[0_6px_24px_rgba(54,102,255,0.12)] scale-[1.015] z-10'
                  : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
              }`}
            >
              {activeMenu === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`size-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    activeMenu === item.p
                      ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_10px_rgba(54,102,255,0.4)]'
                      : activeMenu > item.p
                      ? 'border-[#00b884] bg-[#00b884] text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                  }`}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </div>
                <span
                  className={`text-[12px] font-bold tracking-tight ${
                    activeMenu === item.p ? 'text-[#3666ff]' : activeMenu > item.p ? 'text-slate-700' : 'text-slate-500'
                  }`}
                >
                  {t(item.title)}
                </span>
              </div>
              {activeMenu === item.p && (
                <span className="relative z-10 text-[8px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest flex items-center gap-1 shadow-sm">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />{t('Active')}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT COLUMN: 520px Intuitive Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="lg:col-span-6 order-2 lg:order-2 relative"
      >
        <div className="sd-root">
          <div className="sd-chrome">
            <div className="sd-url">app.factwise.io / supplier / respond-your-way</div>
            <div className="sd-pill"><span className="d" />Total Flexibility · Live Grid</div>
          </div>

          <div className="sd-body">
            {/* Top Mode Selector Tabs (Visualizing choice) */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl shrink-0 text-center text-[10.5px] font-bold">
              <div className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeMenu <= 1 ? 'bg-white text-[#3666ff] shadow-sm' : 'text-slate-600'}`}>
                <Download className="size-3 text-[#3666ff]" /> 1. Download RFQ
              </div>
              <div className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeMenu === 2 || activeMenu === 3 ? 'bg-white text-[#3666ff] shadow-sm' : 'text-slate-600'}`}>
                <FileSpreadsheet className="size-3 text-[#3666ff]" /> 2. Fill & Upload
              </div>
              <div className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeMenu === 4 ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'}`}>
                <CheckCircle2 className="size-3 text-white" /> 3. One-Click Quote
              </div>
            </div>

            {/* Dynamic Step Story */}
            <div className="flex-1 flex flex-col justify-center my-auto overflow-hidden">
              {activeMenu === 1 ? (
                /* Step 1: Clean Template Download */
                <div className="sd-card border-blue-200/80 bg-blue-50/40 text-center py-6 px-4 space-y-3 w-full">
                  <div className="size-11 rounded-2xl bg-blue-100 text-[#3666ff] flex items-center justify-center mx-auto shadow-md">
                    <Download className="size-6 animate-bounce" />
                  </div>
                  <div className="w-full">
                    <div className="text-[14px] font-extrabold text-slate-800">RFQ #IQ-8842 Template Ready</div>
                    <div className="text-[11.5px] text-slate-600 w-full px-2 mx-auto mt-1 leading-relaxed">
                      Pre-formatted with all 142 items, quantities & technical specifications.
                    </div>
                  </div>
                  <div className="pt-1.5 w-full flex justify-center">
                    <span className="sd-btn glow text-xs py-2 px-6">
                      <FileSpreadsheet className="size-4" /> Download RFQ-8842.xlsx
                    </span>
                  </div>
                </div>
              ) : activeMenu === 2 ? (
                /* Step 2: Drag & Drop Dropzone with Parsing */
                <div className="sd-card border-2 border-dashed border-[#3666ff] bg-blue-50/30 text-center py-6 px-4 space-y-3 w-full">
                  <div className="size-11 rounded-full bg-[#3666ff]/10 text-[#3666ff] flex items-center justify-center mx-auto">
                    {isParsing ? <RefreshCw className="size-6 animate-spin" /> : <Upload className="size-6 animate-pulse" />}
                  </div>
                  <div className="w-full">
                    <div className="text-[14px] font-extrabold text-slate-800">
                      {isParsing ? 'Auto-Parsing Excel Line Items...' : 'Drag & Drop Completed RFQ-8842.xlsx'}
                    </div>
                    <div className="text-[11.5px] text-slate-600 w-full px-2 mx-auto mt-1 leading-relaxed">
                      {isParsing ? 'Auto-recognizing columns · Verifying zero reformatting required...' : 'Work offline in Excel & drop it back right here in seconds'}
                    </div>
                  </div>
                  {isParsing && (
                    <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-[#3666ff] animate-pulse w-4/5 rounded-full" />
                    </div>
                  )}
                </div>
              ) : (
                /* Step 3 & 4: Mapped Table + Instant Submission */
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-600" /> 142 Items Mapped to FactWise Platform Grid
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      ✓ 100% Structural Match
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden text-[11px]">
                    <div className="grid grid-cols-4 bg-slate-100 p-2 font-bold text-slate-600 text-[10px]">
                      <span>Part Description</span>
                      <span className="text-right">Qty</span>
                      <span className="text-right">Unit Price</span>
                      <span className="text-right">Total (₹)</span>
                    </div>
                    {[
                      { p: 'MCU STM32F407VGT6', q: '500 pcs', u: '₹420.00', t: '₹2,10,000' },
                      { p: 'PCB Multi-Layer High-Freq', q: '1,000 pcs', u: '₹145.00', t: '₹1,45,000' },
                      { p: 'SMD Ceramic Cap 0.1uF', q: '10,000 pcs', u: '₹1.80', t: '₹18,000' },
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-4 p-2 border-t border-slate-200 items-center bg-white">
                        <span className="font-semibold text-slate-800 truncate pr-1">{row.p}</span>
                        <span className="text-right font-mono text-slate-500">{row.q}</span>
                        <span className="text-right font-mono font-bold text-[#3666ff] bg-blue-50/60 py-0.5 rounded px-1">{row.u}</span>
                        <span className="text-right font-mono font-bold text-slate-800">{row.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-[11px] shrink-0">
              <div>
                <span className="font-bold text-slate-800">Total Quote Value: ₹28,45,000</span>
                <div className="text-[9.5px] text-slate-500">Every bid structured · Zero manual reformatting</div>
              </div>
              <button className={`sd-btn ${isSubmitted ? 'bg-emerald-600 shadow-emerald-500/30' : 'glow'}`}>
                {isSubmitted ? (
                  <>
                    <CheckCheck className="size-4" /> Quote Submitted via Platform ✓
                  </>
                ) : (
                  <>Submit Platform Quote →</>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FEATURE 2: CONNECT ONCE. RESPOND AUTOMATICALLY (OPEN APIs)
   Visualizing the System-to-System API Bridge (No more dark terminal box!)
══════════════════════════════════════════════════════════════════════ */
const F2_MENU = [
  { p: 1, title: 'One-Call Open API Access (Items, Qty & Deadlines)' },
  { p: 2, title: 'Partner System Data Pull (No Portal Logins Required)' },
  { p: 3, title: 'Automated Pricing Logic Applied Inside Your ERP' },
  { p: 4, title: 'Instant Zero-Touch Auto-Response Back to FactWise' },
];

function Feature2ConnectOnceAPI({ isActive = true }: { isActive?: boolean }) {
  const t = useLocalizedText();
  const [step, setStep] = useState<number>(0);
  const [isAuto, setIsAuto] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuto || !isActive) return;
    const hold = step === 0 ? 1100 : step === 3 ? 1400 : step === 6 ? 1400 : 1100;
    const t = setTimeout(() => setStep((s) => (s + 1) % 10), hold);
    return () => clearTimeout(t);
  }, [step, isAuto, isActive]);

  const goManual = (p: number) => {
    setIsAuto(false);
    if (p === 1) setStep(0);
    else if (p === 2) setStep(3);
    else if (p === 3) setStep(5);
    else setStep(8);
  };

  const activeMenu = stepToMenu(step, 10);
  const showPull = step >= 2;
  const showLogic = step >= 4;
  const showRespond = step >= 7;

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* LEFT COLUMN: Exact Wording + Progress Menu */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 space-y-3.5 text-left"
      >
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10.5px] font-semibold uppercase tracking-[0.12em]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
          {t('Feature 02 · API Automation')}
        </div>

        <h3
          className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.16]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('Connect Once. Respond Automatically.')} <br />
          <span className="text-[#3666ff]">{t('Open APIs. Seamless Integration. Zero Manual Intervention.')}</span>
        </h3>

        <p className="text-slate-600 text-[14px] leading-[1.62] font-normal text-left" style={{ fontFamily: 'var(--font-inter)' }}>
          {t("Why have your team manually enter pricing when your systems already have the answers? FactWise provides open APIs that give your ERP complete access to every RFQ, quote, and PO you've been invited to—item details, quantities, deadlines, and requirements—all in one call. Your system pulls the data, applies your pricing logic, and responds back automatically with zero logins or manual entry.")}
        </p>

        <div className="text-[13.5px] font-bold text-[#3666ff] tracking-tight pt-1">
          {t('Connect your system once. Never miss an RFQ, quote, or PO again.')}
        </div>

        {/* 4-Step Progress Menu */}
        <div className="flex flex-col gap-1.5 pt-1 text-left">
          {F2_MENU.map((item) => (
            <div
              key={item.p}
              onClick={() => goManual(item.p)}
              className={`relative flex items-center justify-between w-full rounded-xl py-2.5 px-3.5 transition-all duration-300 group cursor-pointer overflow-hidden ${
                activeMenu === item.p
                  ? 'bg-white border border-[#3666ff]/80 shadow-[0_6px_24px_rgba(54,102,255,0.12)] scale-[1.015] z-10'
                  : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
              }`}
            >
              {activeMenu === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`size-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    activeMenu === item.p
                      ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_10px_rgba(54,102,255,0.4)]'
                      : activeMenu > item.p
                      ? 'border-[#00b884] bg-[#00b884] text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                  }`}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </div>
                <span
                  className={`text-[12px] font-bold tracking-tight ${
                    activeMenu === item.p ? 'text-[#3666ff]' : activeMenu > item.p ? 'text-slate-700' : 'text-slate-500'
                  }`}
                >
                  {t(item.title)}
                </span>
              </div>
              {activeMenu === item.p && (
                <span className="relative z-10 text-[8px] font-black text-emerald-600 bg-emerald-50/80 border borderemerald-100 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest flex items-center gap-1 shadow-sm">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />{t('Active')}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT COLUMN: 520px Visual System-to-System Bridge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="lg:col-span-6 order-2 lg:order-2 relative"
      >
        <div className="sd-root">
          <div className="sd-chrome">
            <div className="sd-url">app.factwise.io / open-api-bridge / live-automation</div>
            <div className="sd-pill"><span className="d" />API Bridge · Connected</div>
          </div>

          <div className="sd-body relative">
            {/* Top explanation banner */}
            <div className="sd-card bg-gradient-to-r from-blue-50 to-indigo-50/50 border-blue-200/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-[#3666ff] text-white flex items-center justify-center font-bold shadow-sm">
                  <Activity className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Seamless System-to-System API Bridge</div>
                  <div className="text-[10px] text-slate-600">ERP automatically pulls RFQs, applies pricing logic, and quotes back</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                Zero Logins Required
              </span>
            </div>

            {/* Visual Two-System Bridge Area */}
            <div className="flex-1 grid grid-cols-11 gap-2 items-center my-auto">
              {/* Box 1: FactWise Cloud */}
              <div className={`col-span-4 rounded-xl p-3 border-2 transition-all flex flex-col justify-between h-full bg-slate-50 ${activeMenu === 1 || showRespond ? 'border-[#3666ff] shadow-md bg-blue-50/30' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Cloud className="size-4 text-[#3666ff]" />
                  <span className="text-xs font-bold text-slate-800">FactWise Cloud</span>
                </div>
                <div className="space-y-1.5 my-auto py-2">
                  <div className="text-[10.5px] font-bold text-slate-800">RFQ #IQ-8842 Arrived</div>
                  <div className="text-[9.5px] text-slate-500">142 BOM items · Closes 48h</div>
                  <div className="inline-block text-[9px] bg-blue-100 text-[#3666ff] font-bold px-1.5 py-0.5 rounded">
                    Open API Endpoint Active
                  </div>
                </div>
                <div className="text-[9.5px] text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded border border-emerald-200">
                  {showRespond ? '✓ Auto-Quote Received in 1.2s' : 'Waiting for Partner Pull...'}
                </div>
              </div>

              {/* Box 2: Animated Bridge / Packets */}
              <div className="col-span-3 relative flex flex-col items-center justify-center gap-2 px-1">
                <div className="w-full h-1 bg-gradient-to-r from-[#3666ff] to-emerald-500 rounded-full relative overflow-hidden">
                  <div className="pkt-r" />
                  <div className="pkt-l" />
                </div>
                <div className="text-center">
                  <div className="text-[9.5px] font-mono font-bold text-slate-700 uppercase">One Call API</div>
                  <div className="text-[8.5px] text-slate-400">REST & GraphQL</div>
                </div>
                <div className="flex gap-1">
                  <span className="size-2 rounded-full bg-[#3666ff] animate-ping" />
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>

              {/* Box 3: Partner ERP System */}
              <div className={`col-span-4 rounded-xl p-3 border-2 transition-all flex flex-col justify-between h-full bg-slate-50 ${showPull || showLogic ? 'border-purple-500 shadow-md bg-purple-50/20' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Server className="size-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-800">Your ERP System</span>
                </div>
                <div className="space-y-1.5 my-auto py-2">
                  <div className="text-[10.5px] font-bold text-slate-800">
                    {showPull ? 'Pulled 142 BOM Specs ✓' : 'Ready to Connect'}
                  </div>
                  <div className="text-[9.5px] text-slate-500">
                    {showLogic ? 'Applied Margin & Pricing Logic' : 'Pulls RFQ data automatically'}
                  </div>
                  {showLogic && (
                    <div className="text-[10px] font-mono font-bold text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                      Total: ₹28,45,000
                    </div>
                  )}
                </div>
                <div className="text-[9.5px] font-bold bg-slate-100 text-slate-600 p-1.5 rounded border border-slate-200">
                  {showRespond ? '⚡ Responded Back Zero-Touch' : showLogic ? 'Ready to Dispatch Quote ->' : 'Syncing via API...'}
                </div>
              </div>
            </div>

            {/* Footer summary */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-[11px] shrink-0">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-800">No portal logins · No manual data entry · No delays</span>
              </div>
              <span className={`sd-btn ${showRespond ? 'bg-emerald-600' : 'glow'}`}>
                {showRespond ? 'Automated Response Complete ✓' : 'Connecting API...'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FEATURE 3: LET FACTWISE RESPOND FOR YOU (AI AUTO-RESPONSE FROM REPOSITORY)
   Interactive 3-Column Visual Flowchart (Customer ERP / S4 HANA <-> Portal <-> Partner System)
══════════════════════════════════════════════════════════════════════ */
const F3_MENU = [
  { p: 1, title: 'Store Partner Pricing Repository (Contracts, POs, MOQ, SPQ)' },
  { p: 2, title: 'Instant RFQ, Quote, or PO Sync from Customer ERP' },
  { p: 3, title: 'AI Line-Item Matching Against Your Golden Repository' },
  { p: 4, title: 'Instant Auto-Response & Downstream PO/Invoice Automation' },
];

function Feature3AIAutoResponse({ isActive = true }: { isActive?: boolean }) {
  const t = useLocalizedText();
  const [step, setStep] = useState<number>(0);
  const [isAuto, setIsAuto] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuto || !isActive) return;
    const hold = step === 0 ? 1200 : step === 3 ? 1500 : step === 6 ? 1500 : 1200;
    const t = setTimeout(() => setStep((s) => (s + 1) % 10), hold);
    return () => clearTimeout(t);
  }, [step, isAuto, isActive]);

  const goManual = (p: number) => {
    setIsAuto(false);
    if (p === 1) setStep(0);
    else if (p === 2) setStep(3);
    else if (p === 3) setStep(5);
    else setStep(8);
  };

  const activeMenu = stepToMenu(step, 10);
  const showSync = step >= 2;
  const showRfq = step >= 4;
  const showAutomation = step >= 7;

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* LEFT COLUMN: Flowchart Progress Menu */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 space-y-3.5 text-left"
      >
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10.5px] font-semibold uppercase tracking-[0.12em]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
          {t('Feature 01 · AI Engine & Repository')}
        </div>

        <h3
          className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.16]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('Let FactWise Respond For You.')} <br />
          <span className="text-[#3666ff]">{t('AI-Powered Auto-Response. From Your Own Pricing Repository.')}</span>
        </h3>

        <p className="text-slate-600 text-[14px] leading-[1.62] font-normal text-left" style={{ fontFamily: 'var(--font-inter)' }}>
          {t('Store your pricing repository—contracts, POs, and custom MPN price lists—directly on FactWise. The moment an RFQ, quote request, or PO lands, FactWise AI automatically matches specifications, selects the best price, and responds instantly on your behalf with zero manual work required.')}
        </p>

        <div className="text-[13.5px] font-bold text-[#3666ff] tracking-tight pt-1">
          {t('Store your pricing once. Win business automatically. Every time.')}
        </div>

        {/* 4-Step Progress Menu */}
        <div className="flex flex-col gap-1.5 pt-1 text-left">
          {F3_MENU.map((item) => (
            <div
              key={item.p}
              onClick={() => goManual(item.p)}
              className={`relative flex items-center justify-between w-full rounded-xl py-2.5 px-3.5 transition-all duration-300 group cursor-pointer overflow-hidden ${
                activeMenu === item.p
                  ? 'bg-white border border-[#3666ff]/80 shadow-[0_6px_24px_rgba(54,102,255,0.12)] scale-[1.015] z-10'
                  : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
              }`}
            >
              {activeMenu === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`size-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    activeMenu === item.p
                      ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_10px_rgba(54,102,255,0.4)]'
                      : activeMenu > item.p
                      ? 'border-[#00b884] bg-[#00b884] text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                  }`}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </div>
                <span
                  className={`text-[12px] font-bold tracking-tight ${
                    activeMenu === item.p ? 'text-[#3666ff]' : activeMenu > item.p ? 'text-slate-700' : 'text-slate-500'
                  }`}
                >
                  {t(item.title)}
                </span>
              </div>
              {activeMenu === item.p && (
                <span className="relative z-10 text-[8px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest flex items-center gap-1 shadow-sm">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />{t('Active')}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT COLUMN: 520px Flowchart Story Visualizer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="lg:col-span-6 order-2 lg:order-2 relative"
      >
        <div className="sd-root bg-white border-slate-200 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
          <div className="sd-chrome border-slate-200 bg-white">
            <div className="sd-url bg-slate-50 border-slate-200 text-slate-600 font-mono text-[9px]">factwise.io / open-api / flow-architecture</div>
            <div className="sd-pill"><span className="d bg-[#3666ff] shadow-[0_0_0_3px_rgba(54,102,255,0.2)]" />AI Repository Flowchart</div>
          </div>

          <div className="sd-body bg-white relative p-4 flex flex-col justify-between overflow-hidden">
            
            {/* Top Flowchart Architecture Title */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between shrink-0 mb-2">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-[#3666ff]" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-800">FactWise ERP Integration Pipeline</div>
                  <div className="text-[9px] text-slate-500 font-mono">Partner System ↔ FactWise Portal ↔ Customer ERP</div>
                </div>
              </div>
              <span className="text-[8.5px] font-mono font-bold bg-[#3666ff]/10 text-[#3666ff] border border-[#3666ff]/20 px-2 py-0.5 rounded">
                ⚡ LIVE FLOW
              </span>
            </div>

            {/* 4-Block Flowchart Canvas */}
            <div className="flex-1 relative w-full h-[320px] min-h-0 flex items-center justify-center">
              
              {/* CSS keyframe animations for marching data packets */}
              <style>{`
                @keyframes dash-flow-right { to { stroke-dashoffset: -20; } }
                @keyframes dash-flow-left { to { stroke-dashoffset: 20; } }
                .line-right { stroke-dasharray: 6 4; animation: dash-flow-right 1.2s infinite linear; }
                .line-left { stroke-dasharray: 6 4; animation: dash-flow-left 1.2s infinite linear; }
              `}</style>

              <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 560 300" fill="none">
                
                {/* ─── CONNECTOR LINES & DATA PIPELINES ─── */}
                
                {/* 1. Partner System <---> Partner Pricing Repository */}
                <path d="M 105 145 H 155" stroke="#3666ff" strokeWidth="1.5" className={cn(showSync ? "line-right" : "opacity-30")} />

                {/* 2. Partner Pricing Repository <---> FactWise AI Portal */}
                <path d="M 250 125 H 300" stroke="#3666ff" strokeWidth="1.5" className={cn(showRfq ? "line-right" : "opacity-30")} />
                <path d="M 300 165 H 250" stroke="#10b981" strokeWidth="1.5" className={cn(showRfq ? "line-left" : "opacity-30")} />

                {/* 3. FactWise AI Portal <---> Customer ERPs (3 Automation Lines to 3 separate Customer Blocks) */}
                {/* Line 1 (PO Sync to Customer A ERP) */}
                <path d="M 400 65 H 450" stroke="#10b981" strokeWidth="1.5" className={cn(showAutomation ? "line-right" : "opacity-30")} />
                {/* Line 2 (Invoice Sync to Customer B ERP) */}
                <path d="M 450 150 H 400" stroke="#f43f5e" strokeWidth="1.5" className={cn(showAutomation ? "line-left" : "opacity-30")} />
                {/* Line 3 (Payment Sync to Customer C ERP) */}
                <path d="M 400 235 H 450" stroke="#10b981" strokeWidth="1.5" className={cn(showAutomation ? "line-right" : "opacity-30")} />

                {/* 4. Bypass Line: Partner Onboarding (Partner System -> FactWise AI Portal) */}
                <path d="M 55 80 C 55 15, 350 15, 350 55" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5 3" className="opacity-30" />

                {/* 5. Bypass Lines: Portal -> Partner System (PO, Invoice, Payment Automation) */}
                <path d="M 350 245 C 350 295, 55 295, 55 210" stroke="#10b981" strokeWidth="1.5" className={cn(showAutomation ? "line-left" : "opacity-20")} />

                {/* ─── BLOCKS (using foreignObject for rich HTML) ─── */}
                
                {/* Block 1: Partner System (Left-most, Green Theme) */}
                <foreignObject x="10" y="80" width="95" height="130">
                  <div className={cn(
                    "w-full h-full rounded-xl border p-2 flex flex-col justify-between text-left transition-all duration-500",
                    isActive 
                      ? "bg-emerald-50/70 border-emerald-200 shadow-sm" 
                      : "bg-slate-50 border-slate-100 opacity-60"
                  )}>
                    <div className="text-[8px] font-mono text-emerald-600 font-bold uppercase tracking-wider">Partner System</div>
                    <div className="space-y-1 my-auto">
                      <div className="text-[9.5px] font-extrabold text-slate-800 leading-tight">Your ERP</div>
                      <div className="text-[7.5px] text-slate-500 leading-snug">Stores base price lists & MOQs.</div>
                    </div>
                    <span className="text-[7px] font-bold text-emerald-600 bg-emerald-100/50 border border-emerald-200/50 px-1 py-0.5 rounded text-center">
                      {showSync ? "Synced" : "Connecting"}
                    </span>
                  </div>
                </foreignObject>

                {/* Block 2: Partner Pricing Repository (Middle-left, Gray Theme) */}
                <foreignObject x="155" y="90" width="95" height="110">
                  <div className={cn(
                    "w-full h-full rounded-xl border p-2.5 flex flex-col justify-between text-left transition-all duration-500",
                    showSync 
                      ? "bg-slate-50 border-slate-200 shadow-sm" 
                      : "bg-slate-50/40 border-slate-100 opacity-50"
                  )}>
                    <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">Repository</div>
                    <div className="space-y-0.5 my-auto">
                      <div className="text-[9.5px] font-extrabold text-slate-800 leading-tight">Your Pricing Data</div>
                      <div className="text-[7px] text-slate-500 leading-snug">Maintains live catalog rates.</div>
                    </div>
                    <span className="text-[7px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-center">
                      {showSync ? "DB Online" : "Syncing"}
                    </span>
                  </div>
                </foreignObject>

                {/* Block 3: FactWise AI Portal (Middle-right, Blue Theme) */}
                <foreignObject x="300" y="55" width="100" height="190">
                  <div className={cn(
                    "w-full h-full rounded-xl border p-2 flex flex-col justify-between text-left transition-all duration-500",
                    showRfq 
                      ? "bg-blue-50/70 border-blue-200 shadow-sm" 
                      : "bg-slate-50 border-slate-100 opacity-60"
                  )}>
                    <div className="text-[8px] font-mono text-blue-600 font-bold uppercase tracking-wider">Partner Portal</div>
                    <div className="space-y-1 my-auto">
                      <div className="text-[9.5px] font-extrabold text-slate-800 leading-tight">FactWise Portal</div>
                      <div className="text-[7.5px] text-slate-500 leading-snug">Matches incoming RFQ specifications.</div>
                    </div>
                    <span className="text-[7px] font-bold text-blue-600 bg-blue-100/50 border border-blue-200/50 px-1 py-0.5 rounded text-center">
                      {showAutomation ? "Quote Sent" : showRfq ? "Matching RFQ" : "Idle"}
                    </span>
                  </div>
                </foreignObject>

                {/* Block 4A: Customer A ERP (Right-most Top, Purple Theme) */}
                <foreignObject x="450" y="30" width="105" height="70">
                  <div className={cn(
                    "w-full h-full rounded-xl border p-2 flex flex-col justify-between text-left transition-all duration-500",
                    showAutomation 
                      ? "bg-purple-50/70 border-purple-200 shadow-sm" 
                      : "bg-slate-50 border-slate-100 opacity-60"
                  )}>
                    <div className="text-[7.5px] font-mono text-purple-600 font-bold uppercase tracking-wider">Customer ERP · 01</div>
                    <div className="space-y-0.5 my-auto">
                      <div className="text-[9px] font-extrabold text-slate-800 leading-tight">Buyer System</div>
                      <div className="text-[7px] text-slate-500 leading-snug">Auto-triggers RFQs.</div>
                    </div>
                  </div>
                </foreignObject>

                {/* Block 4B: Customer B ERP (Right-most Middle, Purple Theme) */}
                <foreignObject x="450" y="115" width="105" height="70">
                  <div className={cn(
                    "w-full h-full rounded-xl border p-2 flex flex-col justify-between text-left transition-all duration-500",
                    showAutomation 
                      ? "bg-purple-50/70 border-purple-200 shadow-sm" 
                      : "bg-slate-50 border-slate-100 opacity-60"
                  )}>
                    <div className="text-[7.5px] font-mono text-purple-600 font-bold uppercase tracking-wider">Customer ERP · 02</div>
                    <div className="space-y-0.5 my-auto">
                      <div className="text-[9px] font-extrabold text-slate-800 leading-tight">Buyer System</div>
                      <div className="text-[7px] text-slate-500 leading-snug">Auto-syncs invoices.</div>
                    </div>
                  </div>
                </foreignObject>

                {/* Block 4C: Customer C ERP (Right-most Bottom, Purple Theme) */}
                <foreignObject x="450" y="200" width="105" height="70">
                  <div className={cn(
                    "w-full h-full rounded-xl border p-2 flex flex-col justify-between text-left transition-all duration-500",
                    showAutomation 
                      ? "bg-purple-50/70 border-purple-200 shadow-sm" 
                      : "bg-slate-50 border-slate-100 opacity-60"
                  )}>
                    <div className="text-[7.5px] font-mono text-purple-600 font-bold uppercase tracking-wider">Customer ERP · 03</div>
                    <div className="space-y-0.5 my-auto">
                      <div className="text-[9px] font-extrabold text-slate-800 leading-tight">Buyer System</div>
                      <div className="text-[7px] text-slate-500 leading-snug">Auto-syncs payments.</div>
                    </div>
                  </div>
                </foreignObject>

                {/* LABELS OVER CONNECTORS */}
                {/* Onboarding */}
                <text x="202" y="22" fill="#a855f7" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle" opacity="0.6">Partner Onboarding</text>
                
                {/* RFQ / Quote */}
                {showRfq && (
                  <>
                    <text x="275" y="117" fill="#3666ff" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">RFQ In</text>
                    <text x="275" y="180" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Quote Out</text>
                  </>
                )}

                {/* Pricing Data */}
                {showSync && (
                  <text x="130" y="137" fill="#3666ff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Pricing Sync</text>
                )}

                {/* 3 lines labels (PO, Invoice, Payment Automation) */}
                {showAutomation && (
                  <>
                    <text x="425" y="57" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PO Sync</text>
                    <text x="425" y="142" fill="#f43f5e" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Invoice</text>
                    <text x="425" y="227" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Payment</text>
                  </>
                )}

                {/* Downstream Partner Automation */}
                {showAutomation && (
                  <text x="202" y="292" fill="#10b981" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Partner PO & Invoice Automation</text>
                )}
              </svg>
            </div>

            {/* Bottom Story Banner */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-[11px] shrink-0">
              <span className="font-bold text-slate-700 flex items-center gap-1.5 text-left">
                <Check className="size-4 text-emerald-500 shrink-0" />
                Store contract rates once — AI matches and responds automatically.
              </span>
              <span className="sd-btn bg-[#3666ff] hover:bg-blue-600 text-white font-bold px-3 py-1 text-[10px]">
                {showAutomation ? "Auto-Responded ✓" : "AI Active..."}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN HORIZONTAL SCROLL — CSS sticky + Framer Motion useScroll
   No GSAP pin-spacer, no scroll resets, works with any scroll wrapper.
══════════════════════════════════════════════════════════════════════ */
export default function SupplierFeaturesFlow() {
  const t = useLocalizedText();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Framer Motion scroll tracking ── */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // scrollYProgress maps 0 to 1 over exactly (TOTAL - 1) viewports of scroll distance.
    // By multiplying by (TOTAL - 1) and rounding, each panel gets exactly 100vh of scroll space
    // centered around its target position, making up/down scroll perfectly symmetrical.
    const idx = Math.round(latest * (TOTAL - 1));
    if (idx !== activePanel) {
      setActivePanel(idx);
    }
  });

  /* ── arrow navigation: smooth-scroll to the target panel's zone ── */
  const navTo = useCallback((idx: number) => {
    if (!wrapperRef.current) return;
    const sectionTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    const segH = wrapperRef.current.offsetHeight / TOTAL;
    window.scrollTo({ top: sectionTop + segH * idx + 10, behavior: 'smooth' });
  }, []);

  /* ── inject CSS ── */
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!document.getElementById('supp-dash-styles')) {
      const el = document.createElement('style');
      el.id = 'supp-dash-styles';
      el.textContent = SUPP_DASH_STYLE;
      document.head.appendChild(el);
    }
  }, []);

  /* ── desktop detection ── */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const navPrev = useCallback(() => navTo(Math.max(0, activePanel - 1)), [navTo, activePanel]);
  const navNext = useCallback(() => navTo(Math.min(TOTAL - 1, activePanel + 1)), [navTo, activePanel]);

  return (
    <>
      {/* ── HEADING (scrolls normally) ── */}
      <section style={{ background: 'white', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 14px',
              borderRadius: 100,
              background: 'rgba(54,102,255,0.06)',
              border: '1px solid rgba(54,102,255,0.15)',
              fontSize: 11,
              fontWeight: 700,
              color: '#3666ff',
              marginBottom: 24,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter)',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#3666ff',
                display: 'inline-block',
                animation: 'supp-pulse 2s infinite',
              }}
            />
            {t('The FactWise Supplier Engine')}
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 3.4vw, 52px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#0D1117',
              margin: '0 0 16px',
              fontFamily: 'var(--font-display)',
            }}
          >
            {t('How FactWise')} <span style={{ color: '#3666ff' }}>{t('Powers Every Supplier.')}</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: '#64748b',
              maxWidth: 640,
              margin: '0 auto',
              fontFamily: 'var(--font-inter)',
            }}
          >
            {t('From manual entry to Excel round-trips, Open APIs, and AI-powered pricing repositories — respond however works best for your team.')}
          </p>
        </div>
      </section>

      {/* ── DESKTOP: tall wrapper gives scroll room; inner div is CSS sticky ── */}
      <div
        ref={wrapperRef}
        className="hidden lg:block"
        style={{ height: `${(TOTAL - 1) * 100}vh`, position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: 'white',
          }}
        >
          {/* Panel 0 — base layer, always behind */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
            }}
          >
            <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
              <Feature3AIAutoResponse isActive={activePanel === 0} />
            </div>
          </div>

          {/* Panel 1 — slides in from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: activePanel >= 1 ? '0%' : '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: gradientBg,
            }}
          >
            <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
              <Feature2ConnectOnceAPI isActive={activePanel === 1} />
            </div>
          </motion.div>

          {/* Panel 2 — slides in from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: activePanel >= 2 ? '0%' : '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
            }}
          >
            <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
              <Feature1RespondYourWay isActive={activePanel === 2} />
            </div>
          </motion.div>

          {/* Progress dots */}
          <div
            className="hidden lg:flex"
            style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              alignItems: 'center',
              gap: 8,
              background: 'white',
              border: '1px solid rgba(15,23,42,0.08)',
              borderRadius: 100,
              padding: '8px 16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              pointerEvents: 'none',
            }}
          >
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: activePanel === i ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: activePanel === i ? '#3666ff' : activePanel > i ? '#00b884' : '#e2e8f0',
                  transition: 'all .4s cubic-bezier(.22,.61,.36,1)',
                }}
              />
            ))}
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#3666ff',
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: '0.06em',
                marginLeft: 4,
              }}
            >
              {STEPS[activePanel]?.num} · {t(STEPS[activePanel]?.short ?? '')}
            </span>
          </div>

          {/* Prev arrow */}
          <button
            onClick={navPrev}
            aria-label="Previous step"
            className="hidden lg:flex"
            style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 100,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(15,23,42,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'opacity .2s ease, border-color .2s ease, color .2s ease',
              opacity: activePanel === 0 ? 0 : 1,
              pointerEvents: activePanel === 0 ? 'none' : 'auto',
              color: '#64748b',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,102,255,0.4)';
              (e.currentTarget as HTMLElement).style.color = '#3666ff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)';
              (e.currentTarget as HTMLElement).style.color = '#64748b';
            }}
          >
            <ChevronLeft style={{ width: 16, height: 16, color: 'inherit' }} />
          </button>

          {/* Next arrow */}
          <button
            onClick={navNext}
            aria-label="Next step"
            className="hidden lg:flex"
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 100,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: activePanel === TOTAL - 1 ? 'rgba(0,184,132,0.1)' : 'white',
              border: `1px solid ${activePanel === TOTAL - 1 ? 'rgba(0,184,132,0.3)' : 'rgba(15,23,42,0.1)'}`,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'all .2s ease',
              color: activePanel === TOTAL - 1 ? '#00b884' : '#64748b',
            }}
            onMouseEnter={(e) => {
              if (activePanel < TOTAL - 1) {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,102,255,0.4)';
                (e.currentTarget as HTMLElement).style.color = '#3666ff';
              }
            }}
            onMouseLeave={(e) => {
              if (activePanel < TOTAL - 1) {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)';
                (e.currentTarget as HTMLElement).style.color = '#64748b';
              }
            }}
          >
            <ChevronRight style={{ width: 16, height: 16, color: 'inherit' }} />
          </button>
        </div>
      </div>

      {/* ── MOBILE: stacked vertically ── */}
      <div className="block lg:hidden bg-white">
        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}>
          <Feature3AIAutoResponse isActive />
        </div>
        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}>
          <Feature2ConnectOnceAPI isActive />
        </div>
        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}>
          <Feature1RespondYourWay isActive />
        </div>
      </div>

      <style>{`@keyframes supp-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
    </>
  );
}
