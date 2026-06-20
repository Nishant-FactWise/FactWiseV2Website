'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import BomCostSection from './BomCostSection';
import Section32SourceAINegotiate from './Section32SourceAINegotiate';
import Section33LandedCostXRay from './Section33LandedCostXRay';
import Section34QuoteAIInsight from './Section34QuoteAIInsight';

gsap.registerPlugin(ScrollTrigger, Observer);

const STEPS = [
    { num: '01', label: 'BOM & Cost Intelligence', short: 'BOM' },
    { num: '02', label: 'Intelligent Sourcing',    short: 'Sourcing' },
    { num: '03', label: 'Landed Cost Analytics',   short: 'Analytics' },
    { num: '04', label: 'Quote Generation',        short: 'Quote' },
];
const TOTAL = STEPS.length;       // 4 panels
const SLIDE_DUR = 0.55;           // seconds per panel transition

export default function QuoteToOrderFlowV2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePanel, setActivePanel] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const apply = () => setIsDesktop(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    useGSAP(() => {
        if (!isDesktop || !containerRef.current) return;

        const slides = gsap.utils.toArray<HTMLElement>('.qtof-panel-slide');
        const totalSlides = slides.length + 1; // Panel 0 + slides 1,2,3

        // Initialize slides off-screen right
        gsap.set(slides, { xPercent: 100 });
        gsap.set(gsap.utils.toArray<HTMLElement>('.qtof-panel'), { zIndex: (i: number) => i });

        // We pin for 4 window heights (one for each slide transition)
        const scrollDistance = window.innerHeight * totalSlides;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                start: 'top top',
                end: `+=${scrollDistance}`,
                scrub: 0.8, // Smoothly follow the native scrollbar
                onUpdate: (self) => {
                    // Update the active panel based on scrub progress
                    const progress = self.progress;
                    // Snap progress to discrete steps
                    const currentIdx = Math.min(
                        TOTAL - 1,
                        Math.max(0, Math.round(progress * (TOTAL - 1)))
                    );
                    setActivePanel(currentIdx);
                }
            }
        });

        // Build a continuous timeline that slides each panel over the previous one
        slides.forEach((slide, i) => {
            tl.to(slide, {
                xPercent: 0,
                ease: 'none' // Linear ease so it matches scrollbar 1:1
            });
            // Add a small pause after each slide arrives
            tl.to({}, { duration: 0.2 });
        });

    }, { dependencies: [isDesktop], scope: containerRef });

    // The nav buttons now scroll the window natively to the correct progress point
    const navPrev = useCallback(() => {
        const trigger = ScrollTrigger.getAll().find(st => st.pin === containerRef.current);
        if (trigger && activePanel > 0) {
            const step = trigger.end - trigger.start;
            const target = trigger.start + (step * ((activePanel - 1) / (TOTAL - 1)));
            window.scrollTo({ top: target, behavior: 'smooth' });
        }
    }, [activePanel]);

    const navNext = useCallback(() => {
        const trigger = ScrollTrigger.getAll().find(st => st.pin === containerRef.current);
        if (trigger && activePanel < TOTAL - 1) {
            const step = trigger.end - trigger.start;
            const target = trigger.start + (step * ((activePanel + 1) / (TOTAL - 1)));
            window.scrollTo({ top: target, behavior: 'smooth' });
        }
    }, [activePanel]);

    return (
        <>
            {/* HEADING — scrolls normally above pinned area */}
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
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3666ff', display: 'inline-block', animation: 'qtof-pulse 2s infinite' }} />
                        The FactWise Inquiry to Quote Engine
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(32px, 3.4vw, 52px)', fontWeight: 600,
                        lineHeight: 1.1, letterSpacing: '-0.035em',
                        color: '#0D1117', margin: '0 0 16px',
                        fontFamily: 'var(--font-display)',
                    }}>
                        How FactWise Automates <span style={{ color: '#3666ff' }}>Every Step</span>
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: 1.65, color: '#64748b', maxWidth: 640, margin: '0 auto', fontFamily: 'var(--font-inter)' }}>
                        From the first BOM line to the final customer quote — intelligent at every step, automated at every turn.
                    </p>
                </div>
            </section>

            {/* PINNED CONTAINER — desktop only */}
            <div
                ref={containerRef}
                className="qtof-container hidden lg:block"
                style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: 'white' }}
            >
                {/* PANEL 0 — BOM (always visible underneath) */}
                <div className="qtof-panel" style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <BomCostSection />
                    </div>
                </div>

                {/* PANEL 1 */}
                <div className="qtof-panel qtof-panel-slide" style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), white',
                    display: 'flex', alignItems: 'center', overflow: 'hidden',
                }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <Section32SourceAINegotiate isActive={activePanel === 1} />
                    </div>
                </div>

                {/* PANEL 2 */}
                <div className="qtof-panel qtof-panel-slide" style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <Section33LandedCostXRay isActive={activePanel === 2} />
                    </div>
                </div>

                {/* PANEL 3 */}
                <div className="qtof-panel qtof-panel-slide" style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), white',
                    display: 'flex', alignItems: 'center', overflow: 'hidden',
                }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <Section34QuoteAIInsight isActive={activePanel === 3} />
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="hidden lg:flex" style={{
                    position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 100, alignItems: 'center', gap: 8,
                    background: 'white', border: '1px solid rgba(15,23,42,0.08)',
                    borderRadius: 100, padding: '8px 16px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)', pointerEvents: 'none',
                }}>
                    {STEPS.map((s, i) => (
                        <div key={s.num} style={{
                            width: activePanel === i ? 20 : 6, height: 6, borderRadius: 3,
                            background: activePanel === i ? '#3666ff' : activePanel > i ? '#00b884' : '#e2e8f0',
                            transition: 'all .4s cubic-bezier(.22,.61,.36,1)',
                        }} />
                    ))}
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.06em', marginLeft: 4 }}>
                        {STEPS[activePanel]?.num} · {STEPS[activePanel]?.short}
                    </span>
                </div>

                {/* PREV ARROW */}
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

                {/* NEXT ARROW */}
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

            {/* MOBILE — stacked vertically */}
            <div className="block lg:hidden bg-white">
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><BomCostSection /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><Section32SourceAINegotiate isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><Section33LandedCostXRay isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><Section34QuoteAIInsight isActive /></div>
            </div>

            <style>{`@keyframes qtof-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }`}</style>
        </>
    );
}
