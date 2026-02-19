import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import SectionHeading from "@/components/SectionHeading";
import type { Course } from "@/types/database";

export const metadata: Metadata = {
    title: "Courses — Gandhi University",
    description:
        "Browse evidence-based psychology and self-mastery courses for Indian men. CBT, emotional intelligence, discipline, shadow work, Stoicism, and relationships.",
};

// Format paise to rupee string
function formatPrice(paise: number): string {
    return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default async function CoursesPage() {
    const supabase = await createClient();

    const { data: courses, error } = await supabase
        .from("courses")
        .select("*")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: true });

    // Fallback to empty array on error
    const courseList: Course[] = courses ?? [];

    return (
        <div className="min-h-screen bg-background pt-24">
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <SectionHeading
                        label="All Courses"
                        title="Evidence-based. Psychology-first."
                        description="Each course is built on peer-reviewed research, clinical frameworks, and practical application — not motivational noise."
                    />

                    {error && (
                        <p className="mt-8 text-center text-sm text-muted-foreground">
                            Could not load courses. Please try again later.
                        </p>
                    )}

                    {!error && courseList.length === 0 && (
                        <p className="mt-8 text-center text-sm text-muted-foreground">
                            No courses available yet. Check back soon.
                        </p>
                    )}

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courseList.map((course) => (
                            <CourseCard
                                key={course.id}
                                slug={course.slug}
                                title={course.title}
                                description={course.description ?? ""}
                                price={formatPrice(course.price)}
                                category={course.category ?? ""}
                                featured={course.featured}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
