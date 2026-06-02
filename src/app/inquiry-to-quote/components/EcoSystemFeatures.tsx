'use client';

import * as React from "react"
import { useState } from "react"
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
    CheckCircle2, 
    ShieldCheck, 
    ChevronRight, 
    Sparkles, 
    Download,
    Layers,
    Shuffle,
    TrendingUp,
    Send,
    FileText
} from 'lucide-react'

// Define pricing types and dummy data for interactive dashboard
interface VendorData {
    name: string;
    code: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    landedBomCost: number;
    terms: string;
    mcuBid: number;
    pcbBid: number | "not invited";
    labourBid: number | "not invited";
    freight: number;
    duty: number;
    insurance: number;
}

const vendors: Record<string, VendorData> = {
    VendorA: {
        name: "Vendor A",
        code: "A",
        colorClass: "bg-[#1F8F5C] text-white",
        bgClass: "bg-[#E6F5EC]",
        borderClass: "border-[#C9E8D7]",
        landedBomCost: 38420,
        terms: "INR · N60 · 10d",
        mcuBid: 7.85,
        pcbBid: 3.05,
        labourBid: 1.79,
        freight: 1840,
        duty: 910,
        insurance: 280,
    },
    VendorB: {
        name: "Vendor B",
        code: "B",
        colorClass: "bg-[#B8860B] text-white",
        bgClass: "bg-[#FFF4D6]",
        borderClass: "border-[#F0E0AF]",
        landedBomCost: 40120,
        terms: "INR · N60 · 12d",
        mcuBid: 8.10,
        pcbBid: 2.92,
        labourBid: 1.95,
        freight: 1980,
        duty: 950,
        insurance: 300,
    },
    VendorC: {
        name: "Vendor C",
        code: "C",
        colorClass: "bg-[#2B59FF] text-white",
        bgClass: "bg-[#EEF2FF]",
        borderClass: "border-[#DCE3FF]",
        landedBomCost: 41920,
        terms: "INR · N30 · 14d",
        mcuBid: 8.42,
        pcbBid: "not invited",
        labourBid: 2.10,
        freight: 2100,
        duty: 1020,
        insurance: 320,
    },
    VendorD: {
        name: "Vendor D",
        code: "D",
        colorClass: "bg-[#7B3FA8] text-white",
        bgClass: "bg-[#F3E8FF]",
        borderClass: "border-[#E9D5FF]",
        landedBomCost: 42800,
        terms: "INR · N30 · 9d",
        mcuBid: 8.55,
        pcbBid: 3.20,
        labourBid: "not invited",
        freight: 2200,
        duty: 1050,
        insurance: 340,
    }
};

