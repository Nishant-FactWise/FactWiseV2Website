'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  TrendingUp, 
  Heart, 
  Clock, 
  BookOpen, 
  Laptop, 
  Users, 
  Stethoscope 
} from 'lucide-react';

const BENEFITS = [
  {
    title: "Remote-first, async by default",
    desc: "Work where you do your best work. Quarterly off-sites bring the team together IRL.",
    icon: Wifi,
  },
  {
    title: "Top-of-market pay + equity",
    desc: "Competitive cash compensation and meaningful equity — everyone is an owner.",
    icon: TrendingUp,
  },
  {
    title: "Comprehensive health cover",
    desc: "Full medical, dental, and mental health coverage for you and your family.",
    icon: Heart,
  },
  {
    title: "Generous, real PTO",
    desc: "Unlimited time off, with a four-week minimum so you actually take it.",
    icon: Clock,
  },
  {
    title: "₹1,500 learning stipend",
    desc: "Books, courses, conferences — your call. Use it to get sharper at what you love.",
    icon: BookOpen,
  },
  {
    title: "Top-tier hardware",
    desc: "MacBook Pro of your choice, 4K monitor, and a home-office stipend on day one.",
    icon: Laptop,
  },
  {
    title: "Parental leave that respects you",
    desc: "16 weeks fully paid for all parents, with flexible phased return.",
    icon: Users,
  },
  {
    title: "Quarterly company retreats",
    desc: "Build relationships in person. Hike, ship, eat, repeat — somewhere new each time.",
    icon: Stethoscope,
  }
];

export const CareersBenefits = () => {
  return (
    <section className="py-32 px-6 md:px-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            What We Offer
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter"
          >
            The basics, <span className="text-[#3666ff] font-instrument italic font-medium">done well.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-[32px] overflow-hidden bg-slate-200 gap-[1px]">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-10 hover:bg-blue-50/50 transition-colors duration-500 flex flex-col gap-6"
            >
              <div className="size-12 rounded-xl bg-blue-50 text-[#3666ff] flex items-center justify-center shadow-sm">
                <benefit.icon className="size-6" strokeWidth={1.5} />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-slate-900 leading-tight">
                  {benefit.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative side text or glow could go here */}
    </section>
  );
};
