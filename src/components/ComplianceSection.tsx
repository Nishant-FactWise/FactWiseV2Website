'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Shield, List, Users, Database } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

export default function ComplianceSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cards = [
    {
      title: "DPDP Compliant",
      description: "India's Digital Personal Data Protection Act compliant. Secure handling of supplier data, consent tracking, and data localization by design.",
      icon: <ShieldCheck className="size-5" />,
      pillLabel: "Active",
      pillColor: "text-emerald-400",
      pillBg: "bg-emerald-400/10",
      pillBorder: "border-emerald-400/20"
    },
    {
      title: "SOC 2 Type II",
      description: "Enterprise-grade security posture for your procurement data. We maintain strict controls to ensure your sensitive business information remains secure.",
      icon: <Lock className="size-5" />,
      pillLabel: "Certified",
      pillColor: "text-blue-400",
      pillBg: "bg-blue-400/10",
      pillBorder: "border-blue-400/20"
    },
    {
      title: "GDPR Ready",
      description: "For companies managing global supply chains. Built-in workflows for data processing agreements, right to erasure, and consent management.",
      icon: <Shield className="size-5" />,
      pillLabel: "Compliant",
      pillColor: "text-emerald-400",
      pillBg: "bg-emerald-400/10",
      pillBorder: "border-emerald-400/20"
    },
    {
      title: "Immutable Audit Log",
      description: "Every PO, invoice approval, supplier bid, and data access is timestamped and locked. Full traceability for finance and procurement audits.",
      icon: <List className="size-5" />,
      pillLabel: "Always on",
      pillColor: "text-emerald-400",
      pillBg: "bg-emerald-400/10",
      pillBorder: "border-emerald-400/20"
    },
    {
      title: "Role-Based Access",
      description: "Granular permission layers ensure only authorized personnel can approve requisitions, release POs, or access sensitive pricing data.",
      icon: <Users className="size-5" />,
      pillLabel: "By design",
      pillColor: "text-blue-400",
      pillBg: "bg-blue-400/10",
      pillBorder: "border-blue-400/20"
    },
    {
      title: "Data Sovereignty",
      description: "You own your procurement data. Flexible export options ensure you are never locked in, with clear data isolation across tenants.",
      icon: <Database className="size-5" />,
      pillLabel: "Guaranteed",
      pillColor: "text-emerald-400",
      pillBg: "bg-emerald-400/10",
      pillBorder: "border-emerald-400/20"
    }
  ];

  return (
    <section className="relative pt-24 pb-40 bg-white text-[#1A1D2E] overflow-hidden">
      {/* Background glow effects */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{ 
          background: 'radial-gradient(circle, rgba(54, 102, 255, 0.15) 0%, transparent 70%)',
        }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{ 
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        }} 
      />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        
        <ScrollReveal delay={0.1}>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Compliance + Trust
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-display)' }}>
            Compliance isn't a feature<br />
            <span className="text-[#3666ff]">you turn on.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mb-16 font-medium">
            It's how FactWise was built. Enterprise procurement, CISOs, and data protection officers can relax.
          </p>
        </ScrollReveal>

        {/* 6-column grid to match the screenshot exactly */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.5, ease: "easeOut" }}
              className="relative"
              onMouseEnter={() => setHoveredIdx(idx)}
            >
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="complHighlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
                    className="absolute -inset-2 rounded-[18px] border-[1.5px] border-[#3666ff]/40 pointer-events-none hidden md:block"
                    style={{
                      background: 'linear-gradient(140deg, rgba(54,102,255,0.14) 0%, rgba(54,102,255,0.08) 45%, rgba(6,182,212,0.08) 100%)',
                      boxShadow: '0 0 24px rgba(54,102,255,0.12)',
                      zIndex: 0
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="bg-white border border-[#E2E5F0] rounded-2xl p-5 flex flex-col h-full transition-colors duration-300 shadow-sm group relative z-10">
                {/* On hover, the card's background slightly darkens and border faintly glows, simulating the HR ops effect */}
                <div className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:bg-[#eef3ff] group-hover:border-[#3666ff]/40 group-hover:shadow-[0_0_20px_rgba(54,102,255,0.12)] pointer-events-none"></div>

                <div className="relative z-10 w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_0_12px_rgba(54,102,255,0.15)]">
                  <div className="text-[#3666ff]">
                    {card.icon}
                  </div>
                </div>
                
                <h4 className="relative z-10 text-[15px] font-bold text-[#1A1D2E] mb-3 tracking-tight transition-colors duration-250" style={{ fontFamily: 'var(--font-display)' }}>
                  {card.title}
                </h4>
                
                <p className="relative z-10 text-[#7B82A8] text-[12px] leading-relaxed mb-6 flex-grow transition-colors duration-250">
                  {card.description}
                </p>
                
                <div className="relative z-10 mt-auto">
                  <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full border ${card.pillColor.replace('text-', 'text-emerald-600').replace('text-blue-400', 'text-blue-600')} ${card.pillBg.replace('/10', '/30')} ${card.pillBorder} transition-all duration-250 group-hover:shadow-sm`}>
                    {card.pillLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