export default function EcoSystemFeatures() {
    // Sourcing state variables
    const [selectedVendor, setSelectedVendor] = useState<string>("VendorA")
    const [viewMode, setViewMode] = useState<"perItem" | "allItems">("perItem")
    const [markup, setMarkup] = useState<number>(34) // markup % from 10% to 60%

    // Dynamic computations
    const activeVendor = vendors[selectedVendor] || vendors.VendorA
    const assemblyOverhead = 8528
    const baseCost = activeVendor.landedBomCost + assemblyOverhead
    const markupAmount = Math.round(baseCost * (markup / 100))
    const quoteTotal = baseCost + markupAmount
    const lockedMarginPercent = parseFloat((((quoteTotal - activeVendor.landedBomCost) / quoteTotal) * 100).toFixed(1))
    
    // Margin target is 26%. Check if exceeded
    const isTargetMet = lockedMarginPercent >= 26.0

    return (
        <section id="solutions-dashboard" className="py-4 lg:py-6 bg-white relative overflow-hidden text-[#1A1D2E] min-h-screen lg:h-screen lg:min-h-0 lg:max-h-[800px] xl:max-h-[850px] flex flex-col justify-between">
            {/* Ambient background glows */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-50 -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-50 -z-10 animate-pulse" />
            
            <div className="mx-auto max-w-[1240px] px-6 relative z-10 w-full flex flex-col justify-between h-full gap-2 lg:gap-3">
                
                {/* Header Grid: Compact, low-margin */}
                <div className="grid items-center gap-2 md:grid-cols-2 md:gap-8 mb-0.5">
                    <h2 className="text-lg md:text-xl font-bold tracking-tight text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>
                        The FactWise ecosystem <br />
                        <span className="text-[#3666ff]">brings together our models</span>
                    </h2>
                    <p className="max-w-sm sm:ml-auto text-slate-500 text-[10.5px] font-medium leading-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                        Empower your team with workflows that adapt to your needs, whether you prefer automated bidding or AI-driven vendor normalization.
                    </p>
                </div>

                {/* Dashboard Frame Container: Sleek, compact border */}
                <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.01)] w-full">
                    
                    {/* Floating Annotations: Smaller, out of the way */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: [0, -4, 0] }}
                        transition={{ 
                            opacity: { duration: 0.5 },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute hidden xl:flex top-8 -left-6 z-30 bg-white border border-slate-200 rounded-xl p-1.5 shadow-md items-center gap-1.5 min-w-[140px]"
                    >
                        <div className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Layers className="size-3" />
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-slate-900 leading-none">BOM Priced</div>
                            <div className="text-[7.5px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">142 lines</div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: [0, -4, 0] }}
                        transition={{ 
                            opacity: { duration: 0.5, delay: 1.5 },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                        }}
                        className="absolute hidden xl:flex bottom-16 -right-6 z-30 bg-white border border-slate-200 rounded-xl p-1.5 shadow-md items-center gap-1.5 min-w-[140px]"
                    >
                        <div className="h-6 w-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="size-3" />
                        </div>
                        <div>
                            <div className="text-[9px] font-bold text-slate-900 leading-none">Best Landed Cost</div>
                            <div className="text-[7.5px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">-₹3,710 vs PO</div>
                        </div>
                    </motion.div>

                    {/* Sourcing Dashboard: Compact padding & sizes */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-[0_15px_40px_-15px_rgba(11,15,20,0.06)] overflow-hidden">
                        
                        {/* Chrome bar: tight */}
                        <div className="flex items-center justify-between gap-6 px-3 py-1 bg-slate-50 border-b border-slate-200">
                            <div className="flex gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#E8C5B8]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#E8DDB8]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#BFD9C5]" />
                            </div>
                            <div className="flex-1 max-w-[280px] mx-auto text-[9px] font-mono text-slate-400 bg-white border border-slate-200 rounded py-0.2 px-2 flex items-center gap-1 justify-center shadow-xs">
                                <ShieldCheck className="size-2.5 text-emerald-500 shrink-0" />
                                <span>app.factwise.io / quotes / Q-20418</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                                <span>P. Iyer · Sourcing</span>
                                <span className="h-4.5 w-4.5 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center shrink-0">PI</span>
                            </div>
                        </div>

                        {/* Workspace Header: streamlined height */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-1.5 border-b border-slate-100 gap-1">
                            <div>
                                <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                    <span>Quotes</span>
                                    <span className="text-slate-300">/</span>
                                    <span>Inquiry</span>
                                    <span className="text-slate-300">/</span>
                                    <span className="text-slate-700 font-semibold">Q-20418</span>
                                </div>
                                <h3 className="text-xs md:text-sm font-bold text-[#1A1D2E] tracking-tight mt-0.5">
                                    Industrial PCB · VendorC Manufacturing
                                </h3>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px]">
                                <span className="font-mono text-slate-500 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.2">
                                     बेंगलुरु · DAP Bengaluru
                                </span>
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#E6F5EC] border border-[#C9E8D7] text-[#1F8F5C] text-[8px] font-bold uppercase tracking-wider">
                                    <span className="h-1 w-1 rounded-full bg-[#1F8F5C] animate-ping" />
                                    Live
                                </span>
                            </div>
                        </div>

                        {/* Stats strip: smaller vertical space */}
                        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 divide-x divide-slate-200 text-left">
                            <div className="p-1.5 px-4 flex flex-col">
                                <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Landed BOM</span>
                                <span className="text-sm font-bold text-slate-900 font-serif">${activeVendor.landedBomCost.toLocaleString()}</span>
                            </div>
                            <div className="p-1.5 px-4 flex flex-col">
                                <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Margin locked</span>
                                <span className="text-sm font-bold text-slate-900 font-serif">{lockedMarginPercent}%</span>
                            </div>
                            <div className="p-1.5 px-4 flex flex-col">
                                <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Customer Quote</span>
                                <span className="text-sm font-bold text-blue-600 font-serif">${quoteTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Two Zone Body: Bids Left (70%), Quote Calculator Right (30%) */}
                        <div className="grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                            
                            {/* LEFT ZONE: Bid comparison table (Tight columns) */}
                            <div className="lg:col-span-7 p-3 flex flex-col gap-2 justify-between">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-[10.5px] font-semibold text-slate-900">Vendor Bids · landed cost</h4>
                                    </div>
                                    <div className="flex gap-0.5 bg-slate-100 p-0.2 rounded">
                                        <button 
                                            onClick={() => setViewMode("perItem")}
                                            className={cn("px-1.5 py-0.2 text-[8px] font-bold rounded cursor-pointer transition-all", viewMode === "perItem" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400 hover:text-slate-600")}
                                        >
                                            Per Item
                                        </button>
                                        <button 
                                            onClick={() => setViewMode("allItems")}
                                            className={cn("px-1.5 py-0.2 text-[8px] font-bold rounded cursor-pointer transition-all", viewMode === "allItems" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400 hover:text-slate-600")}
                                        >
                                            All Items
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto w-full">
                                    <table className="w-full text-left border-collapse text-[10px]">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="pb-1 text-[8px] font-mono text-slate-400 uppercase font-semibold">Line Item</th>
                                                {Object.keys(vendors).map(vKey => {
                                                    const v = vendors[vKey]
                                                    return (
                                                        <th 
                                                            key={vKey} 
                                                            onClick={() => setSelectedVendor(vKey)}
                                                            className="pb-1 text-right cursor-pointer select-none px-1 transition-all shrink-0 min-w-[65px]"
                                                        >
                                                            <div className="inline-flex flex-col items-end">
                                                                <span className={cn(
                                                                    "flex items-center gap-1 font-bold text-slate-700 rounded px-1 py-0.2 transition-colors text-[9px]",
                                                                    selectedVendor === vKey ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100" : "hover:bg-slate-100"
                                                                )}>
                                                                    <span className={cn("size-3 rounded-[3px] text-[7.5px] font-bold flex items-center justify-center shrink-0", v.colorClass)}>
                                                                        {v.code}
                                                                    </span>
                                                                    {v.name}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {/* MCU Row */}
                                            <tr className="transition-colors hover:bg-slate-50/40">
                                                <td className="py-1">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-800 text-[10px]">STM32F407VGT6 · MCU</span>
                                                        <span className="text-[8.5px] text-slate-400 font-mono">×500 boards</span>
                                                    </div>
                                                </td>
                                                {Object.keys(vendors).map(vKey => {
                                                    const v = vendors[vKey]
                                                    const isBest = vKey === "VendorA"
                                                    const displayVal = viewMode === "perItem" ? `$${v.mcuBid.toFixed(2)}` : `$${(v.mcuBid * 500).toLocaleString()}`
                                                    return (
                                                        <td 
                                                            key={vKey}
                                                            onClick={() => setSelectedVendor(vKey)}
                                                            className={cn(
                                                                "py-1 text-right px-1 font-mono cursor-pointer transition-colors relative", 
                                                                isBest ? "bg-emerald-50/30 text-emerald-700" : "",
                                                                selectedVendor === vKey ? "border-x border-blue-50 bg-blue-50/10" : ""
                                                            )}
                                                        >
                                                            <span className="block font-bold">
                                                                {isBest && <span className="mr-0.5 text-[8.5px]">✓</span>}
                                                                {displayVal}
                                                            </span>
                                                            <span className="text-[7.5px] text-slate-400 block -mt-0.5">
                                                                {isBest ? "−1.9%" : vKey === "VendorB" ? "+1.3%" : vKey === "VendorC" ? "+5.3%" : "+6.9%"}
                                                            </span>
                                                        </td>
                                                    )
                                                })}
                                            </tr>

                                            {/* PCB Row */}
                                            <tr className="transition-colors hover:bg-slate-50/40">
                                                <td className="py-1">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-800 text-[10px]">PCB · 4-layer 100×80</span>
                                                        <span className="text-[8.5px] text-slate-400 font-mono">×500 boards</span>
                                                    </div>
                                                </td>
                                                {Object.keys(vendors).map(vKey => {
                                                    const v = vendors[vKey]
                                                    const isBest = vKey === "VendorB"
                                                    const displayVal = v.pcbBid === "not invited" 
                                                        ? "not invited" 
                                                        : viewMode === "perItem" 
                                                            ? `$${v.pcbBid.toFixed(2)}` 
                                                            : `$${(v.pcbBid * 500).toLocaleString()}`
                                                    return (
                                                        <td 
                                                            key={vKey}
                                                            onClick={() => setSelectedVendor(vKey)}
                                                            className={cn(
                                                                "py-1 text-right px-1 cursor-pointer transition-colors",
                                                                isBest ? "bg-emerald-50/30 text-emerald-700" : "",
                                                                v.pcbBid === "not invited" ? "text-slate-400 italic font-sans text-[9px]" : "font-mono",
                                                                selectedVendor === vKey ? "border-x border-blue-50 bg-blue-50/10" : ""
                                                            )}
                                                        >
                                                            {v.pcbBid === "not invited" ? (
                                                                <span>N/A</span>
                                                            ) : (
                                                                <>
                                                                    <span className="block font-bold">
                                                                        {isBest && <span className="mr-0.5 text-[8.5px]">✓</span>}
                                                                        {displayVal}
                                                                    </span>
                                                                    <span className="text-[7.5px] text-slate-400 block -mt-0.5">
                                                                        {vKey === "VendorA" ? "+1.7%" : isBest ? "−2.7%" : "+6.7%"}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>

                                            {/* Labour Row */}
                                            <tr className="transition-colors hover:bg-slate-50/40">
                                                <td className="py-1">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-800 text-[10px]">Assembly labour</span>
                                                        <span className="text-[8.5px] text-slate-400 font-mono">×500 boards</span>
                                                    </div>
                                                </td>
                                                {Object.keys(vendors).map(vKey => {
                                                    const v = vendors[vKey]
                                                    const isBest = vKey === "VendorA"
                                                    const displayVal = v.labourBid === "not invited"
                                                        ? "not invited"
                                                        : viewMode === "perItem"
                                                            ? `$${v.labourBid.toFixed(2)}`
                                                            : `$${(v.labourBid * 500).toLocaleString()}`
                                                    return (
                                                        <td 
                                                            key={vKey}
                                                            onClick={() => setSelectedVendor(vKey)}
                                                            className={cn(
                                                                "py-1 text-right px-1 cursor-pointer transition-colors",
                                                                isBest ? "bg-emerald-50/30 text-emerald-700" : "",
                                                                v.labourBid === "not invited" ? "text-slate-400 italic font-sans text-[9px]" : "font-mono",
                                                                selectedVendor === vKey ? "border-x border-blue-50 bg-blue-50/10" : ""
                                                            )}
                                                        >
                                                            {v.labourBid === "not invited" ? (
                                                                <span>N/A</span>
                                                            ) : (
                                                                <>
                                                                    <span className="block font-bold">
                                                                        {isBest && <span className="mr-0.5 text-[8.5px]">✓</span>}
                                                                        {displayVal}
                                                                    </span>
                                                                    <span className="text-[7.5px] text-slate-400 block -mt-0.5">
                                                                        {isBest ? "−10.5%" : vKey === "VendorB" ? "−2.5%" : "+5.0%"}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr className="border-t border-slate-900">
                                                <td className="py-1.5 font-bold text-slate-800">
                                                    Landed Total
                                                </td>
                                                {Object.keys(vendors).map(vKey => {
                                                    const v = vendors[vKey]
                                                    const isBest = vKey === "VendorA"
                                                    return (
                                                        <td 
                                                            key={vKey}
                                                            onClick={() => setSelectedVendor(vKey)}
                                                            className={cn(
                                                                "py-1.5 text-right px-1 font-mono font-bold cursor-pointer transition-colors",
                                                                isBest ? "bg-emerald-50/30 text-[#1F8F5C]" : "text-slate-950",
                                                                selectedVendor === vKey ? "border-x border-blue-50 bg-blue-50/10" : ""
                                                            )}
                                                        >
                                                            <span className="block text-[10px] font-bold">${v.landedBomCost.toLocaleString()}</span>
                                                            <span className="text-[7.5px] font-medium text-slate-400 block mt-0.2">
                                                                {isBest ? "best" : vKey === "VendorB" ? "FX 83.2" : vKey === "VendorC" ? "+₹3,710" : "partial"}
                                                            </span>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center text-[9px] font-mono text-slate-500">
                                    <div className="flex flex-wrap gap-x-1.5 gap-y-0.2">
                                        <span>Unit <b className="text-slate-800">${(activeVendor.landedBomCost - activeVendor.freight - activeVendor.duty - activeVendor.insurance).toLocaleString()}</b></span>
                                        <span className="text-slate-300">•</span>
                                        <span>Freight <b className="text-slate-800">${activeVendor.freight}</b></span>
                                        <span className="text-slate-300">•</span>
                                        <span>Duty <b className="text-slate-800">${activeVendor.duty}</b></span>
                                        <span className="text-slate-300">•</span>
                                        <span>Ins. <b className="text-slate-800">${activeVendor.insurance}</b></span>
                                    </div>
                                    <span className="font-bold text-emerald-600 shrink-0 ml-1">
                                        = ${activeVendor.landedBomCost.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* RIGHT ZONE: Quote summary panel (Extremely compact) */}
                            <div className="lg:col-span-3 p-3 bg-slate-50/60 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col gap-2 justify-between">
                                <div className="flex items-center justify-between text-[9px]">
                                    <h4 className="font-bold text-slate-900 uppercase tracking-wider">Customer Quote</h4>
                                    <span className="font-mono text-slate-400 bg-white border border-slate-200 rounded px-1 py-0.2 shadow-xs">Q-20418</span>
                                </div>

                                {/* Compact quote summary details */}
                                <div className="bg-white border border-slate-200 rounded-lg p-2 flex flex-col gap-1 shadow-sm text-[10px]">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Landed BOM</span>
                                        <span className="font-mono font-medium text-slate-700">${activeVendor.landedBomCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-1">
                                        <span className="text-slate-400">Markup ({markup}%)</span>
                                        <span className="font-mono font-bold text-blue-600">+${markupAmount.toLocaleString()}</span>
                                    </div>
                                    
                                    {/* HTML markup slider */}
                                    <div className="flex flex-col gap-0.5 mt-0.5">
                                        <input 
                                            type="range" 
                                            min="10" 
                                            max="60" 
                                            value={markup}
                                            onChange={(e) => setMarkup(parseInt(e.target.value))}
                                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex justify-between items-baseline pt-0.5 border-t border-slate-200 mt-0.5">
                                        <span className="font-bold text-slate-900 text-[10px]">Quote Total</span>
                                        <span className="text-xs font-bold text-slate-900 font-serif">${quoteTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Margin locked gauge */}
                                <div className="bg-[#0B0F14] text-white rounded-lg p-2 relative overflow-hidden shadow-md">
                                    <div className="absolute -top-6 -right-6 w-14 h-14 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
                                    
                                    <span className="text-[7px] font-mono text-white/50 uppercase tracking-widest font-semibold block leading-none">Locked Margin</span>
                                    <div className="text-lg font-bold font-serif mt-0.5 leading-none">
                                        {lockedMarginPercent}<span className="text-[9px] text-white/60 font-mono font-medium ml-0.5">%</span>
                                    </div>
                                    
                                    {/* Minimal progress bar */}
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-1.5 relative">
                                        <div 
                                            className={cn("h-full rounded-full transition-all duration-300 bg-gradient-to-r", isTargetMet ? "from-blue-600 to-emerald-500" : "from-amber-600 to-amber-400")}
                                            style={{ width: `${Math.min(100, Math.max(0, (lockedMarginPercent / 60) * 100))}%` }}
                                        />
                                        <span className="absolute top-0 bottom-0 w-px bg-white/50 left-[43.3%]" title="Target 26%" />
                                    </div>
                                </div>

                                {/* Minimal Recommendation */}
                                <div className="bg-indigo-50/80 border border-indigo-100 text-indigo-900 rounded p-1.5 text-[9px] leading-tight flex gap-1">
                                    <Sparkles className="size-2.5 text-indigo-600 shrink-0 mt-0.5 animate-pulse" />
                                    <div>
                                        <span className="font-bold">Rec:</span> Award 60/40 to VendorA + VendorB. Holds margin and de‑risks allocation.
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-1 text-[9px] pt-0.5">
                                    <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[9px] font-semibold py-1 h-7 flex items-center justify-center gap-1 cursor-pointer">
                                        Send Quote
                                        <Send className="size-2" />
                                    </Button>
                                    <Button variant="outline" className="px-1.5 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shrink-0 h-7 py-1 cursor-pointer" title="Export PDF">
                                        <Download className="size-2.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 4 Feature Cards Below Dashboard: Extremely compact horizontal cards in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1180px] mx-auto px-1 pt-2 border-t border-slate-100 w-full mt-1">
                    
                    {/* Card 1 */}
                    <div className="flex items-start gap-2.5 group text-left">
                        <div className="relative w-6.5 h-6.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 transition-all duration-300 mt-0.5">
                            <Layers className="size-[12px]" />
                            <div className="absolute -inset-1 rounded-[10px] border border-dashed border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">01 · BOM info</span>
                            <h3 className="text-[11px] font-bold text-slate-950 leading-tight">Price every part before RFQ.</h3>
                            <p className="text-[9.5px] text-slate-400 leading-snug font-medium">See should‑cost from contracts & distributor feeds instantly.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex items-start gap-2.5 group text-left">
                        <div className="relative w-6.5 h-6.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 transition-all duration-300 mt-0.5">
                            <Shuffle className="size-[12px]" />
                            <div className="absolute -inset-1 rounded-[10px] border border-dashed border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">02 · Sourcing</span>
                            <h3 className="text-[11px] font-bold text-slate-950 leading-tight">Vendors respond instantly.</h3>
                            <p className="text-[9.5px] text-slate-400 leading-snug font-medium">Pre-fill targets and run automated negotiation rounds.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex items-start gap-2.5 group text-left">
                        <div className="relative w-6.5 h-6.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 transition-all duration-300 mt-0.5">
                            <TrendingUp className="size-[12px]" />
                            <div className="absolute -inset-1 rounded-[10px] border border-dashed border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">03 · Landed Analytics</span>
                            <h3 className="text-[11px] font-bold text-slate-950 leading-tight">Cheapest landed-cost formulas.</h3>
                            <p className="text-[9.5px] text-slate-400 leading-snug font-medium">Duties, freight, insurance, and FX normalized to your currency.</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="flex items-start gap-2.5 group text-left">
                        <div className="relative w-6.5 h-6.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 transition-all duration-300 mt-0.5">
                            <FileText className="size-[12px]" />
                            <div className="absolute -inset-1 rounded-[10px] border border-dashed border-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">04 · 1-Click Quote</span>
                            <h3 className="text-[11px] font-bold text-slate-950 leading-tight">Bids to quote in 1 click.</h3>
                            <p className="text-[9.5px] text-slate-400 leading-snug font-medium">Roll up BOM, overhead, and margin into client‑ready quote.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
