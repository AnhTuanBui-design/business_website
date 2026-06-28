# Build Plan — BookDirect Studio

> Status: **APPROVED — building in phases.** Plan reflects the confirmed B2B positioning. Each build step pauses for review.

## 0. Decisions captured from you

| Topic | Decision |
|---|---|
| Business | **B2B web studio** — builds branded, direct-booking websites for short-term-rental / Airbnb hosts |
| Pages | Core marketing + Pricing + Blog/CMS + Accounts/dashboard (+ recommended additions) |
| Content | **Hybrid** — static marketing copy, Supabase for dynamic (blog, work, FAQ, leads, accounts) |
| Auth | **Customer accounts + admin** (role-based) |
| Branding | **BookDirect Studio** — confirmed display name |
| Domain | **bookdirect.studio** — purchased (Hostinger), live on Netlify w/ SSL; email hello@bookdirect.studio |
| Admin account | `buianhtuan.26@gmail.com` + generated password (created in Phase 3) |

### Brand
- **Positioning:** BookDirect Studio helps short-term-rental hosts **win direct bookings** with a branded website + booking flow, so they own guest relationships and avoid OTA (Airbnb/Vrbo) fees. Audience = property owners/hosts (B2B). Tone: confident, helpful, revenue-focused.
- **Name:** **BookDirect Studio** (wordmark; short form "BookDirect"). Swap for an SVG logo later.
- **Palette:** ocean teal primary (already applied to `theme.css`), slate neutrals, light/dark via `next-themes`. Amber/orange utility tones available for accents/CTAs.
- **Type:** Inter for UI/body (loaded). Optional display font for headings — optional, no new dep unless wanted.

---

## 1. Architecture decisions & tradeoffs (thought through)

**Rendering & data:** React Server Components by default. Marketing pages are static/ISR for speed + SEO. Dynamic data (blog, leads, account) read via the Supabase **server** client in RSCs; writes go through **Server Actions** (no separate API layer needed). _Tradeoff:_ skipping React Query / SWR — RSC + server actions cover our needs and keep the bundle lean.

**Content split (the "hybrid"):**
- **Static (in code, `src/lib/content/*`):** services, about, pricing tiers, legal, site/nav config. Fast, versioned, SEO-friendly, no DB round-trip. Edits = code change + deploy.
- **Supabase (DB-backed, editable from the admin dashboard):** blog posts, **Work / Case Studies**, **FAQs**, contact/lead submissions, newsletter signups, user accounts/profiles. ← per your request, Work and FAQ are admin-managed so you can add them later without code changes.
- _Tradeoff:_ pricing/services kept static for v1 (simpler, rarely change). Easy to migrate to DB later if you want to edit them from the admin.

**Auth & roles:** Supabase Auth (email/password to start; OAuth optional later). Session refresh already handled in `src/proxy.ts`. Roles via a `profiles` table with a `role` column (`'user' | 'admin'`), enforced by **RLS** + a server-side guard in the admin layout. _Tradeoff:_ a `profiles.role` column is simpler and more transparent than custom JWT claims, and plays nicely with RLS. Your email (`buianhtuan.26@gmail.com`) gets `admin` seeded after first signup.

**Security:** All tables get **Row Level Security**. We rely on the logged-in user's session + policies (no service-role key in the app). _Flag:_ if any admin action needs to bypass RLS, I'll request adding `SUPABASE_SERVICE_ROLE_KEY` as a server-only env var first — not before.

**Blog authoring (v1):** posts stored as **Markdown** in Supabase; admin edits via a textarea with live preview; rendered with a small markdown renderer. _Tradeoff:_ a full WYSIWYG (Tiptap) is much heavier — defer to v2. (Renderer is a flagged dependency, see §6.)

**Forms & validation:** Untitled UI / react-aria form components + **Zod** schemas shared by client and server actions. _Tradeoff:_ skipping `react-hook-form` — react-aria + server-action validation is enough and avoids extra client weight. (Zod is a flagged dependency, see §6.)

---

## 2. Project structure (App Router + route groups)

Route groups give each area its own layout without affecting URLs.

