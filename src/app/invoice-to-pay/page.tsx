"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import InvoiceHero from "./components/InvoiceHero";
import InvoiceProblemSection from "./components/InvoiceProblemSection";
import InvoiceToPayFlow from "./components/InvoiceToPayFlow";
import InvFeatures from "./components/InvFeatures";

const I2P_FAQS: FAQItem[] = [
  {
    category: 'Matching',
    q: 'What is automated 3-way matching?',
    a: 'FactWise automatically cross-checks the Purchase Order, Goods Receipt Note (GRN), and Supplier Invoice. It verifies quantities, rates, and taxes. If everything matches within your defined tolerances, the invoice is cleared for payment.',
  },
  {
    category: 'Exceptions',
    q: 'How are invoice discrepancies handled?',
    a: 'If a discrepancy is detected (e.g., price deviation or missing GRN), FactWise automatically flags the invoice and routes it to the appropriate team member for review and resolution, eliminating blind overpayments.',
  },
  {
    category: 'Deductions',
    q: 'Can FactWise handle quality deductions or debit notes?',
    a: 'Yes. Deductions from quality rejections are linked directly to the affected GRN and automatically netted against the corresponding invoice, removing the need for manual reconciliation.',
  },
  {
    category: 'Payments',
    q: 'Does it integrate with our accounting software?',
    a: 'FactWise integrates seamlessly with major ERPs and accounting systems (like SAP, Oracle, Tally) to sync cleared invoices and payment statuses in real-time.',
  }
];

export default function InvoiceToPayPage() {
  return (
    <main className="min-h-screen bg-white">
      <InvoiceHero />
      <InvoiceProblemSection />
      <InvoiceToPayFlow />
      <InvFeatures />
      <FAQSection 
        faqs={I2P_FAQS} 
        title={<>Invoice to Pay <span className="italic" style={{ color: '#3666ff' }}>FAQ</span></>}
        description="Common questions about automated matching, credit management, and payments."
      />
      <FlickeringFooter />
    </main>
  );
}
