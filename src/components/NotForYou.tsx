"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const dealBreakers = [
  "Want quick motivation that fades by Monday",
  "Avoid discomfort and expect shortcuts to growth",
  "Expect results without doing the actual work",
  "Look for someone to blame instead of someone to learn from",
  "Want to be told what they want to hear, not what they need to hear",
];

const NotForYou = () => {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-destructive">
            Fair Warning
          </p>
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl lg:text-5xl">
            This is <span className="text-destructive">not</span> for every man.
          </h2>
          <p className="font-body mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Gandhi University is built for men who are ready to do real psychological work. If
            any of the following describe you, this isn&apos;t the right fit — and that&apos;s okay.
          </p>

          <ul className="mt-10 space-y-4">
            {dealBreakers.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive/70" />
                <span className="font-body text-base leading-relaxed text-foreground/90">
                  Men who {item.toLowerCase()}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-body mt-10 border-l-2 border-primary pl-4 text-base italic leading-relaxed text-muted-foreground"
          >
            But if you&apos;re willing to sit with discomfort, question your patterns, and put in
            the reps — you&apos;ll find more depth here than anywhere else on the internet.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NotForYou;
