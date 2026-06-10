"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import ReqHero from "./components/ReqHero";
import ReqProblemSection from "./components/ReqProblemSection";
import ReqToPoFlow from "./components/ReqToPoFlow";
import ReqToPoFeatures from "./components/ReqToPoFeatures";

const R2P_FAQS: FAQItem[] = [
  {
    category: 'Requisitions',
    q: 'How are purchase requisitions initiated?',
    a: 'Requisitions can be created manually by authorized users or automatically triggered by MRP/ERP systems based on inventory thresholds. All requests are centralized in FactWise.',
  },
  {
    category: 'Approvals',
    q: 'Can we configure custom approval workflows?',
    a: 'Yes, FactWise supports multi-level, conditional approval workflows based on budget thresholds, departments, or item categories. Approvers can review and approve requests via email or mobile.',
  },
  {
    category: 'Purchase Orders',
    q: 'How are POs generated?',
    a: 'Once a requisition is approved and a vendor is selected (either from an existing contract or a new RFQ), FactWise automatically generates a Purchase Order with all relevant details and sends it to the vendor.',
  },
  {
    category: 'Visibility',
    q: 'Can requestors track their orders?',
    a: 'Requestors have real-time visibility into the status of their requisitions, from pending approval to PO dispatch and final delivery, eliminating constant status follow-ups.',
  }
];

export default function RequisitionsToPoPage() {
  return (
    <main className="min-h-screen bg-white">
      <ReqHero />
      <ReqProblemSection />
      <ReqToPoFlow />
      <ReqToPoFeatures />
      <FAQSection 
        faqs={R2P_FAQS} 
        title={<>Requisitions to PO <span className="italic" style={{ color: '#3666ff' }}>FAQ</span></>}
        description="Common questions about requisitions, approvals, and order tracking."
      />
      <FlickeringFooter />
    </main>
  );
}
