'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, Pause, Truck, Sparkles, Clock } from 'lucide-react';
import { FwCursor } from './_invCursor';

export default function InvSection32({ isActive = true }: { isActive?: boolean }) {
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
        { p: 2, title: 'GR created against any invoice or PO — attachments included' },
        { p: 3, title: 'Received quantities recorded line by line — in real time' },
        { p: 4, title: 'Short shipments and damaged goods flagged the moment they arrive' },
        { p: 5, title: 'AI cross-checks GR against invoice and PO — mismatches surface instantly' },
    ];

    const boxState = (i: number): 'pending' | 'received' | 'damaged' => {
        if (phase <= 1) return 'pending';
        if (phase === 2) return i === 0 ? 'received' : 'pending';
        if (phase === 3) return (i === 0 || i === 1 || i === 4 || i === 5) ? 'received' : 'pending';
        if (phase === 4) return (i === 0 || i === 1 || i === 4 || i === 5) ? 'received' : i === 3 ? 'damaged' : 'pending';
        return i === 3 ? 'damaged' : 'received';
    };
    const received = phase <= 1 ? 0 : phase === 2 ? 100 : phase === 3 ? 400 : phase === 4 ? 400 : 500;
    const damaged = phase >= 4 ? 100 : 0;
    const pending = 600 - received - damaged;

    const lines = [
        { sku: 'BRK-M8-304', name: 'Steel Bracket M8', ordered: 400, inv: 380, rcvd: phase <= 1 ? 0 : phase === 2 ? 100 : phase === 3 ? 200 : phase === 4 ? 200 : 300, dmg: damaged, st: phase >= 4 ? 'short' : phase >= 2 ? 'partial' : 'pending' },
        { sku: 'BRK-M6-201', name: 'Steel Bracket M6', ordered: 200, inv: 200, rcvd: phase >= 3 ? 200 : 0, dmg: 0, st: phase >= 3 ? 'ok' : 'pending' },
    ];

    return (
        <div id="inv-section-3-2" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{
                __html: `
            @keyframes inv-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            @keyframes inv-ping  { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.5);opacity:0} }
            @keyframes inv-dash  { to { stroke-dashoffset:-12; } }
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
                                <Truck className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Goods Receipt</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500 truncate">GR-{phase >= 5 ? '9241' : 'draft'} · INV-AX-9047</span>
                            </div>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-[2px] rounded-full" style={{ background: 'rgba(54,102,255,0.08)', color: '#3666ff', border: '1px solid rgba(54,102,255,0.2)' }}>
                            {phase >= 5 ? 'AI · matched' : 'receiving'}
                        </span>
                    </div>

                    {/* Stage */}
                    <div className="relative flex-1 mt-3" style={{ background: '#fbfcfe', borderRadius: 16, border: '1px solid rgba(15,23,42,0.06)', padding: 14, overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 10, height: 'calc(100% - 60px)' }}>
                            {/* LEFT: dock with truck + boxes */}
                            <div style={{ position: 'relative', background: 'white', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 12, padding: 8, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace" }}>Receiving · Bay 3</span>
                                    <span style={{ fontSize: 8, fontWeight: 800, color: '#64748b', fontFamily: "'JetBrains Mono',monospace", display: 'flex', alignItems: 'center', gap: 3 }}>
                                        <Clock size={8} /> 09:42 today
                                    </span>
                                </div>

                                {/* Dock floor with truck and boxes */}
                                <div style={{
                                    position: 'relative', borderRadius: 8, padding: 6, height: 180,
                                    background: 'repeating-linear-gradient(45deg, #f1f5f9 0 6px, #fff 6px 12px)',
                                    border: '1px solid #e2e8f0',
                                }}>
                                    {/* Truck */}
                                    <motion.div
                                        initial={{ x: -60, opacity: 0 }}
                                        animate={{ x: phase >= 1 ? 0 : -60, opacity: phase >= 1 ? 1 : 0 }}
                                        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                                        style={{ position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%)' }}
                                    >
                                        <svg width="60" height="36" viewBox="0 0 100 60" fill="none">
                                            <rect x="62" y="14" width="26" height="26" rx="3" fill="#1A1D2E" />
                                            <rect x="66" y="18" width="18" height="10" rx="1" fill="#a3c5ff" />
                                            <rect x="6" y="8" width="58" height="34" rx="2" fill="#fff" stroke="#1A1D2E" strokeWidth="2" />
                                            <line x1="20" y1="8" x2="20" y2="42" stroke="#1A1D2E" strokeWidth="1.4" />
                                            <line x1="36" y1="8" x2="36" y2="42" stroke="#1A1D2E" strokeWidth="1.4" />
                                            <line x1="52" y1="8" x2="52" y2="42" stroke="#1A1D2E" strokeWidth="1.4" />
                                            <text x="35" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fontWeight="700" fill="#3666ff">APEX</text>
                                            <circle cx="18" cy="48" r="6" fill="#1A1D2E" />
                                            <circle cx="50" cy="48" r="6" fill="#1A1D2E" />
                                            <circle cx="74" cy="48" r="6" fill="#1A1D2E" />
                                        </svg>
                                    </motion.div>

                                    {/* Boxes grid */}
                                    <div style={{ position: 'absolute', left: 66, right: 4, top: 8, bottom: 8, display: 'grid', gridTemplateColumns: 'repeat(3, 30px)', gridTemplateRows: 'repeat(2, 30px)', gap: '6px 6px', justifyContent: 'center', alignContent: 'center' }}>
                                        {[
                                            { name: 'A1·100u' },
                                            { name: 'A2·100u' },
                                            { name: 'A3·100u' },
                                            { name: 'A4·100u' },
                                            { name: 'B1·100u' },
                                            { name: 'B2·100u' },
                                        ].map((box, i) => {
                                            const st = boxState(i);
                                            const isDmg = st === 'damaged';
                                            const isRcv = st === 'received';
                                            const pingNow = (phase === 2 && i === 0) || (phase === 3 && (i === 4 || i === 5)) || (phase === 4 && i === 3);
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.1 + i * 0.06 }}
                                                    style={{
                                                        position: 'relative',
                                                        aspectRatio: '1/1',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: 6,
                                                        border: '2px solid',
                                                        background: isDmg ? 'rgba(239,68,68,0.08)' : isRcv ? 'rgba(16,185,129,0.08)' : '#fff',
                                                        borderColor: isDmg ? '#ef4444' : isRcv ? '#10b981' : '#cbd5e1',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all .4s',
                                                    }}
                                                >
                                                    <svg viewBox="0 0 24 24" width="55%" height="55%" fill="none"
                                                        stroke={isDmg ? '#ef4444' : isRcv ? '#10b981' : '#94a3b8'} strokeWidth="1.8">
                                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                        <line x1="3.27" y1="6.96" x2="12" y2="12.01" />
                                                        <line x1="20.73" y1="6.96" x2="12" y2="12.01" />
                                                        <line x1="12" y1="22.08" x2="12" y2="12" />
                                                    </svg>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: 0,
                                                        marginTop: 1,
                                                        lineHeight: 1
                                                    }}>
                                                        <span style={{
                                                            fontSize: 7.5,
                                                            fontWeight: 800,
                                                            fontFamily: "'JetBrains Mono',monospace",
                                                            color: isDmg ? '#dc2626' : isRcv ? '#059669' : '#475569'
                                                        }}>
                                                            {box.name.split('·')[0]}
                                                        </span>
                                                        <span style={{
                                                            fontSize: 6,
                                                            fontWeight: 700,
                                                            fontFamily: "'JetBrains Mono',monospace",
                                                            color: isDmg ? '#ef4444' : isRcv ? '#10b981' : '#94a3b8',
                                                            marginTop: 0.5
                                                        }}>
                                                            {box.name.split('·')[1]}
                                                        </span>
                                                    </div>
                                                    {(isRcv || isDmg) && (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                            style={{
                                                                position: 'absolute', top: -5, right: -5, width: 14, height: 14, borderRadius: '50%',
                                                                background: isDmg ? '#ef4444' : '#10b981',
                                                                color: 'white', display: 'grid', placeItems: 'center', fontSize: 7, fontWeight: 800
                                                            }}
                                                        >
                                                            {isDmg ? '!' : <Check size={7} strokeWidth={4} />}
                                                        </motion.div>
                                                    )}
                                                    {pingNow && (
                                                        <span style={{
                                                            position: 'absolute', inset: 0, borderRadius: 6, border: '2px solid',
                                                            borderColor: phase === 4 && i === 3 ? '#ef4444' : '#3666ff',
                                                            animation: 'inv-ping 0.9s ease-out infinite'
                                                        }} />
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Counters */}
                                <div style={{ marginTop: 6, padding: '6px 8px', borderRadius: 8, border: '1px solid rgba(15,23,42,0.07)', background: 'white', display: 'flex', justifyContent: 'space-around' }}>
                                    {[
                                        { l: 'Accepted', v: received, c: '#10b981' },
                                        { l: 'Damaged', v: damaged, c: '#ef4444' },
                                        { l: 'Pending', v: pending, c: '#94a3b8' },
                                        { l: 'Expected', v: 600, c: '#1A1D2E' },
                                    ].map(s => (
                                        <div key={s.l} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: 7, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
                                            <motion.div key={`${s.l}-${s.v}`} initial={{ y: -3, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                                style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 12, color: s.c }}>
                                                {s.v}
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: Line items + AI 3-way match */}
                            <div style={{ position: 'relative', background: 'white', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace", marginBottom: 6 }}>Line item · receipt</div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.5fr 0.5fr 0.6fr 0.7fr', gap: 4, fontSize: 7, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 6px', borderBottom: '1px solid #eef2f7' }}>
                                    <div>Item</div><div>PO</div><div>Inv</div><div>Recv</div><div>Status</div>
                                </div>
                                {lines.map((l, i) => (
                                    <motion.div key={l.sku} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                                        style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.5fr 0.5fr 0.6fr 0.7fr', gap: 4, alignItems: 'center', padding: '5px 6px', fontSize: 9, borderBottom: '1px solid #f8fafc' }}
                                    >
                                        <div>
                                            <div style={{ fontWeight: 800, color: '#0b1322', fontSize: 9 }}>{l.name}</div>
                                            <div style={{ fontSize: 7, color: '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>{l.sku}</div>
                                        </div>
                                        <div style={{ fontFamily: "'JetBrains Mono',monospace", color: '#64748b' }}>{l.ordered}</div>
                                        <div style={{ fontFamily: "'JetBrains Mono',monospace", color: '#64748b' }}>{l.inv}</div>
                                        <motion.div key={`${l.rcvd}-${l.dmg}`} initial={{ y: -3, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                            style={{
                                                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
                                                color: l.st === 'short' ? '#dc2626' : l.st === 'ok' ? '#059669' : '#3666ff'
                                            }}>
                                            {l.rcvd}{l.dmg > 0 && <span style={{ color: '#ef4444', fontSize: 7 }}> · −{l.dmg}</span>}
                                        </motion.div>
                                        <div>
                                            <span style={{
                                                fontSize: 7, fontWeight: 800, padding: '1px 5px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.06em',
                                                background: l.st === 'short' ? 'rgba(239,68,68,0.1)' : l.st === 'ok' ? 'rgba(16,185,129,0.1)' : 'rgba(54,102,255,0.1)',
                                                color: l.st === 'short' ? '#dc2626' : l.st === 'ok' ? '#059669' : '#3666ff'
                                            }}>
                                                {l.st === 'short' ? 'Short' : l.st === 'ok' ? 'OK' : l.st === 'partial' ? 'Partial' : 'Pending'}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* AI 3-way match */}
                                <div style={{
                                    marginTop: 8, padding: 8, borderRadius: 10,
                                    background: phase >= 5 ? 'linear-gradient(135deg, rgba(54,102,255,0.06), white)' : '#fbfcfe',
                                    border: phase >= 5 ? '1px solid rgba(54,102,255,0.3)' : '1px solid #eef2f7'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <span style={{ fontSize: 8, fontWeight: 800, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Sparkles size={9} /> AI · 3-way check
                                        </span>
                                        <span style={{ fontSize: 7, fontWeight: 800, color: phase >= 5 ? '#10b981' : '#94a3b8', fontFamily: "'JetBrains Mono',monospace" }}>
                                            {phase >= 5 ? 'ready' : 'standby'}
                                        </span>
                                    </div>
                                    <div style={{ position: 'relative', height: 54 }}>
                                        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 54" preserveAspectRatio="none">
                                            <path d="M 30 27 L 100 27 L 170 27" stroke="#3666ff" strokeWidth="1" strokeDasharray="3 3"
                                                style={{ opacity: phase >= 5 ? 1 : 0.3, transition: 'opacity .6s', animation: phase >= 5 ? 'inv-dash 1.2s linear infinite' : 'none' }} />
                                        </svg>
                                        {[
                                            { l: 'PO', v: '400', ok: true, x: 14 },
                                            { l: 'INV', v: '380', ok: false, x: 84, note: '−20' },
                                            { l: 'GR', v: '300', ok: false, x: 154, note: '−80' },
                                        ].map(o => (
                                            <div key={o.l} style={{ position: 'absolute', top: 2, left: o.x, width: 32 }}>
                                                <div style={{
                                                    width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'white', fontSize: 9, fontWeight: 800, margin: '0 auto',
                                                    background: phase >= 5 ? (o.ok ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#ef4444,#dc2626)') : '#cbd5e1', transition: 'background .4s'
                                                }}>
                                                    {o.l}
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: 2 }}>
                                                    <div style={{ fontSize: 8, fontWeight: 800, color: '#475569', fontFamily: "'JetBrains Mono',monospace" }}>{o.v}</div>
                                                    {o.note && phase >= 5 && (
                                                        <div style={{ fontSize: 6.5, fontWeight: 800, color: '#dc2626', fontFamily: "'JetBrains Mono',monospace" }}>{o.note}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Animated cursor */}
                        <FwCursor pose={
                            phase === 1 ? { x: 10, y: 28, click: false, label: 'Receiving dock' } :
                            phase === 2 ? { x: 21, y: 24, click: true,  label: 'Scan · Box A1' } :
                            phase === 3 ? { x: 39, y: 40, click: true,  label: 'Scan · Box B2' } :
                            phase === 4 ? { x: 21, y: 40, click: true,  label: 'Mark A4 damaged' } :
                                          { x: 76, y: 56, click: false, label: 'AI 3-way match', labelDir: 'bl' }
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
                                    {phase === 1 ? 'Goods receipts can be created against any invoice — or directly against a PO. Bay 3 is ready to receive.' :
                                        phase === 2 ? 'Tap each delivery to receive — quantities go straight into the line-item record, live.' :
                                            phase === 3 ? 'Partial deliveries are first-class — every line item carries its own running received total.' :
                                                phase === 4 ? 'Damaged on arrival? Flag it on the spot — rejected items captured at the moment they happen.' :
                                                    'AI cross-checks every goods receipt against the invoice and PO — mismatches surface instantly.'}
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
                    Step 02 · Goods Receipt
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Track Every Delivery.<br />
                    <span className="text-[#3666ff]">Record Every Discrepancy.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Create goods receipts against any invoice or PO — recording quantities, flagging damaged goods, and capturing every discrepancy at the line item level in real time. FactWise's AI cross-checks every GR against the original invoice and PO automatically. Nothing assumed. Everything verified.
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