```
src/
├── app/
│   ├── layout.tsx                  # root (exists) — fonts, providers, theme
│   ├── not-found.tsx               # (exists)
│   ├── (marketing)/                # public site — header + footer shell
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx        # service detail (optional)
│   │   ├── work/page.tsx           # case studies / featured getaways (Supabase, admin-managed)
│   │   ├── work/[slug]/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── blog/page.tsx           # list (Supabase)
│   │   ├── blog/[slug]/page.tsx    # detail (Supabase)
│   │   ├── contact/page.tsx        # lead form → Supabase
│   │   ├── faq/page.tsx            # FAQ (Supabase, admin-managed)
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── (auth)/                     # centered auth shell
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── update-password/page.tsx
│   ├── (app)/                      # authenticated customer area (sidebar)
│   │   ├── layout.tsx              # requires session
│   │   ├── dashboard/page.tsx
│   │   └── dashboard/settings/page.tsx
│   ├── (admin)/                    # admin-only (role guard + sidebar)
│   │   ├── layout.tsx              # requires role = admin
│   │   ├── admin/page.tsx          # overview
│   │   ├── admin/posts/{page,new,[id]}.tsx     # blog CRUD
│   │   ├── admin/work/{page,new,[id]}.tsx      # case studies CRUD
│   │   ├── admin/faqs/{page,new,[id]}.tsx      # FAQ CRUD
│   │   └── admin/leads/page.tsx    # contact submissions inbox
│   └── auth/                       # route handlers (no UI)
│       ├── confirm/route.ts        # email OTP / magic link confirm
│       └── signout/route.ts
├── components/
│   ├── base/ application/ marketing/ foundations/ shared-assets/   # (vendored Untitled UI — untouched)
│   └── sections/                   # ★ NEW: our composed page sections (hero, cta, feature-grid, ...)
├── lib/
│   ├── supabase/                   # client.ts, server.ts, middleware.ts (exist)
│   ├── content/                    # ★ NEW: static content (services.ts, pricing.ts, faq.ts, nav.ts, site.ts)
│   ├── validations/                # ★ NEW: zod schemas (contact.ts, auth.ts, post.ts)
│   └── actions/                    # ★ NEW: server actions (contact.ts, auth.ts, posts.ts)
├── hooks/                          # (exists)
├── providers/                      # (exists)
├── styles/                         # globals.css, theme.css, typography.css (exist)
└── proxy.ts                        # session refresh (exists)
```

Conventions (from `CLAUDE.md`): **kebab-case** filenames, **`Aria*`** prefix for `react-aria-components` imports, `cx`/`sortCx` utilities, size (`sm|md|lg|xl`) + color variants. Custom sections compose the vendored Untitled UI components — we don't fork them.

---

## 3. Database schema (Supabase — proposed, applied in Phase 3 via Management API)

> Applied through `POST /v1/projects/cyndqrwsiaszpgnuidsf/database/query` (per your rule). All tables get RLS. SQL shown for your review:

```sql
-- profiles: 1:1 with auth.users
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);
-- trigger: auto-create profile on signup (handle_new_user)

-- blog
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,                 -- markdown
  cover_image_url text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  author_id uuid references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- work / case studies (admin-managed CMS)
create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,                  -- host / property brand name
  location text,                -- property location, e.g. "Lake Tahoe, CA"
  summary text,                 -- short teaser
  cover_image_url text,
  gallery jsonb default '[]',   -- [{url, alt}] — screenshots of the site we built
  services text[] default '{}', -- e.g. {"Web design","Booking engine","SEO"}
  challenge text,               -- markdown
  solution text,                -- markdown
  results jsonb default '[]',   -- [{label, value}] e.g. {"label":"Direct bookings","value":"+38%"}
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- faqs (admin-managed CMS)
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,         -- markdown
  category text default 'General',
  status text not null default 'published' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- contact / lead capture
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text default 'contact-form',
  created_at timestamptz not null default now()
);

-- newsletter (optional)
create table public.newsletter_subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);
```

**RLS policy summary:**
- `profiles`: user can read/update own row; admin can read all.
- `posts`, `case_studies`, `faqs`: anyone can read `status='published'`; admin full CRUD.
- `leads`: anyone (incl. anon) can `insert`; only admin can `select`.
- `newsletter_subscribers`: anyone can `insert`; admin can `select`.

**Storage buckets:** `avatars` (public read; owner write), `blog` (public read; admin write), `work` (public read; admin write — case-study images).

**Admin account seed (Phase 3):** create the auth user `buianhtuan.26@gmail.com` with the generated password directly via the Management API SQL endpoint (`auth.users` + `crypt()` from `pgcrypto`, email pre-confirmed), then set its `profiles.role='admin'`. Password is shared in chat only — **never written to any committed or gitignored repo file.**

---

## 4. Component breakdown per page

**Shared:** `site-header` (nav + theme toggle + login/CTA), `site-footer`, `section` wrapper, `cta-band`, `seo` metadata helper.

