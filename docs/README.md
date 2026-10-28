# Furkin website: start here

This repository is the Furkin website, `furkin-web`, served at **https://furkin.app**. It is separate from the Furkin mobile app's repository. Everything you need is in this `docs/` folder; you don't need the app's code or specs.

**What Furkin is:** a shared pet care app for iOS and Android. Everyone in a Household sees the same pets, the same daily routine and who did what, so nobody double-feeds the cat. The website promotes the app (a waitlist before launch, store links after), serves the pages the app's links fall back to (invites and sign-in), and holds the legal pages.

## Read in this order

1. `WEBSITE.md`: the Website Build Spec. Routes, behaviour, data, waitlist, app support routes, SEO, legal, performance targets, build order and decisions. It wins on behaviour.
2. `design/README.md`: how to use the designs, the styles and every piece. The designs win on visuals.
3. `design/SCREENS.md`: every page with its PNG and HTML.
4. `design/BRAND-BOOK.md`: the design system's rules and voice, for anything the designs don't show.

## What's where

| Path | What it is |
|---|---|
| `WEBSITE.md` | The spec |
| `design/` | Page designs (PNG and HTML), styles, icons, screenshots, copy, brand files |
| `db/website.sql` | The database objects the site needs in the shared Supabase project. The app repository creates them (see below) |
| `env.example` | Every environment variable the site reads |
| `../.cursor/rules/furkin-web.mdc` | Rules for Cursor; keep it in `.cursor/rules/` |

## The shared database

The site uses the app's Supabase project but does not own its schema. Two objects are needed:

- `waitlist` table: for milestone 3.
- `public_invite_preview(code)` function: for milestone 4.

Lisa gives `db/website.sql` to the app repository, which adds them in a migration. Don't create migrations or run SQL against the shared database from this repository. Until Lisa confirms they exist, build against a local mock behind the same function signatures and leave a `TODO(question)`.

## Facts to use

| Thing | Value |
|---|---|
| Domain | furkin.app |
| Contact and support email | hello@furkin.app |
| Business line | © {year} Pixel Witch. All rights reserved. Linking to https://pixelwitch.dev. "Made in The Hague, Netherlands" |
| iOS bundle ID and Android package | dev.pixelwitch.furkin |
| App URL scheme | furkin:// (paths `invite/{code}` and `auth/callback`) |
| Universal link paths | `/invite/*`, `/auth/callback` |
| Brand profile | Glacier |
| Language | English only |
