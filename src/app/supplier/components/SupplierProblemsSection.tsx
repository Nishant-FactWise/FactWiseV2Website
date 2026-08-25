'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, CheckCircle2, FileText, Database, TrendingUp } from 'lucide-react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

/* ════════════════════════════════════════════
   WIDGET 01: RFQ OVERLOAD WIDGET
════════════════════════════════════════════ */
function RFQOverloadWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[195px] sm:h-[210px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/60 overflow-hidden font-sans text-left shadow-2xs flex flex-col justify-between">
      {/* Header tab */}
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          Inbox Status
        </span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-semibold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          14 Unanswered RFQs
        </span>
      </div>

      {/* Stack of portal/email cards */}
      <div className="space-y-1.5 my-1 text-[8.5px]">
        <div className="bg-white p-1.5 rounded border border-slate-200/80 shadow-3xs flex justify-between items-center">
          <span className="font-semibold text-slate-700">Ariba Portal · RFQ-902</span>
          <span className="text-red-500 font-mono font-bold">2h left · Manual Entry</span>
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-200/80 shadow-3xs flex justify-between items-center">
          <span className="font-semibold text-slate-700">Coupa Login · RFQ-441</span>
          <span className="text-amber-600 font-mono font-bold">Expires Today</span>
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-200/80 shadow-3xs flex justify-between items-center">
          <span className="font-semibold text-slate-700">Email Thread · Spreadsheet Attached</span>
          <span className="text-slate-400 font-mono">Unread (3d)</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-200/60 pt-1">
        <span>Avg. time per RFQ: 4.5 hours</span>
        <span className="text-red-500 font-bold">High Miss Rate 🚫</span>
      </div>

      {/* Hover Overlay: Unified FactWise Inbox */}
      <motion.div
        initial={{ y: '100%' }}
        animate={isHovered ? { y: 0 } : { y: '100%' }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        className="absolute inset-0 bg-white p-3.5 flex flex-col justify-between z-20 border-t-4 border-t-[#3666ff] shadow-lg rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-center shrink-0">
          <span className="text-[9px] font-mono font-bold text-[#3666ff] uppercase tracking-wider">
            ✨ FactWise Solution
          </span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
            All-in-1 Dashboard
          </span>
        </div>
        <div className="space-y-1.5 text-[8.5px] my-auto">
          <div className="bg-slate-50 border border-slate-200 p-2 rounded text-slate-700 font-medium leading-tight">
            ✓ <span className="font-bold">Zero Portal Fatigue:</span> All your incoming RFQs centralized in one clean view.
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded text-slate-700 font-medium leading-tight">
            ⚡ <span className="font-bold">Respond in Seconds:</span> One-click Excel sync or auto-submit without re-entering data.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   WIDGET 02: FRAGMENTED PRICING DATA WIDGET
════════════════════════════════════════════ */
function FragmentedPricingWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[195px] sm:h-[210px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/60 overflow-hidden font-sans text-left shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          Pricing Repository State
        </span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold">
          ⚠️ Scattered Across Teams
        </span>
      </div>

      {/* Chaotic split screen */}
      <div className="grid grid-cols-2 gap-1.5 my-1 text-[8px]">
        <div className="bg-white p-1.5 rounded border border-slate-200 shadow-3xs">
          <div className="font-bold text-slate-600 mb-0.5">📂 Local Excel</div>
          <div className="text-slate-500 truncate">Pricelist_v9_FINAL.xlsx</div>
          <div className="text-red-500 font-mono mt-1">Stale rates (2025)</div>
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-200 shadow-3xs">
          <div className="font-bold text-slate-600 mb-0.5">✉️ Email Thread</div>
          <div className="text-slate-500 truncate">RE: Special contract discount</div>
          <div className="text-amber-600 font-mono mt-1">Buried in inbox</div>
        </div>
        <div className="col-span-2 bg-amber-50/60 p-1.5 rounded border border-amber-200/70 flex justify-between items-center text-[8.5px]">
          <span className="text-amber-800 font-medium">💭 MOQs stored in sales engineer&apos;s head</span>
          <span className="font-mono text-red-600 font-bold">Risk: High</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-200/60 pt-1">
        <span>Lookup time: Hours per RFQ</span>
        <span className="text-red-500 font-bold">Manual Errors ⚠️</span>
      </div>

      {/* Hover Overlay: Centralized Repository */}
      <motion.div
        initial={{ y: '100%' }}
        animate={isHovered ? { y: 0 } : { y: '100%' }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        className="absolute inset-0 bg-white p-3.5 flex flex-col justify-between z-20 border-t-4 border-t-[#3666ff] shadow-lg rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-center shrink-0">
          <span className="text-[9px] font-mono font-bold text-[#3666ff] uppercase tracking-wider">
            ✨ FactWise Solution
          </span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
            Single Source of Truth
          </span>
        </div>
        <div className="space-y-1.5 text-[8.5px] my-auto">
          <div className="bg-emerald-50/70 border border-emerald-200 p-2 rounded text-emerald-950 font-medium flex justify-between items-center leading-tight">
            <span>MPN: STM32F407VGT6</span>
            <span className="font-mono font-bold text-emerald-700">₹420.00 @ MOQ 500</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded text-slate-700 font-medium leading-tight">
            ✓ <span className="font-bold">Live Price Repo:</span> Contracts, PO history, and MOQs organized centrally. AI matches exact rates instantly.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   WIDGET 03: SLOW RESPONSES = LOST DEALS WIDGET
════════════════════════════════════════════ */
function SlowResponsesWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[195px] sm:h-[210px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/60 overflow-hidden font-sans text-left shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          Buyer Award Evaluation
        </span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-semibold">
          🚫 Invisible Bidder
        </span>
      </div>

      {/* Buyer dashboard ranking */}
      <div className="space-y-1.5 my-1 text-[8.5px]">
        <div className="bg-white p-1.5 rounded border border-slate-200 shadow-3xs flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[7.5px]">#1</span>
            <span className="font-bold text-slate-700">Competitor A (Automated)</span>
          </div>
          <span className="font-mono text-emerald-600 font-bold">0.4 hrs · Awarded 🏆</span>
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-200 shadow-3xs flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[7.5px]">#2</span>
            <span className="font-medium text-slate-600">Competitor B</span>
          </div>
          <span className="font-mono text-slate-500">1.2 hrs · Backup</span>
        </div>
        <div className="bg-red-50/60 p-1.5 rounded border border-red-200/80 flex justify-between items-center opacity-70">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[7.5px]">-</span>
            <span className="font-bold text-red-800">Your Manual Team</span>
          </div>
          <span className="font-mono text-red-600 font-semibold">6.8 hrs · Arrived Too Late</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-200/60 pt-1">
        <span>Buyer policy: Fast & Accurate Wins</span>
        <span className="text-red-500 font-bold">Lost Revenue 🚫</span>
      </div>

      {/* Hover Overlay: FactWise Instant Winner */}
      <motion.div
        initial={{ y: '100%' }}
        animate={isHovered ? { y: 0 } : { y: '100%' }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        className="absolute inset-0 bg-white p-3.5 flex flex-col justify-between z-20 border-t-4 border-t-[#3666ff] shadow-lg rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-center shrink-0">
          <span className="text-[9px] font-mono font-bold text-[#3666ff] uppercase tracking-wider">
            ✨ FactWise Solution
          </span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
            Rank #1 Guaranteed Speed
          </span>
        </div>
        <div className="space-y-1.5 text-[8.5px] my-auto">
          <div className="bg-emerald-50 border border-emerald-300 p-2 rounded flex justify-between items-center shadow-2xs leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[8px]">#1</span>
              <span className="font-extrabold text-emerald-950">Your FactWise Quote</span>
            </div>
            <span className="font-mono text-emerald-700 font-bold">⚡ 2.1s · AWARDED 🏆</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded text-slate-700 font-medium leading-tight">
            ✓ <span className="font-bold">Be First Every Time:</span> Quote in seconds via Excel or AI Auto-Response. Never invisible again.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ProblemItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const problems: ProblemItem[] = [
  {
    id: 'rfq-overload',
    number: '01',
    title: 'Too Many RFQs. Too Little Time.',
    subtitle: 'Dozens of RFQs Across Email & Portals.',
    description:
      'Manual data entry across portals drains hours per RFQ. By the time your team pulls prices together, the winning opportunity is already gone.',
  },
  {
    id: 'fragmented-pricing',
    number: '02',
    title: 'Pricing Data Lives Everywhere Except Where It Matters.',
    subtitle: 'Spreadsheets, Contracts & Head Knowledge.',
    description:
      'Without a centralized pricing repository, checking MOQs and past contracts takes manual effort — leading to errors, delays, and lost business.',
  },
  {
    id: 'slow-responses',
    number: '03',
    title: 'Slow Responses Mean Lost Deals.',
    subtitle: 'Buyers Award to the Fastest, Most Accurate Bid.',
    description:
      "In competitive procurement, speed wins. If your team spends hours manually building responses, you're not just slow — you're invisible.",
  },
];

export default function SupplierProblemsSection() {
  const t = useLocalizedText();
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToSolution = (problemId: string) => {
    const map: Record<string, string> = {
      'rfq-overload': 'feature-1-respond-your-way',
      'fragmented-pricing': 'feature-2-connect-once',
      'slow-responses': 'feature-3-ai-auto-response',
    };
    const targetId = map[problemId];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const scrollDistance = 330;
      const scrollTo = direction === 'left' ? scrollLeft - scrollDistance : scrollLeft + scrollDistance;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const renderWidget = (problemId: string, isHovered: boolean) => {
    switch (problemId) {
      case 'rfq-overload':
        return <RFQOverloadWidget isHovered={isHovered} />;
      case 'fragmented-pricing':
        return <FragmentedPricingWidget isHovered={isHovered} />;
      case 'slow-responses':
        return <SlowResponsesWidget isHovered={isHovered} />;
      default:
        return null;
    }
  };

  return (
    <section id="supplier-problems" className="py-20 md:py-24 bg-white relative overflow-hidden border-y border-slate-100 text-[#1A1D2E]">
      {/* Ambient background blur */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6 relative z-10">
        {/* Header row with arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-[11px] font-semibold text-[#3666ff] uppercase tracking-[0.12em] mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
              {t('Supplier Sourcing Challenges')}
            </div>

            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 48px)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                margin: '0 0 20px',
                fontFamily: 'var(--font-display)',
              }}
            >
              {t('Why Most Suppliers')} <br />
              <span className="text-[#3666ff]">{t('Struggle to Respond on Time.')}</span>
            </h2>
          </div>
        </div>

        {/* Compact, Light-Themed horizontal visual card carousel */}
        <div
          ref={scrollContainerRef}
          className="w-full flex overflow-x-auto justify-start md:justify-center xl:justify-center gap-6 pb-8 pt-2 px-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
        >
          {problems.map((prob, idx) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              onMouseEnter={() => setHoveredCardId(prob.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className={cn(
                'group relative rounded-3xl bg-white border border-slate-200/60 p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:border-[#3666ff]/20 overflow-hidden w-[280px] min-w-[280px] sm:w-auto sm:min-w-[290px] xl:min-w-[310px] max-w-[325px] flex-shrink-0 snap-start h-[420px] sm:h-[470px] shadow-[0_12px_36px_-10px_rgba(15,23,42,0.12),_0_0_20px_rgba(54,102,255,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(54,102,255,0.18)]'
              )}
            >
              {/* Card Content Top Section */}
              <div className="flex flex-col gap-3 relative z-10 text-left">
                <h3
                  className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.015em] text-slate-800 leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t(prob.subtitle)}
                </h3>

                <p
                  className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-normal"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {t(prob.description)}
                </p>
              </div>

              {/* Interactive Inner Widget */}
              <div className="my-3 relative z-10 w-full">{renderWidget(prob.id, hoveredCardId === prob.id)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
