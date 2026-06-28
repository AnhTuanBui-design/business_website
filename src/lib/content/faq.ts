/**
 * Drafted FAQ content. STATIC for now — when the admin dashboard ships
 * (faqs table + CRUD), the homepage and /faq page will read from Supabase
 * and these entries become the seed data, editable without a redeploy.
 */
export interface FaqItem {
    question: string;
    answer: string;
}

export const faqs: FaqItem[] = [
    {
        question: "What exactly do you build?",
        answer: "A branded website with a built-in booking and payment flow for your short-term rental — your own place on the web where guests discover your property and book directly, with no platform in between.",
    },
    {
        question: "How is this different from just using Airbnb or Vrbo?",
        answer: "Those platforms are great for discovery, but they charge 15–20% per booking and own the guest relationship. A direct-booking site lets repeat and referral guests book commission-free, while you keep their contact details and your brand.",
    },
    {
        question: "Will I still be able to use Airbnb and Vrbo?",
        answer: "Absolutely — most hosts run both. We sync your calendars so your direct site and the listing platforms stay in step, which keeps you from getting double-booked.",
    },
    {
        question: "How do payments work?",
        answer: "We connect a trusted payment provider (such as Stripe) so guests pay you directly. Funds go straight to your account — we never sit in the middle of your money.",
    },
    {
        question: "How long does it take to launch?",
        answer: "Most sites go live in two to three weeks, depending on how quickly we receive your photos, property details, and feedback.",
    },
    {
        question: "Do I own the website?",
        answer: "Yes — 100%. The site, your domain, the content, and your guest data are all yours. You're never locked in.",
    },
    {
        question: "What does it cost?",
        answer: "A one-time build fee with optional ongoing care for updates and support — and no revenue share, ever. Visit our pricing page for the details.",
    },
];
