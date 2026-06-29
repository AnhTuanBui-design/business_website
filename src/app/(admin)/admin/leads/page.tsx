import type { Metadata } from "next";
import { Inbox01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Leads — Admin · BookDirect Studio",
};

interface Lead {
    id: string;
    name: string;
    email: string;
    company: string | null;
    message: string;
    source: string | null;
    created_at: string;
}

export default async function AdminLeadsPage() {
    const supabase = await createClient();
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    const leads = (data ?? []) as Lead[];

    return (
        <div className="mx-auto max-w-5xl">
            <header className="flex flex-col gap-1">
                <h1 className="text-display-xs font-semibold tracking-tight text-primary">Leads</h1>
                <p className="text-md text-tertiary">Contact form submissions, newest first.</p>
            </header>

            {leads.length === 0 ? (
                <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-secondary bg-secondary p-12 text-center">
                    <FeaturedIcon icon={Inbox01} color="brand" theme="light" size="lg" />
                    <h2 className="text-lg font-semibold text-primary">No leads yet</h2>
                    <p className="max-w-sm text-md text-tertiary">When someone submits the contact form, their enquiry will show up here.</p>
                </div>
            ) : (
                <ul className="mt-8 flex flex-col gap-4">
                    {leads.map((lead) => (
                        <li key={lead.id} className="rounded-2xl border border-secondary bg-primary p-5">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <div className="font-semibold text-primary">{lead.name}</div>
                                    <a href={`mailto:${lead.email}`} className="text-sm text-brand-secondary hover:text-brand-secondary_hover">
                                        {lead.email}
                                    </a>
                                    {lead.company && <span className="text-sm text-tertiary"> · {lead.company}</span>}
                                </div>
                                <time className="text-xs text-quaternary">
                                    {new Date(lead.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                                </time>
                            </div>
                            <p className="mt-3 text-md whitespace-pre-line text-secondary">{lead.message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
