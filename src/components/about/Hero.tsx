'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-slate-950">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/group-diverse-people-having-business-meeting.jpg"
          alt="FactWise Team"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10 text-center">
        <motion.h1
          className="text-[37px] sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tighter mb-10 overflow-hidden py-2"
        >
          {"One Platform.".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Every Team. Every Workflow.
          </motion.span>
          <br />
          <span className="text-[#3666ff] font-instrument italic font-medium inline-block">
            {"Every Step.".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.55 + index * 0.03,
                }}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/70 text-[17px] sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12 font-light"
        >
          FactWise is redefining how manufacturers buy, source, quote, and pay — automating
          every workflow, eliminating every bottleneck, and building the operating system for
          modern manufacturing operations.
        </motion.p>

        <motion.a
          href="/platform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          whileHover={{ scale: 1.05, backgroundColor: '#4d7aff' }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-2.5 bg-[#3666ff] text-white rounded-full font-semibold text-sm shadow-[0_12px_30px_rgba(54,102,255,0.35)] transition-all"
        >
          Explore the Platform
        </motion.a>
      </div>

      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-950 to-transparent z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-slate-950 to-transparent z-[1] pointer-events-none" />
    </section>
  );
};
