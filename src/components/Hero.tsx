import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/40" />

      <div className="container relative z-10 mx-auto px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="font-accent mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Psychology-Driven Self-Mastery
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Master Your Mind.
            <br />
            <span className="text-primary">Transform Your Life.</span>
          </h1>

          <p className="font-body mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Evidence-based courses in cognitive psychology, emotional regulation, and personal
            discipline — designed specifically for the modern Indian man seeking depth over noise.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" className="font-body gap-2 text-base">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="#about"
              className="font-body text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Learn more about our approach
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
