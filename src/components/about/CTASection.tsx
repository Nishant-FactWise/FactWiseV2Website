'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-24 px-6 md:px-14 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-slate-900 rounded-[64px] p-12 md:p-24 overflow-hidden shadow-2xl"
        >
          {/* Animated Glows */}
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#3666ff] rounded-full blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[100px] opacity-10 animate-pulse delay-700" />
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1] tracking-tighter mb-12">
              Want To Build The <br />
              <span className="font-instrument italic font-medium text-[#3666ff]">Future Of Procurement</span> <br />
              With Us?
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-[448px]">
                We're hiring across engineering, design, product and customer success. 
                Come see if there's a fit.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-[#3666ff] text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl hover:shadow-[#3666ff]/20 transition-all"
                >
                  See open roles
                  <ArrowUpRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Book a demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
