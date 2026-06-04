'use client';

import React, { useState, useEffect } from 'react';
import {
    Zap, Check, FileText, RefreshCw, Send, Mail, Clock, Play, Pause
} from 'lucide-react';

const SCHEDULE = [
    { d: 'Day 0', lbl: 'RFQ sent', ic: Send },
    { d: 'Day 2', lbl: 'Auto reminder', ic: Mail },
    { d: 'Day 4', lbl: 'Auto escalation', ic: RefreshCw },
    { d: 'Day 5', lbl: 'Quotes received', ic: Check }
];

const WORLD_VENDORS = [
    { code: 'SS', label: 'Europe',     x: 193, y: 60,  arc: 'M 250 102 Q 218 30 193 60',   dur: '0.75s', pinDelay: '0.75s' },
    { code: 'KT', label: 'N. America', x: 93,  y: 72,  arc: 'M 250 102 Q 170 25 93 72',    dur: '1.1s',  pinDelay: '1.1s'  },
    { code: 'GC', label: 'E. Asia',    x: 312, y: 80,  arc: 'M 250 102 Q 285 52 312 80',   dur: '0.5s',  pinDelay: '0.5s'  },
    { code: 'PF', label: 'Pacific',    x: 325, y: 155, arc: 'M 250 102 Q 308 145 325 155', dur: '0.85s', pinDelay: '0.85s' },
    { code: 'VM', label: 'S. America', x: 135, y: 150, arc: 'M 250 102 Q 185 175 135 150', dur: '1.0s',  pinDelay: '1.0s'  },
];

