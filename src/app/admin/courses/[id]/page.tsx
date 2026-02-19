import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CourseForm from "@/components/admin/CourseForm";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/database";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const supabase = await createClient();
    const { data } = await supabase
        .from("courses")
        .select("title")
        .eq("id", id)
        .maybeSingle();
    return { title: `Edit: ${(data as { title?: string } | null)?.title ?? "Course"} — Admin` };
}

export default async function EditCoursePage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

    const course = data as Course | null;
    if (!course) notFound();

    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-foreground">
                        Edit Course
                    </h1>
                    <p className="font-body mt-1 text-sm text-muted-foreground">
                        {course.title}
                    </p>
                </div>
                <Badge
                    variant={
                        course.status === "published"
                            ? "default"
                            : course.status === "archived"
                            ? "secondary"
                            : "outline"
                    }
                    className="capitalize mt-1"
                >
                    {course.status}
                </Badge>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
                <CourseForm course={course} />
            </div>
        </div>
    );
}
