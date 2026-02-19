"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1M+", label: "YouTube Subscribers" },
  { value: "50K+", label: "Students Enrolled" },
  { value: "12+", label: "Courses Published" },
  { value: "CBT", label: "Certified Practitioner" },
];

const StatBlock = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="font-accent text-4xl font-bold text-primary sm:text-5xl">
                {stat.value}
              </p>
              <p className="font-body mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBlock;
