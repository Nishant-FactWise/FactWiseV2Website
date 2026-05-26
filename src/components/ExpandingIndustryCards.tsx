"use client";

import * as React from "react";
import {
  Pyramid,
  Castle,
  Mountain,
  TowerControl,
  Building,
  Landmark,
  Shield,
  Truck,
  HeartPulse,
  ShoppingBag,
  Cpu,
  Globe,
  Wrench,
  Car,
  TestTube,
  Factory,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils"; 
import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl gap-3 mx-auto",
        "grid",
        "h-[700px] md:h-[500px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500",
            activeIndex === index ? "ring-2 ring-blue-500/20" : "hover:border-blue-500/30",
            "md:min-w-[80px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-data-[active=true]:scale-105 group-data-[active=true]:grayscale-0 scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

          <article
            className="absolute inset-0 flex flex-col justify-end gap-3 p-6"
          >
            <h3 className="hidden origin-left rotate-90 text-sm font-bold uppercase tracking-[0.2em] text-white/90 opacity-100 transition-all duration-500 ease-out md:block group-data-[active=true]:opacity-0 whitespace-nowrap mb-12">
              {item.title}
            </h3>

            <div className="text-blue-400 opacity-0 transition-all duration-500 delay-100 transform translate-y-4 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold text-white opacity-0 transition-all duration-500 delay-150 transform translate-y-4 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            <p className="w-full max-w-md text-[15px] text-white/70 opacity-0 transition-all duration-500 delay-200 transform translate-y-4 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";

const industryItems: CardItem[] = [
  {
    id: 1,
    title: "MRO",
    description: "Manage indirect spend, simplify maintenance, repair, and operations procurement, and track tool lifecycle costs.",
    imgSrc: "/images/industries/mro.png",
    icon: <Wrench className="size-8" />,
    linkHref: "#"
  },
  {
    id: 2,
    title: "Electronic Manufacturing",
    description: "Streamline component sourcing, manage complex PCB BOMs, and ensure supply chain resilience.",
    imgSrc: "/images/industries/electronic.png",
    icon: <Cpu className="size-8" />,
    linkHref: "#"
  },
  {
    id: 3,
    title: "Automotive",
    description: "Optimize direct spend for tier-1 suppliers, manage multi-level BOMs, and source quality components seamlessly.",
    imgSrc: "/images/industries/automotive.png",
    icon: <Car className="size-8" />,
    linkHref: "#"
  },
  {
    id: 4,
    title: "Pharmaceutical",
    description: "Ensure compliance, manage critical lab supplies, and achieve zero-error procurement for life-saving operations.",
    imgSrc: "/images/industries/pharma.png",
    icon: <HeartPulse className="size-8" />,
    linkHref: "#"
  },
  {
    id: 5,
    title: "Chemicals",
    description: "Source raw materials reliably, track global commodity prices, and manage large-scale industrial supplier networks.",
    imgSrc: "/images/teamwork-dim-modern-lab.jpg",
    icon: <TestTube className="size-8" />,
    linkHref: "#"
  },
  {
    id: 6,
    title: "Manufacturing",
    description: "Digitalize direct procurement, manage complex bills of materials, and secure raw materials with automated workflows.",
    imgSrc: "/images/portrait-male-engineer-working-field-engineers-day-celebration.jpg",
    icon: <Factory className="size-8" />,
    linkHref: "#"
  },
  {
    id: 7,
    title: "Electrical Switchboards",
    description: "Simplify procurement of complex electrical components, manage multi-vendor bids, and ensure spec compliance for switchboard assembly.",
    imgSrc: "/images/industries/switchboard.png",
    icon: <Zap className="size-8" />,
    linkHref: "#"
  }
];

export function ExpandingIndustrySection() {
  return (
    <section id="vertical-solutions" className="relative py-12 px-4 md:px-10">
      <div className="relative overflow-hidden rounded-[24px] py-24" style={{ backgroundImage: "url('/TexturedGradient.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Blue Glow on Right - Optimized */}
        <div 
          className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-50"
          style={{ 
            background: 'radial-gradient(circle, rgba(54, 102, 255, 0.2) 0%, rgba(54, 102, 255, 0.1) 40%, transparent 80%)',
          }} 
        />
        <div className="absolute inset-0 noise opacity-20 pointer-events-none" />







      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4A6FFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Globe className="size-3" />
            <span>Vertical Solutions</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
            Tailored for your <span className="text-[#3666ff]">Industry</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            FactWise provides specialized features designed to meet the unique challenges of your specific market sector.
          </p>
        </motion.div>
        
        <ExpandingCards items={industryItems} />
      </div>
    </div>
  </section>
  );
}
