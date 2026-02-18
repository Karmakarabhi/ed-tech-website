import { motion } from "framer-motion";

const ProblemStatement = () => {
  return (
    <section id="about" className="bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Most men are taught to suppress,
            <br />
            never to understand.
          </h2>

          <div className="font-body mt-8 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
            <p>
              From childhood, Indian men are conditioned to bury emotions, avoid vulnerability, and
              equate silence with strength. The result? Anxiety masked as anger. Loneliness disguised
              as independence. A generation of men who are successful on paper but struggling within.
            </p>
            <p>
              Gandhi University exists because real strength isn't about suppression — it's about
              understanding. Our courses are grounded in cognitive behavioral therapy, emotional
              intelligence research, and practical philosophy — not motivational noise.
            </p>
            <p className="font-medium text-foreground">
              This is psychology that respects your intelligence. No shortcuts. No quick fixes. Just
              evidence-based transformation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
