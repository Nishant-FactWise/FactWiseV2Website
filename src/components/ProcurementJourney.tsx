'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProcurementJourney.css';

interface JourneyStep {
  id: number;
  number: string;
  title: string;
  description: string;
  features: string[];
  visualTitle: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 0,
    number: '01',
    title: 'Requisition',
    description: 'Internal requests for goods or services. Create or clone requisitions in seconds and tag them to the right department.',
    features: ['Instant creation', 'Bulk discounts', 'ERP integration', 'Item analytics'],
    visualTitle: 'Requisition Dashboard'
  },
  {
    id: 1,
    number: '02',
    title: 'Source',
    description: 'FactWise automates vendor onboarding, document verification, and follow-ups. Our platform floats RfQs to all relevant vendors in one click.',
    features: ['Vendor onboarding', 'RfX at scale', 'Automated follow-ups', 'FW Assist (AI)'],
    visualTitle: 'Sourcing Event'
  },
  {
    id: 2,
    number: '03',
    title: 'Negotiate',
    description: 'Data-driven negotiation tools. Real-time analytics, price anchoring, and spend aggregation tools.',
    features: ['Dynamic analytics', 'Landed cost calculation', 'Price anchoring', 'FW Autobot'],
    visualTitle: 'Negotiation Strategy'
  },
  {
    id: 3,
    number: '04',
    title: 'PO',
    description: 'One-click PO creation across multiple vendors. Real-time delivery schedule updates and formal vendor acceptance.',
    features: ['1-click PO creation', 'Direct-to-PO', 'Custom approvals', 'Dual-side management'],
    visualTitle: 'Purchase Orders'
  },
  {
    id: 4,
    number: '05',
    title: 'Invoice',
    description: 'System auto-fills fields from PO data, flags mismatches, and routes documents for approval — no manual reconciliation.',
    features: ['ASN auto-fill', 'Mismatch detection', 'Custom workflow', 'Auto-hold'],
    visualTitle: 'Invoice Verification'
  },
  {
    id: 5,
    number: '06',
    title: 'GR / QC',
    description: "Every check is tied back to the PO, invoice, and ASN. Customizable GR and QC screens with 4-way matching.",
    features: ['Multi-template GR', 'Unlimited QC checks', 'Auto refund', '4-way matching'],
    visualTitle: 'Goods Receipt / QC'
  },
  {
    id: 6,
    number: '07',
    title: 'Pay',
    description: 'Validated invoices trigger payment with full audit trail. Optimized cash flow via integrations.',
    features: ['Flexible payments', 'Dual notifications', 'Full audit trail', 'Reconciliation'],
    visualTitle: 'Payment & Audit'
  },
];

/* ── Mockup Components ── */

