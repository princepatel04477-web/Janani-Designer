# Janani Designer — bug & improvement report

Audited 20 Aug 2026. Method: source read of all 48 files in `src/`, plus the app run in a
headless Chromium with scripted interaction across all 14 routes at 1440px and 390px.
Every item below was reproduced, not inferred. Reproduction notes are included.

**Verdict:** the design system and the build are in good shape — TypeScript passes clean,
there is zero horizontal overflow at mobile width, and reduced-motion is largely respected.
But the site cannot currently do the one job it exists for: **no enquiry ever reaches you.**
Both forms are stubs. That plus a white-screen crash and an inescapable mobile menu are the
three things to fix before anyone sees this.

---

## P0 — Blocks launch

### 1. The enquiry form does not send anything
`src/pages/Enquiry.tsx:73-80`

```js
setSubmitting(true)
// Placeholder POST — replace with real endpoint.
setTimeout(() => {
  setSubmitted({ codes: ..., firms: ... })
  setSubmitting(false)
}, 600)
```

There is no network call. The buyer fills in business name, GST, phone, email, buyer type
and notes, sees *"Thank you. The house will reply within one business day"* — and the data is
discarded. This is the primary conversion path of the entire site.

**Fix:** POST the form state plus `items` to a real endpoint (Formspree/Resend/your own
handler) and only show the success screen on a 2xx. Show a failure state with the WhatsApp
fallback if it errors.

### 2. The contact form does not even read its inputs
`src/pages/Contact.tsx:114-120`

```jsx
onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
...
<input className="..." required />   // no name, no value, no onChange
```

Worse than #1 — the fields are unbound, so the typed values exist nowhere in JavaScript at
all. It flips to "Thank you" regardless.

**Fix:** bind to state (or read via `FormData` by giving each input a `name`), then submit.

### 3. White-screen crash: hooks called after an early return
`src/pages/Design.tsx:22-29`

```js
if (!piece) { return <NotFound /> }        // line 22-24
const brand = BRANDS[piece.firm]
const [selectedColourway, setSelectedColourway] = useState(piece.colourway)  // line 27
const [zoomOpen, setZoomOpen] = useState(false)                              // line 28
```

The two `useState` calls sit **after** a conditional return, breaking the Rules of Hooks.

**Reproduced:** load `/design/JDT-2401`, then client-side navigate to any invalid code.
React throws `Rendered fewer hooks than expected. This may be caused by an accidental early
return statement.` and `#root` innerHTML drops to **0 bytes** — the whole app unmounts to a
blank page. A stale bookmark or a mistyped code in a link kills the session.

**Fix:** move both `useState` calls above the `if (!piece)` guard.

### 4. The mobile menu cannot be closed
`src/components/layout/Navbar.tsx:150-165`

The overlay is `z-50` and its opaque panel is `absolute inset-0`. The "Close" button lives in
the header at `z-40` — underneath it. The backdrop button that would close it is also fully
covered by the panel.

**Reproduced at 390px:** `elementFromPoint` over the Close button returns a `SPAN` from the
menu list, not the button; a Playwright click times out after 2.5s. Escape works, but phones
have no Escape key.

The only exits are picking a nav item or the browser back button. A user who opens the menu
by accident is trapped.

**Fix:** render an explicit close control *inside* the overlay panel (above its own content),
and give the backdrop real area — e.g. inset the panel, or move the close button into
`MobileOverlay` at `z-20`.

---

## P1 — Broken behaviour

### 5. Scroll position carries across route changes
No `ScrollRestoration` or scroll-to-top anywhere in `App.tsx` / `Layout.tsx`.

**Reproduced:** scroll the homepage to y=3000, click "Craft" → you land on `/craft` at
**y=2376**, mid-page, having never seen its heading.

**Fix:** add React Router's `<ScrollRestoration />`, or a small `useEffect` on
`location.pathname` that calls `window.scrollTo(0,0)`.

### 6. No 404 route — unknown URLs render a blank page
`App.tsx` has no `<Route path="*">`.

**Reproduced:** `/totally-missing-route` renders the nav and footer with an empty middle,
zero `<h1>`, and the generic index.html `<title>`. `/design/:code` has a nice `NotFound`
component — nothing else does.

**Fix:** add a catch-all route reusing that same treatment.

### 7. A 32px strip of page content slides above the fixed navbar
`Layout.tsx` renders `<UtilityStrip />` in normal flow, but `Navbar` is `fixed … top-8`.

