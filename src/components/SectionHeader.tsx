'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  accentColor?: string;
  align?: 'left' | 'center';
  marginBottom?: number | string;
}

export default function SectionHeader({
  label,
  title,
  description,
  accentColor = '#3666ff',
  align = 'left',
  marginBottom = 24,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={cn(
      "flex flex-col w-full",
      isCenter ? "items-center text-center" : "items-start text-left",
      marginBottom === 24 ? "mb-6" : ""
    )}
    style={marginBottom !== 24 ? { marginBottom } : {}}
    >
      {/* Label/Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
      >
        {label}
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1] max-w-4xl"
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "text-base md:text-lg text-slate-500 font-medium",
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

// Helper to handle class merging if cn utility is not available in this file scope
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
