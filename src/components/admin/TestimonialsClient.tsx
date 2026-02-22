"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";
import type { Testimonial } from "@/types/database";

interface TestimonialsClientProps {
    initial: Testimonial[];
}

export default function TestimonialsClient({ initial }: TestimonialsClientProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initial);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showNew, setShowNew] = useState(false);

    async function refresh() {
        const supabase = createClient();
        const { data } = await supabase
            .from("testimonials")
            .select("*")
            .is("deleted_at", null)
            .order("sort_order", { ascending: true });
        setTestimonials(data ?? []);
    }

    async function toggleVisible(t: Testimonial) {
        const supabase = createClient();
        const { error } = await supabase
            .from("testimonials")
            .update({ visible: !t.visible })
            .eq("id", t.id);
        if (error) toast.error(error.message);
        else {
            toast.success(t.visible ? "Hidden" : "Made visible");
            await refresh();
        }
    }

    async function softDelete(t: Testimonial) {
        if (!confirm(`Delete testimonial by "${t.name}"?`)) return;
        const supabase = createClient();
        const { error } = await supabase
            .from("testimonials")
            .update({ deleted_at: new Date().toISOString() })
            .eq("id", t.id);
        if (error) toast.error(error.message);
        else {
            toast.success("Testimonial deleted.");
            await refresh();
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-foreground">
                        Testimonials
                    </h1>
                    <p className="font-body mt-1 text-sm text-muted-foreground">
                        {testimonials.length} total ·{" "}
                        {testimonials.filter((t) => t.visible).length} visible
                    </p>
                </div>
                <Button onClick={() => { setShowNew(true); setEditingId(null); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Testimonial
                </Button>
            </div>

            {/* New form */}
            {showNew && (
                <Card className="p-6">
                    <h2 className="font-heading text-lg font-semibold mb-4">
                        New Testimonial
                    </h2>
                    <TestimonialForm
                        onSuccess={async () => { setShowNew(false); await refresh(); }}
                        onCancel={() => setShowNew(false)}
                    />
                </Card>
            )}

            {/* List */}
            <Card>
                <div className="divide-y divide-border">
                    {testimonials.length === 0 && (
                        <p className="p-8 text-center text-sm text-muted-foreground">
                            No testimonials yet.
                        </p>
                    )}
                    {testimonials.map((t) => (
                        <div key={t.id} className="px-6 py-4 space-y-3">
                            {editingId === t.id ? (
                                <div>
                                    <h3 className="font-heading text-sm font-semibold mb-3">
                                        Edit — {t.name}
                                    </h3>
                                    <TestimonialForm
                                        testimonial={t}
                                        onSuccess={async () => {
                                            setEditingId(null);
                                            await refresh();
                                        }}
                                        onCancel={() => setEditingId(null)}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        {/* Avatar thumbnail */}
                                        {t.image_url ? (
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
                                                <img
                                                    src={t.image_url}
                                                    alt={t.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-muted-foreground">
                                                {t.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="space-y-1 flex-1 min-w-0">
                                        <p className="font-body text-sm text-foreground italic">
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                        <p className="font-body text-xs text-muted-foreground">
                                            — {t.name}
                                            {t.context && `, ${t.context}`}
                                        </p>
                                        <div className="flex items-center gap-2 pt-1">
                                            <Badge
                                                variant={t.visible ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                {t.visible ? "Visible" : "Hidden"}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                Order: {t.sort_order}
                                            </span>
                                            {!t.image_url && (
                                                <span className="text-xs text-amber-500">No photo</span>
                                            )}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleVisible(t)}
                                            title={t.visible ? "Hide" : "Show"}
                                        >
                                            {t.visible ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setEditingId(t.id)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => softDelete(t)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
