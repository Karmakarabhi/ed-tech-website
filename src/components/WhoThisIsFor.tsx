"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const profiles = [
  {
    role: "Leaders & Managers",
    description:
      "You carry the weight of decisions daily. The pressure of being depended on without a reliable psychological foundation is eroding your performance — and you know it.",
  },
  {
    role: "Founders & Entrepreneurs",
    description:
      "You've built external momentum but the internal chaos is catching up. Anxiety, isolation, imposter patterns — the operating system needs work as much as the business does.",
  },
  {
    role: "High Performers",
    description:
      "You've achieved by output. But you're aware that the next level of performance — in work, in relationships, in presence — requires psychological depth you haven't been trained for.",
  },
  {
    role: "Ambitious Professionals",
    description:
      "You're competent but something is consistently in the way — reactivity, overthinking, inability to assert, fear of conflict. The gap isn't skill. It's psychological architecture.",
  },
];

const markers = [
  "You've felt that your emotional reactions don't match who you want to be",
  "You've consumed self-help content and felt nothing sustainably change",
  "You function well publicly but operate in chaos privately",
  "You're serious enough to do structured psychological work — not scroll through it",
  "You understand that real change requires diagnosis, not inspiration",
];

export default function WhoThisIsFor() {
  return (
    <section className="py-28 lg:py-36">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Ideal Client Profile
          </p>
          <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Who This Is{" "}
            <span className="text-primary">Built For</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Gandhi University is not a platform for casual browsers. It is built for a specific
            man — one who is done with noise and ready for a clinical approach.
          </p>
        </motion.div>

        {/* Profile cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1">
                <span className="font-accent text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  {profile.role}
                </span>
              </div>
              <p className="font-body text-[14px] leading-relaxed text-muted-foreground">
                {profile.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Markers — self-selection checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-border bg-secondary p-8 lg:p-12"
        >
          <p className="font-accent mb-6 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            You belong here if&hellip;
          </p>
          <ul className="space-y-4">
            {markers.map((marker, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="font-body text-[15px] leading-relaxed text-foreground/85">
                  {marker}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="font-semibold" asChild>
              <Link href="/courses">View Training Protocols</Link>
            </Button>
            <p className="font-body text-sm text-muted-foreground">
              No upsells. No fluff. Just structured psychological programs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