const RequisitionMockup = () => {
  const [view, setView] = useState<'dashboard' | 'create'>('dashboard');

  if (view === 'create') {
    return (
      <div className="mockup-container">
        <div className="create-req-header">
          <button onClick={() => setView('dashboard')} className="back-btn">← Back</button>
          <span>Create Requisition</span>
        </div>
        <div className="create-req-steps">
          <div className="step active"><span>1</span> General Info</div>
          <div className="step"><span>2</span> Items</div>
          <div className="step"><span>3</span> Documents</div>
          <div className="step"><span>4</span> Approval</div>
        </div>
        <div className="create-req-form">
          <div className="form-group">
            <label>Requisition Title</label>
            <div className="input-mock">Q4 Production Spares - Batch A</div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <div className="input-mock">Operations</div>
            </div>
            <div className="form-group">
              <label>Budget Code</label>
              <div className="input-mock">OP-2024-PRD</div>
            </div>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <div className="input-mock">High</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mockup-container">
      <div className="req-dash-header">
        <div className="req-dash-title">Requisitions</div>
        <div className="req-dash-actions">
          <div className="req-dash-tabs">
            <span className="req-tab active">Ongoing (12)</span>
            <span className="req-tab">Completed (24)</span>
            <span className="req-tab">Draft (4)</span>
            <span className="req-tab">All (40)</span>
          </div>
          <button onClick={() => setView('create')} className="req-btn-primary">+ Create Requisition</button>
        </div>
      </div>

      <div className="req-table-container">
        <table className="req-table">
          <thead>
            <tr>
              <th>Requisition ID</th>
              <th>Item Details</th>
              <th>Entity</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>REQ-2024-001</td>
              <td>Precision Bearings (Class A)</td>
              <td>Auto Division</td>
              <td>₹45,200</td>
              <td><span className="status-pill status-ongoing">Ongoing</span></td>
            </tr>
            <tr>
              <td>REQ-2024-002</td>
              <td>Industrial Lubricant (Synth)</td>
              <td>Factory-A</td>
              <td>₹12,800</td>
              <td><span className="status-pill status-completed">Completed</span></td>
            </tr>
            <tr>
              <td>REQ-2024-003</td>
              <td>Safety Gear Set (30 units)</td>
              <td>Warehouse-C</td>
              <td>₹8,500</td>
              <td><span className="status-pill status-draft">Draft</span></td>
            </tr>
            <tr>
              <td>REQ-2024-004</td>
              <td>Hydraulic Pumps (v4.2)</td>
              <td>Main Unit</td>
              <td>₹22,100</td>
              <td><span className="status-pill status-ongoing">Ongoing</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SourceMockup = () => (
  <div className="mockup-container">
    <div className="mockup-card">
      <div className="mockup-card-title">Active RFQs</div>
      <div className="mockup-list">
        <div className="mockup-item"><span>RFQ-2024-001: Raw Materials</span> <span className="status-pill status-approved">OPEN</span></div>
        <div className="mockup-item"><span>RFQ-2024-002: Logistics Services</span> <span className="status-pill status-pending">PENDING</span></div>
      </div>
    </div>
    <div className="mockup-card">
      <div className="mockup-card-title">Vendor Comparison</div>
      <div className="mockup-list">
        <div className="mockup-item"><span>Precision Global Ltd</span> <span className="success-text">98% Fit</span></div>
        <div className="mockup-item"><span>Apex Indus Group</span> <span className="accent-text">92% Fit</span></div>
        <div className="mockup-item"><span>Core Logistics</span> <span className="warning-text">74% Fit</span></div>
      </div>
    </div>
  </div>
);

const NegotiateMockup = () => (
  <div className="mockup-container">
    <div className="mockup-card" style={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
      <div className="mockup-card-title">Price Anchoring Analysis</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100%' }}>
        {[40, 65, 45, 90, 70, 100, 80].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? '#7c5cfc' : 'rgba(124, 92, 252, 0.2)', borderRadius: '2px' }}></div>
        ))}
      </div>
      <div className="mockup-label">SAVINGS IDENTIFIED: ₹42,500.00</div>
    </div>
    <div className="status-pill status-approved" style={{ textAlign: 'center', padding: '12px' }}>FW AUTOBOT: 50% QUICKER NEGOTIATIONS</div>
  </div>
);

const POMockup = () => (
  <div className="mockup-container">
    <div className="mockup-list">
      <div className="mockup-card" style={{ padding: '12px 20px' }}>
        <div className="mockup-item"><span>PO #44021-01</span> <span className="status-pill status-approved">ACCEPTED</span></div>
        <div className="mockup-label">VENDORS: 3 · ITEMS: 12 · TOTAL: ₹1,28,400</div>
      </div>
      <div className="mockup-card" style={{ padding: '12px 20px' }}>
        <div className="mockup-item"><span>PO #44021-02</span> <span className="status-pill status-pending">PENDING</span></div>
        <div className="mockup-label">VENDORS: 1 · ITEMS: 4 · TOTAL: ₹12,200</div>
      </div>
    </div>
    <div className="mockup-card">
      <div className="mockup-card-title">Approval Flow</div>
      <div className="mockup-list">
        <div className="mockup-item"><span>Operations Manager</span> <span className="success-text">✓</span></div>
        <div className="mockup-item"><span>Finance Director</span> <span className="warning-text">●</span></div>
      </div>
    </div>
  </div>
);

