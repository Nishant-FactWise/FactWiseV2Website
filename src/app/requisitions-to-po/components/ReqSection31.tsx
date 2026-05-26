'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Pause, Upload, FileText, GitBranch } from 'lucide-react';

export default function ReqSection31({ isActive = true }: { isActive?: boolean }) {
    const [phase, setPhase] = useState(1);
    const [isAuto, setIsAuto] = useState(true);

    // Phase 1 — Template Form
    const [formStep, setFormStep] = useState(0);
    const [typedValues, setTypedValues] = useState<string[]>(['', '', '', '', '']);
    // Phase 2 — File Upload + AI Parse
    const [uploadState, setUploadState] = useState<'idle'|'uploading'|'parsing'|'done'>('idle');
    const [fileItems, setFileItems] = useState(0);
    // Phase 3 — Approval Chain
    const [approvalStep, setApprovalStep] = useState(0);

    const resetAll = () => {
        setFormStep(0);
        setTypedValues(['', '', '', '', '']);
        setUploadState('idle');
        setFileItems(0);
        setApprovalStep(0);
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

                // Phase 1: Template Form
                setPhase(1);
                for (let i = 1; i <= 5; i++) {
                    if (cancel) return;
                    setFormStep(i);
                    await sleep(i === 4 ? 800 : 550);
                }
                await sleep(2200);

                // Phase 2: File Upload
                if (cancel) return;
                setPhase(2);
                setFormStep(0);
                await sleep(400);
                setUploadState('uploading');
                await sleep(900);
                setUploadState('parsing');
                await sleep(700);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setFileItems(i);
                    await sleep(420);
                }
                setUploadState('done');
                await sleep(2200);

                // Phase 3: Approval Chain
                if (cancel) return;
                setPhase(3);
                setUploadState('idle');
                setFileItems(0);
                await sleep(400);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setApprovalStep(i);
                    await sleep(700);
                }
                await sleep(2500);
            }
        }

        run();
        return () => { cancel = true; };
    }, [isAuto, isActive]);

    // Typing animation for the currently-active form field
    React.useEffect(() => {
        if (formStep === 0) return;
        const fieldIndex = formStep - 1;
        if (fieldIndex < 0 || fieldIndex >= formFields.length) return;

        const target = formFields[fieldIndex].value;
        let charIndex = 0;
        setTypedValues(prev => {
            const next = [...prev];
            next[fieldIndex] = '';
            return next;
        });

        const interval = setInterval(() => {
            charIndex++;
            setTypedValues(prev => {
                const next = [...prev];
                next[fieldIndex] = target.substring(0, charIndex);
                return next;
            });
            if (charIndex >= target.length) clearInterval(interval);
        }, 22);

        return () => clearInterval(interval);
    }, [formStep]);

    const goManual = (p: number) => {
        setIsAuto(false);
        setPhase(p);
        resetAll();
        if (p === 1) { setFormStep(5); setTypedValues(formFields.map(f => f.value)); }
        if (p === 2) { setUploadState('done'); setFileItems(3); }
        if (p === 3) { setApprovalStep(3); }
    };

    const steps = [
        { p: 1, title: 'Structured Templates & Custom Forms' },
        { p: 2, title: 'AI File Upload & Auto-Parse' },
        { p: 3, title: 'Automated Approval Hierarchy' },
    ];

    const formFields = [
        { label: 'ITEM DESCRIPTION', value: 'Hydraulic Cylinder Seal Kit — DN80' },
        { label: 'QUANTITY REQUIRED', value: '200 units' },
        { label: 'DEPARTMENT', value: 'Engineering · Project Alpha' },
        { label: 'REQUIRED BY', value: 'Jun 15, 2026' },
        { label: 'ESTIMATED VALUE', value: '~$8,400' },
    ];

    const approvers = [
        { name: 'Arjun Mehta',   role: 'REQUESTER · ENGINEERING',       color: '#64748b', code: 'AM' },
        { name: 'Priya Sharma',  role: 'DEPT MANAGER · ENGINEERING',    color: '#3b82f6', code: 'PS' },
        { name: 'Vikram Kumar',  role: 'FINANCE CONTROLLER',             color: '#8b5cf6', code: 'VK' },
    ];

    return (
        <div id="req-section-3-1" className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24">
            <style dangerouslySetInnerHTML={{ __html: `
            .s31-stage {
              flex: 1;
              background: #fbfcfe;
              border: 1px solid rgba(15,23,42,0.06);
              border-radius: 16px;
              padding: 18px;
              position: relative;
              overflow: hidden;
              min-height: 400px;
            }
            .s31-scene {
              position: absolute;
              top: 18px;
              left: 18px;
              right: 18px;
              bottom: 84px;
              opacity: 0;
              transition: opacity .4s ease;
              pointer-events: none;
              overflow: hidden;
            }
            .s31-scene.on {
              opacity: 1;
              pointer-events: auto;
            }
            /* Form scene */
            .s31-form {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 9px;
              align-content: start;
            }
            .s31-formHeader,
            .s31-readyBar,
            .s31-field--wide {
              grid-column: 1 / -1;
            }
            .s31-formHeader {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(15,23,42,0.06);
              flex-shrink: 0;
            }
            .s31-formHeader .fh-title {
              font-size: 11px;
              font-weight: 700;
              color: #475569;
              display: flex;
              align-items: center;
              gap: 7px;
            }
            .s31-formHeader .fh-badge {
              font-size: 8.5px;
              font-weight: 800;
              color: #3666ff;
              background: rgba(54,102,255,0.09);
              border: 1px solid rgba(54,102,255,0.15);
              border-radius: 5px;
              padding: 2px 7px;
              letter-spacing: 0.07em;
              font-family: 'JetBrains Mono', monospace;
            }
            .s31-field {
              background: white;
              border: 1px solid rgba(15,23,42,0.08);
              border-radius: 10px;
              padding: 10px 12px;
              opacity: 0;
              transform: translateY(7px);
              transition: all 0.4s cubic-bezier(.22,.61,.36,1);
              flex-shrink: 0;
            }
            .s31-field.in {
              opacity: 1;
              transform: translateY(0);
            }
            .s31-field .fl {
              font-size: 8.5px;
              font-weight: 800;
              color: #94a3b8;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              font-family: 'JetBrains Mono', monospace;
              margin-bottom: 5px;
            }
            .s31-field .fv {
              font-size: 12px;
              font-weight: 700;
              color: #0b1322;
              display: flex;
              align-items: center;
              gap: 5px;
              min-height: 16px;
            }
            .s31-cursor {
              display: inline-block;
              width: 1.5px;
              height: 13px;
              background: #3666ff;
              border-radius: 1px;
              animation: s31-blink 1s step-start infinite;
            }
            @keyframes s31-blink { 0%,100%{opacity:1} 50%{opacity:0} }
            .s31-matchBadge {
              font-size: 9px;
              font-weight: 700;
              color: #00b884;
              margin-top: 5px;
              display: flex;
              align-items: center;
              gap: 4px;
              opacity: 0;
              transition: opacity .35s ease .1s;
            }
            .s31-matchBadge.show { opacity: 1; }
            .s31-readyBar {
              background: linear-gradient(90deg, rgba(54,102,255,0.07), rgba(0,184,132,0.05));
              border: 1px solid rgba(54,102,255,0.2);
              border-radius: 10px;
              padding: 9px 13px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              opacity: 0;
              transform: translateY(5px);
              transition: all 0.45s cubic-bezier(.22,.61,.36,1);
              flex-shrink: 0;
            }
            .s31-readyBar.in { opacity: 1; transform: translateY(0); }
            /* Upload scene */
            .s31-upload {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
            .s31-dropzone {
              border: 2px dashed rgba(54,102,255,0.3);
              border-radius: 12px;
              background: rgba(54,102,255,0.03);
              padding: 20px;
              text-align: center;
              transition: all .4s ease;
              flex-shrink: 0;
            }
            .s31-dropzone.active {
              border-color: #3666ff;
              background: rgba(54,102,255,0.07);
            }
            .s31-dropzone.done {
              border-color: rgba(0,184,132,0.4);
              background: rgba(0,184,132,0.04);
            }
            .s31-progressBar {
              height: 4px;
              background: #e2e8f0;
              border-radius: 3px;
              overflow: hidden;
              flex-shrink: 0;
            }
            .s31-progressFill {
              height: 100%;
              border-radius: 3px;
              background: linear-gradient(90deg, #3666ff, #00b884);
              transition: width .8s ease;
            }
            .s31-parseItem {
              background: white;
              border: 1px solid rgba(15,23,42,0.08);
              border-radius: 9px;
              padding: 9px 12px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 11px;
              opacity: 0;
              transform: translateX(-8px);
              transition: all .4s cubic-bezier(.22,.61,.36,1);
              flex-shrink: 0;
            }
            .s31-parseItem.in { opacity: 1; transform: translateX(0); }
            /* Approval scene */
            .s31-approval {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .s31-approvalHeader {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 8px;
              border-bottom: 1px solid rgba(15,23,42,0.06);
            }
            .s31-acard {
              background: white;
              border: 1px solid rgba(15,23,42,0.08);
              border-radius: 12px;
              padding: 11px 13px;
              display: flex;
              align-items: center;
              gap: 11px;
              opacity: 0;
              transform: translateY(8px);
              transition: all .45s cubic-bezier(.22,.61,.36,1);
              position: relative;
              overflow: hidden;
              flex-shrink: 0;
            }
            .s31-acard.in { opacity: 1; transform: translateY(0); }
            .s31-acard.done {
              border-color: rgba(0,184,132,0.3);
              background: linear-gradient(to right, #f6fcf9, white);
            }
            .s31-acard .ac-av {
              width: 32px; height: 32px; border-radius: 50%;
              display: grid; place-items: center;
              font-size: 9px; font-weight: 800; color: white; flex-shrink: 0;
            }
            .s31-acard .ac-name { font-size: 11px; font-weight: 800; color: #0b1322; }
            .s31-acard .ac-role { font-size: 9.5px; color: #94a3b8; font-family: 'JetBrains Mono',monospace; letter-spacing:.04em; margin-top:1px; }
            .s31-acard .ac-stamp {
              display: flex; align-items: center; gap: 5px;
              font-size: 9px; font-weight: 800; letter-spacing:.06em; text-transform:uppercase;
              padding: 4px 9px; border-radius: 6px; flex-shrink: 0; transition: all .4s ease;
              margin-left: auto;
            }
            .s31-acard .ac-stamp.pending { background: #f1f5f9; color: #94a3b8; }
            .s31-acard .ac-stamp.approved { background: rgba(0,184,132,0.12); color: #00b884; }
            .s31-acard .ac-stamp.requester { background: rgba(54,102,255,0.08); color: #3666ff; }
            /* Caption */
            .s31-cap {
              position: absolute;
              left: 18px; bottom: 14px; right: 18px;
              font-size: 11px; font-weight: 600; color: #64748b; line-height: 1.5;
              display: flex; align-items: center; gap: 12px;
              padding: 10px 14px;
              background: white; border: 1px solid rgba(15,23,42,0.08);
              border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);
              transition: opacity .35s ease, transform .35s ease;
              opacity: 0; transform: translateY(10px); pointer-events: none;
            }
            .s31-cap.on { opacity: 1; transform: translateY(0); }
            .s31-cap .cd {
              width: 5px; height: 5px; border-radius: 50%; background: #3666ff;
              flex-shrink: 0; animation: s31-pulse 1.6s ease-in-out infinite;
            }
            @keyframes s31-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
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
                    Requisition Management
                </div>
                <h3 className="text-[28px] md:text-[36px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Streamline Every Requisition.<br />
                    <span className="text-[#3666ff]">Every Approval Tracked.</span>
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.65] font-normal text-justify" style={{ fontFamily: 'var(--font-inter)' }}>
                    Replace requisition chaos with customizable templates — or connect your ERP via API to pull requisitions automatically. Upload any file format and FactWise AI autofills every detail, then routes each request through your approval hierarchy so the right people approve the right requests, every time.
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
                    {/* Top bar */}
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <FileText className="size-3.5" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-bold text-slate-800 tracking-tight">Requisition Hub</span>
                                <span className="text-slate-300 text-[10px]">/</span>
                                <span className="text-[11px] font-medium text-slate-500 truncate">Engineering</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                            <span className={`size-1.5 rounded-full ${isAuto ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                            <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                                {isAuto ? 'Auto-Pilot' : 'Manual'}
                            </span>
                        </div>
                    </div>

                    {/* Stage */}
                    <div className="s31-stage">

                        {/* SCENE 1: Template Form */}
                        <div className={`s31-scene ${phase === 1 ? 'on' : ''}`}>
                            <div className="s31-form">
                                <div className="s31-formHeader">
                                    <div className="fh-title">
                                        <div style={{ width:20, height:20, borderRadius:5, background:'rgba(54,102,255,0.1)', display:'grid', placeItems:'center', color:'#3666ff', flexShrink:0 }}>
                                            <FileText size={11} />
                                        </div>
                                        New Requisition · Template Applied
                                    </div>
                                    <div className="fh-badge">ENGINEERING · CAPEX</div>
                                </div>

                                {formFields.map((f, i) => (
                                    <div key={f.label} className={`s31-field ${i === 0 ? 's31-field--wide' : ''} ${formStep > i ? 'in' : ''}`} style={{ transitionDelay: `${i * 0.05}s` }}>
                                        <div className="fl">{f.label}</div>
                                        <div className="fv">
                                            {formStep === i + 1 ? (
                                                <>
                                                    {typedValues[i]}
                                                    <span className="s31-cursor" />
                                                </>
                                            ) : formStep > i + 1 ? f.value : null}
                                        </div>
                                        {i === 0 && (
                                            <div className={`s31-matchBadge ${formStep >= 2 ? 'show' : ''}`}>
                                                <Check size={9} /> Matched · 8 past POs found for this item
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className={`s31-readyBar ${formStep >= 5 ? 'in' : ''}`}>
                                    <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                                        <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(0,184,132,0.15)', display:'grid', placeItems:'center', color:'#00b884', flexShrink:0 }}>
                                            <Check size={11} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize:10, fontWeight:800, color:'#0b1322' }}>All fields validated</div>
                                            <div style={{ fontSize:9, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", marginTop:1 }}>5 vendors pre-matched · Target $42/unit</div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize:9, fontWeight:800, color:'#00b884', background:'rgba(0,184,132,0.1)', border:'1px solid rgba(0,184,132,0.2)', borderRadius:5, padding:'4px 10px', fontFamily:"'JetBrains Mono',monospace" }}>
                                        SUBMIT
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SCENE 2: File Upload + AI Parse */}
                        <div className={`s31-scene ${phase === 2 ? 'on' : ''}`}>
                            <div className="s31-upload">
                                <div className={`s31-dropzone ${uploadState === 'uploading' || uploadState === 'parsing' ? 'active' : ''} ${uploadState === 'done' ? 'done' : ''}`}>
                                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                                        <div style={{ width:36, height:36, borderRadius:10, background: uploadState === 'done' ? 'rgba(0,184,132,0.12)' : 'rgba(54,102,255,0.1)', display:'grid', placeItems:'center', color: uploadState === 'done' ? '#00b884' : '#3666ff' }}>
                                            {uploadState === 'done' ? <Check size={18} /> : <Upload size={18} />}
                                        </div>
                                        <div style={{ fontSize:12, fontWeight:700, color:'#0b1322' }}>
                                            {uploadState === 'idle' ? 'Drop any file — Excel, PDF, CSV' : uploadState === 'uploading' ? 'Uploading PurchaseReq_Apr2026.xlsx...' : uploadState === 'parsing' ? 'AI Reading & Interpreting...' : '✓ Parsed · 3 line items uploaded'}
                                        </div>
                                        <div style={{ fontSize:10, color:'#94a3b8' }}>
                                            {uploadState === 'idle' ? 'No formatting required. FactWise AI handles it.' : uploadState === 'done' ? 'All fields auto-filled. No re-entry needed.' : 'FactWise AI is reading your file...'}
                                        </div>
                                    </div>
                                </div>

                                <div className="s31-progressBar">
                                    <div className="s31-progressFill" style={{ width: uploadState === 'idle' ? '0%' : uploadState === 'uploading' ? '45%' : uploadState === 'parsing' ? '78%' : '100%' }} />
                                </div>

                                <div style={{ fontSize:9, fontWeight:700, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.06em', marginTop:2, marginBottom:4 }}>
                                    {uploadState === 'done' ? 'UPLOADED LINE ITEMS' : 'PARSING STATUS'}
                                </div>

                                {[
                                    { label:'Hydraulic Cylinder Seal DN80', qty:'200 units', val:'$8,400' },
                                    { label:'O-Ring Kit (Viton) #110',       qty:'500 units', val:'$1,250' },
                                    { label:'Piston Rod Chrome 80mm',        qty:'50 units',  val:'$4,200' },
                                ].map((item, i) => (
                                    <div key={item.label} className={`s31-parseItem ${fileItems > i ? 'in' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                                        <div>
                                            <div style={{ fontWeight:700, color:'#0b1322', fontSize:11 }}>{item.label}</div>
                                            <div style={{ fontSize:9, color:'#94a3b8', fontFamily:"'JetBrains Mono',monospace", marginTop:2 }}>{item.qty}</div>
                                        </div>
                                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:11, color:'#0b1322' }}>{item.val}</span>
                                            <span style={{ width:16, height:16, borderRadius:'50%', background:'rgba(0,184,132,0.15)', display:'grid', placeItems:'center', color:'#00b884', flexShrink:0 }}>
                                                <Check size={9} />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SCENE 3: Approval Chain */}
                        <div className={`s31-scene ${phase === 3 ? 'on' : ''}`}>
                            <div className="s31-approval">
                                <div className="s31-approvalHeader">
                                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                        <div style={{ width:7, height:7, borderRadius:'50%', background:'#3666ff', animation:'s31-pulse 1.6s ease-in-out infinite' }} />
                                        <span style={{ fontSize:11, fontWeight:700, color:'#475569' }}>Approval Queue · Auto-routed by hierarchy</span>
                                    </div>
                                    {approvalStep >= 3 && (
                                        <span style={{ fontSize:9, fontWeight:800, color:'#00b884', fontFamily:"'JetBrains Mono',monospace" }}>✓ 2/2 Approved</span>
                                    )}
                                </div>

                                <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(54,102,255,0.06)', border:'1px solid rgba(54,102,255,0.12)', borderRadius:10, padding:'7px 12px' }}>
                                    <div style={{ width:22, height:22, borderRadius:6, background:'rgba(54,102,255,0.12)', display:'grid', placeItems:'center', color:'#3666ff', flexShrink:0 }}>
                                        <GitBranch size={11} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize:10, fontWeight:800, color:'#1e3a8a' }}>Hydraulic Cylinder Seal Kit DN80</div>
                                        <div style={{ fontSize:9, color:'#3666ff', fontFamily:"'JetBrains Mono',monospace", marginTop:1 }}>200 units · Est. $8,400 · Engineering</div>
                                    </div>
                                </div>

                                {approvers.map((a, i) => {
                                    const isIn = approvalStep > i;
                                    const isDone = approvalStep > i + 1 || (i > 0 && approvalStep > i);
                                    const isRequester = i === 0;
                                    return (
                                        <div key={a.code} className={`s31-acard ${isIn ? 'in' : ''} ${isDone && !isRequester ? 'done' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                                            <div className="ac-av" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)` }}>{a.code}</div>
                                            <div>
                                                <div className="ac-name">{a.name}</div>
                                                <div className="ac-role">{a.role}</div>
                                            </div>
                                            <div className={`ac-stamp ${isRequester ? 'requester' : isDone ? 'approved' : 'pending'}`}>
                                                {isRequester ? <>Raised</> : isDone ? <><Check size={9} /> Approved</> : <><span style={{ animation:'s31-pulse 1.5s infinite', display:'inline-block' }}>·</span> Pending</>}
                                            </div>
                                        </div>
                                    );
                                })}

                                {approvalStep >= 3 && (
                                    <div style={{ padding:'9px 13px', background:'linear-gradient(90deg,rgba(0,184,132,0.07),rgba(54,102,255,0.05))', border:'1px solid rgba(0,184,132,0.2)', borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                        <span style={{ fontSize:11, fontWeight:700, color:'#065f46' }}>✓ Fully Approved · Ready for Sourcing</span>
                                        <span style={{ fontSize:9, fontWeight:800, color:'#00b884', fontFamily:"'JetBrains Mono',monospace", background:'rgba(0,184,132,0.1)', border:'1px solid rgba(0,184,132,0.2)', padding:'3px 8px', borderRadius:5 }}>IN PURCHASER QUEUE</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Caption */}
                        <div className={`s31-cap ${phase > 0 ? 'on' : ''}`}>
                            <span className="cd" />
                            <span>
                                {phase === 1 ? 'Customizable templates capture exactly what your business needs — every field, every validation, every time.' :
                                 phase === 2 ? 'Upload any file in any format. FactWise AI reads it, interprets it, and autofills every detail — no reformatting, no re-entry.' :
                                 'Every requisition tracked from raised to approved. Nothing gets lost. Nothing moves without the right sign-off.'}
                            </span>
                        </div>
                    </div>

                    {/* Control Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setIsAuto(!isAuto)}
                                className="size-5 rounded-md hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                            >
                                {isAuto ? <Pause className="size-3" /> : <Play className="size-3" />}
                            </button>
                            <span className="font-medium">
                                {isAuto ? 'Autopilot Active' : 'Paused — click steps to explore'}
                            </span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">FactWise Engine</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
