'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BomCostAnimation from './BomCostAnimation';
import { Check } from 'lucide-react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

export default function BomCostSection() {
    const t = useLocalizedText();
    const [isBomAuto, setIsBomAuto] = useState<boolean>(true);
    const [bomMenuStep, setBomMenuStep] = useState<number | null>(null);
    const [bomPhase, setBomPhase] = useState<number>(1);

    const setBomManual = (n: number) => {
        setIsBomAuto(false);
        setBomMenuStep(n);
    };

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleGoToStep = (e: Event) => {
            const step = (e as CustomEvent).detail.step;
            if (step === 1) setBomManual(1);
        };
        window.addEventListener('go-to-solution-step', handleGoToStep);
        return () => window.removeEventListener('go-to-solution-step', handleGoToStep);
    }, []);

    const isBomStepActive = (n: number) => bomPhase === n;
    const isBomStepDone = (n: number) => bomPhase > n;

    return (
        <div id="section-3-1" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                    {t('BOM & Cost Intelligence')}
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    {t('AI-Driven BOM Intelligence.')}

 <br />
                    <span className="text-[#3666ff]">{t('Every Part. Every Cost.')}</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t('Build complex multi-level BOMs with alternates in a single import. FactWise surfaces accurate line-item costs — distributor, past PO, quote, and contract prices — before any RFQ goes out.')}
                </p>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t('Every revision is tracked automatically. Compare versions side by side and ask AI any question about cost changes or sourcing insights — no spreadsheet digging.')}
                </p>

                <div className="flex flex-col gap-2 mt-8 text-left">
                    {[
                        { step: 1, title: 'Multi-Level BOM Import' },
                        { step: 2, title: 'Alternates on Every Line' },
                        { step: 3, title: 'Line-Level Cost Intelligence' },
                        { step: 4, title: 'Ask AI About Your BOM' },
                    ].map((item) => (
                        <div
                            key={item.step}
                            onClick={() => setBomManual(item.step)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                isBomStepActive(item.step)
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {isBomStepActive(item.step) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                            )}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                    isBomStepActive(item.step)
                                        ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                        : isBomStepDone(item.step)
                                        ? 'border-[#00b884] bg-[#00b884] text-white'
                                        : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${
                                    isBomStepActive(item.step) ? 'text-[#3666ff]'
                                    : isBomStepDone(item.step) ? 'text-slate-700'
                                    : 'text-slate-500'
                                }`}>
                                    {t(item.title)}
                                </span>
                            </div>
                            {isBomStepActive(item.step) && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {t('Active')}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative flex items-center justify-center self-stretch"
            >
                <div className="w-full">
                    <BomCostAnimation
                        speed={1}
                        isAuto={isBomAuto}
                        controlledPhase={bomMenuStep}
                        activeMenuStep={!isBomAuto ? bomMenuStep : null}
                        onPhaseChange={(p) => setBomPhase(p)}
                        onToggleAuto={() => {
                            setIsBomAuto(prev => {
                                if (!prev) setBomMenuStep(null);
                                return !prev;
                            });
                        }}
                    />
                </div>
            </motion.div>

        </div>
    );
}
