"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations/contact";

export type ContactState = {
    error?: string;
    fieldErrors?: Record<string, string[]>;
    success?: boolean;
};

/** Public contact form → inserts a row into `leads` (anon insert allowed by RLS). */
export async function submitContactAction(_prev: ContactState, formData: FormData): Promise<ContactState> {
    const raw = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("company") ?? ""),
        message: String(formData.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        message: parsed.data.message,
        source: "contact-form",
    });

    if (error) {
        return { error: "Something went wrong sending your message. Please try again, or email us directly." };
    }

    return { success: true };
}
