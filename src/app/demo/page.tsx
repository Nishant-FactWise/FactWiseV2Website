'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Loader2, Shield, Globe, Zap, Search } from 'lucide-react';
import Link from 'next/link';

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

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* Background from inquiry-to-quote hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px]" />
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(120,150,220,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,220,0.04) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)'
        }} />
      </div>

      {/* Dark Navbar */}
      <header className="relative z-20 w-full px-6 py-6 flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <img src="/logowhite.webp" alt="FactWise Logo" className="h-7 w-auto rounded-tl-[15%] rounded-br-[15%]" style={{ clipPath: 'inset(2% 0 0 2%)' }} />
          <span>FactWise</span>
        </div>
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>
      </header>

      {/* Centered Popup Card Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 py-12 w-full max-w-[1100px] mx-auto min-h-0">
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col lg:flex-row bg-white rounded-[24px] border border-slate-200 shadow-2xl overflow-hidden"
            >
              
              {/* Left: Features */}
              <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 relative overflow-y-auto custom-scrollbar">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3666ff]/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-6 bg-[#3666ff]/80" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3666ff]/80">
                      30-Minute Demo
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-slate-900 leading-[1.1]">
                    See FactWise <br />
                    <span className="text-[#3666ff]">in 30 minutes.</span>
                  </h1>
                  
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    A live walkthrough tailored to your procurement challenges — RFQ automation, approval chains, landed cost benchmarking, and risk management. All in one session.
                  </p>

                  <ul className="space-y-6">
                    {[
                      { icon: <Zap size={18} />, title: "Real-time RFQ automation", desc: "Watch FactWise handle multi-currency bidding instantly." },
                      { icon: <Shield size={18} />, title: "Approval chain & risk", desc: "Granular workflows and transparent risk analysis." },
                      { icon: <Globe size={18} />, title: "Landed cost benchmarking", desc: "Automatically calculate landed costs globally." },
                      { icon: <Search size={18} />, title: "End-to-end auditability", desc: "Transparency from requisition to PO in one view." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#3666ff] shrink-0 transition-colors group-hover:border-[#3666ff]/50 mt-1">
                          {item.icon}
                        </div>
                        <div className="group-hover:translate-x-1 transition-transform duration-300">
                          <h4 className="text-slate-900 font-medium text-sm mb-1">{item.title}</h4>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Form */}
              <div className="flex-[1.1] p-8 lg:p-12 bg-slate-50/50 flex flex-col justify-center overflow-y-auto custom-scrollbar">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Book your demo</h3>
                  <p className="text-slate-500 text-sm font-light">
                    We'll confirm within 2 hours and tailor the session.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Full Name *</label>
                      <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Company *</label>
                      <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Work Email *</label>
                    <input required type="email" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="john@company.com" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Phone (Optional)</label>
                    <input type="tel" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="+1 (555) 000-0000" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Team Size *</label>
                      <select required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all text-sm shadow-sm">
                        <option value="" disabled selected>Select...</option>
                        <option value="1-50">1-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-1000">201-1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Your Role *</label>
                      <select required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all text-sm shadow-sm">
                        <option value="" disabled selected>Select...</option>
                        <option value="procurement">Procurement</option>
                        <option value="finance">Finance</option>
                        <option value="operations">Operations</option>
                        <option value="executive">Executive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Biggest Challenge</label>
                    <select required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all text-sm shadow-sm">
                      <option value="" disabled selected>Select...</option>
                      <option value="rfq">Slow RFQ processes</option>
                      <option value="cost">Landed cost calculations</option>
                      <option value="compliance">Vendor compliance & risk</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      disabled={loading}
                      className="w-full py-3.5 bg-[#3666ff] text-white rounded-lg font-bold shadow-[0_0_20px_rgba(54,102,255,0.2)] hover:bg-[#3666ff]/90 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#3666ff]/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 text-sm"
                    >
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Book Demo"}
                    </button>
                    <p className="text-center text-slate-500 text-[9px] mt-4 font-medium uppercase tracking-wider">
                      Secure scheduling • No credit card required
                    </p>
                  </div>
                </form>
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full text-center p-12 rounded-[24px] bg-white border border-slate-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3666ff]/20 blur-[80px] rounded-full" />
              <div className="w-20 h-20 bg-[#3666ff] rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 shadow-[0_0_50px_rgba(54,102,255,0.3)]">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-light mb-4 relative z-10 text-slate-900 tracking-tight">You&apos;re booked.</h1>
              <p className="text-slate-500 mb-10 relative z-10 leading-relaxed font-light text-sm">
                Our solutions team will reach out to confirm your custom demo time within 2 hours.
              </p>
              <div className="space-y-3 relative z-10">
                <a href="/inquiry-to-quote" className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">
                  Explore Inquiry to Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
