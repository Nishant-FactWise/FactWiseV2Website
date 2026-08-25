'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import { useLocalizedText } from '@/hooks/useLocalizedText';

/* ===================== TYPES ===================== */

interface COMod {
  id: string;
  name: string;
  role: string;
  initials: string;
  tone: string;
  icon: keyof typeof COI;
}

interface COVen {
  id: string;
  name: string;
  region: string;
  tone: string;
}

interface COPhase {
  id: string;
  label: string;
  lit: string[];
  vendors: string[];
  edges: [string, string][];
  panel: string;
  activity: string;
  badge: string;
}

interface EdgePoint {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  from: string;
  to: string;
}

/* ===================== ICONS ===================== */

const COI = {
  Clipboard: ({ s = 14 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>
    </svg>
  ),
  Layers: ({ s = 14 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Shield: ({ s = 14 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  File: ({ s = 14 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  Wallet: ({ s = 14 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
    </svg>
  ),
  Building: ({ s = 14 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>
    </svg>
  ),
  Lock: ({ s = 10 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Check: ({ s = 10 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Radio: ({ s = 10 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.48M7.76 16.24a6 6 0 0 1 0-8.48M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
    </svg>
  ),
  Bot: ({ s = 12 }: { s?: number }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 4v4M8 2v2M16 2v2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/>
    </svg>
  ),
};

/* ===================== DATA ===================== */

const CO_MODULES: COMod[] = [
  { id: 'priya',   name: 'Priya S.',  role: 'Requisitioner', initials: 'PS', tone: '#3666ff', icon: 'Clipboard' },
  { id: 'raj',     name: 'Raj M.',    role: 'Sourcing',      initials: 'RM', tone: '#0d9488', icon: 'Layers' },
  { id: 'vikram',  name: 'Vikram K.', role: 'Approver',      initials: 'VK', tone: '#7c3aed', icon: 'Shield' },
  { id: 'anika',   name: 'Anika R.',  role: 'Buyer · PO',    initials: 'AR', tone: '#f59e0b', icon: 'File' },
  { id: 'finance', name: 'Meera J.',  role: 'Finance',       initials: 'MJ', tone: '#10b981', icon: 'Wallet' },
];

const CO_VENDORS: COVen[] = [
  { id: 'acme',  name: 'ACME Mfg',  region: 'IN', tone: '#3666ff' },
  { id: 'titan', name: 'Titan Co',  region: 'IN', tone: '#0d9488' },
  { id: 'apex',  name: 'Apex Ltd',  region: 'SG', tone: '#94a3b8' },
];

const CO_PHASES: COPhase[] = [
  { id: 'request',  label: 'Request',     lit: ['priya'],           vendors: [],
    edges: [],
    panel: 'req',      activity: 'Priya created REQ-417 · 12 line items',              badge: '01' },
  { id: 'route',    label: 'Routed',      lit: ['priya', 'raj'],    vendors: [],
    edges: [['priya', 'raj']],
    panel: 'req',      activity: 'Auto-routed to Sourcing — no email, no handoff',      badge: '02' },
  { id: 'rfq',      label: 'RFQ launched',lit: ['raj'],             vendors: ['acme', 'titan', 'apex'],
    edges: [['raj', 'v:acme'], ['raj', 'v:titan'], ['raj', 'v:apex']],
    panel: 'rfq',      activity: 'Raj invited 3 vendors to RFQ-208',                   badge: '03' },
  { id: 'bids',     label: 'Bids in',     lit: ['raj'],             vendors: ['acme', 'titan', 'apex'],
    edges: [['v:acme', 'raj'], ['v:titan', 'raj'], ['v:apex', 'raj']],
    panel: 'bids',     activity: 'ACME bid received · −3.2% vs target price',          badge: '04' },
  { id: 'negotiate',label: 'Negotiate',   lit: ['raj'],             vendors: ['acme'],
    edges: [['raj', 'v:acme'], ['v:acme', 'raj']],
    panel: 'negotiate',activity: 'FW Autobot · counter-offer to ACME · target −5%',   badge: '05' },
  { id: 'approve',  label: 'Approve',     lit: ['raj', 'vikram'],   vendors: ['acme'],
    edges: [['raj', 'vikram']],
    panel: 'approve',  activity: 'Vikram approved the award · ₹4.82L · ACME Mfg',     badge: '06' },
  { id: 'po',       label: 'PO issued',   lit: ['anika'],           vendors: ['acme'],
    edges: [['anika', 'v:acme']],
    panel: 'po',       activity: 'Anika issued PO-882 to ACME · terms locked',         badge: '07' },
  { id: 'invoice',  label: 'Invoice',     lit: ['finance'],         vendors: ['acme'],
    edges: [['v:acme', 'finance']],
    panel: 'invoice',  activity: 'ACME raised INV-119 on platform · 3-way matched',   badge: '08' },
  { id: 'pay',      label: 'Paid',        lit: ['finance'],         vendors: ['acme'],
    edges: [['finance', 'v:acme']],
    panel: 'pay',      activity: 'Meera released payment · ACME notified instantly',  badge: '09' },
];

const CO_PHASE_MS = 2400;

/* ===================== STYLE ===================== */

const CO_STYLE = `
.co-root { position: relative; width: 100%; height: 560px; font-family: 'Inter', system-ui, sans-serif;
  color: #0b1322; background: white;
  border-radius: 22px; overflow: hidden; border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15,23,42,0.06), 0 24px 48px -16px rgba(15,23,42,0.12);
  display: flex; flex-direction: column; min-width: 0; }

.co-chrome { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  background: white; border-bottom: 1px solid #eef1f6; }
.co-chrome-dot { width: 9px; height: 9px; border-radius: 50%; }
.co-chrome-url { margin-left: 8px; padding: 4px 10px; background: #f6f8fc; border: 1px solid #e8edf3;
  border-radius: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px; color: #64748b;
  display: flex; align-items: center; gap: 6px; }
.co-chrome-spacer { flex: 1; }
.co-chrome-live { display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 9px; background: #ecfdf5; border: 1px solid #bbf2db; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.16em; color: #047857; }
.co-chrome-live .pulse { position: relative; width: 6px; height: 6px; }
.co-chrome-live .pulse::after { content: ""; position: absolute; inset: 0; border-radius: 50%;
  background: #00b884; animation: co-pulse 1.6s ease-out infinite; }
@keyframes co-pulse {
  0% { box-shadow: 0 0 0 0 rgba(0,184,132,0.55); }
  70% { box-shadow: 0 0 0 6px rgba(0,184,132,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,184,132,0); }
}

.co-rail { display: flex; align-items: center; gap: 0; padding: 8px 14px;
  background: #f9fafc; border-bottom: 1px solid #eef1f6; overflow: hidden; min-width: 0; }
.co-rail-step { display: flex; align-items: center; gap: 5px; padding: 3px 7px;
  border-radius: 99px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.04em; color: #94a3b8;
  transition: all 0.4s cubic-bezier(0.22,1,0.36,1); white-space: nowrap; flex-shrink: 0; }
.co-rail-step.done { color: #475569; }
.co-rail-step.active { background: #0b1322; color: white; box-shadow: 0 2px 8px -2px rgba(11,19,34,0.3); }
.co-rail-step .n { font-weight: 800; }
.co-rail-sep { width: 10px; height: 1px; background: #e2e8f0; flex-shrink: 0; }
.co-rail-step.done + .co-rail-sep { background: #cbd5e1; }
.co-rail-step.active + .co-rail-sep { background: #cbd5e1; }

.co-grid { position: relative; display: grid; grid-template-columns: 172px minmax(0, 1fr);
  gap: 0; padding: 14px; flex: 1; min-height: 0; min-width: 0; }

.co-col-mod { display: flex; flex-direction: column; gap: 8px; padding-right: 4px; z-index: 2; position: relative; }
.co-col-head { display: flex; align-items: center; justify-content: space-between; padding: 0 4px 4px; }
.co-col-head .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; color: #94a3b8; }
.co-col-head .b { display: inline-flex; align-items: center; gap: 4px;
  padding: 1.5px 6px; background: #eff4ff; border: 1px solid #d8e2ff; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 700; color: #3666ff; }

.co-mod { position: relative; background: white; border: 1px solid #e9eef5; border-radius: 9px;
  padding: 7px 8px; display: flex; align-items: center; gap: 8px;
  transition: all 0.35s cubic-bezier(0.22,1,0.36,1); box-shadow: 0 1px 2px rgba(15,23,42,0.04); }
.co-mod.lit { transform: translateX(2px); }
.co-mod .avatar { width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
  display: grid; place-items: center; color: white; font-size: 9.5px; font-weight: 800;
  letter-spacing: 0.02em; box-shadow: inset 0 1px 0 rgba(255,255,255,0.18); }
.co-mod .info { min-width: 0; flex: 1; }
.co-mod .info .n { font-size: 10.5px; font-weight: 700; color: #1A1D2E; line-height: 1.1;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.co-mod .info .r { margin-top: 2px; display: flex; align-items: center; gap: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
.co-mod .icon-wrap { width: 18px; height: 18px; border-radius: 5px; flex-shrink: 0;
  display: grid; place-items: center; background: #f4f6fa; color: #94a3b8; }
.co-mod.lit .icon-wrap { background: #eff4ff; color: #3666ff; }
.co-mod .pulse { position: absolute; top: 6px; right: 6px; width: 6px; height: 6px;
  border-radius: 50%; opacity: 0; transition: opacity 0.3s; }
.co-mod.lit .pulse { opacity: 1; animation: co-blink 1.4s ease-out infinite; }
@keyframes co-blink {
  0% { transform: scale(0.7); box-shadow: 0 0 0 0 var(--tone, #3666ff); }
  70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(54,102,255,0); }
  100% { transform: scale(0.7); box-shadow: 0 0 0 0 rgba(54,102,255,0); }
}

.co-col-ws { position: relative; padding: 0 8px; z-index: 1; }
.co-ws { position: relative; height: 100%; background: white; border: 1px solid #e9eef5;
  border-radius: 12px; box-shadow: 0 8px 24px -8px rgba(15,23,42,0.08);
  overflow: hidden; display: flex; flex-direction: column; }
.co-ws-tabs { display: flex; align-items: center; gap: 2px; padding: 6px 8px 0;
  border-bottom: 1px solid #f1f5f9; background: #fbfcfe; overflow: hidden; min-width: 0; }
.co-ws-tab { padding: 5px 9px; border-radius: 7px 7px 0 0; font-size: 10px; font-weight: 600;
  color: #94a3b8; display: flex; align-items: center; gap: 5px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.04em;
  border: 1px solid transparent; border-bottom: none; transition: all 0.3s; }
.co-ws-tab.active { background: white; color: #0b1322; border-color: #f1f5f9; }
.co-ws-tab .d { width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1; }
.co-ws-tab.active .d { background: var(--tab-tone, #3666ff); box-shadow: 0 0 0 2px rgba(54,102,255,0.15); }
.co-ws-body { flex: 1; position: relative; padding: 10px 12px; min-height: 0; overflow: hidden; }

.co-panel { position: absolute; inset: 10px 12px; opacity: 0; transform: translateY(8px);
  transition: opacity 0.45s, transform 0.45s; pointer-events: none; }
.co-panel.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
.co-panel-head { display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 6px; margin-bottom: 7px; border-bottom: 1px dashed #e9eef5; }
.co-panel-head .t { font-size: 11px; font-weight: 700; color: #1A1D2E; letter-spacing: -0.005em; }
.co-panel-head .id { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px;
  font-weight: 700; color: #94a3b8; }
.co-panel-head .stamp { display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 7px; border-radius: 99px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }

.co-li { display: grid; grid-template-columns: 12px 1fr 50px 32px; gap: 6px; align-items: center;
  padding: 3.5px 6px; border-radius: 5px; font-size: 10px; color: #475569; }
.co-li:nth-child(odd) { background: #fafbfc; }
.co-li .ck { width: 10px; height: 10px; border-radius: 50%; background: #e9eef5;
  display: grid; place-items: center; color: white; }
.co-li.ok .ck { background: #00b884; }
.co-li .nm { font-weight: 500; color: #1A1D2E; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.co-li .q { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9px; color: #64748b; text-align: right; }
.co-li .u { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; color: #94a3b8; text-align: right; }

.co-bid-row { display: grid; grid-template-columns: 18px 1fr 56px 48px 14px; gap: 6px; align-items: center;
  padding: 4px 6px; border-radius: 6px; font-size: 10px; }
.co-bid-row.head { color: #94a3b8; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.co-bid-row .av { width: 14px; height: 14px; border-radius: 4px; color: white;
  display: grid; place-items: center; font-size: 7.5px; font-weight: 800; }
.co-bid-row .nm { font-size: 10px; font-weight: 600; color: #1A1D2E; }
.co-bid-row .price { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9.5px; font-weight: 700; color: #1A1D2E; text-align: right; }
.co-bid-row .delta { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9.5px; font-weight: 700; text-align: right; }
.co-bid-row .delta.neg { color: #00b884; }
.co-bid-row .delta.pos { color: #ef4444; }
.co-bid-row .star { color: #cbd5e1; font-size: 11px; }
.co-bid-row.winner { background: linear-gradient(90deg, rgba(54,102,255,0.06), transparent);
  outline: 1px solid rgba(54,102,255,0.18); }
.co-bid-row.winner .star { color: #f59e0b; }

.co-msg { display: flex; gap: 8px; margin-bottom: 7px; align-items: flex-start; }
.co-msg .bub { padding: 6px 9px; border-radius: 10px; font-size: 10px; line-height: 1.35;
  max-width: 78%; font-weight: 500; }
.co-msg.bot .bub { background: #eff4ff; color: #1f3fb8; border-bottom-left-radius: 3px; }
.co-msg.bot .av { width: 18px; height: 18px; border-radius: 50%; background: #0b1322;
  display: grid; place-items: center; color: #00b884; flex-shrink: 0; }
.co-msg.vendor { justify-content: flex-end; }
.co-msg.vendor .bub { background: #f6f8fc; color: #1A1D2E; border-bottom-right-radius: 3px;
  border: 1px solid #e9eef5; }
.co-msg.vendor .av { order: 2; width: 18px; height: 18px; border-radius: 50%;
  display: grid; place-items: center; font-size: 7.5px; font-weight: 800; color: white;
  background: #3666ff; flex-shrink: 0; }
.co-msg .bub .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700; }

.co-app { padding: 10px; border: 1px dashed #ddd5ff; border-radius: 9px; background: #fafaff; }
.co-app .row { display: flex; justify-content: space-between; align-items: center;
  padding: 5px 0; border-bottom: 1px dashed #ece8ff; font-size: 10.5px; }
.co-app .row:last-of-type { border: none; }
.co-app .row .k { color: #64748b; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; }
.co-app .row .v { font-weight: 700; color: #1A1D2E; }
.co-app .row .v.tone { color: #7c3aed; }
.co-app .actions { display: flex; gap: 8px; margin-top: 9px; }
.co-app .actions .btn { flex: 1; padding: 6px 8px; border-radius: 7px; font-size: 10px;
  font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 5px; }
.co-app .actions .btn.ok { background: linear-gradient(180deg, #8a7dee 0%, #7c3aed 100%); color: white;
  box-shadow: 0 4px 10px -3px rgba(124,58,237,0.4); }
.co-app .actions .btn.no { background: white; color: #94a3b8; border: 1px solid #e9eef5; }
@keyframes co-stamp { from { opacity: 0; transform: rotate(-8deg) scale(1.6); } to { opacity: 1; transform: rotate(-8deg) scale(1); } }

.co-po { background: #fffbeb; border: 1px solid #fde3ad; border-radius: 9px; padding: 9px 11px; }
.co-po .doc-id { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; font-weight: 800; color: #b45309; }
.co-po .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; margin-top: 6px; }
.co-po .grid2 .k { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; color: #b45309;
  letter-spacing: 0.06em; text-transform: uppercase; }
.co-po .grid2 .v { font-size: 10px; font-weight: 700; color: #92400e; margin-bottom: 4px; }
.co-po .sig { margin-top: 8px; display: flex; align-items: center; gap: 8px;
  padding-top: 7px; border-top: 1px dashed #fde3ad; }
.co-po .sig .lbl { font-size: 9px; color: #b45309; font-family: 'JetBrains Mono', ui-monospace, monospace; }
.co-po .sig .name { font-size: 11px; font-weight: 700; color: #92400e; font-style: italic; }

.co-inv { background: white; border: 1px solid #e9eef5; border-radius: 9px; padding: 10px; }
.co-inv .top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.co-inv .top .id { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; font-weight: 800; color: #1A1D2E; }
.co-inv .top .sub { font-size: 9.5px; color: #64748b; margin-top: 2px; }
.co-inv .match { display: flex; gap: 5px; }
.co-inv .match .pill { display: inline-flex; align-items: center; gap: 3px; padding: 2.5px 6px;
  background: #ecfdf5; border: 1px solid #bbf2db; border-radius: 5px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 700; color: #047857; }
.co-inv .total { display: flex; justify-content: space-between; padding: 7px 10px;
  background: #f6f8fc; border-radius: 7px; margin-top: 6px; }
.co-inv .total .l { font-size: 10px; font-weight: 600; color: #64748b; }
.co-inv .total .v { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px; font-weight: 800; color: #1A1D2E; }

.co-pay { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0; border-radius: 9px; padding: 12px;
  display: flex; align-items: center; gap: 11px; }
.co-pay .seal { width: 42px; height: 42px; border-radius: 50%; background: white;
  display: grid; place-items: center; color: #00b884;
  box-shadow: 0 4px 12px -2px rgba(0,184,132,0.35); flex-shrink: 0;
  animation: co-pop 0.55s cubic-bezier(0.34,1.56,0.64,1); }
@keyframes co-pop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.co-pay .info .t { font-size: 12px; font-weight: 800; color: #065f46; }
.co-pay .info .s { font-size: 10px; color: #047857; margin-top: 2px; font-family: 'JetBrains Mono', ui-monospace, monospace; }
.co-pay .amt { margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 17px; font-weight: 900; color: #065f46; }

.co-rfq-head { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
.co-rfq-head .chip { padding: 3px 7px; background: #ecfeff; border: 1px solid #a5f3fc;
  border-radius: 5px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px; font-weight: 700; color: #0e7490; }
.co-rfq-inv { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.co-rfq-card { background: #fbfcfe; border: 1px solid #e9eef5; border-radius: 7px;
  padding: 7px; text-align: center; }
.co-rfq-card .av { width: 22px; height: 22px; border-radius: 6px; margin: 0 auto 4px;
  display: grid; place-items: center; color: white; font-size: 9px; font-weight: 800; }
.co-rfq-card .n { font-size: 9.5px; font-weight: 700; color: #1A1D2E; }
.co-rfq-card .st { margin-top: 3px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8px; font-weight: 700; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; }
.co-rfq-card.sent .st { color: #00b884; }
.co-rfq-foot { margin-top: 7px; padding: 5px 7px; background: #f9fafc; border-radius: 6px;
  display: flex; justify-content: space-between; font-size: 9.5px; color: #475569; }
.co-rfq-foot .v { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700; color: #1A1D2E; }

.co-col-ven { display: flex; flex-direction: column; gap: 8px; padding-left: 4px;
  z-index: 2; position: relative; }
.co-col-ven .head { display: flex; align-items: center; justify-content: space-between; padding: 0 4px 4px; }
.co-col-ven .head .l { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; color: #94a3b8; }
.co-col-ven .head .b { display: inline-flex; align-items: center; gap: 4px;
  padding: 1.5px 6px; background: #f4f6fa; border: 1px solid #e2e8f0; border-radius: 99px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 700; color: #64748b; }
.co-ven { position: relative; background: white; border: 1px dashed #cbd5e1; border-radius: 9px;
  padding: 7px 8px; transition: all 0.35s cubic-bezier(0.22,1,0.36,1); }
.co-ven.lit { border-style: solid; transform: translateX(-2px); }
.co-ven .row1 { display: flex; align-items: center; gap: 6px; }
.co-ven .row1 .av { width: 22px; height: 22px; border-radius: 5px; color: white;
  display: grid; place-items: center; flex-shrink: 0; }
.co-ven .row1 .n { font-size: 10px; font-weight: 700; color: #1A1D2E; line-height: 1.1; flex: 1;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.co-ven .row1 .rg { padding: 1px 5px; background: #f4f6fa; color: #64748b; border-radius: 4px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.06em; }
.co-ven .row2 { margin-top: 5px; display: flex; align-items: center; gap: 5px;
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 8.5px; font-weight: 600;
  color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
.co-ven.lit .row2 { color: var(--ven-tone, #3666ff); }
.co-ven .row2 .d { width: 5px; height: 5px; border-radius: 50%; background: #cbd5e1; }
.co-ven.lit .row2 .d { background: var(--ven-tone, #3666ff); animation: co-blink 1.6s ease-out infinite; }

.co-flow { position: absolute; inset: 0; pointer-events: none; z-index: 5; }

.co-feed { padding: 9px 14px 11px; background: #f8fafc; color: #0b1322;
  border-top: 1px solid #e9eef5;
  display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
.co-feed-head { display: flex; align-items: center; gap: 7px; margin-bottom: 2px; }
.co-feed-head .l { font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #047857; }
.co-feed-head .s { margin-left: auto; font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5px; color: #94a3b8; }
.co-feed-list { display: flex; flex-direction: column; gap: 3px; }
.co-feed-item { display: flex; align-items: center; gap: 7px; font-size: 11px; line-height: 1.3;
  transition: all 0.4s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.co-feed-item span:last-child { overflow: hidden; text-overflow: ellipsis; }
.co-feed-item .d { width: 4px; height: 4px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; }
.co-feed-item.head-item .d { background: #00b884; box-shadow: 0 0 0 3px rgba(0,184,132,0.15); }
.co-feed-item.head-item { color: #0b1322; font-weight: 600; }
.co-feed-item:not(.head-item) { color: #94a3b8; font-size: 10px; }
`;

/* ===================== HELPERS ===================== */

function coGetEndpoint(target: string, rootEl: HTMLElement): { x: number; y: number } | null {
  let el: Element | null;
  if (target === 'ws') {
    el = rootEl.querySelector('.co-ws');
  } else if (target.startsWith('v:')) {
    el = rootEl.querySelector(`[data-ven="${target.slice(2)}"]`);
  } else {
    el = rootEl.querySelector(`[data-mod="${target}"]`);
  }
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const rr = rootEl.getBoundingClientRect();
  return {
    x: r.left - rr.left + r.width / 2,
    y: r.top - rr.top + r.height / 2,
  };
}

/* ===================== COMPONENT ===================== */

export default function CollaborationAnimation({ speed = 1 }: { speed?: number }) {
  const t = useLocalizedText();
  const [phaseIdx, setPhaseIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('co-style')) {
      const s = document.createElement('style');
      s.id = 'co-style';
      s.textContent = CO_STYLE;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setPhaseIdx((p) => (p + 1) % CO_PHASES.length);
    }, CO_PHASE_MS / speed);
    return () => clearInterval(iv);
  }, [speed]);

  const phase = CO_PHASES[phaseIdx];
  const litMod = new Set(phase.lit);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-indigo-50/40">
      
      {/* Visual background enhancements */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-200/10 blur-3xl pointer-events-none animate-pulse duration-[10s]" />

      <div className="co-root w-full max-w-[691px] z-10" ref={rootRef}>
      {/* Chrome */}
      <div className="co-chrome">
        <span className="co-chrome-dot" style={{ background: '#ff6058' }} />
        <span className="co-chrome-dot" style={{ background: '#ffbd2e' }} />
        <span className="co-chrome-dot" style={{ background: '#28c941' }} />
        <div className="co-chrome-url">
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          app.factwise.io · {t('One workspace')}
        </div>
        <div className="co-chrome-spacer" />
        <div className="co-chrome-live"><span className="pulse" />{t('Live · in real time')}</div>
      </div>

      {/* Phase rail */}
      <div className="co-rail">
        {CO_PHASES.map((p, i) => (
          <Fragment key={p.id}>
            <div className={`co-rail-step${i === phaseIdx ? ' active' : ''}${i < phaseIdx ? ' done' : ''}`}>
              <span className="n">{p.badge}</span>
              <span>{t(p.label)}</span>
            </div>
            {i < CO_PHASES.length - 1 && <div className="co-rail-sep" />}
          </Fragment>
        ))}
      </div>

      {/* Main grid */}
      <div className="co-grid">
        {/* Left: internal modules */}
        <div className="co-col-mod">
          <div className="co-col-head">
            <span className="l">{t('Internal · 5 teams')}</span>
            <span className="b">SSO</span>
          </div>
          {CO_MODULES.map((m) => {
            const Icon = COI[m.icon];
            const lit = litMod.has(m.id);
            return (
              <div
                key={m.id}
                className={`co-mod${lit ? ' lit' : ''}`}
                data-mod={m.id}
                style={{
                  boxShadow: lit
                    ? `0 0 0 1.5px ${m.tone}55, 0 8px 20px -8px ${m.tone}55`
                    : '0 1px 2px rgba(15,23,42,0.04)',
                  borderColor: lit ? 'transparent' : '#e9eef5',
                  ['--tone' as string]: m.tone,
                }}
              >
                <div className="avatar" style={{ background: m.tone }}>{m.initials}</div>
                <div className="info">
                  <div className="n">{m.name}</div>
                  <div className="r">
                    <span>{t(m.role)}</span>
                    <COI.Lock s={9} />
                  </div>
                </div>
                <div
                  className="icon-wrap"
                  style={lit ? { background: `${m.tone}18`, color: m.tone } : {}}
                >
                  <Icon s={11} />
                </div>
                <span className="pulse" style={{ background: m.tone }} />
              </div>
            );
          })}
        </div>

        {/* Centre: workspace */}
        <div className="co-col-ws">
          <div className="co-ws">
            <div className="co-ws-tabs" style={{ ['--tab-tone' as string]: '#3666ff' }}>
              <div className={`co-ws-tab${['request', 'route'].includes(phase.id) ? ' active' : ''}`}>
                <span className="d" />REQ-417
              </div>
              <div
                className={`co-ws-tab${['rfq', 'bids', 'negotiate'].includes(phase.id) ? ' active' : ''}`}
                style={{ ['--tab-tone' as string]: '#0d9488' }}
              >
                <span className="d" />RFQ-208
              </div>
              <div
                className={`co-ws-tab${phase.id === 'approve' ? ' active' : ''}`}
                style={{ ['--tab-tone' as string]: '#7c3aed' }}
              >
                <span className="d" />APR-441
              </div>
              <div
                className={`co-ws-tab${phase.id === 'po' ? ' active' : ''}`}
                style={{ ['--tab-tone' as string]: '#f59e0b' }}
              >
                <span className="d" />PO-882
              </div>
              <div
                className={`co-ws-tab${['invoice', 'pay'].includes(phase.id) ? ' active' : ''}`}
                style={{ ['--tab-tone' as string]: '#10b981' }}
              >
                <span className="d" />INV-119
              </div>
            </div>
            <div className="co-ws-body">
              <ReqPanel phase={phase} />
              <RfqPanel phase={phase} />
              <BidsPanel phase={phase} />
              <NegotiatePanel phase={phase} />
              <ApprovePanel phase={phase} />
              <PoPanel phase={phase} />
              <InvoicePanel phase={phase} />
              <PayPanel phase={phase} />
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

/* ===================== PANELS ===================== */

function ReqPanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'request' || phase.id === 'route';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div>
          <div className="t">{t('Purchase Request · Smart Pump Assembly')}</div>
        </div>
        <div
          className="stamp"
          style={{
            background: phase.id === 'route' ? '#ecfdf5' : '#eff4ff',
            border: phase.id === 'route' ? '1px solid #bbf2db' : '1px solid #d8e2ff',
            color: phase.id === 'route' ? '#047857' : '#3666ff',
          }}
        >
          {phase.id === 'route' ? t('→ Sourcing') : t('Draft')}
        </div>
      </div>
      {[
        { n: 'Motor Housing · MH-204',       q: 1, u: 'EA' },
        { n: 'Control Board v3 · PCB-3021',  q: 1, u: 'EA' },
        { n: 'MCU STM32F4 · IC-MCU-12',      q: 1, u: 'EA' },
        { n: 'Stainless Impeller · IMP-77',  q: 1, u: 'EA' },
        { n: 'Capacitor 100µF · CAP-100u',   q: 8, u: 'EA' },
        { n: 'Bearing 6204 · BRG-204',       q: 2, u: 'EA' },
      ].map((li, i) => (
        <div key={i} className={`co-li${show ? ' ok' : ''}`}>
          <div className="ck"><COI.Check s={7} /></div>
          <div className="nm">{li.n}</div>
          <div className="q">×{li.q}</div>
          <div className="u">{li.u}</div>
        </div>
      ))}
    </div>
  );
}

function RfqPanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'rfq';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('RFQ-208 · Pump assembly · Q3')}</div>
        <div className="stamp" style={{ background: '#ecfeff', border: '1px solid #a5f3fc', color: '#0e7490' }}>
          {t('Live')}
        </div>
      </div>
      <div className="co-rfq-head">
        <span className="chip">{t('12 line items')}</span>
        <span className="chip">{t('Target ₹4.95L')}</span>
        <span className="chip">{t('Closes 48h')}</span>
      </div>
      <div className="co-rfq-inv">
        {CO_VENDORS.map((v) => (
          <div key={v.id} className="co-rfq-card sent">
            <div className="av" style={{ background: v.tone }}>
              {v.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div className="n">{v.name}</div>
            <div className="st">{t('Invited')}</div>
          </div>
        ))}
      </div>
      <div className="co-rfq-foot">
        <span>{t('Auto-selected by tag + history')}</span>
        <span className="v">FW Autobot</span>
      </div>
    </div>
  );
}

function BidsPanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'bids';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('Bid Comparison · landed cost')}</div>
        <div className="stamp" style={{ background: '#fef6e7', border: '1px solid #fde3ad', color: '#b45309' }}>
          {t('3 bids in')}
        </div>
      </div>
      <div className="co-bid-row head">
        <span /><span>{t('Vendor')}</span>
        <span style={{ textAlign: 'right' }}>{t('Landed')}</span>
        <span style={{ textAlign: 'right' }}>{t('Δ Target')}</span><span />
      </div>
      {[
        { v: CO_VENDORS[0], price: '₹4.79L', delta: '−3.2%', neg: true,  win: true  },
        { v: CO_VENDORS[1], price: '₹5.00L', delta: '+1.1%', neg: false, win: false },
        { v: CO_VENDORS[2], price: '₹5.15L', delta: '+4.0%', neg: false, win: false },
      ].map((b, i) => (
        <div key={i} className={`co-bid-row${b.win ? ' winner' : ''}`}>
          <div className="av" style={{ background: b.v.tone }}>
            {b.v.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </div>
          <div className="nm">{b.v.name}</div>
          <div className="price">{b.price}</div>
          <div className={`delta${b.neg ? ' neg' : ' pos'}`}>{b.delta}</div>
          <div className="star">{b.win ? '★' : '☆'}</div>
        </div>
      ))}
      <div style={{
        marginTop: 8, padding: '5px 7px', background: '#f9fafc', borderRadius: 6,
        display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: '#475569',
      }}>
        <span>{t('Currency-normalised · duty + freight applied')}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#1A1D2E' }}>INR ↔ INR ↔ SGD</span>
      </div>
    </div>
  );
}

function NegotiatePanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'negotiate';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('Auto-negotiation · Round 2')}</div>
        <div className="stamp" style={{ background: '#eff4ff', border: '1px solid #d8e2ff', color: '#3666ff' }}>
          <COI.Bot s={9} /> {t('Autobot')}
        </div>
      </div>
      <div className="co-msg bot">
        <div className="av"><COI.Bot s={10} /></div>
        <div className="bub">{t('Target landed cost')} <span className="mono">₹4.60L</span>. {t('Can you match?')}</div>
      </div>
      <div className="co-msg vendor">
        <div className="bub">{t('Counter at')} <span className="mono">₹4.68L</span> · {t('FOB Mumbai.')}</div>
        <div className="av">A</div>
      </div>
      <div className="co-msg bot">
        <div className="av"><COI.Bot s={10} /></div>
        <div className="bub">{t('Accepted. Lead time + payment terms locked.')}</div>
      </div>
      <div style={{
        marginTop: 6, padding: '5px 8px', background: '#ecfdf5', borderRadius: 6,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        border: '1px solid #bbf2db', fontSize: 9.5,
      }}>
        <span style={{ color: '#047857', fontWeight: 600 }}>{t('Savings vs initial bid')}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#047857' }}>−₹11,200 · 2.3%</span>
      </div>
    </div>
  );
}

function ApprovePanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'approve';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('Award approval · APR-441')}</div>
        <div className="stamp" style={{ background: '#f3f0ff', border: '1px solid #ddd5ff', color: '#7c3aed' }}>
          Vikram K.
        </div>
      </div>
      <div className="co-app" style={{ position: 'relative' }}>
        <div className="row"><span className="k">{t('Award to')}</span><span className="v">ACME Mfg</span></div>
        <div className="row"><span className="k">{t('Total value')}</span><span className="v">₹4.68L</span></div>
        <div className="row"><span className="k">{t('Saving')}</span><span className="v tone">{t('−4.6% vs target')}</span></div>
        <div className="row"><span className="k">{t('Risk score')}</span><span className="v">{t('A · low')}</span></div>
        <div className="actions">
          <div className="btn no">{t('Reject')}</div>
          <div className="btn ok"><COI.Check s={10} /> {t('Approve award')}</div>
        </div>
      </div>
      {show && (
        <div style={{
          position: 'absolute', top: 42, right: 8, padding: '4px 10px',
          border: '1.5px solid #7c3aed', color: '#7c3aed', borderRadius: 6,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 800,
          letterSpacing: '0.12em', transform: 'rotate(-8deg)',
          animation: 'co-stamp 0.55s 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
          background: 'rgba(255,255,255,0.85)',
        }}>
          {t('APPROVED')}
        </div>
      )}
    </div>
  );
}

function PoPanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'po';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('Purchase Order · sent to vendor')}</div>
        <div className="stamp" style={{ background: '#fef6e7', border: '1px solid #fde3ad', color: '#b45309' }}>
          {t('Issued')}
        </div>
      </div>
      <div className="co-po">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="doc-id">PO-882</span>
          <span style={{ fontSize: 9, color: '#92400e', fontFamily: "'JetBrains Mono', monospace" }}>{t('Visible to ACME · live')}</span>
        </div>
        <div className="grid2">
          <div><div className="k">{t('Vendor')}</div><div className="v">ACME Mfg</div></div>
          <div><div className="k">{t('Total')}</div><div className="v">₹4,68,000</div></div>
          <div><div className="k">{t('Delivery')}</div><div className="v">{t('Mumbai · 14 days')}</div></div>
          <div><div className="k">{t('Payment terms')}</div><div className="v">{t('Net 30 · 3-way match')}</div></div>
        </div>
        <div className="sig">
          <span className="lbl">{t('Authorised:')}</span>
          <span className="name">Anika R.</span>
        </div>
      </div>
    </div>
  );
}

function InvoicePanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'invoice';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('Vendor invoice · on-platform')}</div>
        <div className="stamp" style={{ background: '#ecfdf5', border: '1px solid #bbf2db', color: '#047857' }}>
          {t('3-way matched')}
        </div>
      </div>
      <div className="co-inv">
        <div className="top">
          <div>
            <div className="id">INV-119</div>
            <div className="sub">{t('From ACME Mfg · raised in FactWise')}</div>
          </div>
          <div className="match">
            <span className="pill"><COI.Check s={8} />PO</span>
            <span className="pill"><COI.Check s={8} />GRN</span>
            <span className="pill"><COI.Check s={8} />QC</span>
          </div>
        </div>
        <div className="total">
          <span className="l">{t('Invoice total')}</span>
          <span className="v">₹4,68,000</span>
        </div>
        <div style={{
          marginTop: 7, padding: '6px 8px', background: '#fafbff', borderRadius: 6,
          fontSize: 9.5, color: '#475569', display: 'flex', justifyContent: 'space-between',
        }}>
          <span>{t('Auto-matched in context · no email chase')}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#3666ff' }}>→ Finance</span>
        </div>
      </div>
    </div>
  );
}

function PayPanel({ phase }: { phase: COPhase }) {
  const t = useLocalizedText();
  const show = phase.id === 'pay';
  return (
    <div className={`co-panel${show ? ' show' : ''}`}>
      <div className="co-panel-head">
        <div className="t">{t('Payment released')}</div>
        <div className="stamp" style={{ background: '#ecfdf5', border: '1px solid #bbf2db', color: '#047857' }}>
          {t('Settled · UTR-77410')}
        </div>
      </div>
      {show && (
        <div className="co-pay">
          <div className="seal">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="info">
            <div className="t">{t('Paid to ACME Mfg')}</div>
            <div className="s">{t('ACME notified · in real time')}</div>
          </div>
          <div className="amt">₹4.68L</div>
        </div>
      )}
      <div style={{
        marginTop: 9, padding: '7px 9px', background: '#f9fafc', borderRadius: 7,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 10, color: '#475569',
      }}>
        <span>{t('End-to-end cycle time')}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#0b1322', fontSize: 11 }}>
          {t('REQ → PAID · 6 days')}
        </span>
      </div>
      <div style={{
        marginTop: 6, padding: '7px 9px', background: '#f1f5f9', borderRadius: 7,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 9.5, color: '#64748b',
      }}>
        <span>{t('Every step · every stakeholder · one platform')}</span>
        <span style={{ color: '#00b884', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.06em' }}>{t('↻ loop')}</span>
      </div>
    </div>
  );
}

/* ===================== FLOW OVERLAY ===================== */

function FlowOverlay({
  phase,
  tick,
  rootRef,
}: {
  phase: COPhase;
  tick: number;
  rootRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pts, setPts] = useState<EdgePoint[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const grid = root.querySelector<HTMLElement>('.co-grid');
    if (!grid) return;
    const gr = grid.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    const offX = gr.left - rr.left;
    const offY = gr.top - rr.top;

    const newPts = phase.edges
      .map(([from, to]): EdgePoint | null => {
        const a = coGetEndpoint(from, root);
        const b = coGetEndpoint(to, root);
        if (!a || !b) return null;
        let ax = a.x - offX, ay = a.y - offY;
        let bx = b.x - offX, by = b.y - offY;
        const fromIsV = from.startsWith('v:');
        const toIsV = to.startsWith('v:');
        if (!fromIsV) ax += 80; else ax -= 70;
        if (!toIsV) bx -= 80; else bx += 70;
        return { ax, ay, bx, by, from, to };
      })
      .filter((p): p is EdgePoint => p !== null);

    setPts(newPts);
  }, [phase, tick, rootRef]);

  const tone = (() => {
    if (!phase.edges.length) return '#3666ff';
    const [from] = phase.edges[0];
    if (from.startsWith('v:')) {
      const v = CO_VENDORS.find((x) => x.id === from.slice(2));
      return v ? v.tone : '#3666ff';
    }
    const m = CO_MODULES.find((x) => x.id === from);
    return m ? m.tone : '#3666ff';
  })();

  return (
    <svg
      className="co-flow"
      style={{ position: 'absolute', inset: 14, width: 'auto', height: 'auto', pointerEvents: 'none' }}
      preserveAspectRatio="none"
    >
      <defs>
        <marker id="co-arr" viewBox="0 0 10 10" refX="8" refY="5"
          markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={tone} />
        </marker>
        <linearGradient id="co-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tone} stopOpacity="0.15" />
          <stop offset="100%" stopColor={tone} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {pts.map((p, i) => (
        <g key={`${phase.id}-${i}`}>
          <line
            x1={p.ax} y1={p.ay} x2={p.bx} y2={p.by}
            stroke={tone} strokeWidth="1.4" strokeLinecap="round"
            strokeDasharray="3 4" opacity="0.55"
            markerEnd="url(#co-arr)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-14"
              dur="0.7s" repeatCount="indefinite" />
          </line>
          <circle r="4.5" fill={tone} opacity="0.95"
            style={{ filter: `drop-shadow(0 0 6px ${tone})` }}>
            <animate attributeName="cx" from={p.ax} to={p.bx}
              dur="1.1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            <animate attributeName="cy" from={p.ay} to={p.by}
              dur="1.1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1"
              dur="1.1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}
