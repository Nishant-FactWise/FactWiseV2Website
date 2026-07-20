'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InvSection31 from './InvSection31';
import InvSection32 from './InvSection32';
import InvSection33 from './InvSection33';
import InvSection34 from './InvSection34';
import InvSection35 from './InvSection35';

const STEPS = [
    { num: '01', label: 'AI Invoice Processing', short: 'Invoice' },
    { num: '02', label: 'Goods Receipt', short: 'GR' },
    { num: '03', label: 'Quality Control', short: 'QC' },
    { num: '04', label: 'Payment Validation', short: 'Payment' },
    { num: '05', label: 'Total Visibility', short: 'Visibility' },
];
const TOTAL = STEPS.length; // 5

const gradientBg =
    'radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), ' +
    'radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), ' +
    'white';

export default function InvoiceToPayFlow() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [activePanel, setActivePanel] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);

    /* ── desktop detection ── */
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const apply = () => setIsDesktop(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    /* ── Framer Motion scroll tracking ── */
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start start', 'end end'],
    });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // scrollYProgress maps 0 to 1 over exactly (TOTAL - 1) viewports of scroll distance.
    // By multiplying by (TOTAL - 1) and rounding, each panel gets exactly 100vh of scroll space
    // centered around its target position, making up/down scroll perfectly symmetrical.
    const idx = Math.round(latest * (TOTAL - 1));
    if (idx !== activePanel) {
        setActivePanel(idx);
    }
  });

    /* ── arrow navigation ── */
    const navTo = useCallback((idx: number) => {
        if (!wrapperRef.current) return;
        const sectionTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
        const segH = wrapperRef.current.offsetHeight / TOTAL;
        window.scrollTo({ top: sectionTop + segH * idx + 10, behavior: 'smooth' });
    }, []);

    const navPrev = useCallback(() => navTo(Math.max(0, activePanel - 1)), [navTo, activePanel]);
    const navNext = useCallback(() => navTo(Math.min(TOTAL - 1, activePanel + 1)), [navTo, activePanel]);

    return (
        <>
            {/* ── HEADING (scrolls normally) ── */}
            <section style={{ background: 'white', padding: '80px 24px 60px', textAlign: 'center' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '5px 14px', borderRadius: 100,
                        background: 'rgba(54,102,255,0.06)', border: '1px solid rgba(54,102,255,0.15)',
                        fontSize: 11, fontWeight: 700, color: '#3666ff',
                        marginBottom: 24, letterSpacing: '0.12em', textTransform: 'uppercase',
                        fontFamily: 'var(--font-inter)',
                    }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3666ff', display: 'inline-block', animation: 'itpf-pulse 2s infinite' }} />
                        The FactWise Invoice-to-Pay Engine
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(32px, 3.4vw, 52px)', fontWeight: 600,
                        lineHeight: 1.1, letterSpacing: '-0.035em',
                        color: '#0D1117', margin: '0 0 16px',
                        fontFamily: 'var(--font-display)',
                    }}>
                        How FactWise <span style={{ color: '#3666ff' }}>Automates Every Step.</span>
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: 1.65, color: '#64748b', maxWidth: 640, margin: '0 auto', fontFamily: 'var(--font-inter)' }}>
                        From the first invoice raised to the last rupee paid — verified at every step, automated at every turn.
                    </p>
                </div>
            </section>

            {/* ── DESKTOP: tall wrapper gives scroll room; inner div is CSS sticky ── */}
            <div
                ref={wrapperRef}
                className="hidden lg:block"
                style={{ height: `${TOTAL * 100}vh`, position: 'relative' }}
            >
                <div style={{ position: 'sticky', top: 'max(80px, calc(50vh - 340px))', height: '680px', overflow: 'hidden', background: 'white' }}>

                    {/* Panel 0 — base, always behind */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                            <InvSection31 isActive={activePanel === 0} />
                        </div>
                    </div>

                    {/* Panel 1 — slides in from right */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: activePanel >= 1 ? '0%' : '100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradientBg }}
                    >
                        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                            <InvSection32 isActive={activePanel === 1} />
                        </div>
                    </motion.div>

                    {/* Panel 2 — slides in from right */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: activePanel >= 2 ? '0%' : '100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}
                    >
                        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                            <InvSection33 isActive={activePanel === 2} />
                        </div>
                    </motion.div>

                    {/* Panel 3 — slides in from right */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: activePanel >= 3 ? '0%' : '100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradientBg }}
                    >
                        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                            <InvSection34 isActive={activePanel === 3} />
                        </div>
                    </motion.div>

                    {/* Panel 4 — slides in from right */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: activePanel >= 4 ? '0%' : '100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}
                    >
                        <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                            <InvSection35 isActive={activePanel === 4} />
                        </div>
                    </motion.div>

                    {/* Progress dots */}
                    <div className="hidden lg:flex" style={{
                        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                        zIndex: 100, alignItems: 'center', gap: 8,
                        background: 'white', border: '1px solid rgba(15,23,42,0.08)',
                        borderRadius: 100, padding: '8px 16px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', pointerEvents: 'none',
                    }}>
                        {STEPS.map((_, i) => (
                            <div key={i} style={{
                                width: activePanel === i ? 20 : 6, height: 6, borderRadius: 3,
                                background: activePanel === i ? '#3666ff' : activePanel > i ? '#00b884' : '#e2e8f0',
                                transition: 'all .4s cubic-bezier(.22,.61,.36,1)',
                            }} />
                        ))}
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.06em', marginLeft: 4 }}>
                            {STEPS[activePanel]?.num} · {STEPS[activePanel]?.short}
                        </span>
                    </div>

                    {/* Prev arrow */}
                    <button onClick={navPrev} aria-label="Previous step" className="hidden lg:flex"
                        style={{
                            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                            zIndex: 100, width: 40, height: 40, borderRadius: '50%',
                            background: 'white', border: '1px solid rgba(15,23,42,0.1)',
                            alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            transition: 'opacity .2s ease, border-color .2s ease, color .2s ease',
                            opacity: activePanel === 0 ? 0 : 1,
                            pointerEvents: activePanel === 0 ? 'none' : 'auto',
                            color: '#64748b',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,102,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#3666ff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)'; (e.currentTarget as HTMLElement).style.color = '#64748b'; }}
                    >
                        <ChevronLeft style={{ width: 16, height: 16, color: 'inherit' }} />
                    </button>

                    {/* Next arrow */}
                    <button onClick={navNext} aria-label="Next step" className="hidden lg:flex"
                        style={{
                            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                            zIndex: 100, width: 40, height: 40, borderRadius: '50%',
                            background: activePanel === TOTAL - 1 ? 'rgba(0,184,132,0.1)' : 'white',
                            border: `1px solid ${activePanel === TOTAL - 1 ? 'rgba(0,184,132,0.3)' : 'rgba(15,23,42,0.1)'}`,
                            alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            transition: 'all .2s ease',
                            color: activePanel === TOTAL - 1 ? '#00b884' : '#64748b',
                        }}
                        onMouseEnter={e => { if (activePanel < TOTAL - 1) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,102,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#3666ff'; } }}
                        onMouseLeave={e => { if (activePanel < TOTAL - 1) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)'; (e.currentTarget as HTMLElement).style.color = '#64748b'; } }}
                    >
                        <ChevronRight style={{ width: 16, height: 16, color: 'inherit' }} />
                    </button>
                </div>
            </div>

            {/* ── MOBILE: stacked vertically ── */}
            <div className="block lg:hidden bg-[#ffffff]">
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><InvSection31 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><InvSection32 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><InvSection33 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><InvSection34 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><InvSection35 isActive /></div>
            </div>

            <style>{`@keyframes itpf-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
        </>
    );
}
