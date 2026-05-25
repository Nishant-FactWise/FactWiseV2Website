"use client";

import React from "react";
import { Check, ArrowRight, ShieldCheck, ZapIcon, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from "next/navigation";

const modules = [
  {
    tag: "QUOTE AUTOMATION",
    title: "Inquiry to Quote",
    description: "From BOM to customer quote in record time — intelligent sourcing, automated negotiations, and true landed-cost analytics.",
    imageUrl: "/images/quote-order.png",
    features: [
      "BOM & cost intelligence",
      "Automated vendor sourcing & negotiations",
      "One-click customer quote generation",
    ],
    href: "/inquiry-to-quote",
    icon: BarChart3
  },
  {
    tag: "SOURCING AUTOMATION",
    title: "Requisition to PO",
    description: "Raise, approve, source, and issue purchase orders in one seamless flow — without the back and forth.",
    imageUrl: "/images/req-po.png",
    features: [
      "Combine requisitions for bulk pricing",
      "Auto-filled target prices on every RFQ",
      "Multi-vendor POs in one click",
    ],
    href: "/requisitions-to-po",
    icon: ShieldCheck
  },
  {
    tag: "INVOICE AUTOMATION",
    title: "Invoice to Pay",
    description: "Every invoice validated against PO, GR, QC, and contract terms — so you always pay the right amount.",
    imageUrl: "/images/invoice-pay.png",
    features: [
      "AI-powered invoice generation",
      "Flexible GR, QC & payment sequencing",
      "Always pay the right amount — automatically",
    ],
    href: "/invoice-to-pay",
    icon: ZapIcon
  },
];

const CARDS_STYLE = `
  .factwise-cards-section {
    --blue-50: #eff4ff;
    --blue-100: #dbeafe;
    --blue-400: #60a5fa;
    --blue-600: #3666ff;
    --blue-800: #1e3a8a;
    --gray-50: #F7F6F3;
    --gray-100: #EFEDE8;
    --gray-200: #DDD9D0;
    --gray-400: #94a3b8;
    --gray-700: #334155;
    --gray-900: #0f172a;
    --radius: 20px;
    --radius-sm: 10px;
    --shadow-card: 0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06);
    --shadow-hover: 0 8px 24px rgba(0,0,0,0.07), 0 24px 64px rgba(0,0,0,0.10);
  }

  .fw-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 340px);
    gap: 24px;
    justify-content: center;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  @media (max-width: 1100px) {
    .fw-cards-grid { grid-template-columns: repeat(2, 340px); }
  }
  @media (max-width: 740px) {
    .fw-cards-grid { grid-template-columns: 1fr; max-width: 350px; margin: 0 auto; }
  }

  /* Card */
  .fw-card {
    background: #FFFFFF;
    border-radius: var(--radius);
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: var(--shadow-card);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    transition: transform 0.38s cubic-bezier(0.23, 1, 0.32, 1),
                box-shadow 0.38s cubic-bezier(0.23, 1, 0.32, 1),
                border-color 0.3s ease;
    will-change: transform;
  }

  .fw-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);
  }

  .fw-card.featured {
    border-color: var(--blue-600);
  }



  /* Card top color bar */
  .fw-card-bar {
    height: 4px;
    width: 100%;
    transition: height 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .fw-card:hover .fw-card-bar { height: 6px; }

  .fw-card-blue  .fw-card-bar { background: linear-gradient(90deg, var(--blue-400), var(--blue-600)); }

  /* Card header */
  .fw-card-header {
    padding: 24px 24px 0;
    text-align: left;
  }

  .fw-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .fw-card-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    transition: transform 0.2s ease;
  }

  .fw-card:hover .fw-card-badge { transform: scale(1.05); }

  .fw-badge-blue  { background: var(--blue-50);  color: var(--blue-800); }

  .fw-popular-pill {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 4px 10px;
    border-radius: 20px;
    background: var(--blue-50);
    color: var(--blue-600);
    border: 1px solid var(--blue-100);
    animation: fwPulse 2.8s ease-in-out infinite;
  }

  @keyframes fwPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(54, 102, 255, 0.18); }
    50%       { box-shadow: 0 0 0 5px rgba(54, 102, 255, 0); }
  }

  /* Icon */
  .fw-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .fw-card:hover .fw-card-icon { transform: scale(1.12) rotate(-4deg); }

  .fw-icon-blue  { background: var(--blue-50); }

  .fw-card-icon svg { width: 22px; height: 22px; }

  .fw-card-title {
    font-size: 22px !important;
    font-weight: 600 !important;
    color: var(--gray-900) !important;
    letter-spacing: -0.3px !important;
    margin-bottom: 10px !important;
    line-height: 1.2 !important;
    transition: color 0.2s ease;
    text-align: left;
  }

  .fw-card-blue:hover  .fw-card-title { color: var(--blue-800) !important; }

  .fw-card-desc {
    font-size: 13.5px !important;
    color: #475569 !important;
    line-height: 1.65 !important;
    font-weight: 400 !important;
    padding-bottom: 20px !important;
    text-align: left;
  }

  /* Divider */
  .fw-card-divider {
    height: 1px;
    background: var(--gray-100);
    margin: 0 24px;
    transition: background 0.3s ease;
  }

  .fw-card:hover .fw-card-divider { background: var(--gray-200); }

  /* Features */
  .fw-card-features {
    padding: 18px 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 11px;
    text-align: left;
  }

  .fw-feature {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px !important;
    color: var(--gray-700) !important;
    line-height: 1.45 !important;
    transition: transform 0.25s ease;
    font-weight: 500 !important;
    text-align: left;
  }

  .fw-card:hover .fw-feature:nth-child(1) { transform: translateX(3px); transition-delay: 0.03s; }
  .fw-card:hover .fw-feature:nth-child(2) { transform: translateX(3px); transition-delay: 0.07s; }
  .fw-card:hover .fw-feature:nth-child(3) { transform: translateX(3px); transition-delay: 0.11s; }

  .fw-feature-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .fw-dot-blue  { background: var(--blue-50); }
  .fw-dot-green { background: var(--green-50); }
  .fw-dot-amber { background: var(--amber-50); }

  .fw-feature-dot svg { width: 10px; height: 10px; }

  /* Footer */
  .fw-card-footer {
    padding: 16px 24px 22px;
  }

  .fw-card-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px 0;
    border-radius: 12px;
    font-size: 13px !important;
    font-weight: 600 !important;
    border: none;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.25s ease,
                gap 0.25s ease;
    letter-spacing: 0.01em !important;
    text-transform: uppercase !important;
  }

  .fw-card:hover .fw-card-btn { gap: 12px; }

  .fw-btn-blue {
    background: var(--blue-50);
    color: var(--blue-800);
  }
  .fw-btn-blue:hover {
    background: var(--blue-100);
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(54, 102, 255, 0.18);
  }

  .fw-btn-arrow {
    display: inline-flex;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .fw-card-btn:hover .fw-btn-arrow { transform: translate(3px, -3px); }
`;

function Card({ module, index }: { module: typeof modules[0], index: number }) {
  const router = useRouter();

  // Theme configuration
  const t = {
    colorKey: "blue",
    badgeClass: "fw-badge-blue",
    iconClass: "fw-icon-blue",
    dotClass: "fw-dot-blue",
    btnClass: "fw-btn-blue",
    iconStroke: "#3666ff",
  };
  const isFeatured = index === 1;

  return (
    <div
      className={`fw-card fw-card-${t.colorKey} ${isFeatured ? "featured" : ""}`}
      onClick={() => router.push(module.href)}
    >
      <div className="fw-card-bar"></div>
      <div className="fw-card-header">
        <div className="fw-card-meta">
          <span className={`fw-card-badge ${t.badgeClass}`}>{module.tag}</span>
          {isFeatured && <span className="fw-popular-pill">⚡ Most popular</span>}
        </div>
        <div className={`fw-card-icon ${t.iconClass}`}>
          <module.icon className="w-5 h-5" style={{ color: t.iconStroke }} />
        </div>
        <h2 className="fw-card-title">{module.title}</h2>
        <p className="fw-card-desc">{module.description}</p>
      </div>

      <div className="fw-card-divider mt-4"></div>
      <div className="fw-card-features">
        {module.features.map((feature, i) => (
          <div key={i} className="fw-feature">
            <span className={`fw-feature-dot ${t.dotClass}`}>
              <svg viewBox="0 0 12 12" fill="none" stroke={t.iconStroke} strokeWidth="2" strokeLinecap="round">
                <polyline points="2,6 5,9 10,3"/>
              </svg>
            </span>
            {feature}
          </div>
        ))}
      </div>

      <div className="fw-card-footer">
        <button className={`fw-card-btn ${t.btnClass}`}>
          Explore solution
          <span className="fw-btn-arrow">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 12L12 2M12 2H6M12 2v6"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

import ScrollReveal from "./ui/ScrollReveal";

export default function ProcurementModules() {
  return (
    <section className="py-20 relative bg-white overflow-hidden factwise-cards-section">
      <style dangerouslySetInnerHTML={{ __html: CARDS_STYLE }} />
      <div className="max-w-7xl px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4A6FFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Platform Modules
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
            Smarter <span className="text-[#3666ff]">Manufacturing</span> Starts Here
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Scalable, enterprise-ready modules designed to automate every workflow manufacturers depend on — from first inquiry to final payment.
          </p>
        </motion.div>

        <ScrollReveal className="fw-cards-grid" stagger={0.15} delay={0.3}>
          {modules.map((module, index) => (
            <Card key={index} module={module} index={index} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

