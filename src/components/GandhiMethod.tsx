"use client";

import { motion } from "framer-motion";
import { Eye, Brain, Zap, Users, Shield } from "lucide-react";

const phases = [
  {
    number: "01",
    icon: Eye,
    title: "Awareness",
    subtitle: "See the root, not the symptom",
    description:
      "Before you can change a pattern, you must be able to observe it without judgment. This phase trains metacognitive awareness — the ability to watch your own thought loops, emotional triggers, and behavioral defaults as they happen in real time.",
    outcomes: ["Trigger mapping", "Cognitive distortion identification", "Emotional labeling accuracy"],
  },
  {
    number: "02",
    icon: Brain,
    title: "Cognitive Restructuring",
    subtitle: "Rewrite the operating system",
    description:
      "Using evidence-based CBT and schema therapy techniques, this phase targets the core beliefs — about self-worth, safety, and identity — that generate destructive thought patterns. Not affirmations. Structural rewiring.",
    outcomes: ["Core belief audit", "Schema interruption protocols", "Automatic thought replacement"],
  },
  {
    number: "03",
    icon: Zap,
    title: "Behavioral Discipline",
    subtitle: "Build systems, not willpower",
    description:
      "Insight without execution changes nothing. This phase converts psychological understanding into daily behavioral architecture — rituals, accountability structures, and habit stacks designed around your specific cognitive profile.",
    outcomes: ["Identity-based habit design", "Friction mapping", "Accountability systems"],
  },
  {
    number: "04",
    icon: Users,
    title: "Social Authority",
    subtitle: "Command without performance",
    description:
      "This phase addresses how psychological strength expresses in relationship, conflict, and leadership. Boundary clarity, assertive communication, and presence under pressure — rooted in self-knowledge, not rehearsed confidence.",
    outcomes: ["Conflict navigation", "Assertiveness without aggression", "Presence calibration"],
  },
  {
    number: "05",
    icon: Shield,
    title: "Identity Integration",
    subtitle: "Become the man by default",
    description:
      "The final phase consolidates all prior work into a stable, congruent identity — one that doesn't require constant maintenance. You stop managing yourself and start operating from a new baseline. This is permanence, not performance.",
    outcomes: ["Values-behavior alignment", "Resilience architecture", "Self-concept consolidation"],
  },
];

export default function GandhiMethod() {
  return (
    <section
      id="method"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      {/* Theme-aware background */}
      <div className="absolute inset-0 bg-secondary dark:bg-[hsl(30,25%,3%)]" />
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 80px,
            currentColor 80px,
            currentColor 81px
          )`,
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Proprietary Framework
          </p>
          <h2 className="font-heading text-4xl leading-tight text-foreground dark:text-white sm:text-5xl lg:text-6xl">
            The Gandhi Method™
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground dark:text-white/55 sm:text-xl">
            A 5-phase psychological performance system engineered for men who are done
            managing symptoms and ready to fix the root.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Not a curriculum. A clinical protocol stack.
            </p>
          </div>
        </motion.div>

        {/* Phases */}
        <div className="mt-20 space-y-0">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative grid gap-8 border-t border-border dark:border-white/10 py-10 lg:grid-cols-[5rem_1fr_1fr] lg:gap-12 lg:py-12"
              >
                {/* Phase number */}
                <div className="flex items-start gap-5 lg:flex-col lg:gap-3">
                  <span className="font-accent text-5xl font-black leading-none tracking-tighter text-foreground/10 dark:text-white/10 group-hover:text-primary/30 transition-colors lg:text-6xl">
                    {phase.number}
                  </span>
                </div>

                {/* Phase title + desc */}
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground dark:text-white sm:text-2xl">
                        {phase.title}
                      </h3>
                      <p className="font-accent text-xs font-medium uppercase tracking-[0.16em] text-primary">
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-[15px] leading-relaxed text-muted-foreground dark:text-white/55 lg:max-w-lg">
                    {phase.description}
                  </p>
                </div>

                {/* Outcomes */}
                <div className="flex flex-col justify-center">
                  <p className="font-accent mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35 dark:text-white/30">
                    Outcomes
                  </p>
                  <ul className="space-y-2">
                    {phase.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2.5">
                        <span className="h-px w-4 bg-primary/60 shrink-0" />
                        <span className="font-body text-sm text-foreground/65 dark:text-white/65">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom border */}
          <div className="border-t border-border dark:border-white/10" />
        </div>

        {/* Footer callout */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 font-heading text-lg italic text-muted-foreground dark:text-white/38 sm:text-xl"
        >
          &ldquo;Without a system, you&rsquo;re guessing. With The Gandhi Method™, you&rsquo;re
          operating on a clinical map.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
