import type { Metadata } from "next";
import { Section } from "@/components/sections/section";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `Privacy Policy — ${siteConfig.name}`,
    description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your information.`,
};

const LAST_UPDATED = "June 28, 2026";

export default function PrivacyPage() {
    return (
        <Section>
            <div className="mx-auto max-w-3xl">
                {/* Template notice */}
                <div className="mb-8 rounded-xl border border-secondary bg-secondary px-5 py-4 text-sm text-tertiary">
                    <strong className="text-secondary">Note:</strong> This is a starting template. It has not been
                    reviewed by a legal professional. Please have a qualified attorney review and customise it for
                    your jurisdiction and business before relying on it.
                </div>

                <div className="prose max-w-none">
                    <h1>Privacy Policy</h1>
                    <p className="text-sm text-tertiary">Last updated: {LAST_UPDATED}</p>

                    <p>
                        Welcome to {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are
                        committed to protecting your personal information and your right to privacy. This Privacy
                        Policy explains how we collect, use, disclose, and safeguard information when you visit our
                        website and use our services.
                    </p>

                    <p>
                        If you have questions or concerns, please contact us at{" "}
                        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
                    </p>

                    <h2>1. Information We Collect</h2>

                    <h3>Information you provide to us</h3>
                    <p>
                        We collect information you voluntarily provide when you contact us, request a quote, or
                        submit any form on our website. This may include:
                    </p>
                    <ul>
                        <li>Name and email address</li>
                        <li>Business or property name</li>
                        <li>Phone number (if provided)</li>
                        <li>Any other information you include in your message</li>
                    </ul>

                    <h3>Information collected automatically</h3>
                    <p>
                        When you visit our website, certain information may be collected automatically by our
                        hosting provider (Netlify) and analytics tools. This may include your IP address, browser
                        type, referring URLs, and pages visited. We use this data in aggregate to improve our site.
                    </p>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Respond to your enquiries and provide the services you request</li>
                        <li>Send you quotes, project updates, and relevant communications</li>
                        <li>Improve our website and services</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                    <p>
                        We do not sell, rent, or trade your personal information to third parties for their
                        marketing purposes.
                    </p>

                    <h2>3. Data Storage and Security</h2>
                    <p>
                        Contact form submissions are stored securely in our database, hosted on Supabase (a
                        managed PostgreSQL provider). Our website is hosted on Netlify. Both providers maintain
                        industry-standard security practices including encryption in transit (HTTPS) and at rest.
                    </p>
                    <p>
                        While we take reasonable measures to protect your data, no method of transmission or
                        storage is 100% secure. We cannot guarantee absolute security.
                    </p>

                    <h2>4. Cookies and Tracking</h2>
                    <p>
                        Our website may use cookies and similar tracking technologies for functionality and
                        analytics. You can control cookies through your browser settings. Disabling cookies may
                        affect some site functionality.
                    </p>

                    <h2>5. Third-Party Services</h2>
                    <p>
                        We use the following third-party services that may process data in connection with our
                        website:
                    </p>
                    <ul>
                        <li>
                            <strong>Netlify</strong> — website hosting and form handling
                        </li>
                        <li>
                            <strong>Supabase</strong> — secure database for contact submissions and accounts
                        </li>
                        <li>
                            <strong>Analytics providers</strong> — anonymous usage statistics to improve our site
                        </li>
                    </ul>
                    <p>
                        Each of these providers has their own privacy policy governing how they handle data.
                    </p>

                    <h2>6. Your Rights</h2>
                    <p>
                        Depending on your location, you may have certain rights regarding your personal data,
                        including the right to access, correct, or delete your information. To exercise any of
                        these rights, please contact us at{" "}
                        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
                    </p>

                    <h2>7. Children&apos;s Privacy</h2>
                    <p>
                        Our services are not directed to children under the age of 13. We do not knowingly collect
                        personal information from children. If you become aware that a child has provided us with
                        personal information, please contact us.
                    </p>

                    <h2>8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will post the updated policy on
                        this page with a revised &quot;Last updated&quot; date. Your continued use of our website
                        after any changes constitutes your acceptance of the new policy.
                    </p>

                    <h2>9. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us:
                    </p>
                    <ul>
                        <li>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                        </li>
                        <li>
                            <strong>Website:</strong>{" "}
                            <a href={siteConfig.url}>{siteConfig.url}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
}
