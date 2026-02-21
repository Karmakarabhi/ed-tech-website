import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const preferredRegion = "bom1";

export async function POST() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
}
