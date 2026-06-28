import type { Metadata } from "next";
import { siteConfig } from "@/lib/content/site";
import { UpdatePasswordForm } from "./update-password-form";

export const metadata: Metadata = {
    title: `Update password — ${siteConfig.name}`,
    description: "Set a new password for your account.",
};

export default function UpdatePasswordPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-xl font-semibold text-primary">Update your password</h1>
                <p className="text-sm text-tertiary">Choose a new password for your account.</p>
            </div>

            <UpdatePasswordForm />
        </div>
    );
}
