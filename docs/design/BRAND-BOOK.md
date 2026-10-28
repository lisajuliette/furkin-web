> The Furkin design system's guide, written for the app. On the website the same rules apply through `styles/tokens.css` and `styles/components.css`; ignore the notes about Expo, NativeWind and native components.

Furkin is a shared pet care app for iOS and Android. Everyone in a Household sees the same pets, the same daily routine and who did what, so nobody double-feeds the cat or forgets the evening walk. The style is **Playful and Bold**: chunky outlines, hard offset shadows and sticker-like shapes on a calm, readable layout. Joyful, never childish; health information always reads as trustworthy.

Two moments matter most. Design every screen so they stay fast:

1. **The daily check:** open the app and know within two seconds what is done, what is due and who did it.
2. **The handover:** give someone everything they need to care for the pets, without a long message.

## Units and platform

- Sizes in this system are points on device (React Native dp / pt). 1 px here = 1 pt in the app.
- Design at 390 x 844 (iPhone 15). Check every layout at 360 wide; drop the screen gutter from `space-6` to `space-4` there.
- Support Dynamic Type to at least 130% without clipping: rows grow taller, nothing truncates except pet names and titles on one line. Buttons wrap to two lines rather than shrink, chips and tags grow in height (min, not fixed, heights), second lines wrap, and horizontal rows (pet switcher) never shrink vertically. Cap tab bar labels at 1.2x (`maxFontSizeMultiplier`) so the active pill fits at 360 pt. Checked at 360 pt and 130% on the Furkin Screens canvas (Layout checks row).
- The app is built with Expo and NativeWind. Map every token to a Tailwind theme key of the same name (`bg-surface`, `text-ink`, `rounded-lg`, `p-4`), and switch profile and mode by swapping the role values at the root.

## Names

| Thing | Name in the app |
|---|---|
| App | Furkin |
| Shared space | Household |
| Roles | Owner, Family, Sitter |
| Mark a task as done | Done (button label) |
| Generated handover page | Care guide |

## Colour

Every colour on every screen is one of the role tokens below. Never use a profile token (`lavender-primary`) or a hex value in a screen.

| Role | Use |
|---|---|
| `background` | Screen background. |
| `surface` | Cards, sheets, inputs, list rows, unselected chips. |
| `ink` | Main text, outlines, the light-mode tab bar. |
| `muted` | Secondary text, inactive outlines. Only on `background` and `surface`. |
| `primary` | Selected chips, the active tab, the pet switcher, pet initials. |
| `done` | Completed tasks, success states. |
| `accent` | Reminders, upcoming items, highlights. |
| `action` | Main buttons, links, checkmarks, toggles that are on, focus rings, small caps labels. |
| `on-action` | Text and icons on `action`. |
| `on-fill` | Text and icons on `primary`, `done` and `accent`: always the light-mode ink, in both modes. |
| `shadow` | Hard shadow colour: the `ink` of the current mode. |
| `danger`, `on-danger` | Addition to the brief's nine roles: destructive buttons, field errors, the Overdue tag, sync errors. Same in every profile. |
| `scrim` | Behind sheets and dialogs. |

### Five profiles, light and dark

People pick one of five colour profiles and Light, Dark or System in Settings (E3). That makes ten combinations, all from the same role names:

| Profile | Vibe |
|---|---|
| Glacier (default) | Crisp, icy blues |
| Lavender Mist | Dreamy lilac and rose |
| Tangerine Pop | Sunny and energetic |
| Matcha | Earthy and grounded |
| Nordic | Calm and minimal |

- The Light and Dark themes in this system carry Glacier as the role values. The other profiles live as `<profile>-<role>` tokens (`matcha-done`, `nordic-action`), each with a light and a dark value.
- To switch, set `data-theme` (light or dark) and `data-profile` (glacier, lavender, tangerine, matcha, nordic) on the app root; `components/bundle.css` re-points every role to that profile. In the app, do the same by swapping the role map in the theme provider.
- The Colour profiles card in Components shows all ten combinations side by side. Design screens in Glacier light; they work everywhere if they only use roles.

