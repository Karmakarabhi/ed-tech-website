"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/40" />

      <div className="container relative z-10 mx-auto px-6 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Psychology-Driven Self-Mastery
            </p>

            <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Master Your Mind.
              <br />
              <span className="text-primary">Transform Your Life.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Evidence-based courses in cognitive psychology, emotional regulation,
              and discipline — designed for the modern Indian man seeking depth over noise.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2 text-base" asChild>
                <Link href="/courses">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Learn more about our approach
              </a>
            </div>
          </motion.div>

          {/* RIGHT — SINGLE HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Portrait frame */}
            <div className="relative aspect-[3/4.5] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/assets/author.webp"
                alt="Founder portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_15%]"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-8 -left-8 rounded-xl bg-card/95 p-6 shadow-xl backdrop-blur"
            >
              <p className="text-3xl font-bold text-primary">1.4M+</p>
              <p className="text-xs text-muted-foreground">YouTube Subscribers</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;