"use client";

import { motion } from "framer-motion";
import { Youtube, Instagram, Users } from "lucide-react";

const platforms = [
  {
    icon: Youtube,
    iconColor: "text-red-500",
    metric: "1.4M+",
    label: "YouTube Subscribers",
    sub: "Weekly psychology breakdowns",
  },
  {
    icon: Instagram,
    iconColor: "text-pink-500",
    metric: "700K+",
    label: "Instagram Followers",
    sub: "Daily mindset content",
  },
  {
    icon: Users,
    iconColor: "text-primary",
    metric: "50K+",
    label: "Students Enrolled",
    sub: "Across all courses",
  },
];

const SocialProofBar = () => {
  return (
    <section className="border-y border-border bg-secondary/60 py-14">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-accent mb-10 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Trusted by a community of 2M+
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-3">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-5 rounded-xl border border-border bg-card px-6 py-5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Icon className={`h-5 w-5 ${p.iconColor}`} />
                </div>
                <div>
                  <p className="font-accent text-2xl font-bold text-foreground">{p.metric}</p>
                  <p className="font-body text-sm font-medium text-foreground/80">{p.label}</p>
                  <p className="font-body text-xs text-muted-foreground">{p.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Platform logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-muted-foreground"
        >
          <span className="font-body text-xs uppercase tracking-widest">As seen on</span>
          {["YouTube", "Instagram", "TEDx", "Podcasts"].map((name) => (
            <span
              key={name}
              className="font-accent rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground/60"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
