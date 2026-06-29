"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { openQuestions } from "@/lib/content/log";

export type LogAnswersState = { success?: boolean; error?: string };

/**
 * Persist the owner's answers to the "5 questions to move forward".
 * Admin-only. Answers are keyed by question index in the log_answers table.
 */
export async function saveLogAnswersAction(_prev: LogAnswersState, formData: FormData): Promise<LogAnswersState> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "You're not signed in." };

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return { error: "Admins only." };

    const rows = openQuestions.questions.map((_, i) => ({
        idx: i,
        answer: String(formData.get(`answer_${i}`) ?? "").trim() || null,
        updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("log_answers").upsert(rows, { onConflict: "idx" });
    if (error) return { error: "Couldn't save your answers. Please try again." };

    revalidatePath("/log");
    return { success: true };
}
