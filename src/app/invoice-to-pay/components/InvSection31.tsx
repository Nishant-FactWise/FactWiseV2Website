'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, Pause, Upload, FileText, Users, Sparkles } from 'lucide-react';
import { FwCursor } from './_invCursor';

const FIELDS = [
    { k: 'Vendor', v: 'Apex Industrial Pvt. Ltd.', conf: 99 },
    { k: 'Invoice No', v: 'INV-AX-9047', conf: 99 },
    { k: 'Date', v: '12 May 2026', conf: 98 },
    { k: 'Against PO', v: 'PO-7821', conf: 97 },
    { k: 'GST · IGST', v: '18% · ₹14,364', conf: 96 },
    { k: 'Net Total', v: '₹94,164', conf: 99 },
];

const CHECKS = [
    { l: 'Vendor matches PO', ok: true, note: null },
    { l: 'GST · format valid', ok: true, note: null },
    { l: 'Qty: PO 400 · INV 380', ok: false, note: 'short 20u' },
    { l: 'Rate: PO ₹200 · INV ₹210', ok: false, note: 'over ₹10/u' },
];

export default function InvSection31({ isActive = true }: { isActive?: boolean }) {
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
                    await sleep(p === 3 ? 3500 : p === 4 ? 3200 : 2800);
                }
            }
        }
        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    const goManual = (p: number) => {
        setIsAuto(false);
        setPhase(p);
    };

    const steps = [
        { p: 1, title: 'Two ways in. One structured invoice flow.' },
        { p: 2, title: 'Drop any format · AI picks it up' },
        { p: 3, title: 'AI extracts every field · confidence scores' },
        { p: 4, title: 'Cross-checks PO · discrepancies flagged' },
        { p: 5, title: 'Posted · multiple invoices per PO supported' },
    ];

    return (
        <div id="inv-section-3-1" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{
                __html: `
            @keyframes inv-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            @keyframes inv-scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(220%)} }
            @keyframes inv-blink { 0%,100%{opacity:1} 50%{opacity:0} }
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
                    Step 01 · AI Invoice Processing
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    AI Powered Invoice Processing.<br />
                    <span className="text-[#3666ff]">Zero Manual Entry.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Vendors create invoices directly on FactWise against any PO — or upload any format and FactWise AI reads, interprets, and structures every invoice automatically. Discrepancies against the PO are flagged the moment an invoice lands, and multiple invoices per PO are fully supported.
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
                                <Sparkles className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Invoice Inbox</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500 truncate">PO-7821 · Apex Industrial</span>
                            </div>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full" style={{ background: 'rgba(54,102,255,0.08)', color: '#3666ff', border: '1px solid rgba(54,102,255,0.2)' }}>
                            {phase >= 4 ? 'AI · auto-verified' : 'AI · live'}
                        </span>
                    </div>

                    {/* Stage */}
                    <div className="relative flex-1 mt-3" style={{ background: '#fbfcfe', borderRadius: 16, border: '1px solid rgba(15,23,42,0.06)', padding: 14, overflow: 'hidden' }}>

                        {/* PO reference strip */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', border: '1px solid #eef2f7', borderRadius: 10, padding: '6px 10px', fontSize: 9.5, marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FileText size={11} color="#94a3b8" />
                                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: '#64748b' }}>PO-7821</span>
                                <span style={{ color: '#cbd5e1' }}>·</span>
                                <span style={{ fontWeight: 600, color: '#475569' }}>Steel Bracket M8 · 400u · ₹200/u</span>
                            </div>
                            <span style={{ fontSize: 7.5, fontWeight: 800, color: '#059669', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 4, padding: '1px 5px', fontFamily: "'JetBrains Mono',monospace" }}>REF</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, height: 'calc(100% - 38px)' }}>
                            {/* LEFT: Channels + dropped invoice */}
                            <div style={{ position: 'relative', background: 'white', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 12, padding: 10, overflow: 'hidden' }}>
                                <div style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace", marginBottom: 6 }}>Source</div>

                                {/* Portal channel */}
                                <div style={{ background: 'white', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 8, padding: 6, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, opacity: phase === 1 ? 1 : 0.45 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(54,102,255,0.07)', border: '1px solid rgba(54,102,255,0.18)', display: 'grid', placeItems: 'center', color: '#3666ff', flexShrink: 0 }}>
                                        <Users size={11} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 9.5, fontWeight: 800, color: '#0b1322', lineHeight: 1.15 }}>Create on FactWise</div>
                                        <div style={{ fontSize: 8, color: '#94a3b8', lineHeight: 1.15, marginTop: 1 }}>Vendor portal · against PO</div>
                                    </div>
                                    <span style={{ fontSize: 7, fontWeight: 800, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>A</span>
                                </div>

                                {/* Upload zone */}
                                <div style={{
                                    background: phase >= 2 ? 'rgba(54,102,255,0.04)' : 'white',
                                    border: phase >= 2 ? '2px dashed rgba(54,102,255,0.4)' : '1px dashed #cbd5e1',
                                    borderRadius: 8, padding: 8,
                                    transition: 'all .4s ease',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(54,102,255,0.07)', border: '1px solid rgba(54,102,255,0.18)', display: 'grid', placeItems: 'center', color: '#3666ff', flexShrink: 0 }}>
                                            <Upload size={11} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 9.5, fontWeight: 800, color: '#0b1322', lineHeight: 1.15 }}>Upload any format</div>
                                            <div style={{ fontSize: 8, color: '#94a3b8', lineHeight: 1.15, marginTop: 1 }}>
                                                {phase === 1 ? 'PDF · PNG · JPG · scan · email' : 'invoice-apex-9047.pdf · 412 KB'}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 7, fontWeight: 800, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>B</span>
                                    </div>
                                </div>

                                {/* Paper invoice — slides in on phase 2+ */}
                                <AnimatePresence>
                                    {phase >= 2 && (
                                        <motion.div
                                            key="paper"
                                            initial={{ opacity: 0, y: -20, rotate: -6, scale: 0.92 }}
                                            animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                                            style={{
                                                position: 'absolute', left: 10, right: 10, bottom: 10,
                                                background: 'white', border: '1px solid #e2e8f0',
                                                borderRadius: 6, overflow: 'hidden',
                                                boxShadow: '0 8px 20px rgba(15,23,42,0.1)',
                                                height: 180,
                                                transformOrigin: 'top center',
                                            }}
                                        >
                                            <div style={{ padding: '4px 8px', borderBottom: '1px solid #f1f5f9', background: '#fdfdfb', display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: 8, fontWeight: 800, color: '#475569', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.04em' }}>APEX INDUSTRIAL PVT. LTD.</span>
                                                <span style={{ fontSize: 7, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>TAX INVOICE</span>
                                            </div>
                                            <div style={{ position: 'relative', padding: 8, fontSize: 8, color: '#475569', fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Inv No: <b style={{ color: '#0b1322' }}>INV-AX-9047</b></span>
                                                    <span>Date: 12-MAY-26</span>
                                                </div>
                                                <div>Ref PO: PO-7821</div>
                                                <div style={{ borderTop: '1px dashed #cbd5e1', margin: '4px 0' }} />
                                                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.5fr 0.6fr 0.8fr', fontSize: 7, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                                                    <span>Item</span><span>Qty</span><span>Rate</span><span>Amount</span>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.5fr 0.6fr 0.8fr', color: '#0b1322' }}>
                                                    <span>Steel Bracket M8</span><span><b>380</b></span><span>₹210</span><span><b>₹79,800</b></span>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.5fr 0.6fr 0.8fr', color: '#94a3b8', fontSize: 7.5 }}>
                                                    <span>GST 18%</span><span /><span /><span>₹14,364</span>
                                                </div>
                                                <div style={{ borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ fontWeight: 800, color: '#475569' }}>NET TOTAL</span>
                                                    <span style={{ fontWeight: 800, color: '#0b1322', fontSize: 10 }}>₹94,164</span>
                                                </div>

                                                {/* Scan line overlay during phase 3 */}
                                                {phase === 3 && (
                                                    <div style={{
                                                        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
                                                    }}>
                                                        <div style={{
                                                            position: 'absolute', left: 0, right: 0, height: '40%',
                                                            background: 'linear-gradient(to bottom, transparent, rgba(54,102,255,0.18) 45%, rgba(54,102,255,0.28) 55%, transparent 100%)',
                                                            borderTop: '1px solid rgba(54,102,255,0.6)',
                                                            borderBottom: '1px solid rgba(54,102,255,0.4)',
                                                            animation: 'inv-scan 1.8s linear infinite',
                                                        }} />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* RIGHT: Structured invoice on FactWise */}
                            <div style={{ position: 'relative', background: 'white', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <span style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace" }}>On FactWise</span>
                                    <span style={{ fontSize: 8.5, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4, color: phase >= 4 ? '#10b981' : phase >= 3 ? '#3666ff' : '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>
                                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', animation: phase >= 3 ? 'inv-pulse 1.2s infinite' : 'none' }} />
                                        {phase >= 4 ? 'verified' : phase >= 3 ? 'parsing' : 'awaiting'}
                                    </span>
                                </div>

                                <div style={{ background: '#fbfcfe', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 8, padding: 8, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6, borderBottom: '1px solid #eef2f7' }}>
                                        <span style={{ fontSize: 9.5, fontWeight: 800, color: '#475569' }}>Invoice draft</span>
                                        <span style={{
                                            fontSize: 7.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", textTransform: 'uppercase', padding: '1px 5px', borderRadius: 3,
                                            background: phase >= 4 ? 'rgba(239,68,68,0.1)' : 'rgba(54,102,255,0.1)',
                                            color: phase >= 4 ? '#ef4444' : '#3666ff'
                                        }}>
                                            {phase >= 4 ? 'matched · 2 flags' : phase >= 3 ? 'extracting' : 'empty'}
                                        </span>
                                    </div>

                                    {/* Extracted fields */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 5 }}>
                                        {FIELDS.map((f, i) => {
                                            const reveal = phase >= 3;
                                            const isFlag = phase >= 4 && f.k === 'Net Total';
                                            return (
                                                <motion.div
                                                    key={f.k}
                                                    initial={{ opacity: 0, x: 6 }}
                                                    animate={{ opacity: reveal ? 1 : 0, x: reveal ? 0 : 6 }}
                                                    transition={{ delay: 0.05 + i * 0.08, duration: 0.3 }}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 8.5, padding: '3px 5px', borderRadius: 3,
                                                        background: isFlag ? 'rgba(239,68,68,0.06)' : 'transparent',
                                                        border: isFlag ? '1px solid rgba(239,68,68,0.25)' : '1px solid transparent'
                                                    }}
                                                >
                                                    <span style={{ color: '#64748b', fontWeight: 600 }}>{f.k}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: '#0b1322' }}>{f.v}</span>
                                                        <span style={{ fontSize: 7, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", padding: '0 3px', borderRadius: 2, background: 'rgba(54,102,255,0.08)', color: '#3666ff' }}>
                                                            {f.conf}%
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* AI 3-way check */}
                                    <motion.div
                                        initial={false}
                                        animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 6 }}
                                        style={{ marginTop: 7, paddingTop: 7, borderTop: '1px solid #eef2f7' }}
                                    >
                                        <div style={{ fontSize: 7, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 4 }}>AI 3-way check</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            {CHECKS.map(c => (
                                                <div key={c.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 8 }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                        {c.ok ? (
                                                            <span style={{ width: 11, height: 11, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#10b981', color: 'white' }}>
                                                                <Check size={7} strokeWidth={4} />
                                                            </span>
                                                        ) : (
                                                            <span style={{ width: 11, height: 11, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#ef4444', color: 'white', fontSize: 7, fontWeight: 800 }}>!</span>
                                                        )}
                                                        <span style={{ color: '#475569' }}>{c.l}</span>
                                                    </span>
                                                    {c.note && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: '#dc2626', fontSize: 7.5 }}>{c.note}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Animated cursor */}
                        <FwCursor pose={
                            phase === 1 ? { x: 22, y: 30, click: false, label: 'Drag · drop' } :
                            phase === 2 ? { x: 22, y: 56, click: true,  label: 'Drop invoice.pdf' } :
                            phase === 3 ? { x: 38, y: 60, click: false, label: 'AI scanning…' } :
                            phase === 4 ? { x: 78, y: 60, click: true,  label: 'Discrepancy flagged', labelDir: 'bl' } :
                                          { x: 82, y: 22, click: false, label: 'Posted · 2 of 2',  labelDir: 'bl' }
                        }/>

                        {/* Multi-invoice stack — phase 5 */}
                        <AnimatePresence>
                            {phase === 5 && (
                                <motion.div
                                    key="multi"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{ position: 'absolute', right: 18, top: 10, zIndex: 20 }}
                                >
                                    {[2, 1, 0].map(i => (
                                        <div key={i} style={{
                                            position: 'absolute', right: i * 4, top: i * 4,
                                            width: 130, height: 42,
                                            background: 'white',
                                            border: '1px solid rgba(54,102,255,0.3)',
                                            borderRadius: 6,
                                            boxShadow: '0 6px 12px rgba(0,0,0,0.06)',
                                            zIndex: 10 - i, padding: 6,
                                        }}>
                                            {i === 0 && (
                                                <>
                                                    <div style={{ fontSize: 8, fontWeight: 800, color: '#3666ff', fontFamily: "'JetBrains Mono',monospace" }}>INV-AX-9047 · #{i + 1}</div>
                                                    <div style={{ fontSize: 7.5, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>Multiple invoices · 1 PO</div>
                                                    <div style={{ fontSize: 8, fontWeight: 800, color: '#059669', marginTop: 1 }}>✓ Posted</div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

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
                                    {phase === 1 ? 'Two channels open — vendors create directly on FactWise, or upload any file format.' :
                                        phase === 2 ? 'Drop a paper invoice, a scan, a PDF — FactWise picks it up the moment it lands.' :
                                            phase === 3 ? 'AI reads, interprets, and extracts every field with confidence scores.' :
                                                phase === 4 ? 'AI cross-checks against the PO — discrepancies flagged before approval, not after payment.' :
                                                    'Multiple invoices per PO supported. Every invoice in, structured, verified.'}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Control footer */}
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
