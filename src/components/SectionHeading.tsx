"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ label, title, description, align = "left" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "text-center" : ""}
    >
      {label && (
        <p className="font-accent mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
          {label}
        </p>
      )}
      <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-[3.25rem] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="font-body mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
