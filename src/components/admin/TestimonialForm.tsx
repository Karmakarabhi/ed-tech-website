"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
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
    const [imageUrl, setImageUrl] = useState<string | null>(testimonial?.image_url ?? null);
    const [imageUploading, setImageUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5 MB.");
            return;
        }

        setImageUploading(true);
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const path = `testimonials/${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
            .from("testimonials")
            .upload(path, file, { upsert: true });

        if (uploadError) {
            toast.error("Upload failed: " + uploadError.message);
            setImageUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("testimonials")
            .getPublicUrl(path);

        setImageUrl(publicUrl);
        toast.success("Image uploaded.");
        setImageUploading(false);
    }

    async function removeImage() {
        setImageUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

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
            image_url: imageUrl || null,
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
            {/* Image upload */}
            <div className="space-y-2">
                <Label>Student Photo</Label>
                <div className="flex items-start gap-4">
                    {/* Preview */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <ImageIcon className="h-7 w-7 text-muted-foreground/40" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={imageUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-2"
                        >
                            <Upload className="h-3.5 w-3.5" />
                            {imageUploading ? "Uploading..." : imageUrl ? "Replace" : "Upload Photo"}
                        </Button>
                        {imageUrl && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={removeImage}
                                className="gap-2 text-destructive hover:text-destructive"
                            >
                                <X className="h-3.5 w-3.5" />
                                Remove
                            </Button>
                        )}
                        <p className="text-xs text-muted-foreground">JPG, PNG or WebP · max 5 MB</p>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>

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