- **Home:** hero ("Get more direct bookings"), trust bar, problem→solution (escape OTA fees), services grid, how-it-works steps, featured work (host sites), results metrics, testimonials, pricing teaser, blog teaser, contact CTA.
- **About:** mission/story (help hosts own their bookings), values, approach, CTA.
- **Services:** web design, direct-booking engine, brand/identity, channel & calendar sync, SEO/marketing → detail pages (problem → approach → deliverables → CTA).
- **Work (Supabase):** case-study grid of host sites built → detail (cover, gallery, summary, challenge/solution markdown, results metrics). Empty-state friendly until you add entries.
- **Pricing:** tier cards (from static `pricing.ts`), feature comparison, FAQ teaser, CTA.
- **Blog:** post list (cards, tags, pagination) + detail (markdown render, author, related).
- **Contact:** lead form (name/email/company/message) → server action → `leads`, success state; office info.
- **FAQ (Supabase):** grouped accordion by category. **Legal:** prose.
- **Auth:** login, sign-up, forgot-password, update-password (react-aria forms + server actions).
- **Customer dashboard:** sidebar shell, overview, profile/settings (update name/avatar → `profiles` + Storage).
- **Admin:** overview stats; **CRUD editors for Blog, Work/Case Studies, FAQs** (markdown + live preview, draft/publish, image upload, drag-to-reorder where it matters); leads inbox (table, search).

---

## 5. Build order (ships incrementally; each step pauses for your review)

1. **Brand & foundations** ✅ — ocean-teal palette in `theme.css`, `lib/content/site.ts` + `nav.ts`, `site-header` + `site-footer` + `(marketing)/layout.tsx`.
2. **Home page** — compose hero + key sections from static content. *First real page.*
3. **Static marketing** — About, Services (+detail), Pricing, Legal.
4. **Supabase schema + admin account** — apply all DDL/RLS via Management API; create `buianhtuan.26@gmail.com` admin user + seed role.
5. **Auth** — `(auth)` pages (login/sign-up/forgot/update-password) + confirm/signout routes.
6. **Admin shell** — `(admin)` layout with role guard + sidebar + overview.
7. **Work / Case Studies** — admin CRUD (with image upload) → public `/work` + `/work/[slug]`.
8. **FAQ** — admin CRUD → public `/faq` (+ pricing FAQ teaser).
9. **Contact + leads** — contact form → `leads` (server action + zod); admin leads inbox.
10. **Blog** — public list/detail (Supabase) → admin posts CRUD with markdown editor.
11. **Customer dashboard** — `(app)` shell, profile/settings, avatar upload (Storage).
12. **Polish** — SEO metadata, `sitemap.ts`, `robots.ts`, OG images, 404, a11y pass, prod env (`NEXT_PUBLIC_SITE_URL`), build check.

Dependencies: nav/footer (1) underpin all pages; schema (4) precedes auth/CMS/leads; auth + admin shell (5,6) gate the admin CRUD steps (7–10) and dashboard (11).

---

## 6. New dependencies (NOT added without your OK)

| Package | Why | Alt if you say no |
|---|---|---|
| `zod` | Shared client/server form validation | hand-rolled validation |
| `react-markdown` (+ `remark-gfm`) | Render blog markdown safely | store/render sanitized HTML |
| _(optional)_ display font via `next/font` | Headline personality | stick with Inter only |

Everything else uses what's already installed (Untitled UI, react-aria, motion, recharts, next-themes, Supabase).

## 7. New env vars

| Var | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `.env.local` + Netlify | Auth redirect URLs (`http://localhost:3000` / prod) |
| _(only if needed)_ `SUPABASE_SERVICE_ROLE_KEY` | server-only, **I'll ask first** | admin actions that must bypass RLS |

---

## 8. Decisions — resolved
1. ✅ **Brand:** BookDirect Studio (B2B web studio for STR hosts). Domain **bookdirect.studio** live on Netlify w/ SSL; email hello@bookdirect.studio.
2. ✅ **Work/Case Studies + FAQ:** **admin-managed CMS** (add entries later via the admin dashboard). Fields — see §3.
3. ⏳ **Dependencies (confirm before Steps 9–10):** `zod` (form validation), `react-markdown` + `remark-gfm` (render blog/case-study markdown). Small, popular, MIT. Not needed for Steps 1–2.
4. ✅ **Blog/CMS authoring:** Markdown for v1.
5. ✅ **Auth:** email/password to start. Admin = `buianhtuan.26@gmail.com`. Customer email/password signup enabled; Google OAuth deferred.

## 9. Progress
- ✅ Step 1 — Brand & foundations
- ▶ Step 2 — Home page (in progress)
