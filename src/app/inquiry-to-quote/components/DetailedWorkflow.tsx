"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, FileCheck, CreditCard, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Supplier Normalization",
    desc: "FactWise automatically maps different vendor formats into a single, unified view for apples-to-apples comparison.",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Bid Leveling",
    desc: "Calculate landed costs instantly, including duties, freight, and insurance, to reveal the true lowest cost.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Audit-Ready Awarding",
    desc: "Capture the entire decision-making process. Enforce compliance with pre-defined approval hierarchies.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Automated PO Issue",
    desc: "Convert awarded bids into formal Purchase Orders with one click. Send via EDI, API, or Email automatically.",
  }
];

export default function DetailedWorkflow() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise opacity-[0.03]" />

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <div
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Operational Excellence
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1D2E] leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                A Workflow Engineered <br />
                <span className="text-[#3666ff]">for Accuracy</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-inter)' }}>
                Legacy systems were built for record-keeping. FactWise is built for velocity.
                Our engine removes the manual friction that slows down your operations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group p-6 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#3666ff] shadow-sm group-hover:bg-[#3666ff] group-hover:text-white transition-all duration-500 shrink-0">
                    {step.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-[#1A1D2E]" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[448px] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative lg:pl-10">
            <div className="relative rounded-[40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200 aspect-[4/5] lg:aspect-square group">
              <img
                src="https://tailark.com/_next/image?url=%2Fdark-card.webp&w=3840&q=75"
                alt="Workflow Interface"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent pointer-events-none" />

              {/* Floating Stat Overlay */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 right-8 p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-2xl"
              >
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-black text-[#3666ff] tracking-tighter">92%</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-tight">
                    Reduction in <br />Manual Data Entry
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/10 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