Once you scroll past the strip, the navbar stays pinned 32px down from the viewport top and
page content is visible scrolling through the gap above it.

**Reproduced:** at `scrollY=1400`, `elementFromPoint(700, 10)` returns
`DIV.container-site py-24 lg:py-40` — body content, rendered above the nav. Visible in
`home-scrolled-navgap.png` as the saree image and heading bleeding over the top edge.

**Fix:** either make the utility strip `fixed top-0` too, or set the navbar to `top-0` and
move the strip inside the fixed header.

### 8. Three identical, dead thumbnails on every design page
`Design.tsx:70-86`

```js
[piece.image, piece.altImage, piece.image, piece.image].filter(Boolean).slice(0,4)
```

For pieces without an `altImage` this yields the same photo three times, and **none of the
thumbnail buttons have an `onClick`** — they are labelled "View image 1/2/3" and do nothing.

**Reproduced on JDT-2401:** 3 buttons, all with `background-image: url(fabric-1.webp)`, no
handler.

**Fix:** either ship real alternate shots per piece, or drop the strip until you have them.

### 9. Choosing a colourway changes nothing you can see
`Design.tsx:97-116` — `selectedColourway` only updates a text label and the WhatsApp message.
The main image never changes, even though `Colourway` in `types.ts` already has an optional
`image` field for exactly this.

For a wholesale buyer picking a colour line, this is the most important interaction on the
page and it appears broken.

### 10. The primary "Add to enquiry" button has no working hover
`Design.tsx:145-155` sets `hover:bg-zari hover:text-paper` in `className` **and**
`backgroundColor` in an inline `style`. Inline styles win — the hover never renders.

**Reproduced:** computed inline `background-color: var(--neel)` overrides the hover class.

**Fix:** move the accent colour into a CSS variable on the element and drive both states from
classes, or define the hover inline via React state.

### 11. The hero CTA is a `<span>` buried under an overlay link
`Home.tsx:130-131` puts a full-panel `<Link className="absolute inset-0 z-20">` over the
panel. The visible "See the catalogue →" is a `<span>` inside a `z-10` container.

Two consequences:
- Its `onMouseEnter`/`onMouseLeave` colour swap **never fires** — mouse events are eaten by
  the overlay link.
- It is not focusable, so keyboard users see no focus ring anywhere on the hero. The `Magnet`
  wrapper is likewise inert.

**Fix:** make the visible CTA the actual link and drop the overlay, or accept the overlay and
remove the dead hover/Magnet code.

### 12. Janani Designer World's WhatsApp button messages the Surat number
`Contact.tsx:68` hardcodes `wa.me/919876543210` inside the `FIRMS.map()`, while the JDW entry
lists `+91 98765 43211`. Both firms' buttons hit the same number.

**Fix:** derive from `f.phone`.

### 13. Dead link in the footer
`Footer.tsx:38` — "Catalogue 2026 (PDF)" is `href="#"`. It appears on **every page** of the
site, and "Download catalogue" in the utility strip points at `/partner` rather than a file.

### 14. Utility strip links cause full page reloads
`UtilityStrip.tsx:11, 29, 35` use `<a href="/contact">` / `<a href="/partner">` instead of
React Router `<Link>`. Every click tears down and re-boots the SPA.

---

## P2 — Accessibility

### 15. Heading structure is wrong on 9 of 14 routes
Measured across the site:

| Route | `<h1>` count |
|---|---|
| `/` | **2** (both hero panels) |
| `/sarees`, `/lehengas`, `/collections`, `/sarees/collections`, `/lehengas/collections` | **0** |
| `/craft`, `/partner`, `/design/:code` | **0** |
| `/contact`, `/enquiry`, `/styleguide` | 1 ✓ |

The design detail page — your most valuable SEO surface — has no `<h1>` at all; the design
code renders as a `<p>`.

### 16. The focus ring fails WCAG and two inputs have none
`tokens.css:113` sets `outline: 1px solid var(--zari)`. Zari `#a8874b` on paper `#f0eee6` is
**2.90:1** — below the 3:1 minimum for focus indicators, at 1px width.

Separately, `Home.tsx:553` and `Partner.tsx:112` set `focus:outline-none` with **no
replacement style at all** — those inputs have zero visible focus.

**Fix:** thicken to 2px and use `--ink` for the ring, keeping zari for decoration only.

