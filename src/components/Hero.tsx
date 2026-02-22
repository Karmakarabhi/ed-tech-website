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
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/60" />
      {/* Subtle dark vignette at edges for visual tension */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_140%_100%_at_50%_0%,transparent_55%,rgba(0,0,0,0.07)_100%)] dark:[background:radial-gradient(ellipse_140%_100%_at_50%_0%,transparent_40%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-6 font-accent text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
              Gandhi University &mdash; India&apos;s Psychological Performance Institute
            </p>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
              Psychological
              <br />
              Strength Is
              <br />
              <span className="text-primary">Trainable.</span>
            </h1>

            <p className="mt-6 font-heading text-xl font-medium leading-snug text-foreground/60 sm:text-2xl">
              Most Men Were Never Taught How.
            </p>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              After a decade of studying why high-functioning men collapse under pressure,
              Saurabh Gandhi engineered a clinical system — not a curriculum.
              Structured <strong className="font-semibold text-foreground">protocols</strong>, not
              motivational content. <strong className="font-semibold text-foreground">Root causes</strong>, not
              symptom relief.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2 text-base font-semibold" asChild>
                  <Link href="/courses">
                    View Training Protocols
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <Link
                href="#method"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                See The Gandhi Method™
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
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
                src="/assets/authorTwo.webp"
                alt="Saurabh Gandhi — Founder, Gandhi University"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_8%] scale-105"
              />

              {/* Bottom fade — grounds the subject */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Radial vignette — softens edges so subject pops */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 85% at 50% 35%, transparent 48%, rgba(0,0,0,0.42) 100%)",
                }}
              />

              {/* Top edge blur mask */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />

              {/* Side edge blur bars */}
              <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/20 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/20 to-transparent" />

              {/* Founder name tag — bottom of image */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-accent text-xs uppercase tracking-[0.18em] text-white/60 mb-0.5">Founder</p>
                <p className="font-heading text-xl text-white drop-shadow-md">Saurabh Gandhi</p>
              </div>
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