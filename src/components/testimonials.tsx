"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import TestimonialSection3, { type TestimonialItem } from "./ui/testimonial-section-3";
import { useLocalizedText } from "@/hooks/useLocalizedText";

const testimonials: TestimonialItem[] = [
  {
    id: "syrma-sgs",
    name: "Kapil Maini",
    role: "Chief Procurement Officer",
    company: "Syrma SGS",
    quote: "FactWise digitized our quotation process, giving us faster workflows, better transparency, and actionable procurement insights.",
    logo: "/syrmasgs.png",
    initials: "KM",
    avatarClass: "bg-blue-50 text-blue-700",
  },
  {
    id: "fortune-50-vp",
    name: "VP of Procurement",
    role: "Procurement Leader",
    company: "Fortune 50 Company",
    quote: "FactWise brings RFx, pricing, allocation, purchase orders, and AP processing into one efficient materials-buying workflow.",
    logo: null,
    initials: "VP",
    avatarClass: "bg-violet-50 text-violet-700",
  },
  {
    id: "spark-minda",
    name: "Sunil Kumar Injeti",
    role: "Vice President",
    company: "Spark Minda",
    quote: "By automating non-value-adding sourcing work, FactWise helps our teams move faster and make smarter decisions with tailored dashboards.",
    logo: "/sparkminda.png",
    initials: "SKI",
    avatarClass: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "driplex",
    name: "Vivek Mehta",
    role: "CEO",
    company: "Driplex",
    quote: "FactWise connected smoothly with our ERP and made purchasing more informed, organized, and effortless.",
    logo: "/Driplexengitech.png",
    initials: "VM",
    avatarClass: "bg-amber-50 text-amber-700",
  },
  {
    id: "gem-corp",
    name: "Kinjal Shah",
    role: "CEO",
    company: "Gem Corp",
    quote: "FactWise turned complex procurement analysis into an intuitive, data-driven experience while reducing our dependence on spreadsheets.",
    logo: "/gemcorp.png",
    initials: "KS",
    avatarClass: "bg-pink-50 text-pink-700",
  },
];

export default function Testimonials() {
  const translate = useLocalizedText();
  const localizedTestimonials = testimonials.map((testimonial) => ({
    ...testimonial,
    role: translate(testimonial.role),
    company: translate(testimonial.company),
    quote: translate(testimonial.quote),
  }));

  return (
    <section
      id="testimonials"
      className="relative bg-white px-3 py-8 sm:px-5 sm:py-10 md:px-10 md:py-12"
      style={{ scrollMarginTop: 100 }}
    >
      <div
        className="relative overflow-hidden rounded-[20px] py-14 sm:rounded-[24px] sm:py-20 lg:py-24"
        style={{
          backgroundColor: "#f5f7ff",
          backgroundImage: "url('/TexturedGradient.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="pointer-events-none absolute -bottom-40 -right-36 size-[620px] rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="noise pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay" />

        <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <ScrollReveal delay={0.1}>
              <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3666ff] sm:mb-6">
                {translate("Testimonials")}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="mb-4 text-[28px] font-bold leading-[1.12] tracking-tight text-[#1A1D2E] sm:text-3xl md:mb-6 md:text-5xl">
                {translate("Trusted by the ")}
                <span className="text-[#3666ff]">{translate("Best in the Business.")}</span>
              </h2>
            </ScrollReveal>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mx-auto max-w-2xl text-justify text-[15px] font-medium leading-[1.65] text-slate-500 sm:text-center sm:text-base md:text-lg"
            >
              {translate("Real procurement leaders share how FactWise helps their teams move faster, work smarter, and make confident decisions.")}
            </motion.p>
          </div>

          <TestimonialSection3 items={localizedTestimonials} />
        </div>
      </div>
    </section>
  );
}
