'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReqSection31 from './ReqSection31';
import ReqSection32 from './ReqSection32';
import ReqSection33 from './ReqSection33';
import ReqSection34 from './ReqSection34';
import ReqSection35 from './ReqSection35';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    { num: '01', label: 'Requisition & Approval', short: 'Requisition' },
    { num: '02', label: 'Requisition to RFQ', short: 'RFQ Setup' },
    { num: '03', label: 'AI Negotiation', short: 'Negotiate' },
    { num: '04', label: 'Landed Cost Analysis', short: 'Analytics' },
    { num: '05', label: 'PO Generation', short: 'PO Output' },
];

export default function ReqToPoFlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePanel, setActivePanel] = useState(-1); // -1 = not entered; 0-4 → ReqSection31..35

    // Below lg the pinned horizontal swipe is replaced by a plain vertical stack
    // (all 5 steps one below another). Default true for SSR; corrected on mount.
    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const apply = () => setIsDesktop(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    // Expose gotoPanel so nav arrows can call it
    const gotoPanelRef = useRef<((index: number, isDown: boolean) => void) | null>(null);
    const currentIndexRef = useRef(-1);

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;
        if (!isDesktop) return; // no pin/swipe on mobile — sections stack vertically

        const panels = gsap.utils.toArray<HTMLElement>('.rtpf-panel');
        let animating = false;
        let triggerStartPx = 0;
        let triggerEndPx = 0;

        // Panels 1-4 start off-screen to the right; panel 0 (ReqSection31) is visible by default
        gsap.set('.rtpf-panel-slide', { xPercent: 100 });
        // Z-indices: later panels stack on top so they slide OVER earlier ones
        gsap.set(panels, { zIndex: (i: number) => i });

        function gotoPanel(index: number, isScrollingDown: boolean) {
            // Past the last panel (scrolling down) — release the pin into the next
            // section. Jump just past the pin end so the long pin window never
            // becomes dead scroll. Keep the last panel active as it leaves.
            if (index === panels.length && isScrollingDown) {
                intentObserver.disable();
                window.scrollTo({ top: triggerEndPx + 1 });
                return;
            }
            // Before the first panel (scrolling up) — release back to the heading.
            if (index === -1 && !isScrollingDown) {
                setActivePanel(-1);
                intentObserver.disable();
                window.scrollTo({ top: Math.max(0, triggerStartPx - 1) });
                return;
            }

            animating = true;
            const target = isScrollingDown ? panels[index] : panels[currentIndexRef.current];
            gsap.to(target, {
                xPercent: isScrollingDown ? 0 : 100,
                duration: 0.75,
                ease: 'power2.inOut',
                onComplete: () => { animating = false; },
            });

            currentIndexRef.current = index;
            setActivePanel(index);
        }

        gotoPanelRef.current = gotoPanel;

        const intentObserver = ScrollTrigger.observe({
            type: 'wheel,touch',
            onUp: () => !animating && gotoPanel(currentIndexRef.current + 1, true),
            onDown: () => !animating && gotoPanel(currentIndexRef.current - 1, false),
            wheelSpeed: -1,
            tolerance: 10,
            preventDefault: true,
            onPress: (self: any) => {
                if (ScrollTrigger.isTouch) self.event.preventDefault();
            },
        });
        intentObserver.disable();

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            // Long pin window (~1 viewport). The section is position:fixed for the
            // WHOLE window, so a fast scroll that overshoots `top top` still lands
            // INSIDE the window and stays fully on-screen — instead of leaping the
            // old 200px window in one event (firing onEnter+onLeave together) and
            // resting half-shown. The observer freezes the page the moment onEnter
            // fires; gotoPanel jumps past start/end on exit so this long window
            // never turns into dead scroll. (No snap trigger — a snap on the same
            // element fights the pin and flings scrollY past the start before it
            // can engage.)
            end: () => '+=' + window.innerHeight,
            onRefresh: (self) => { triggerStartPx = self.start; triggerEndPx = self.end; },
            onEnter: () => {
                if (currentIndexRef.current === -1) {
                    gotoPanel(0, true);
                } else {
                    setActivePanel(currentIndexRef.current);
                }
                intentObserver.enable();
            },
            onEnterBack: () => {
                // Entering from below (e.g. a reload that restored scroll to the
                // bottom, so the panels were never stepped through): start on the
                // last panel with all panels slid in, so the upward swipe has
                // somewhere to go instead of indexing past panel 0.
                if (currentIndexRef.current === -1) {
                    currentIndexRef.current = panels.length - 1;
                    gsap.set('.rtpf-panel-slide', { xPercent: 0 });
                }
                setActivePanel(currentIndexRef.current);
                intentObserver.enable();
            },
        });
        triggerStartPx = trigger.start;
        triggerEndPx = trigger.end;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                !animating && gotoPanel(currentIndexRef.current + 1, true);
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                !animating && gotoPanel(currentIndexRef.current - 1, false);
            }
        };
        window.addEventListener('keydown', onKey);

        return () => {
            trigger.kill();
            intentObserver.kill();
            window.removeEventListener('keydown', onKey);
        };
    }, [isDesktop]);

    const navPrev = useCallback(() => {
        if (gotoPanelRef.current) {
            gotoPanelRef.current(currentIndexRef.current - 1, false);
        }
    }, []);

    const navNext = useCallback(() => {
        if (gotoPanelRef.current) {
            gotoPanelRef.current(currentIndexRef.current + 1, true);
        }
    }, []);

    const navToStep = useCallback((panelIndex: number) => {
        if (!gotoPanelRef.current) return;
        const target = panelIndex;
        const isDown = target > currentIndexRef.current;
        if (Math.abs(target - currentIndexRef.current) > 1) {
            const panels = gsap.utils.toArray<HTMLElement>('.rtpf-panel');
            for (let i = Math.min(currentIndexRef.current + 1, target); i <= Math.max(currentIndexRef.current, target - 1); i++) {
                if (panels[i]) gsap.set(panels[i], { xPercent: isDown ? 0 : 100 });
            }
            currentIndexRef.current = target - 1;
        }
        gotoPanelRef.current(target, isDown);
    }, []);

    return (
        <>
            {/* ══════════════════════════════
            HEADING SECTION (above pinned area, scrolls normally)
        ══════════════════════════════ */}
            <section style={{ background: 'white', padding: '80px 24px 60px', textAlign: 'center' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '5px 14px', borderRadius: 100,
                            background: 'rgba(54,102,255,0.06)', border: '1px solid rgba(54,102,255,0.15)',
                            fontSize: 11, fontWeight: 700, color: '#3666ff',
                            marginBottom: 24, letterSpacing: '0.12em', textTransform: 'uppercase',
                            fontFamily: 'var(--font-inter)',
                        }}
                    >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3666ff', display: 'inline-block', animation: 'rtpf-pulse 2s infinite' }} />
                        The FactWise Req-to-PO Engine
                    </div>
                    <h2
                        style={{
                            fontSize: 'clamp(32px, 3.4vw, 52px)', fontWeight: 600,
                            lineHeight: 1.1, letterSpacing: '-0.035em',
                            color: '#0D1117', margin: '0 0 16px',
                            fontFamily: 'var(--font-display)',
                        }}
                    >
                        How FactWise <span style={{ color: '#3666ff' }}>Automates Every Step.</span>
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: 1.65, color: '#64748b', maxWidth: 620, margin: '0 auto', fontFamily: 'var(--font-inter)' }}>
                        From the first requisition raised to the last PO issued — intelligent at every step, automated at every turn.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════
            PINNED SWIPE CONTAINER (desktop only)
            Kept mounted always and CSS-hidden on mobile — ScrollTrigger's pin
            re-parents this node into a pin-spacer, so letting React unmount it
            throws "removeChild ... not a child of this node". The GSAP effect
            creates/reverts the pin based on isDesktop instead.
        ══════════════════════════════ */}
            <div
                ref={containerRef}
                className="rtpf-container hidden lg:block"
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    background: 'white',
                }}
            >
                {/* PANEL 0 — ReqSection31 (default visible) */}
                <div className="rtpf-panel" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <ReqSection31 isActive={activePanel === 0} />
                    </div>
                </div>

                {/* PANEL 1 — ReqSection32 (blue corner gradient — top-left) */}
                <div
                    className="rtpf-panel rtpf-panel-slide"
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background:
                            "radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), " +
                            "radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), " +
                            "white",
                        display: 'flex', alignItems: 'center', overflow: 'hidden',
                    }}
                >
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <ReqSection32 isActive={activePanel === 1} />
                    </div>
                </div>

                {/* PANEL 2 — ReqSection33 */}
                <div className="rtpf-panel rtpf-panel-slide" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <ReqSection33 isActive={activePanel === 2} />
                    </div>
                </div>

                {/* PANEL 3 — ReqSection34 (blue corner gradient — top-left) */}
                <div
                    className="rtpf-panel rtpf-panel-slide"
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background:
                            "radial-gradient(ellipse 75% 75% at 0% 0%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), " +
                            "radial-gradient(ellipse 75% 75% at 100% 100%, rgba(105,145,240,0.45), rgba(150,180,250,0.18) 35%, transparent 65%), " +
                            "white",
                        display: 'flex', alignItems: 'center', overflow: 'hidden',
                    }}
                >
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <ReqSection34 isActive={activePanel === 3} />
                    </div>
                </div>

                {/* PANEL 4 — ReqSection35 */}
                <div className="rtpf-panel rtpf-panel-slide" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
                        <ReqSection35 isActive={activePanel === 4} />
                    </div>
                </div>

                {/* ══════════════════════════════
                STEP PROGRESS BAR (bottom)
            ══════════════════════════════ */}
                <div
                    className="hidden lg:flex"
                    style={{
                        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                        zIndex: 100, alignItems: 'center', gap: 8,
                        background: 'white', border: '1px solid rgba(15,23,42,0.08)',
                        borderRadius: 100, padding: '8px 16px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        pointerEvents: 'none',
                    }}
                >
                    {STEPS.map((s, i) => (
                        <div
                            key={i}
                            style={{
                                width: activePanel === i ? 20 : 6, height: 6,
                                borderRadius: 3,
                                background: activePanel === i ? '#3666ff' : activePanel > i ? '#00b884' : '#e2e8f0',
                                transition: 'all .4s cubic-bezier(.22,.61,.36,1)',
                            }}
                        />
                    ))}
                    {activePanel >= 0 && (
                        <span style={{
                            fontSize: 10, fontWeight: 700, color: '#3666ff',
                            fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.06em',
                            marginLeft: 4,
                        }}>
                            {STEPS[activePanel]?.num} · {STEPS[activePanel]?.short}
                        </span>
                    )}
                </div>

                {/* ══════════════════════════════
                SIDE NAV ARROWS
            ══════════════════════════════ */}
                <button
                    onClick={navPrev}
                    aria-label="Previous step"
                    className="hidden lg:flex"
                    style={{
                        position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                        zIndex: 100, width: 40, height: 40, borderRadius: '50%',
                        background: 'white', border: '1px solid rgba(15,23,42,0.1)',
                        alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        transition: 'all .2s ease',
                        opacity: activePanel === 0 ? 0 : 1,
                        pointerEvents: activePanel === 0 ? 'none' : 'auto',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,102,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#3666ff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)'; (e.currentTarget as HTMLElement).style.color = '#64748b'; }}
                >
                    <ChevronLeft style={{ width: 16, height: 16, color: 'inherit' }} />
                </button>

                <button
                    onClick={navNext}
                    aria-label="Next step"
                    className="hidden lg:flex"
                    style={{
                        position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                        zIndex: 100, width: 40, height: 40, borderRadius: '50%',
                        background: activePanel === 4 ? 'rgba(0,184,132,0.1)' : 'white',
                        border: `1px solid ${activePanel === 4 ? 'rgba(0,184,132,0.3)' : 'rgba(15,23,42,0.1)'}`,
                        alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        transition: 'all .2s ease',
                        color: activePanel === 4 ? '#00b884' : '#64748b',
                    }}
                    onMouseEnter={e => { if (activePanel < 4) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,102,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#3666ff'; } }}
                    onMouseLeave={e => { if (activePanel < 4) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)'; (e.currentTarget as HTMLElement).style.color = '#64748b'; } }}
                >
                    <ChevronRight style={{ width: 16, height: 16, color: 'inherit' }} />
                </button>

            </div>

            {/* Spacer so page content after this section scrolls normally */}
            {isDesktop && <div style={{ height: 1 }} aria-hidden="true" />}

            {/* MOBILE / TABLET (<lg): all 5 steps stacked vertically, normal scroll —
            each shows its text first, then the animated dashboard below. */}
            <div className="block lg:hidden bg-[#ffffff]">
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><ReqSection31 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><ReqSection32 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><ReqSection33 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><ReqSection34 isActive /></div>
                <div style={{ width: '100%', maxWidth: 1360, margin: '0 auto', padding: '28px 24px' }}><ReqSection35 isActive /></div>
            </div>

            <style>{`
            @keyframes rtpf-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        `}</style>
        </>
    );
}
