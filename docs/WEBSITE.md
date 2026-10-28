# Furkin: Website Build Spec for Cursor

Oct 23, 2026 · @Lisa van Zyl

## Overview

Build the Furkin website: a fast, playful marketing site that promotes the app, collects a waitlist before launch, and serves the few web routes the mobile app depends on. It is not a web version of the app; nobody logs care or edits pets here.

**The site has three jobs:**

1. **Promote:** explain Furkin in one scroll and get people onto the waitlist now, then to the App Store and Google Play after launch.
2. **Support the app:** invite link fallback pages, the magic link callback, and the files that make universal links and App Links work.
3. **Meet legal requirements:** privacy policy, terms, and the business details Dutch and EU law require.

**A separate repository.** The website lives in its own repository, `furkin-web`, apart from the app. It shares the app's Supabase project and design system but no code: the design tokens, component styles, icons, screenshots and copy it needs are copied into `docs/design/` in the website repository, so nothing from the app repository or the app's specs is needed to build it.

**How to work through this spec in Cursor:** start with `docs/README.md`, build in the order in Build order, use only the role tokens in `styles/tokens.css` for colours, and keep all copy in `content/en.ts`.

## Tech stack

The site is its own repository, `furkin-web`, with the Next.js app at the root. Use the latest stable versions at project start, pinned in the lockfile, and TypeScript in strict mode.

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js, App Router | Static generation for marketing and legal pages; dynamic routes only where noted |
| Styling | Plain CSS: `tokens.css`, `components.css` and `site.css` from `docs/design/styles/`, imported once in the root layout | The CSS variables and fk- component classes the designs are built with. No Tailwind and no shared package |
| Fonts | `next/font/google`: Bricolage Grotesque (700, 800), Nunito (600, 700, 800) | Self-hosted by Next, no external font requests |
| Data | Supabase (the app's project), `@supabase/ssr` | Waitlist and invite previews only, through server code. The database objects are created by the app repository's migrations (SQL in docs/db/website.sql) |
| Email | Resend | Waitlist confirmation (double opt-in) |
| Analytics | Plausible (cookieless) | No cookie banner needed |
| Hosting | Vercel, EU region (Frankfurt) | Preview deploys on every PR |
| Tests | Playwright for end-to-end, Lighthouse CI for performance and accessibility |  |

```
furkin-web/
  app/
    layout.tsx               Fonts, theme script, styles, metadata defaults
    page.tsx                 Landing page
    privacy/page.tsx
    terms/page.tsx
    support/page.tsx
    invite/[code]/page.tsx   Invite fallback (dynamic)
    auth/callback/page.tsx   Magic link fallback
    waitlist/confirm/page.tsx  Confirms the token, shows the thank-you page
    api/waitlist/route.ts    POST, rate limited
    .well-known/
      apple-app-site-association/route.ts
      assetlinks.json/route.ts
    opengraph-image.tsx
    not-found.tsx
    sitemap.ts, robots.ts
  components/                Section and UI components, Icon.tsx
  content/en.ts              All copy (start from docs/design/content/en.ts)
  content/legal/             privacy.md, terms.md
  styles/                    tokens.css, components.css, site.css (from docs/design/styles)
  public/screens/            App screenshots (from docs/design/shots)
  public/                    Favicon and icons; store badges at launch
  docs/                      This spec and the design handover
```

## Pages and routes

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/` | Landing page | Static |
| `/privacy` | Privacy policy | Static |
| `/terms` | Terms of use | Static |
| `/support` | FAQ and contact email; required as the App Store support URL | Static |
| `/invite/[code]` | Invite fallback for people without the app | Dynamic, no caching |
| `/auth/callback` | Fallback when a magic link opens in a browser instead of the app | Static |
| `/waitlist/confirm` | Confirms a waitlist email from the double opt-in link | Dynamic |
| `/.well-known/apple-app-site-association` | iOS universal links | Static JSON |
| `/.well-known/assetlinks.json` | Android App Links | Static JSON |
| `/care/[token]` | Public Care guide page (Later) | Dynamic |

A single footer on every page links to Privacy, Terms, Support and the business details. A 404 page uses the same playful style ("This page wandered off. Probably chasing a squirrel.") with a link home.

## Landing page

One scrolling page with seven sections. The page has two modes set by an environment variable `NEXT_PUBLIC_LAUNCH_STATE`: `waitlist` (before launch, the call to action is an email form) and `live` (after launch, it shows App Store and Google Play badges). Every call to action switches with it. Copy below is direction; final copy goes in `content/en.ts`.

1. **Header.** Furkin wordmark on the left. On the right, a "Get early access" button (waitlist) or "Download" (live) that scrolls to the final call to action. Sticky on scroll, with the background turning to `surface` and a 2.5 px bottom outline once scrolled.
2. **Hero.** Headline in Bricolage Grotesque 800 at 56 to 72 px on desktop, 40 px on mobile: "Who fed the cat?" Subline: "Furkin keeps everyone who cares for your pets on the same page. See what's done, what's due and who did it." The waitlist form or store badges sit below. On the right (below on mobile), a phone frame with the Today screen, slightly rotated, with two sticker badges floating around it ("Fed by Daan · 08:10" and "Dinner logged. Mallow approves.").
3. **The problem.** Three short cards in a row, each with an icon: "Double breakfast" (the dog was fed twice), "The forgotten pill" (nobody was sure who gave it), "The 2,000-word sitter message". One line each. Light humour, no blame.
4. **How it works.** Three steps with screenshots: "Add your pets and their routine", "Invite your people", "Tap Done. Everyone sees it." On desktop the screenshot changes as each step scrolls into view; on mobile they stack.
5. **Features.** A grid of six feature cards: shared daily routine, the double-feed guard, health and vet records with reminders, weight tracking, one-tap Care guide for sitters, and List or Day view. Each card has a small illustration or screenshot crop and one sentence.
6. **Colour profiles toy.** An interactive phone mockup with the five profile dots and a Light and Dark switch underneath. Clicking a dot recolours the mockup with that profile's tokens, the same way E3 works in the app. Caption: "Make it yours. Five colour profiles, light and dark." This shows off the personalisation and doubles as the brand's colour story.
7. **Final call to action.** A large card in the `primary` fill with the hard shadow: "Get Furkin for your Household" with the waitlist form or store badges again. Small print under the form: "We'll email you once when Furkin launches. No spam, unsubscribe any time."

**Footer.** Wordmark, links (Privacy, Terms, Support), contact email, the business details (see Legal) and "Made in the Netherlands".

**Designs.** Every page is designed on the *Furkin Website* canvas and exported to `docs/design/`: a PNG and an HTML file per page, the styles, the screenshots and `SCREENS.md`. The designs win on visuals; this spec wins on behaviour. Decisions the designs make:

- The hero stickers read "Fed by Daan · 08:10" and "Dinner logged. Mallow approves." The app has no streaks, so the earlier "12 day streak" sticker is dropped.
- The six features are: a shared daily list, the double-feed guard, health and vet records, weight over time, the Care guide for sitters, and List or Day view. Colour profiles moved out of the grid because the colour profiles toy covers them.
- Screenshots are real app renders (2x PNG) in a phone frame with the hard shadow. The colour profiles toy is the one place the app is rebuilt in HTML, because it must recolour live; it renders the B1 Today markup with the shared tokens, made `inert`.
- Store badges are dashed placeholders. Replace them with Apple's and Google's official badge artwork, following their guidelines, at launch.
- The final call to action uses the `accent` fill (the hero already uses `primary` behind the phone).

## Design and theming

The site uses the same Playful and Bold visual system as the app: 2.5 px ink outlines, hard offset shadows, rounded cards, Bricolage Grotesque headings and Nunito body. `docs/design/README.md` has the layout system and every piece; `docs/design/BRAND-BOOK.md` has the design system's rules and voice.

- **Colour:** Glacier is the site's brand profile. `styles/tokens.css` defines every role as a CSS variable for all five profiles in light and dark: Glacier light on `:root`, dark under `[data-theme="dark"]`. The theme script sets `data-theme` on `<html>` from the saved override, else the system preference.
- **Dark mode:** follows the visitor's system setting. Add a small sun and moon toggle in the footer that stores an override in `localStorage` (read and write inside `try`/`catch`), applied by an inline script in `<head>` so there is no flash of the wrong theme.
- **The colour profiles toy** (landing section 6) is the only place other profiles appear. It sets the variables on its own container, never on the page.
- **Layout:** content max width 1120 px, 16 px side padding on mobile and 32 px on desktop. Must work from 360 px wide with no horizontal scrolling.
- **Motion:** gentle, small rises and fades as sections enter, and the sticker badges bobbing slowly. Turn all of it off under `prefers-reduced-motion`.
- **Images:** `next/image` for all screenshots, with AVIF and WebP. App store badges use the official artwork from Apple and Google, following their guidelines.
- **Voice:** same as the app. Plain labels, playful headlines, no em dashes, metric units.

## App support routes

These routes are small but the app breaks without them, so test them on real phones.

**`/invite/[code]`** (the link people receive when invited)

- If the app is installed, iOS and Android open the app directly and this page never shows. It shows only when the app isn't installed, or the link opened in an in-app browser.
- The page calls a new database function `public_invite_preview(code)` from server code. It lives in the shared database and is created by the app repository's migrations (SQL in docs/db/website.sql): `security definer`, callable by `anon`, and it returns the invite status (`valid`, `expired`, `used`, `revoked`, unknown) and, only for a valid invite, the Household name, the inviter's first name, the pets' first names and the role. It never returns photos, emails or any other data. Rate limit the page to 30 requests per IP per minute.
- Valid invite: "Lisa invited you to help look after Mallow and Pepper." Then three steps: get the app (store badges), open it, and if the invite doesn't open automatically, enter the code shown in big, spaced letters with a copy button. Add an "Open in Furkin" button that tries `furkin://invite/{code}`.
- Expired, used or revoked: a friendly explanation and "Ask the person who invited you to send a new one". No names on this page, because unknown codes show it too.
- Unknown code: the same page as expired, so codes can't be probed.
- Set `noindex` on this route.

**`/auth/callback`**

If a magic link opens in a desktop browser, show: "Open this link on the phone where you're signing in to Furkin." On a phone, try `furkin://auth/callback` with the same query string, and show a manual "Open Furkin" button.

**Universal link files**

- `/.well-known/apple-app-site-association`: served as `application/json` with no redirect and no file extension. It declares `applinks` for the paths `/invite/*` and `/auth/callback` with the app's Team ID and bundle ID.
- `/.well-known/assetlinks.json`: declares the Android package name and the SHA-256 signing certificate fingerprints for both the upload key and the Play app signing key.
- Read Team ID, bundle ID, package name and fingerprints from environment variables, so they can change without a code edit.

**`/care/[token]`** (Later)

A read-only, printable Care guide shared by an Owner with a secret token link that expires. Not part of the MVP; reserve the route.

## Waitlist, SEO, legal and performance

**Waitlist (double opt-in)**

```sql
create extension if not exists citext;
create table waitlist (
  email citext primary key,
  confirm_token_hash text not null,
  confirmed_at timestamptz,
  source text,                 -- utm_source if present
  created_at timestamptz not null default now()
);
alter table waitlist enable row level security;   -- no policies: only server code with the service role touches it
```

1. The form posts to `/api/waitlist`. Validate the email with Zod, rate limit to 5 per IP per hour, and include a hidden honeypot field.
2. Store a hashed one-time token and send a confirmation email with Resend: "Confirm your spot on the Furkin waitlist."
3. `/waitlist/confirm?token=` sets `confirmed_at` and shows a thank-you state.
4. Always respond "Check your inbox" whether or not the email already exists, so the form can't be used to check who signed up.
5. The Supabase service role key lives only in server environment variables, never with a `NEXT_PUBLIC_` prefix.

**SEO and sharing**

- Title: "Furkin: Track and Coordinate Pet Care". Meta description in one sentence of 150 to 160 characters.
- A generated Open Graph image (1200 x 630) with the wordmark, headline and the Today phone mockup, in Glacier light.
- `sitemap.xml` with the landing, privacy, terms and support pages. `robots.txt` disallows `/invite/`, `/auth/`, `/waitlist/` and `/care/`.
- After launch, add Apple Smart App Banner meta tags and structured data of type `MobileApplication`.

**Legal pages and business details**

- Footer business details, matching Stepcraft.app: "© \[year\] Pixel Witch. All rights reserved." linking to pixelwitch.dev, and "Made in The Hague, Netherlands". Contact email: hello@furkin.app.
- Privacy policy sections: who is responsible, what data the app and site collect (account, Household and pet data, photos, documents, logs, push tokens, waitlist email), why and on what legal basis, processors (Supabase, Vercel, Resend, Plausible, Expo, Apple, Google), where data is stored (EU), how long it is kept, people's rights under the GDPR, and how to complain to the Autoriteit Persoonsgegevens.
- Terms: acceptable use, Household owners are responsible for who they invite, the app is not veterinary advice, liability limits, Dutch law applies.
- Put the policy text in Markdown files under `content/legal/` so it can be edited without touching components. Have the final texts checked by a legal professional before launch.
- No cookies are set, so no cookie banner. The theme override in `localStorage` is a functional preference and needs no consent.

**Performance and accessibility targets**

- Lighthouse scores of at least 95 for performance, accessibility, best practices and SEO on mobile, enforced by Lighthouse CI on every PR.
- Largest Contentful Paint under 2.0 seconds on a 4G connection; total JavaScript on the landing page under 150 KB gzipped (the colour toy is the only interactive island).
- WCAG 2.2 AA: 4.5:1 text contrast in light and dark, visible focus outlines, full keyboard support including the colour toy, form errors announced to screen readers.

## Build order

The website is independent of the app's code. Two things live in the shared database: the `waitlist` table and `public_invite_preview`. They are created by the app repository's migrations from `docs/db/website.sql`; Lisa hands that file over and confirms they exist before milestones 3 and 4. The app already uses invite and sign-in links, so treat milestone 4 as the most urgent after setup.

| # | Milestone | Done when |
| --- | --- | --- |
| 1 | Setup: the `furkin-web` repository, styles from `docs/design/styles`, icons, fonts, theme script, layout, header, footer, 404 | Pages render in Glacier light and dark with no theme flash; Lighthouse CI runs |
| 2 | Landing page in waitlist mode, all seven sections with the real screenshots | Works from 360 px to 1440 px with no horizontal scroll; colour toy works by mouse, touch and keyboard |
| 3 | Waitlist: table, API route, Resend email, confirm page, rate limiting | A real email address receives the confirmation and is marked confirmed; duplicates and bots are handled |
| 4 | App support routes: invite fallback, auth callback, `public_invite_preview`, association files | An invite link opens the app on iOS and Android when installed and the fallback page when not; Apple's and Google's link validators pass |
| 5 | Legal and support pages, SEO, Open Graph image, sitemap, robots | All pages linked from the footer; social previews render correctly; Lighthouse at least 95 across the board |
| 6 | Launch switch: `live` mode with store badges and Smart App Banner, official store badge artwork | Changing `NEXT_PUBLIC_LAUNCH_STATE` swaps every call to action with no other code change |

## Decisions and open questions

**Decided**

| Topic | Decision |
| --- | --- |
| Name and tagline | Furkin: Track and Coordinate Pet Care |
| Business details | Same as Stepcraft.app: "© \[year\] Pixel Witch. All rights reserved." linking to pixelwitch.dev, plus "Made in The Hague, Netherlands" |
| Languages | English only, no `next-intl` |
| Repository | A separate repository, furkin-web. It shares the app's Supabase project and copies the design system's styles, icons and screenshots into docs/design. Plain CSS from the design files instead of Tailwind. Decided 27 Oct 2026. |
| Domain and email | furkin.app for the site, universal links, App Links, magic links and invites. Contact and support: hello@furkin.app. Waitlist mail is sent from the same domain through Resend. Decided 27 Oct 2026. |

**Still open**

- [ ] Name clearance: search TMview for "Furkin" and sound-alikes before launch and before printing anything.