### Contrast

Checked in all ten combinations: `ink` on `background` and `surface`, `muted` on both, `action` as text on both, `on-action` on `action`, `on-fill` on `primary`, `done` and `accent`, and `danger` on both grounds all clear 4.5:1. Keep it that way: never put `muted` text on a fill, and never put white or `ink` text on a pastel fill in dark mode (use `on-fill`).

Status is never shown by colour alone: done rows also have a check badge, overdue rows carry the word "Overdue", due rows a dashed type tile, skipped rows a skip badge and strike-through, not logged rows the words "Not logged".

## Type

Two Google families: **Bricolage Grotesque** for display and **Nunito** for everything people read.

| Style | Face | Use |
|---|---|---|
| `screen-title` | Bricolage 800, 32 (28 to 34) | One per screen. 34 only on Today. |
| `section-title` | Bricolage 800, 22 | Sheet titles, section headers, empty states. |
| `pet-name` | Bricolage 700, 24 | Pet names in headers and cards. |
| `list-title` | Nunito 800, 17 | Task and list row titles. |
| `body` | Nunito 700, 16 | Running text. |
| `button` | Nunito 800, 16 | Buttons and tabs. |
| `secondary` | Nunito 600, 14 | Second lines: "Lisa · 08:10 · 120 g". |
| `caption` | Nunito 600, 13 | Helper text, chart labels. |
| `label` | Nunito 800, 13, 0.06em, uppercase | Small caps labels, in `action` or `muted`. |
| `guide-heading`, `guide-body` | Bricolage 700, 22; Nunito 600, 18 | Care guide only: larger and calmer. |

Separate facts in a second line with a middle dot and spaces: "Daan walked Mallow · 35 min · 07:20".

## Shape

- **Outlines:** 2.5 (`stroke-outline`) in `ink` on cards, rows, chips, buttons and inputs. Inactive or skipped things use `muted`, often dashed.
- **Hard shadows:** 3 right, 3 down, no blur, in `shadow` (`shadow-hard`; `shadow-hard-sm` for small buttons). `shadow` is the `ink` of the current mode, so in dark mode the shadow is light like the outlines (pure black disappeared on the dark backgrounds). Only on the selected or primary element. Pressing moves the element into its shadow.
- **Radius:** `radius-lg` (20) for cards and rows, `radius-md` (14) for buttons and inputs, `radius-pill` for chips, tags, the tab bar and the Log button, `radius-xl` (28) for sheet tops and dialogs, `radius-md` also for the task type tile, `radius-sm` (10) for small icon tiles and Day view tiles.
- **Stickers:** a 1 to 4 degree tilt (`tilt-sticker`) on badges and reminder cards only. Never rotate lists, inputs or anything with numbers people must read.
- **Tab bar:** a floating pill, `ink` in light mode and `surface` with an outline in dark mode, with the active tab as a `primary` pill.
- **Touch targets:** at least 44 x 44 (`size-touch`) with 8 between them.

## Spacing and layout

4-point steps: `space-1` (4) to `space-12` (48). Screen gutter `space-6` (24); 12 between rows and cards; 16 padding inside cards; 32 between screen sections. Scrolling screens end with `space-tab-clear` so the last row clears the tab bar and the Log button.

## Iconography

