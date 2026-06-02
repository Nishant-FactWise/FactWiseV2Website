'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RfqAnalyticsAnimation from './RfqAnalyticsAnimation';
import QuoteGenAnimation from './QuoteGenAnimation';
import BomCostAnimation from './BomCostAnimation';
import {
    Zap,
    BarChart3,
    Plus,
    MousePointer2,
    Package,
    CircleDollarSign,
    Check,
    FileText,
    RefreshCw,
    Search,
    ChevronRight,
    Users,
    Sparkles,
    Sliders,
    ArrowRight,
    Bell,
    Mail,
    Clock,
    Play,
    Pause,
    Send,
    Shield
} from 'lucide-react';

// Sourcing lifecycle animation constants
const VENDORS = [
    { id: 'v1', name: 'Vendor A', code: 'VA', x: 10, y: 32 },
    { id: 'v2', name: 'Vendor B', code: 'VB', x: 15, y: 62 },
    { id: 'v3', name: 'Vendor C', code: 'VC', x: 50, y: 72 },
    { id: 'v4', name: 'Vendor D', code: 'VD', x: 85, y: 62 },
    { id: 'v5', name: 'Vendor E', code: 'VE', x: 90, y: 32 }
];

// Approximate coordinates on the world-map image after `cover` cropping (% of container)
const GLOBAL_SUPPLIERS = [
    { code: 'VA', name: 'Vendor A', region: 'USA', x: 20, y: 42 },
    { code: 'VB', name: 'Vendor B', region: 'Mexico', x: 18, y: 56 },
    { code: 'VC', name: 'Vendor C', region: 'Germany', x: 48, y: 30 },
    { code: 'VD', name: 'Vendor D', region: 'India', x: 67, y: 53 },
    { code: 'VE', name: 'Vendor E', region: 'Singapore', x: 73, y: 64 },
    { code: 'VF', name: 'Vendor F', region: 'Japan', x: 82, y: 42 }
];

// RFQ Builder form fields (Phase 1)
const BUILDER_FIELDS = [
    { label: 'Part No.', value: 'SBM8-304-001', src: 'BOM' },
    { label: 'Description', value: 'Steel Bracket M8 · 304 SS', src: 'BOM' },
    { label: 'Quantity', value: '1,200 pcs', src: 'BOM' },
    { label: 'Target Price', value: '₹18.50/unit', src: 'PO HISTORY' },
    { label: 'Lead Time', value: '≤ 14 days', src: 'CONTRACT' },
    { label: 'Incoterm', value: 'FOB Origin', src: 'POLICY' }
];

const BUILDER_VENDORS = [
    { code: 'VA', name: 'Vendor A', tag: 'PREFERRED', score: 96 },
    { code: 'VB', name: 'Vendor B', tag: 'QUALIFIED', score: 91 },
    { code: 'VC', name: 'Vendor C', tag: 'HISTORY', score: 88 },
    { code: 'VD', name: 'Vendor D', tag: 'QUALIFIED', score: 84 },
    { code: 'VE', name: 'Vendor E', tag: 'BACKUP', score: 79 }
];

const SCHEDULE = [
    { d: 'Day 0', lbl: 'RFQ sent', ic: Send },
    { d: 'Day 2', lbl: 'Auto reminder', ic: Mail },
    { d: 'Day 4', lbl: 'Auto escalation', ic: RefreshCw },
    { d: 'Day 5', lbl: 'Quotes received', ic: Check }
];

const QUOTES = [
    { code: 'VA', name: 'Vendor A', price: 18.42, lead: '12 d' },
    { code: 'VB', name: 'Vendor B', price: 19.10, lead: '10 d' },
    { code: 'VC', name: 'Vendor C', price: 19.85, lead: '14 d' },
    { code: 'VD', name: 'Vendor D', price: 20.40, lead: '9 d' },
    { code: 'VE', name: 'Vendor E', price: 21.20, lead: '11 d' }
];

const APPROVAL_STEPS = [
    { name: 'Buyer', who: 'Priya S.', role: 'Procurement', code: 'PS' },
    { name: 'Manager', who: 'Vikram K.', role: 'Category Lead', code: 'VK' },
    { name: 'Finance', who: 'Tara S.', role: 'CFO Sign-off', code: 'TS' }
];

// ─── GSAP section IDs ─────────────────────────────────────────────────────────
// Each sub-section (3.1 – 3.4) becomes one "swipe panel" inside a single
// pinned GSAP ScrollTrigger zone.  The outer wrapper is pinned for the
// duration of all four panels; each wheel/touch tick advances one panel.
// ──────────────────────────────────────────────────────────────────────────────

