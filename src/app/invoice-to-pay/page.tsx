"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import InvoiceHero from "./components/InvoiceHero";
import InvoiceProblemSection from "./components/InvoiceProblemSection";
import InvoiceToPayFlow from "./components/InvoiceToPayFlow";
import InvFeatures from "./components/InvFeatures";
import ScopedLocaleText from "@/components/ScopedLocaleText";

export default function InvoiceToPayPage() {
  const mainRef = React.useRef<HTMLElement | null>(null);

  return (
    <main ref={mainRef} className="min-h-screen bg-white">
      <ScopedLocaleText rootRef={mainRef} />
      <InvoiceHero />
      <InvoiceProblemSection />
      <InvoiceToPayFlow />
      <InvFeatures />
      <FlickeringFooter />
    </main>
  );
}
