import CourseForm from "@/components/admin/CourseForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Course — Admin",
};

export default function NewCoursePage() {
    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">
                    New Course
                </h1>
                <p className="font-body mt-1 text-sm text-muted-foreground">
                    Create a new course. Set to &quot;draft&quot; until ready to publish.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
                <CourseForm />
            </div>
        </div>
    );
}
