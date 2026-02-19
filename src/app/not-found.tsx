import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <p className="font-accent text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                404
            </p>
            <h1 className="font-display mt-4 text-5xl font-bold text-foreground lg:text-6xl">
                Page not found
            </h1>
            <p className="font-body mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <div className="mt-8 flex items-center gap-4">
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/courses">Browse Courses</Link>
                </Button>
            </div>
        </div>
    );
}
