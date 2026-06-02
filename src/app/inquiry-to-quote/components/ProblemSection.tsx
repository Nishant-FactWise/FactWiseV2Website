'use client';

import * as React from "react"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

// ============================================================================
// Custom Widget Components for Premium Light-Theme Visuals
// ============================================================================

/**
 * Card 01: BOM Complexity Widget (Light Theme)
 * Displays a nested BOM tree with alternate supplier lists and dynamic price updates on hover.
 */
function BOMComplexityWidget({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left shadow-2xs">
            {/* Header tab */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5 mb-1.5">
                <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    BOM-Assy-v2.1
                </span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-semibold flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                    BOM Errors
                </span>
            </div>

            {/* BOM items */}
            <div className="space-y-1.5 text-[9.5px]">
                {/* Item 1 */}
                <div className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-100 shadow-3xs">
                    <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-mono">1.</span>
                        <span className="font-semibold text-slate-700">PCB Multi-layer</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[8.5px]">₹12.40</span>
                </div>

                {/* Item 2: Microcontroller (Alternates hover effect) */}
                <div className="relative flex flex-col bg-white p-1.5 rounded border border-slate-100 shadow-3xs transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 font-mono">2.</span>
                            <span className="font-semibold text-slate-700">MCU STM32</span>
                        </div>
                        <span className="text-red-500 font-mono text-[8.5px] font-semibold flex items-center gap-0.5">
                            ⚠️ Alternate Risk
                        </span>
                    </div>

                    {/* Alternates expandable drawer */}
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={isHovered ? { height: "auto", opacity: 1, marginTop: 4 } : { height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden space-y-1 border-t border-slate-100 pt-1 text-[8.5px]"
                    >
                        <div className="flex items-center justify-between text-emerald-700 bg-emerald-50/60 px-1 py-0.5 rounded border border-emerald-100/50">
                            <span>↳ Vendor B (Alt)</span>
                            <span className="font-mono text-[8px] font-semibold">₹2.10</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 px-1">
                            <span>↳ Vendor C (Alt)</span>
                            <span className="font-mono text-[8px]">₹2.85</span>
                        </div>
                    </motion.div>
                </div>

                {/* Item 3: Capacitor (Price feed populates) */}
                <div className="flex items-center justify-between bg-white p-1.5 rounded border border-slate-100 shadow-3xs">
                    <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-mono">3.</span>
                        <span className="font-semibold text-slate-700">Capacitor Array</span>
                    </div>
                    <div className="relative font-mono font-semibold text-right w-[50px] h-[14px]">
                        <motion.span
                            initial={{ opacity: 1, y: 0 }}
                            animate={isHovered ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                            className="absolute right-0 text-red-500 bg-red-50/50 border border-red-100 rounded px-1 py-0.2 text-[8px]"
                        >
                            🚫 No Rate
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            className="absolute right-0 text-emerald-600 text-[9px] font-bold"
                        >
                            ₹0.42
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* AI Banner floating in at the bottom */}
            <motion.div
                initial={{ y: 35 }}
                animate={isHovered ? { y: 0 } : { y: 35 }}
                className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#3666ff] py-1.5 px-3 font-bold text-[#3666ff] text-[8.5px] flex items-center justify-between shadow-md"
            >
                <span className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-[#3666ff] animate-ping" />
                    ✨ Alternates & Prices Loaded!
                </span>
                <span className="text-[7.5px] bg-blue-50 border border-blue-100 px-1 rounded">FW AI</span>
            </motion.div>
        </div>
    );
}

/**
 * Card 02: Pricing Guesswork Widget (Light Theme)
 * Shows manual target price input vs historical contract & PO comparison chart.
 */
function PricingGuessworkWidget({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
            {/* Target price input guessing box */}
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        Target Quote Price
                    </span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold">
                        ⚠️ 45% Guess Risk
                    </span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-slate-200/60 p-1.5 rounded shadow-3xs">
                    <span className="text-xs font-bold text-slate-800">₹12.50</span>
                    <span className="text-[8px] font-mono text-amber-600 animate-pulse font-semibold">❓ Manual Guess</span>
                </div>
            </div>

            {/* Comparison bars */}
            <div className="space-y-1.5 mt-2">
                <div className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                    Historical Contracts & POs
                </div>

                {/* Bar 1: Past PO */}
                <div className="space-y-0.5">
                    <div className="flex justify-between text-[8.5px]">
                        <span className="text-slate-500 font-medium">Past PO Rates</span>
                        <span className="font-mono text-slate-700 font-bold text-[8.5px]">₹8.40</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={isHovered ? { width: "67%" } : { width: "0%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-emerald-500 rounded-full"
                        />
                    </div>
                </div>

                {/* Bar 2: Contract Price */}
                <div className="space-y-0.5">
                    <div className="flex justify-between text-[8.5px]">
                        <span className="text-slate-500 font-medium">Active Contracts</span>
                        <span className="font-mono text-slate-700 font-bold text-[8.5px]">₹9.10</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={isHovered ? { width: "72%" } : { width: "0%" }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="h-full bg-[#3666ff] rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Sweet spot indicator overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-[1.5px] flex items-center justify-center p-3 text-center pointer-events-none z-10"
            >
                <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-3 shadow-lg flex flex-col items-center max-w-[90%]">
                    <span className="text-[8px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                        FW Recommendation
                    </span>
                    <span className="text-[13px] font-extrabold mt-1 text-white tracking-tight">₹8.75 - ₹9.10</span>
                    <span className="text-[8.5px] text-slate-300 mt-1 leading-tight font-medium">
                        Save ₹3.40/unit (27% Margin)
                    </span>
                </div>
            </motion.div>
        </div>
    );
}

/**
 * Card 03: Vendor Communication Widget (Light Theme)
 * Shows stacked RFQ emails with spinning chasing loaders and automated reminded status.
 */
function VendorCommWidget({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    RFQ: Vendor A
                </span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                    Unanswered (4d)
                </span>
            </div>

            {/* Email thread block */}
            <div className="space-y-1.5 my-2">
                <div className="bg-white p-1.5 rounded border border-slate-100 shadow-3xs text-[8.5px]">
                    <div className="flex justify-between text-slate-400 font-bold mb-0.5">
                        <span>✉️ To: Vendor A</span>
                        <span>4 days ago</span>
                    </div>
                    <p className="text-slate-600 truncate leading-tight font-medium">
                        Requesting best quote for Motherboard BOM alternates list...
                    </p>
                </div>

                <div className="bg-white p-1.5 rounded border border-slate-100 shadow-3xs text-[8.5px]">
                    <div className="flex justify-between text-slate-400 font-bold mb-0.5">
                        <span>✉️ To: Vendor A</span>
                        <span className="text-red-500 font-bold flex items-center gap-0.5">
                            ⏰ Overdue
                        </span>
                    </div>
                    <p className="text-slate-600 truncate leading-tight font-medium">
                        Friendly reminder: Bids closing soon. Need alternate rates...
                    </p>
                </div>
            </div>

            {/* Chasing spinner footer */}
            <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1.5">
                <span>Emails sent: 3</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold uppercase tracking-wider">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="inline-block text-[10px]"
                    >
                        ⏳
                    </motion.span>
                    Chasing Quote...
                </span>
            </div>

            {/* Automated Reminder Sent overlay */}
            <motion.div
                initial={{ x: "100%" }}
                animate={isHovered ? { x: 0 } : { x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="absolute inset-0 bg-white p-3.5 flex flex-col justify-between z-20 border-l-4 border-l-[#3666ff] shadow-md rounded-r-xl"
            >
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[8.5px] font-mono text-[#3666ff] font-bold uppercase tracking-widest">
                        FW Auto-Chaser
                    </span>
                    <span className="text-[7.5px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-1 rounded font-bold">
                        ⚡ Active
                    </span>
                </div>

                <div className="space-y-1.5 text-[8.5px]">
                    <div className="bg-slate-50 border border-slate-200/60 p-1.5 rounded flex items-start gap-1.5 shadow-3xs">
                        <span className="text-emerald-600 shrink-0">✅</span>
                        <div>
                            <div className="font-bold text-slate-700 leading-tight">Negotiation Triggered</div>
                            <div className="text-slate-400 text-[7.5px] mt-0.5 leading-tight font-medium">
                                Auto-reminders sent. Bid finalized 
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 px-2 py-1 rounded flex items-center justify-between text-emerald-600 font-bold shadow-3xs">
                        <span>Vendor A status:</span>
                        <span className="text-[8.5px] bg-emerald-50 border border-emerald-200 px-1.5 rounded animate-pulse">
                            ✉️ Bid Locked (₹8.15)
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/**
 * Card 04: Hidden Costs Widget (Light Theme)
 * Supplier cheapest quote details expanding on hover to reveal true Landed TCO.
 */
function HiddenCostsWidget({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        Supplier Bid Summary
                    </span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold">
                        ✅ Cheapest Bid
                    </span>
                </div>

                {/* Base quote */}
                <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200/60 shadow-3xs">
                    <div>
                        <div className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">
                            Base Unit Price
                        </div>
                        <div className="text-xs font-bold text-slate-800">₹10.00</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">
                            Supplier
                        </div>
                        <div className="text-[8.5px] font-bold text-slate-600">Vendor A</div>
                    </div>
                </div>
            </div>

            {/* Collapsed Duty Drawer representing hidden costs */}
            <div className="relative bg-white border border-slate-200/40 p-2 rounded text-[8.5px] overflow-hidden flex flex-col justify-between shadow-3xs">
                <div className="flex justify-between text-slate-500 font-bold">
                    <span>Landed Cost Breakdown</span>
                    <span className="text-slate-400 text-[8px] font-medium">Details ▼</span>
                </div>

                {/* Drawer Contents sliding down */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-1 mt-1 text-[7.5px] border-t border-slate-100 pt-1"
                >
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>✈️ Logistics & Freight</span>
                        <span className="font-mono text-red-500 font-bold">+₹1.50</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>🏛️ Import Customs (BCD)</span>
                        <span className="font-mono text-red-500 font-bold">+₹2.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                        <span>📦 Packaging Fees</span>
                        <span className="font-mono text-red-500 font-bold">+₹1.00</span>
                    </div>
                </motion.div>
            </div>

            {/* TCO footer total */}
            <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 text-[9px] font-bold">
                <span className="text-slate-500 font-bold">True Landed TCO:</span>
                <div className="relative w-[55px] h-[14px] text-right font-mono font-bold">
                    <motion.span
                        initial={{ opacity: 1, y: 0 }}
                        animate={isHovered ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                        className="absolute right-0 text-slate-800 text-[10px]"
                    >
                        ₹10.00
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        className="absolute right-0 text-red-500 text-[10px] flex items-center gap-0.5"
                    >
                        ⚠️ ₹14.50
                    </motion.span>
                </div>
            </div>
        </div>
    );
}

/**
 * Card 05: Manual Quoting Widget (Light Theme)
 * Excel spreadsheet cell formula error (#VALUE!) correcting itself on hover.
 */
function ManualQuotingWidget({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="relative w-full h-[170px] sm:h-[185px] bg-[#F8F9FA] rounded-xl p-3 border border-slate-200/50 overflow-hidden font-sans text-left flex flex-col justify-between shadow-2xs">
            {/* Sheet header */}
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-1">
                <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Excel - QuoteRollup.xlsx
                </span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold transition-all duration-300 ${
                    isHovered
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                        : "bg-red-50 border border-red-200 text-red-500"
                }`}>
                    {isHovered ? "✓ No Error" : "🚫 Math Error"}
                </span>
            </div>

            {/* Excel spreadsheet cells */}
            <div className="grid grid-cols-2 gap-px bg-slate-200 rounded p-px font-mono text-[8px] my-1">
                {/* Headers */}
                <div className="bg-slate-50 p-1 text-slate-400 font-bold">Cell A (Label)</div>
                <div className="bg-slate-50 p-1 text-slate-400 font-bold">Cell B (Value)</div>

                {/* Row 1 */}
                <div className="bg-white p-1 text-slate-600 font-medium">BOM Parts Cost</div>
                <div className="bg-white p-1 text-slate-800 font-bold">₹120.00</div>

                {/* Row 2 */}
                <div className="bg-white p-1 text-slate-600 font-medium">Assembly Markup</div>
                <div className="bg-white p-1 text-slate-400 italic">=₹120 * markup%</div>

                {/* Row 3 (Formula error) */}
                <div className="bg-white p-1 text-slate-700 font-bold">Final Cust Quote</div>
                <div className="bg-white p-1 relative h-[14px]">
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        animate={isHovered ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                        className="text-red-500 font-bold font-mono text-[7.5px] bg-red-50 px-1.5 rounded w-fit border border-red-200/50 leading-tight"
                    >
                        #VALUE!
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 p-1 text-emerald-600 font-bold font-mono text-[8.5px]"
                    >
                        ₹138.00
                    </motion.div>
                </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex justify-between items-center text-[8.5px] text-slate-400 border-t border-slate-200/60 pt-1">
                <span>Spreadsheet Status</span>
                <span className="text-red-500 font-bold">⚠️ Form Conflict</span>
            </div>

            {/* Mouse cursor micro-animation on hover */}
            <motion.div
                initial={{ x: 120, y: 120, opacity: 0 }}
                animate={isHovered ? { x: 75, y: 65, opacity: 1 } : { x: 120, y: 120, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute text-sm pointer-events-none z-10"
            >
                🖱️
            </motion.div>

            {/* Successful locked quote notification */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 120 }}
                className="absolute bottom-0 left-0 right-0 bg-emerald-600 border-t border-emerald-500 p-2 text-[8.5px] text-white flex items-center justify-between font-bold shadow-lg"
            >
                <span>✨ Locked Quote: ₹138.00</span>
                <span className="text-[7.5px] bg-white/20 px-1.5 rounded font-mono font-bold">
                    26.5% Margin
                </span>
            </motion.div>
        </div>
    );
}

// ============================================================================
// Core Problems Component Structure
// ============================================================================

interface ProblemItem {
    id: string;
    number: string;
    emoji: string;
    title: string;
    subtitle: string;
    description: string;
}

const problems: ProblemItem[] = [
    {
        id: "bom-pricing",
        number: "01",
        emoji: "🔴",
        title: "BOM & Pricing Complexity",
        subtitle: "Complex BOMs, Costs You Can't See.",
        description: "Multi-level BOMs managed by hand — no version control, no cost visibility. Without past POs, contracts, or market rates, target pricing becomes guesswork."
    },
    {
        id: "vendor-comm",
        number: "02",
        emoji: "🟡",
        title: "Vendor Communication",
        subtitle: " Sourcing runs on emails nobody tracks.",
        description: "RFQs over email, follow-ups unanswered, responses scattered across inboxes — days pass before bids land, and half the data is missing."
    },
    {
        id: "hidden-costs",
        number: "03",
        emoji: "🔵",
        title: "Hidden Costs",
        subtitle: " The cheapest bid is not always the cheapest purchase.",
        description: "Unit-price comparisons miss duty, freight, insurance, packaging. Award on the wrong number and the margin gap only surfaces after the PO ships."
    },
    {
        id: "manual-quoting",
        number: "04",
        emoji: "🟣",
        title: "Manual Quoting",
        subtitle: "A quote built on gut feel is a margin you're giving away.",
        description: "Numbers pulled from emails, markups in spreadsheets, BOMs rolled up by hand. One error costs the margin. One delay costs the deal."
    }
];

export default function ProblemSection() {
    const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scrollToSolution = (problemId: string) => {
        const problemToSolutionMap: Record<string, { id: string; step: number }> = {
            "bom-pricing": { id: "section-3-1", step: 1 },
            "vendor-comm": { id: "section-3-2", step: 2 },
            "hidden-costs": { id: "section-3-3", step: 3 },
            "manual-quoting": { id: "section-3-4", step: 4 }
        };
        const target = problemToSolutionMap[problemId];
        if (!target) return;

        // 1. Dispatch custom event to select the corresponding step
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('go-to-solution-step', { detail: { step: target.step } }));
        }

        // 2. Perform smooth scroll safely with ScrollSmoother compatibility
        const el = document.getElementById(target.id);
        if (el) {
            const smoother = (window as any).gsap?.plugins?.ScrollSmoother?.get?.() || (window as any).ScrollSmoother?.get?.();
            if (smoother) {
                smoother.scrollTo(el, true, "top 80px");
            } else {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            // Scroll a clean, tight distance corresponding to the compact cards
            const scrollDistance = 310;
            const scrollTo = direction === 'left' 
                ? scrollLeft - scrollDistance 
                : scrollLeft + scrollDistance;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const renderWidget = (problemId: string, isHovered: boolean) => {
        switch (problemId) {
            case "bom-pricing":
                return isHovered ? (
                    <PricingGuessworkWidget isHovered={isHovered} />
                ) : (
                    <BOMComplexityWidget isHovered={isHovered} />
                );
            case "vendor-comm":
                return <VendorCommWidget isHovered={isHovered} />;
            case "hidden-costs":
                return <HiddenCostsWidget isHovered={isHovered} />;
            case "manual-quoting":
                return <ManualQuotingWidget isHovered={isHovered} />;
            default:
                return null;
        }
    };

    return (
        <section className="py-16 md:py-20 bg-white relative overflow-hidden border-y border-slate-100 text-[#1A1D2E]">
            {/* Soft backdrop decorations */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6 relative z-10">

                {/* Header row with arrows */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
                        <div
                            className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-[11px] font-semibold text-[#3666ff] uppercase tracking-[0.12em] mb-6"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
                            Sourcing Vulnerabilities
                        </div>

                        <h2
                            style={{
                                fontSize: 'clamp(24px, 3.4vw, 48px)',
                                fontWeight: 600,
                                lineHeight: 1.15,
                                letterSpacing: '-0.03em',
                                color: '#0f172a',
                                margin: '0 0 24px',
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            Where Most Manufacturers <br />
                            <span className="text-[#3666ff]">Lose Time and Money.</span>
                        </h2>
                    </div>

                    {/* Desktop horizontal navigation arrows */}
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

                {/* Compact, Light-Themed horizontal visual card carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 pt-2 px-6 xl:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
                >
                    {problems.map((prob, idx) => (
                        <motion.div
                            key={prob.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                            whileHover={{
                                y: -6,
                                transition: { duration: 0.25, ease: "easeOut" }
                            }}
                            onMouseEnter={() => setHoveredCardId(prob.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                            onClick={() => scrollToSolution(prob.id)}
                            className={cn(
                                "group relative rounded-3xl bg-white border border-slate-200/60 p-4 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:border-[#3666ff]/20 cursor-pointer overflow-hidden w-[280px] min-w-[280px] sm:w-auto sm:min-w-[290px] xl:min-w-[310px] max-w-[325px] flex-shrink-0 snap-start h-[420px] sm:h-[470px] shadow-[0_12px_36px_-10px_rgba(15,23,42,0.12),_0_0_20px_rgba(54,102,255,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(54,102,255,0.18)]"
                            )}
                        >
                            {/* Hover color glow layer */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at top right, rgba(54, 102, 255, 0.02), transparent 70%)`
                                }}
                            />

                            {/* Card Content Top Section */}
                            <div className="flex flex-col gap-3 relative z-10 text-left">
                                {/* Heading Block */}
                                <h3 className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.015em] text-slate-800 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                                    {prob.subtitle}
                                </h3>

                                {/* Body Description */}
                                <p className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                    {prob.description}
                                </p>
                            </div>

                            {/* Interactive Inner Widget */}
                            <div className="my-3 relative z-10 w-full">
                                {renderWidget(prob.id, hoveredCardId === prob.id)}
                            </div>

                            {/* Card See Solution Transition Footer */}
                            <div className="pt-3 border-t border-slate-100 relative z-10">
                                <div className="relative h-5 overflow-hidden">
                                    {/* Default State — just the accent dot, right-aligned */}
                                    <div className="absolute inset-0 flex items-center justify-end transition-all duration-300 transform group-hover:-translate-y-full group-hover:opacity-0">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]/80" />
                                    </div>

                                    {/* Hover State: See Solution Button */}
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
