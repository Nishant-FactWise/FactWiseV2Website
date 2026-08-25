'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuoteGenAnimation from './QuoteGenAnimation';
import { Check } from 'lucide-react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

export default function QuoteGenSection() {
    const t = useLocalizedText();
    const [quotePhaseAnim, setQuotePhaseAnim] = useState<number>(0);
    const [isQuoteAuto, setIsQuoteAuto] = useState<boolean>(true);
    const [quoteMenuStep, setQuoteMenuStep] = useState<number | null>(null);

    const setQuoteManual = (menuPhase: number) => {
        setIsQuoteAuto(false);
        setQuoteMenuStep(menuPhase);
        if (menuPhase === 1) setQuotePhaseAnim(1);
        else if (menuPhase === 2) setQuotePhaseAnim(5);
        else if (menuPhase === 3) setQuotePhaseAnim(6);
        else if (menuPhase === 4) setQuotePhaseAnim(7);
    };

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleGoToStep = (e: Event) => {
            const step = (e as CustomEvent).detail.step;
            if (step === 4) setQuoteManual(1);
        };
        window.addEventListener('go-to-solution-step', handleGoToStep);
        return () => window.removeEventListener('go-to-solution-step', handleGoToStep);
    }, []);

    const isQuoteMenuStepActive = (itemPhase: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) {
            return quoteMenuStep === itemPhase;
        }
        if (itemPhase === 1) return quotePhaseAnim >= 1 && quotePhaseAnim <= 4;
        if (itemPhase === 2) return quotePhaseAnim === 5;
        if (itemPhase === 3) return quotePhaseAnim === 6;
        if (itemPhase === 4) return quotePhaseAnim >= 7;
        return false;
    };

    const isQuoteMenuStepDone = (itemPhase: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) {
            return itemPhase < quoteMenuStep;
        }
        if (itemPhase === 1) return quotePhaseAnim > 4;
        if (itemPhase === 2) return quotePhaseAnim > 5;
        if (itemPhase === 3) return quotePhaseAnim > 6;
        return false;
    };

    return (
        <div id="section-3-4" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <QuoteGenAnimation
                        speed={1}
                        isAuto={isQuoteAuto}
                        controlledPhase={quoteMenuStep}
                        activeMenuStep={!isQuoteAuto ? quoteMenuStep : null}
                        onPhaseChange={(p) => setQuotePhaseAnim(p)}
                        onToggleAuto={() => { setIsQuoteAuto(prev => { if (!prev) setQuoteMenuStep(null); return !prev; }); }}
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                    {t('Quote Generation & Analytics')}
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    {t('Automate Quote Generation.')} <br />
                    <span className="text-[#3666ff]">{t('Built to Win.')}</span>
                </h3>
                <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t('Select the best bids — FactWise automates quote generation in one click. Every line item priced, every landed cost calculated, every BOM rolled up automatically. No manual calculation. No margin errors.')}
                </p>
                <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t("Then use AI to go deep on what's inside your quote — ask any question about your costs, find where your biggest expenses are hiding, see which categories drive spend, and model how costs shift across order volumes. Every insight you need to sharpen your quote and send it before anyone else.")}
                </p>

                <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                    {[
                        { phase: 1, title: "One-Click Quote Generation" },
                        { phase: 2, title: "Auto Landed Cost Roll-Up" },
                        { phase: 3, title: "Ask AI About Your Costs" },
                        { phase: 4, title: "Volume Pricing Insights" }
                    ].map((item) => (
                        <div
                            key={item.phase}
                            onClick={() => setQuoteManual(item.phase)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                isQuoteMenuStepActive(item.phase)
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {isQuoteMenuStepActive(item.phase) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                            )}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                    isQuoteMenuStepActive(item.phase)
                                        ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                        : isQuoteMenuStepDone(item.phase)
                                        ? 'border-[#00b884] bg-[#00b884] text-white'
                                        : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${
                                    isQuoteMenuStepActive(item.phase) ? 'text-[#3666ff]' : isQuoteMenuStepDone(item.phase) ? 'text-slate-700' : 'text-slate-500'
                                }`}>
                                    {t(item.title)}
                                </span>
                            </div>
                            {isQuoteMenuStepActive(item.phase) && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {t('Active')}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
