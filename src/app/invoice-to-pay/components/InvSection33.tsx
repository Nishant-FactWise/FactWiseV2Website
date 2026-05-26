'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, Pause, Shield, Sparkles, X } from 'lucide-react';
import { FwCursor } from './_invCursor';

export default function InvSection33({ isActive = true }: { isActive?: boolean }) {
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
                    await sleep(p === 5 ? 3500 : 2800);
                }
            }
        }
        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    const goManual = (p: number) => { setIsAuto(false); setPhase(p); };

    const steps = [
        { p: 1, title: 'GR lot staged — all three QC checkpoints ready' },
        { p: 2, title: 'Primary QC — visual and dimensional checks recorded on platform' },
        { p: 3, title: 'Secondary QC — functional tests logged with full attachment support' },
        { p: 4, title: 'Production-line QC — final gate before warehouse clearance' },
        { p: 5, title: 'AI reconciles QC against GR — credit auto-applied for every rejected unit' },
    ];

    const stages = [
        { l: 'Primary', sub: 'Visual + dim', fired: phase >= 2, total: phase >= 2 ? 300 : 0, rej: phase >= 2 ? 12 : 0 },
        { l: 'Secondary', sub: 'Functional', fired: phase >= 3, total: phase >= 3 ? 288 : 0, rej: phase >= 3 ? 6 : 0 },
        { l: 'Production', sub: 'Inline · live', fired: phase >= 4, total: phase >= 4 ? 282 : 0, rej: phase >= 4 ? 2 : 0 },
    ];

    const totalRej = (phase >= 2 ? 12 : 0) + (phase >= 3 ? 6 : 0) + (phase >= 4 ? 2 : 0);
    const passed = phase >= 4 ? 280 : phase >= 3 ? 282 : phase >= 2 ? 288 : 300;

    return (
        <div id="inv-section-3-3" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{
                __html: `
            @keyframes inv-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            @keyframes inv-flow  { 0%{transform:translateX(0)} 100%{transform:translateX(40px)} }
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
                    Step 03 · Quality Control
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Quality Checks On Platform.<br />
                    <span className="text-[#3666ff]">Nothing Slips Through.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Primary, secondary, and production-line checks — all on the platform, against any invoice or goods receipt, with full attachment support. FactWise's AI flags discrepancies between QC outcomes and the goods receipt automatically. Rejected items are tracked, actioned, and never paid for.
                </p>

                <div className="flex flex-col gap-2 mt-8 text-left">
                    {steps.map((item) => (
                        <div
                            key={item.p}
                            onClick={() => goManual(item.p)}
                            className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${phase === item.p
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                                }`}
                        >
                            {phase === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
                            <div className="flex items-start gap-4 relative z-10 flex-1 min-w-0">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-400 ${phase === item.p ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                        : phase > item.p ? 'border-[#00b884] bg-[#00b884] text-white'
                                            : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                                    }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13px] font-bold tracking-tight text-left break-words pr-2 block ${phase === item.p ? 'text-[#3666ff]' : phase > item.p ? 'text-slate-700' : 'text-slate-500'
                                    }`}>{item.title}</span>
                            </div>
                            {phase === item.p && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm shrink-0 w-fit self-start sm:self-auto">
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
                    className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.22),0_15px_40px_-10px_rgba(54,102,255,0.15)] overflow-hidden flex flex-col justify-between select-none h-auto lg:h-[549px] lg:min-h-[549px] lg:max-h-[549px]"
                >
                    {/* Top bar */}
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <Shield className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Quality Pipeline</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500">GR-9241 · lot 300u</span>
                            </div>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full shrink-0" style={{ background: 'rgba(54,102,255,0.08)', color: '#3666ff', border: '1px solid rgba(54,102,255,0.2)' }}>
                            3 checkpoints
                        </span>
                    </div>

                    {/* Stage */}
                    <div className="relative flex-1 mt-3 pb-16 lg:pb-0" style={{ background: '#fbfcfe', borderRadius: 16, border: '1px solid rgba(15,23,42,0.06)', padding: 14, overflow: 'hidden' }}>
                        {/* Lot in */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                            <div className="bg-white border border-slate-100 rounded-xl p-2 min-w-[120px] w-full sm:w-auto text-left">
                                <div style={{ fontSize: 7.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Lot in</div>
                                <div style={{ fontSize: 9, fontWeight: 800, color: '#0b1322' }}>Steel Bracket M8</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: 1.5, marginTop: 5 }}>
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div key={i} style={{ aspectRatio: '1/1', borderRadius: 1, background: phase >= 1 ? '#3666ff' : '#cbd5e1' }} />
                                    ))}
                                </div>
                                <div style={{ fontSize: 9, fontWeight: 800, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace", textAlign: 'center', marginTop: 3 }}>300u</div>
                            </div>

                            <div style={{ flex: 1, padding: '0 12px', position: 'relative' }} className="w-full">
                                <div style={{ height: 3, background: '#e2e8f0', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={false}
                                        animate={{ width: phase >= 4 ? '100%' : phase >= 3 ? '66%' : phase >= 2 ? '33%' : '0%' }}
                                        transition={{ duration: 0.8 }}
                                        style={{ height: '100%', background: 'linear-gradient(90deg, #3666ff, #10b981)' }}
                                    />
                                </div>
                                {phase >= 2 && phase <= 4 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 6 }}>
                                        {[1, 2, 3].map(i => (
                                            <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#3666ff', opacity: phase >= (i + 1) ? 1 : 0.3, animation: 'inv-pulse 1s infinite' }} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border border-slate-100 rounded-xl p-2 min-w-[90px] w-full sm:w-auto text-center" style={{ background: phase >= 5 ? 'rgba(16,185,129,0.08)' : 'white', border: phase >= 5 ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(15,23,42,0.07)', transition: 'all .4s' }}>
                                <div style={{ fontSize: 7.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Out</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: phase >= 5 ? '#059669' : '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>{passed}</div>
                                <div style={{ fontSize: 8, color: '#94a3b8' }}>passed</div>
                            </div>
                        </div>

                        {/* 3 QC stages */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full mb-3">
                            {stages.map((s, i) => (
                                <motion.div
                                    key={s.l}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    style={{
                                        background: 'white',
                                        border: s.fired ? '1.5px solid rgba(54,102,255,0.4)' : '1px solid rgba(15,23,42,0.07)',
                                        borderRadius: 10, padding: 10,
                                        boxShadow: s.fired ? '0 4px 14px rgba(54,102,255,0.1)' : 'none',
                                        transition: 'all .4s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 5, background: s.fired ? 'rgba(54,102,255,0.1)' : '#f1f5f9', display: 'grid', placeItems: 'center', color: s.fired ? '#3666ff' : '#94a3b8' }}>
                                                <Shield size={11} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 9.5, fontWeight: 800, color: s.fired ? '#0b1322' : '#94a3b8' }}>QC · {s.l}</div>
                                                <div style={{ fontSize: 7, fontWeight: 600, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>{s.sub}</div>
                                            </div>
                                        </div>
                                        <span style={{
                                            fontSize: 7, fontWeight: 800, padding: '1px 5px', borderRadius: 3,
                                            background: s.fired ? 'rgba(16,185,129,0.1)' : '#f1f5f9',
                                            color: s.fired ? '#059669' : '#94a3b8', fontFamily: "'JetBrains Mono',monospace"
                                        }}>
                                            {s.fired ? 'DONE' : 'IDLE'}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                                        <div style={{ background: '#fbfcfe', borderRadius: 6, padding: '4px 6px' }}>
                                            <div style={{ fontSize: 6.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Inspected</div>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: s.fired ? '#0b1322' : '#cbd5e1', fontFamily: "'JetBrains Mono',monospace" }}>{s.total}</div>
                                        </div>
                                        <div style={{ background: s.rej > 0 ? 'rgba(239,68,68,0.06)' : '#fbfcfe', borderRadius: 6, padding: '4px 6px' }}>
                                            <div style={{ fontSize: 6.5, fontWeight: 800, color: s.rej > 0 ? '#dc2626' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rejected</div>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: s.rej > 0 ? '#dc2626' : '#cbd5e1', fontFamily: "'JetBrains Mono',monospace" }}>{s.rej}u</div>
                                        </div>
                                    </div>

                                    {s.fired && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            style={{ marginTop: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 7.5, color: '#64748b', fontFamily: "'JetBrains Mono',monospace" }}
                                        >
                                            <span>QC-{s.l.slice(0, 3).toUpperCase()}-{2100 + i}</span>
                                            <span style={{ color: '#059669', fontWeight: 800 }}>✓ recorded</span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* AI reconciliation summary — phase 5 */}
                        <AnimatePresence>
                            {phase >= 5 && (
                                <motion.div
                                    key="ai-summary"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        marginTop: 12, padding: 10, borderRadius: 10,
                                        background: 'linear-gradient(135deg, rgba(54,102,255,0.06), rgba(16,185,129,0.04))',
                                        border: '1px solid rgba(54,102,255,0.25)',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: 8.5, fontWeight: 800, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Sparkles size={10} /> AI · QC vs GR reconciliation
                                        </span>
                                        <span style={{ fontSize: 8, fontWeight: 800, color: '#059669', fontFamily: "'JetBrains Mono',monospace" }}>credit applied</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                                        {[
                                            { l: 'GR Received', v: '300u', c: '#0b1322' },
                                            { l: 'QC Passed', v: `${passed}u`, c: '#059669' },
                                            { l: 'Total Rej', v: `${totalRej}u`, c: '#dc2626' },
                                            { l: 'Auto Credit', v: `₹${(totalRej * 240).toLocaleString('en-IN')}`, c: '#3666ff' },
                                        ].map(k => (
                                            <div key={k.l} style={{ background: 'white', borderRadius: 6, padding: '5px 7px', textAlign: 'center', border: '1px solid rgba(15,23,42,0.05)' }}>
                                                <div style={{ fontSize: 6.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.l}</div>
                                                <div style={{ fontSize: 11, fontWeight: 800, color: k.c, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{k.v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated cursor */}
                        <FwCursor pose={
                            phase === 1 ? { x: 12, y: 30, click: false, label: 'Lot · 300u staged' } :
                            phase === 2 ? { x: 28, y: 42, click: true,  label: 'Primary QC · 12 rej' } :
                            phase === 3 ? { x: 52, y: 42, click: true,  label: 'Secondary QC · 6 rej' } :
                            phase === 4 ? { x: 78, y: 42, click: true,  label: 'Production · 2 rej', labelDir: 'bl' } :
                                          { x: 50, y: 78, click: false, label: 'AI · ₹4,800 credit' }
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
                                    {phase === 1 ? 'A lot is staged at the entry — all three QC gates idle, ready to inspect.' :
                                        phase === 2 ? 'Primary QC fires — visual and dimensional checks performed on the inbound lot.' :
                                            phase === 3 ? 'Secondary QC runs — functional pass checks executed on surviving units.' :
                                                phase === 4 ? 'Production-line QC — final inline gate check executed before warehouse clearance.' :
                                                    'AI reconciles QC outcomes against the goods receipt — credits computed automatically for the rejected qty.'}
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
