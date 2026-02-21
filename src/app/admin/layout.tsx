import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, BookOpen, MessageSquare, Settings, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Profile } from "@/types/database";
import HeaderBar from "@/components/admin/HeaderBar";

const adminNav = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login?redirect=/admin");

    // Server-side admin role guard (defence in depth — middleware is first layer)
    const { data } = await supabase
        .from("profiles")
        .select("role, first_name, last_name")
        .eq("id", user.id)
        .single();

    const profile = data as Pick<Profile, "role" | "first_name" | "last_name"> | null;
    if (!profile || profile.role !== "admin") redirect("/");

    const displayName: string =
        [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
        user.email || "Admin";

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="hidden w-60 flex-col border-r border-border bg-secondary/50 md:flex">
                <div className="flex h-16 items-center px-6 border-b border-border">
                    <Link href="/admin" className="font-heading text-lg text-foreground">
                        GU Admin
                    </Link>
                </div>

                <nav className="flex-1 space-y-1 p-4">
                    {adminNav.map(({ label, href, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    ))}
                </nav>

                <Separator />
                <div className="p-4 space-y-3">
                    <p className="px-3 text-xs font-medium text-muted-foreground truncate">
                        {displayName}
                    </p>
                    <form action="/api/auth/signout" method="post">
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main */}
            <div className="flex flex-1 flex-col">
                {/* Header Bar */}
                <HeaderBar userName={displayName} />

                <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
