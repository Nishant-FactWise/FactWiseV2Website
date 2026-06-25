import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the FactWise Privacy Policy to understand how we collect, use, and protect your personal information and data.",
  openGraph: {
    title: "Privacy Policy | FactWise",
    description: "Read the FactWise Privacy Policy to understand how we collect, use, and protect your personal information and data.",
    url: "https://factwise.io/privacy-policy",
    type: "website",
  },
  alternates: {
    canonical: "https://factwise.io/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
