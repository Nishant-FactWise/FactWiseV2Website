'use client';

import * as React from "react"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ============================================================================
// Widget 1: Invoice chaos — multi-channel inbox vs structured invoice form
// ============================================================================
function InvoiceChaosWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">AP Inbox · Today</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-semibold flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
          14 unsorted
        </span>
      </div>

      <div className="space-y-1.5 my-1.5 text-[8.5px]">
        {[
          { src:'📧 Email',    msg:'PDF: Apex_Inv_4912.pdf — 3 attachments',   tone:'text-orange-500' },
          { src:'💬 WhatsApp', msg:'Photo of Meridian invoice — re-key needed',tone:'text-green-600' },
          { src:'📄 Paper',    msg:'FluidTech invoice handed at reception',    tone:'text-blue-500'   },
        ].map(item => (
          <div key={item.src} className="flex items-start gap-2 bg-white p-1.5 rounded border border-slate-100 shadow-3xs">
            <span className={`${item.tone} shrink-0 font-bold`}>{item.src}</span>
            <div className="text-slate-400 leading-tight">{item.msg}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1.5">
        <span>Re-keyed manually · errors creep in</span>
        <span className="text-red-500 font-bold">⚠️ 0% match-ready</span>
      </div>

      {/* Hover overlay: structured FW invoice */}
      <motion.div
        initial={{ x: '100%' }}
        animate={isHovered ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute inset-0 bg-white p-3 flex flex-col gap-2 z-20 border-l-4 border-l-[#3666ff] rounded-r-xl shadow-md"
      >
        <div className="flex justify-between items-center">
          <span className="text-[8.5px] font-mono text-[#3666ff] font-bold uppercase tracking-widest">FW Invoice · Parsed</span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded font-bold">✓ Structured</span>
        </div>
        <div className="space-y-1.5 text-[8.5px]">
          {[
            { label:'Invoice #', value:'INV-90412' },
            { label:'Vendor',    value:'Apex Industrial' },
            { label:'PO Ref',    value:'PO-8810 · Auto-linked' },
            { label:'Value',     value:'$14,910 · Ready to match', green: true },
          ].map(f => (
            <div key={f.label} className="flex justify-between bg-slate-50 px-2 py-1 rounded border border-slate-100">
              <span className="text-slate-400 font-medium">{f.label}</span>
              <span className={`font-bold ${f.green ? 'text-emerald-600' : 'text-slate-700'}`}>{f.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Widget 2: Goods Receipt visibility — paper log vs digital GR
// ============================================================================
function GRVisibilityWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">Today's Deliveries</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold">
          ⚠️ Paper Log
        </span>
      </div>

      <div className="space-y-1 text-[8.5px]">
        {[
          { ref:'GRN-—',   item:'Hydraulic Seals',    note:'qty?'    },
          { ref:'GRN-—',   item:'Control Valves',     note:'damaged?' },
          { ref:'GRN-—',   item:'Pressure Gauges',    note:'pending?' },
        ].map(r => (
          <div key={r.item} className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-100 shadow-3xs">
            <span className="font-mono text-slate-400 text-[8px]">{r.ref}</span>
            <span className="text-slate-600 font-medium">{r.item}</span>
            <span className="font-mono font-bold text-amber-500">{r.note}</span>
          </div>
        ))}
        <div className="flex justify-between items-center px-1.5 pt-1 border-t border-slate-200/60">
          <span className="text-slate-500 font-bold">Recorded on paper · Not in system</span>
          <span className="font-mono font-bold text-red-500 text-[9px]">0% visibility</span>
        </div>
      </div>

      {/* Hover: digital GR with quantities */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        className="absolute inset-0 bg-white/97 backdrop-blur-[1.5px] flex items-center justify-center p-3 text-center pointer-events-none z-10"
      >
        <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-3 shadow-lg flex flex-col items-center max-w-[95%] w-full gap-2">
          <span className="text-[8px] font-mono tracking-widest text-emerald-400 uppercase font-bold">FW Goods Receipt · GRN-7841</span>
          <div className="grid grid-cols-3 gap-2 text-[8.5px] w-full">
            <div className="bg-white/10 rounded p-1.5">
              <div className="text-slate-400 text-[7px] uppercase">Ordered</div>
              <div className="font-bold text-white">200 pcs</div>
            </div>
            <div className="bg-white/10 rounded p-1.5">
              <div className="text-slate-400 text-[7px] uppercase">Received</div>
              <div className="font-bold text-white">186 pcs</div>
            </div>
            <div className="bg-amber-900/50 rounded p-1.5 border border-amber-700/40">
              <div className="text-amber-400 text-[7px] uppercase">Short</div>
              <div className="font-bold text-amber-300">14 pcs</div>
            </div>
          </div>
          <div className="text-[8.5px] text-slate-300 mt-1 leading-tight font-medium">
            Status: <span className="text-emerald-400 font-bold">Logged · Auto-linked to PO</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Widget 3: QC lost on paper vs digital QC report
// ============================================================================
function QCLostWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">QC · Shop Floor</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
          Not in system
        </span>
      </div>

      <div className="space-y-1.5 my-2">
        <div className="bg-white p-1.5 rounded border border-slate-100 shadow-3xs text-[8.5px]">
          <div className="flex justify-between text-slate-400 font-bold mb-0.5">
            <span>💬 WhatsApp · QC Lead</span>
            <span>2 hrs ago</span>
          </div>
          <p className="text-slate-600 truncate leading-tight font-medium">"12 pcs rejected from Apex batch — visible scratches"</p>
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-100 shadow-3xs text-[8.5px]">
          <div className="flex justify-between text-slate-400 font-bold mb-0.5">
            <span>📓 Notebook entry</span>
            <span className="text-red-500 font-bold flex items-center gap-0.5">⏰ Not synced</span>
          </div>
          <p className="text-slate-600 truncate leading-tight font-medium">"Secondary inspection passed — line A, no PO ref noted"</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1.5">
        <span>Rejection data: lost</span>
        <span className="flex items-center gap-1 text-amber-600 font-bold uppercase tracking-wider">
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="inline-block text-[10px]">⏳</motion.span>
          Payment proceeds blind
        </span>
      </div>

      <motion.div
        initial={{ x: '100%' }}
        animate={isHovered ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute inset-0 bg-white p-3.5 flex flex-col justify-between z-20 border-l-4 border-l-[#3666ff] shadow-md rounded-r-xl"
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-[8.5px] font-mono text-[#3666ff] font-bold uppercase tracking-widest">FW QC · QCR-2204</span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded font-bold">⚡ Linked</span>
        </div>
        <div className="space-y-1.5 text-[8.5px]">
          <div className="bg-slate-50 border border-slate-200/60 p-1.5 rounded flex items-start gap-1.5 shadow-3xs">
            <span className="text-emerald-600 shrink-0">✅</span>
            <div>
              <div className="font-bold text-slate-700 leading-tight">Primary · 186 pcs accepted</div>
              <div className="text-slate-400 text-[7.5px] mt-0.5 leading-tight font-medium">Tied to GRN-7841 · PO-8810 · INV-90412</div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/60 px-2 py-1 rounded flex items-center justify-between font-bold shadow-3xs">
            <span className="text-amber-600">Rejected: 12 pcs</span>
            <span className="text-[8.5px] bg-emerald-50 border border-emerald-200 px-1.5 rounded text-emerald-700">Deduct $504 from payment</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Widget 4: Manual matching vs AI 4-way match
// ============================================================================
function ManualMatchingWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">Manual Match — Apex INV</span>
          <span
            className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold transition-all duration-300 ${
              isHovered
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}
          >
            {isHovered ? '✓ Match' : '🚫 Mismatch'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[8.5px]">
          {[
            { lbl:'PO',      val:'$14,910', tone:'text-slate-700' },
            { lbl:'GR',      val:'186 pcs', tone:'text-amber-600' },
            { lbl:'Invoice', val:'$14,910', tone:'text-slate-700' },
          ].map(c => (
            <div key={c.lbl} className="bg-white p-1.5 rounded border border-slate-200/60 text-center shadow-3xs">
              <div className="text-[7px] text-slate-400 font-bold uppercase tracking-wider">{c.lbl}</div>
              <div className={`text-[10px] font-mono font-bold ${c.tone}`}>{c.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-white border border-slate-200/40 p-2 rounded text-[8.5px] overflow-hidden flex flex-col gap-1 shadow-3xs">
        <div className="flex justify-between text-slate-500 font-bold">
          <span>Manual reconciliation</span>
          <span className="text-slate-400 text-[8px] font-medium">Auditing line items ▼</span>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="overflow-hidden space-y-1 mt-1 text-[7.5px] border-t border-slate-100 pt-1"
        >
          <div className="flex justify-between text-slate-500 font-medium">
            <span>QC rejected 12 pcs</span>
            <span className="font-mono text-red-500 font-bold">-$504</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Short-shipped 14 pcs</span>
            <span className="font-mono text-red-500 font-bold">-$588</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Early-pay discount missed</span>
            <span className="font-mono text-red-500 font-bold">-$298</span>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 text-[9px] font-bold">
        <span className="text-slate-500 font-bold">Final Liability:</span>
        <div className="relative w-[68px] h-[14px] text-right font-mono font-bold">
          <motion.span initial={{ opacity:1, y:0 }} animate={isHovered ? { opacity:0, y:-10 } : { opacity:1, y:0 }} className="absolute right-0 text-red-500 text-[10px]">$14,910 ⚠️</motion.span>
          <motion.span initial={{ opacity:0, y:10 }} animate={isHovered ? { opacity:1, y:0 } : { opacity:0, y:10 }} className="absolute right-0 text-emerald-600 text-[10px]">✓ $13,520</motion.span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Widget 5: No end-to-end visibility vs unified status tracker
// ============================================================================
function NoVisibilityWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center border-b border-slate-200/60 pb-1">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">INV-90412 · Status</span>
        <span
          className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold transition-all duration-300 ${
            isHovered
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
              : 'bg-red-50 border border-red-200 text-red-500'
          }`}
        >
          {isHovered ? '✓ Known' : '🚫 Unknown'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-200 rounded p-px font-mono text-[8px] my-1">
        <div className="bg-slate-50 p-1 text-slate-400 font-bold">Stage</div>
        <div className="bg-slate-50 p-1 text-slate-400 font-bold">Status</div>
        <div className="bg-white p-1 text-slate-600 font-medium">GR done?</div>
        <div className="bg-white p-1 text-amber-600 font-bold italic">unclear</div>
        <div className="bg-white p-1 text-slate-600 font-medium">QC signed?</div>
        <div className="bg-white p-1 text-amber-600 font-bold italic">no record</div>
        <div className="bg-white p-1 text-slate-700 font-bold">Approval?</div>
        <div className="bg-white p-1 relative h-[14px]">
          <motion.div initial={{ opacity:1, scale:1 }} animate={isHovered ? { opacity:0, scale:0.8 } : { opacity:1, scale:1 }} className="text-red-500 font-bold font-mono text-[7.5px] bg-red-50 px-1 rounded border border-red-200/50 leading-tight w-fit">?? chasing</motion.div>
          <motion.div initial={{ opacity:0, scale:0.8 }} animate={isHovered ? { opacity:1, scale:1 } : { opacity:0, scale:0.8 }} className="absolute inset-0 p-1 text-emerald-600 font-bold font-mono text-[8.5px]">✓ Cleared</motion.div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1">
        <span>Finance · Vendor · QC all chasing</span>
        <span className="text-red-500 font-bold">⚠️ Everyone working blind</span>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="absolute bottom-0 left-0 right-0 bg-emerald-600 border-t border-emerald-500 p-2 text-[8.5px] text-white flex items-center justify-between font-bold shadow-lg"
      >
        <span>✨ Full audit trail · GR → QC → Match → Pay</span>
        <span className="text-[7.5px] bg-white/20 px-1.5 rounded font-mono font-bold">Live</span>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Problem data
// ============================================================================
interface ProblemItem {
  id: string; number: string; emoji: string; title: string; subtitle: string; description: string;
}

const problems: ProblemItem[] = [
  {
    id: 'invoice-chaos',
    number: '01',
    emoji: '🔴',
    title: 'Unstructured Invoices',
    subtitle: 'Every format, every channel — zero structure.',
    description: 'PDFs, photos, paper — all re-keyed manually. By the time anyone matches them to a PO, errors are in and payments are late.',
  },
  {
    id: 'no-gr-visibility',
    number: '02',
    emoji: '🟠',
    title: 'Blind on Deliveries',
    subtitle: 'No GR means no idea what actually arrived.',
    description: "Short-shipments and damage go unrecorded — teams stay blind to stock levels and follow-ups.",
  },
  {
    id: 'qc-lost',
    number: '03',
    emoji: '🟡',
    title: 'QC Data Lost on Paper',
    subtitle: 'QC on paper or chat never reaches the system.',
    description: 'Rejections go untracked, acceptances unverified — QC data reaches finance late or not at all.',
  },
  {
    id: 'manual-matching',
    number: '04',
    emoji: '🔵',
    title: 'Manual Payment Matching',
    subtitle: 'Payments go out without 4-way matching.',
    description: "Overpayments, duplicates, and missed deductions happen regularly — margins lost that didn't need to be.",
  },
  {
    id: 'no-visibility',
    number: '05',
    emoji: '🟣',
    title: 'Zero End-to-End Visibility',
    subtitle: 'Is GR done? QC signed? Payment approved? Nobody knows.',
    description: "Finance chases approvals, vendors chase payments, everyone works blind — and the status of any invoice is anyone's guess.",
  },
]

function renderWidget(id: string, isHovered: boolean) {
  switch (id) {
    case 'invoice-chaos':    return <InvoiceChaosWidget isHovered={isHovered} />
    case 'no-gr-visibility': return <GRVisibilityWidget isHovered={isHovered} />
    case 'qc-lost':          return <QCLostWidget isHovered={isHovered} />
    case 'manual-matching':  return <ManualMatchingWidget isHovered={isHovered} />
    case 'no-visibility':    return <NoVisibilityWidget isHovered={isHovered} />
    default: return null
  }
}

export default function InvoiceProblemSection() {
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollDistance = 310
      const scrollTo = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollDistance
        : scrollContainerRef.current.scrollLeft + scrollDistance
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden border-y border-slate-100 text-[#1A1D2E]">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-[11px] font-semibold text-[#3666ff] uppercase tracking-[0.12em] mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
              Payables Vulnerabilities
            </div>

            <h2
              className="text-[24px] sm:text-[36px] md:text-[48px] font-semibold text-slate-900 mb-6 leading-[1.15] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where Most Teams Lose <br />
              <span className="text-[#3666ff]">Money and Trust.</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3 self-end mb-1 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="size-11 rounded-full border border-slate-200/80 bg-white hover:border-[#3666ff]/50 hover:bg-blue-50/20 text-slate-500 hover:text-[#3666ff] active:scale-95 transition-all flex items-center justify-center shadow-xs cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="size-11 rounded-full border border-slate-200/80 bg-white hover:border-[#3666ff]/50 hover:bg-blue-50/20 text-slate-500 hover:text-[#3666ff] active:scale-95 transition-all flex items-center justify-center shadow-xs cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 pt-2 px-8 sm:px-12 xl:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {problems.map((prob, idx) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              onMouseEnter={() => setHoveredCardId(prob.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className={cn(
                'group relative rounded-3xl bg-white border border-slate-200 p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:border-[#3666ff]/20 cursor-pointer overflow-hidden w-[280px] min-w-[280px] sm:w-auto sm:min-w-[290px] xl:min-w-[310px] max-w-[325px] flex-shrink-0 snap-start h-[420px] sm:h-[470px] shadow-[0_16px_40px_-10px_rgba(15,23,42,0.15),_0_0_24px_rgba(54,102,255,0.06)] hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.22),_0_0_32px_rgba(54,102,255,0.16)]'
              )}
            >
              <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(54, 102, 255, 0.05), transparent 70%)' }} />

              <div className="flex flex-col gap-3 relative z-10 text-left">
                <h3 className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.015em] text-slate-800 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                  {prob.subtitle}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-slate-400 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                  {prob.description}
                </p>
              </div>

              <div className="my-3 relative z-10 w-full">
                {renderWidget(prob.id, hoveredCardId === prob.id)}
              </div>

              <div className="pt-3 border-t border-slate-100 relative z-10">
                <div className="relative h-5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-between transition-all duration-300 transform group-hover:-translate-y-full group-hover:opacity-0">
                    <span className="text-[9px] font-bold tracking-wider font-mono text-slate-400">LEAKING VALUE</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]/80" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[10px] font-bold text-[#3666ff] flex items-center gap-1">
                      See Solution
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">➔</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
