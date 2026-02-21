"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Youtube } from "lucide-react";

const credentials = [
  { label: "Psychology Expert" },
  { label: "Certified CBT Practitioner" },
  { label: "TEDx Speaker" },
];

const MeetYourCoach = () => {
  return (
    <section
      id="about"
      className="py-24 lg:py-32"
      style={{ background: "hsl(36 26% 90%)" }}
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
          Meet Your Coach
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
              className="absolute -bottom-5 -left-4 rounded-xl bg-foreground px-5 py-4 shadow-xl"
            >
              <p className="font-accent text-[9px] uppercase tracking-[0.2em] text-white/50">
                Certified
              </p>
              <p className="font-heading mt-0.5 text-base text-white">CBT Practitioner</p>
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
              The Man Behind
              <br />
              <em className="not-italic text-primary">Gandhi University.</em>
            </h2>

            <p className="font-accent mt-3 text-lg font-medium text-foreground/70">
              Saurabh Gandhi
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

            <p className="font-body mt-7 text-[15px] leading-relaxed text-foreground/75">
              Saurabh Gandhi is a <strong>Psychology Expert, Certified CBT Practitioner</strong> and
              one of India&apos;s most trusted voices in self-mastery. Over the years, he has helped
              millions of men find their true masculine path — building discipline, speaking with
              power, and walking away from destructive habits.
            </p>

            <p className="font-body mt-4 text-[15px] leading-relaxed text-foreground/75">
              Men who once broke under pressure are now{" "}
              <strong>building dream careers, leading teams, and earning deep respect</strong>{" "}
              everywhere they go.
            </p>

            {/* Pull quote */}
            <blockquote className="mt-8 border-l-2 border-primary pl-5">
              <p className="font-heading text-lg italic leading-snug text-foreground">
                &ldquo;I take away the technical jargon and simplify human behavior for every
                Indian looking to be their best self.&rdquo;
              </p>
            </blockquote>

            <p className="font-body mt-6 text-[15px] leading-relaxed text-foreground/75">
              People know him as the{" "}
              <span className="font-semibold text-foreground">&ldquo;go-to psychology guy&rdquo;</span>{" "}
              — because he makes the complex feel human, and the actionable feel inevitable.
            </p>

            {/* Mission block */}
            <div className="mt-8 rounded-xl bg-foreground px-6 py-5">
              <p className="font-accent text-[9px] uppercase tracking-[0.22em] text-white/40">
                The Mission
              </p>
              <p className="font-heading mt-2 text-xl leading-snug text-white">
                Help{" "}
                <span className="text-primary">1.4 Billion Indians</span>{" "}
                understand and actualize their true potential.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetYourCoach;
