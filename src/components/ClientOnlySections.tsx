"use client";
// ClientOnlySections.tsx
// Holds all dynamic imports that need { ssr: false } — these cannot live in a
// Server Component. This wrapper is a Client Component so Turbopack is satisfied.
import dynamic from "next/dynamic";

const ProductHubAnimation = dynamic(
  () => import("@/components/ProductFlowCombined"),
  { ssr: false }
);
const ImplementationRoadmap = dynamic(
  () => import("@/components/ImplementationRoadmap"),
  { ssr: false }
);
const IntegrationsShowcase = dynamic(
  () => import("@/components/IntegrationsShowcase"),
  { ssr: false }
);
const FlickeringFooter = dynamic(
  () =>
    import("@/components/ui/flickering-footer").then((m) => ({
      default: m.FlickeringFooter,
    })),
  { ssr: false }
);

export {
  ProductHubAnimation,
  ImplementationRoadmap,
  IntegrationsShowcase,
  FlickeringFooter,
};
