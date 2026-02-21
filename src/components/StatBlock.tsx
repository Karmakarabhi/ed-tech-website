"use client";

import { motion } from "framer-motion";
import { Youtube, Users, BookOpen, Award } from "lucide-react";

const stats = [
  { value: "1.4M+", label: "YouTube Subscribers", icon: Youtube },
  { value: "700K+", label: "Instagram Followers", icon: Users },
  { value: "50K+", label: "Students Enrolled", icon: BookOpen },
  { value: "CBT", label: "Certified Practitioner", icon: Award },
];

const StatBlock = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col items-center text-center ${
                  i < stats.length - 1 ? "lg:border-r lg:border-border" : ""
                }`}
              >
                <Icon className="mb-3 h-6 w-6 text-primary/70" />
                <p className="font-accent text-4xl font-bold text-primary sm:text-5xl">
                  {stat.value}
                </p>
                <p className="font-body mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatBlock;
