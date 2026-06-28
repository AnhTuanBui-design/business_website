import type { Metadata } from "next";
import { Button } from "@/components/base/buttons/button";
import { siteConfig } from "@/lib/content/site";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
    title: `Sign in — ${siteConfig.name}`,
    description: `Sign in to your ${siteConfig.name} account.`,
};

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-xl font-semibold text-primary">Welcome back</h1>
                <p className="text-sm text-tertiary">Sign in to your account to continue</p>
            </div>

            <LoginForm />

            <p className="text-center text-sm text-tertiary">
                {"Don't have an account? "}
                <Button href="/sign-up" color="link-color" size="sm">
                    Sign up
                </Button>
            </p>
        </div>
    );
}
