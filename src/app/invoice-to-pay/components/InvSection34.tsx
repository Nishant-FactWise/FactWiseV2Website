'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, Pause, DollarSign, FileText, Truck, Shield, Lock, Sparkles } from 'lucide-react';
import { FwCursor } from './_invCursor';

export default function InvSection34({ isActive = true }: { isActive?: boolean }) {
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
        { p: 1, title: 'Pay a single line item, a full invoice, or consolidate across invoices' },
        { p: 2, title: 'Multiple invoices from the same vendor merged into one payment' },
        { p: 3, title: 'Approve — quadruple validation triggers automatically' },
        { p: 4, title: 'PO, GR, QC, and Contract — all four verified before a rupee moves' },
        { p: 5, title: 'Credit auto-applied for rejected quantities — up to 5% in costs recovered' },
    ];

    const invoices = [
        { id: 'INV-AX-9047', amt: 95580 },
        { id: 'INV-AX-9051', amt: 31200 },
        { id: 'INV-AX-9056', amt: 18420 },
    ];
    const total = 145200;
    const creditDeduction = 33840;
    const net = total - creditDeduction;

    const orbs = [
        { l: 'PO', sub: 'PO-7821', icon: <FileText size={11} />, step: 1 },
        { l: 'GR', sub: 'GR-9241', icon: <Truck size={11} />, step: 2 },
        { l: 'QC', sub: '480 / 500u', icon: <Shield size={11} />, step: 3 },
        { l: 'Contract', sub: 'NET-45 ✓', icon: <Lock size={11} />, step: 4 },
    ];

    return (
        <div id="inv-section-3-4" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{
                __html: `
            @keyframes inv-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            @keyframes inv-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            ` }} />

            {/* LEFT: Animation Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 75, damping: 14 }}
                className="lg:col-span-6 order-2 lg:order-1 relative"
            >
                <div
                    className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.28),0_15px_40px_-10px_rgba(54,102,255,0.2)] overflow-hidden flex flex-col justify-between select-none"
                    style={{ height: 549, minHeight: 549, maxHeight: 549 }}
                >
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <DollarSign className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Payment Approval</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500 truncate">Apex Industrial · VID-204</span>
                            </div>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full" style={{ background: 'rgba(54,102,255,0.08)', color: '#3666ff', border: '1px solid rgba(54,102,255,0.2)' }}>
                            quadruple validation
                        </span>
                    </div>

                    {/* Stage */}
                    <div className="relative flex-1 mt-3" style={{ background: '#fbfcfe', borderRadius: 16, border: '1px solid rgba(15,23,42,0.06)', padding: 14, overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.1fr', gap: 10, height: 'calc(100% - 60px)' }}>
                            {/* LEFT: invoices to consolidate */}
                            <div style={{ position: 'relative', background: 'white', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                                    <span style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace" }}>Open · Apex</span>
                                    <span style={{ fontSize: 8, fontWeight: 800, color: phase >= 2 ? '#3666ff' : '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>
                                        {phase >= 2 ? '3 selected' : '0 selected'}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    {invoices.map((inv, i) => {
                                        const sel = phase >= 2;
                                        return (
                                            <motion.div
                                                key={inv.id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05 + i * 0.07 }}
                                                style={{
                                                    background: sel ? 'rgba(54,102,255,0.04)' : 'white',
                                                    border: sel ? '1px solid rgba(54,102,255,0.4)' : '1px solid rgba(148,163,184,0.25)',
                                                    borderRadius: 8, padding: '6px 8px',
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    transition: 'all .35s',
                                                }}
                                            >
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        backgroundColor: sel ? '#3666ff' : 'white',
                                                        borderColor: sel ? '#3666ff' : '#cbd5e1',
                                                    }}
                                                    style={{ width: 14, height: 14, borderRadius: 3, border: '2px solid', display: 'grid', placeItems: 'center', flexShrink: 0 }}
                                                >
                                                    {sel && <Check size={9} strokeWidth={4} color="white" />}
                                                </motion.div>
                                                <FileText size={11} color="#94a3b8" />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 9.5, fontWeight: 800, color: '#475569', fontFamily: "'JetBrains Mono',monospace" }}>{inv.id}</div>
                                                    <div style={{ fontSize: 8, color: '#94a3b8' }}>PO-7821 · NET-45 due in {3 + i * 2}d</div>
                                                </div>
                                                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 800, color: '#475569' }}>
                                                    ₹{(inv.amt).toLocaleString('en-IN')}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Consolidation banner */}
                                <AnimatePresence>
                                    {phase >= 2 && (
                                        <motion.div
                                            key="consolidate"
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                                            style={{
                                                marginTop: 10, padding: '8px 10px', borderRadius: 10,
                                                background: 'linear-gradient(135deg, rgba(54,102,255,0.08), rgba(54,102,255,0.02))',
                                                border: '1px solid rgba(54,102,255,0.3)',
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                                <span style={{ fontSize: 8, fontWeight: 800, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'JetBrains Mono',monospace" }}>Consolidate 3 → 1</span>
                                                <span style={{ fontSize: 7.5, fontWeight: 800, color: '#059669', fontFamily: "'JetBrains Mono',monospace" }}>single transfer</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#64748b' }}>
                                                <span>Gross total</span>
                                                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: '#0b1322', fontSize: 11 }}>₹{total.toLocaleString('en-IN')}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Approve button */}
                                <button
                                    style={{
                                        marginTop: 'auto', padding: '8px 12px', borderRadius: 8, border: 'none',
                                        background: phase >= 3 ? 'linear-gradient(135deg,#3666ff,#2a6cff)' : '#e2e8f0',
                                        color: phase >= 3 ? 'white' : '#94a3b8',
                                        fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', cursor: 'default',
                                        boxShadow: phase >= 3 ? '0 4px 14px rgba(54,102,255,0.3)' : 'none',
                                        transition: 'all .3s',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                                    }}
                                >
                                    {phase >= 3 ? <><Sparkles size={11} /> Approve Payment · ₹{net.toLocaleString('en-IN')}</> : 'Approve Payment'}
                                </button>
                            </div>

                            {/* RIGHT: validation orbs + summary */}
                            <div style={{ position: 'relative', background: 'white', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace", marginBottom: 6 }}>4-way validation</div>

                                {/* Center hub + 4 orbs */}
                                <div style={{ position: 'relative', height: 170, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(2,1fr)', gap: 8 }}>
                                    {orbs.map((o, i) => {
                                        const isGreen = phase >= 4 || (phase === 3 && o.step <= (phase === 3 ? 2 : 4));
                                        const isLit = phase >= 3 && o.step <= (phase === 3 ? Math.min(4, Math.floor(Date.now() / 600) % 5) : 4);
                                        const lit = phase >= 4;
                                        return (
                                            <motion.div
                                                key={o.l}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 + i * 0.1 }}
                                                style={{
                                                    background: lit ? 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(54,102,255,0.04))' : phase >= 3 ? 'rgba(54,102,255,0.04)' : '#fbfcfe',
                                                    border: lit ? '1.5px solid #10b981' : phase >= 3 ? '1px solid rgba(54,102,255,0.3)' : '1px solid #eef2f7',
                                                    borderRadius: 10, padding: '8px 10px',
                                                    display: 'flex', alignItems: 'center', gap: 8,
                                                    transition: 'all .5s',
                                                    position: 'relative',
                                                }}
                                            >
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: 7,
                                                    background: lit ? 'linear-gradient(135deg, #10b981, #059669)' : phase >= 3 ? 'linear-gradient(135deg, #3666ff, #2a6cff)' : '#cbd5e1',
                                                    display: 'grid', placeItems: 'center', color: 'white', flexShrink: 0,
                                                    transition: 'background .5s',
                                                }}>
                                                    {lit ? <Check size={13} strokeWidth={3} /> : o.icon}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 9.5, fontWeight: 800, color: lit ? '#059669' : phase >= 3 ? '#0b1322' : '#94a3b8' }}>{o.l}</div>
                                                    <div style={{ fontSize: 7.5, color: '#64748b', fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{o.sub}</div>
                                                </div>
                                                {phase === 3 && (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        style={{ width: 10, height: 10, border: '2px solid #3666ff', borderTopColor: 'transparent', borderRadius: '50%' }}
                                                    />
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Final summary — phase 5 */}
                                <AnimatePresence>
                                    {phase >= 5 && (
                                        <motion.div
                                            key="net-stamp"
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                                            style={{
                                                marginTop: 10, padding: '9px 11px', borderRadius: 10,
                                                background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))',
                                                border: '1.5px solid rgba(16,185,129,0.4)',
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                                <span style={{ fontSize: 8, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'JetBrains Mono',monospace" }}>Paid · auto-credit applied</span>
                                                <span style={{ fontSize: 7.5, fontWeight: 800, color: '#3666ff', background: 'rgba(54,102,255,0.1)', padding: '1px 5px', borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>~5% recovered</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                                                <div>
                                                    <div style={{ fontSize: 7, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gross</div>
                                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#0b1322', fontFamily: "'JetBrains Mono',monospace", textDecoration: 'line-through', opacity: 0.6 }}>₹{total.toLocaleString('en-IN')}</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 7, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net Paid</div>
                                                    <div style={{ fontSize: 13, fontWeight: 800, color: '#059669', fontFamily: "'JetBrains Mono',monospace" }}>₹{net.toLocaleString('en-IN')}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Animated cursor */}
                        <FwCursor pose={
                            phase === 1 ? { x: 22, y: 32, click: false, label: 'Select invoices' } :
                            phase === 2 ? { x: 26, y: 62, click: true,  label: 'Consolidate · 3' } :
                            phase === 3 ? { x: 30, y: 88, click: true,  label: 'Approve payment' } :
                            phase === 4 ? { x: 70, y: 40, click: false, label: '4 checks running', labelDir: 'bl' } :
                                          { x: 72, y: 82, click: false, label: '₹1,11,360 paid',  labelDir: 'bl' }
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
                                    {phase === 1 ? 'Three open invoices for Apex Industrial — finance reviews what to pay.' :
                                        phase === 2 ? 'Consolidate 3 invoices → 1 transfer · single approval, single payment.' :
                                            phase === 3 ? 'Approve clicked — quadruple validation spins up: PO, GR, QC, Contract.' :
                                                phase === 4 ? 'All four checks pass — every claim verified before a single rupee moves.' :
                                                    'Auto-credit applied for rejected qty · ~5% recovered. Pay only what you owe.'}
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

            {/* RIGHT: Text + Steps */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
                    Step 04 · Payment Automation
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Automate Payments.<br />
                    <span className="text-[#3666ff]">Pay Only What You Owe.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Pay a single line item, a full invoice, or consolidate multiple invoices from one vendor into one payment — with credit logic for rejected quantities built in automatically. Every payment is matched against the PO, GR, QC, and contract terms before a single rupee moves. Teams using FactWise recover up to 5% in costs previously lost to payment errors.
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
        </div>
    );
}
