"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Heart, Target, BookOpen, Shield } from "lucide-react";

// Map categories to icons for quick visual differentiation
const categoryIcons: Record<string, React.ReactNode> = {
  "CBT & Anxiety": <Brain className="h-4 w-4" />,
  "Emotional Mastery": <Heart className="h-4 w-4" />,
  "Personal Growth": <Target className="h-4 w-4" />,
  "Foundation Protocol": <Brain className="h-4 w-4" />,
  "Authority Protocol": <Target className="h-4 w-4" />,
  "Discipline Protocol": <Shield className="h-4 w-4" />,
};

// Brief "who it's for" by category to help users self-select
const idealFor: Record<string, string> = {
  "CBT & Anxiety": "For men dealing with overthinking & constant worry",
  "Emotional Mastery": "For men who struggle to process or express emotions",
  "Personal Growth": "For men building lasting habits through self-understanding",
  "Foundation Protocol": "For men dealing with chronic anxiety, overthinking & pressure collapse",
  "Authority Protocol": "For men who want to command rooms, lead people & project grounded confidence",
  "Discipline Protocol": "For men who understand psychology but can't convert insight into lasting behavior",
};

interface CourseCardProps {
  slug?: string;
  title: string;
  description: string;
  price: string;
  category: string;
  featured?: boolean;
}

const CourseCard = ({
  slug,
  title,
  description,
  price,
  category,
  featured,
}: CourseCardProps) => {
  const Icon = categoryIcons[category] ?? <BookOpen className="h-4 w-4" />;
  const audience = idealFor[category];

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`group relative flex flex-col rounded-xl border bg-card p-7 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer ${
        featured
          ? "ring-2 ring-primary border-primary/30 shadow-primary/10"
          : "border-border"
      }`}
    >
      {featured && (
        <div className="font-accent absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground">
          Core Protocol
        </div>
      )}

      <span className="font-accent inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
        {Icon}
        {category}
      </span>

      <h3 className="font-heading mt-4 text-xl font-bold text-card-foreground leading-tight sm:text-2xl">
        {title}
      </h3>

      <p className="font-body mt-3 flex-1 text-[15px] leading-relaxed text-foreground/70">
        {description}
      </p>

      {audience && (
        <p className="font-body mt-3 text-xs font-medium text-primary/80 italic">
          {audience}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="font-accent text-2xl font-bold text-primary">
          {price}
        </span>
        <span className="font-body text-sm font-medium text-primary transition-colors group-hover:underline">
          View Protocol →
        </span>
      </div>
    </motion.div>
  );

  if (slug) {
    return <Link href={`/courses/${slug}`} prefetch={false}>{cardContent}</Link>;
  }

  return cardContent;
};

export default CourseCard;
