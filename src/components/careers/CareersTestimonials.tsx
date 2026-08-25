'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StaggerTestimonials, TestimonialItem } from '@/components/ui/stagger-testimonials';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';

const TESTIMONIALS: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "It's great to be working directly with seniors and have the space to play around and find ways to make the product better. More importantly, people care about you and not just the work you do, and having all of that is the best feeling.",
    by: 'Sahil',
    role: 'Software Developer — Backend',
    initials: 'SA',
  },
  {
    tempId: 1,
    testimonial: "Growth-mindset culture as experienced here is important, and not an easy find. Through technical discussions, I felt encouraged to speak honestly and directly. My experience with FactWise helped me become a better engineer & leader.",
    by: 'Nagesh',
    role: 'Product Manager',
    initials: 'NA',
  },
  {
    tempId: 2,
    testimonial: "I work with professionals I can learn from who push me to take on new and challenging opportunities. At FactWise, every employee's voice is heard, and their feedback is valued. I like how there is recognition for every contribution we make.",
    by: 'Devanshi',
    role: 'Product Manager',
    initials: 'DE',
  },
  {
    tempId: 3,
    testimonial: "I get to work with some of the most brilliant people at FactWise and learn from them. I have the freedom to fail, learn, and grow and there is an honest, transparent, and empathic leadership and culture here.",
    by: 'Darshan',
    role: 'Product Manager',
    initials: 'DA',
  },
  {
    tempId: 4,
    testimonial: "I enjoy the creative freedom that I am encouraged to have here at FactWise. It is a dynamically evolving environment where I can get to test new things, which has personally helped me improve my work and grow as an individual.",
    by: 'Ayaan',
    role: 'Software Developer — Frontend',
    initials: 'AY',
  },
  {
    tempId: 5,
    testimonial: "The work culture at FactWise is nurturing. I have always been pushed to grow professionally and personally. The founder truly believes in individual growth for the firm to grow.",
    by: 'Drushti',
    role: 'Human Resources',
    initials: 'DR',
  },
  {
    tempId: 6,
    testimonial: "The learnings have been fantastic since day one. This is a startup where everyone helps you bring out the best in yourself and achieve your goals as well as the goals of the team.",
    by: 'Usamah Kamil',
    role: 'Software Developer — Frontend',
    initials: 'UK',
  },
  {
    tempId: 7,
    testimonial: "I love that every day is a new challenge. I joined FactWise at a time when I chose to become a parent and balancing both had me concerned, however the team and founder have been incredibly supportive to both of my journeys.",
    by: 'Jetal',
    role: 'Analyst',
    initials: 'JE',
  },
];

export const CareersTestimonials = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => messages[locale].textMap[source] ?? source;
  const localizedTestimonials = TESTIMONIALS.map((item) => ({
    ...item,
    testimonial: t(item.testimonial),
    role: t(item.role),
  }));

  return (
    <section className="py-20 md:py-32 px-6 md:px-14 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
            >
              {t("From the Team")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
            >
              {t("What people")}{' '}
              <span className="text-[#3666ff] font-instrument italic font-medium">{t("actually say")}</span>{' '}
              {t("about working here.")}
            </motion.h2>
          </div>

          {/* Instruction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/30 text-sm max-w-[180px] text-right hidden md:block"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {t("Click a card or use the arrows to explore")}
          </motion.p>
        </div>

        {/* Stagger Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <StaggerTestimonials key={locale} testimonials={localizedTestimonials} />
        </motion.div>
      </div>
    </section>
  );
};
