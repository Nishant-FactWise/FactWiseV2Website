"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';
import { OPEN_PREFERENCES_EVENT } from './CookieConsent';

// --- Custom Social Icons (Refined for Premium Fintech look) ---
const SocialIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d={d} />
  </svg>
);

const LinkedinIcon = () => <SocialIcon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />;
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
const FacebookIcon = () => <SocialIcon d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;

// --- Data ---
const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Inquiry to Quote", href: "/inquiry-to-quote" },
      { name: "Requisitions to PO", href: "/requisitions-to-po" },
      { name: "Invoice to Pay", href: "/invoice-to-pay" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Manufacturing", href: "#" },
      { name: "Chemicals", href: "#" },
      { name: "Automotive", href: "#" },
      { name: "MRO", href: "#" },
      { name: "Electrical Manufacturing", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
      { name: "Case Studies", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Book a Demo", href: "/demo" },
    ],
  },
];

const socialPlatforms = [
  { icon: LinkedinIcon, href: "https://in.linkedin.com/company/factwise", name: "LinkedIn" },
  { icon: Mail, href: "mailto:support@factwise.io", name: "Mail" },
];

const footerVariants = {
  hidden: { filter: 'blur(12px)', y: 40, opacity: 0 },
  visible: (delay: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeOut" as const
    }
  })
};

// --- Sub-components ---
const AnimatedContainer = ({ children, delay = 0.1 }: { children: React.ReactNode, delay?: number }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      variants={footerVariants}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

export function FlickeringFooter() {
  return (
    <footer className="relative w-full bg-slate-50 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full bg-slate-50"
      >
        <div className="flex flex-col justify-between">

          {/* Main Content Area */}
          <div className="relative flex-1 flex items-center border-t border-slate-200 py-8">
            {/* Minimal Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

                {/* Brand Section */}
                <div className="lg:col-span-4 space-y-6">
                  <AnimatedContainer>
                    <Link href="/" className="flex items-center gap-4 group">
                      <img
                        src="/logo.webp"
                        alt="FactWise Logo"
                        className="h-11 w-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 rounded-tl-sm rounded-br-sm"
                      />
                      <span className="text-[26px] font-bold tracking-tight text-[#1A1D2E]">FactWise</span>
                    </Link>
                  </AnimatedContainer>

                  <AnimatedContainer delay={0.2}>
                    <div className="flex gap-3">
                      {socialPlatforms.map((platform) => {
                        const isExternal = platform.href.startsWith('http');
                        return (
                          <Button
                            key={platform.name}
                            asChild
                            variant="outline"
                            size="icon"
                            className="size-10 rounded-xl border-slate-200 bg-white text-slate-500 hover:bg-[#3666ff] hover:text-white hover:border-[#3666ff] transition-all duration-300 shadow-sm"
                          >
                            <a
                              href={platform.href}
                              aria-label={platform.name}
                              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              <platform.icon />
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                  </AnimatedContainer>
                </div>

                {/* Navigation Links Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {footerLinks.map((section, idx) => (
                    <AnimatedContainer key={section.title} delay={0.2 + idx * 0.1}>
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
                          {section.title}
                        </h4>
                        <ul className="space-y-4">
                          {section.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                className="text-slate-600 hover:text-[#3666ff] text-[14px] font-medium transition-colors inline-flex items-center group/link"
                              >
                                {link.name}
                                <ArrowRight className="w-0 h-3 ml-1.5 opacity-0 -translate-x-2 transition-all group-hover/link:w-3 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-[#3666ff]" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedContainer>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200 py-8 bg-slate-50 relative z-10">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <AnimatedContainer delay={0.4}>
                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">
                  © 2026 FactWise Technologies. All rights reserved.
                </p>
              </AnimatedContainer>

              <AnimatedContainer delay={0.5}>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                  <Link href="/privacy-policy" className="text-slate-400 hover:text-[#1A1D2E] text-[11px] font-bold uppercase tracking-widest transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-of-service" className="text-slate-400 hover:text-[#1A1D2E] text-[11px] font-bold uppercase tracking-widest transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/cookie-policy" className="text-slate-400 hover:text-[#1A1D2E] text-[11px] font-bold uppercase tracking-widest transition-colors">
                    Cookie Policy
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
                    className="text-slate-400 hover:text-[#1A1D2E] text-[11px] font-bold uppercase tracking-widest transition-colors"
                  >
                    Cookie Settings
                  </button>
                </div>
              </AnimatedContainer>
            </div>
          </div>

        </div>
      </motion.div>
    </footer>
  );
}
