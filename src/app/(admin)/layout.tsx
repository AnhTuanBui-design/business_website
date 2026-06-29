import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { createClient } from "@/lib/supabase/server";

/**
 * Admin area shell. Server-side role guard: must be logged in AND have
 * profiles.role = 'admin', otherwise redirect away.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from("profiles").select("role, full_name, email").eq("id", user.id).single();
    if (profile?.role !== "admin") redirect("/");

    return (
        <div className="flex min-h-dvh bg-primary">
            <AdminSidebar name={profile.full_name} email={profile.email} />
            <main className="flex-1 px-4 py-8 md:px-8 md:py-10">{children}</main>
        </div>
    );
}
