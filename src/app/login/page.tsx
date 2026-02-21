"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams?.get("redirect") || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success("Welcome back!");

        // If a specific redirect was requested, honour it
        if (redirect !== "/") {
            router.push(redirect);
            router.refresh();
            return;
        }

        // Otherwise route by role: admins → /admin, others → /courses
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user!.id)
            .single();

        const destination = (profile as { role?: string } | null)?.role === "admin"
            ? "/admin"
            : "/courses";

        router.push(destination);
        router.refresh();
    };

    return (
        <div className="flex min-h-screen">
            {/* Left — Branding */}
            <div className="hidden w-1/2 flex-col justify-between bg-secondary p-12 lg:flex">
                <Link href="/" className="font-heading text-xl text-foreground">
                </Link>
                <div>
                    <h1 className="font-display text-5xl font-bold leading-tight text-foreground">
                        Master your mind.
                        <br />
                        Master your life.
                    </h1>
                    <p className="font-body mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                        Psychology-driven self-mastery courses built on evidence, not hype.
                    </p>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Gandhi University
                </p>
            </div>

            {/* Right — Form */}
            <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Link
                        href="/"
                        className="font-heading mb-8 block text-xl text-foreground lg:hidden"
                    >
                        Gandhi University
                    </Link>

                    <h2 className="font-heading text-3xl text-foreground">
                        Welcome back
                    </h2>
                    <p className="font-body mt-2 text-sm text-muted-foreground">
                        Sign in to continue your learning journey.
                    </p>

                    <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <Label className="font-body text-sm text-foreground">Email</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="font-body"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="font-body text-sm text-foreground">
                                    Password
                                </Label>
                                <button
                                    type="button"
                                    className="font-body text-xs text-primary hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="font-body pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="font-body w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="font-body mt-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-muted-foreground">Loading…</p></div>}>
            <LoginForm />
        </Suspense>
    );
}
