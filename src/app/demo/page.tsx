'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { CheckCircle2, ArrowRight, Loader2, Sparkles, Shield, Globe, Zap } from 'lucide-react';

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <main className="bg-[#f6f9fc] text-[#000000] min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 noise-bg opacity-[0.05] pointer-events-none" />
        <div className="flex-1 flex items-center justify-center px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center p-16 rounded-[48px] glass-card shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3666ff]/20 blur-[80px] rounded-full" />
            <div className="w-24 h-24 bg-[#3666ff] rounded-full flex items-center justify-center mx-auto mb-10 relative z-10 shadow-[0_0_50px_rgba(54,102,255,0.5)]">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-light mb-6 relative z-10 text-[#000000] tracking-tight">You&apos;re booked.</h1>
            <p className="text-[#808080] mb-12 relative z-10 leading-relaxed font-light text-lg">
              Our solutions team will reach out to confirm your custom demo time within 24 hours.
            </p>
            <div className="space-y-4 relative z-10">
              <a href="/inquiry-to-quote" className="block p-5 rounded-2xl bg-black/[0.04] border border-black/[0.08] hover:bg-black/[0.07] transition-all text-sm font-bold uppercase tracking-widest text-[#808080] hover:text-[#000000]">
                Explore Inquiry to Quote
              </a>
              <a href="/requisitions-to-po" className="block p-5 rounded-2xl bg-[#3666ff]/10 border border-[#3666ff]/20 hover:bg-[#3666ff]/20 transition-all text-sm font-bold uppercase tracking-widest text-[#3666ff]">
                Requisitions to PO
              </a>
            </div>
          </motion.div>
        </div>
        <FlickeringFooter />
      </main>
    );
  }

  return (
    <main className="bg-[#f6f9fc] text-[#000000] min-h-screen flex flex-col relative">
      <div className="absolute inset-0 noise-bg opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />
      
      <div className="flex-1 flex flex-col lg:flex-row pt-32 lg:pt-0 relative z-10">
        {/* Left: Form */}
        <section className="flex-1 flex items-center justify-center px-6 py-20 lg:py-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="max-w-xl w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3666ff]/10 border border-[#3666ff]/20 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles size={12} className="fill-[#3666ff]" />
              Limited Access
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6 text-[#000000] leading-[1.1]">
              See Factwise <br />in action
            </h1>
            <p className="text-xl text-[#808080] mb-16 font-light leading-relaxed">
              Tailored 30-minute deep-dive into your specific operational challenges.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080] ml-1">First Name</label>
                  <input required type="text" className="w-full bg-black/[0.03] border border-black/[0.08] rounded-2xl px-5 py-4 text-[#000000] focus:outline-none focus:border-[#3666ff]/50 focus:bg-black/[0.04] transition-all placeholder:text-[#c0c0c0]" placeholder="John" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080] ml-1">Last Name</label>
                  <input required type="text" className="w-full bg-black/[0.03] border border-black/[0.08] rounded-2xl px-5 py-4 text-[#000000] focus:outline-none focus:border-[#3666ff]/50 focus:bg-black/[0.04] transition-all placeholder:text-[#c0c0c0]" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080] ml-1">Work Email</label>
                <input required type="email" className="w-full bg-black/[0.03] border border-black/[0.08] rounded-2xl px-5 py-4 text-[#000000] focus:outline-none focus:border-[#3666ff]/50 focus:bg-black/[0.04] transition-all placeholder:text-[#c0c0c0]" placeholder="john@company.com" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080] ml-1">Company</label>
                  <input required type="text" className="w-full bg-black/[0.03] border border-black/[0.08] rounded-2xl px-5 py-4 text-[#000000] focus:outline-none focus:border-[#3666ff]/50 focus:bg-black/[0.04] transition-all placeholder:text-[#c0c0c0]" placeholder="Acme Inc" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080] ml-1">Job Title</label>
                  <input required type="text" className="w-full bg-black/[0.03] border border-black/[0.08] rounded-2xl px-5 py-4 text-[#000000] focus:outline-none focus:border-[#3666ff]/50 focus:bg-black/[0.04] transition-all placeholder:text-[#c0c0c0]" placeholder="VP Sourcing" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080] ml-1">What are you looking to solve?</label>
                <textarea rows={3} className="w-full bg-black/[0.03] border border-black/[0.08] rounded-2xl px-5 py-4 text-[#000000] focus:outline-none focus:border-[#3666ff]/50 focus:bg-black/[0.04] transition-all resize-none placeholder:text-[#c0c0c0]" placeholder="Describe your current sourcing or supply chain hurdles..." />
              </div>
              
              <div className="pt-4">
                <button 
                  disabled={loading}
                  className="w-full py-6 bg-[#3666ff] rounded-2xl font-bold text-white shadow-[0_0_30px_rgba(54,102,255,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Request My Demo"}
                  {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
                <div className="mt-6 flex justify-center gap-8 opacity-40 grayscale pointer-events-none">
                  {/* Pseudo logo grid */}
                  <div className="w-20 h-6 bg-black/[0.08] rounded" />
                  <div className="w-20 h-6 bg-black/[0.08] rounded" />
                  <div className="w-20 h-6 bg-black/[0.08] rounded" />
                </div>
              </div>
            </form>
          </motion.div>
        </section>
        
        {/* Right: Value Reinforcement */}
        <section className="flex-1 bg-black/[0.02] border-l border-black/[0.06] flex items-center justify-center px-6 py-20 lg:py-40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3666ff]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }}
            className="max-w-md w-full relative z-10"
          >
            <h3 className="text-4xl font-light mb-16 text-[#000000] tracking-tight">The 30-minute <br />masterclass</h3>
            <ul className="space-y-10">
              {[
                { icon: <Zap size={18} />, text: "Real-time RFQ automation & bidding" },
                { icon: <Shield size={18} />, text: "Approval chain & risk management" },
                { icon: <Globe size={18} />, text: "Global landed cost benchmarking" },
                { icon: <CheckCircle2 size={18} />, text: "End-to-end auditability & compliance" }
              ].map((item, i) => (
                <li key={i} className="flex gap-6 items-start group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-black/[0.04] border border-black/[0.08] flex items-center justify-center text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-all duration-300 shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[#808080] group-hover:text-[#000000] transition-colors text-xl font-light leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-24 p-10 rounded-[40px] glass-card relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                <Globe size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex gap-3 items-center mb-8">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#f6f9fc] bg-black/[0.06]" />
                    ))}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#808080]">Trusted by 500+ Teams</div>
                </div>
                <p className="text-[#808080] font-light leading-relaxed italic text-lg">
                  &ldquo;FactWise has transformed our operations from a manual bottleneck into a strategic advantage.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      
      <FlickeringFooter />
    </main>
  );
}
