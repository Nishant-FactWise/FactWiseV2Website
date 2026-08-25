"use client";

import React from "react";
import { FlickeringFooter } from "@/components/ui/flickering-footer";
import SupplierHero from "./components/SupplierHero";
import SupplierProblemsSection from "./components/SupplierProblemsSection";
import SupplierFeaturesFlow from "./components/SupplierFeaturesFlow";
import SupplierCapabilities from "./components/SupplierCapabilities";
import { FeatureSteps } from "@/components/ui/feature-section";
import SupplierStatsBar from "./components/SupplierStatsBar";
import ScopedLocaleText from "@/components/ScopedLocaleText";

const supplierBenefits = [
  {
    step: "01",
    title: "Respond to Customer Directly",
    content: "Communicate directly on quotes, clarify line items, and coordinate negotiations inside a unified, secure messaging interface.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    step: "02",
    title: "Build Your Own Item Catalogue",
    content: "Publish custom parts and materials rates, capacity details, packaging configurations, and live lead times directly to strategic buyers.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    step: "03",
    title: "View PO Digitally",
    content: "Receive, view, and confirm purchase orders instantly online. Say goodbye to lost email threads, paper prints, and slow PDF matching.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    step: "04",
    title: "Upload Invoice",
    content: "Submit invoices digitally directly against confirmed purchase orders. Automated 3-way matching speeds up finance and payment approvals.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function SupplierPage() {
  const mainRef = React.useRef<HTMLElement | null>(null);

  return (
    <main ref={mainRef} className="min-h-screen bg-white">
      <ScopedLocaleText rootRef={mainRef} />
      <SupplierHero />
      <SupplierStatsBar />
      <SupplierProblemsSection />
      <SupplierFeaturesFlow />
      <FeatureSteps 
        features={supplierBenefits}
        title="Benefits of joining FactWise"
        autoPlayInterval={5000}
      />
      <SupplierCapabilities />
      <FlickeringFooter />
    </main>
  );
}
