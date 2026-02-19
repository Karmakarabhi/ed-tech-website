import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, PlayCircle, FileText, HelpCircle, Dumbbell, Clock, BookOpen, Monitor, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCourseBySlug, type Lesson } from "@/data/courses";

const lessonIcon = (type: Lesson["type"]) => {
    switch (type) {
        case "video":
            return <PlayCircle className="h-4 w-4 text-primary" />;
        case "pdf":
            return <FileText className="h-4 w-4 text-orange-500" />;
        case "quiz":
            return <HelpCircle className="h-4 w-4 text-violet-500" />;
        case "exercise":
            return <Dumbbell className="h-4 w-4 text-emerald-500" />;
    }
};

const lessonLabel = (type: Lesson["type"]) => {
    switch (type) {
        case "video":
            return "Video";
        case "pdf":
            return "PDF";
        case "quiz":
            return "Quiz";
        case "exercise":
            return "Exercise";
    }
};

const CourseDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const course = getCourseBySlug(slug || "");
    const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({ 0: true });

    if (!course) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="flex items-center justify-center pt-32 pb-20">
                    <div className="text-center">
                        <h1 className="font-heading text-3xl text-foreground">Course Not Found</h1>
                        <p className="font-body mt-3 text-muted-foreground">
                            The course you're looking for doesn't exist.
                        </p>
                        <Link to="/courses">
                            <Button className="mt-6">Browse All Courses</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const toggleChapter = (index: number) => {
        setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-16">
                {/* Breadcrumb */}
                <div className="border-b border-border bg-secondary/50">
                    <div className="container mx-auto px-6 py-3 lg:px-8">
                        <nav className="font-body flex items-center gap-2 text-sm text-muted-foreground">
                            <Link to="/" className="text-primary hover:underline">Home</Link>
                            <ChevronRight className="h-3 w-3" />
                            <Link to="/courses" className="text-primary hover:underline">Courses</Link>
                            <ChevronRight className="h-3 w-3" />
                            <span className="uppercase text-xs tracking-wider">{course.category}</span>
                        </nav>
                    </div>
                </div>

                {/* Header */}
                <section className="bg-secondary py-12 lg:py-16">
                    <div className="container mx-auto px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl"
                        >
                            <Badge variant="secondary" className="font-accent mb-4 text-xs font-medium">
                                {course.category}
                            </Badge>
                            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                                {course.title}
                            </h1>
                            <p className="font-body mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
                                {course.longDescription}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Body: Syllabus + Sidebar */}
                <section className="py-12 lg:py-20">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
                            {/* Left: Syllabus */}
                            <div>
                                <h2 className="font-heading text-2xl font-bold text-foreground">Syllabus</h2>
                                <p className="font-body mt-1 text-sm text-muted-foreground">
                                    {course.syllabus.length} chapters &middot; {course.totalLessons} lessons
                                </p>

                                <div className="mt-8 space-y-3">
                                    {course.syllabus.map((chapter, idx) => {
                                        const isOpen = openChapters[idx] || false;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 12 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-40px" }}
                                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                                                className="rounded-lg border border-border bg-card overflow-hidden"
                                            >
                                                {/* Chapter header */}
                                                <button
                                                    onClick={() => toggleChapter(idx)}
                                                    className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-secondary/50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-accent flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                                                            {String(idx + 1).padStart(2, "0")}
                                                        </span>
                                                        <div>
                                                            <h3 className="font-heading text-sm font-semibold text-foreground sm:text-base">
                                                                {chapter.title}
                                                            </h3>
                                                            <p className="font-body text-xs text-muted-foreground">
                                                                {chapter.lessons.length} {chapter.lessons.length === 1 ? "lesson" : "lessons"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ChevronDown
                                                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>

                                                {/* Lessons */}
                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="border-t border-border">
                                                                {chapter.lessons.map((lesson, lIdx) => (
                                                                    <div
                                                                        key={lIdx}
                                                                        className="flex items-center gap-3 border-b border-border/50 px-5 py-3 last:border-b-0 hover:bg-secondary/30 transition-colors"
                                                                    >
                                                                        {lessonIcon(lesson.type)}
                                                                        <div className="flex-1">
                                                                            <p className="font-body text-sm text-foreground">{lesson.title}</p>
                                                                            <p className="font-body text-xs text-muted-foreground">
                                                                                {lessonLabel(lesson.type)}
                                                                                {lesson.duration && ` · ${lesson.duration}`}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right: Sidebar */}
                            <div className="order-first lg:order-last">
                                <div className="lg:sticky lg:top-24">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
                                    >
                                        {/* Thumbnail */}
                                        <div className="aspect-video w-full overflow-hidden">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="p-5">
                                            {/* Pricing */}
                                            <div className="flex items-baseline gap-3">
                                                <span className="font-accent text-3xl font-bold text-foreground">{course.price}</span>
                                                <span className="font-body text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                                                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 font-accent text-xs font-semibold">
                                                    {course.discount}
                                                </Badge>
                                            </div>

                                            <p className="font-body mt-1 text-xs text-muted-foreground">
                                                <Tag className="mr-1 inline h-3 w-3" />
                                                No Coupons Available
                                            </p>

                                            {/* Validity */}
                                            <p className="font-body mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                                                <span className="text-base">∞</span> Lifetime Validity
                                            </p>

                                            {/* CTA */}
                                            <Button className="mt-5 w-full font-body text-base py-5 h-auto">
                                                BUY NOW
                                            </Button>

                                            {/* What's Included */}
                                            <div className="mt-6 border-t border-border pt-5">
                                                <h4 className="font-heading text-sm font-semibold text-foreground">What's Included</h4>
                                                <ul className="mt-3 space-y-2.5">
                                                    <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                                                        <BookOpen className="h-4 w-4 text-primary" />
                                                        {course.totalLessons} lessons
                                                    </li>
                                                    <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                                                        <Clock className="h-4 w-4 text-primary" />
                                                        {course.totalDuration} of content
                                                    </li>
                                                    <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                                                        <Monitor className="h-4 w-4 text-primary" />
                                                        <span>
                                                            <span className="rounded border border-border px-1.5 py-0.5 text-xs font-medium text-foreground">{course.accessibility}</span>
                                                            {" "}Accessibility
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CourseDetail;