export default function SourcingPanel() {
    const [sourcingPhase, setSourcingPhase] = useState<number>(1);
    const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
    const [rfqIn, setRfqIn] = useState<boolean>(false);
    const [rfqBuildStep, setRfqBuildStep] = useState<number>(0);
    const [vendorN, setVendorN] = useState<number>(0);
    const [pingsIn, setPingsIn] = useState<boolean>(false);
    const [delivered, setDelivered] = useState<boolean>(false);
    const [schedN, setSchedN] = useState<number>(0);
    const [schedLog, setSchedLog] = useState<number>(0);
    const [approveN, setApproveN] = useState<number>(0);

    useEffect(() => {
        if (!isAutoCycling) return;
        let cancel = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        async function runTimeline() {
            while (!cancel && isAutoCycling) {
                setSourcingPhase(1);
                setRfqIn(false); setRfqBuildStep(0);
                setVendorN(0); setPingsIn(false); setDelivered(false);
                setSchedN(0); setSchedLog(0); setApproveN(0);
                await sleep(400);

                // Phase 1: Intelligent RFQ Creation
                if (cancel) return;
                setRfqBuildStep(0);
                await sleep(300);
                setRfqBuildStep(1);
                await sleep(550);
                setRfqBuildStep(2);
                await sleep(550);
                setRfqBuildStep(3);
                await sleep(650);
                setRfqBuildStep(4);
                setRfqIn(true);
                await sleep(1600);

                // Phase 2: Auto-Routed Digital Approvals
                if (cancel) return;
                setSourcingPhase(2);
                setVendorN(5); setPingsIn(true); setDelivered(true);
                setSchedN(4); setSchedLog(3);
                await sleep(500);
                for (let i = 1; i <= 3; i++) {
                    if (cancel) return;
                    setApproveN(i);
                    await sleep(700);
                }
                await sleep(2500);

                // Phase 3: Automated Supplier Fan-Out
                if (cancel) return;
                setSourcingPhase(3);
                setApproveN(0); setRfqBuildStep(0);
                setVendorN(0); setPingsIn(false); setDelivered(false);
                setSchedN(0); setSchedLog(0);
                await sleep(700);
                if (cancel) return;
                setPingsIn(true);
                setVendorN(5);
                await sleep(2200);
                if (cancel) return;
                setDelivered(true);
                await sleep(2000);

                // Phase 4: Inbox-Decoupled Auto Follow-Ups
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

    const setPhaseManual = (targetPhase: number) => {
        setIsAutoCycling(false);
        setSourcingPhase(targetPhase);
        if (targetPhase === 1) {
            setRfqIn(true); setRfqBuildStep(4);
            setVendorN(0); setPingsIn(false); setDelivered(false);
            setSchedN(0); setSchedLog(0); setApproveN(0);
        } else if (targetPhase === 2) {
            setRfqIn(true); setVendorN(5); setPingsIn(true); setDelivered(true);
            setSchedN(4); setSchedLog(3); setApproveN(3);
        } else if (targetPhase === 3) {
            setRfqIn(true); setVendorN(5); setPingsIn(true); setDelivered(true);
            setSchedN(0); setSchedLog(0); setApproveN(0);
        } else if (targetPhase === 4) {
            setRfqIn(true); setVendorN(5); setPingsIn(true); setDelivered(true);
            setSchedN(4); setSchedLog(3); setApproveN(0);
        }
    };

    return (
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
            <style dangerouslySetInnerHTML={{ __html: `
            .sp-stage {
              flex: 1;
              background: #fbfcfe;
              border: 1px solid rgba(15,23,42,0.06);
              border-radius: 16px;
              padding: 18px;
              position: relative;
              overflow: hidden;
              min-height: 440px;
            }
            .sp-scene {
              position: absolute;
              inset: 18px;
              opacity: 0;
              transition: opacity .4s ease;
              pointer-events: none;
            }
            .sp-scene.on {
              opacity: 1;
              pointer-events: auto;
            }
            .sp-steps {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 14px 20px 0;
            }
            .sp-steps .pd {
              height: 4px;
              background: #e2e8f0;
              border-radius: 99px;
              flex: 1;
              transition: all .35s ease;
            }
            .sp-steps .pd.on { background: #3666ff; }
            .sp-steps .pd.done { background: #cbd5e1; }
            .sp-rfq {
              position: absolute;
              left: 50%;
              top: 8px;
              width: 200px;
              padding: 12px 14px;
              background: white;
              border: 1px solid rgba(54,102,255,0.25);
              border-radius: 12px;
              transform: translateX(-50%) scale(0.85);
              opacity: 0;
              box-shadow: 0 10px 25px -8px rgba(54,102,255,0.25);
              transition: all .55s cubic-bezier(.22,.61,.36,1);
              z-index: 4;
            }
            .sp-rfq.in { transform: translateX(-50%) scale(1); opacity: 1; }
            .sp-rfq::after {
              content: "";
              position: absolute;
              inset: -4px;
              border-radius: 16px;
              border: 1.5px solid rgba(54,102,255,0.2);
              animation: sp-ring 2.4s ease-out infinite;
              opacity: 0;
              pointer-events: none;
            }
            .sp-rfq.in::after { opacity: 1; }
            @keyframes sp-ring {
              0% { transform: scale(0.94); opacity: 0.7; }
              100% { transform: scale(1.12); opacity: 0; }
            }
            .sp-rfq .rh { display: flex; justify-content: space-between; align-items: center; }
            .sp-rfq .rh .tag {
              font-family: 'JetBrains Mono', monospace;
              font-size: 9px; font-weight: 800; color: #3666ff; letter-spacing: 0.06em;
            }
            .sp-rfq .rh .live {
              font-size: 9px; font-weight: 700; color: #00b884;
              display: flex; align-items: center; gap: 4px;
            }
            .sp-rfq .rh .live::before {
              content: ""; width: 5px; height: 5px; border-radius: 50%; background: #00b884;
            }
            .sp-rfq .rtitle {
              font-size: 12px; font-weight: 800; color: #0b1322;
              margin-top: 6px; letter-spacing: -0.015em; line-height: 1.2;
            }
            .sp-rfq .rmeta {
              font-size: 10px; color: #64748b; margin-top: 3px;
              display: flex; gap: 12px;
            }
            .sp-rfq .rmeta b { color: #0b1322; font-weight: 700; }
            .sp-sched {
              position: absolute;
              inset: 0;
              display: flex;
              flex-direction: column;
              gap: 14px;
            }
            .sp-schedTrack {
              position: relative;
              background: white;
              border: 1px solid rgba(15,23,42,0.06);
              border-radius: 14px;
              padding: 24px 20px 20px;
            }
            .sp-schedLine {
              position: absolute;
              left: 36px; right: 36px; top: 48px;
              height: 2px; background: #e2e8f0; border-radius: 2px;
            }
            .sp-schedLine::after {
              content: "";
              position: absolute;
              left: 0; top: 0; height: 100%;
              width: var(--p, 0%);
              background: #3666ff; border-radius: 2px;
              transition: width .8s ease;
            }
            .sp-schedStops {
              position: relative;
              display: flex;
              justify-content: space-between;
              margin: 0 8px;
            }
            .sp-schedStop {
              display: flex; flex-direction: column;
              align-items: center; gap: 7px;
              position: relative; z-index: 2;
            }
            .sp-schedDot {
              width: 18px; height: 18px;
              border-radius: 50%;
              background: white;
              border: 2px solid #cbd5e1;
              display: grid; place-items: center;
              transition: all .35s cubic-bezier(.34,1.56,.64,1);
            }
            .sp-schedDot.fired { background: #3666ff; border-color: #3666ff; box-shadow: 0 0 0 4px rgba(54,102,255,0.15); }
            .sp-schedDot.fired svg { color: white; }
            .sp-schedDot.done { background: #00b884; border-color: #00b884; box-shadow: 0 0 0 4px rgba(0,184,132,0.15); }
            .sp-schedLbl {
              font-size: 10px; font-weight: 800; color: #94a3b8;
              letter-spacing: 0.04em;
              font-family: 'JetBrains Mono', monospace;
            }
            .sp-schedSub { font-size: 10px; color: #64748b; text-align: center; max-width: 80px; line-height: 1.3; }
            .sp-schedStop.fired .sp-schedLbl { color: #3666ff; }
            .sp-schedStop.done .sp-schedLbl { color: #00b884; }
            .sp-schedLog { display: flex; flex-direction: column; gap: 8px; flex: 1; min-height: 0; }
            .sp-logRow {
              display: flex; align-items: center; gap: 12px;
              padding: 10px 14px;
              background: white;
              border: 1px solid rgba(15,23,42,0.06);
              border-radius: 10px;
              font-size: 11px; color: #475569;
              opacity: 0; transform: translateY(6px);
              transition: all .35s ease;
            }
            .sp-logRow.in { opacity: 1; transform: translateY(0); }
            .sp-logRow .lic {
              width: 24px; height: 24px; border-radius: 6px;
              background: rgba(54,102,255,0.1); color: #3666ff;
              display: grid; place-items: center; flex-shrink: 0;
            }
            .sp-logRow .lt { flex: 1; }
            .sp-logRow .lt b { color: #0b1322; font-weight: 700; }
            .sp-logRow .lm { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #94a3b8; }
            /* Approval */
            .sp-approve { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; }
            .sp-approveHeader {
              display: flex; align-items: center; justify-content: space-between;
              padding-bottom: 8px;
              border-bottom: 1px solid rgba(15,23,42,0.06);
            }
            .sp-approveHeader .ah-left { display: flex; align-items: center; gap: 8px; }
            .sp-approveHeader .ah-dot {
              width: 7px; height: 7px; border-radius: 50%; background: #3666ff;
              animation: sp-pulse 1.6s ease-in-out infinite;
            }
            .sp-approveHeader .ah-title { font-size: 11px; font-weight: 700; color: #475569; }
            .sp-approveHeader .ah-badge {
              font-family: 'JetBrains Mono', monospace;
              font-size: 10px; font-weight: 700; color: #00b884;
              opacity: 0; transition: opacity .4s ease;
            }
            .sp-approveHeader .ah-badge.in { opacity: 1; }
            .sp-acard {
              background: white;
              border: 1px solid rgba(15,23,42,0.08);
              border-radius: 12px;
              padding: 11px 13px;
              display: flex; align-items: center; gap: 11px;
              opacity: 0; transform: translateY(8px);
              transition: all .45s cubic-bezier(.22,.61,.36,1);
              position: relative; overflow: hidden;
            }
            .sp-acard.in { opacity: 1; transform: translateY(0); }
            .sp-acard.done { border-color: rgba(0,184,132,0.3); background: linear-gradient(to right,#f6fcf9,white); }
            .sp-acard .ac-av {
              width: 32px; height: 32px; border-radius: 50%;
              display: grid; place-items: center;
              font-size: 9px; font-weight: 800; color: white; flex-shrink: 0;
            }
            .sp-acard .ac-body { flex: 1; min-width: 0; }
            .sp-acard .ac-name { font-size: 11px; font-weight: 800; color: #0b1322; letter-spacing: -0.01em; }
            .sp-acard .ac-role { font-size: 9.5px; color: #94a3b8; font-family: 'JetBrains Mono',monospace; letter-spacing: 0.04em; margin-top: 1px; }
            .sp-acard .ac-amt { font-family: 'JetBrains Mono',monospace; font-size: 11px; font-weight: 800; color: #0b1322; white-space: nowrap; }
            .sp-acard .ac-stamp {
              display: flex; align-items: center; gap: 5px;
              font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
              padding: 4px 9px; border-radius: 6px; flex-shrink: 0;
              transition: all .4s ease;
            }
            .sp-acard .ac-stamp.pending { background: #f1f5f9; color: #94a3b8; }
            .sp-acard .ac-stamp.approved { background: rgba(0,184,132,0.12); color: #00b884; }
            .sp-acard::after {
              content: "";
              position: absolute; inset: 0;
              background: linear-gradient(90deg, transparent, rgba(0,184,132,0.06), transparent);
              transform: translateX(-100%); transition: transform 0s;
            }
            .sp-acard.done::after { transform: translateX(100%); transition: transform .6s ease; }
            /* Phase 1: RFQ Builder */
            .sp-rfqBuilder { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 9px; }
            .sp-builderHeader {
              display: flex; align-items: center; justify-content: space-between;
              padding-bottom: 10px; border-bottom: 1px solid rgba(15,23,42,0.06); flex-shrink: 0;
            }
            .sp-builderHeader .bh-title {
              font-size: 11px; font-weight: 700; color: #475569;
              display: flex; align-items: center; gap: 7px;
            }
            .sp-builderHeader .bh-badge {
              font-size: 8.5px; font-weight: 800; color: #3666ff;
              background: rgba(54,102,255,0.09); border: 1px solid rgba(54,102,255,0.15);
              border-radius: 5px; padding: 2px 7px; letter-spacing: 0.07em;
              font-family: 'JetBrains Mono',monospace;
            }
            .sp-rfqField {
              background: white; border: 1px solid rgba(15,23,42,0.08);
              border-radius: 10px; padding: 10px 12px;
              opacity: 0; transform: translateY(7px);
              transition: all 0.4s cubic-bezier(.22,.61,.36,1);
              flex-shrink: 0;
            }
            .sp-rfqField.in { opacity: 1; transform: translateY(0); }
            .sp-rfqField.active { border-color: rgba(54,102,255,0.35); box-shadow: 0 0 0 3px rgba(54,102,255,0.07); }
            .sp-rfqField .fl {
              font-size: 8.5px; font-weight: 800; color: #94a3b8;
              letter-spacing: 0.1em; text-transform: uppercase;
              font-family: 'JetBrains Mono',monospace; margin-bottom: 5px;
            }
            .sp-rfqField .fv {
              font-size: 12px; font-weight: 700; color: #0b1322;
              display: flex; align-items: center; gap: 5px; min-height: 16px;
            }
            .sp-rfqField .fv .sp-cursor {
              display: inline-block; width: 1.5px; height: 13px;
              background: #3666ff; border-radius: 1px;
              animation: sp-blink 1s step-start infinite;
            }
            @keyframes sp-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
            .sp-rfqField .fmatch {
              font-size: 9px; font-weight: 700; color: #00b884;
              margin-top: 5px; display: flex; align-items: center; gap: 4px;
              opacity: 0; transition: opacity .35s ease .1s;
            }
            .sp-rfqField .fmatch.show { opacity: 1; }
            .sp-rfqRow { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex-shrink: 0; }
            .sp-priceCard {
              background: white; border: 1px solid rgba(15,23,42,0.08);
              border-radius: 12px; padding: 11px 12px;
              opacity: 0; transform: translateY(7px);
              transition: all 0.4s cubic-bezier(.22,.61,.36,1);
              flex: 1; min-height: 0;
            }
            .sp-priceCard.in { opacity: 1; transform: translateY(0); }
            .sp-priceHead {
              display: flex; align-items: center; gap: 7px;
              margin-bottom: 8px; padding-bottom: 7px;
              border-bottom: 1px solid rgba(15,23,42,0.05);
            }
            .sp-priceHead .ph-dot {
              width: 5px; height: 5px; border-radius: 50%; background: #3666ff;
              animation: sp-pulse 1.6s ease-in-out infinite;
            }
            .sp-priceHead .ph-title {
              font-size: 9.5px; font-weight: 800; color: #475569;
              letter-spacing: 0.08em; text-transform: uppercase;
              font-family: 'JetBrains Mono',monospace;
            }
            .sp-priceDataRow {
              display: flex; align-items: center; justify-content: space-between;
              padding: 5px 0; border-bottom: 1px solid rgba(15,23,42,0.04);
              opacity: 0; transform: translateX(-6px);
              transition: opacity 0.35s ease, transform 0.35s ease;
            }
            .sp-priceDataRow:last-child { border-bottom: none; }
            .sp-priceDataRow.in { opacity: 1; transform: translateX(0); }
            .sp-priceDataRow .pdr-label { font-size: 10px; font-weight: 600; color: #64748b; }
            .sp-priceDataRow .pdr-val {
              font-family: 'JetBrains Mono',monospace;
              font-size: 11px; font-weight: 800; color: #0b1322;
              display: flex; align-items: center; gap: 5px;
            }
            .sp-priceDataRow.should .pdr-label { color: #0b1322; font-weight: 700; }
            .sp-priceDataRow.should .pdr-val { color: #00b884; }
            .sp-priceDataRow.should .pdr-badge {
              font-size: 8px; font-weight: 800; color: #00b884;
              background: rgba(0,184,132,0.1); border-radius: 4px;
              padding: 2px 5px; letter-spacing: 0.05em;
              font-family: 'JetBrains Mono',monospace;
            }
            .sp-anomalyFlag {
              background: rgba(245,158,11,0.06);
              border: 1px solid rgba(245,158,11,0.22);
              border-radius: 9px; padding: 8px 11px;
              display: flex; align-items: center; gap: 8px;
              font-size: 9.5px; font-weight: 600; color: #92400e;
              opacity: 0; transform: translateY(5px);
              transition: all 0.4s ease; flex-shrink: 0;
            }
            .sp-anomalyFlag.in { opacity: 1; transform: translateY(0); }
            .sp-anomalyFlag .af-icon {
              width: 18px; height: 18px; border-radius: 5px;
              background: rgba(245,158,11,0.15); color: #f59e0b;
              display: grid; place-items: center; flex-shrink: 0;
            }
            .sp-readyRow {
              background: linear-gradient(90deg, rgba(54,102,255,0.07), rgba(0,184,132,0.05));
              border: 1px solid rgba(54,102,255,0.2);
              border-radius: 10px; padding: 9px 13px;
              display: flex; align-items: center; justify-content: space-between;
              opacity: 0; transform: translateY(5px);
              transition: all 0.45s cubic-bezier(.22,.61,.36,1); flex-shrink: 0;
            }
            .sp-readyRow.in { opacity: 1; transform: translateY(0); }
            .sp-readyRow .rr-left { display: flex; align-items: center; gap: 9px; }
            .sp-readyRow .rr-id {
              font-family: 'JetBrains Mono',monospace; font-size: 9px; font-weight: 700;
              color: #3666ff; letter-spacing: 0.04em;
            }
            .sp-readyRow .rr-title { font-size: 11px; font-weight: 800; color: #0b1322; }
            .sp-readyRow .rr-badge {
              font-size: 9px; font-weight: 800; color: #00b884;
              background: rgba(0,184,132,0.1); border: 1px solid rgba(0,184,132,0.2);
              border-radius: 5px; padding: 4px 10px; letter-spacing: 0.05em;
              font-family: 'JetBrains Mono',monospace;
            }
            /* Phase 3: World Map */
            .sp-worldScene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; }
            .sp-worldMapWrap { flex: 1; min-height: 0; position: relative; overflow: hidden; border-radius: 10px; }
            .sp-worldMapWrap::before {
              content: "";
              position: absolute; inset: 0;
              background: url('/images/world-map-dots.png') no-repeat center center / 100% 100%;
              opacity: 0.22;
              filter: saturate(1.4) hue-rotate(5deg);
            }
            .sp-worldSvg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
            .sp-worldOriginGroup { opacity: 0; transition: opacity 0.6s ease; }
            .sp-worldOriginGroup.in { opacity: 1; }
            .sp-worldArc {
              fill: none; stroke-width: 1.8; stroke-linecap: round;
              stroke: #3666ff; stroke-dasharray: 1000; stroke-dashoffset: 1000;
              stroke-opacity: 0; transition: stroke-opacity 0.3s ease, stroke 0.5s ease;
            }
            .sp-worldArc.active {
              stroke-opacity: 0.75;
              animation: sp-arcDraw var(--dur, 1s) cubic-bezier(0.4,0,0.2,1) forwards;
            }
            .sp-worldArc.done { stroke: #00b884; stroke-opacity: 0.85; stroke-dashoffset: 0; }
            @keyframes sp-arcDraw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
            .sp-worldVendorPin { opacity: 0; transform-box: fill-box; transform-origin: center; }
            .sp-worldVendorPin.active {
              animation: sp-pinPop 0.45s cubic-bezier(.34,1.56,.64,1) var(--delay, 0s) both;
            }
            .sp-worldVendorPin.done { opacity: 1; }
            @keyframes sp-pinPop { from { opacity:0; transform:scale(0.1); } to { opacity:1; transform:scale(1); } }
            .sp-worldVendorPin circle { transition: fill 0.5s ease; }
            .sp-worldVenCode {
              font-size: 5px; font-weight: 800; text-anchor: middle;
              font-family: 'JetBrains Mono',monospace;
              transition: fill 0.5s ease; pointer-events: none;
            }
            .sp-worldVenRegion { font-size: 4px; font-weight: 600; text-anchor: middle; fill: #64748b; pointer-events: none; }
            .sp-worldHubRing { fill: #3666ff; fill-opacity: 0; }
            .sp-worldHubLabel {
              font-size: 4.5px; font-weight: 800; text-anchor: middle;
              font-family: 'JetBrains Mono',monospace; fill: #1e40af; letter-spacing: 0.04em;
            }
            .sp-fanStatusBar {
              position: relative; z-index: 3; margin: 0 0 4px;
              background: white; border: 1px solid rgba(15,23,42,0.07);
              border-radius: 9px; padding: 8px 12px;
              display: flex; align-items: center; justify-content: space-between; gap: 10px;
              flex-shrink: 0;
              opacity: 0; transform: translateY(4px);
              transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
            }
            .sp-fanStatusBar.in { opacity: 1; transform: translateY(0); }
            .sp-fanStatusBar .fsb-left {
              display: flex; align-items: center; gap: 7px;
              font-size: 10.5px; font-weight: 700; color: #475569; flex: 1;
            }
            .sp-fanStatusBar .fsb-dot {
              width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
              background: #3666ff;
              animation: sp-pulse 1.4s ease-in-out infinite;
              transition: background 0.4s ease;
            }
            .sp-fanStatusBar.done .fsb-dot { background: #00b884; animation: none; }
            .sp-fanStatusBar.done .fsb-left { color: #065f46; }
            .sp-fanStatusBar .fsb-tag {
              font-family: 'JetBrains Mono',monospace; font-size: 9px; font-weight: 800;
              color: #00b884; background: rgba(0,184,132,0.1); border: 1px solid rgba(0,184,132,0.2);
              border-radius: 5px; padding: 3px 8px; white-space: nowrap; flex-shrink: 0;
            }
            .sp-cap {
              position: absolute; left: 18px; bottom: 14px; right: 18px;
              font-size: 12px; font-weight: 600; color: #64748b; line-height: 1.5;
              display: flex; align-items: center; gap: 12px;
              padding: 12px 16px; background: white;
              border: 1px solid rgba(15,23,42,0.08); border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.03);
              transition: opacity .35s ease, transform .35s ease;
              opacity: 0; transform: translateY(10px); pointer-events: none;
            }
            .sp-cap.on { opacity: 1; transform: translateY(0); }
            .sp-cap .cd {
              width: 5px; height: 5px; border-radius: 50%; background: #3666ff;
              flex-shrink: 0; animation: sp-pulse 1.6s ease-in-out infinite;
            }
            @keyframes sp-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }
            ` }} />

            {/* Graphic Left */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
                <div
                    className="relative rounded-3xl bg-white border border-slate-200/80 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col justify-between select-none"
                    style={{ height: '578px', minHeight: '578px', maxHeight: '578px' }}
                >
                    {/* TOP BAR */}
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-gradient-to-br from-blue-700 to-[#3666ff] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(54,102,255,0.3)] shrink-0">
                                <Zap className="size-3.5" />
                            </div>
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

                    {/* STAGE */}
                    <div className="sp-stage">
                        {/* SCENE 1: RFQ Builder */}
                        <div className={"sp-scene " + (sourcingPhase === 1 ? "on" : "")}>
                            <div className="sp-rfqBuilder">
                                <div className="sp-builderHeader">
                                    <div className="bh-title">
                                        <div style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(54,102,255,0.1)', display: 'grid', placeItems: 'center', color: '#3666ff', flexShrink: 0 }}>
                                            <FileText size={11} />
                                        </div>
                                        New RFQ · Auto-Template
                                    </div>
                                    <div className="bh-badge">CATEGORY: FASTENERS</div>
                                </div>

                                <div className={"sp-rfqField " + (rfqBuildStep >= 1 ? "in " : "") + (rfqBuildStep === 1 ? "active" : "")}>
                                    <div className="fl">PART / SPECIFICATION</div>
                                    <div className="fv">
                                        {rfqBuildStep >= 1 && "Steel Bracket M8 · 304 Stainless Steel"}
                                        {rfqBuildStep === 1 && <span className="sp-cursor" />}
                                    </div>
                                    <div className={"fmatch " + (rfqBuildStep >= 2 ? "show" : "")}>
                                        <Check size={9} /> Matched to MPN: SB-M8-304 · 12 past POs found
                                    </div>
                                </div>

                                <div className="sp-rfqRow">
                                    <div className={"sp-rfqField " + (rfqBuildStep >= 2 ? "in " : "") + (rfqBuildStep === 2 ? "active" : "")}>
                                        <div className="fl">QUANTITY</div>
                                        <div className="fv">
                                            {rfqBuildStep >= 2 && "1,200 pcs"}
                                            {rfqBuildStep === 2 && <span className="sp-cursor" />}
                                        </div>
                                    </div>
                                    <div className={"sp-rfqField " + (rfqBuildStep >= 2 ? "in " : "") + (rfqBuildStep === 2 ? "active" : "")} style={{ transitionDelay: '0.1s' }}>
                                        <div className="fl">DUE DATE</div>
                                        <div className="fv">
                                            {rfqBuildStep >= 2 && "Sep 15, 2026"}
                                            {rfqBuildStep === 2 && <span className="sp-cursor" />}
                                        </div>
                                    </div>
                                </div>

                                <div className={"sp-priceCard " + (rfqBuildStep >= 3 ? "in" : "")}>
                                    <div className="sp-priceHead">
                                        <span className="ph-dot" />
                                        <span className="ph-title">Price Intelligence · Pulling Live Data</span>
                                    </div>
                                    {([
                                        { label: "Last PO Price", val: "₹19.80 / unit", should: false, delay: 0.15 },
                                        { label: "Distributor Price", val: "₹22.40 / unit", should: false, delay: 0.28 },
                                        { label: "Should-Cost (Target)", val: "₹18.10 / unit", should: true, delay: 0.42 },
                                    ] as const).map((row, i) => (
                                        <div key={i} className={"sp-priceDataRow " + (row.should ? "should " : "") + (rfqBuildStep >= 3 ? "in" : "")} style={{ transitionDelay: `${row.delay}s` }}>
                                            <span className="pdr-label">{row.label}</span>
                                            <span className="pdr-val">
                                                {row.val}
                                                {row.should && rfqBuildStep >= 3 && <span className="pdr-badge">TARGET</span>}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className={"sp-anomalyFlag " + (rfqBuildStep >= 4 ? "in" : "")}>
                                    <div className="af-icon"><Zap size={9} /></div>
                                    <span>Market price is <b>9% above</b> should-cost target — FactWise will flag anomalies in all responses</span>
                                </div>

                                <div className={"sp-readyRow " + (rfqBuildStep >= 4 ? "in" : "")}>
                                    <div className="rr-left">
                                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,184,132,0.15)', display: 'grid', placeItems: 'center', color: '#00b884', flexShrink: 0 }}>
                                            <Check size={11} />
                                        </div>
                                        <div>
                                            <div className="rr-id">RFQ-2026-0871</div>
                                            <div className="rr-title">Ready · 5 Vendors Matched</div>
                                        </div>
                                    </div>
                                    <span className="rr-badge">SEND TO VENDORS</span>
                                </div>
                            </div>
                        </div>

                        {/* SCENE 3: World Map Fan-Out */}
                        <div className={"sp-scene " + (sourcingPhase === 3 ? "on" : "")}>
                            <div className="sp-worldScene">
                                <div className="sp-worldMapWrap">
                                    <svg className="sp-worldSvg" viewBox="0 0 360 187" preserveAspectRatio="none">
                                        {WORLD_VENDORS.map((v) => (
                                            <path
                                                key={`arc-${v.code}`}
                                                d={v.arc}
                                                pathLength={1000}
                                                className={"sp-worldArc " + (delivered ? "done" : pingsIn ? "active" : "")}
                                                style={pingsIn && !delivered ? { '--dur': v.dur } as React.CSSProperties : {}}
                                            />
                                        ))}

                                        {pingsIn && !delivered && WORLD_VENDORS.map((v) => (
                                            <circle key={`dot-${v.code}`} r="2.5" fill="#3666ff" opacity="0.9">
                                                <animateMotion dur={v.dur} repeatCount="1" fill="freeze" path={v.arc} />
                                            </circle>
                                        ))}

                                        <g className={"sp-worldOriginGroup " + (rfqIn ? "in" : "")}>
                                            <circle className="sp-worldHubRing" cx="250" cy="102" r="4">
                                                <animate attributeName="r" from="4" to="20" dur="2.2s" repeatCount="indefinite" />
                                                <animate attributeName="fill-opacity" from="0.55" to="0" dur="2.2s" repeatCount="indefinite" />
                                            </circle>
                                            <circle className="sp-worldHubRing" cx="250" cy="102" r="4">
                                                <animate attributeName="r" from="4" to="20" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
                                                <animate attributeName="fill-opacity" from="0.55" to="0" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
                                            </circle>
                                            <circle cx="250" cy="102" r="5" fill={delivered ? '#00b884' : '#3666ff'} style={{ transition: 'fill 0.5s ease' }} />
                                            <circle cx="250" cy="102" r="2.5" fill="white" />
                                            <text x="250" y="90" className="sp-worldHubLabel">FACTWISE · INDIA</text>
                                        </g>

                                        {WORLD_VENDORS.map((v) => {
                                            const pinCls = "sp-worldVendorPin " + (delivered ? "done" : pingsIn ? "active" : "");
                                            const dotFill = delivered ? '#00b884' : '#3666ff';
                                            const ringFill = delivered ? 'rgba(0,184,132,0.2)' : 'rgba(54,102,255,0.15)';
                                            const codeFill = delivered ? '#059669' : '#1e3a8a';
                                            return (
                                                <g
                                                    key={`pin-${v.code}`}
                                                    className={pinCls}
                                                    style={pingsIn && !delivered ? { animationDelay: v.pinDelay } : {}}
                                                >
                                                    <circle cx={v.x} cy={v.y} r="6" fill={ringFill} />
                                                    <circle cx={v.x} cy={v.y} r="3" fill={dotFill} />
                                                    {delivered && (
                                                        <text x={v.x} y={v.y + 1.2} fontSize="4" textAnchor="middle" fill="white" fontWeight="800">✓</text>
                                                    )}
                                                    <text x={v.x} y={v.y + 12} className="sp-worldVenCode" fill={codeFill}>{v.code}</text>
                                                    <text x={v.x} y={v.y + 17} className="sp-worldVenRegion">{v.label}</text>
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </div>

                                <div className={"sp-fanStatusBar " + ((pingsIn || delivered) ? "in " : "") + (delivered ? "done" : "")}>
                                    <div className="fsb-left">
                                        <span className="fsb-dot" />
                                        <span>
                                            {delivered
                                                ? "5 / 5 vendors reached globally · Zero emails sent"
                                                : "Dispatching RFQs to 5 global vendors simultaneously…"}
                                        </span>
                                    </div>
                                    {delivered && <span className="fsb-tag">0 EMAILS</span>}
                                </div>
                            </div>
                        </div>

                        {/* SCENE 4: Schedule */}
                        <div className={"sp-scene " + (sourcingPhase === 4 ? "on" : "")}>
                            <div className="sp-sched">
                                <div className="sp-schedTrack">
                                    <div className="sp-schedLine" style={{ "--p": `${Math.min(100, (schedN / SCHEDULE.length) * 100)}%` } as React.CSSProperties} />
                                    <div className="sp-schedStops">
                                        {SCHEDULE.map((st, i) => {
                                            const Ic = st.ic;
                                            const fired = schedN > i;
                                            const done = schedN > i + 1 || (i === SCHEDULE.length - 1 && schedN >= SCHEDULE.length);
                                            const cls = "sp-schedStop" + (fired ? " fired" : "") + (done ? " done" : "");
                                            return (
                                                <div key={st.d} className={cls}>
                                                    <div className={"sp-schedDot " + (fired ? "fired " : "") + (done ? "done" : "")}>
                                                        {fired && <Ic size={8} />}
                                                    </div>
                                                    <div className="sp-schedLbl">{st.d}</div>
                                                    <div className="sp-schedSub">{st.lbl}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="sp-schedLog">
                                    {[
                                        { ic: Send, t: <><b>RFQ-2026-0871</b> sent to 5 vendors</>, m: "T+0" },
                                        { ic: Mail, t: <>Auto-reminder fired to <b>2 non-responders</b></>, m: "T+48h" },
                                        { ic: Check, t: <><b>5 of 5</b> quotes received</>, m: "T+5d" },
                                    ].slice(0, schedLog).map((row, i) => (
                                        <div key={i} className="sp-logRow in">
                                            <div className="lic"><row.ic size={11} /></div>
                                            <div className="lt">{row.t}</div>
                                            <div className="lm">{row.m}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SCENE 2: Approval Inbox */}
                        <div className={"sp-scene " + (sourcingPhase === 2 ? "on" : "")}>
                            <div className="sp-approve">
                                <div className="sp-approveHeader">
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
                                        <div key={code} className={"sp-acard " + (isIn ? "in " : "") + (isDone ? "done" : "")} style={{ transitionDelay: `${step * 0.1}s` }}>
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

                                <div className={"sp-acard " + (approveN >= 3 ? "in done" : "")} style={{ transitionDelay: '0.3s', marginTop: 2 }}>
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

                        {/* Narrative Caption */}
                        <div className={"sp-cap " + (sourcingPhase > 0 ? "on" : "")}>
                            <span className="cd" />
                            <span>
                                {sourcingPhase === 1 ? "Quick digital setup in minutes with pre-filled category templates. FactWise automatically pulls historical PO rates at the line item level, flagging any should-cost anomalies before launch." :
                                 sourcingPhase === 2 ? "Once a bid is selected, approvals flow down the hierarchy automatically — Buyer → Manager → Finance. Leaders sign off on the platform, auto-generating a full compliance audit trail." :
                                 sourcingPhase === 3 ? "One trigger. Five global suppliers notified instantly. No emails composed, no lists built — vendors respond on the platform." :
                                 sourcingPhase === 4 ? "Emails disappear entirely. FactWise's scheduler manages automatic reminder follow-ups and escalations hands-free, logging supplier bids directly to the platform." : ""}
                            </span>
                        </div>
                    </div>

                    {/* Control Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setIsAutoCycling(!isAutoCycling)}
                                className="size-5 rounded-md hover:bg-slate-100 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                                title={isAutoCycling ? "Pause Autoplay" : "Resume Autoplay"}
                            >
                                {isAutoCycling ? <Pause className="size-3" /> : <Play className="size-3" />}
                            </button>
                            <span className="font-medium">
                                {isAutoCycling ? "Autopilot Active" : "Paused — select phases on the right"}
                            </span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#3666ff] font-bold">FactWise Engine</span>
                    </div>
                </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[11px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3666ff] animate-pulse" />
                    Intelligent Sourcing
                </div>
                <h3 className="text-[24px] md:text-[30px] font-semibold text-[#0D1117] tracking-[-0.025em] leading-[1.18]" style={{ fontFamily: 'var(--font-display)' }}>
                    Your team shouldn't be <br />
                    <span className="text-[#3666ff]">chasing vendors over email.</span>
                </h3>
                <p className="text-slate-400 text-[15px] leading-[1.65] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>
                    Setting up a sourcing event manually means building vendor lists from scratch, writing emails, following up repeatedly, and re-entering responses into a spreadsheet. FactWise automates routine tasks, combined requisitions, and bid analysis so your team focuses on decisions, not data entry.
                </p>

                <div className="flex flex-col gap-2 mt-8 mb-8 text-left">
                    {[
                        { phase: 1, title: "Intelligent RFQ Creation" },
                        { phase: 2, title: "Auto-Routed Digital Approvals" },
                        { phase: 3, title: "Automated Supplier Fan-Out" },
                        { phase: 4, title: "Inbox-Decoupled Auto Follow-Ups" }
                    ].map((item) => (
                        <div
                            key={item.phase}
                            onClick={() => setPhaseManual(item.phase)}
                            className={`relative flex items-center justify-between w-full rounded-2xl py-3.5 px-4 transition-all duration-400 group cursor-pointer overflow-hidden ${
                                sourcingPhase === item.phase
                                    ? 'bg-white border border-[#3666ff]/80 shadow-[0_8px_30px_rgba(54,102,255,0.12)] scale-[1.02] z-10'
                                    : 'bg-transparent border border-transparent hover:bg-white/60 opacity-80 hover:opacity-100'
                            }`}
                        >
                            {sourcingPhase === item.phase && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
                            )}
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-400 ${
                                    sourcingPhase === item.phase
                                        ? 'border-[#3666ff] bg-[#3666ff] text-white shadow-[0_0_12px_rgba(54,102,255,0.4)]'
                                        : sourcingPhase > item.phase
                                        ? 'border-[#00b884] bg-[#00b884] text-white'
                                        : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:border-[#3666ff]/50 group-hover:text-[#3666ff]'
                                }`}>
                                    <Check className="size-3.5" strokeWidth={3} />
                                </div>
                                <span className={`text-[13.5px] font-bold tracking-tight ${
                                    sourcingPhase === item.phase ? 'text-[#3666ff]' : sourcingPhase > item.phase ? 'text-slate-700' : 'text-slate-500'
                                }`}>
                                    {item.title}
                                </span>
                            </div>
                            {sourcingPhase === item.phase && (
                                <span className="relative z-10 text-[9px] font-black text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
