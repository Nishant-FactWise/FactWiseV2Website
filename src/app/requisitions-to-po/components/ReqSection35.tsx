'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Pause, FileText, Zap } from 'lucide-react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

const ALLOC_ITEMS = [
    { item:'Hydraulic Seals', total:500, vendors:[{ name:'Vendor A', qty:350, pct:70, primary:true }, { name:'Vendor E',  qty:150, pct:30, primary:false }] },
    { item:'Control Valves',  total:50,  vendors:[{ name:'Vendor D', qty:50,  pct:100,primary:true }] },
    { item:'Pressure Gauges', total:30,  vendors:[{ name:'Vendor B', qty:30,  pct:100,primary:true }] },
];

const POS_GENERATED = [
    { id:'PO-8810', vendor:'Vendor A', items:1, qty:'350 pcs',  value:'14,910', status:'Issued' },
    { id:'PO-8811', vendor:'Vendor D', items:1, qty:'50 units', value:'2,215',  status:'Issued' },
    { id:'PO-8812', vendor:'Vendor B', items:1, qty:'30 units', value:'1,392',  status:'Issued' },
    { id:'PO-8813', vendor:'Vendor E', items:1, qty:'150 pcs',  value:'6,570',  status:'Issued' },
];

export default function ReqSection35({ isActive = true }: { isActive?: boolean }) {
    const t = useLocalizedText();
    const [phase, setPhase] = useState(1);
    const [isAuto, setIsAuto] = useState(true);

    // Phase 1: Allocation view
    const [allocN, setAllocN] = useState(0);
    const [splitVisible, setSplitVisible] = useState(false);
    // Phase 2: Backup allocation
    const [backupVisible, setBackupVisible] = useState(false);
    // Phase 3: One-click generation
    const [genState, setGenState] = useState<'idle'|'generating'|'done'>('idle');
    const [posN, setPosN] = useState(0);
    // Phase 4: POs issued confirmation
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [reqs, setReqs] = useState(0);

    const resetAll = () => {
        setAllocN(0); setSplitVisible(false); setBackupVisible(false);
        setGenState('idle'); setPosN(0); setConfirmVisible(false); setReqs(0);
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

                // Phase 1: Allocation
                for (let i = 1; i <= 3; i++) { if (cancel) return; setAllocN(i); await sleep(500); }
                await sleep(600);
                setSplitVisible(true);
                await sleep(1800);

                // Phase 2: Backup allocation
                if (cancel) return;
                setPhase(2);
                setAllocN(3); setSplitVisible(true);
                await sleep(400);
                setBackupVisible(true);
                await sleep(2200);

                // Phase 3: Generate
                if (cancel) return;
                setPhase(3);
                setAllocN(0); setSplitVisible(false); setBackupVisible(false);
                await sleep(500);
                setGenState('generating');
                await sleep(800);
                for (let i = 1; i <= 4; i++) { if (cancel) return; setPosN(i); await sleep(300); }
                setGenState('done');
                await sleep(2000);

                // Phase 4: Confirmation
                if (cancel) return;
                setPhase(4);
                setGenState('idle'); setPosN(0);
                await sleep(400);
                setConfirmVisible(true);
                await sleep(400);
                for (let i = 1; i <= 4; i++) { if (cancel) return; setReqs(i); await sleep(300); }
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
        if (p === 1) { setAllocN(3); setSplitVisible(true); }
        if (p === 2) { setAllocN(3); setSplitVisible(true); setBackupVisible(true); }
        if (p === 3) { setGenState('done'); setPosN(4); }
        if (p === 4) { setConfirmVisible(true); setReqs(4); }
    };

    const steps = [
        { p: 1, title: 'Quantity Allocation Across Vendors' },
        { p: 2, title: 'Split Quantities & Backup Allocations' },
        { p: 3, title: 'One-Click PO Generation' },
        { p: 4, title: 'All POs Issued · Audit Trail Saved' },
    ];

    return (
        <div id="req-section-3-5" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{ __html: `
            .s35-stage { flex:1; background:#fbfcfe; border:1px solid rgba(15,23,42,0.06); border-radius:16px; padding:18px; position:relative; overflow:hidden; min-height:400px; }
            .s35-scene { position:absolute; top:18px; left:18px; right:18px; bottom:84px; opacity:0; transition:opacity .4s ease; pointer-events:none; overflow:hidden; }
            .s35-scene.on { opacity:1; pointer-events:auto; }
            .s35-allocCard { background:white; border:1px solid rgba(15,23,42,0.08); border-radius:12px; padding:11px 13px; opacity:0; transform:translateY(8px); transition:all .45s cubic-bezier(.22,.61,.36,1); }
            .s35-allocCard.in { opacity:1; transform:translateY(0); }
            .s35-bar { height:8px; border-radius:4px; background:#e2e8f0; overflow:hidden; margin-top:6px; }
            .s35-barFill { height:100%; border-radius:4px; transition:width 1s ease; }
            .s35-poRow { background:white; border:1px solid rgba(15,23,42,0.07); border-radius:10px; padding:7px 10px; display:grid; grid-template-columns:0.8fr 1.2fr 0.6fr 0.6fr 0.7fr 0.6fr; gap:6px; align-items:center; font-size:10px; opacity:0; transform:scale(0.96); transition:all .4s cubic-bezier(.22,.61,.36,1); }
            .s35-poRow.in { opacity:1; transform:scale(1); }
            .s35-genBtn { display:flex; align-items:center; justify-content:center; gap:8px; padding:8px 16px; border-radius:12px; font-size:12px; font-weight:800; cursor:pointer; transition:all .3s ease; border:none; }
            .s35-genBtn.idle { background:linear-gradient(135deg,#3666ff,#2a6cff); color:white; box-shadow:0 8px 24px rgba(54,102,255,0.35); }
            .s35-genBtn.generating { background:linear-gradient(135deg,#f59e0b,#d97706); color:white; animation:s35-genPulse .9s ease-in-out infinite; }
            .s35-genBtn.done { background:linear-gradient(135deg,#059669,#10b981); color:white; }
            @keyframes s35-genPulse { 0%,100%{box-shadow:0 8px 24px rgba(245,158,11,0.35)} 50%{box-shadow:0 8px 32px rgba(245,158,11,0.55)} }
            .s35-cap { position:absolute; left:18px; bottom:14px; right:18px; font-size:11px; font-weight:600; color:#64748b; line-height:1.5; display:flex; align-items:center; gap:12px; padding:10px 14px; background:white; border:1px solid rgba(15,23,42,0.08); border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.03); transition:opacity .35s ease,transform .35s ease; opacity:0; transform:translateY(10px); pointer-events:none; }
            .s35-cap.on { opacity:1; transform:translateY(0); }
            .s35-cap .cd { width:5px; height:5px; border-radius:50%; background:#3666ff; flex-shrink:0; animation:s35-pulse 1.6s ease-in-out infinite; }
            @keyframes s35-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
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
                    {t('PO Generation')}
                </div>
                <h3 className="text-[28px] md:text-[36px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    {t('Automate PO Generation.')}<br />
                    <span className="text-[#3666ff]">{t('In One Click.')}</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    {t('Once bids are shortlisted, allocate quantities to the best-bidding vendors — split across multiple vendors per item and set backup allocations for security. When allocation is complete, FactWise generates every PO for the entire RFQ in a single click — every line item, vendor, and approval record attached. No manual creation, no missed lines, no delays.')}
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
                                }`}>{t(item.title)}</span>
                            </div>
                            {phase === item.p && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />{t('Active')}
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
                                <FileText className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">PO Generation</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                            <span className={`size-1.5 rounded-full ${isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                            <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">{isAuto ? 'Auto-Pilot' : 'Manual'}</span>
                        </div>
                    </div>

                    <div className="s35-stage">

                        {/* SCENE 1: Allocation */}
                        <div className={`s35-scene ${phase === 1 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    Quantity Allocation · Best Bid Winners
                                </div>
                                {ALLOC_ITEMS.map((item, i) => (
                                    <div key={item.item} className={`s35-allocCard ${allocN > i ? 'in' : ''}`} style={{ transitionDelay:`${i*0.1}s` }}>
                                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                                            <div style={{ fontSize:11, fontWeight:700, color:'#0b1322' }}>{item.item}</div>
                                            <div style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:'#64748b', fontWeight:700 }}>Total: {item.total} units</div>
                                        </div>
                                        {item.vendors.map(v => (
                                            <div key={v.name} style={{ marginBottom:4 }}>
                                                <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, color:'#475569', fontWeight:600, marginBottom:3 }}>
                                                    <span>{v.name}</span>
                                                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color: v.primary ? '#3666ff' : '#94a3b8' }}>{v.qty} pcs ({v.pct}%)</span>
                                                </div>
                                                <div className="s35-bar">
                                                    <div className="s35-barFill" style={{ width: allocN > i ? `${v.pct}%` : '0%', background: v.primary ? 'linear-gradient(90deg,#3666ff,#2a6cff)' : '#94a3b8' }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                {splitVisible && (
                                    <div style={{ padding:'8px 13px', background:'rgba(54,102,255,0.06)', border:'1px solid rgba(54,102,255,0.12)', borderRadius:9, fontSize:10, fontWeight:700, color:'#1e3a8a', display:'flex', justifyContent:'space-between' }}>
                                        <span>Hydraulic Seals split 70/30 across 2 vendors</span>
                                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#3666ff', fontWeight:800 }}>SPLIT ✓</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 2: Backup Allocation */}
                        <div className={`s35-scene ${phase === 2 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    Backup Allocation · Supply Security
                                </div>

                                {/* Primary allocation summary */}
                                <div style={{ background:'white', border:'1px solid rgba(0,184,132,0.25)', borderRadius:10, padding:'10px 12px' }}>
                                    <div style={{ fontSize:9, fontWeight:800, color:'#00b884', fontFamily:"'JetBrains Mono',monospace", marginBottom:6 }}>PRIMARY ALLOCATION · CONFIRMED</div>
                                    {[
                                        'Vendor A   350 pcs Hydraulic Seals (70%)',
                                        'Vendor D   50 units Control Valves (100%)',
                                        'Vendor B   30 units Pressure Gauges (100%)',
                                        'Vendor E   150 pcs Hydraulic Seals (30%)',
                                    ].map((line, i) => (
                                        <div key={i} style={{ fontSize:10, color:'#0b1322', fontWeight:600, padding:'3px 0', borderBottom:'1px solid rgba(15,23,42,0.04)', display:'flex', alignItems:'center', gap:7 }}>
                                            <Check size={10} color="#00b884" />
                                            {line}
                                        </div>
                                    ))}
                                </div>

                                {/* Backup allocation */}
                                {backupVisible && (
                                    <div style={{ background:'rgba(245,158,11,0.04)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:10, padding:'10px 12px', animation:'s35-fadeIn .5s ease forwards' }}>
                                        <div style={{ fontSize:9, fontWeight:800, color:'#92400e', fontFamily:"'JetBrains Mono',monospace", marginBottom:6 }}>⬡ BACKUP ALLOCATION · FALLBACK SECURITY</div>
                                        {[
                                            { primary:'Vendor A   Hyd. Seals', backup:'Vendor B   up to 500 pcs', trigger:'If Vendor A fails SLA' },
                                            { primary:'Vendor D   Control Valves', backup:'Vendor E   up to 50 units', trigger:'If delivery delay > 5d' },
                                        ].map((row, i) => (
                                            <div key={i} style={{ fontSize:9, color:'#475569', padding:'5px 0', borderBottom:'1px solid rgba(245,158,11,0.1)' }}>
                                                <div style={{ fontWeight:700, color:'#0b1322', marginBottom:2 }}>{row.primary}</div>
                                                <div style={{ color:'#92400e', display:'flex', gap:8, flexWrap:'wrap' }}>
                                                    <span>Backup: {row.backup}</span>
                                                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, fontWeight:800 }}>Trigger: {row.trigger}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {backupVisible && (
                                    <div style={{ padding:'8px 13px', background:'rgba(0,184,132,0.07)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:9, fontSize:10, fontWeight:700, color:'#065f46', textAlign:'center' }}>
                                        ✓ Full allocation set · Primary + Backup · Ready to generate POs
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 3: One-click generation */}
                        <div className={`s35-scene ${phase === 3 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    PO Generation · One Click
                                </div>

                                {/* The big button */}
                                <div style={{ display:'flex', justifyContent:'center', padding:'2px 0' }}>
                                    <button className={`s35-genBtn ${genState}`} style={{ minWidth:240 }}>
                                        {genState === 'idle' ? (
                                            <><Zap size={16} /> Generate All POs (4)</>
                                        ) : genState === 'generating' ? (
                                            <><span style={{ display:'inline-block', animation:'s35-spin .6s linear infinite' }}>⚙</span> Generating POs...</>
                                        ) : (
                                            <><Check size={16} /> 4 POs Generated ✓</>
                                        )}
                                    </button>
                                </div>

                                {/* POs appearing */}
                                <div style={{ display:'grid', gridTemplateColumns:'0.7fr 1.2fr 0.6fr 0.6fr 0.7fr 0.6fr', gap:5, fontSize:8, color:'#94a3b8', fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', padding:'0 6px 2px' }}>
                                    <div>PO ID</div><div>Vendor</div><div>Items</div><div>Qty</div><div>Value</div><div>Status</div>
                                </div>
                                {POS_GENERATED.map((po, i) => (
                                    <div key={po.id} className={`s35-poRow ${posN > i ? 'in' : ''}`} style={{ transitionDelay:`${i*0.08}s` }}>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", color:'#3666ff', fontSize:9, fontWeight:700 }}>{po.id}</div>
                                        <div style={{ fontWeight:700, color:'#0b1322', fontSize:9 }}>{po.vendor}</div>
                                        <div style={{ color:'#64748b', textAlign:'center' }}>{po.items}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#0b1322', fontWeight:600 }}>{po.qty}</div>
                                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color:'#0b1322' }}>{po.value}</div>
                                        <div style={{ fontSize:8, fontWeight:800, color:'#00b884', background:'rgba(0,184,132,0.1)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:4, padding:'2px 5px', textAlign:'center' }}>
                                            {genState === 'done' ? '✓ Issued' : posN > i ? '⚡ Gen.' : '—'}
                                        </div>
                                    </div>
                                ))}

                                {genState === 'done' && (
                                    <div style={{ padding:'8px 13px', background:'rgba(0,184,132,0.07)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:9, fontSize:10, fontWeight:700, color:'#065f46', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                        <span>✓ 4 POs issued · Zero manual entry · Zero errors</span>
                                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, color:'#00b884', fontSize:11 }}>25,087</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SCENE 4: Full confirmation + audit trail */}
                        <div className={`s35-scene ${phase === 4 ? 'on' : ''}`}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                <div style={{ fontSize:11, fontWeight:700, color:'#475569', paddingBottom:7, borderBottom:'1px solid rgba(15,23,42,0.06)' }}>
                                    RFQ Complete · Audit Trail Saved
                                </div>

                                {confirmVisible && (
                                    <div style={{ background:'linear-gradient(135deg,rgba(0,184,132,0.08),rgba(54,102,255,0.04))', border:'1.5px solid rgba(0,184,132,0.3)', borderRadius:14, padding:'14px 16px', textAlign:'center' }}>
                                        <div style={{ fontSize:28, fontWeight:800, color:'#0b1322', letterSpacing:'-0.025em', fontFamily:"'JetBrains Mono',monospace" }}>
                                            <span style={{ fontSize:16, color:'#94a3b8' }}>$</span>25,087
                                        </div>
                                        <div style={{ fontSize:10, color:'#64748b', margin:'4px 0 10px' }}>Total PO value · 4 vendors · 3 items · 4 requisitions fulfilled</div>
                                        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                                            {[
                                                { label:'POs Issued',  value:'4' },
                                                { label:'Cycle Time',  value:'< 1 day' },
                                                { label:'Manual Steps',value:'0' },
                                            ].map(k => (
                                                <div key={k.label} style={{ background:'white', borderRadius:8, padding:'7px 8px' }}>
                                                    <div style={{ fontSize:14, fontWeight:800, color:'#0b1322' }}>{k.value}</div>
                                                    <div style={{ fontSize:8, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginTop:2 }}>{k.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Audit trail items */}
                                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                                    <div style={{ fontSize:9, fontWeight:800, color:'#94a3b8', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:"'JetBrains Mono',monospace" }}>AUDIT TRAIL · FULL RECORD</div>
                                    {[
                                        { event:'4 Requisitions raised & approved',     time:'Day 1',   ic:'x9' },
                                        { event:'RFQ created from merged reqs',          time:'Day 1',   ic:'x' },
                                        { event:'6 vendors responded · AI negotiated',   time:'Day 5',   ic:'x' },
                                        { event:'Shortlist & allocation approved',        time:'Day 6',   ic:'&' },
                                    ].slice(0, reqs).map((row, i) => (
                                        <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'white', border:'1px solid rgba(15,23,42,0.07)', borderRadius:9, fontSize:10, color:'#475569', opacity: reqs > i ? 1 : 0, transform: reqs > i ? 'none' : 'translateX(-8px)', transition:'all .35s ease', transitionDelay:`${i*0.08}s` }}>
                                            <span style={{ fontSize:14, flexShrink:0 }}>{row.ic}</span>
                                            <span style={{ flex:1, fontWeight:600 }}>{row.event}</span>
                                            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#3666ff', fontWeight:800 }}>{row.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`s35-cap ${phase > 0 ? 'on' : ''}`}>
                            <span className="cd" />
                            <span>
                                {phase === 1 ? 'Allocate quantities to the best-priced vendors — split across vendors in any ratio.' :
                                 phase === 2 ? 'Backup allocations add supply security — primary misses SLA, FactWise routes to backup.' :
                                 phase === 3 ? 'One click. All POs generated — every line item, every vendor, zero manual entry.' :
                                 'Every step tracked, every approval recorded, full audit trail saved.'}
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

            <style dangerouslySetInnerHTML={{ __html: `
            @keyframes s35-fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
            @keyframes s35-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            ` }} />
        </div>
    );
}
