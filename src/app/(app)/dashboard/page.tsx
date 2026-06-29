import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `Dashboard — ${siteConfig.name}`,
};

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data: profile } = user ? await supabase.from("profiles").select("full_name, role").eq("id", user.id).single() : { data: null };

    const firstName = profile?.full_name?.split(" ")[0];

    return (
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
            <h1 className="text-display-xs font-semibold tracking-tight text-primary">
                Welcome{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-2 text-md text-tertiary">
                Your account dashboard is coming soon. For now you can manage your password or head back to the site.
            </p>

            {profile?.role === "admin" && (
                <p className="mt-4 text-md text-tertiary">
                    You're an admin —{" "}
                    <Link href="/admin" className="font-semibold text-brand-secondary hover:text-brand-secondary_hover">
                        go to the admin dashboard
                    </Link>
                    .
                </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/update-password" color="secondary" size="lg">
                    Change password
                </Button>
                <form method="post" action="/auth/signout">
                    <Button type="submit" color="primary" size="lg">
                        Sign out
                    </Button>
                </form>
            </div>
        </div>
    );
}
