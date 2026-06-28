import type { Metadata } from "next";
import { Button } from "@/components/base/buttons/button";
import { siteConfig } from "@/lib/content/site";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
    title: `Create account — ${siteConfig.name}`,
    description: `Create a ${siteConfig.name} account and start owning your direct bookings.`,
};

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-xl font-semibold text-primary">Create an account</h1>
                <p className="text-sm text-tertiary">Get started with {siteConfig.shortName} today</p>
            </div>

            <SignUpForm />

            <p className="text-center text-sm text-tertiary">
                Already have an account?{" "}
                <Button href="/login" color="link-color" size="sm">
                    Sign in
                </Button>
            </p>
        </div>
    );
}
