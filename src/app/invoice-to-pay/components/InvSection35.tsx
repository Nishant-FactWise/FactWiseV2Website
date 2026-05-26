'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, Pause, Search, FileText, Truck, Shield, Lock, DollarSign, Sparkles, X } from 'lucide-react';
import { FwCursor } from './_invCursor';

export default function InvSection35({ isActive = true }: { isActive?: boolean }) {
    const [phase, setPhase] = useState(1);
    const [isAuto, setIsAuto] = useState(true);

    React.useEffect(() => {
        if (!isAuto || !isActive) return;
        let cancel = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
        async function run() {
            while (!cancel && isAuto) {
                for (let p = 1; p <= 5; p++) {
                    if (cancel) return;
                    setPhase(p);
                    await sleep(p === 5 ? 4000 : 3000);
                }
            }
        }
        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    const goManual = (p: number) => { setIsAuto(false); setPhase(p); };

    const steps = [
        { p: 1, title: 'Invoice raised — complete audit trail begins immediately' },
        { p: 2, title: 'GR status, QC outcomes, and AI-flagged discrepancies — all visible' },
        { p: 3, title: 'Payment made — every rupee accounted for, chain fully green' },
        { p: 4, title: 'Line-item view — GR, QC, validation, and payment tracked in parallel' },
        { p: 5, title: 'Click any flagged event — full audit drawer with evidence and history' },
    ];

    const milestones = [
        { l: 'Invoice raised', sub: '12 May · INV-AX-9047', icon: <FileText size={11} />, actor: 'Apex' },
        { l: 'GR posted', sub: '14 May · GR-9241', icon: <Truck size={11} />, actor: 'Warehouse' },
        { l: 'QC complete', sub: '14 May · 3 checks', icon: <Shield size={11} />, actor: 'QC team' },
        { l: '4-way validated', sub: '15 May · auto', icon: <Lock size={11} />, actor: 'AI' },
        { l: 'Payment made', sub: '16 May · ₹1.11L', icon: <DollarSign size={11} />, actor: 'Finance' },
    ];

    const scrubX = phase === 1 ? 0 : phase === 2 ? 0.55 : 1;
    const showMacro = phase <= 3;
    const showLines = phase >= 4;

    const lines = [
        { sku: 'BRK-M8-304', name: 'Steel Bracket M8', states: [1, 1, 2, 1, 1], flag: 'QC · 20 rej · −₹4,800' },
        { sku: 'BRK-M6-201', name: 'Steel Bracket M6', states: [1, 1, 1, 1, 1], flag: null },
        { sku: 'PCK-FX-019', name: 'Packaging FX-019', states: [1, 1, 1, 1, 1], flag: null },
        { sku: 'WS-50-A', name: 'Washer WS-50', states: [1, 1, 2, 2, 3], flag: 'Damaged 100u · pending' },
    ];

    return (
        <div id="inv-section-3-5" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{
                __html: `
            @keyframes inv-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            ` }} />

            {/* LEFT: Text + Steps */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                    Step 05 · Total Visibility
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Total Visibility.<br />
                    <span className="text-[#3666ff]">From Invoice to Payment.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Every invoice, every GR, every QC outcome, every payment — tracked in real time from start to finish. GR status, AI-flagged discrepancies, approvals, and payment history all visible at the line item level. No more chasing updates. Every rupee accounted for, every step of the way.
                </p>

                <div className="flex flex-col gap-2 mt-8 text-left">
                    {steps.map((item) => (
                        <div
                            key={item.p}
                            onClick={() => goManual(item.p)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${phase === item.p
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                                }`}
                        >
                            {phase === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${phase === item.p ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                        : phase > item.p ? 'border-[#00b884] bg-[#00b884] text-white'
                                            : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                                    }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13px] font-bold tracking-tight ${phase === item.p ? 'text-[#3666ff]' : phase > item.p ? 'text-slate-700' : 'text-slate-500'
                                    }`}>{item.title}</span>
                            </div>
                            {phase === item.p && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                                </span>
                            )}
                        </div>
                    ))}
                </div>

            </motion.div>

            {/* RIGHT: Animation Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 75, damping: 14 }}
                className="lg:col-span-6 relative"
            >
                <div
                    className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.22),0_15px_40px_-10px_rgba(54,102,255,0.15)] overflow-hidden flex flex-col justify-between select-none"
                    style={{ height: 549, minHeight: 549, maxHeight: 549 }}
                >
                    {/* Top bar */}
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <Search className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Full visibility · audit</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500">INV-AX-9047</span>
                            </div>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full" style={{ background: 'rgba(54,102,255,0.08)', color: '#3666ff', border: '1px solid rgba(54,102,255,0.2)' }}>
                            {showMacro ? 'Macro view' : showLines && phase === 5 ? 'Audit · open' : 'Line · item view'}
                        </span>
                    </div>

                    {/* Stage */}
                    <div className="relative flex-1 mt-3" style={{ background: '#fbfcfe', borderRadius: 16, border: '1px solid rgba(15,23,42,0.06)', padding: 14, overflow: 'hidden' }}>
                        {/* Macro timeline */}
                        <motion.div
                            initial={false}
                            animate={{ height: showMacro ? 180 : 70, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            style={{ background: 'white', borderRadius: 10, border: '1px solid #eef2f7', padding: 12, overflow: 'hidden' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <span style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace" }}>INV-AX-9047 · 5-stage journey</span>
                                <span style={{ fontSize: 8, fontWeight: 800, color: phase >= 3 ? '#059669' : '#3666ff', fontFamily: "'JetBrains Mono',monospace", display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', animation: 'inv-pulse 1.4s infinite' }} />
                                    {phase === 1 ? 'just raised' : phase === 2 ? 'in progress' : 'complete'}
                                </span>
                            </div>

                            {/* Track */}
                            <div style={{ position: 'relative', height: showMacro ? 120 : 30 }}>
                                <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: 3, borderRadius: 2, background: '#e2e8f0', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={false}
                                        animate={{ width: `${scrubX * 100}%` }}
                                        transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                                        style={{ height: '100%', background: 'linear-gradient(90deg, #3666ff, #10b981)' }}
                                    />
                                </div>

                                {/* Milestones */}
                                {milestones.map((m, i) => {
                                    const xPct = i / (milestones.length - 1);
                                    const reached = scrubX >= xPct - 0.01;
                                    const isFirst = i === 0;
                                    const isLast = i === milestones.length - 1;
                                    // Dot sits inside the track padding so it never spills past the card edges
                                    const dotLeft = `calc(14px + ${xPct} * (100% - 28px) - 12px)`;
                                    // Label alignment: first → align to dot's left; last → align to dot's right; middle → centered
                                    const labelStyle: React.CSSProperties = isFirst
                                        ? { left: 0, top: 34, width: 110, textAlign: 'left' }
                                        : isLast
                                            ? { right: 0, top: 34, width: 110, textAlign: 'right' }
                                            : { left: -50, right: -50, top: 34, textAlign: 'center' };
                                    return (
                                        <div key={m.l} style={{ position: 'absolute', top: 0, left: dotLeft, width: 24 }}>
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    scale: reached ? 1.0 : 0.85,
                                                    background: reached ? '#10b981' : phase === 1 && i === 0 ? '#3666ff' : 'white',
                                                    borderColor: reached ? '#10b981' : phase === 1 && i === 0 ? '#3666ff' : '#cbd5e1',
                                                }}
                                                style={{
                                                    width: 24, height: 24, borderRadius: '50%',
                                                    border: '2px solid', display: 'grid', placeItems: 'center',
                                                    color: reached || (phase === 1 && i === 0) ? 'white' : '#94a3b8',
                                                    boxShadow: reached ? '0 0 0 4px rgba(16,185,129,0.15)' : 'none',
                                                    transition: 'all .4s',
                                                }}
                                            >
                                                {reached ? <Check size={10} strokeWidth={3.5} /> : m.icon}
                                            </motion.div>
                                            {showMacro && (
                                                <div style={{ position: 'absolute', ...labelStyle }}>
                                                    <div style={{ fontSize: 8.5, fontWeight: 800, color: reached ? '#0b1322' : '#94a3b8' }}>{m.l}</div>
                                                    <div style={{ fontSize: 7, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{m.sub}</div>
                                                    <div style={{ fontSize: 6.5, color: '#cbd5e1', fontFamily: "'JetBrains Mono',monospace", marginTop: 1, textTransform: 'uppercase' }}>{m.actor}</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Line-item view — phase 4+ */}
                        <AnimatePresence>
                            {showLines && (
                                <motion.div
                                    key="lines"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ marginTop: 10, background: 'white', borderRadius: 10, border: '1px solid #eef2f7', padding: 10 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace" }}>Per line item · drill in</span>
                                        <span style={{ fontSize: 8, fontWeight: 800, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace" }}>4 SKUs</span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                        {lines.map((l, i) => (
                                            <motion.div
                                                key={l.sku}
                                                initial={{ opacity: 0, x: 8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.06 }}
                                                style={{
                                                    background: phase === 5 && l.flag && i === 0 ? 'rgba(239,68,68,0.04)' : '#fbfcfe',
                                                    border: phase === 5 && l.flag && i === 0 ? '1.5px solid rgba(239,68,68,0.4)' : '1px solid #eef2f7',
                                                    borderRadius: 8, padding: '6px 9px',
                                                    display: 'flex', alignItems: 'center', gap: 10,
                                                }}
                                            >
                                                <div style={{ minWidth: 90 }}>
                                                    <div style={{ fontSize: 9, fontWeight: 800, color: '#0b1322' }}>{l.name}</div>
                                                    <div style={{ fontSize: 7, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>{l.sku}</div>
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    {l.states.map((st, si) => (
                                                        <div key={si} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                            <div style={{
                                                                width: 8, height: 8, borderRadius: '50%',
                                                                background: st === 1 ? '#10b981' : st === 2 ? '#f59e0b' : '#ef4444',
                                                            }} />
                                                            {si < l.states.length - 1 && (
                                                                <div style={{ flex: 1, height: 1.5, background: st === 1 ? '#10b981' : '#e2e8f0' }} />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                {l.flag && (
                                                    <span style={{ fontSize: 7, fontWeight: 800, padding: '2px 5px', borderRadius: 3, background: 'rgba(239,68,68,0.08)', color: '#dc2626', fontFamily: "'JetBrains Mono',monospace" }}>
                                                        {l.flag}
                                                    </span>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Audit drawer — phase 5 */}
                        <AnimatePresence>
                            {phase === 5 && (
                                <motion.div
                                    key="drawer"
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                                    style={{
                                        position: 'absolute', left: 14, right: 14, bottom: 70,
                                        background: 'white', border: '1.5px solid rgba(54,102,255,0.35)',
                                        borderRadius: 12, padding: 10, zIndex: 25,
                                        boxShadow: '0 -10px 30px rgba(15,23,42,0.08)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontSize: 8.5, fontWeight: 800, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Sparkles size={10} /> Audit · BRK-M8-304 · QC flag
                                        </span>
                                        <X size={11} color="#94a3b8" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
                                        {[
                                            { l: 'Rejected', v: '20u', c: '#dc2626' },
                                            { l: 'Reason', v: 'Visual', c: '#0b1322' },
                                            { l: 'Inspector', v: 'QC-Lead', c: '#3666ff' },
                                            { l: 'Credit', v: '−₹4,800', c: '#059669' },
                                        ].map(k => (
                                            <div key={k.l} style={{ background: '#fbfcfe', borderRadius: 6, padding: '4px 6px', border: '1px solid #eef2f7' }}>
                                                <div style={{ fontSize: 6.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.l}</div>
                                                <div style={{ fontSize: 9.5, fontWeight: 800, color: k.c, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{k.v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated cursor */}
                        <FwCursor pose={
                            phase === 1 ? { x: 12, y: 32, click: false, label: 'Invoice raised' } :
                            phase === 2 ? { x: 52, y: 32, click: false, label: 'QC complete' } :
                            phase === 3 ? { x: 88, y: 32, click: false, label: 'Payment made', labelDir: 'bl' } :
                            phase === 4 ? { x: 22, y: 68, click: false, label: 'Line-item view' } :
                                          { x: 60, y: 72, click: true,  label: 'Open audit · BRK-M8', labelDir: 'bl' }
                        }/>

                        {/* Caption */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`cap-${phase}`}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35 }}
                                style={{ position: 'absolute', left: 14, right: 14, bottom: 10, padding: '8px 12px', borderRadius: 10, background: 'white', border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 30 }}
                            >
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3666ff', flexShrink: 0, animation: 'inv-pulse 1.4s infinite' }} />
                                <span style={{ fontSize: 10.5, color: '#64748b', fontWeight: 600, lineHeight: 1.4 }}>
                                    {phase === 1 ? 'Macro timeline · invoice just raised. Stakeholders see the full journey ahead.' :
                                        phase === 2 ? 'Scrubber walks through GR · QC · validation — every actor and timestamp recorded.' :
                                            phase === 3 ? 'Payment Made — chain fully green. Every step traceable, no chasing required.' :
                                                phase === 4 ? 'Drill into line-item level · 4 parallel mini-timelines per SKU, including flags.' :
                                                    'Click a flagged event — the full audit drawer expands with reason, inspector, and credit applied.'}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <div className="flex items-center gap-1.5">
                            <button onClick={() => setIsAuto(!isAuto)} className="size-5 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer text-slate-500">
                                {isAuto ? <Pause className="size-3" /> : <Play className="size-3" />}
                            </button>
                            <span className="font-medium">{isAuto ? 'Autopilot Active' : 'Paused — click steps to explore'}</span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">FactWise Engine</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
