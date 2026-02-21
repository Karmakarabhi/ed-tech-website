export const preferredRegion = "bom1";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import TestimonialsClient from "@/components/admin/TestimonialsClient";

export const metadata: Metadata = {
    title: "Testimonials — Admin",
};

export default async function AdminTestimonialsPage() {
    const supabase = await createClient();

    const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .is("deleted_at", null)
        .order("sort_order", { ascending: true });

    return <TestimonialsClient initial={testimonials ?? []} />;
}
