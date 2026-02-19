import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Eye } from "lucide-react";
import type { Course } from "@/types/database";

type CourseRow = Pick<Course, "id" | "slug" | "title" | "status" | "category" | "price" | "total_lessons" | "featured" | "created_at">;

function formatPrice(paise: number): string {
    return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default async function AdminCoursesPage() {
    const supabase = await createClient();

    const { data } = await supabase
        .from("courses")
        .select("id, slug, title, status, category, price, total_lessons, featured, created_at")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

    const courseList: CourseRow[] = (data as CourseRow[] | null) ?? [];

    const statusCounts = {
        published: courseList.filter((c) => c.status === "published").length,
        draft: courseList.filter((c) => c.status === "draft").length,
        archived: courseList.filter((c) => c.status === "archived").length,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-foreground">
                        Courses
                    </h1>
                    <p className="font-body mt-1 text-sm text-muted-foreground">
                        {courseList.length} total · {statusCounts.published} published ·{" "}
                        {statusCounts.draft} draft · {statusCounts.archived} archived
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/courses/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Course
                    </Link>
                </Button>
            </div>

            <Card>
                <div className="divide-y divide-border">
                    {courseList.length === 0 && (
                        <p className="p-8 text-center text-sm text-muted-foreground">
                            No courses yet. Create your first one!
                        </p>
                    )}
                    {courseList.map((course) => (
                        <div
                            key={course.id}
                            className="flex items-center justify-between px-6 py-4 gap-4"
                        >
                            <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-body text-sm font-semibold text-foreground truncate">
                                        {course.title}
                                    </p>
                                    {course.featured && (
                                        <Badge className="text-xs">Featured</Badge>
                                    )}
                                </div>
                                <p className="font-body text-xs text-muted-foreground">
                                    {course.category && `${course.category} · `}
                                    {course.total_lessons} lessons ·{" "}
                                    {formatPrice(course.price)}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <Badge
                                    variant={
                                        course.status === "published"
                                            ? "default"
                                            : course.status === "archived"
                                            ? "secondary"
                                            : "outline"
                                    }
                                    className="capitalize text-xs"
                                >
                                    {course.status}
                                </Badge>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link
                                        href={`/courses/${course.slug}`}
                                        target="_blank"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/admin/courses/${course.id}`}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
