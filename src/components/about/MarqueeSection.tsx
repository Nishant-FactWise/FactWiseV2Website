'use client';
 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
 
const ITEMS = [
  { text: "Source", highlight: "smarter" },
  { text: "Contract", highlight: "faster" },
  { text: "Pay", highlight: "on time" },
  { text: "Procure", highlight: "with joy" }
];
 
export const MarqueeSection = () => {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const t = (source: string) => messages[locale].textMap[source] ?? source;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const maxRotation = 8;
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
 
      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rotation = (distanceFromMidpoint / midpoint) * maxRotation;
 
      setRotation(e.clientX > midpoint ? rotation : -rotation);
    };
 
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
 
  return (
    <section 
      className="py-8 border-y border-slate-100 bg-white overflow-hidden select-none relative mb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Kinetic Tooltip */}
      <div
        className={`fixed z-[99] transition-opacity duration-300 font-bold px-12 py-6 rounded-full text-nowrap pointer-events-none
          ${isHovered ? "opacity-100" : "opacity-0"}
          bg-gradient-to-br from-[#3666ff] to-[#1e40af] backdrop-blur-md text-white border border-white/20 shadow-2xl
        `}
        style={{
          top: `${cursorPosition.y}px`,
          left: `${cursorPosition.x}px`,
          transform: `rotateZ(${rotation}deg) translate(-50%, -140%)`,
        }}
      >
        <p className="text-base font-bold tracking-tight">{t("Only at FactWise📍")}</p>
      </div>

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-20 pr-20"
        >
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-20">
                  <div className="flex items-center gap-6 group/item cursor-pointer">
                    <span className="text-3xl md:text-5xl font-medium text-slate-400 tracking-tighter transition-colors duration-500 group-hover/item:text-[#3666ff]">
                      {t(item.text)} <span className="font-instrument italic group-hover/item:text-[#3666ff] transition-colors duration-500">{t(item.highlight)}</span>
                    </span>
                    <Star className="w-6 h-6 md:w-10 md:h-10 text-slate-200 fill-slate-200 transition-all duration-500 group-hover/item:text-[#3666ff] group-hover/item:fill-[#3666ff] group-hover/item:rotate-90" />
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
