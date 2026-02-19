"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Testimonial } from "@/types/database";

interface TestimonialFormProps {
    testimonial?: Testimonial;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function TestimonialForm({
    testimonial,
    onSuccess,
    onCancel,
}: TestimonialFormProps) {
    const isEdit = !!testimonial;
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState(testimonial?.quote ?? "");
    const [name, setName] = useState(testimonial?.name ?? "");
    const [context, setContext] = useState(testimonial?.context ?? "");
    const [visible, setVisible] = useState(testimonial?.visible ?? true);
    const [sortOrder, setSortOrder] = useState(
        String(testimonial?.sort_order ?? 0)
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!quote || !name) {
            toast.error("Quote and name are required.");
            return;
        }

        setLoading(true);
        const supabase = createClient();

        const payload = {
            quote,
            name,
            context: context || null,
            visible,
            sort_order: parseInt(sortOrder) || 0,
        };

        let error;
        if (isEdit && testimonial) {
            ({ error } = await supabase
                .from("testimonials")
                .update(payload)
                .eq("id", testimonial.id));
        } else {
            ({ error } = await supabase.from("testimonials").insert(payload));
        }

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success(isEdit ? "Testimonial updated!" : "Testimonial created!");
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="quote">Quote *</Label>
                <Textarea
                    id="quote"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="What did the student say..."
                    rows={3}
                    required
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Arjun Mehta"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="context">Context</Label>
                    <Input
                        id="context"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Software Engineer, Bangalore"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <Switch
                        id="visible"
                        checked={visible}
                        onCheckedChange={setVisible}
                    />
                    <Label htmlFor="visible">Visible</Label>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="sortOrder" className="text-xs">
                        Sort Order
                    </Label>
                    <Input
                        id="sortOrder"
                        type="number"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-20"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Testimonial"}
                </Button>
            </div>
        </form>
    );
}
