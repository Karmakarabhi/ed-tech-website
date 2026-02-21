"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SlidingNumberProps {
  value: number;
  padStart?: boolean;
}

export function SlidingNumber({ value, padStart = false }: SlidingNumberProps) {
  const str = padStart ? String(value).padStart(2, "0") : String(value);
  const digits = str.split("");

  return (
    <span className="flex">
      {digits.map((digit, i) => (
        <span
          key={i}
          className="relative inline-flex h-[1em] overflow-hidden leading-none"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${i}-${digit}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="inline-block"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
