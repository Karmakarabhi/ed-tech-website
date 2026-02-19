"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer ${featured ? "ring-2 ring-accent-gold" : "border-border"
        }`}
    >
      {featured && (
        <div className="font-accent absolute -top-3 right-4 rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          Featured
        </div>
      )}

      <Badge
        variant="secondary"
        className="font-accent w-fit text-xs font-medium"
      >
        {category}
      </Badge>

      <h3 className="font-heading mt-4 text-xl text-card-foreground">
        {title}
      </h3>

      <p className="font-body mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="font-accent text-2xl font-bold text-primary">
          {price}
        </span>
        <span className="font-body text-sm font-medium text-primary transition-colors group-hover:underline">
          View Course →
        </span>
      </div>
    </motion.div>
  );

  if (slug) {
    return <Link href={`/courses/${slug}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default CourseCard;
