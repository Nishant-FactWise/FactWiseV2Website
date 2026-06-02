'use client';

import * as React from "react"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ============================================================================
// Widget 1: Unstructured Requisitions — chaos inbox vs structured form
// ============================================================================
function ReqChaosWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">Procurement Inbox</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-semibold flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
          No Structure
        </span>
      </div>

      <div className="space-y-1.5 my-1.5 text-[8.5px]">
        {[
          { from:'Rajesh (Ops)',    msg:'Need 200 safety gloves ASAP — call me',  channel:'📞 Call',  color:'text-orange-500' },
          { from:'Priya (Eng)',     msg:'Req for control valves — see email below', channel:'✉️ Email', color:'text-blue-500'   },
          { from:'Suresh (Maint)', msg:'WhatsApp: spare seals needed urgently!!',  channel:'💬 Chat',  color:'text-green-600'  },
        ].map(item => (
          <div key={item.from} className="flex items-start gap-2 bg-white p-1.5 rounded border border-slate-100 shadow-3xs">
            <span className={`${item.color} shrink-0 font-bold`}>{item.channel}</span>
            <div>
              <div className="font-semibold text-slate-700">{item.from}</div>
              <div className="text-slate-400 leading-tight">{item.msg}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1.5">
        <span>Tracking status: unknown</span>
        <span className="text-red-500 font-bold">⚠️ 0% visibility</span>
      </div>

      {/* Hover overlay: structured FactWise form */}
      <motion.div
        initial={{ x: '100%' }}
        animate={isHovered ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute inset-0 bg-white p-3 flex flex-col gap-2 z-20 border-l-4 border-l-[#3666ff] rounded-r-xl shadow-md"
      >
        <div className="flex justify-between items-center">
          <span className="text-[8.5px] font-mono text-[#3666ff] font-bold uppercase tracking-widest">FW Requisition Form</span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded font-bold">✓ Structured</span>
        </div>
        <div className="space-y-1.5 text-[8.5px]">
          {[
            { label:'Item', value:'Safety Gloves × 200' },
            { label:'Dept', value:'Operations' },
            { label:'Approver', value:'Dept Manager → Finance' },
            { label:'Status', value:'In Approval Queue', green: true },
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
// Widget 2: Missed Bulk Discounts — isolated orders vs consolidated
// ============================================================================
function BulkDiscountWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">Separate Orders — Same Vendor</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold">
          ⚠️ No Consolidation
        </span>
      </div>

      <div className="space-y-1 text-[8.5px]">
        {[
          { req:'REQ-1041', item:'Hydraulic Seals',  qty:'50 pcs',  unit:'₹18.40', total:'₹920' },
          { req:'REQ-1043', item:'Hydraulic Seals',  qty:'60 pcs',  unit:'₹18.40', total:'₹1,104' },
          { req:'REQ-1047', item:'Hydraulic Seals',  qty:'90 pcs',  unit:'₹18.40', total:'₹1,656' },
        ].map(r => (
          <div key={r.req} className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-100 shadow-3xs">
            <span className="font-mono text-slate-400 text-[8px]">{r.req}</span>
            <span className="text-slate-600 font-medium">{r.qty}</span>
            <span className="font-mono font-bold text-slate-800">{r.unit}/pc</span>
            <span className="font-mono font-bold text-red-500">{r.total}</span>
          </div>
        ))}
        <div className="flex justify-between items-center px-1.5 pt-1 border-t border-slate-200/60">
          <span className="text-slate-500 font-bold">3 separate POs</span>
          <span className="font-mono font-bold text-red-500 text-[9px]">Total: ₹3,680</span>
        </div>
      </div>

      {/* Hover: consolidated view with savings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        className="absolute inset-0 bg-white/97 backdrop-blur-[1.5px] flex items-center justify-center p-3 text-center pointer-events-none z-10"
      >
        <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-3 shadow-lg flex flex-col items-center max-w-[90%] w-full gap-2">
          <span className="text-[8px] font-mono tracking-widest text-emerald-400 uppercase font-bold">FW Consolidated Order</span>
          <div className="grid grid-cols-2 gap-2 text-[8.5px] w-full">
            <div className="bg-white/10 rounded p-1.5">
              <div className="text-slate-400 text-[7px] uppercase">Merged Qty</div>
              <div className="font-bold text-white">200 pcs</div>
            </div>
            <div className="bg-emerald-900/50 rounded p-1.5 border border-emerald-700/40">
              <div className="text-emerald-400 text-[7px] uppercase">Bulk Rate</div>
              <div className="font-bold text-emerald-300">₹14.90/pc</div>
            </div>
          </div>
          <div className="text-[8.5px] text-slate-300 mt-1 leading-tight font-medium">
            Total: <span className="text-emerald-400 font-bold">₹2,980</span>
            <span className="text-emerald-300 ml-2">↓ ₹700 saved (19%)</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Widget 3: Email RFQ chaos — same pattern as VendorCommWidget
// ============================================================================
function EmailRFQWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">RFQ: Control Valves</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
          Unanswered (5d)
        </span>
      </div>

      <div className="space-y-1.5 my-2">
        <div className="bg-white p-1.5 rounded border border-slate-100 shadow-3xs text-[8.5px]">
          <div className="flex justify-between text-slate-400 font-bold mb-0.5">
            <span>✉️ To: Fluid Controls Ltd</span>
            <span>5 days ago</span>
          </div>
          <p className="text-slate-600 truncate leading-tight font-medium">Please quote best price for 50× DN50 control valves...</p>
        </div>
        <div className="bg-white p-1.5 rounded border border-slate-100 shadow-3xs text-[8.5px]">
          <div className="flex justify-between text-slate-400 font-bold mb-0.5">
            <span>✉️ To: Fluid Controls Ltd</span>
            <span className="text-red-500 font-bold flex items-center gap-0.5">⏰ Overdue</span>
          </div>
          <p className="text-slate-600 truncate leading-tight font-medium">Reminder: bid closing tomorrow — please respond urgently...</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1.5">
        <span>Vendors chased: 3 times</span>
        <span className="flex items-center gap-1 text-amber-600 font-bold uppercase tracking-wider">
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="inline-block text-[10px]">⏳</motion.span>
          Awaiting Bids...
        </span>
      </div>

      <motion.div
        initial={{ x: '100%' }}
        animate={isHovered ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute inset-0 bg-white p-3.5 flex flex-col justify-between z-20 border-l-4 border-l-[#3666ff] shadow-md rounded-r-xl"
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-[8.5px] font-mono text-[#3666ff] font-bold uppercase tracking-widest">FW Auto-Chaser</span>
          <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded font-bold">⚡ Active</span>
        </div>
        <div className="space-y-1.5 text-[8.5px]">
          <div className="bg-slate-50 border border-slate-200/60 p-1.5 rounded flex items-start gap-1.5 shadow-3xs">
            <span className="text-emerald-600 shrink-0">✅</span>
            <div>
              <div className="font-bold text-slate-700 leading-tight">All Bids Collected</div>
              <div className="text-slate-400 text-[7.5px] mt-0.5 leading-tight font-medium">6 vendors responded · AI ranked by landed cost</div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200/60 px-2 py-1 rounded flex items-center justify-between text-emerald-600 font-bold shadow-3xs">
            <span>Best bid:</span>
            <span className="text-[8.5px] bg-emerald-50 border border-emerald-200 px-1.5 rounded animate-pulse">✉️ ₹11,240 · Locked</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// Widget 4: Unit price vs true landed cost
// ============================================================================
function LandedCostWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">Bid Comparison</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold">✅ Lowest Unit Price</span>
        </div>
        <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200/60 shadow-3xs">
          <div>
            <div className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">Unit Price</div>
            <div className="text-xs font-bold text-slate-800">₹22.00</div>
          </div>
          <div className="text-right">
            <div className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">Vendor</div>
            <div className="text-[8.5px] font-bold text-slate-600">ShipEast Supply</div>
          </div>
        </div>
      </div>

      <div className="relative bg-white border border-slate-200/40 p-2 rounded text-[8.5px] overflow-hidden flex flex-col gap-1 shadow-3xs">
        <div className="flex justify-between text-slate-500 font-bold">
          <span>Landed Cost Breakdown</span>
          <span className="text-slate-400 text-[8px] font-medium">Details ▼</span>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="overflow-hidden space-y-1 mt-1 text-[7.5px] border-t border-slate-100 pt-1"
        >
          <div className="flex justify-between text-slate-500 font-medium">
            <span>✈️ International Freight</span>
            <span className="font-mono text-red-500 font-bold">+₹3.80</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>🏛️ Import Duties (BCD 10%)</span>
            <span className="font-mono text-red-500 font-bold">+₹2.20</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>📦 Packaging & Insurance</span>
            <span className="font-mono text-red-500 font-bold">+₹1.40</span>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 text-[9px] font-bold">
        <span className="text-slate-500 font-bold">True Landed Cost:</span>
        <div className="relative w-[55px] h-[14px] text-right font-mono font-bold">
          <motion.span initial={{ opacity:1, y:0 }} animate={isHovered ? { opacity:0, y:-10 } : { opacity:1, y:0 }} className="absolute right-0 text-slate-800 text-[10px]">₹22.00</motion.span>
          <motion.span initial={{ opacity:0, y:10 }} animate={isHovered ? { opacity:1, y:0 } : { opacity:0, y:10 }} className="absolute right-0 text-red-500 text-[10px]">⚠️ ₹29.40</motion.span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Widget 5: Manual PO creation one-by-one with errors
// ============================================================================
function ManualPOWidget({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
      <div className="flex justify-between items-center border-b border-slate-200/60 pb-1">
        <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">PO Creation — Manual</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-500 font-semibold">🚫 Data Error</span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-200 rounded p-px font-mono text-[8px] my-1">
        <div className="bg-slate-50 p-1 text-slate-400 font-bold">Field</div>
        <div className="bg-slate-50 p-1 text-slate-400 font-bold">Value</div>
        <div className="bg-white p-1 text-slate-600 font-medium">Vendor</div>
        <div className="bg-white p-1 text-slate-800 font-bold">Apex Ind.</div>
        <div className="bg-white p-1 text-slate-600 font-medium">Qty Ordered</div>
        <div className="bg-white p-1 text-amber-600 font-bold italic">50 ← wrong?</div>
        <div className="bg-white p-1 text-slate-700 font-bold">Total Value</div>
        <div className="bg-white p-1 relative h-[14px]">
          <motion.div initial={{ opacity:1, scale:1 }} animate={isHovered ? { opacity:0, scale:0.8 } : { opacity:1, scale:1 }} className="text-red-500 font-bold font-mono text-[7.5px] bg-red-50 px-1 rounded border border-red-200/50 leading-tight w-fit">#REF!</motion.div>
          <motion.div initial={{ opacity:0, scale:0.8 }} animate={isHovered ? { opacity:1, scale:1 } : { opacity:0, scale:0.8 }} className="absolute inset-0 p-1 text-emerald-600 font-bold font-mono text-[8.5px]">₹11,240</motion.div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1">
        <span>POs pending: 12 more</span>
        <span className="text-red-500 font-bold">⚠️ Wrong qty ships</span>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="absolute bottom-0 left-0 right-0 bg-emerald-600 border-t border-emerald-500 p-2 text-[8.5px] text-white flex items-center justify-between font-bold shadow-lg"
      >
        <span>✨ 12 POs generated in 1 click</span>
        <span className="text-[7.5px] bg-white/20 px-1.5 rounded font-mono font-bold">Zero errors</span>
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
    id: 'req-chaos',
    number: '01',
    emoji: '🔴',
    title: 'Unstructured Requisitions',
    subtitle: 'No structure, no tracking, no control.',
    description: 'Requisitions arrive from everywhere with no format or visibility. Things get missed, duplicated, or approved without the right oversight.',
  },
  {
    id: 'bulk-discount',
    number: '02',
    emoji: '🟠',
    title: 'Missed Bulk Savings',
    subtitle: 'One req at a time means paying more than you should.',
    description: 'Separate orders miss bulk discounts. Combined quantities could unlock far better rates — but nobody consolidates.',
  },
  {
    id: 'email-rfq',
    number: '03',
    emoji: '🟡',
    title: 'Email-Based RFQ Chaos',
    subtitle: 'Vendor bids scattered across emails nobody tracks.',
    description: 'Email RFQs go unanswered and responses get lost. By the time all bids arrive, days are gone and negotiations haven\'t started.',
  },
  {
    id: 'landed-cost',
    number: '04',
    emoji: '🔵',
    title: 'Hidden Landed Costs',
    subtitle: 'Unit price hides the true landed cost.',
    description: 'Duties, freight, and packaging don\'t show up until after the PO. By then, the margin is already gone.',
  },
  {
    id: 'manual-po',
    number: '05',
    emoji: '🟣',
    title: 'Manual PO Creation',
    subtitle: 'Manual PO creation — slow, error-prone, unnecessary.',
    description: 'Teams copy PO data line by line after shortlisting. One error ships the wrong quantity; one delay stops production.',
  },
]

function renderWidget(id: string, isHovered: boolean) {
  switch (id) {
    case 'req-chaos':     return <ReqChaosWidget isHovered={isHovered} />
    case 'bulk-discount': return <BulkDiscountWidget isHovered={isHovered} />
    case 'email-rfq':     return <EmailRFQWidget isHovered={isHovered} />
    case 'landed-cost':   return <LandedCostWidget isHovered={isHovered} />
    case 'manual-po':     return <ManualPOWidget isHovered={isHovered} />
    default: return null
  }
}

export default function ReqProblemSection() {
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
              Procurement Vulnerabilities
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 3.4vw, 52px)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: '#0D1117',
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)'
              }}
            >
              Where Internal Procurement <br />
              <span className="text-[#3666ff]">Breaks Down.</span>
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
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 pt-2 px-6 xl:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                'group relative rounded-3xl bg-white border border-slate-200/60 p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:border-[#3666ff]/20 cursor-pointer overflow-hidden w-[280px] min-w-[280px] sm:w-auto sm:min-w-[290px] xl:min-w-[310px] max-w-[325px] flex-shrink-0 snap-start h-[420px] sm:h-[470px] shadow-[0_12px_36px_-10px_rgba(15,23,42,0.12),_0_0_20px_rgba(54,102,255,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(54,102,255,0.18)]'
              )}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(54, 102, 255, 0.02), transparent 70%)' }} />

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
