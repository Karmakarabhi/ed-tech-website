import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import StatBlock from "@/components/StatBlock";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import UpcomingSection from "@/components/UpcomingSection";
import { createClient } from "@/lib/supabase/server";
import type { Course, Testimonial } from "@/types/database";

// Revalidate ISR cache every hour
export const revalidate = 3600;
export const preferredRegion = "bom1";

function formatPrice(paise: number): string {
    return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

// Fallback data used when Supabase is unavailable (no env vars yet)
const fallbackCourses = [
    {
        slug: "the-anxiety-blueprint",
        title: "The Anxiety Blueprint",
        description: "A 6-week deep dive into understanding, managing, and reframing anxiety using CBT frameworks and journaling protocols.",
        price: "₹2,999",
        category: "CBT & Anxiety",
        featured: true,
    },
    {
        slug: "emotional-intelligence-for-men",
        title: "Emotional Intelligence for Men",
        description: "Learn to identify, process, and articulate emotions without suppression. Practical frameworks for daily life.",
        price: "₹1,999",
        category: "Emotional Mastery",
        featured: false,
    },
    {
        slug: "discipline-and-identity",
        title: "Discipline & Identity",
        description: "Build lasting habits rooted in self-understanding rather than willpower. A psychology-first approach to discipline.",
        price: "₹2,499",
        category: "Personal Growth",
        featured: false,
    },
];

const fallbackTestimonials = [
    {
        quote: "This isn't motivation — it's education. I finally understood why I react the way I do, and how to change it.",
        name: "Arjun Mehta",
        context: "Software Engineer, Bangalore",
    },
    {
        quote: "The Anxiety Blueprint gave me tools I'll use for life. No fluff, no toxic positivity — just real psychology.",
        name: "Rohit Sharma",
        context: "MBA Student, Delhi",
    },
    {
        quote: "Gandhi University feels like the serious education in self-mastery that I wish existed when I was 20.",
        name: "Vikram Rao",
        context: "Doctor, Mumbai",
    },
];

export default async function HomePage() {
    // Fetch live data from Supabase (falls back to hardcoded if unavailable)
    let courses = fallbackCourses;
    let testimonials = fallbackTestimonials;

    try {
        const supabase = await createClient();

        const [{ data: dbCourses }, { data: dbTestimonials }] = await Promise.all([
            supabase
                .from("courses")
                .select("slug, title, description, price, category, featured")
                .eq("status", "published")
                .is("deleted_at", null)
                .order("featured", { ascending: false })
                .limit(3),
            supabase
                .from("testimonials")
                .select("quote, name, context")
                .eq("visible", true)
                .is("deleted_at", null)
                .order("sort_order", { ascending: true })
                .limit(3),
        ]);

        if (dbCourses && (dbCourses as unknown[]).length > 0) {
            courses = (dbCourses as Pick<Course, "slug" | "title" | "description" | "price" | "category" | "featured">[]).map((c) => ({
                slug: c.slug,
                title: c.title,
                description: c.description ?? "",
                price: formatPrice(c.price),
                category: c.category ?? "",
                featured: c.featured,
            }));
        }

        if (dbTestimonials && (dbTestimonials as unknown[]).length > 0) {
            testimonials = (dbTestimonials as Pick<Testimonial, "quote" | "name" | "context">[]).map((t) => ({
                quote: t.quote,
                name: t.name,
                context: t.context ?? "",
            }));
        }
    } catch {
        // Supabase not configured yet — use fallback data silently
    }
    return (
        <>
            <Hero />

            <ProblemStatement />

            <StatBlock />

            {/* Featured Courses */}
            <section id="courses" className="bg-secondary py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <SectionHeading
                        label="Courses"
                        title="Evidence-based. Psychology-first."
                        description="Each course is built on peer-reviewed research, clinical frameworks, and practical application — not motivational noise."
                    />
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.title} {...course} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <SectionHeading
                        label="Testimonials"
                        title="What our students say"
                        description="Real feedback from men who chose depth over quick fixes."
                    />
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((t) => (
                            <TestimonialCard key={t.name} {...t} />
                        ))}
                    </div>
                </div>
            </section>

            <UpcomingSection />

            <CTASection />
        </>
    );
}
