'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Pause, Zap, Mail, RefreshCw, TrendingDown } from 'lucide-react';

const VENDORS_BIDS = [
    { code:'A', name:'Vendor A', r1:'$44.20', r2:'$41.80', r3:'$39.50', best:true  },
    { code:'B', name:'Vendor B', r1:'$45.80', r2:'$43.20', r3:'$41.00', best:false },
    { code:'C', name:'Vendor C', r1:'$47.10', r2:'$44.50', r3:'$43.20', best:false },
    { code:'D', name:'Vendor D', r1:'$48.20', r2:null,     r3:null,     best:false },
];

export default function ReqSection33({ isActive = true }: { isActive?: boolean }) {
    const [phase, setPhase] = useState(1);
    const [isAuto, setIsAuto] = useState(true);

    // Phase 1: Vendors responding on platform
    const [bidN, setBidN] = useState(0);
    // Phase 2: Auto-reminders
    const [reminderStep, setReminderStep] = useState(0);
    const [reminderLog, setReminderLog] = useState(0);
    // Phase 3: AI auto-negotiation rounds
    const [negoRound, setNegoRound] = useState(0);
    const [roundBids, setRoundBids] = useState(0);
    // Phase 4: Direct counter
    const [counterStep, setCounterStep] = useState(0);

    const resetAll = () => {
        setBidN(0); setReminderStep(0); setReminderLog(0);
        setNegoRound(0); setRoundBids(0); setCounterStep(0);
    };

    React.useEffect(() => {
        if (!isAuto || !isActive) return;
        let cancel = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        async function run() {
            while (!cancel && isAuto) {
                resetAll();
                setPhase(1);
                await sleep(300);

                // Phase 1: Bids arriving
                for (let i = 1; i <= 4; i++) {
                    if (cancel) return;
                    setBidN(i);
                    await sleep(500);
                }
                await sleep(1800);

                // Phase 2: Auto-reminders
                if (cancel) return;
                setPhase(2);
                setBidN(0);
                await sleep(400);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setReminderStep(i);
                    await sleep(200);
                    setReminderLog(i);
                    await sleep(600);
                }
                await sleep(1800);

                // Phase 3: AI Negotiation rounds
                if (cancel) return;
                setPhase(3);
                setReminderStep(0); setReminderLog(0);
                await sleep(400);
                for (let r = 1; r <= 3; r++) {
                    if (cancel) return;
                    setNegoRound(r);
                    setRoundBids(0);
                    await sleep(300);
                    for (let b = 1; b <= 4; b++) {
                        if (cancel) return;
                        setRoundBids(b);
                        await sleep(200);
                    }
                    await sleep(700);
                }
                await sleep(2000);

                // Phase 4: Direct counter
                if (cancel) return;
                setPhase(4);
                setNegoRound(0); setRoundBids(0);
                await sleep(400);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setCounterStep(i);
                    await sleep(700);
                }
                await sleep(2200);
            }
        }

        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    const goManual = (p: number) => {
        setIsAuto(false);
        setPhase(p);
        resetAll();
        if (p === 1) { setBidN(4); }
        if (p === 2) { setReminderStep(3); setReminderLog(3); }
        if (p === 3) { setNegoRound(3); setRoundBids(4); }
        if (p === 4) { setCounterStep(3); }
    };

    const steps = [
        { p: 1, title: 'Vendors Respond on Platform' },
        { p: 2, title: 'Auto-Reminders Keep Vendors on Track' },
        { p: 3, title: 'AI Auto-Negotiation — Best Price Driven' },
        { p: 4, title: 'Direct Counter & Manual Negotiation' },
    ];

    const SCHED = [
        { d: 'Day 0', lbl: 'RFQ Sent',       ic: Mail },
        { d: 'Day 2', lbl: 'Auto Reminder',   ic: RefreshCw },
        { d: 'Day 4', lbl: 'Auto Escalation', ic: Zap },
        { d: 'Day 5', lbl: 'All Bids In',     ic: Check },
    ];

    return (
        <div id="req-section-3-3" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{ __html: `
            .s33-stage { flex:1; background:#fbfcfe; border:1px solid rgba(15,23,42,0.06); border-radius:16px; padding:18px; position:relative; overflow:hidden; min-height:400px; }
            .s33-scene { position:absolute; top:18px; left:18px; right:18px; bottom:84px; opacity:0; transition:opacity .4s ease; pointer-events:none; overflow:hidden; }
            .s33-scene.on { opacity:1; pointer-events:auto; }
            .s33-bidRow { background:white; border:1px solid rgba(15,23,42,0.07); border-radius:10px; padding:10px 12px; display:flex; align-items:center; gap:10px; font-size:11px; opacity:0; transform:translateX(-10px); transition:all .45s cubic-bezier(.22,.61,.36,1); }
            .s33-bidRow.in { opacity:1; transform:translateX(0); }
            .s33-bidRow.best { border-color:rgba(0,184,132,0.3); background:#f6fcf9; }
            .s33-schedLine { position:relative; background:white; border:1px solid rgba(15,23,42,0.06); border-radius:14px; padding:20px 16px; flex-shrink:0; }
            .s33-schedTrack { position:relative; height:2px; background:#e2e8f0; border-radius:2px; margin:0 10px 16px; }
            .s33-schedTrack::after { content:''; position:absolute; left:0; top:0; height:100%; width:var(--p,0%); background:#3666ff; border-radius:2px; transition:width .8s ease; }
            .s33-schedStops { display:flex; justify-content:space-between; }
            .s33-schedDot { width:18px; height:18px; border-radius:50%; background:white; border:2px solid #cbd5e1; display:grid; place-items:center; transition:all .35s cubic-bezier(.34,1.56,.64,1); }
            .s33-schedDot.fired { background:#3666ff; border-color:#3666ff; box-shadow:0 0 0 4px rgba(54,102,255,0.15); }
            .s33-schedDot.done { background:#00b884; border-color:#00b884; box-shadow:0 0 0 4px rgba(0,184,132,0.15); }
            .s33-logRow { display:flex; align-items:center; gap:12px; padding:9px 13px; background:white; border:1px solid rgba(15,23,42,0.06); border-radius:10px; font-size:11px; color:#475569; opacity:0; transform:translateY(5px); transition:all .35s ease; }
            .s33-logRow.in { opacity:1; transform:translateY(0); }
            .s33-negoTable { width:100%; border-collapse:separate; border-spacing:0 4px; }
            .s33-negoTable th { font-size:8px; font-weight:800; color:#94a3b8; letter-spacing:.08em; text-transform:uppercase; padding:4px 8px; text-align:left; }
            .s33-negoCell { padding:8px 8px; font-size:10px; }
            .s33-negoRow { background:white; border:1px solid rgba(15,23,42,0.07); transition:all .4s ease; }
            .s33-negoRow.best { background:#f6fcf9; }
            .s33-roundBadge { display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:5px; font-size:8.5px; font-weight:800; font-family:'JetBrains Mono',monospace; }
            .s33-counterBubble { background:white; border:1px solid rgba(15,23,42,0.08); border-radius:12px; padding:10px 13px; opacity:0; transform:translateY(6px); transition:all .45s cubic-bezier(.22,.61,.36,1); }
            .s33-counterBubble.in { opacity:1; transform:translateY(0); }
            .s33-counterBubble.buyer { border-left:3px solid #3666ff; }
            .s33-counterBubble.vendor { border-left:3px solid #00b884; }
            .s33-cap { position:absolute; left:18px; bottom:14px; right:18px; font-size:11px; font-weight:600; color:#64748b; line-height:1.5; display:flex; align-items:center; gap:12px; padding:10px 14px; background:white; border:1px solid rgba(15,23,42,0.08); border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.03); transition:opacity .35s ease,transform .35s ease; opacity:0; transform:translateY(10px); pointer-events:none; }
            .s33-cap.on { opacity:1; transform:translateY(0); }
            .s33-cap .cd { width:5px; height:5px; border-radius:50%; background:#3666ff; flex-shrink:0; animation:s33-pulse 1.6s ease-in-out infinite; }
            @keyframes s33-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
            ` }} />

            {/* LEFT: Text + Steps */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 order-1 lg:order-1 space-y-6 text-left"
            >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-ping" />
                    AI Negotiation
                </div>
                <h3 className="text-[28px] md:text-[36px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Negotiate Using AI.<br />
                    <span className="text-[#3666ff]">Pay Less Every Time.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Vendors respond directly on the platform — no emails, no scattered replies, no re-entry while automated reminders keep them on track. When it's time to negotiate, FactWise's AI drives vendors to their best price using your custom criteria — or take control yourself and counter, push back, and negotiate directly on the platform.
                </p>

                <div className="flex flex-col gap-2 mt-8 text-left">
                    {steps.map((item) => (
                        <div
                            key={item.p}
                            onClick={() => goManual(item.p)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                phase === item.p
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {phase === item.p && <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                    phase === item.p ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                    : phase > item.p ? 'border-[#00b884] bg-[#00b884] text-white'
                                    : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${
                                    phase === item.p ? 'text-[#3666ff]' : phase > item.p ? 'text-slate-700' : 'text-slate-500'
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
                className="lg:col-span-6 order-2 lg:order-2 relative"
            >
                <div
                    className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.22),0_15px_40px_-10px_rgba(54,102,255,0.15)] overflow-hidden flex flex-col justify-between select-none min-h-[510px] lg:h-[510px] w-full"
                >
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <TrendingDown className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Negotiation Hub</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500 truncate">Hydraulic Seals</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                            <span className={`size-1.5 rounded-full ${isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                            <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">{isAuto ? 'Auto-Pilot' : 'Manual'}</span>
                        </div>
                    </div>

                    <div className="s33-stage">

                        {/* SCENE 1: Bids arriving on platform */}
                        <div className={`s33-scene ${phase === 1 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:8, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>Vendor Bids · Platform Submissions</span>
                                    <span style={{ fontSize:9, color: bidN >= 4 ? '#00b884' : '#f59e0b', fontWeight:800, fontFamily:"'JetBrains Mono',monospace" }}>{bidN}/4 RECEIVED</span>
                                </div>
                                <div style={{ display:'grid', gridTemplateColumns:'auto 1.2fr 0.8fr 0.8fr', gap:8, fontSize:8, color:'#94a3b8', fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0 6px 4px' }}>
                                    <div>Vendor</div><div>Name</div><div>Unit Price</div><div>Status</div>
                                </div>
                                {VENDORS_BIDS.map((v, i) => (
                                    <div key={v.code} className={`s33-bidRow ${bidN > i ? 'in' : ''} ${v.best && bidN > i ? 'best' : ''}`} style={{ transitionDelay:`${i*0.08}s` }}>
                                        <div style={{ width:28, height:28, borderRadius:8, background:v.best ? 'linear-gradient(135deg,#059669,#10b981)' : 'linear-gradient(135deg,#475569,#64748b)', display:'grid', placeItems:'center', color:'white', fontSize:9, fontWeight:800, flexShrink:0 }}>{v.code}</div>
                                        <div style={{ flex:1, fontWeight:700, color:'#0b1322', fontSize:10 }}>{v.name}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, fontSize:11, color: v.best ? '#00b884' : '#0b1322' }}>{v.r1}</div>
                                        <div style={{ fontSize:8, fontWeight:800, padding:'3px 7px', borderRadius:4, background: bidN > i ? (v.best ? 'rgba(0,184,132,0.1)' : 'rgba(54,102,255,0.08)') : '#f1f5f9', color: bidN > i ? (v.best ? '#00b884' : '#3666ff') : '#94a3b8' }}>
                                            {bidN > i ? (v.best ? '★ BEST' : 'SUBMITTED') : 'PENDING'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SCENE 2: Auto-reminders schedule */}
                        <div className={`s33-scene ${phase === 2 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                <div className="s33-schedLine">
                                    <div style={{ fontSize:11, fontWeight:700, color:'#475569', marginBottom:14, display:'flex', alignItems:'center', gap:7 }}>
                                        <div style={{ width:7, height:7, borderRadius:'50%', background:'#3666ff', animation:'s33-pulse 1.6s infinite' }} />
                                        Auto Follow-Up Schedule
                                    </div>
                                    <div className="s33-schedTrack" style={{ '--p': `${Math.min(100,(reminderStep/SCHED.length)*100)}%` } as React.CSSProperties} />
                                    <div className="s33-schedStops">
                                        {SCHED.map((st, i) => {
                                            const Ic = st.ic;
                                            const fired = reminderStep > i;
                                            const done = reminderStep > i + 1 || (i === SCHED.length-1 && reminderStep >= SCHED.length);
                                            return (
                                                <div key={st.d} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                                                    <div className={`s33-schedDot ${fired ? 'fired' : ''} ${done ? 'done' : ''}`}>
                                                        {fired && <Ic size={8} color="white" />}
                                                    </div>
                                                    <div style={{ fontSize:9, fontWeight:800, color: fired ? (done ? '#00b884' : '#3666ff') : '#94a3b8', fontFamily:"'JetBrains Mono',monospace" }}>{st.d}</div>
                                                    <div style={{ fontSize:9, color:'#64748b', textAlign:'center', maxWidth:70, lineHeight:1.3 }}>{st.lbl}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                                    {[
                                        { ic: Mail,      text: <>RFQ sent to <b>6 vendors</b></>,                       meta: 'T+0',   color:'#3666ff' },
                                        { ic: RefreshCw, text: <>Auto-reminder fired to <b>2 non-responders</b></>,    meta: 'T+48h', color:'#f59e0b' },
                                        { ic: Check,     text: <><b>6 of 6</b> bids collected · Negotiations ready</>, meta: 'T+5d',  color:'#00b884' },
                                    ].slice(0, reminderLog).map((row, i) => (
                                        <div key={i} className="s33-logRow in" style={{ transitionDelay:`${i*0.1}s` }}>
                                            <div style={{ width:24, height:24, borderRadius:6, background:`rgba(${row.color==='#3666ff'?'54,102,255':row.color==='#f59e0b'?'245,158,11':'0,184,132'},0.1)`, color:row.color, display:'grid', placeItems:'center', flexShrink:0 }}>
                                                <row.ic size={11} />
                                            </div>
                                            <div style={{ flex:1 }}>{row.text}</div>
                                            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#94a3b8' }}>{row.meta}</div>
                                        </div>
                                    ))}
                                </div>
                                {reminderStep >= 3 && (
                                    <div style={{ padding:'9px 13px', background:'rgba(0,184,132,0.06)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:10, fontSize:10, fontWeight:700, color:'#065f46', textAlign:'center' }}>
                                        ✓ Your team sent 0 follow-up emails · FactWise handled it all
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 3: AI Auto-Negotiation Rounds */}
                        <div className={`s33-scene ${phase === 3 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:8, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                                        <div style={{ width:7, height:7, borderRadius:'50%', background:'#3666ff', animation:'s33-pulse 1.6s infinite' }} />
                                        <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>AI Auto-Negotiation</span>
                                    </div>
                                    {negoRound > 0 && (
                                        <span style={{ fontSize:9, fontWeight:800, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", background:'rgba(54,102,255,0.09)', border:'1px solid rgba(54,102,255,0.15)', borderRadius:5, padding:'2px 8px' }}>
                                            ROUND {negoRound}/3 · RUNNING
                                        </span>
                                    )}
                                </div>

                                <div style={{ background:'white', border:'1px solid rgba(15,23,42,0.07)', borderRadius:10, padding:'10px 12px', fontSize:10, color:'#475569' }}>
                                    <div style={{ fontSize:9, fontWeight:800, color:'#94a3b8', letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:"'JetBrains Mono',monospace", marginBottom:6 }}>Criteria: Target $34.50 · 500+ pcs · Delivery &lt; 30d</div>
                                    <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                                        {['Price Target Met', 'Lead Time', 'Payment Terms', 'Quality Cert'].map(c => (
                                            <span key={c} style={{ fontSize:8.5, fontWeight:700, color:'#3666ff', background:'rgba(54,102,255,0.07)', border:'1px solid rgba(54,102,255,0.12)', padding:'3px 8px', borderRadius:4 }}>{c}</span>
                                        ))}
                                    </div>
                                </div>

                                <table className="s33-negoTable">
                                    <thead>
                                        <tr><th>Vendor</th><th>Round 1</th><th>Round 2</th><th>Round 3</th><th>Δ Total</th></tr>
                                    </thead>
                                    <tbody>
                                        {VENDORS_BIDS.map((v, i) => (
                                            <tr key={v.code} className={`s33-negoRow ${v.best ? 'best' : ''}`} style={{ opacity: roundBids > i ? 1 : 0.3, transition:'opacity .3s ease' }}>
                                                <td className="s33-negoCell" style={{ borderLeft:`3px solid ${v.best ? '#00b884' : 'transparent'}`, borderRadius:'6px 0 0 6px', paddingLeft:8 }}>
                                                    <div style={{ fontWeight:700, color:'#0b1322' }}>{v.code}</div>
                                                    <div style={{ fontSize:8.5, color:'#94a3b8', fontFamily:"'JetBrains Mono',monospace" }}>{v.name}</div>
                                                </td>
                                                <td className="s33-negoCell" style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:'#94a3b8' }}>{v.r1}</td>
                                                <td className="s33-negoCell" style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color: negoRound >= 2 ? '#0b1322' : '#e2e8f0' }}>{negoRound >= 2 ? (v.r2 ?? '—') : '—'}</td>
                                                <td className="s33-negoCell" style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color: negoRound >= 3 ? (v.best ? '#00b884' : '#0b1322') : '#e2e8f0' }}>{negoRound >= 3 ? (v.r3 ?? '—') : '—'}</td>
                                                <td className="s33-negoCell">
                                                    {negoRound >= 3 && v.r3 && (
                                                        <span style={{ fontSize:8.5, fontWeight:800, color:'#00b884', background:'rgba(0,184,132,0.1)', borderRadius:4, padding:'2px 5px' }}>
                                                            ↓{Math.round((1 - parseFloat(v.r3.replace('$','')) / parseFloat(v.r1.replace('$',''))) * 100)}%
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {negoRound >= 3 && (
                                    <div style={{ padding:'8px 13px', background:'rgba(0,184,132,0.07)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:9, fontSize:10, fontWeight:700, color:'#065f46', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                        <span>✓ AI drove Vendor A to best price · 0 messages sent by your team</span>
                                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:800, color:'#00b884' }}>$39.50 ↓10.6%</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 4: Direct Counter */}
                        <div className={`s33-scene ${phase === 4 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:8, borderBottom:'1px solid rgba(15,23,42,0.06)', display:'flex', alignItems:'center', gap:7 }}>
                                    <div style={{ width:7, height:7, borderRadius:'50%', background:'#3666ff', animation:'s33-pulse 1.6s infinite' }} />
                                    Direct Negotiation · Vendor A
                                </div>

                                {[
                                    { side:'vendor', who:'Vendor A', text:'Best offer: $39.50/unit for 500 pcs. Lead time 25 days.', time:'2:14 PM', done: counterStep >= 1 },
                                    { side:'buyer',  who:'You (FW Platform)',text:'Counter: $37.80/unit + 28-day delivery — final.', time:'2:18 PM', done: counterStep >= 2 },
                                    { side:'vendor', who:'Vendor A', text:'Accepted. $37.80/unit · 500 pcs · PO ready to generate.', time:'2:31 PM', done: counterStep >= 3, accepted:true },
                                ].map((msg, i) => (
                                    <div key={i} className={`s33-counterBubble ${msg.done ? 'in' : ''} ${msg.side === 'buyer' ? 'buyer' : 'vendor'}`} style={{ transitionDelay:`${i*0.1}s` }}>
                                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                                            <span style={{ fontSize:10, fontWeight:800, color: msg.side === 'buyer' ? '#3666ff' : '#0b1322' }}>{msg.who}</span>
                                            <span style={{ fontSize:9, color:'#94a3b8', fontFamily:"'JetBrains Mono',monospace" }}>{msg.time}</span>
                                        </div>
                                        <p style={{ fontSize:11, color:'#475569', lineHeight:1.5, margin:0 }}>{msg.text}</p>
                                        {msg.accepted && (
                                            <div style={{ marginTop:6, fontSize:9, fontWeight:800, color:'#00b884', background:'rgba(0,184,132,0.1)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:5, padding:'3px 8px', display:'inline-flex', alignItems:'center', gap:4 }}>
                                                <Check size={9} /> DEAL LOCKED · Ready for PO
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`s33-cap ${phase > 0 ? 'on' : ''}`}>
                            <span className="cd" />
                            <span>
                                {phase === 1 ? 'Every bid submitted directly on the platform. No emails to chase, no data to re-enter, no bids lost in inboxes.' :
                                 phase === 2 ? 'Automated reminders fire on your schedule — no follow-ups needed from your team. Every vendor action logged in real time.' :
                                 phase === 3 ? 'AI runs negotiation rounds against your custom criteria — driving every vendor to their best price without your team sending a single message.' :
                                 'Your negotiation, your rules. Counter, push back, and close — every round tracked and visible.'}
                            </span>
                        </div>
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
