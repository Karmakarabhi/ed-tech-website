import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import StatBlock from "@/components/StatBlock";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import AnimatedTestimonials from "@/components/AnimatedTestimonials";
import CTASection from "@/components/CTASection";
import UpcomingSection from "@/components/UpcomingSection";
import MeetYourCoach from "@/components/MeetYourCoach";
import StrengthAssessment from "@/components/StrengthAssessment";
import NotForYou from "@/components/NotForYou";
import GandhiMethod from "@/components/GandhiMethod";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import { createClient } from "@/lib/supabase/server";
import type { Course, Testimonial } from "@/types/database";

// Revalidate ISR cache every hour
export const revalidate = 3600;

function formatPrice(paise: number): string {
    return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

// Fallback data used when Supabase is unavailable (no env vars yet)
const fallbackCourses = [
    {
        slug: "the-anxiety-blueprint",
        title: "Foundation Protocol: Anxiety & Stability",
        description: "A 6-week clinical protocol targeting the cognitive and neurological roots of anxiety — panic, overthinking, and avoidance — using CBT frameworks, exposure hierarchies, and systemic journaling.",
        price: "₹2,999",
        category: "Foundation Protocol",
        featured: true,
    },
    {
        slug: "emotional-intelligence-for-men",
        title: "Authority Protocol: Confidence & Presence",
        description: "A structured program for developing grounded confidence, assertive communication, and social authority — built on identity psychology, not rehearsed performance.",
        price: "₹1,999",
        category: "Authority Protocol",
        featured: false,
    },
    {
        slug: "discipline-and-identity",
        title: "Discipline Protocol: Behavior & Control",
        description: "A behavioral architecture program that converts psychological insight into sustained systems — identity-based habit design, friction mapping, and accountability protocols.",
        price: "₹2,499",
        category: "Discipline Protocol",
        featured: false,
    },
];

const fallbackTestimonials = [
    {
        quote: "Before: panic attacks three times a week, couldn't sit through a meeting without spiraling. I completed the Foundation Protocol in 6 weeks. After: I've gone 4 months without a full episode and I can now name my triggers before they compound. The CBT module in week 3 was the turning point.",
        name: "Arjun Mehta",
        context: "Software Engineer, Bangalore — Foundation Protocol",
        image: "/assets/student1.webp",
    },
    {
        quote: "Before: I buried everything in 70-hour work weeks. I couldn't have an honest conversation without shutting down. I went through the Authority Protocol. After: I now lead a 25-person team, handle conflict without going cold, and had the first real argument with my father that actually resolved something.",
        name: "Karan Patel",
        context: "Product Director, Delhi — Authority Protocol",
        image: "/assets/student4.webp",
    },
    {
        quote: "Before: started and quit 11 habit stacks in two years. Always blamed motivation. Completed the Discipline Protocol. After: 9 months of consistent training, down 14 kg and kept it off. The identity-mapping exercise in week 2 changed the entire frame — I stopped trying to build habits and started building a person.",
        name: "Siddharth Nair",
        context: "Entrepreneur, Chennai — Discipline Protocol",
        image: "/assets/student5.webp",
    },
    {
        quote: "Before: emotionally intelligent in theory, reactive in practice. I'd read 30 books and changed nothing. Three weeks into the Foundation Protocol, I had frameworks I could use in real time — not after the fact. After: I stopped medicating outcomes and started addressing causes.",
        name: "Vikram Rao",
        context: "Physician, Mumbai — Foundation Protocol",
        image: "/assets/student3.webp",
    },
    {
        quote: "Before: couldn't speak in rooms where I felt judged. The Authority Protocol was the first thing I'd encountered that treated confidence as a structural problem, not an attitude problem. After: I closed the biggest deal of my career six weeks post-completion. Still using the presence calibration protocol daily.",
        name: "Rohit Sharma",
        context: "Sales Director, Pune — Authority Protocol",
        image: "/assets/student2.webp",
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
                .select("quote, name, context, image_url")
                .eq("visible", true)
                .is("deleted_at", null)
                .order("sort_order", { ascending: true })
                .limit(6),
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
            testimonials = (dbTestimonials as Pick<Testimonial, "quote" | "name" | "context" | "image_url">[]).map((t, i) => ({
                quote: t.quote,
                name: t.name,
                context: t.context ?? "",
                // Use uploaded photo if available, otherwise fall back to placeholder
                image: t.image_url ?? `/assets/student${(i % 5) + 1}.webp`,
            }));
        }
    } catch {
        // Supabase not configured yet — use fallback data silently
    }
    return (
        <>
            <Hero />

            <ProblemStatement />

            <MeetYourCoach />

            <StatBlock />

            <GandhiMethod />

            <StrengthAssessment />

            {/* Training Protocols */}
            <section id="courses" className="bg-secondary py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <SectionHeading
                        label="Training Protocols"
                        title="Clinical programs. Not courses."
                        description="Each protocol targets a specific psychological root — using peer-reviewed CBT frameworks, behavioral architecture, and structured application phases."
                    />
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.title} {...course} />
                        ))}
                    </div>
                </div>
            </section>

            <WhoThisIsFor />

            <NotForYou />

            {/* Outcome Proof */}
            <section id="testimonials" className="bg-secondary py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <SectionHeading
                        label="Outcome Records"
                        title="Before. Process. After."
                        description="Specific outcomes from men who completed the protocols — not emotional praise, measurable change."
                    />
                    <div className="mt-12">
                        <AnimatedTestimonials testimonials={testimonials} />
                    </div>
                </div>
            </section>

            <UpcomingSection />

            <CTASection />
        </>
    );
}
