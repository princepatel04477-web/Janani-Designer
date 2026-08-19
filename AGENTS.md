# Janani — Project Rules (the constitution)

B2B showcase website for **Janani**, a family textile house with two firms:

- **Janani Dreams TexFab Pvt Ltd** — wholesale sarees
- **Janani Designer World** — wholesale designer lehengas

Audience: retail boutique owners, multi-brand store buyers, export agents placing bulk
orders. **Not** end consumers. There is no checkout — buyers browse designs and send
enquiries. No prices anywhere; price is on request.

Stack: **Vite + React + TypeScript, Tailwind CSS, Framer Motion, React Router.**
No CSS-in-JS. No UI kit beyond Tailwind and hand-built primitives.

---

## Design tokens (authoritative — src/styles/tokens.css)

### Colour
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F0EEE6` | page ground (cool greige) |
| `--paper-deep` | `#E4E1D6` | section alternation |
| `--ink` | `#1A1A18` | body text |
| `--ink-soft` | `#5C5A52` | secondary text |
| `--zari` | `#A8874B` | hairlines, rules, small accents **only — never fills** |
| `--neel` | `#1F3A5F` | Janani Dreams TexFab accent (indigo) |
| `--lac` | `#7A1F2B` | Janani Designer World accent (deep lac red) |

- Zari is used at 1px or as small caps text, **never** as a button fill or large block.
- Each brand uses its own accent; umbrella pages use ink and paper only.

### Type
- Display: **Bodoni Moda** — headings only, weight 400–500, tight tracking
- Body: **Karla** — all prose and UI, weights 400/500
- Utility: **JetBrains Mono** — design codes, MOQ figures, specs, eyebrows
- Scale: 72 / 48 / 32 / 24 / 18 / 16 / 14 / 12
- Body line-height 1.7, headings 1.1
- All copy sentence case; never Title Case; never ALL CAPS except mono eyebrows at 12px.

### Layout
- Max width 1440px. Content gutter 80px desktop, 24px mobile.
- Section vertical padding 160px desktop, 80px mobile.
- Border radius **0 everywhere**. This house does not use rounded corners.

### Motion
- Duration 600–800ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Nothing bouncy, nothing springy, nothing that overshoots.
- Wrap every animation in a `prefers-reduced-motion` guard.

### Signature element
- **Selvedge rule** — section dividers are a 2px band of repeating woven-pattern SVG
  in zari at 40% opacity, not a plain line. Build once as `<SelvedgeRule />` and use
  it as the only divider in the site.

## Banned (client rejected)
Terracotta/clay accents, warm cream backgrounds, gradient meshes, glassmorphism,
drop shadows, Playfair Display, rounded corners, all-caps body copy, marketing filler,
exclamation marks, checkout/cart/pricing.

## Voice
Established family textile house — confident, plain, specific about capability.
No marketing filler, no "elevate your inventory".

## Component whitelist (Prompt 2 — locked)

Only these React Bits components may be installed and styled into the site
(code is vendored under `src/components/bits` with attribution headers):

- **Text / motion**: SplitText, BlurText, ScrollReveal, AnimatedContent,
  FadeContent, ShinyText
- **Component**: CircularGallery, Masonry, FlowingMenu
- **Plain**: Magnet
- **Stand-in**: **LogoLoop** is used in place of the now-removed
  React Bits "InfiniteScroll" component (Prompt 5 needs a logo marquee;
  LogoLoop is the current canonical React-Bits marquee and ships with
  reduced-motion handling).

If a future prompt asks for anything even adjacent to **Ballpit, SplashCursor,
LetterGlitch, DecryptedText, FaultyTerminal, Cubes, Lanyard, PixelTransition,
Aurora, Iridescence, or any WebGL background** — say no. They read as
tech-startup and are wrong for a textile house.
