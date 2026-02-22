"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Youtube, AlertTriangle, Lightbulb } from "lucide-react";

const credentials = [
  { label: "Psychology Expert" },
  { label: "Certified CBT Practitioner" },
  { label: "TEDx Speaker" },
];

const diagnosticPoints = [
  {
    icon: AlertTriangle,
    label: "The Pattern Observed",
    text: "Across 10 years and 1.4M subscribers, one pattern repeated: high-functioning men — engineers, founders, professionals — unable to regulate pressure, sustain relationships, or act on their own values. Not from lack of intelligence. From lack of the right psychological architecture.",
  },
  {
    icon: AlertTriangle,
    label: "Where Modern Advice Fails",
    text: "The self-help industry offers motivation. Therapy offers dialogue. Neither offers a systematic, masculine framework for restructuring the cognitive and behavioral root causes of psychological collapse. Men leave with insight and no protocol.",
  },
  {
    icon: Lightbulb,
    label: "Why Men Specifically",
    text: "Men are socialized against introspection. The failure isn't willpower — it's the absence of a clinical map. Saurabh engineered Gandhi University to fill that gap: structured protocols built around how the male mind actually works under pressure.",
  },
];

const MeetYourCoach = () => {
  return (
    <section
      id="about"
      className="bg-secondary py-24 lg:py-32 dark:bg-secondary"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-accent mb-12 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
        >
          The Man Behind The System
        </motion.p>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── LEFT: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            {/* Portrait */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/assets/authorOne.webp"
                alt="Saurabh Gandhi — Psychology Expert & Founder"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover object-[center_10%] scale-105"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 50%, rgba(0,0,0,0.35) 100%)",
                }}
              />
            </div>

            {/* YouTube floating pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -top-4 -right-4 flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-xl"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600">
                <Youtube className="h-3.5 w-3.5 text-white" />
              </span>
              <div>
                <p className="font-accent text-sm font-bold leading-none text-foreground">1.4M+</p>
                <p className="font-body text-[10px] leading-tight text-muted-foreground">
                  YouTube Subscribers
                </p>
              </div>
            </motion.div>

            {/* CBT Certified dark badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="absolute -bottom-5 -left-4 rounded-xl bg-foreground px-5 py-4 shadow-xl dark:bg-card dark:border dark:border-border"
            >
              <p className="font-accent text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50 dark:text-foreground/50">
                Certified
              </p>
              <p className="font-heading mt-0.5 text-base text-primary-foreground dark:text-foreground">CBT Practitioner</p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="pt-6 lg:pt-4"
          >
            <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              He Studied The Problem
              <br />
              <em className="not-italic text-primary">For a Decade. Then Built a System.</em>
            </h2>

            <p className="font-accent mt-3 text-lg font-medium text-foreground/70">
              Saurabh Gandhi — Founder, Gandhi University
            </p>

            {/* Credential pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {credentials.map((c) => (
                <span
                  key={c.label}
                  className="font-accent rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/70"
                >
                  {c.label}
                </span>
              ))}
            </div>

            {/* Diagnostic points */}
            <div className="mt-8 space-y-6">
              {diagnosticPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-accent text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
                        {point.label}
                      </p>
                      <p className="font-body text-[15px] leading-relaxed text-foreground/75">
                        {point.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mission block */}
            <div className="mt-10 rounded-xl bg-foreground px-6 py-5 dark:bg-card dark:border dark:border-border">
              <p className="font-accent text-[9px] uppercase tracking-[0.22em] text-primary-foreground/40 dark:text-muted-foreground">
                The Mission
              </p>
              <p className="font-heading mt-2 text-xl leading-snug text-primary-foreground dark:text-foreground">
                Help{" "}
                <span className="text-primary">1.4 Billion Indians</span>{" "}
                understand and actualize their true potential — through systems, not slogans.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetYourCoach;