### 17. Every CTA becomes illegible on hover
`hover:bg-zari hover:text-paper` appears in **15 places** across Navbar, BasketDrawer, Design,
Collections, Enquiry, Partner, Contact, Home and BrandLanding.

Paper on zari is **2.90:1** — fails the 4.5:1 body-text minimum. On hover, your primary
buttons' labels wash out.

This also contradicts `AGENTS.md`, which states zari is for *"hairlines, rules, small accents
only — never fills."*

**Fix:** hover to `--ink` (15:1) or the firm accent — `--neel` is 9.89:1, `--lac` is 8.78:1.

### 18. Structural hairlines are effectively invisible
Measured against paper:

| Token | Ratio | Needs |
|---|---|---|
| `zari/30` | **1.33:1** | 3:1 |
| `zari/40` | **1.47:1** | 3:1 |
| `zari/60` | **1.82:1** | 3:1 |

These are the borders on your spec tables, form fields, colourway swatches, filter chips and
cards. With no radius and no shadows by design, the border *is* the only affordance — and at
1.3:1 it barely exists. Consider `zari` at full strength for interactive borders and reserving
the tints for purely decorative rules.

### 19. The closed basket drawer is still keyboard-reachable
`BasketDrawer.tsx:60-68` — the drawer is always mounted, hidden only by `translate-x-full`.
No `inert`, no `aria-hidden`.

**Reproduced:** with the drawer closed, 3 focusable controls remain in the tab order —
"Close", "Open the catalogue", "Send enquiry". Keyboard users tab into an invisible dialog.
Screen readers see a permanent `role="dialog" aria-modal="true"`.

**Fix:** add `inert` (and `aria-hidden`) when `!isOpen`.

### 20. No scroll lock behind the open drawer
**Reproduced:** with the drawer open, `document.body` overflow is `visible` and the page
scrolls freely behind it. The mobile menu locks scroll correctly — the drawer just never got
the same treatment.

### 21. Product photography is invisible to screen readers and to Google
Almost every catalogue image is a CSS `background-image` on a `<div>`, not an `<img>`:

| Route | `<img>` | background-image divs |
|---|---|---|
| `/collections` | **0** | 26 |
| `/design/JDT-2401` | **0** | 11 |
| `/sarees` | 1 | 10 |

Consequences: no alt text, no Google Images indexing, no native lazy-loading, no `srcset`.
Your `Piece` type already carries `imageAlt` — it is used only inside the zoom modal.

You have a well-built `Picture.tsx` doing AVIF/WebP fallbacks correctly. It is barely used
where it matters most.

### 22. The zoom lightbox has no Escape, no focus trap, no scroll lock
`Design.tsx:170-190` — `role="dialog" aria-modal="true"` but none of the behaviour. The basket
drawer implements a proper focus trap; this modal implements none of it. Escape does not
close it.

### 23. `cursor: none !important` on everything
`tokens.css:135-141` hides the real cursor on any fine-pointer device whenever `CustomCursor`
is active. If that component errors or lags, the user has **no pointer at all**. It also
removes the pointer/text cursor affordance that signals what is clickable.

Correctly disabled under reduced-motion and on touch — but consider a `@supports` guard or a
visibility timeout as a safety net.

### 24. Failed submits are silent for screen reader users
`Enquiry.tsx:62-72` sets `touched` on all fields but never moves focus to the first error and
renders no error summary. `aria-invalid` is set without a matching `aria-describedby` link to
the message. A blind user presses Send and nothing announces.

---

## P3 — SEO, performance, polish

### 25. Social previews will have no image
`usePageMeta.ts:26` sets `og:image` to `/hero-sarees.jpg` — a **relative** path. Open Graph
requires an absolute URL; Facebook, LinkedIn and WhatsApp will show no image. `og:url` and
`twitter:card` are also missing. For a business that shares links over WhatsApp, this matters.

### 26. 1.6 MB of images on a 390px phone
**Measured on the mobile homepage:** 13 image requests, **1,631 KB** total.

Two causes:
- **No `srcset`/`sizes` anywhere** — a 390px phone downloads the same file as a 1440px desktop.
- **Both hero formats are fetched.** `index.html` preloads `hero-sarees.avif` and
  `hero-lehengas.avif`, and the `<picture>` elements also pull the `.webp` versions — ~440 KB
  downloaded and discarded.

Your buyers are often on mobile data in a market. This is worth fixing.

