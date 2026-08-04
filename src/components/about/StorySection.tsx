'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const StorySection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 xl:gap-24 items-center">
          
          {/* Left: Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div 
              className="relative mx-auto w-full min-w-[280px] sm:min-w-[320px] max-w-[448px] rounded-[40px] md:rounded-[48px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl group"
              style={{ aspectRatio: '4/5' }}
            >
              {/* Base Image Layer */}
              <motion.div 
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <img 
                  src="/procurement_team_collab_1778762496149.png" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </motion.div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-10" 
                   style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              
              {/* Animated Orbs */}
              <motion.div 
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] -left-[10%] w-64 h-64 bg-[#3666ff] rounded-full blur-[80px] opacity-30 z-0" 
              />
              <motion.div 
                animate={{ 
                  x: [0, -40, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] -right-[10%] w-48 h-48 bg-emerald-400 rounded-full blur-[60px] opacity-30" 
              />

              {/* Floating Badges */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-[20%] md:top-[25%] left-[5%] md:left-[8%] bg-white/95 backdrop-blur-xl p-2 md:p-3 rounded-xl shadow-xl flex items-center gap-2 md:gap-3 z-20"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-900 whitespace-nowrap">Sourcing event closed</span>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute bottom-[25%] md:bottom-[30%] right-[5%] md:right-[8%] bg-white/95 backdrop-blur-xl p-2 md:p-3 rounded-xl shadow-xl flex items-center gap-2 md:gap-3 z-20"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-900 whitespace-nowrap">Invoice matched</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Narrative Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-7 flex flex-col items-start justify-center"
          >
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                The Story
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-8 md:mb-10">
              A Platform Built For The <span className="text-[#3666ff] font-instrument italic font-medium">Complexity</span> Of Real Procurement.
            </h2>
            
            <div className="space-y-6 md:space-y-8 text-slate-600 text-justify text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                FactWise was founded by procurement and engineering veterans who watched 
                enterprise buyers wrestle with disconnected tools, slow approvals, and 
                supplier data scattered across spreadsheets.
              </p>
              <p>
                So we built one platform—opinionated where it matters, flexible where it 
                should be—that connects sourcing, contracts, suppliers, and payments end-to-end. 
                The result: faster cycles, cleaner data, and happier teams.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 md:mt-12 flex flex-wrap gap-6 md:gap-8 items-center pt-8 border-t border-slate-100"
            >
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-slate-900 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-[#3666ff]" />
                Founded in 2021
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-slate-900 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-[#3666ff]" />
                Remote-First
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-slate-900 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-[#3666ff]" />
                Enterprise-Grade
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
