import { createClient } from "@/lib/supabase/server";
import { BookOpen, Users, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course, Payment } from "@/types/database";

function formatPrice(paise: number): string {
    return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch all stats in parallel
    const [
        { count: totalCourses },
        { count: totalStudents },
        { count: totalEnrollments },
        { data: revenueData },
        { data: recentCourses },
    ] = await Promise.all([
        supabase
            .from("courses")
            .select("*", { count: "exact", head: true })
            .is("deleted_at", null),
        supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .eq("role", "student")
            .is("deleted_at", null),
        supabase
            .from("enrollments")
            .select("*", { count: "exact", head: true }),
        supabase
            .from("payments")
            .select("amount")
            .eq("status", "completed"),
        supabase
            .from("courses")
            .select("id, title, status, price, total_lessons, created_at")
            .is("deleted_at", null)
            .order("created_at", { ascending: false })
            .limit(5),
    ]);

    const totalRevenue = ((revenueData as Pick<Payment, "amount">[] | null) ?? []).reduce(
        (sum: number, p: Pick<Payment, "amount">) => sum + (p.amount ?? 0),
        0
    );

    type RecentCourse = Pick<Course, "id" | "title" | "status" | "price" | "total_lessons" | "created_at">;
    const recentList: RecentCourse[] = (recentCourses as RecentCourse[] | null) ?? [];

    const stats = [
        {
            label: "Total Courses",
            value: String(totalCourses ?? 0),
            icon: BookOpen,
            href: "/admin/courses",
        },
        {
            label: "Students",
            value: String(totalStudents ?? 0),
            icon: Users,
            href: null,
        },
        {
            label: "Enrollments",
            value: String(totalEnrollments ?? 0),
            icon: TrendingUp,
            href: null,
        },
        {
            label: "Revenue",
            value: formatPrice(totalRevenue),
            icon: DollarSign,
            href: null,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">
                    Dashboard
                </h1>
                <p className="font-body mt-1 text-sm text-muted-foreground">
                    Overview of Gandhi University platform
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ label, value, icon: Icon, href }) => {
                    const card = (
                        <Card key={label} className="hover:shadow-sm transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="font-body text-sm font-medium text-muted-foreground">
                                    {label}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <p className="font-accent text-2xl font-bold text-foreground">
                                    {value}
                                </p>
                            </CardContent>
                        </Card>
                    );
                    return href ? (
                        <Link key={label} href={href}>
                            {card}
                        </Link>
                    ) : (
                        card
                    );
                })}
            </div>

            {/* Recent Courses */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                        Recent Courses
                    </h2>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/courses">View All</Link>
                    </Button>
                </div>

                <Card>
                    <div className="divide-y divide-border">
                        {recentList.length === 0 && (
                            <p className="p-6 text-center text-sm text-muted-foreground">
                                No courses yet.{" "}
                                <Link
                                    href="/admin/courses/new"
                                    className="text-primary hover:underline"
                                >
                                    Create one
                                </Link>
                            </p>
                        )}
                        {recentList.map((course) => (
                            <div
                                key={course.id}
                                className="flex items-center justify-between px-6 py-4"
                            >
                                <div className="space-y-0.5">
                                    <Link
                                        href={`/admin/courses/${course.id}`}
                                        className="font-body text-sm font-medium text-foreground hover:underline"
                                    >
                                        {course.title}
                                    </Link>
                                    <p className="font-body text-xs text-muted-foreground">
                                        {course.total_lessons} lessons ·{" "}
                                        {formatPrice(course.price)}
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
                                    className="capitalize text-xs"
                                >
                                    {course.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <Link href="/admin/courses/new">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-body text-sm">New Course</span>
                    </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <Link href="/admin/testimonials">
                        <Users className="h-5 w-5" />
                        <span className="font-body text-sm">Testimonials</span>
                    </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                    <Link href="/admin/settings">
                        <TrendingUp className="h-5 w-5" />
                        <span className="font-body text-sm">Site Settings</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
