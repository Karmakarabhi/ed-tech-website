import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function FieldSkeleton({ wide = false }: { wide?: boolean }) {
    return (
        <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className={`h-9 rounded-md ${wide ? "w-full" : "w-full"}`} />
        </div>
    );
}

export default function AdminSettingsLoading() {
    return (
        <div className="space-y-8">
            {/* Page title */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-56" />
            </div>

            {/* Hero settings card */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FieldSkeleton />
                        <FieldSkeleton />
                    </div>
                    {/* Textarea-height field */}
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-20 w-full rounded-md" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FieldSkeleton />
                        <FieldSkeleton />
                    </div>
                    <Skeleton className="h-9 w-28 rounded-md" />
                </CardContent>
            </Card>

            {/* CTA settings card */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-28" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <FieldSkeleton />
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-20 w-full rounded-md" />
                    </div>
                    <FieldSkeleton />
                    <Skeleton className="h-9 w-28 rounded-md" />
                </CardContent>
            </Card>

            {/* Stats card */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-16" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-32 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-9 w-28 rounded-md" />
                </CardContent>
            </Card>
        </div>
    );
}
