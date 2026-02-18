import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import { motion } from "framer-motion";

const allCourses = [
  {
    title: "The Anxiety Blueprint",
    description:
      "A 6-week deep dive into understanding, managing, and reframing anxiety using CBT frameworks and journaling protocols.",
    price: "₹2,999",
    category: "CBT & Anxiety",
    featured: true,
  },
  {
    title: "Emotional Intelligence for Men",
    description:
      "Learn to identify, process, and articulate emotions without suppression. Practical frameworks for daily life.",
    price: "₹1,999",
    category: "Emotional Mastery",
  },
  {
    title: "Discipline & Identity",
    description:
      "Build lasting habits rooted in self-understanding rather than willpower. A psychology-first approach to discipline.",
    price: "₹2,499",
    category: "Personal Growth",
  },
  {
    title: "Shadow Work Fundamentals",
    description:
      "Explore Jungian shadow work concepts to confront hidden patterns, heal inner conflicts, and integrate your full personality.",
    price: "₹3,499",
    category: "Depth Psychology",
  },
  {
    title: "Stoic Resilience",
    description:
      "Ancient Stoic philosophy meets modern psychology. Build mental toughness through practical daily exercises.",
    price: "₹1,499",
    category: "Philosophy",
  },
  {
    title: "Relationships & Attachment Styles",
    description:
      "Understand your attachment patterns and build healthier, more conscious relationships using research-backed frameworks.",
    price: "₹2,999",
    category: "Relationships",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Header */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-accent mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                All Courses
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Courses built on science,<br className="hidden sm:block" /> not motivation.
              </h1>
              <p className="font-body mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Each program is designed with peer-reviewed research, clinical frameworks, and practical application at its core.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allCourses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
