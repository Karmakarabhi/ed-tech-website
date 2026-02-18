import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  context: string;
}

const TestimonialCard = ({ quote, name, context }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <p className="font-body text-base leading-relaxed text-card-foreground">
        "{quote}"
      </p>
      <div className="mt-5 border-t border-border pt-4">
        <p className="font-body text-sm font-semibold text-card-foreground">{name}</p>
        <p className="font-accent text-xs text-muted-foreground">{context}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
