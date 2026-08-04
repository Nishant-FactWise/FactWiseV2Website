'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CareersHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-slate-950">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/careers/hero-bg.png" 
          alt="FactWise Office" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm"
        >
          Join Our Mission
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-[1.1] tracking-tighter mb-8 md:mb-10 py-2"
        >
          <span className="inline-block overflow-hidden">
          {"Careers at ".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          </span>
          <span className="text-[#3666ff] font-instrument italic font-medium inline-block overflow-hidden">
            {"FactWise".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: (index + 11) * 0.02 
                }}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/70 text-base sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-10 md:mb-12 font-light"
        >
          We're committed to boosting your potential and powering your journey. Redefine your limits and make visible impact.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-6 py-3 bg-[#3666ff] text-white rounded-full font-bold text-sm md:text-base shadow-[0_20px_50px_rgba(54,102,255,0.4)] transition-all"
        >
          Explore Open Roles
        </motion.button>
      </div>

      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-950 to-transparent z-1 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-slate-950 to-transparent z-1 pointer-events-none" />
    </section>
  );
};
