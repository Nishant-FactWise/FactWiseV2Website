'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ExternalLink, Clock } from 'lucide-react';
import { JOBS, CATEGORIES } from '@/lib/careers-jobs';
import { usePathname } from 'next/navigation';
import { getPathLocale, localizePath } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { withoutLongDashes } from '@/lib/display-text';

export const CareersOpenings = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => withoutLongDashes(messages[locale].textMap[source] ?? source);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredJobs =
    activeCategory === 'all' ? JOBS : JOBS.filter((job) => job.category === activeCategory);

  return (
    <section id="openings" className="bg-slate-50/50 px-5 py-16 sm:px-6 sm:py-20 md:px-14 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col justify-between gap-8 sm:mb-14 md:flex-row md:items-end md:mb-16">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
            >
              {t("Open Roles")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[30px] font-bold leading-[1.1] tracking-tighter text-slate-900 sm:text-4xl md:text-6xl"
            >
              {t("Find")} <span className="text-[#3666ff] font-instrument italic font-medium">{t("your place")}</span> {t("at FactWise.")}
            </motion.h2>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="-mx-5 mb-10 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-6 sm:gap-3 sm:px-6 md:mx-0 md:mb-12 md:flex-wrap md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`min-h-11 snap-start whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              {t(cat.label)}
              <span className={`ml-2 text-[10px] opacity-60 ${activeCategory === cat.id ? 'text-white' : ''}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Job list */}
        <div className="border-t border-slate-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={localizePath(`/careers/jobs/${job.slug}`, locale)}
                  className="group relative flex cursor-pointer flex-col items-start justify-between overflow-hidden border-b border-slate-200 py-7 transition-all duration-500 md:flex-row md:items-center md:py-9 md:hover:px-6"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3666ff] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                  <div className="mb-5 min-w-0 max-w-2xl md:mb-0">
                    <h3 className="mb-1 break-words text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#3666ff] sm:text-2xl md:text-3xl">
                      {t(job.title)}
                    </h3>
                    <p className="text-[#3666ff] text-xs font-semibold mb-2">{t(job.employmentType)}</p>
                    <p className="max-w-xl text-justify text-[15px] leading-7 text-slate-500 sm:text-base">{t(job.desc)}</p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right md:mx-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3666ff] bg-blue-50 px-3 py-1 rounded-full">
                      {t(job.team)}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <MapPin className="size-4" />
                      {t(job.location)}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="size-4" />
                      {t(job.employmentType)}
                    </div>
                  </div>

                  {/* Mobile-only tap affordance — the desktop arrow-circle is hidden on phones */}
                  <span className="md:hidden mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3666ff] text-white text-sm font-semibold self-start">
                    {t("View Role")} <ArrowRight className="size-4" />
                  </span>

                  <div className="hidden md:flex size-13 rounded-full border border-slate-200 items-center justify-center group-hover:bg-[#3666ff] group-hover:border-[#3666ff] group-hover:text-white group-hover:-rotate-45 transition-all duration-500 flex-shrink-0">
                    <ArrowRight className="size-5" />
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-14 flex flex-col items-stretch justify-between gap-7 overflow-hidden rounded-[24px] bg-slate-950 p-6 text-white sm:mt-20 sm:rounded-[32px] sm:p-10 md:flex-row md:items-center md:gap-10 md:rounded-[40px] md:p-16"
        >
          <div className="relative z-10 max-w-xl text-left">
            <h3 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl md:mb-4 md:text-4xl">
              {t("Don't see your")} <span className="text-[#3666ff] font-instrument italic font-medium">{t("perfect role?")}</span>
            </h3>
            <p className="text-justify text-[15px] leading-7 text-slate-400 sm:text-lg">
              {t("Write to us anyway — we'd love to explore if there's a fit for your unique skills.")}
            </p>
          </div>
          <a
            href="mailto:recruiting@factwise.io"
            className="group relative z-10 flex min-h-12 w-full items-center justify-center gap-3 break-all rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-[#3666ff] hover:text-white sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            recruiting@factwise.io
            <ExternalLink className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        </motion.div>
      </div>
    </section>
  );
};
