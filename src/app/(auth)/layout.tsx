import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-secondary px-4 py-12">
            <div className="flex w-full max-w-sm flex-col gap-8">
                <div className="flex justify-center">
                    <Link href="/" aria-label="Back to home">
                        <Logo />
                    </Link>
                </div>
                <div className="rounded-2xl bg-primary p-8 shadow-lg ring-1 ring-secondary">
                    {children}
                </div>
            </div>
        </div>
    );
}