- Rounded line icons, 24 grid, 2.5 stroke, round caps and joins, no fills, matching the outlines. The set lives in Assets › Icons (49 icons: nine activity types, the four tabs plus Care guide, actions, and the List and Day view icons).
- The SVG files are drawn in Glacier `ink` (#121A2E). In the app, load them as components and set the stroke to the role colour (`currentColor`).
- Inside small buttons and tags use 16 to 20; in the tab bar 22 to 24.
- Every task shows its activity type icon in a tile at the start of the row, the same icon as in Log activity. Status sits on that tile (border and a corner badge), so the icon always says what the job is.
- **No emoji anywhere in the interface.**
- Every icon-only button has a screen reader label.

## Imagery

- **Pet photos:** circles with a 2 `ink` ring (`PetAvatar`). No photo: the first letter of the name on `primary`.
- **Illustrations:** optional, for empty states and onboarding only. Simple shapes in role colours with `ink` outlines. They must work for cats and dogs alike: bowls, balls, leads, paw prints. No faces or specific breeds.
- **Wordmark:** "Furkin" set in `wordmark` (Bricolage 800) in `ink` on `background`. No drawn logo exists yet.
- **App icon (placeholder):** the F sticker in Assets › Logos: the wordmark's F tilted 4 degrees with a hard offset shadow, ink on Glacier `primary` (light) and Glacier `primary` on ink (dark). It stays Glacier for every profile. Replace it when the final logo is supplied.

## Voice and copy

- Labels are plain and literal: "Done", "Add pet", "Invite", "Log", "Save". Delight goes in confirmations and empty states, never in labels people must understand.
- Confirmations can be cheeky: "Dinner logged. Mallow approves." Keep a pool of a few lines per activity type so they rarely repeat.
- Health and medication copy is always plain and exact: dose, time, who gave it. "Apoquel 16 mg given to Pepper by Lisa at 18:00."
- Late or early completion is shown neutrally, never as a failure.
- Metric units (g, kg, km, min) and 24-hour time by default, following the phone's locale.
- Archiving a pet is gentle and keeps history. It is never called "delete".
- The Care guide is calmer than the rest of the app: fewer outlines, larger text, no jokes.
- No em dashes in copy. Use a full stop, a comma or a middle dot.

## Motion

- **Task done:** the row fills with `done` and the check badge pops in on the type tile, about 300 ms, with a short haptic tap.
- **All done:** a small celebration on the Today header, such as a paw-print burst, with "Everyone's fed and walked. Nice work."
- **Swipes:** swipe a task right to complete it (the row fills with `done` past the threshold, light haptic); swipe a row left to show its actions: Edit and Delete for logs, Skip for open tasks. Deleting shows Undo for 5 s instead of a confirmation.
- **Sheets:** slide up 250 ms, ease-out; swipe down to close.
- **Pressed:** 90 ms move into the shadow.
- **Reduce Motion:** replace every movement with a simple fade; loading dots and skeletons hold still.

## States every data screen needs

Loading (skeleton rows, never spinners), empty (EmptyState), error with "Try again", offline (Banner, logs still work and sync later), and pull-to-refresh.

## Accessibility

- 4.5:1 text contrast in all five profiles, light and dark; large headings at least 3:1.
- Focus ring: 3 solid `action`, 2 outside the element (`stroke-focus`).
- VoiceOver and TalkBack read rows as one sentence that includes the task type: "Breakfast for Mallow, feeding, done by Lisa at 08:10."
- Dynamic Type to 130%, Reduce Motion, 44 targets with 8 between.

## Components

Every shared component is in Components with all its states and its own guidelines: Button, LogButton, TaskRow, SwipeRow, DateStrip, ViewToggle, DayView, Card, ActivityTile, Skeleton, PetChip, PetAvatar, PersonAvatar, RoleBadge, TextField, Pickers, SegmentedControl, Toggle, SearchSelect, TabBar, BottomSheet, Banner, EmptyState, ConfirmationDialog, WeightChart, ColourProfileOption. The web versions are CSS classes in `components/bundle.css` (prefix `fk-`) for previews and design work; build the native versions to match them.

**Intentional additions** beyond the brief's component list: `danger` and `on-danger` colours (destructive actions and errors had no role), `scrim`, the Skeleton component (the brief asks for skeleton loading), the Overdue tag inside TaskRow, the DateStrip, ViewToggle and DayView for moving through days and choosing how Today looks, and the Colour profiles and Icons showcase cards.
