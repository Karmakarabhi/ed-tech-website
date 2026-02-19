import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { motion } from "framer-motion";
import { allCourses } from "@/data/courses";

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
                <CourseCard
                  key={course.slug}
                  slug={course.slug}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  category={course.category}
                  featured={course.featured}
                />
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
