"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  logo?: string | null;
  initials: string;
  avatarClass: string;
};

type TestimonialSection3Props = {
  items: TestimonialItem[];
};

export default function TestimonialSection3({ items }: TestimonialSection3Props) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const reduceMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + items.length) % items.length);
  }, [items.length]);

  const visibleItems = useMemo(() => {
    const lastIndex = items.length - 1;
    const previousIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;

    return [
      { ...items[previousIndex], position: "left" as const },
      { ...items[currentIndex], position: "center" as const },
      { ...items[nextIndex], position: "right" as const },
    ];
  }, [currentIndex, items]);

  if (items.length < 3) return null;

  return (
    <div
      className="w-full"
      tabIndex={0}
      aria-label="Customer testimonials carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") handlePrevious();
        if (event.key === "ArrowRight") handleNext();
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-stretch justify-center px-1 sm:px-4">
        {visibleItems.map((item, index) => {
          const isCenter = item.position === "center";
          const isLeft = item.position === "left";

          return (
            <div key={item.position} className="contents">
              {index > 0 && (
                <div className="relative hidden w-5 shrink-0 overflow-hidden md:block lg:w-7" aria-hidden="true">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] bg-[length:9px_9px] text-blue-200/70" />
                </div>
              )}

              <motion.article
                key={`${item.id}-${item.position}`}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: isCenter ? 0 : isLeft ? 18 : -18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={!isCenter}
                className={cn(
                  "relative min-h-[350px] w-full overflow-hidden rounded-[22px] border p-6 text-left sm:min-h-[370px] sm:rounded-[26px] sm:p-8 md:w-[31%] md:min-h-[400px] lg:w-[330px]",
                  isCenter
                    ? "z-20 flex bg-[#3666ff] text-white shadow-[0_24px_70px_-20px_rgba(54,102,255,0.55)]"
                    : "z-0 hidden border-slate-200 bg-white text-slate-600 shadow-[0_12px_36px_-20px_rgba(15,23,42,0.28)] md:flex",
                )}
              >
                {!isCenter && (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-10",
                      isLeft
                        ? "bg-gradient-to-r from-white/90 via-white/35 to-transparent"
                        : "bg-gradient-to-l from-white/90 via-white/35 to-transparent",
                    )}
                  />
                )}

                <div className="relative z-0 flex w-full flex-col">
                  <Quote
                    className={cn("mb-7 size-9", isCenter ? "fill-white/15 text-white" : "fill-blue-50 text-[#3666ff]")}
                    strokeWidth={1.8}
                  />

                  <blockquote
                    className={cn(
                      "flex-1 font-medium leading-[1.58] tracking-[-0.015em]",
                      isCenter ? "text-[18px] text-white sm:text-[20px]" : "text-[15px] text-slate-700 blur-[0.25px] opacity-75 sm:text-[16px]",
                    )}
                  >
                    “{item.quote}”
                  </blockquote>

                  <div className={cn("mt-9 flex items-center gap-3 border-t pt-5", isCenter ? "border-white/20" : "border-slate-100")}>
                    <div
                      className={cn(
                        "relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border-2 text-sm font-bold",
                        isCenter ? "border-white/75 bg-white text-[#2449c8]" : `border-blue-100 ${item.avatarClass}`,
                      )}
                    >
                      {item.logo ? (
                        <Image src={item.logo} alt="" fill sizes="48px" className="object-contain p-1.5" />
                      ) : (
                        item.initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <cite className={cn("block truncate text-[15px] font-bold not-italic", isCenter ? "text-white" : "text-slate-900")}>
                        {item.name}
                      </cite>
                      <p className={cn("mt-0.5 text-[11px] font-medium uppercase tracking-[0.08em]", isCenter ? "text-blue-100" : "text-slate-500")}>
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex items-center justify-center gap-3 sm:mt-11">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="group flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-blue-200 hover:text-[#3666ff] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3666ff]/40"
        >
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div className="flex items-center gap-1.5 px-2" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={item.id}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex ? "w-6 bg-[#3666ff]" : "w-1.5 bg-slate-300",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="group flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:translate-x-0.5 hover:border-blue-200 hover:text-[#3666ff] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3666ff]/40"
        >
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
