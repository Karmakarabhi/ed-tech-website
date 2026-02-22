"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  image?: string;
}

// High-quality Unsplash portrait images — one per testimonial (Indian male portraits)
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=760&fit=crop&crop=faces,top&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=760&fit=crop&crop=faces,top&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=760&fit=crop&crop=faces,top&q=85",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=760&fit=crop&crop=faces,top&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=760&fit=crop&crop=faces,top&q=85",
];

interface Props {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function AnimatedTestimonials({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
}: Props) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setActive((prev) =>
        dir === 1
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
    },
    [testimonials.length]
  );

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;
    const id = setInterval(() => go(1), autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, go, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-4 md:grid-cols-2 md:gap-20">
      {/* Stacked image cards */}
      <div className="relative h-80 w-full sm:h-96 md:h-[28rem]">
        <AnimatePresence>
          {testimonials.map((t, i) => {
            const offset = i - active;
            const absOffset = Math.abs(offset);
            if (absOffset > 4) return null;

            const img = t.image ?? PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length];

            return (
              <motion.div
                key={i}
                className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg"
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  rotate: offset * 5,
                  x: direction * 90,
                }}
                animate={{
                  opacity:
                    offset === 0
                      ? 1
                      : absOffset === 1
                      ? 0.55
                      : absOffset === 2
                      ? 0.3
                      : absOffset === 3
                      ? 0.15
                      : 0.07,
                  scale: 1 - absOffset * 0.055,
                  rotate: offset * 4,
                  zIndex: testimonials.length - absOffset,
                  x: offset * 16,
                  y: absOffset * 7,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.84,
                  x: -direction * 90,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <Image
                  src={img}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === active}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Text + controls */}
      <div className="flex flex-col justify-between py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Outcome Record
              </span>
            </div>

            <p className="font-heading text-2xl font-bold text-foreground leading-snug">
              {testimonials[active].name}
            </p>
            <p className="font-accent mt-1.5 text-sm font-semibold text-primary/80">
              {testimonials[active].context}
            </p>

            <p className="font-body mt-6 text-[15px] leading-[1.75] text-muted-foreground">
              {testimonials[active].quote}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex gap-3">
          <button
            onClick={() => go(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dot indicators */}
          <div className="ml-2 flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-primary" : "w-1.5 bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
