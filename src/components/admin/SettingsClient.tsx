"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Json } from "@/types/database";

interface SiteSettingsData {
    hero: {
        headline: string;
        subheadline: string;
        description: string;
        cta_primary: string;
        cta_secondary: string;
    };
    cta_section: {
        headline: string;
        description: string;
        button_text: string;
    };
    stats: Array<{ label: string; value: string }>;
}

interface SettingsClientProps {
    settings: Record<string, Json>;
}

export default function SettingsClient({ settings }: SettingsClientProps) {
    const heroRaw = (settings.hero ?? {}) as SiteSettingsData["hero"];
    const ctaRaw = (settings.cta_section ?? {}) as SiteSettingsData["cta_section"];
    const statsRaw = (settings.stats ?? []) as SiteSettingsData["stats"];

    // Hero section
    const [heroHeadline, setHeroHeadline] = useState(heroRaw.headline ?? "");
    const [heroSubheadline, setHeroSubheadline] = useState(heroRaw.subheadline ?? "");
    const [heroDescription, setHeroDescription] = useState(heroRaw.description ?? "");
    const [heroPrimary, setHeroPrimary] = useState(heroRaw.cta_primary ?? "");
    const [heroSecondary, setHeroSecondary] = useState(heroRaw.cta_secondary ?? "");

    // CTA section
    const [ctaHeadline, setCtaHeadline] = useState(ctaRaw.headline ?? "");
    const [ctaDescription, setCtaDescription] = useState(ctaRaw.description ?? "");
    const [ctaButton, setCtaButton] = useState(ctaRaw.button_text ?? "");

    // Stats (editable as JSON text for flexibility)
    const [statsJson, setStatsJson] = useState(
        JSON.stringify(statsRaw, null, 2)
    );

    const [savingHero, setSavingHero] = useState(false);
    const [savingCta, setSavingCta] = useState(false);
    const [savingStats, setSavingStats] = useState(false);

    async function saveSetting(key: string, value: Json) {
        const supabase = createClient();
        const { error } = await supabase
            .from("site_settings")
                        .upsert({ key, value, updated_at: new Date().toISOString() });
        if (error) throw error;
    }

    async function handleSaveHero(e: React.FormEvent) {
        e.preventDefault();
        setSavingHero(true);
        try {
            await saveSetting("hero", {
                headline: heroHeadline,
                subheadline: heroSubheadline,
                description: heroDescription,
                cta_primary: heroPrimary,
                cta_secondary: heroSecondary,
            });
            toast.success("Hero settings saved!");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setSavingHero(false);
        }
    }

    async function handleSaveCta(e: React.FormEvent) {
        e.preventDefault();
        setSavingCta(true);
        try {
            await saveSetting("cta_section", {
                headline: ctaHeadline,
                description: ctaDescription,
                button_text: ctaButton,
            });
            toast.success("CTA settings saved!");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setSavingCta(false);
        }
    }

    async function handleSaveStats(e: React.FormEvent) {
        e.preventDefault();
        setSavingStats(true);
        try {
            const parsed = JSON.parse(statsJson);
            await saveSetting("stats", parsed);
            toast.success("Stats saved!");
        } catch {
            toast.error("Invalid JSON. Please check the format.");
        } finally {
            setSavingStats(false);
        }
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">
                    Site Settings
                </h1>
                <p className="font-body mt-1 text-sm text-muted-foreground">
                    Edit homepage content stored in the CMS.
                </p>
            </div>

            {/* Hero */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-heading text-lg">Hero Section</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    <form onSubmit={handleSaveHero} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Headline</Label>
                                <Input
                                    value={heroHeadline}
                                    onChange={(e) => setHeroHeadline(e.target.value)}
                                    placeholder="Master Your Mind."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Subheadline</Label>
                                <Input
                                    value={heroSubheadline}
                                    onChange={(e) => setHeroSubheadline(e.target.value)}
                                    placeholder="Master Your Life."
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={heroDescription}
                                onChange={(e) => setHeroDescription(e.target.value)}
                                rows={2}
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Primary CTA</Label>
                                <Input
                                    value={heroPrimary}
                                    onChange={(e) => setHeroPrimary(e.target.value)}
                                    placeholder="Explore Courses"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary CTA</Label>
                                <Input
                                    value={heroSecondary}
                                    onChange={(e) => setHeroSecondary(e.target.value)}
                                    placeholder="Learn More"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={savingHero}>
                                {savingHero ? "Saving..." : "Save Hero"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* CTA Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-heading text-lg">CTA Section</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    <form onSubmit={handleSaveCta} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Headline</Label>
                            <Input
                                value={ctaHeadline}
                                onChange={(e) => setCtaHeadline(e.target.value)}
                                placeholder="Ready to transform your mind?"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={ctaDescription}
                                onChange={(e) => setCtaDescription(e.target.value)}
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input
                                value={ctaButton}
                                onChange={(e) => setCtaButton(e.target.value)}
                                placeholder="Start Learning Today"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={savingCta}>
                                {savingCta ? "Saving..." : "Save CTA"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Stats */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-heading text-lg">Stats Block</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    <form onSubmit={handleSaveStats} className="space-y-4">
                        <div className="space-y-2">
                            <Label>
                                Stats JSON{" "}
                                <span className="text-xs text-muted-foreground">
                                    (array of {`{ "label": "...", "value": "..." }`})
                                </span>
                            </Label>
                            <Textarea
                                value={statsJson}
                                onChange={(e) => setStatsJson(e.target.value)}
                                rows={8}
                                className="font-mono text-xs"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={savingStats}>
                                {savingStats ? "Saving..." : "Save Stats"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
