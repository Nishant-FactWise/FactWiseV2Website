'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search, TrendingUp, Globe, Database, DollarSign, Activity, BarChart3, Target } from 'lucide-react';

const CardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="p-5 border-b border-white/5 flex flex-col gap-1 bg-[#0d0d14]">
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c5cfc]">{title}</div>
    {subtitle && <div className="text-[11px] text-gray-500 font-medium">{subtitle}</div>}
  </div>
);

export const PriceSearchMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Unified Price Index" subtitle="Live Benchmarking Across 5,000+ Parts" />
    <div className="flex-1 p-6 space-y-6">
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4 group">
        <Search size={18} className="text-gray-500 group-hover:text-[#7c5cfc] transition-colors" />
        <div className="flex-1 h-4 bg-white/5 rounded-md relative overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />
          <span className="absolute left-0 top-0 text-[11px] text-gray-500 font-medium px-1">SN74AHC1G08DCKR</span>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { source: 'Digi-Key API', price: '₹0.842', tag: 'Market', color: 'text-orange-500' },
          { source: 'Factwise Global', price: '₹0.795', tag: 'Historical', color: 'text-[#7c5cfc]' },
          { source: 'Contract #882', price: '₹0.780', tag: 'Preferred', color: 'text-green-500' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center group hover:bg-white/[0.04] transition-all"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white mb-0.5">{item.source}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600">{item.tag} Source</span>
            </div>
            <div className="text-right">
              <div className={cn("text-lg font-mono font-bold", item.color)}>{item.price}</div>
              <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">INR / Unit</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const TrendsMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Historical Trend Analysis" subtitle="Item: XC7Z020-1CLG400C (6 Month View)" />
    <div className="flex-1 p-8 flex flex-col">
      <div className="flex-1 flex items-end gap-2 relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-px w-full bg-white/[0.03]" />)}
        </div>
        
        {[30, 45, 38, 55, 75, 60, 85, 70, 95, 80, 100, 90].map((h, i) => (
          <div key={i} className="flex-1 relative group h-full flex flex-col justify-end">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: "circOut" }}
              className="w-full bg-[#7c5cfc]/20 rounded-t-md group-hover:bg-[#7c5cfc] transition-all relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#7c5cfc] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg">
                ₹{(0.8 + h/1000).toFixed(3)}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between px-2 text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em]">
        <span>JAN 24</span>
        <span>MAR 24</span>
        <span>JUN 24</span>
      </div>
    </div>
    <div className="p-4 bg-white/[0.03] border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Activity size={14} className="text-green-500" />
        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Volatility: Low</span>
      </div>
      <div className="text-[10px] font-bold text-white uppercase tracking-widest">Forecast: <span className="text-[#7c5cfc]">Stable</span></div>
    </div>
  </div>
);

export const LandedCostAnalysisMockup = () => (
  <div className="w-full h-full flex flex-col bg-[#0d0d14]">
    <CardHeader title="Global Landed Comparison" subtitle="Total Cost Ownership: Supplier A vs B" />
    <div className="flex-1 p-8 space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[11px] font-bold text-white/60 uppercase tracking-widest">
          <span>Supplier A (Asia)</span>
          <span className="text-white">₹12.40 / unit</span>
        </div>
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex p-0.5">
          <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} className="h-full bg-[#7c5cfc] rounded-full" />
          <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-blue-500/40 mx-0.5 rounded-full" />
          <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} className="h-full bg-white/10 rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-[11px] font-bold text-white/60 uppercase tracking-widest">
          <span>Supplier B (Local)</span>
          <span className="text-white">₹14.10 / unit</span>
        </div>
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex p-0.5">
          <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-green-500 rounded-full" />
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Unit', color: 'bg-[#7c5cfc]' },
            { label: 'Logistics', color: 'bg-blue-500/40' },
            { label: 'Duties', color: 'bg-white/10' }
          ].map((legend, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", legend.color)} />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{legend.label}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center"
      >
        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Savings Opportunity</div>
        <div className="text-[12px] text-white font-medium">Switching to Supplier A saves <span className="text-green-500 font-bold">₹1.70 per unit</span> after all fees.</div>
      </motion.div>
    </div>
  </div>
);
