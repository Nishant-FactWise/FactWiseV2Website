'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, Plus, ArrowRight, Mail } from 'lucide-react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { faqCategories } from './faq-data';
import { cn } from '@/lib/utils';

export default function FaqContent() {
  const [query, setQuery] = React.useState('');
  const [openId, setOpenId] = React.useState<string | null>(faqCategories[0].items[0].q);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? faqCategories
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
          ),
        }))
        .filter((c) => c.items.length > 0)
    : faqCategories;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-slate-50/50 text-[#1A1D2E] pt-28">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-3xl py-12 relative">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] pb-1.5 bg-gradient-to-r from-slate-900 via-slate-800 to-[#3666ff] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Answers to common questions about FactWise, our AI-powered source-to-pay platform, and how it works for manufacturers.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search frequently asked questions"
              className="w-full rounded-2xl border border-slate-200 bg-white/90 pl-11 pr-4 py-3.5 text-[14px] text-slate-700 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#3666ff] focus:ring-2 focus:ring-[#3666ff]/20"
            />
          </div>

          {/* FAQ list */}
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center">
              <p className="text-slate-500 text-[15px]">
                No questions match &ldquo;{query}&rdquo;. Try a different search, or{' '}
                <a href="mailto:support@factwise.io" className="font-semibold text-[#3666ff] hover:underline">
                  ask our team
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((category) => (
                <section key={category.category}>
                  <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#3666ff]">
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.items.map((item) => {
                      const isOpen = openId === item.q;
                      return (
                        <div
                          key={item.q}
                          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenId(isOpen ? null : item.q)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                          >
                            <span className="text-[15px] font-semibold text-slate-900 md:text-base">
                              {item.q}
                            </span>
                            <span
                              className={cn(
                                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                                isOpen ? 'bg-[#3666ff] text-white rotate-45' : 'bg-blue-50 text-[#3666ff]',
                              )}
                            >
                              <Plus className="h-4 w-4" />
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <p className="px-5 pb-5 text-[14px] leading-relaxed text-slate-600 md:px-6 md:text-[15px]">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 text-center md:p-10">
            <h3 className="text-xl font-bold text-slate-900 md:text-2xl">Still have questions?</h3>
            <p className="mx-auto mt-2 max-w-md text-[14px] text-slate-500 md:text-[15px]">
              Book a demo and our team will walk you through FactWise and how it fits your procurement workflow.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3666ff] px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#2b54e0] hover:shadow-md"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@factwise.io"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" />
                Email support
              </a>
            </div>
          </div>
        </div>

        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
