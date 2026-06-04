'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, DollarSign, Users, Award, ShieldCheck, Zap } from 'lucide-react';

const CardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="p-5 border-b border-white/5 flex flex-col gap-1">
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c5cfc]">{title}</div>
    {subtitle && <div className="text-[11px] text-gray-500 font-medium">{subtitle}</div>}
  </div>
);

export const MultiRoundMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Round 3: Live Negotiation" subtitle="RFQ-2024-008: Semiconductor Batch B" />
    <div className="flex-1 p-5 space-y-4">
      {[
        { name: 'Global Tech', bid: 1.24, prev: 1.35, status: 'Active', trend: 'down' },
        { name: 'Apex Electronics', bid: 1.28, prev: 1.30, status: 'Countered', trend: 'down' },
        { name: 'Core Micro', bid: 1.42, prev: 1.42, status: 'Hold', trend: 'stable' }
      ].map((supplier, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7c5cfc]/10 flex items-center justify-center text-[#7c5cfc] text-[10px] font-bold border border-[#7c5cfc]/20">
              {supplier.name[0]}
            </div>
            <div>
              <div className="text-xs font-bold text-white mb-0.5">{supplier.name}</div>
              <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{supplier.status}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-lg font-mono font-bold text-white">₹{supplier.bid}</span>
              {supplier.trend === 'down' && <TrendingDown size={14} className="text-green-500" />}
            </div>
            <div className="text-[10px] text-gray-600">Was ₹{supplier.prev}</div>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="p-4 bg-[#7c5cfc]/5 border-t border-[#7c5cfc]/20 flex justify-between items-center">
      <div className="text-[10px] text-gray-400 font-medium">Avg. Bid Reduction: <span className="text-green-500 font-bold">12.4%</span></div>
      <div className="px-3 py-1 rounded-full bg-[#7c5cfc] text-white text-[9px] font-bold cursor-pointer hover:scale-105 transition-transform">Counter All</div>
    </div>
  </div>
);

export const BOMMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="BOM Roll-up: Smart Controller" subtitle="12 Line Items | Total Landed Cost Analysis" />
    <div className="flex-1 p-5 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative space-y-3">
        {[
          { part: 'MCU-X88', qty: 1000, price: 4.50, cost: 4500, match: 98 },
          { part: 'PWR-CAP-22', qty: 5000, price: 0.12, cost: 600, match: 100 },
          { part: 'BT-MOD-V5', qty: 1000, price: 2.10, cost: 2100, match: 45 }
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/80">{item.part}</span>
              <span className="text-[9px] font-mono text-gray-500">{item.qty} units</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.match}%` }}
                  className={cn(
                    "h-full rounded-full",
                    item.match > 90 ? "bg-green-500" : "bg-yellow-500"
                  )}
                />
              </div>
              <span className="text-[10px] font-bold text-white">₹{item.price}</span>
            </div>
          </div>
        ))}
      </div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#7c5cfc] to-[#4b8bff] text-white shadow-xl"
      >
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Total BOM Cost</div>
        <div className="text-2xl font-mono font-bold">₹7,200.00</div>
      </motion.div>
    </div>
  </div>
);

export const LandedCostMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Landed Cost Modeling" subtitle="Comparing EXW vs. DDP Proposals" />
    <div className="flex-1 p-6 space-y-8">
      <div className="relative">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Global Logistics A</span>
            <span className="text-[9px] text-gray-500 font-bold uppercase">EXW + Freight + Duty</span>
          </div>
          <span className="text-xl font-mono font-bold text-[#7c5cfc]">₹14.22</span>
        </div>
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="bg-[#7c5cfc]" />
          <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="bg-blue-500 opacity-60" />
          <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} className="bg-white/20" />
        </div>
        <div className="mt-2 flex gap-4 text-[8px] font-bold uppercase tracking-widest text-gray-600">
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc]" /> Unit Price</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Logistics</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Duties</div>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Supplier Express B</span>
            <span className="text-[9px] text-gray-500 font-bold uppercase">All-in DDP Rate</span>
          </div>
          <span className="text-xl font-mono font-bold text-green-500">₹13.85</span>
        </div>
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="bg-green-500" />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
        <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Recommended Choice</div>
        <div className="text-[11px] text-green-500/80 mt-1">Supplier B is <span className="font-bold">2.6% more efficient</span> overall.</div>
      </div>
    </div>
  </div>
);

export const SplitMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="N-Vendor Split Recommendation" subtitle="Risk Mitigation vs. Cost Optimization" />
    <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
      <div className="relative w-40 h-40 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <motion.circle 
            cx="50" cy="50" r="40" 
            stroke="currentColor" strokeWidth="8" fill="transparent"
            className="text-white/5"
          />
          <motion.circle 
            cx="50" cy="50" r="40" 
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 * (1 - 0.7) }}
            className="text-[#7c5cfc]"
          />
          <motion.circle 
            cx="50" cy="50" r="40" 
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 * (1 - 0.3) }}
            className="text-blue-500"
            style={{ rotate: '252deg' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">70/30</span>
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Ratio</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Primary</div>
          <div className="text-sm font-bold text-[#7c5cfc]">Vendor A</div>
          <div className="text-[9px] text-gray-600">7,000 Units</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Secondary</div>
          <div className="text-sm font-bold text-blue-500">Vendor B</div>
          <div className="text-[9px] text-gray-600">3,000 Units</div>
        </div>
      </div>
    </div>
  </div>
);
