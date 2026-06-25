import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn how FactWise uses cookies and similar technologies, and how you can accept, reject, or manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | FactWise",
    description: "Learn how FactWise uses cookies and similar technologies, and how you can accept, reject, or manage your cookie preferences.",
    url: "https://factwise.io/cookie-policy",
    type: "website",
  },
  alternates: {
    canonical: "https://factwise.io/cookie-policy",
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
