"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import type { Course } from "@/types/database";

interface CourseFormProps {
    /** Existing course for edit mode; undefined for new */
    course?: Course;
}

function priceToDisplay(paise: number): string {
    return String(paise / 100);
}

function priceFromDisplay(rupees: string): number {
    const val = parseFloat(rupees.replace(/,/g, ""));
    return isNaN(val) ? 0 : Math.round(val * 100);
}

const CATEGORIES = [
    "CBT & Anxiety",
    "Emotional Mastery",
    "Personal Growth",
    "Depth Psychology",
    "Philosophy",
    "Relationships",
    "Mindfulness",
    "Leadership",
];

const STATUS_OPTIONS: Array<Course["status"]> = ["draft", "published", "archived"];

export default function CourseForm({ course }: CourseFormProps) {
    const router = useRouter();
    const isEdit = !!course;

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(course?.title ?? "");
    const [slug, setSlug] = useState(course?.slug ?? "");
    const [description, setDescription] = useState(course?.description ?? "");
    const [longDescription, setLongDescription] = useState(
        course?.long_description
            ? (course.long_description as { blocks?: { text: string }[] })?.blocks
                  ?.map((b) => b.text)
                  .join("\n\n") ?? ""
            : ""
    );
    const [price, setPrice] = useState(
        course ? priceToDisplay(course.price) : ""
    );
    const [originalPrice, setOriginalPrice] = useState(
        course?.original_price ? priceToDisplay(course.original_price) : ""
    );
    const [discount, setDiscount] = useState(course?.discount ?? "");
    const [category, setCategory] = useState(course?.category ?? "");
    const [featured, setFeatured] = useState(course?.featured ?? false);
    const [totalLessons, setTotalLessons] = useState(
        String(course?.total_lessons ?? 0)
    );
    const [totalDuration, setTotalDuration] = useState(
        course?.total_duration ?? ""
    );
    const [thumbnailUrl, setThumbnailUrl] = useState(
        course?.thumbnail_url ?? ""
    );
    const [status, setStatus] = useState<Course["status"]>(
        course?.status ?? "draft"
    );

    // Auto-generate slug from title (new course only)
    function handleTitleChange(value: string) {
        setTitle(value);
        if (!isEdit) {
            setSlug(
                value
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .trim()
                    .replace(/\s+/g, "-")
            );
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !slug || !price) {
            toast.error("Title, slug, and price are required.");
            return;
        }

        setLoading(true);
        const supabase = createClient();

        const longDescJson = longDescription.trim()
            ? {
                  blocks: longDescription
                      .split(/\n\n+/)
                      .map((t) => ({ type: "paragraph", text: t.trim() }))
                      .filter((b) => b.text),
              }
            : null;

        const payload = {
            title,
            slug,
            description: description || null,
            long_description: longDescJson,
            price: priceFromDisplay(price),
            original_price: originalPrice ? priceFromDisplay(originalPrice) : null,
            discount: discount || null,
            category: category || null,
            featured,
            total_lessons: parseInt(totalLessons) || 0,
            total_duration: totalDuration || null,
            thumbnail_url: thumbnailUrl || null,
            status,
        };

        let error;
        if (isEdit && course) {
            ({ error } = await supabase
                .from("courses")
                .update(payload)
                .eq("id", course.id));
        } else {
            ({ error } = await supabase.from("courses").insert(payload));
        }

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success(isEdit ? "Course updated!" : "Course created!");
        router.push("/admin/courses");
        router.refresh();
    }

    async function handleSoftDelete() {
        if (!course) return;
        if (!confirm(`Archive and soft-delete "${course.title}"? This hides it from public but keeps data.`)) return;

        const supabase = createClient();
        const { error } = await supabase
            .from("courses")
            .update({ deleted_at: new Date().toISOString(), status: "archived" })
            .eq("id", course.id);

        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Course deleted (soft).");
        router.push("/admin/courses");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Slug */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="The Anxiety Blueprint"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="the-anxiety-blueprint"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="One-line course summary shown on cards..."
                    rows={2}
                />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
                <Label htmlFor="longDescription">
                    Long Description{" "}
                    <span className="text-xs text-muted-foreground">(separate paragraphs with blank lines)</span>
                </Label>
                <Textarea
                    id="longDescription"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Detailed course description..."
                    rows={6}
                />
            </div>

            {/* Pricing */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="2999"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                        id="originalPrice"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="4999"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="discount">Discount Label</Label>
                    <Input
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="40% OFF"
                    />
                </div>
            </div>

            {/* Category, Lessons, Duration */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="totalLessons">Total Lessons</Label>
                    <Input
                        id="totalLessons"
                        type="number"
                        min={0}
                        value={totalLessons}
                        onChange={(e) => setTotalLessons(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="totalDuration">Total Duration</Label>
                    <Input
                        id="totalDuration"
                        value={totalDuration}
                        onChange={(e) => setTotalDuration(e.target.value)}
                        placeholder="8h 30m"
                    />
                </div>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                    id="thumbnailUrl"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                />
            </div>

            {/* Status & Featured */}
            <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as Course["status"])}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {STATUS_OPTIONS.map((s) => (
                                <SelectItem key={s} value={s} className="capitalize">
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-3 mt-6">
                    <Switch
                        id="featured"
                        checked={featured}
                        onCheckedChange={setFeatured}
                    />
                    <Label htmlFor="featured">Featured</Label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border pt-6">
                {isEdit ? (
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleSoftDelete}
                        disabled={loading}
                    >
                        Delete Course
                    </Button>
                ) : (
                    <span />
                )}
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/courses")}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? isEdit
                                ? "Saving..."
                                : "Creating..."
                            : isEdit
                            ? "Save Changes"
                            : "Create Course"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