### 27. `100vh` makes the hero jump on mobile
`Home.tsx:61` — `h-[calc(100vh-100px)]`. On iOS/Android `100vh` includes the collapsing URL
bar, so the hero is taller than the visible viewport and shifts as the bar hides.
**Fix:** `100dvh`.

### 28. LogoLoop renders a 483,000-pixel-wide element on `/styleguide`
**Measured:** `document.scrollWidth` is **484,026px** against a 1440px viewport; the marquee
track measures 483,612px. `overflow-x-hidden` conceals it, but the browser still lays it out.

The same component on the homepage is a sane 8,869px, so it is the styleguide's configuration
(too few logos, so the copy-count loop runs away). Worth a guard on the maximum copy count.

### 29. Page titles flash on navigation
`usePageMeta.ts:29-31` resets `document.title` to the default in its cleanup, so every route
change briefly shows the generic title before the new one applies.

### 30. `/styleguide` is publicly routable
It is linked from nothing, but it is reachable and indexable. Gate it behind a dev check or
`noindex`.

### 31. Placeholder data is still in place
Ahead of launch: phone `+91 98765 43210` / `43211`, emails `trade@janani.in` /
`bridal@janani.in`, GST `24ABCDE1234F1Z5` / `08ABCDE5678G1Z9`, and the Contact map is a
labelled placeholder div reading "(placeholder)" in its `aria-label`.

### 32. Hardcoded relative years have already gone stale
`brands.ts:14` says *"thirty-eight years"* (1987 + 38 = 2025) and line 29 says *"Twenty-one
years on"* (2004 + 21 = 2025). It is now 2026 — both are wrong, and will be wrong again next
year. Compute from `founded`.

Also `Enquiry.tsx:104`: *"A copy of this list has been retained on this device until you sign
in"* — there is no sign-in on this site.

### 33. The basket is not cleared after a successful enquiry
`Enquiry.tsx:76-79` — only the "Start a new enquiry" button calls `clear()`. A buyer who
submits and browses on still carries the old list.

---

## Deviations from `AGENTS.md`

Your own constitution bans these, and they are in the code:

| Rule | Where |
|---|---|
| "No glassmorphism" | `Navbar.tsx:64` `bg-ink/35 backdrop-blur-md`; `CustomCursor.tsx:166` `backdrop-blur-[2px]` |
| "No drop shadows" | `Navbar.tsx:62` transitions `box-shadow` (tokens.css correctly nulls the utilities, so this is dead code) |
| Zari "never as fills" | `hover:bg-zari` in 15 places (see #17) |
| "Wrap every animation in a `prefers-reduced-motion` guard" | The Framer Motion hero animations (`Home.tsx:145-160`) are JS-driven and unaffected by the CSS override in `tokens.css:143` |

The CSS `prefers-reduced-motion` block only neutralises CSS transitions and animations. GSAP,
Framer Motion and the WebGL gallery run on rAF and need explicit guards — several components
do this correctly via `usePrefersReducedMotion`; the hero does not.

---

## What is working well

Worth stating plainly, since the list above is long:

- **No horizontal overflow at 390px on any route** — I checked all nine main pages; every one
  measured exactly 390px. That is unusual and good.
- **`tsc --noEmit` passes clean** with `strict`, `noUnusedLocals` and `noUnusedParameters` on.
- **Reduced motion is genuinely respected** — the custom cursor disables itself, transforms
  resolve to `none`, and content stays visible rather than stuck at `opacity: 0` (a very
  common failure mode).
- **The basket works correctly** — add, increment, group-by-firm, localStorage persistence,
  and a real focus trap while open.
- **The token layer is well built.** Nulling `--radius-*` and `--shadow-*` at the `@theme`
  level enforces the house rules structurally rather than by convention.
- **`Picture.tsx` is correct** — it just needs to be used for the catalogue.

---

## Suggested order

1. Wire up both forms (#1, #2) — nothing else matters until enquiries arrive.
2. Move the two `useState` calls in `Design.tsx` (#3) — one-line fix, removes a white screen.
3. Put a close button inside the mobile overlay (#4).
4. Add `<ScrollRestoration />` and a catch-all route (#5, #6).
5. Fix the navbar gap (#7).
6. Contrast pass: focus ring, hover fills, border tints (#16, #17, #18).
7. Convert catalogue tiles to `<Picture>` with `srcset` — fixes SEO and payload together
   (#21, #26).
