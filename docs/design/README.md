# Furkin website designs

Everything needed to build the Furkin website (`furkin-web`) to the designs. Behaviour, routes, data and legal requirements are in `docs/WEBSITE.md`; the designs win on visuals.

The website is a separate repository from the app. Everything it needs from the Furkin design system is copied here.

## What is here

| Path | What it is |
|---|---|
| `SCREENS.md` | Every page: image, HTML, route, notes |
| `png/` | 2x renders of every page with the real fonts, full page height |
| `html/` | Static HTML per page using the files in `styles/`. Open in a browser and resize: the layout is responsive at 860 px |
| `styles/tokens.css` | The design tokens as CSS variables: every role for all five colour profiles, light and dark. Generated from the design system; don't edit by hand |
| `styles/components.css` | The Furkin component styles (`fk-` classes: buttons, chips, inputs, tags, task rows, banners). The same styles the app's designs use |
| `styles/site.css` | The site layout styles (`ws-` classes) |
| `styles/furkin-tokens.ts` | The same tokens as TypeScript, for places CSS can't reach (the Open Graph image) |
| `icons/Icon.tsx`, `icons/svg/` | The Furkin icon set (49 icons) as a React component for the web, plus the SVGs |
| `shots/` | App screenshots, 780 x 1688 (2x of 390 x 844). Put them in `public/screens/` and serve through `next/image` |
| `toy/today-mock.html` | The Today screen markup inside the colour profiles toy |
| `content/en.ts` | All site copy, ready to become `content/en.ts` |
| `brand/` | The placeholder app icon (F sticker), light and dark, for the favicon and touch icon until the final logo arrives |
| `BRAND-BOOK.md` | The Furkin design system's rules: colour roles, the five profiles, type, shape, voice, motion, accessibility |

## Using the styles

- Copy `styles/tokens.css`, `styles/components.css` and `styles/site.css` into the repo's `styles/` and import them once, in that order, in `app/layout.tsx`. They are the styling: build components with these classes rather than re-creating them.
- Fonts: load Bricolage Grotesque (700, 800) and Nunito (600, 700, 800) with `next/font/google`, `variable: '--nf-display'` and `'--nf-body'`, and add after the imports: `:root { --font-display: var(--nf-display), system-ui, sans-serif; --font-body: var(--nf-body), system-ui, sans-serif; }`.
- Theme: set `data-theme="light|dark"` and `data-profile="glacier"` on `<html>`. The inline theme script picks dark or light from the saved override, else `prefers-color-scheme`.
- Classes in the designs (`ws-`, `fk-`) can become React components with the same class names; keep the CSS files as the single source of the look.

## Layout system

- Content max width 1120, side padding 32 (16 below 860 px). One breakpoint at 860 px: below it, grids become one column, the nav links hide, forms stack and the hero art moves under the copy.
- Section spacing 112 top and bottom (72 below 860 px). Section header: label, then a `h2`, max width 880, 48 below it.
- Type: hero `h1` Bricolage 800 76/76 (44 on phones), `h2` 48 (34), card titles 24, lead 21 (18), body 17, small print 14. All weights and families as in the app's type scale.
- Colours: only the role tokens from `styles/tokens.css` (`background`, `surface`, `ink`, `muted`, `primary`, `done`, `accent`, `action`, `on-fill`, `danger`, `shadow`). Glacier is the site's brand profile; dark mode follows the visitor's system, with the footer sun and moon toggle as an override.
- Shape: 2.5 `ink` outlines; cards radius 24; panels 28; the final call to action 32; phones 44 outer, 34 inner. Hard shadows (no blur) only on the primary button, phones, the selected profile, panels and the call to action card.

## Pieces

| Piece | Look | Build notes |
|---|---|---|
| Header | Logo (F sticker tilted -4 deg, wordmark), nav, primary button | Sticky. After 8 px of scroll: `surface` background and a 2.5 bottom outline (`ws-header.is-scrolled`) |
| Waitlist form | 56 tall input and primary button in a row; small print below | States on `WebWaitlistStates`. Stacks below 860 px with a full-width button. Honeypot field visually hidden |
| Phone frame | Real screenshot inside an `ink` bezel, radius 44, 6 hard shadow | `next/image` with `sizes`; the hero phone rotates -3 deg |
| Stickers | Pill, 2.5 outline, 3 shadow, icon in a ring | Hero only. Gentle bob (translateY 0 to -6 px, 4 s) that stops under `prefers-reduced-motion` |
| Problem cards | Outlined card, 56 icon tile in `done`, `accent` or `primary` | Icons from the app's icon set |
| How it works | Three numbered steps with small phones aligned to the bottom | On desktop the spec allows a scroll-linked single phone; the static three-phone layout is the design and the fallback |
| Feature cards | Screenshot crop on `background`, title, one line | Crops are a fixed 220 tall window; the image's top offset per card is in `html/WebLanding.html` |
| Colour profiles toy | `primary` band; a phone rendering the Today markup (`toy/today-mock.html`); five profile buttons and a Light / Dark switch | The only client component. Set `data-profile` and `data-theme` on the phone container only, never on the page. Buttons are `aria-pressed`; the phone is `inert` |
| Final call to action | `accent` card with the form (waitlist) or badges (live) and paw prints | Same form component as the hero |
| Footer | Logo, tagline, links, email, business line, theme toggle | The toggle stores the override in `localStorage` inside `try`/`catch`; an inline script in `<head>` applies it before paint |
| Store badges | Dashed placeholders | Replace with the official Apple and Google badge artwork per their guidelines at launch |
| Simple panel pages | Centred `surface` panel, radius 28, 6 shadow, header and footer around it | Invite, sign-in fallback, waitlist confirm, 404 |
| Legal pages | Sticky "On this page" box on the left, prose max 720 | The box hides below 860 px. Text from `content/legal/*.md` |
| Open Graph image | 1200 x 630, logo, headline, phone | Build with `app/opengraph-image.tsx` to match `png/WebOGImage.png` |
