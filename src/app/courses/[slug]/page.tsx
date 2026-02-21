import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, Globe, Tag } from "lucide-react";
import SyllabusAccordion from "@/components/SyllabusAccordion";
import type { ChapterWithLessons, Course } from "@/types/database";

// Revalidate course pages every hour
export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
}

function formatPrice(paise: number): string {
    return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: metaData } = await supabase
        .from("courses")
        .select("title, description")
        .eq("slug", slug)
        .eq("status", "published")
        .is("deleted_at", null)
        .maybeSingle();

    const courseMeta = metaData as Pick<Course, "title" | "description"> | null;
    if (!courseMeta) return { title: "Course Not Found — Gandhi University" };

    return {
        title: `${courseMeta.title} — Gandhi University`,
        description: courseMeta.description ?? undefined,
    };
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    // Fetch course
    const { data: rawCourse } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .is("deleted_at", null)
        .single();

    const course = rawCourse as Course | null;
    if (!course) notFound();

    // Fetch chapters with lessons
    const { data: rawChapters } = await supabase
        .from("chapters")
        .select("*, lessons(*)")
        .eq("course_id", course.id)
        .order("sort_order", { ascending: true });

    const chapters = rawChapters as ChapterWithLessons[] | null;
    const chapterList: ChapterWithLessons[] = (chapters ?? []).map((ch) => ({
        ...ch,
        lessons: [...(ch.lessons ?? [])].sort(
            (a, b) => a.sort_order - b.sort_order
        ),
    }));

    const totalLessons = chapterList.reduce((s, c) => s + c.lessons.length, 0);

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Hero / Header */}
            <section className="border-b border-border bg-secondary py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex max-w-3xl flex-col gap-4">
                        {course.category && (
                            <Badge variant="secondary" className="w-fit font-accent text-xs">
                                {course.category}
                            </Badge>
                        )}
                        {course.featured && (
                            <Badge className="w-fit font-accent text-xs">Featured</Badge>
                        )}
                        <h1 className="font-display text-4xl font-bold leading-tight text-foreground lg:text-5xl">
                            {course.title}
                        </h1>
                        <p className="font-body text-lg leading-relaxed text-muted-foreground">
                            {course.description}
                        </p>

                        {/* Meta */}
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {course.total_duration && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {course.total_duration}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <BookOpen className="h-4 w-4" />
                                {totalLessons} lessons
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Globe className="h-4 w-4" />
                                {course.accessibility}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-3 lg:px-8">
                    {/* Left — Course content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        {course.long_description && (
                            <div>
                                <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                                    About this course
                                </h2>
                                <Separator className="mb-6" />
                                <div className="font-body text-base leading-relaxed text-muted-foreground space-y-4">
                                    {(course.long_description as { blocks?: { text: string }[] })
                                        ?.blocks?.map((block, i) => (
                                            <p key={i}>{block.text}</p>
                                        )) ?? (
                                        <p>{course.description}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Syllabus */}
                        {chapterList.length > 0 && (
                            <div>
                                <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
                                    Course Syllabus
                                </h2>
                                <Separator className="mb-6" />
                                <SyllabusAccordion chapters={chapterList} />
                            </div>
                        )}
                    </div>

                    {/* Right — Enroll card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
                            {course.thumbnail_url && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={course.thumbnail_url}
                                    alt={course.title}
                                    className="w-full rounded-lg object-cover aspect-video"
                                />
                            )}

                            <div className="flex items-end gap-3">
                                <span className="font-accent text-3xl font-bold text-primary">
                                    {formatPrice(course.price)}
                                </span>
                                {course.original_price && (
                                    <span className="font-body text-lg text-muted-foreground line-through">
                                        {formatPrice(course.original_price)}
                                    </span>
                                )}
                                {course.discount && (
                                    <Badge variant="secondary" className="font-accent text-xs">
                                        <Tag className="mr-1 h-3 w-3" />
                                        {course.discount}
                                    </Badge>
                                )}
                            </div>

                            <Button size="lg" className="w-full font-accent text-base" asChild>
                                <Link href="/register">Enroll Now</Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full font-accent text-base"
                                asChild
                            >
                                <Link href="/login">Sign In to Access</Link>
                            </Button>

                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-primary/70" />
                                    {totalLessons} lessons across {chapterList.length} chapters
                                </li>
                                {course.total_duration && (
                                    <li className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary/70" />
                                        {course.total_duration} of content
                                    </li>
                                )}
                                <li className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-primary/70" />
                                    {course.accessibility} access
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