const InvoiceMockup = () => (
  <div className="mockup-container">
    <div className="mockup-header">
      <div className="mockup-value">Invoice #INV-9901</div>
      <div className="status-pill status-pending">MISMATCH DETECTED</div>
    </div>
    <div className="mockup-card">
      <div className="mockup-list">
        <div className="mockup-item"><span>Item Quantity</span> <span className="success-text">Match</span></div>
        <div className="mockup-item"><span>Unit Price</span> <span className="warning-text">Mismatch (₹42.00 vs ₹44.50)</span></div>
        <div className="mockup-item"><span>Tax Code</span> <span className="success-text">Match</span></div>
      </div>
    </div>
    <div className="status-pill status-approved" style={{ background: 'rgba(124, 92, 252, 0.1)', color: '#7c5cfc' }}>AUTO-HOLD APPLIED ON MISMATCH</div>
  </div>
);

const GRMockup = () => (
  <div className="mockup-container">
    <div className="mockup-card">
      <div className="mockup-card-title">QC Checklist: Batch #B-2024</div>
      <div className="mockup-list">
        <div className="mockup-item"><span>Packaging Integrity</span> <span className="success-text">PASS</span></div>
        <div className="mockup-item"><span>Weight Compliance</span> <span className="success-text">PASS</span></div>
        <div className="mockup-item"><span>Surface Finish Test</span> <span className="success-text">PASS</span></div>
        <div className="mockup-item"><span>Chemical Lab Report</span> <span className="warning-text">PENDING</span></div>
      </div>
    </div>
    <div className="mockup-label">4-WAY MATCHING: PO + INVOICE + ASN + GRN</div>
  </div>
);

const PayMockup = () => (
  <div className="mockup-container">
    <div className="mockup-card">
      <div className="mockup-card-title">Payment Schedule</div>
      <div className="mockup-list">
        <div className="mockup-item"><span>INV-9820 - Apex Indus</span> <span className="accent-text">Due: May 12</span></div>
        <div className="mockup-item"><span>INV-9821 - Precision Ltd</span> <span className="success-text">PAID</span></div>
      </div>
    </div>
    <div className="mockup-card">
      <div className="mockup-card-title">Audit Trail</div>
      <div className="mockup-label" style={{ lineHeight: 1.5 }}>
        03 May 10:24 - Payment Triggered<br/>
        03 May 10:25 - Vendor Notified<br/>
        03 May 10:30 - Ledger Updated
      </div>
    </div>
  </div>
);

const MOCKUPS = [
  <RequisitionMockup />,
  <SourceMockup />,
  <NegotiateMockup />,
  <POMockup />,
  <InvoiceMockup />,
  <GRMockup />,
  <PayMockup />
];

const ProcurementJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pj-section" ref={sectionRef}>
      <div className="pj-container">
        <div className="pj-header reveal">
          <div className="pj-badge">
            <div className="pj-dot-glow"></div>
            <span className="pj-subtitle">Capabilities</span>
          </div>
          <h2 className="pj-title">Modern Source-to-Pay.</h2>
          <p className="pj-header-desc">
            A holistic suite of tools designed to optimize direct material spend and mitigate supply chain risk.
          </p>
        </div>

        <div className="pj-dashboard-container reveal">
          {/* Left Column: List Cards */}
          <div className="pj-list">
            {JOURNEY_STEPS.map((step) => (
              <div 
                key={step.id} 
                className={`pj-list-card ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="pj-card-header">
                  <span className="pj-card-num">{step.number}</span>
                  <h3 className="pj-card-title">{step.title}</h3>
                </div>
                <div className="pj-card-content">
                  <p className="pj-card-desc">{step.description}</p>
                  <div className="pj-features">
                    {step.features.map((feature, fIndex) => (
                      <span key={fIndex} className="pj-feature-pill">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Dashboard Visual */}
          <div className="pj-visual-area">
            <div className="pj-visual-header">
              <div className="pj-window-controls">
                <div className="pj-dot red"></div>
                <div className="pj-dot yellow"></div>
                <div className="pj-dot green"></div>
              </div>
              <span className="pj-visual-title">{JOURNEY_STEPS[activeStep].visualTitle}</span>
              <div style={{ width: '40px' }}></div>
            </div>
            <div className="pj-visual-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  style={{ height: '100%', width: '100%' }}
                >
                  {MOCKUPS[activeStep]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcurementJourney;
