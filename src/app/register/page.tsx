"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success("Account created! Check your email to confirm.");
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen">
            {/* Left — Branding */}
            <div className="hidden w-1/2 flex-col justify-between bg-secondary p-12 lg:flex">
                <Link href="/" className="font-heading text-xl text-foreground">
                </Link>
                <div>
                    <h1 className="font-display text-5xl font-bold leading-tight text-foreground">
                        Begin the journey
                        <br />
                        toward self-mastery.
                    </h1>
                    <p className="font-body mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                        Join thousands of men learning to understand themselves through real
                        psychology.
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
                        Create your account
                    </h2>
                    <p className="font-body mt-2 text-sm text-muted-foreground">
                        Start learning with evidence-based courses.
                    </p>

                    <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-body text-sm text-foreground">
                                    First Name
                                </Label>
                                <Input
                                    placeholder="Arjun"
                                    className="font-body"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-body text-sm text-foreground">
                                    Last Name
                                </Label>
                                <Input
                                    placeholder="Mehta"
                                    className="font-body"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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
                            <Label className="font-body text-sm text-foreground">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="font-body pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
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
                            <p className="font-body text-xs text-muted-foreground">
                                Must be at least 8 characters.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="font-body w-full"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="font-body mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
