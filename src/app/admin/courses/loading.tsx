import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function AdminCoursesLoading() {
    return (
        <div className="space-y-6">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-9 w-32 rounded-md" />
            </div>

            {/* Course rows */}
            <Card>
                <div className="divide-y divide-border">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-6 py-4 gap-4"
                        >
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="h-3 w-36" />
                            </div>
                            <div className="flex shrink-0 items-center gap-3">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
