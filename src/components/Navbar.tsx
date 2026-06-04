'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { LucideIcon, Target, BarChart3, Users, FileText, Plug, Brain, Star, Briefcase, Shield, RotateCcw, Leaf, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

/* ── Types ───────────────────────────────────────── */
type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  color?: string;
};

/* ── Link data ───────────────────────────────────── */
const productLinks: LinkItem[] = [
  { title: 'Strategic Sourcing', href: '#product', icon: Target, description: 'Run RFQ events and award the best deal', color: '#3666ff' },
  { title: 'Spend Analytics', href: '#product', icon: BarChart3, description: 'Real-time visibility into every dollar spent', color: '#34d399' },
  { title: 'Supplier Management', href: '#product', icon: Users, description: 'Onboard and collaborate with vendors', color: '#f59e0b' },
  { title: 'Contract Management', href: '#product', icon: FileText, description: 'Automate contracts and track renewals', color: '#3b82f6' },
  { title: 'ERP Integrations', href: '#product', icon: Plug, description: 'Connect with SAP, Oracle, and more', color: '#3666ff' },
  { title: 'Sourcing Intelligence', href: '#product', icon: Brain, description: 'AI-driven insights for smarter buying', color: '#34d399' },
];

const companyLinks: LinkItem[] = [
  { title: 'About FactWise', href: '/about', icon: Users, description: 'Our story, mission, and team' },
  { title: 'Customer Stories', href: '#', icon: Star, description: 'See how leading teams save with FactWise' },
  { title: 'Careers', href: '/careers', icon: Briefcase, description: "We're hiring globally — come join us" },
];

const companyLinks2: LinkItem[] = [
  { title: 'Blog', href: '#', icon: Leaf },
  { title: 'Help Center', href: '#', icon: HelpCircle },
  { title: 'Privacy Policy', href: '#', icon: Shield },
  { title: 'Terms of Service', href: '#', icon: RotateCcw },
];

/* ── Scroll hook ─────────────────────────────────── */
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/* ── List item (dropdown card) ───────────────────── */
type ListItemProps = Omit<React.ComponentProps<typeof NavigationMenuLink>, 'href'> & LinkItem;

function ListItem({ title, description, icon: Icon, className, href, color, ...rest }: ListItemProps) {
  return (
    <NavigationMenuLink asChild className={cn('flex w-full flex-row items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-black/[0.04]', className)} {...rest}>
      <a href={href}>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-md border"
          style={{
            background: color ? `${color}15` : 'rgba(0,0,0,0.03)',
            borderColor: color ? `${color}30` : 'rgba(0,0,0,0.07)',
          }}
        >
          <Icon className="size-4" style={{ color: color ?? 'rgba(0,0,0,0.4)' }} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-[#000000] leading-none">{title}</span>
          {description && <span className="text-xs text-[#6b6b7a] leading-snug">{description}</span>}
        </div>
      </a>
    </NavigationMenuLink>
  );
}

/* ── Mobile menu (portal) ────────────────────────── */
type MobileMenuProps = { open: boolean; children: React.ReactNode };

function MobileMenuPortal({ open, children }: MobileMenuProps) {
  if (typeof window === 'undefined') return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          id="mobile-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed top-14 inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-black/[0.08] bg-[#f6f9fc]/98 backdrop-blur-xl md:hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ── Navbar ──────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScrolled(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'sticky top-0 z-50 w-full border-b border-transparent transition-[background-color,border-color] duration-300 will-change-[background-color,border-color]',
          scrolled && 'border-black/[0.08] bg-white/80 backdrop-blur-xl',
        )}
      >
        <nav className="mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between px-6 md:px-10">

          {/* ── Logo + desktop nav ── */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 rounded-md px-1 py-1">
              <div className="relative h-8 w-8 overflow-hidden rounded-tl-sm rounded-br-sm shrink-0">
                <img
                  src="/logo.webp"
                  alt="FactWise Logo"
                  className="absolute -top-[2%] -left-[2%] w-[102%] h-[102%] max-w-none"
                />
              </div>
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#000000]">
                FactWise
              </span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>

                {/* Product */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[580px] p-3">
                      <div className="grid grid-cols-2 gap-1">
                        {productLinks.map(item => (
                          <ListItem key={item.title} {...item} />
                        ))}
                      </div>
                      <div className="mt-2 border-t border-black/[0.06] px-2 pt-3">
                        <p className="text-xs text-[#6b6b7a]">
                          Ready to save?{' '}
                          <a href="#" className="font-medium text-[#3666ff] hover:underline">
                            Book a demo →
                          </a>
                        </p>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[440px] p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-0.5">
                          {companyLinks.map(item => (
                            <ListItem key={item.title} {...item} />
                          ))}
                        </div>
                        <div className="flex flex-col gap-0.5 pt-1">
                          {companyLinks2.map(item => (
                            <a
                              key={item.title}
                              href={item.href}
                              className="flex items-center gap-2.5 rounded-md px-3 py-2 transition-colors hover:bg-black/[0.04]"
                            >
                              <item.icon className="size-3.5 text-[#52525b]" />
                              <span className="text-sm font-medium text-[#808080]">{item.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#"
                      className="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-black/[0.04] hover:text-foreground"
                    >
                      Pricing
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* ── Desktop CTAs ── */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" className="text-[#6b6b7a] hover:text-[#000000]">
              Login
            </Button>
            <Button size="sm" className="rounded-full px-5 font-semibold">
              Start Now <span className="ml-1 font-light">›</span>
            </Button>
          </div>

          {/* ── Mobile toggle ── */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(o => !o)}
            className="md:hidden text-[#000000]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>

        </nav>
      </motion.header>

      {/* ── Mobile menu portal ── */}
      <MobileMenuPortal open={open}>
        <div className="flex flex-1 flex-col gap-6 p-4 pt-6">
          <div>
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#52525b]">Product</p>
            {productLinks.slice(0, 4).map(link => (
              <ListItem key={link.title} {...link} />
            ))}
          </div>
          <div>
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#52525b]">Company</p>
            {companyLinks.map(link => (
              <ListItem key={link.title} {...link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-black/[0.06] p-4">
          <Button variant="outline" className="w-full">Login</Button>
          <Button className="w-full rounded-full font-semibold">Start Now ›</Button>
        </div>
      </MobileMenuPortal>
    </>
  );
}
