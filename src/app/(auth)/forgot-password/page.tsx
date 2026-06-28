import type { Metadata } from "next";
import { Button } from "@/components/base/buttons/button";
import { siteConfig } from "@/lib/content/site";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
    title: `Reset password — ${siteConfig.name}`,
    description: "Request a password reset link for your account.",
};

export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-xl font-semibold text-primary">Forgot your password?</h1>
                <p className="text-sm text-tertiary">
                    Enter your email and we'll send you a reset link.
                </p>
            </div>

            <ForgotPasswordForm />

            <p className="text-center text-sm text-tertiary">
                Remembered it?{" "}
                <Button href="/login" color="link-color" size="sm">
                    Back to sign in
                </Button>
            </p>
        </div>
    );
}
