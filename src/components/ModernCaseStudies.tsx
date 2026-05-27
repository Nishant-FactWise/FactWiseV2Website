"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, TrendingUp, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import ScrollReveal from "./ui/ScrollReveal";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  category: string;
  company: string;
  logo: string;
  industry: string;
  title: string;
  metrics: Metric[];
  readTime: string;
  visual: React.ReactNode;
  color: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'customer-b',
    category: 'Manufacturing',
    company: 'Electronic Manufacturing',
    logo: 'EM',
    industry: 'Electronics manufacturing',
    title: 'Achieved 3% annual profit increase by automating multi-currency RfQs and sourcing workflows',
    metrics: [
      { label: 'Profit increase', value: '3%' },
      { label: 'Process speed', value: '3x' },
      { label: 'Cost saved', value: '$1.2M' },
    ],
    readTime: '8 min read',
    color: '#000000',
    visual: '/images/electrinic manufacturing.png'
  },
  {
    id: 'customer-c',
    category: 'Automotive Components',
    company: 'Automotive Components',
    logo: 'AC',
    industry: 'Automotive components',
    title: 'Enabled 18x ROI within the first year by automating complex landed cost calculations',
    metrics: [
      { label: 'ROI achieved', value: '18x' },
      { label: 'Accuracy', value: '99.9%' },
    ],
    readTime: '5 min read',
    color: '#000000',
    visual: '/images/industries/cs_automotive.png'
  },
  {
    id: 'customer-a',
    category: 'MRO',
    company: 'MRO',
    logo: 'MR',
    industry: 'Maintenance & Operations',
    title: 'Streamlined manual quoting workflows into a high-speed automated multi-currency process',
    metrics: [
      { label: 'Faster quoting', value: '4x' },
      { label: 'Error reduction', value: '95%' },
    ],
    readTime: '6 min read',
    color: '#000000',
    visual: '/images/industries/cs_mro.png'
  },
  {
    id: 'logi-flow',
    category: 'Chemicals',
    company: 'Chemicals',
    logo: 'CH',
    industry: 'Global Supply Chain',
    title: 'Reduced procurement cycle time by 60% with automated index based pricing',
    metrics: [
      { label: 'Cycle reduction', value: '60%' },
      { label: 'Cost savings', value: '22%' },
    ],
    readTime: '7 min read',
    color: '#000000',
    visual: '/images/pharmaceutical-factory-woman-worker-protective-clothing-operating-production-line-sterile-environment.jpg'
  }
];

const CATEGORIES = ['All', 'Manufacturing', 'Automotive Components', 'MRO', 'Chemicals'];

export default function ModernCaseStudies() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredStudies = activeTab === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === activeTab);

  return (
    <section className="relative w-full py-20 overflow-hidden scroll-mt-20" id="case-studies">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none opacity-40" 
        style={{ background: 'radial-gradient(circle, rgba(54, 102, 255, 0.1) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 pointer-events-none opacity-40" 
        style={{ background: 'radial-gradient(circle, rgba(73, 204, 249, 0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
              <span>Customer Success</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
              Proven Impact. <span className="text-[#3666ff]">Across Industries.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Discover how industry leaders leverage FactWise to automate complex workflows and drive measurable growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          {/* Filters — horizontally scrollable on mobile, wrap on desktop */}
          <ScrollReveal delay={0.2} className="w-full md:w-auto">
            <div className="flex gap-2 flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "shrink-0 whitespace-nowrap px-5 py-2.5 rounded-xl text-[11px] font-semibold transition-all border tracking-widest uppercase",
                    activeTab === cat
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600"
                  )}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* View all stories — hidden on mobile */}
          <ScrollReveal delay={0.3} className="hidden md:block">
            <button className="group flex items-center gap-3 p-1.5 pr-5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 transition-all duration-500 hover:bg-white hover:border-blue-300 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.1)] active:scale-95 whitespace-nowrap">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-blue-700 group-hover:scale-105 group-hover:rotate-[15deg]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900 tracking-tight">View all stories</div>
              </div>
            </button>
          </ScrollReveal>
        </div>
 
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[380px]">
          <AnimatePresence>
            {filteredStudies.map((study, index) => {
              const isOnly = filteredStudies.length === 1;
              const isLarge = (index % 4 === 0 || index % 4 === 3) && filteredStudies.length > 1;
              const isVertical = (index % 4 === 1 || index % 4 === 2) && filteredStudies.length > 1;
 
              return (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.06)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className={cn(
                    "group relative bg-white rounded-[32px] overflow-hidden border border-slate-200/60 flex flex-col will-change-transform transform-gpu shadow-sm hover:shadow-xl transition-shadow",
                    isOnly ? "md:col-span-3" : isLarge ? "md:col-span-2" : "md:col-span-1"
                  )}
                >
                  <div className={cn(
                    "flex flex-col h-full",
                    (isLarge || isOnly) ? "md:flex-row" : "flex-col"
                  )}>
                    {/* Image Area */}
                    <div className={cn(
                      "relative overflow-hidden shrink-0",
                      (isLarge || isOnly) ? "h-64 md:h-full md:w-1/2" : "h-32"
                    )}>
                      <img
                        src={study.visual as string}
                        alt={study.company}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-white/90 border border-white/20 text-blue-600 text-[10px] font-semibold tracking-widest uppercase backdrop-blur-md shadow-xl">
                          {study.category}
                        </span>
                      </div>
                    </div>
 
                    {/* Content Area */}
                    <div className={cn(
                      "flex-1 flex flex-col min-h-0 bg-white",
                      (isLarge || isOnly) ? "p-6 md:p-8" : "p-4 md:p-5"
                    )}>
                      {/* Top Info */}
                      <div className="mb-4">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-bold text-[11px] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-blue-100 group-hover:bg-blue-50/30">
                            {study.logo}
                          </div>
                          <div>
                            <h4 className="text-slate-900 font-semibold text-[15px] leading-none">{study.company}</h4>
                          </div>
                        </div>
                        <h3 className={cn(
                          "font-bold text-slate-900 leading-[1.3] transition-colors duration-300 group-hover:text-blue-600",
                          (isLarge || isOnly) ? "text-xl md:text-2xl" : "text-[15px] line-clamp-2"
                        )} style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                          {study.title}
                        </h3>
                      </div>
                      
                      {/* Metrics & Footer */}
                      <div className="mt-auto pt-4 border-t border-slate-50">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {study.metrics.slice(0, (isLarge || isOnly) ? 3 : 2).map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <div className="text-[#3666ff] font-extrabold text-[14px] lg:text-[16px] tracking-tight">{m.value}</div>
                              <div className="text-slate-400 text-[8px] uppercase tracking-wider font-bold">{m.label}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-400 text-[9px] font-medium">
                            <Clock className="w-3 h-3" />
                            {study.readTime}
                          </div>
                          <div className="group/btn flex items-center gap-1.5 text-blue-600 font-bold text-[9px] uppercase tracking-wider cursor-pointer">
                            <span>Full Story</span>
                            <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600">
                              <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
