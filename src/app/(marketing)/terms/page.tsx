import type { Metadata } from "next";
import { Section } from "@/components/sections/section";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
    title: `Terms of Service — ${siteConfig.name}`,
    description: `Terms of Service for ${siteConfig.name}. Please read these terms carefully before engaging our services.`,
};

const LAST_UPDATED = "June 28, 2026";

export default function TermsPage() {
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
                    <h1>Terms of Service</h1>
                    <p className="text-sm text-tertiary">Last updated: {LAST_UPDATED}</p>

                    <p>
                        Please read these Terms of Service (&quot;Terms&quot;) carefully before engaging{" "}
                        {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) for any services.
                        By engaging our services or using this website, you agree to be bound by these Terms.
                    </p>

                    <h2>1. Services</h2>
                    <p>
                        {siteConfig.name} provides web design, development, and related digital services for
                        short-term rental hosts and property owners. The specific scope, deliverables, timeline,
                        and fees for any engagement will be agreed upon in a separate written proposal or contract
                        (&quot;Project Agreement&quot;). In the event of any conflict between these Terms and a
                        Project Agreement, the Project Agreement prevails.
                    </p>

                    <h2>2. Payments</h2>
                    <p>
                        Payment terms are specified in the Project Agreement. Unless otherwise agreed, a deposit
                        is required before project work commences, with the remaining balance due upon or before
                        project delivery. All fees are in the currency stated in the Project Agreement.
                    </p>
                    <p>
                        Late payments may be subject to interest or may result in work being paused until payment
                        is received, as detailed in the Project Agreement.
                    </p>

                    <h2>3. Intellectual Property</h2>

                    <h3>Your content</h3>
                    <p>
                        You retain full ownership of any content, images, text, and materials you provide to us
                        (&quot;Client Content&quot;). You grant us a limited licence to use Client Content solely
                        for the purpose of delivering the agreed services.
                    </p>
                    <p>
                        You represent and warrant that you own or have the necessary rights to all Client Content
                        you provide, and that it does not infringe the rights of any third party.
                    </p>

                    <h3>Deliverables</h3>
                    <p>
                        Upon receipt of full payment, we assign to you all intellectual property rights in the
                        final deliverables specific to your project (custom design, custom code). We retain the
                        right to use the work in our portfolio and for promotional purposes, unless otherwise
                        agreed in writing.
                    </p>
                    <p>
                        Third-party components, libraries, fonts, or stock assets incorporated into deliverables
                        remain subject to their respective licences. We will identify any such components in the
                        Project Agreement.
                    </p>

                    <h2>4. Client Responsibilities</h2>
                    <p>To ensure a smooth project, you agree to:</p>
                    <ul>
                        <li>Provide accurate information, content, and timely feedback as requested</li>
                        <li>Designate a single point of contact for approvals and decisions</li>
                        <li>Obtain any necessary permissions for third-party content you provide</li>
                        <li>Make payments in accordance with the agreed schedule</li>
                    </ul>

                    <h2>5. Revisions and Scope Changes</h2>
                    <p>
                        The number of revision rounds and what constitutes a revision is defined in the Project
                        Agreement. Requests that fall outside the agreed scope may be subject to additional fees,
                        which we will quote before proceeding.
                    </p>

                    <h2>6. Confidentiality</h2>
                    <p>
                        Both parties agree to keep confidential any proprietary or sensitive information shared
                        during the project and not to disclose it to third parties without prior written consent,
                        except as required by law.
                    </p>

                    <h2>7. Warranties and Disclaimers</h2>
                    <p>
                        We warrant that services will be performed in a professional and workmanlike manner. We do
                        not warrant that our deliverables will be error-free or that they will meet every
                        specific requirement not detailed in the Project Agreement.
                    </p>
                    <p>
                        The website and services are provided &quot;as is&quot; to the extent permitted by
                        applicable law. We disclaim all other warranties, express or implied, including
                        merchantability, fitness for a particular purpose, and non-infringement.
                    </p>

                    <h2>8. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, our total liability to you for any claim arising
                        out of or related to these Terms or any Project Agreement will not exceed the total fees
                        paid by you for the specific project giving rise to the claim.
                    </p>
                    <p>
                        In no event will we be liable for any indirect, incidental, special, consequential, or
                        punitive damages, including loss of revenue, loss of data, or loss of business, even if
                        we have been advised of the possibility of such damages.
                    </p>

                    <h2>9. Termination</h2>
                    <p>
                        Either party may terminate a project engagement by providing written notice as specified
                        in the Project Agreement. Upon termination, you will pay for all work completed up to the
                        date of termination. Termination provisions specific to each engagement are detailed in
                        the Project Agreement.
                    </p>

                    <h2>10. Governing Law</h2>
                    <p>
                        These Terms and any Project Agreement are governed by and construed in accordance with the
                        laws of the jurisdiction in which {siteConfig.name} operates, without regard to its conflict
                        of law provisions. Any disputes that cannot be resolved amicably will be subject to the
                        exclusive jurisdiction of the courts of that location.
                    </p>

                    <h2>11. Changes to These Terms</h2>
                    <p>
                        We may update these Terms from time to time. Updated Terms will be posted on this page
                        with a revised &quot;Last updated&quot; date. Continued use of our website or services
                        after changes constitutes acceptance of the new Terms.
                    </p>

                    <h2>12. Contact</h2>
                    <p>
                        For questions about these Terms, please contact us:
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
