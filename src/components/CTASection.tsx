"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="container mx-auto px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl text-primary-foreground sm:text-4xl lg:text-5xl">
            The work begins when you decide
            <br />
            you're ready for depth.
          </h2>
          <p className="font-body mx-auto mt-6 max-w-xl text-base text-primary-foreground/80">
            Join thousands of men who chose understanding over suppression. Start your first
            course today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="font-body mt-10 gap-2 text-base"
          >
            Begin Your Journey
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
