'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InvSection31 from './InvSection31';
import InvSection32 from './InvSection32';
import InvSection33 from './InvSection33';
import InvSection34 from './InvSection34';
import InvSection35 from './InvSection35';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    { num: '01', label: 'AI Invoice Processing', short: 'Invoice' },
    { num: '02', label: 'Goods Receipt', short: 'GR' },
    { num: '03', label: 'Quality Control', short: 'QC' },
    { num: '04', label: 'Payment Validation', short: 'Payment' },
    { num: '05', label: 'Total Visibility', short: 'Visibility' },
];
const TOTAL = STEPS.length;
const SLIDE_DUR = 0.55;

const gradientBg =
    "radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), " +
    "radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), " +
    "white";

export default function InvoiceToPayFlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePanel, setActivePanel] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);

    const indexRef = useRef(0);
    const busyRef = useRef(false);
    const pinnedRef = useRef(false);
    const lastTransitionTime = useRef(0);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const apply = () => setIsDesktop(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    const goTo = useCallback((next: number) => {
        if (busyRef.current) return;
        const clamped = Math.max(0, Math.min(TOTAL - 1, next));
        if (clamped === indexRef.current) return;

        busyRef.current = true;
        const panels = gsap.utils.toArray<HTMLElement>('.itpf-panel-slide');
        const direction = clamped > indexRef.current ? 1 : -1;

        if (direction > 0) {
            const incoming = panels[clamped - 1];
            gsap.fromTo(incoming,
                { xPercent: 100 },
                {
                    xPercent: 0, duration: SLIDE_DUR, ease: 'power2.inOut',
                    onComplete: () => {
                        indexRef.current = clamped;
                        setActivePanel(clamped);
                        setTimeout(() => { busyRef.current = false; }, 50);
                    }
                }
            );
        } else {
            const outgoing = panels[indexRef.current - 1];
            gsap.to(outgoing, {
                xPercent: 100, duration: SLIDE_DUR, ease: 'power2.inOut',
                onComplete: () => {
                    indexRef.current = clamped;
                    setActivePanel(clamped);
                    setTimeout(() => { busyRef.current = false; }, 50);
                }
            });
        }
    }, []);

    const exitSection = useCallback((direction: 'forward' | 'back') => {
        const trigger = ScrollTrigger.getAll().find(st => st.pin === containerRef.current);
        if (!trigger) return;
        const target = direction === 'forward' ? trigger.end + 2 : trigger.start - 2;
        window.scrollTo({ top: target, behavior: 'smooth' });
    }, []);

    useGSAP(() => {
        if (!isDesktop || !containerRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>('.itpf-panel-slide');
        gsap.set(panels, { xPercent: 100 });
        gsap.set(gsap.utils.toArray<HTMLElement>('.itpf-panel'), { zIndex: (i: number) => i });

        ScrollTrigger.create({
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            end: '+=' + (window.innerHeight * 0.5),
            onEnter: () => { pinnedRef.current = true; },
            onLeave: () => { pinnedRef.current = false; },
            onEnterBack: () => { pinnedRef.current = true; },
            onLeaveBack: () => { pinnedRef.current = false; },
        });

        const onWheel = (e: WheelEvent) => {
            if (!pinnedRef.current) return;
            e.preventDefault();

            const now = Date.now();
            if (busyRef.current || now - lastTransitionTime.current < 750) return;

            const forward = e.deltaY > 0;
            if (forward && indexRef.current < TOTAL - 1) {
                lastTransitionTime.current = now;
                goTo(indexRef.current + 1);
            }
            else if (!forward && indexRef.current > 0) {
                lastTransitionTime.current = now;
                goTo(indexRef.current - 1);
            }
            else if (forward && indexRef.current === TOTAL - 1) {
                lastTransitionTime.current = now;
                exitSection('forward');
            }
            else if (!forward && indexRef.current === 0) {
                lastTransitionTime.current = now;
                exitSection('back');
            }
        };

        let touchStartY = 0;
        const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
        const onTouchEnd = (e: TouchEvent) => {
            if (!pinnedRef.current) return;

            const now = Date.now();
            if (busyRef.current || now - lastTransitionTime.current < 750) return;

            const delta = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(delta) < 30) return;

            if (delta > 0 && indexRef.current < TOTAL - 1) {
                lastTransitionTime.current = now;
                goTo(indexRef.current + 1);
            }
            else if (delta < 0 && indexRef.current > 0) {
                lastTransitionTime.current = now;
                goTo(indexRef.current - 1);
            }
            else if (delta > 0) {
                lastTransitionTime.current = now;
                exitSection('forward');
            }
            else {
                lastTransitionTime.current = now;
                exitSection('back');
            }
        };

        const onKey = (e: KeyboardEvent) => {
            if (!pinnedRef.current) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(indexRef.current + 1);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(indexRef.current - 1);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('keydown', onKey);
        };
    }, { dependencies: [isDesktop, goTo, exitSection], scope: containerRef });



    const navPrev = useCallback(() => goTo(indexRef.current - 1), [goTo]);
    const navNext = useCallback(() => goTo(indexRef.current + 1), [goTo]);

    return (
        <>
            {/* ── HEADING SECTION (scrolls normally above pinned area) ── */}
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

            {/* ── PINNED CONTAINER (desktop only) ── */}
            <div
                ref={containerRef}
                className="itpf-container hidden lg:block"
                style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: 'white' }}
            >
                {/* PANEL 0 */}
                <div className="itpf-panel" style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <InvSection31 isActive={activePanel === 0} />
                    </div>
                </div>

                {/* PANEL 1 */}
                <div className="itpf-panel itpf-panel-slide" style={{ position: 'absolute', inset: 0, background: gradientBg, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <InvSection32 isActive={activePanel === 1} />
                    </div>
                </div>

                {/* PANEL 2 */}
                <div className="itpf-panel itpf-panel-slide" style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <InvSection33 isActive={activePanel === 2} />
                    </div>
                </div>

                {/* PANEL 3 */}
                <div className="itpf-panel itpf-panel-slide" style={{ position: 'absolute', inset: 0, background: gradientBg, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <InvSection34 isActive={activePanel === 3} />
                    </div>
                </div>

                {/* PANEL 4 */}
                <div className="itpf-panel itpf-panel-slide" style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <InvSection35 isActive={activePanel === 4} />
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

            {/* Spacer */}
            {isDesktop && <div style={{ height: 1 }} aria-hidden="true" />}

            {/* MOBILE — stacked vertically */}
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
