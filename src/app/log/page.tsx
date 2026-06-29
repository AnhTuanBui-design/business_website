import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Build Log — BookDirect Studio",
    robots: { index: false, follow: false },
};

/**
 * Internal build log, rendered from LOG.md. Admin-only — it contains
 * operational notes that shouldn't be public.
 */
export default async function LogPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") redirect("/");

    let content: string;
    try {
        content = await readFile(path.join(process.cwd(), "LOG.md"), "utf8");
    } catch {
        content = "LOG.md could not be loaded.";
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
            <div className="flex items-center justify-between gap-4">
                <Link href="/admin" aria-label="Admin home">
                    <Logo />
                </Link>
                <Link href="/admin" className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                    ← Admin
                </Link>
            </div>

            <h1 className="mt-8 text-display-xs font-semibold tracking-tight text-primary">Build log</h1>
            <p className="mt-1 text-sm text-tertiary">Rendered from LOG.md · admin only.</p>

            <article className="mt-6 overflow-hidden rounded-2xl border border-secondary bg-secondary">
                <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-secondary md:p-8">
                    {content}
                </pre>
            </article>
        </div>
    );
}
