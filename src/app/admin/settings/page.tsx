import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import SettingsClient from "@/components/admin/SettingsClient";
import type { Json, SiteSetting } from "@/types/database";

export const metadata: Metadata = {
    title: "Settings — Admin",
};

export default async function AdminSettingsPage() {
    const supabase = await createClient();

    const { data } = await supabase
        .from("site_settings")
        .select("key, value");

    // Convert to key→value map
    const settings: Record<string, Json> = {};
    for (const row of ((data as SiteSetting[] | null) ?? [])) {
        settings[row.key] = row.value;
    }

    return <SettingsClient settings={settings} />;
}
