# Project Build Log — BookDirect Studio

A running log of build activity, results, and next steps. Newest entry on top.
See `PLAN.md` for the full plan and `CLAUDE.md` for how we work.

---

## 2026-06-28 — Initial build session

**Goal:** Stand up BookDirect Studio — a B2B web studio that builds branded, direct-booking
websites for short-term-rental / Airbnb hosts. Scaffold all integrations, then build the
marketing site, backend, auth, and admin foundation following Explore → Plan → Code → Commit.

### Activities

**Setup & integrations**
- Scaffolded Next.js 16 (App Router) + TypeScript + Tailwind v4 + Untitled UI Pro + Icons Pro (line).
- Wired Supabase (`@supabase/ssr`: browser/server clients + `proxy.ts` session refresh), Netlify (`@netlify/plugin-nextjs`), and GitHub.
- Secrets in `.env.local` (gitignored); committed `.npmrc` using `${UNTITLEDUI_PRO_TOKEN}`; `--webpack` scripts (project path contains an emoji).
- Resolved a Supabase project mismatch → using **`business_website` / ref `cyndqrwsiaszpgnuidsf`**.

**Brand & planning**
- Repositioned from an early "travel agency" draft to the real B2B model.
- Named **BookDirect Studio**; bought **bookdirect.studio** (Hostinger) + email `hello@bookdirect.studio`.
- Wrote `PLAN.md` (architecture, routes, schema, build order) and prepended a project guide to `CLAUDE.md`.
- Added Claude Code subagents: `ui-page-builder`, `supabase-migrator`.

**Marketing site (Server Components composing Untitled UI)**
- Ocean-teal brand theme; `site-header`, `site-footer`, `(marketing)` layout.
- Home (hero, benefits, services, process, stats, testimonial, pricing teaser, **FAQ**, CTA).
- Services + per-service detail pages; Pricing (3 placeholder tiers).
- About; Privacy + Terms (template copy).
- Public Work list + detail (reads `case_studies`, empty state until entries exist).

**Backend (Supabase, via Management API)**
- Tables: `profiles`, `posts`, `case_studies`, `faqs`, `leads`, `newsletter_subscribers` — all RLS-enabled (22 policies).
- Storage buckets: `avatars`, `blog`, `work` (+12 storage policies).
- `is_admin()` helper + `handle_new_user()` trigger.
- Admin account seeded (`buianhtuan.26@gmail.com`, role=admin) — login verified end-to-end.

**Auth & admin**
- `(auth)` pages: login, sign-up, forgot-password, update-password (Zod-validated server actions) + `auth/confirm` & `auth/signout` handlers.
- Supabase Auth redirect allowlist configured (localhost + bookdirect.studio).
- Role-guarded `(admin)` shell + sidebar + overview (live counts).
- Role-aware post-login redirect (admins → `/admin`, others → `/dashboard`); minimal `/dashboard` placeholder.

### Results
- **Live in production: https://bookdirect.studio** (Netlify, Let's Encrypt SSL, www→apex redirect).
- All built routes return 200; admin area correctly guards to `/login`; admin login works on prod.
- Code on GitHub `main` (`AnhTuanBui-design/business_website`), clean conventional-commit history.
- Verified: typecheck clean throughout; Supabase schema/RLS/admin confirmed via Management API; admin auth confirmed via token endpoint.

**Key commits:** `058d2a7` scaffold · `abacfa9` brand · `f9242de` home · `bf470a0` services/pricing · `d478e88` tooling · `20c70fd` about/legal · `d8ce6e8` auth · `4f356eb` admin shell · `3265952` public work · `a98756f` auth redirect fix.

### Known gaps (linked but not built → 404)
- **/contact** (every "Get a quote" CTA points here) — highest priority.
- **/faq** standalone page (the home FAQ section works), **/blog**.
- Admin CRUD: **/admin/posts**, **/admin/work**, **/admin/faqs**, **/admin/leads**.
- Customer `/dashboard` is a placeholder only.

### Action plan — moving forward
1. **Contact + leads** — contact form → `leads` (server action + Zod) + admin leads inbox. *(unblocks all CTAs)*
2. **Admin Work CRUD** — create/edit/publish case studies + image upload (so `/work` can be filled).
3. **FAQ CMS** — admin CRUD; switch home + `/faq` to read from `faqs` table (dashboard-editable).
4. **Blog** — public list/detail + admin CRUD (needs `react-markdown` — to be approved).
5. **Customer dashboard** — profile/settings, avatar upload.
6. **Polish** — SEO metadata, `sitemap.ts`/`robots.ts`, OG images, `next/image` remote patterns for Supabase, a11y pass.

### Operational notes
- **Deploy:** `netlify deploy --build --prod --site 0b8e1c5a-bbec-493d-b421-cacf0c8daabb` (only on explicit approval).
- **Admin login:** https://bookdirect.studio/login (admin email + generated password — stored in password manager).
- **DNS + email:** managed at Hostinger — do not move nameservers to Netlify.
- **TODO (user):** rotate all tokens shared during setup; set real pricing; have legal pages reviewed; set Terms governing-law jurisdiction; configure production SMTP for auth emails.