export default function QuoteToOrderFlow() {

    // ── GSAP orchestration refs ──────────────────────────────────────────────
    const gsapWrapperRef = useRef<HTMLDivElement>(null); // the pinned container
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const currentIndexRef = useRef<number>(0);
    const animatingRef = useRef<boolean>(false);
    const intentObserverRef = useRef<any>(null);
    // Active section exposed to React state so child animations can react
    const [activeSection, setActiveSection] = useState<number>(0); // 0-3

    // ── Section 3.2 Sourcing Animation States ───────────────────────────────
    const [sourcingPhase, setSourcingPhase] = useState<number>(1);
    const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
    const [rfqIn, setRfqIn] = useState<boolean>(false);
    const [vendorN, setVendorN] = useState<number>(0);
    const [pingsIn, setPingsIn] = useState<boolean>(false);
    const [delivered, setDelivered] = useState<boolean>(false);
    const [schedN, setSchedN] = useState<number>(0);
    const [schedLog, setSchedLog] = useState<number>(0);
    const [quoteN, setQuoteN] = useState<number>(0);
    const [approveN, setApproveN] = useState<number>(0);
    const [chipsN, setChipsN] = useState<number>(0);
    // Phase 1: RFQ Builder progression (0..6) — 0=empty, 1=template, 2..N=fields, then vendors, then warnings
    const [builderStep, setBuilderStep] = useState<number>(0);
    const [builderVendorN, setBuilderVendorN] = useState<number>(0);
    const [builderWarn, setBuilderWarn] = useState<boolean>(false);
    // Phase 3: World-map fan-out progression
    const [mapPinsN, setMapPinsN] = useState<number>(0);
    const [mapArcs, setMapArcs] = useState<boolean>(false);
    const [mapDelivered, setMapDelivered] = useState<boolean>(false);

    // ── Section 3.1 BOM states ──────────────────────────────────────────────
    const [isBomAuto, setIsBomAuto] = useState<boolean>(true);
    const [bomMenuStep, setBomMenuStep] = useState<number | null>(null);
    const [bomPhase, setBomPhase] = useState<number>(1);

    // ── Section 3.3 Analytics states ────────────────────────────────────────
    const [analyticsPhase, setAnalyticsPhase] = useState<number>(0);
    const [isAnalyticsAuto, setIsAnalyticsAuto] = useState<boolean>(true);
    const [analyticsMenuStep, setAnalyticsMenuStep] = useState<number | null>(null);

    // ── Section 3.4 Quote states ─────────────────────────────────────────────
    const [quotePhaseAnim, setQuotePhaseAnim] = useState<number>(0);
    const [isQuoteAuto, setIsQuoteAuto] = useState<boolean>(true);
    const [quoteMenuStep, setQuoteMenuStep] = useState<number | null>(null);

    // ── GSAP: wire up pinned swipe on mount ──────────────────────────────────
    useEffect(() => {
        let gsap: any;
        let ScrollTrigger: any;

        // Dynamically import GSAP so it only runs client-side
        Promise.all([
            import('gsap'),
            import('gsap/ScrollTrigger'),
        ]).then(([gsapMod, stMod]) => {
            gsap = gsapMod.gsap;
            ScrollTrigger = stMod.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);

            const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
            if (!panels.length || !gsapWrapperRef.current) return;

            // All panels except the first start off-screen to the right
            gsap.set(panels.slice(1), { xPercent: 100 });

            // z-index layering so each incoming panel slides over the previous
            gsap.set(panels, { zIndex: (i: number) => i });

            function gotoPanel(index: number, isScrollingDown: boolean) {
                if (animatingRef.current) return;

                // If we've scrolled past the last panel or before the first,
                // release the ScrollTrigger lock so the page can continue scrolling
                if (
                    (index === panels.length && isScrollingDown) ||
                    (index === -1 && !isScrollingDown)
                ) {
                    animatingRef.current = false;
                    if (isScrollingDown) intentObserverRef.current?.disable();
                    return;
                }

                animatingRef.current = true;

                const target = isScrollingDown
                    ? panels[index]
                    : panels[currentIndexRef.current];

                gsap.to(target, {
                    xPercent: isScrollingDown ? 0 : 100,
                    duration: 0.75,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        animatingRef.current = false;
                    },
                });

                currentIndexRef.current = index;
                setActiveSection(index);   // ← triggers React child re-renders / animations
            }

            // Create the observer but start disabled
            intentObserverRef.current = ScrollTrigger.observe({
                type: 'wheel,touch',
                onUp: () => !animatingRef.current && gotoPanel(currentIndexRef.current + 1, true),
                onDown: () => !animatingRef.current && gotoPanel(currentIndexRef.current - 1, false),
                wheelSpeed: -1,
                tolerance: 10,
                preventDefault: true,
                onPress: (self: any) => {
                    if (ScrollTrigger.isTouch) self.event.preventDefault();
                },
            });
            intentObserverRef.current.disable();

            // Pin the whole wrapper for exactly the total "scroll distance"
            // needed to swipe through all panels once (panels.length - 1 ticks)
            ScrollTrigger.create({
                trigger: gsapWrapperRef.current,
                pin: true,
                start: 'top top',
                end: `+=${(panels.length - 1) * 1}`,   // minimal end — observer drives transitions
                onEnter: () => {
                    intentObserverRef.current?.enable();
                    gotoPanel(currentIndexRef.current + 1, true);
                },
                onEnterBack: () => {
                    intentObserverRef.current?.enable();
                    gotoPanel(currentIndexRef.current - 1, false);
                },
            });
        });

        return () => {
            // Cleanup on unmount
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach((t: any) => t.kill());
            });
            intentObserverRef.current?.kill();
        };
    }, []);

    // ── When activeSection changes, kick off that panel's inner animation ───
    useEffect(() => {
        // Section 3.1 — restart BOM auto-animation when panel becomes visible
        if (activeSection === 0) {
            setIsBomAuto(true);
            setBomMenuStep(null);
        }
        // Section 3.2 — restart sourcing cycle
        if (activeSection === 1) {
            setIsAutoCycling(true);
        }
        // Section 3.3 — restart analytics
        if (activeSection === 2) {
            setIsAnalyticsAuto(true);
            setAnalyticsMenuStep(null);
        }
        // Section 3.4 — restart quote gen
        if (activeSection === 3) {
            setIsQuoteAuto(true);
            setQuoteMenuStep(null);
        }
    }, [activeSection]);

    // ── Section 3.2 Auto-cycling timeline ────────────────────────────────────
    useEffect(() => {
        if (!isAutoCycling) return;
        let cancel = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        async function runTimeline() {
            while (!cancel && isAutoCycling) {
                // ── reset all state ──────────────────────────────────
                setSourcingPhase(1); setRfqIn(false); setVendorN(0);
                setPingsIn(false); setDelivered(false); setSchedN(0);
                setSchedLog(0); setQuoteN(0); setApproveN(0); setChipsN(0);
                setBuilderStep(0); setBuilderVendorN(0); setBuilderWarn(false);
                setMapPinsN(0); setMapArcs(false); setMapDelivered(false);
                await sleep(400);

                // ── PHASE 1: Intelligent RFQ Creation (builder) ─────
                if (cancel) return;
                // 1: template chosen
                setBuilderStep(1); await sleep(450);
                // 2..7: form fields auto-fill one by one
                for (let i = 2; i <= 1 + BUILDER_FIELDS.length; i++) {
                    if (cancel) return;
                    setBuilderStep(i);
                    await sleep(280);
                }
                // vendors auto-select
                for (let i = 1; i <= BUILDER_VENDORS.length; i++) {
                    if (cancel) return;
                    setBuilderVendorN(i);
                    await sleep(160);
                }
                await sleep(400);
                if (cancel) return;
                setBuilderWarn(true);
                await sleep(2000);

                // ── PHASE 2: Auto-Routed Digital Approvals ──────────
                if (cancel) return;
                setSourcingPhase(2);
                await sleep(500);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setApproveN(i);
                    await sleep(700);
                }
                await sleep(2200);

                // ── PHASE 3: Automated Supplier Fan-Out (world map) ─
                if (cancel) return;
                setSourcingPhase(3);
                setApproveN(0);
                await sleep(400);
                for (let i = 1; i <= GLOBAL_SUPPLIERS.length; i++) {
                    if (cancel) return;
                    setMapPinsN(i);
                    await sleep(180);
                }
                await sleep(250);
                if (cancel) return;
                setMapArcs(true);
                await sleep(1300);
                if (cancel) return;
                setMapDelivered(true);
                await sleep(1800);

                // ── PHASE 4: Inbox-Decoupled Auto Follow-Ups ────────
                if (cancel) return;
                setSourcingPhase(4);
                await sleep(500);
                for (let i = 1; i <= 4; i++) {
                    if (cancel) return;
                    setSchedN(i);
                    await sleep(150);
                    setSchedLog(Math.min(i, 3));
                    await sleep(500);
                }
                await sleep(2000);
            }
        }

        runTimeline();
        return () => { cancel = true; };
    }, [isAutoCycling]);

    // ── Manual phase helpers (Section 3.2) ───────────────────────────────────
    const setPhaseManual = (targetPhase: number) => {
        setIsAutoCycling(false);
        setSourcingPhase(targetPhase);
        if (targetPhase === 1) {
            // Final state of the builder scene
            setBuilderStep(1 + BUILDER_FIELDS.length);
            setBuilderVendorN(BUILDER_VENDORS.length);
            setBuilderWarn(true);
            setApproveN(0); setMapPinsN(0); setMapArcs(false); setMapDelivered(false);
            setSchedN(0); setSchedLog(0);
        } else if (targetPhase === 2) {
            setApproveN(3);
            setMapPinsN(0); setMapArcs(false); setMapDelivered(false);
            setSchedN(0); setSchedLog(0);
        } else if (targetPhase === 3) {
            setApproveN(0);
            setMapPinsN(GLOBAL_SUPPLIERS.length); setMapArcs(true); setMapDelivered(true);
            setSchedN(0); setSchedLog(0);
        } else if (targetPhase === 4) {
            setApproveN(0);
            setMapPinsN(0); setMapArcs(false); setMapDelivered(false);
            setSchedN(4); setSchedLog(3);
        }
    };

    // ── Manual helpers (Section 3.1) ─────────────────────────────────────────
    const setBomManual = (n: number) => {
        setIsBomAuto(false);
        setBomMenuStep(n);
    };

    // ── BOM step active/done (Section 3.1) ───────────────────────────────────
    const isBomStepActive = (n: number) => bomPhase === n;
    const isBomStepDone = (n: number) => bomPhase > n;

    // ── Analytics helpers (Section 3.3) ──────────────────────────────────────
    const setAnalyticsManual = (menuPhase: number) => {
        setIsAnalyticsAuto(false);
        setAnalyticsMenuStep(menuPhase);
        if (menuPhase === 1) setAnalyticsPhase(1);
        else if (menuPhase === 2) setAnalyticsPhase(7);
        else if (menuPhase === 3) setAnalyticsPhase(8);
        else if (menuPhase === 4) setAnalyticsPhase(9);
    };

    const isMenuStepActive = (itemPhase: number) => {
        if (!isAnalyticsAuto && analyticsMenuStep !== null) return analyticsMenuStep === itemPhase;
        // Step 1: vendor bids arrive (phases 1-2)
        if (itemPhase === 1) return analyticsPhase >= 1 && analyticsPhase <= 2;
        // Step 2: custom landed cost formula (phases 3-7)
        if (itemPhase === 2) return analyticsPhase >= 3 && analyticsPhase <= 7;
        // Step 3: categorise vendor performance (phase 8)
        if (itemPhase === 3) return analyticsPhase === 8;
        // Step 4: AI Recommended best bid (phase 9+)
        if (itemPhase === 4) return analyticsPhase >= 9;
        return false;
    };

    const isMenuStepDone = (itemPhase: number) => {
        if (!isAnalyticsAuto && analyticsMenuStep !== null) return itemPhase < analyticsMenuStep;
        if (itemPhase === 1) return analyticsPhase > 2;
        if (itemPhase === 2) return analyticsPhase > 7;
        if (itemPhase === 3) return analyticsPhase > 8;
        if (itemPhase === 4) return analyticsPhase > 9;
        return false;
    };

    // ── Quote helpers (Section 3.4) ───────────────────────────────────────────
    const setQuoteManual = (menuPhase: number) => {
        setIsQuoteAuto(false);
        setQuoteMenuStep(menuPhase);
        if (menuPhase === 1) setQuotePhaseAnim(1);
        else if (menuPhase === 2) setQuotePhaseAnim(5);
        else if (menuPhase === 3) setQuotePhaseAnim(6);
        else if (menuPhase === 4) setQuotePhaseAnim(7);
    };

    const isQuoteMenuStepActive = (itemPhase: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) return quoteMenuStep === itemPhase;
        if (itemPhase === 1) return quotePhaseAnim >= 1 && quotePhaseAnim <= 4;
        if (itemPhase === 2) return quotePhaseAnim === 5;
        if (itemPhase === 3) return quotePhaseAnim === 6;
        if (itemPhase === 4) return quotePhaseAnim >= 7;
        return false;
    };

    const isQuoteMenuStepDone = (itemPhase: number) => {
        if (!isQuoteAuto && quoteMenuStep !== null) return itemPhase < quoteMenuStep;
        if (itemPhase === 1) return quotePhaseAnim > 4;
        if (itemPhase === 2) return quotePhaseAnim > 5;
        if (itemPhase === 3) return quotePhaseAnim > 6;
        return false;
    };

    // ── go-to-solution-step event bridge ─────────────────────────────────────
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleGoToStep = (e: Event) => {
            const step = (e as CustomEvent).detail.step;
            if (step === 1) setBomManual(1);
            else if (step === 2) setPhaseManual(1);
            else if (step === 3) setAnalyticsManual(1);
            else if (step === 4) setQuoteManual(1);
        };
        window.addEventListener('go-to-solution-step', handleGoToStep);
        return () => window.removeEventListener('go-to-solution-step', handleGoToStep);
    }, []);

    // ── Shared step-list renderer ─────────────────────────────────────────────
    const StepListItem = ({
        step, title, isActive, isDone, onClick
    }: { step: number; title: string; isActive: boolean; isDone: boolean; onClick: () => void }) => (
        <div
            onClick={onClick}
            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${isActive
                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                }`}
        >
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
            )}
            <div className="flex items-center gap-4 relative z-10">
                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${isActive
                        ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                        : isDone
                            ? 'border-[#00b884] bg-[#00b884] text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                    }`}>
                    <Check className="size-3.5" strokeWidth={3} />
                </div>
                <span className={`text-[13.5px] font-bold tracking-tight ${isActive ? 'text-[#3666ff]' : isDone ? 'text-slate-700' : 'text-slate-500'
                    }`}>
                    {title}
                </span>
            </div>
            {isActive && (
                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                </span>
            )}
        </div>
    );

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <section className="relative overflow-hidden bg-white">

            {/* ── Unified Main Header (outside pinned zone) ────────────────── */}
            <div className="mx-auto max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6 py-24">
                <div className="mb-0">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        The FactWise Ecosystem
                    </div>
                    <h2 className="text-[36px] md:text-[48px] font-semibold text-[#0D1117] mb-6 tracking-[-0.03em] leading-[1.1] max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Four core capabilities that <br />
                        <span className="text-[#3666ff]">change everything</span> about procurement.
                    </h2>
                    <p className="text-[17px] md:text-[18px] text-slate-400 font-normal max-w-2xl leading-[1.65]" style={{ fontFamily: 'var(--font-inter)' }}>
                        Built specifically for complex manufacturing and high-volume direct spend.
                        A complete end-to-end lifecycle that replaces fragmented silos with intelligent automation.
                    </p>
                </div>
            </div>

            {/*
            ════════════════════════════════════════════════════════════════════
              GSAP PINNED WRAPPER
              ─ This div is pinned to the viewport by ScrollTrigger.
              ─ Inside it are 4 absolute-positioned panels (one per section).
              ─ The observer swipes between them horizontally (xPercent).
            ════════════════════════════════════════════════════════════════════
            */}
            <div
                ref={gsapWrapperRef}
                className="swipe-section"
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {/* ── SECTION PROGRESS INDICATOR (top-right) ─────────────── */}
                <div
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full px-4 py-2 shadow-sm select-none"
                    style={{ fontFamily: 'var(--font-inter)' }}
                >
                    {['BOM', 'Sourcing', 'Analytics', 'Quotes'].map((label, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                // Manual jump via GSAP — handled by direct xPercent animation
                                // This is a UX affordance; full GSAP jump logic is in useEffect above
                                const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
                                if (!panels.length || animatingRef.current) return;

                                import('gsap').then(({ gsap }) => {
                                    const curr = currentIndexRef.current;
                                    if (i === curr) return;

                                    animatingRef.current = true;
                                    const isForward = i > curr;

                                    if (isForward) {
                                        // Snap all skipped panels to right first
                                        for (let j = curr + 1; j <= i; j++) {
                                            if (j !== i) gsap.set(panels[j], { xPercent: 100 });
                                        }
                                        gsap.to(panels[i], {
                                            xPercent: 0, duration: 0.75, ease: 'power3.inOut',
                                            onComplete: () => { animatingRef.current = false; }
                                        });
                                    } else {
                                        for (let j = curr; j > i; j--) {
                                            if (j !== curr) gsap.set(panels[j], { xPercent: 100 });
                                        }
                                        gsap.to(panels[curr], {
                                            xPercent: 100, duration: 0.75, ease: 'power3.inOut',
                                            onComplete: () => { animatingRef.current = false; }
                                        });
                                    }

                                    currentIndexRef.current = i;
                                    setActiveSection(i);
                                });
                            }}
                            className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${activeSection === i
                                    ? 'bg-[#3666ff] text-white'
                                    : 'text-slate-400 hover:text-slate-700'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── SCROLL NUDGE (bottom-center) ─────────────────────────── */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 pointer-events-none select-none opacity-60">
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                        {activeSection < 3 ? 'Scroll to advance' : 'Scroll to continue'}
                    </span>
                    <div className="flex flex-col items-center gap-0.5">
                        {[0, 1, 2].map(i => (
                            <span key={i} className="w-px bg-slate-300 animate-pulse" style={{ height: 6, animationDelay: `${i * 0.15}s` }} />
                        ))}
                    </div>
                </div>

                {/*
                ══════════════════════════════════════════════════════════════
                  PANEL 0 — SECTION 3.1 — BOM & Cost Intelligence
                ══════════════════════════════════════════════════════════════
                */}
                <div
                    id="section-3-1"
                    ref={el => { panelRefs.current[0] = el; }}
                    className="panel"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
                >
                    <div className="h-full w-full flex items-center">
                        <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6">
                            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                                {/* Text Left */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: activeSection === 0 ? 1 : 0, x: activeSection === 0 ? 0 : -20 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="lg:col-span-6 space-y-6 text-left"
                                >
                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                                        BOM & Cost Intelligence
                                    </div>
                                    <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                                        Know Your BOM. Know Your Costs<br />
                                        <span className="text-[#3666ff]">Before You Source.</span>
                                    </h3>
                                    <p className="text-slate-500 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Build complex multi-level BOMs with alternates across multiple finished goods in a single import. FactWise instantly surfaces accurate line-item costs using distributor prices, past PO rates, historical quotes, and contract pricing before any RFQ is sent.
                                    </p>
                                    <p className="text-slate-500 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Track every BOM revision automatically, compare versions side by side, and use AI to get instant answers on cost changes and sourcing insights — without digging through spreadsheets.
                                    </p>

                                    <div className="flex flex-col gap-2 mt-8 text-left">
                                        {[
                                            { step: 1, title: "BOM Upload & Auto-Parse" },
                                            { step: 2, title: "Multi-Level BOM with Alternates" },
                                            { step: 3, title: "Line-Level Cost Intelligence" },
                                            { step: 4, title: "Revision Tracking & Diff View" },
                                        ].map((item) => (
                                            <StepListItem
                                                key={item.step}
                                                step={item.step}
                                                title={item.title}
                                                isActive={isBomStepActive(item.step)}
                                                isDone={isBomStepDone(item.step)}
                                                onClick={() => setBomManual(item.step)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Graphic Right */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: activeSection === 0 ? 1 : 0, scale: activeSection === 0 ? 1 : 0.96 }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
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
                        </div>
                    </div>
                </div>

                {/*
                ══════════════════════════════════════════════════════════════
                  PANEL 1 — SECTION 3.2 — Intelligent Sourcing
                ══════════════════════════════════════════════════════════════
                */}
                <div
                    id="section-3-2"
                    ref={el => { panelRefs.current[1] = el; }}
                    className="panel x-100"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                    .p2-stage {
                      flex: 1;
                      background: #fbfcfe;
                      border: 1px solid rgba(15,23,42,0.06);
                      border-radius: 16px;
                      padding: 18px;
                      position: relative;
                      overflow: hidden;
                      min-height: 380px;
                    }
                    .p2-scene {
                      position: absolute;
                      inset: 18px;
                      opacity: 0;
                      transition: opacity .4s ease;
                      pointer-events: none;
                    }
                    .p2-scene.on { opacity: 1; pointer-events: auto; }
                    .p2-stageFan { position: absolute; inset: 0; }
                    .p2-rfq {
                      position: absolute; left: 50%; top: 8px; width: 200px;
                      padding: 12px 14px; background: white;
                      border: 1px solid rgba(54,102,255,0.25); border-radius: 12px;
                      transform: translateX(-50%) scale(0.85); opacity: 0;
                      box-shadow: 0 10px 25px -8px rgba(54,102,255,0.25);
                      transition: all .55s cubic-bezier(.22,.61,.36,1); z-index: 4;
                    }
                    .p2-rfq.in { transform: translateX(-50%) scale(1); opacity: 1; }
                    .p2-rfq::after {
                      content: ""; position: absolute; inset: -4px; border-radius: 16px;
                      border: 1.5px solid rgba(54,102,255,0.2);
                      animation: p2-ring 2.4s ease-out infinite; opacity: 0; pointer-events: none;
                    }
                    .p2-rfq.in::after { opacity: 1; }
                    @keyframes p2-ring {
                      0% { transform: scale(0.94); opacity: 0.7; }
                      100% { transform: scale(1.12); opacity: 0; }
                    }
                    .p2-rfq .rh { display: flex; justify-content: space-between; align-items: center; }
                    .p2-rfq .rh .tag { font-family: 'JetBrains Mono',monospace; font-size: 9px; font-weight: 800; color: #3666ff; letter-spacing: 0.06em; }
                    .p2-rfq .rh .live { font-size: 9px; font-weight: 700; color: #00b884; display: flex; align-items: center; gap: 4px; }
                    .p2-rfq .rh .live::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #00b884; }
                    .p2-rfq .rtitle { font-size: 12px; font-weight: 800; color: #0b1322; margin-top: 6px; letter-spacing: -0.015em; line-height: 1.2; }
                    .p2-rfq .rmeta { font-size: 10px; color: #64748b; margin-top: 3px; display: flex; gap: 12px; }
                    .p2-rfq .rmeta b { color: #0b1322; font-weight: 700; }
                    .p2-vendor {
                      position: absolute; width: 130px; padding: 10px 12px; background: white;
                      border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
                      transform: scale(0.7); opacity: 0;
                      transition: all .55s cubic-bezier(.22,.61,.36,1); z-index: 3;
                    }
                    .p2-vendor.in { transform: scale(1); opacity: 1; }
                    .p2-vendor.delivered { border-color: rgba(0,184,132,0.3); background: #f6fcf9; }
                    .p2-vendor .vh { display: flex; align-items: center; gap: 7px; }
                    .p2-vendor .vlogo { width: 24px; height: 24px; border-radius: 6px; display: grid; place-items: center; background: linear-gradient(135deg, #475569, #64748b); color: white; font-size: 10px; font-weight: 800; flex-shrink: 0; }
                    .p2-vendor .vname { font-size: 11px; font-weight: 700; color: #0b1322; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                    .p2-vendor .vmeta { font-size: 9.5px; color: #94a3b8; margin-top: 6px; display: flex; align-items: center; gap: 5px; font-family: 'JetBrains Mono',monospace; font-weight: 600; }
                    .p2-vendor .vdot { width: 5px; height: 5px; border-radius: 50%; background: #cbd5e1; transition: all .3s ease; }
                    .p2-vendor.delivered .vmeta { color: #00b884; }
                    .p2-vendor.delivered .vdot { background: #00b884; }
                    .p2-fanEdges { position: absolute; inset: 0; pointer-events: none; }
                    .p2-fanEdges svg { width: 100%; height: 100%; overflow: visible; }
                    .p2-fanEdges path { fill: none; stroke: #3666ff; stroke-width: 1.2; stroke-opacity: 0.4; stroke-dasharray: 4 4; stroke-dashoffset: 200; transition: stroke-dashoffset .6s ease, stroke .3s ease; }
                    .p2-fanEdges path.in { stroke-dashoffset: 0; animation: p2-flow 1.2s linear infinite; }
                    @keyframes p2-flow { to { stroke-dashoffset: -16; } }
                    .p2-fanEdges path.delivered { stroke: #00b884; stroke-opacity: 0.55; }
                    .p2-sched { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px; }
                    .p2-schedTrack { position: relative; background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 14px; padding: 24px 20px 20px; }
                    .p2-schedLine { position: absolute; left: 36px; right: 36px; top: 48px; height: 2px; background: #e2e8f0; border-radius: 2px; }
                    .p2-schedLine::after { content: ""; position: absolute; left: 0; top: 0; height: 100%; width: var(--p, 0%); background: #3666ff; border-radius: 2px; transition: width .8s ease; }
                    .p2-schedStops { position: relative; display: flex; justify-content: space-between; margin: 0 8px; }
                    .p2-schedStop { display: flex; flex-direction: column; align-items: center; gap: 7px; position: relative; z-index: 2; }
                    .p2-schedDot { width: 18px; height: 18px; border-radius: 50%; background: white; border: 2px solid #cbd5e1; display: grid; place-items: center; transition: all .35s cubic-bezier(.34,1.56,.64,1); }
                    .p2-schedDot.fired { background: #3666ff; border-color: #3666ff; box-shadow: 0 0 0 4px rgba(54,102,255,0.15); }
                    .p2-schedDot.fired svg { color: white; }
                    .p2-schedDot.done { background: #00b884; border-color: #00b884; box-shadow: 0 0 0 4px rgba(0,184,132,0.15); }
                    .p2-schedLbl { font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 0.04em; font-family: 'JetBrains Mono',monospace; }
                    .p2-schedSub { font-size: 10px; color: #64748b; text-align: center; max-width: 80px; line-height: 1.3; }
                    .p2-schedStop.fired .p2-schedLbl { color: #3666ff; }
                    .p2-schedStop.done  .p2-schedLbl { color: #00b884; }
                    .p2-schedLog { display: flex; flex-direction: column; gap: 8px; flex: 1; min-height: 0; }
                    .p2-logRow { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 10px; font-size: 11px; color: #475569; opacity: 0; transform: translateY(6px); transition: all .35s ease; }
                    .p2-logRow.in { opacity: 1; transform: translateY(0); }
                    .p2-logRow .lic { width: 24px; height: 24px; border-radius: 6px; background: rgba(54,102,255,0.1); color: #3666ff; display: grid; place-items: center; flex-shrink: 0; }
                    .p2-logRow .lt { flex: 1; }
                    .p2-logRow .lt b { color: #0b1322; font-weight: 700; }
                    .p2-logRow .lm { font-family: 'JetBrains Mono',monospace; font-size: 10px; color: #94a3b8; }
                    .p2-approve { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; }
                    .p2-approveHeader { display: flex; align-items: center; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid rgba(15,23,42,0.06); }
                    .p2-approveHeader .ah-left { display: flex; align-items: center; gap: 8px; }
                    .p2-approveHeader .ah-dot { width: 7px; height: 7px; border-radius: 50%; background: #3666ff; animation: p2-pulse 1.6s ease-in-out infinite; }
                    .p2-approveHeader .ah-title { font-size: 11px; font-weight: 700; color: #475569; }
                    .p2-approveHeader .ah-badge { font-family: 'JetBrains Mono',monospace; font-size: 10px; font-weight: 700; color: #00b884; opacity: 0; transition: opacity .4s ease; }
                    .p2-approveHeader .ah-badge.in { opacity: 1; }
                    .p2-acard { background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px; padding: 11px 13px; display: flex; align-items: center; gap: 11px; opacity: 0; transform: translateY(8px); transition: all .45s cubic-bezier(.22,.61,.36,1); position: relative; overflow: hidden; }
                    .p2-acard.in { opacity: 1; transform: translateY(0); }
                    .p2-acard.done { border-color: rgba(0,184,132,0.3); background: linear-gradient(to right, #f6fcf9, white); }
                    .p2-acard .ac-av { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-size: 9px; font-weight: 800; color: white; flex-shrink: 0; }
                    .p2-acard .ac-body { flex: 1; min-width: 0; }
                    .p2-acard .ac-name { font-size: 11px; font-weight: 800; color: #0b1322; letter-spacing: -0.01em; }
                    .p2-acard .ac-role { font-size: 9.5px; color: #94a3b8; font-family: 'JetBrains Mono',monospace; letter-spacing: 0.04em; margin-top: 1px; }
                    .p2-acard .ac-amt { font-family: 'JetBrains Mono',monospace; font-size: 11px; font-weight: 800; color: #0b1322; white-space: nowrap; }
                    .p2-acard .ac-stamp { display: flex; align-items: center; gap: 5px; font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 9px; border-radius: 6px; flex-shrink: 0; transition: all .4s ease; }
                    .p2-acard .ac-stamp.pending { background: #f1f5f9; color: #94a3b8; }
                    .p2-acard .ac-stamp.approved { background: rgba(0,184,132,0.12); color: #00b884; }
                    .p2-cap { position: absolute; left: 18px; bottom: 14px; right: 18px; font-size: 12px; font-weight: 600; color: #64748b; line-height: 1.5; display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border: 1px solid rgba(15,23,42,0.08); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); transition: opacity .35s ease, transform .35s ease; opacity: 0; transform: translateY(10px); pointer-events: none; }
                    .p2-cap.on { opacity: 1; transform: translateY(0); }
                    .p2-cap .cd { width: 5px; height: 5px; border-radius: 50%; background: #3666ff; flex-shrink: 0; animation: p2-pulse 1.6s ease-in-out infinite; }
                    @keyframes p2-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }

                    /* ── PHASE 1: RFQ BUILDER ───────────────────────── */
                    .p2-builder { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; }
                    .p2-bHeader { display: flex; align-items: center; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid rgba(15,23,42,0.06); }
                    .p2-bHeader .bh-left { display: flex; align-items: center; gap: 8px; }
                    .p2-bHeader .bh-dot { width: 7px; height: 7px; border-radius: 50%; background: #3666ff; animation: p2-pulse 1.6s ease-in-out infinite; }
                    .p2-bHeader .bh-title { font-size: 11px; font-weight: 700; color: #475569; }
                    .p2-tpl { display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border-radius: 999px; background: rgba(54,102,255,0.08); color: #3666ff; font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0; transform: translateY(-4px); transition: all .35s ease; font-family: 'JetBrains Mono',monospace; }
                    .p2-tpl.in { opacity: 1; transform: translateY(0); }
                    .p2-tpl .tpl-dot { width: 5px; height: 5px; border-radius: 50%; background: #3666ff; }
                    .p2-bGrid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 10px; flex: 1; min-height: 0; }
                    .p2-bCard { background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; overflow: hidden; }
                    .p2-bCardTitle { font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'JetBrains Mono',monospace; }
                    .p2-bRow { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 5px 0; border-bottom: 1px dashed rgba(15,23,42,0.06); opacity: 0; transform: translateY(4px); transition: all .35s cubic-bezier(.22,.61,.36,1); }
                    .p2-bRow.in { opacity: 1; transform: translateY(0); }
                    .p2-bRow:last-child { border-bottom: none; }
                    .p2-bRowLbl { font-size: 10px; color: #64748b; font-weight: 600; flex-shrink: 0; }
                    .p2-bRowVal { font-size: 11px; color: #0b1322; font-weight: 700; text-align: right; display: flex; align-items: center; gap: 6px; min-width: 0; }
                    .p2-bRowVal .vtext { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                    .p2-bSrc { font-size: 8.5px; font-weight: 800; color: #00b884; background: rgba(0,184,132,0.1); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono',monospace; letter-spacing: 0.05em; flex-shrink: 0; }
                    .p2-bSrc.po { color: #3666ff; background: rgba(54,102,255,0.1); }
                    .p2-bSrc.cn { color: #a16207; background: rgba(245,158,11,0.12); }
                    .p2-bSrc.pol { color: #7c3aed; background: rgba(124,58,237,0.1); }
                    .p2-bVendor { display: flex; align-items: center; gap: 8px; padding: 6px 8px; background: #f8fafc; border: 1px solid transparent; border-radius: 8px; opacity: 0; transform: translateX(-6px); transition: all .35s cubic-bezier(.22,.61,.36,1); }
                    .p2-bVendor.in { opacity: 1; transform: translateX(0); background: white; border-color: rgba(54,102,255,0.15); }
                    .p2-bVAv { width: 22px; height: 22px; border-radius: 6px; display: grid; place-items: center; font-size: 9px; font-weight: 800; color: white; background: linear-gradient(135deg, #475569, #64748b); flex-shrink: 0; }
                    .p2-bVName { font-size: 10.5px; font-weight: 700; color: #0b1322; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                    .p2-bVTag { font-size: 8px; font-weight: 800; padding: 2px 5px; border-radius: 4px; font-family: 'JetBrains Mono',monospace; letter-spacing: 0.04em; flex-shrink: 0; }
                    .p2-bVTag.preferred { color: #3666ff; background: rgba(54,102,255,0.12); }
                    .p2-bVTag.qualified { color: #0f766e; background: rgba(20,184,166,0.12); }
                    .p2-bVTag.history { color: #7c3aed; background: rgba(124,58,237,0.12); }
                    .p2-bVTag.backup { color: #64748b; background: rgba(100,116,139,0.12); }
                    .p2-bVScore { font-size: 9px; font-weight: 800; color: #00b884; font-family: 'JetBrains Mono',monospace; flex-shrink: 0; }
                    .p2-bWarn { display: flex; gap: 6px; padding: 6px 8px; border-radius: 8px; background: rgba(245,158,11,0.08); border: 1px dashed rgba(245,158,11,0.35); align-items: center; opacity: 0; transform: translateY(4px); transition: all .35s ease; }
                    .p2-bWarn.in { opacity: 1; transform: translateY(0); }
                    .p2-bWarn .wic { width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; background: #f59e0b; color: white; flex-shrink: 0; font-size: 10px; font-weight: 900; }
                    .p2-bWarn .wtxt { font-size: 10px; color: #92400e; font-weight: 600; }

                    /* ── PHASE 3: WORLD MAP FAN-OUT ─────────────────── */
                    .p2-map { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; }
                    .p2-mapHdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 6px; border-bottom: 1px solid rgba(15,23,42,0.06); }
                    .p2-mapHdr .mh-left { display: flex; align-items: center; gap: 8px; }
                    .p2-mapHdr .mh-dot { width: 7px; height: 7px; border-radius: 50%; background: #3666ff; animation: p2-pulse 1.6s ease-in-out infinite; }
                    .p2-mapHdr .mh-title { font-size: 11px; font-weight: 700; color: #475569; }
                    .p2-mapHdr .mh-count { font-family: 'JetBrains Mono',monospace; font-size: 10px; font-weight: 800; color: #3666ff; letter-spacing: 0.04em; }
                    .p2-mapHdr .mh-count.done { color: #00b884; }
                    .p2-mapStage { flex: 1; position: relative; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); border-radius: 12px; border: 1px solid rgba(15,23,42,0.05); overflow: hidden; min-height: 0; }
                    .p2-mapBg { position: absolute; inset: 0; background-image: url('/images/world-map.png'); background-repeat: no-repeat; background-position: center; background-size: cover; opacity: 0.75; }
                    .p2-mapHub { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #1e3a8a, #3666ff); color: white; display: grid; place-items: center; box-shadow: 0 6px 20px rgba(54,102,255,0.4), 0 0 0 6px rgba(54,102,255,0.12); z-index: 4; font-size: 9px; font-weight: 900; letter-spacing: 0.04em; font-family: 'JetBrains Mono',monospace; }
                    .p2-mapHub::after { content: ""; position: absolute; inset: -8px; border-radius: 50%; border: 1.5px solid rgba(54,102,255,0.35); animation: p2-ring 2.4s ease-out infinite; }
                    .p2-mapArcs { position: absolute; inset: 0; pointer-events: none; }
                    .p2-mapArcs svg { width: 100%; height: 100%; overflow: visible; }
                    .p2-mapArcs path { fill: none; stroke: #3666ff; stroke-width: 0.55; stroke-opacity: 0; stroke-linecap: round; stroke-dasharray: 0.001 4; stroke-dashoffset: 200; transition: stroke-opacity .4s ease, stroke-dashoffset .8s ease, stroke .35s ease; }
                    .p2-mapArcs path.in { stroke-opacity: 0.9; stroke-dashoffset: 0; animation: p2-mapFlow 1.1s linear infinite; }
                    .p2-mapArcs path.delivered { stroke: #00b884; stroke-opacity: 0.95; }
                    @keyframes p2-mapFlow { to { stroke-dashoffset: -8; } }
                    .p2-mapPin { position: absolute; transform: translate(-50%, -50%) scale(0.6); opacity: 0; transition: all .55s cubic-bezier(.34,1.56,.64,1); z-index: 3; }
                    .p2-mapPin.in { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    .p2-mapPin .pinDot { position: relative; width: 12px; height: 12px; margin: 0 auto; border-radius: 50%; background: #3666ff; box-shadow: 0 0 0 4px rgba(54,102,255,0.18); transition: all .35s ease; }
                    .p2-mapPin.delivered .pinDot { background: #00b884; box-shadow: 0 0 0 4px rgba(0,184,132,0.22); }
                    .p2-mapPin .pinDot::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 1.5px solid rgba(54,102,255,0.4); animation: p2-ring 2.2s ease-out infinite; }
                    .p2-mapPin.delivered .pinDot::after { border-color: rgba(0,184,132,0.45); }
                    .p2-mapLbl { margin-top: 5px; padding: 2px 6px; background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); border: 1px solid rgba(15,23,42,0.08); border-radius: 5px; font-size: 8.5px; font-weight: 700; color: #0b1322; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 4px; font-family: 'Inter', sans-serif; letter-spacing: -0.01em; }
                    .p2-mapLbl .lblCode { font-family: 'JetBrains Mono',monospace; color: #3666ff; font-size: 7px; letter-spacing: 0.05em; font-weight: 800; }
                    .p2-mapPin.delivered .p2-mapLbl .lblCode { color: #00b884; }
                    .p2-mapLbl .lblStatus { width: 5px; height: 5px; border-radius: 50%; background: #cbd5e1; }
                    .p2-mapPin.in .p2-mapLbl .lblStatus { background: #3666ff; }
                    .p2-mapPin.delivered .p2-mapLbl .lblStatus { background: #00b884; }
                    ` }} />

                    <div className="h-full w-full flex items-center">
                        <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6">
                            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                                {/* Graphic Left */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: activeSection === 1 ? 1 : 0, scale: activeSection === 1 ? 1 : 0.96 }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    className="lg:col-span-6 order-2 lg:order-1 relative"
                                >
                                    <div className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col justify-between select-none" style={{ height: '514px', minHeight: '514px', maxHeight: '514px' }}>
                                        {/* TOP BAR */}
                                        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <span className="text-[12px] font-bold text-slate-800 tracking-tight shrink-0">Sourcing Hub</span>
                                                    <span className="text-slate-300 text-[10px]">/</span>
                                                    <span className="text-[11px] font-medium text-slate-500 truncate">RFQ-2026-0871 · Steel Bracket M8</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                                                <span className={`size-1.5 rounded-full ${isAutoCycling ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                                <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                                                    {isAutoCycling ? 'Auto-Pilot' : 'Manual'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* STAGE SCREEN */}
                                        <div className="p2-stage">
                                            {/* SCENE 1: INTELLIGENT RFQ CREATION (BUILDER) */}
                                            <div className={"p2-scene " + (sourcingPhase === 1 ? "on" : "")}>
                                                <div className="p2-builder">
                                                    <div className="p2-bHeader">
                                                        <div className="bh-left">
                                                            <div className="bh-dot" />
                                                            <span className="bh-title">Create RFQ · Auto-Compose</span>
                                                        </div>
                                                        <span className={"p2-tpl " + (builderStep >= 1 ? "in" : "")}>
                                                            <span className="tpl-dot" />
                                                            Template: Steel &amp; Hardware
                                                        </span>
                                                    </div>

                                                    <div className="p2-bGrid">
                                                        {/* LEFT: Part details auto-filled */}
                                                        <div className="p2-bCard">
                                                            <div className="p2-bCardTitle">Part Details · Auto-filled</div>
                                                            {BUILDER_FIELDS.map((f, i) => {
                                                                const visible = builderStep >= 2 + i;
                                                                const srcCls =
                                                                    f.src === 'BOM' ? '' :
                                                                    f.src === 'PO HISTORY' ? 'po' :
                                                                    f.src === 'CONTRACT' ? 'cn' :
                                                                    'pol';
                                                                return (
                                                                    <div key={f.label} className={"p2-bRow " + (visible ? "in" : "")}>
                                                                        <span className="p2-bRowLbl">{f.label}</span>
                                                                        <span className="p2-bRowVal">
                                                                            <span className="vtext">{f.value}</span>
                                                                            <span className={"p2-bSrc " + srcCls}>{f.src}</span>
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* RIGHT: Vendors auto-selected + warnings */}
                                                        <div className="p2-bCard">
                                                            <div className="p2-bCardTitle">Vendors · Tag &amp; History Match</div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1, minHeight: 0 }}>
                                                                {BUILDER_VENDORS.map((v, i) => {
                                                                    const visible = builderVendorN > i;
                                                                    const tagCls =
                                                                        v.tag === 'PREFERRED' ? 'preferred' :
                                                                        v.tag === 'QUALIFIED' ? 'qualified' :
                                                                        v.tag === 'HISTORY' ? 'history' :
                                                                        'backup';
                                                                    return (
                                                                        <div key={v.code} className={"p2-bVendor " + (visible ? "in" : "")}>
                                                                            <div className="p2-bVAv">{v.code}</div>
                                                                            <div className="p2-bVName">{v.name}</div>
                                                                            <div className={"p2-bVTag " + tagCls}>{v.tag}</div>
                                                                            <div className="p2-bVScore">{v.score}%</div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className={"p2-bWarn " + (builderWarn ? "in" : "")}>
                                                                <span className="wic">!</span>
                                                                <span className="wtxt">Last quote spiked +6% · target price flagged</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SCENE 3: AUTOMATED SUPPLIER FAN-OUT (WORLD MAP) */}
                                            <div className={"p2-scene " + (sourcingPhase === 3 ? "on" : "")}>
                                                <div className="p2-map">
                                                    <div className="p2-mapHdr">
                                                        <div className="mh-left">
                                                            <div className="mh-dot" />
                                                            <span className="mh-title">Dispatching RFQ-2026-0871 · Global</span>
                                                        </div>
                                                        <span className={"mh-count " + (mapDelivered ? "done" : "")}>
                                                            {mapDelivered
                                                                ? `✓ Delivered to ${GLOBAL_SUPPLIERS.length} suppliers`
                                                                : `${mapPinsN}/${GLOBAL_SUPPLIERS.length} suppliers`}
                                                        </span>
                                                    </div>
                                                    <div className="p2-mapStage">
                                                        <div className="p2-mapBg" />
                                                        {/* Arcs from hub (50,50) to each supplier */}
                                                        <div className="p2-mapArcs">
                                                            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                                                                {GLOBAL_SUPPLIERS.map((s, i) => {
                                                                    const mx = (50 + s.x) / 2;
                                                                    const my = (50 + s.y) / 2 - 7;
                                                                    const cls = (mapPinsN > i && mapArcs ? "in " : "") + (mapDelivered ? "delivered" : "");
                                                                    return (
                                                                        <path key={s.code}
                                                                            d={`M 50 50 Q ${mx} ${my}, ${s.x} ${s.y}`}
                                                                            className={cls}
                                                                            pathLength={200} />
                                                                    );
                                                                })}
                                                            </svg>
                                                        </div>
                                                        {/* Central FactWise hub */}
                                                        <div className="p2-mapHub">FW</div>
                                                        {/* Supplier pins */}
                                                        {GLOBAL_SUPPLIERS.map((s, i) => (
                                                            <div key={s.code}
                                                                className={"p2-mapPin " + (mapPinsN > i ? "in " : "") + (mapDelivered ? "delivered" : "")}
                                                                style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                                                                <div className="pinDot" />
                                                                <div className="p2-mapLbl">
                                                                    <span className="lblStatus" />
                                                                    <span>{s.name}</span>
                                                                    <span className="lblCode">{s.region}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SCENE 4: SCHEDULE */}
                                            <div className={"p2-scene " + (sourcingPhase === 4 ? "on" : "")}>
                                                <div className="p2-sched">
                                                    <div className="p2-schedTrack">
                                                        <div className="p2-schedLine" style={{ "--p": `${Math.min(100, (schedN / SCHEDULE.length) * 100)}%` } as React.CSSProperties} />
                                                        <div className="p2-schedStops">
                                                            {SCHEDULE.map((st, i) => {
                                                                const Ic = st.ic;
                                                                const fired = schedN > i;
                                                                const done = schedN > i + 1 || (i === SCHEDULE.length - 1 && schedN >= SCHEDULE.length);
                                                                return (
                                                                    <div key={st.d} className={"p2-schedStop" + (fired ? " fired" : "") + (done ? " done" : "")}>
                                                                        <div className={"p2-schedDot " + (fired ? "fired " : "") + (done ? "done" : "")}>
                                                                            {fired && <Ic size={8} />}
                                                                        </div>
                                                                        <div className="p2-schedLbl">{st.d}</div>
                                                                        <div className="p2-schedSub">{st.lbl}</div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="p2-schedLog">
                                                        {[
                                                            { ic: Send, t: <><b>RFQ-2026-0871</b> sent to 5 vendors</>, m: "T+0" },
                                                            { ic: Mail, t: <>Auto-reminder fired to <b>2 non-responders</b></>, m: "T+48h" },
                                                            { ic: Check, t: <><b>5 of 5</b> quotes received</>, m: "T+5d" },
                                                        ].slice(0, schedLog).map((row, i) => (
                                                            <div key={i} className="p2-logRow in">
                                                                <div className="lic"><row.ic size={11} /></div>
                                                                <div className="lt">{row.t}</div>
                                                                <div className="lm">{row.m}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* SCENE 2: APPROVAL INBOX */}
                                            <div className={"p2-scene " + (sourcingPhase === 2 ? "on" : "")}>
                                                <div className="p2-approve">
                                                    <div className="p2-approveHeader">
                                                        <div className="ah-left">
                                                            <div className="ah-dot" />
                                                            <span className="ah-title">Approval Queue · Auto-routed</span>
                                                        </div>
                                                        <span className={"ah-badge " + (approveN >= 3 ? "in" : "")}>
                                                            ✓ {approveN}/3 Approved
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(54,102,255,0.06)', border: '1px solid rgba(54,102,255,0.12)', borderRadius: 10, padding: '7px 12px' }}>
                                                        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(54,102,255,0.12)', display: 'grid', placeItems: 'center', color: '#3666ff', flexShrink: 0 }}>
                                                            <Zap size={11} />
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: 10, fontWeight: 800, color: '#1e3a8a', letterSpacing: '-0.01em' }}>RFQ-2026-0871 · Vendor A selected</div>
                                                            <div style={{ fontSize: 9, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.04em', marginTop: 1 }}>₹18.42/unit · 1,200 pcs · ₹22,104 total</div>
                                                        </div>
                                                        <div style={{ fontSize: 9, fontWeight: 700, color: '#3666ff', background: 'rgba(54,102,255,0.1)', borderRadius: 5, padding: '3px 7px', fontFamily: "'JetBrains Mono',monospace" }}>AUTO</div>
                                                    </div>
                                                    {([
                                                        { step: 0, name: 'Priya S.', role: 'BUYER · PROCUREMENT', color: '#6366f1', code: 'PS', limit: '₹25K' },
                                                        { step: 1, name: 'Vikram K.', role: 'MANAGER · CATEGORY LEAD', color: '#0ea5e9', code: 'VK', limit: '₹100K' },
                                                        { step: 2, name: 'Tara S.', role: 'CFO · FINANCE', color: '#8b5cf6', code: 'TS', limit: 'FINAL' },
                                                    ] as const).map(({ step, name, role, color, code, limit }) => {
                                                        const isIn = approveN >= step;
                                                        const isDone = approveN > step;
                                                        return (
                                                            <div key={code} className={"p2-acard " + (isIn ? "in " : "") + (isDone ? "done" : "")} style={{ transitionDelay: `${step * 0.1}s` }}>
                                                                <div className="ac-av" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>{code}</div>
                                                                <div className="ac-body">
                                                                    <div className="ac-name">{name}</div>
                                                                    <div className="ac-role">{role}</div>
                                                                </div>
                                                                <div className="ac-amt">{limit}</div>
                                                                <div className={"ac-stamp " + (isDone ? "approved" : "pending")}>
                                                                    {isDone ? <><Check size={9} /> Approved</> : <><Clock size={9} /> Pending</>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    <div className={"p2-acard " + (approveN >= 3 ? "in done" : "")} style={{ transitionDelay: '0.3s', marginTop: 2 }}>
                                                        <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(0,184,132,0.15)', color: '#00b884', flexShrink: 0 }}>
                                                            <Check size={15} />
                                                        </div>
                                                        <div className="ac-body">
                                                            <div className="ac-name" style={{ color: '#065f46' }}>PO Issued · Compliance Logged</div>
                                                            <div className="ac-role" style={{ color: '#00b884' }}>FULLY APPROVED · AUDIT TRAIL SAVED</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* NARRATIVE FOOTER */}
                                            <div className={"p2-cap " + (sourcingPhase > 0 ? "on" : "")}>
                                                <span className="cd" />
                                                <span>
                                                    {sourcingPhase === 1 ? "Category templates auto-compose the RFQ — parts, target prices, vendors, and risk flags pulled from PO history and contracts before a single field is typed." :
                                                        sourcingPhase === 2 ? "Once a bid is selected, approvals flow down the hierarchy automatically — Buyer → Manager → Finance, generating a full compliance audit trail." :
                                                            sourcingPhase === 3 ? "One click dispatches the RFQ to qualified suppliers across the globe in parallel — no inbox, no copy-paste, no missed regions." :
                                                                sourcingPhase === 4 ? "Emails disappear entirely. FactWise's scheduler manages automatic reminders and escalations, logging bids directly to the platform." : ""}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Control Footer */}
                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                                                    className="size-5 rounded-md hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                                                >
                                                    {isAutoCycling ? <Pause className="size-3" /> : <Play className="size-3" />}
                                                </button>
                                                <span className="font-medium">
                                                    {isAutoCycling ? "Autopilot Active" : "Paused — select a phase"}
                                                </span>
                                            </div>
                                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">FactWise Engine</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Text Right */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: activeSection === 1 ? 1 : 0, x: activeSection === 1 ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left"
                                >
                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
                                        Intelligent Sourcing
                                    </div>
                                    <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                                        Your team shouldn't be <br />
                                        <span className="text-[#3666ff]">chasing vendors over email.</span>
                                    </h3>
                                    <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Setting up a sourcing event manually means building vendor lists from scratch, writing emails, following up repeatedly, and re-entering responses into a spreadsheet. FactWise automates routine tasks so your team focuses on decisions, not data entry.
                                    </p>

                                    <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                                        {[
                                            { phase: 1, title: "Intelligent RFQ Creation" },
                                            { phase: 2, title: "Auto-Routed Digital Approvals" },
                                            { phase: 3, title: "Automated Supplier Fan-Out" },
                                            { phase: 4, title: "Inbox-Decoupled Auto Follow-Ups" }
                                        ].map((item) => (
                                            <StepListItem
                                                key={item.phase}
                                                step={item.phase}
                                                title={item.title}
                                                isActive={sourcingPhase === item.phase}
                                                isDone={sourcingPhase > item.phase}
                                                onClick={() => setPhaseManual(item.phase)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*
                ══════════════════════════════════════════════════════════════
                  PANEL 2 — SECTION 3.3 — RFQ Analytics
                ══════════════════════════════════════════════════════════════
                */}
                <div
                    id="section-3-3"
                    ref={el => { panelRefs.current[2] = el; }}
                    className="panel x-100"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
                >
                    <div className="h-full w-full flex items-center">
                        <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6">
                            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                                {/* Text Left */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: activeSection === 2 ? 1 : 0, x: activeSection === 2 ? 0 : -20 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="lg:col-span-6 space-y-6 text-left"
                                >
                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                                        RFQ Analytics
                                    </div>
                                    <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                                        See True Landed Cost. <br />
                                        <span className="text-[#3666ff]">Award with Confidence.</span>
                                    </h3>
                                    <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        FactWise auto-applies your custom landed cost formula across every bid — duty, insurance, packaging, all normalized to your currency. Every comparison reflects true cost, not unit price.
                                    </p>
                                    <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        See competitive, non-competitive, and excluded bids at a glance, line-by-line or all-vendors. FactWise Recommended Analytics highlights the best bid per item — every award backed by intelligence, not instinct.
                                    </p>

                                    <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                                        {[
                                            { phase: 1, title: "Vendor Bids Arrive" },
                                            { phase: 2, title: "Apply Landed Cost Formula" },
                                            { phase: 3, title: "Categorize Vendor Performance" },
                                            { phase: 4, title: "AI Recommended Best Bid" }
                                        ].map((item) => (
                                            <StepListItem
                                                key={item.phase}
                                                step={item.phase}
                                                title={item.title}
                                                isActive={isMenuStepActive(item.phase)}
                                                isDone={isMenuStepDone(item.phase)}
                                                onClick={() => setAnalyticsManual(item.phase)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Graphic Right */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: activeSection === 2 ? 1 : 0, scale: activeSection === 2 ? 1 : 0.96 }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    className="lg:col-span-6 relative"
                                >
                                    <RfqAnalyticsAnimation
                                        isAuto={isAnalyticsAuto}
                                        controlledPhase={analyticsPhase}
                                        activeMenuStep={!isAnalyticsAuto ? analyticsMenuStep : null}
                                        onPhaseChange={(p) => setAnalyticsPhase(p)}
                                        onToggleAuto={() => {
                                            setIsAnalyticsAuto(prev => {
                                                if (!prev) setAnalyticsMenuStep(null);
                                                return !prev;
                                            });
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*
                ══════════════════════════════════════════════════════════════
                  PANEL 3 — SECTION 3.4 — Quote Generation & Analytics
                ══════════════════════════════════════════════════════════════
                */}
                <div
                    id="section-3-4"
                    ref={el => { panelRefs.current[3] = el; }}
                    className="panel x-100"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
                >
                    <div className="h-full w-full flex items-center">
                        <div className="mx-auto w-full max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1440px] px-6">
                            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                                {/* Graphic Left */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: activeSection === 3 ? 1 : 0, scale: activeSection === 3 ? 1 : 0.96 }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    className="lg:col-span-6 order-2 lg:order-1 relative"
                                >
                                    <QuoteGenAnimation
                                        speed={1}
                                        isAuto={isQuoteAuto}
                                        controlledPhase={quoteMenuStep}
                                        activeMenuStep={!isQuoteAuto ? quoteMenuStep : null}
                                        onPhaseChange={(p) => setQuotePhaseAnim(p)}
                                        onToggleAuto={() => {
                                            setIsQuoteAuto(prev => {
                                                if (!prev) setQuoteMenuStep(null);
                                                return !prev;
                                            });
                                        }}
                                    />
                                </motion.div>

                                {/* Text Right */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: activeSection === 3 ? 1 : 0, x: activeSection === 3 ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left"
                                >
                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff]" />
                                        Quote Generation & Analytics
                                    </div>
                                    <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                                        A Quote Built On Gut Feel Is <br />
                                        <span className="text-[#3666ff]">A Margin You're Giving Away.</span>
                                    </h3>
                                    <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Manual spreadsheets cause margin errors and lost deals. FactWise generates one-click customer quotes directly from your best bids — automatically rolling up BOMs, applying landed costs, and pricing every line item.
                                    </p>
                                    <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Gain instant visibility into your margins. Analyze category spend, uncover hidden costs, and model volume pricing — empowering you to send sharper quotes faster than the competition.
                                    </p>

                                    <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                                        {[
                                            { phase: 1, title: "Aggregate Supplier Bids" },
                                            { phase: 2, title: "Apply Landed Costs" },
                                            { phase: 3, title: "Analyze by Category" },
                                            { phase: 4, title: "Volume Pricing Analysis" }
                                        ].map((item) => (
                                            <StepListItem
                                                key={item.phase}
                                                step={item.phase}
                                                title={item.title}
                                                isActive={isQuoteMenuStepActive(item.phase)}
                                                isDone={isQuoteMenuStepDone(item.phase)}
                                                onClick={() => setQuoteManual(item.phase)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>{/* end .swipe-section */}

            {/* ── Post-panels spacer so page continues scrolling after last panel ── */}
            <div style={{ height: '1px' }} aria-hidden="true" />

        </section>
    );
}
