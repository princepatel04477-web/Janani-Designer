import { SelvedgeRule } from '../components/SelvedgeRule'
import { cn } from '../lib/cn'

/* ---------------------------------------------------------------------------
   Styleguide helpers
--------------------------------------------------------------------------- */

const COLOURS = [
  { token: '--paper', hex: '#F0EEE6', usage: 'page ground — cool greige', swatch: 'bg-paper border border-ink/15', hexText: 'text-ink' },
  { token: '--paper-deep', hex: '#E4E1D6', usage: 'section alternation', swatch: 'bg-paper-deep', hexText: 'text-ink' },
  { token: '--ink', hex: '#1A1A18', usage: 'body text, near-black', swatch: 'bg-ink', hexText: 'text-paper' },
  { token: '--ink-soft', hex: '#5C5A52', usage: 'secondary text', swatch: 'bg-ink-soft', hexText: 'text-paper' },
  { token: '--zari', hex: '#A8874B', usage: 'hairlines, rules, small accents only', swatch: 'bg-zari', hexText: 'text-paper' },
  { token: '--neel', hex: '#1F3A5F', usage: 'Janani Dreams TexFab accent', swatch: 'bg-neel', hexText: 'text-paper' },
  { token: '--lac', hex: '#7A1F2B', usage: 'Janani Designer World accent', swatch: 'bg-lac', hexText: 'text-paper' },
] as const

const TYPE_SCALE = [
  { size: 72, cls: 'text-4xl', kind: 'display', label: 'Display / hero figures' },
  { size: 48, cls: 'text-3xl', kind: 'display', label: 'Section headings' },
  { size: 32, cls: 'text-2xl', kind: 'display', label: 'Sub headings' },
  { size: 24, cls: 'text-xl', kind: 'display', label: 'Small headings, design codes' },
  { size: 18, cls: 'text-lg', kind: 'body', label: 'Lead / positioning copy' },
  { size: 16, cls: 'text-base', kind: 'body', label: 'Body — line-height 1.7' },
  { size: 14, cls: 'text-sm', kind: 'body', label: 'Small print, captions' },
  { size: 12, cls: 'text-xs', kind: 'utility', label: 'Eyebrows (uppercase, mono)' },
] as const

function SectionHeading({
  index,
  title,
  blurb,
}: {
  index: string
  title: string
  blurb: string
}) {
  return (
    <div className="mb-14">
      <p className="eyebrow mb-4">{index}</p>
      <h2 className="text-3xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base text-ink-soft">{blurb}</p>
      <div className="mt-8 h-2" />
      <SelvedgeRule />
    </div>
  )
}

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-zari/25 py-3 sm:grid-cols-[220px_1fr]">
      <span className="font-utility text-xs text-ink-soft">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Styleguide page
--------------------------------------------------------------------------- */

export default function Styleguide() {
  return (
    <main className="section-y">
      <div className="container-site">
        {/* Header */}
        <p className="eyebrow mb-6">Janani · design system · v1</p>
        <h1 className="text-4xl">Styleguide</h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-soft">
          The token system every page inherits. Colour, type, layout, motion and
          the selvedge rule — reviewed here before any page is built.
        </p>
        <div className="mt-16" />
        <SelvedgeRule />

        {/* 1 · Colour */}
        <div className="section-y">
          <SectionHeading
            index="01"
            title="Colour"
            blurb="Seven tokens. Zari is a rule metal, not a fill. Each firm keeps its own accent; umbrella pages use ink and paper only."
          />
          <div className="grid grid-cols-2 gap-px bg-zari/20 sm:grid-cols-3 lg:grid-cols-4">
            {COLOURS.map((c) => (
              <div key={c.token} className="bg-paper">
                <div className={cn('flex h-28 items-end p-4', c.swatch)}>
                  <span className={cn('font-utility text-xs', c.hexText)}>{c.hex}</span>
                </div>
                <div className="p-4">
                  <p className="font-utility text-xs">{c.token}</p>
                  <p className="mt-1 text-sm text-ink-soft">{c.usage}</p>
                </div>
              </div>
            ))}
            <div className="flex h-full min-h-40 flex-col justify-between p-4">
              <p className="font-utility text-xs">The zari rule</p>
              <p className="mt-2 text-sm text-ink-soft">
                Zari appears at 1px — hairlines, rules, outlines, small caps text.
                Never a button fill, never a large block.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <SpecRow label="background">--paper on body, --paper-deep for alternating sections</SpecRow>
            <SpecRow label="text">--ink body · --ink-soft secondary · never grey-on-grey below AA</SpecRow>
            <SpecRow label="accents">--neel = Janani Dreams TexFab · --lac = Janani Designer World</SpecRow>
          </div>
        </div>

        <SelvedgeRule />

        {/* 2 · Type */}
        <div className="section-y">
          <SectionHeading
            index="02"
            title="Type"
            blurb="Bodoni Moda for headings only. Karla for all prose and UI. JetBrains Mono for codes, figures and eyebrows. Sentence case throughout — the only uppercase in the system is the 12px mono eyebrow."
          />
          <div className="grid gap-px bg-zari/20 sm:grid-cols-3">
            <div className="bg-paper p-6">
              <p className="eyebrow mb-6">Display</p>
              <p className="font-display text-3xl">Bodoni Moda</p>
              <p className="mt-3 font-display text-lg">400–500 weight · tight tracking</p>
            </div>
            <div className="bg-paper p-6">
              <p className="eyebrow mb-6">Body</p>
              <p className="text-3xl">Karla</p>
              <p className="mt-3 text-base">400/500 weight · line-height 1.7</p>
            </div>
            <div className="bg-paper p-6">
              <p className="eyebrow mb-6">Utility</p>
              <p className="font-utility text-2xl">JDT-2401</p>
              <p className="mt-3 font-utility text-sm">design codes · MOQ · specs</p>
            </div>
          </div>

          <div className="mt-16">
            <p className="eyebrow mb-8">Scale · 72 / 48 / 32 / 24 / 18 / 16 / 14 / 12</p>
            <div className="divide-y divide-zari/20 border-y border-zari/20">
              {TYPE_SCALE.map((t) => (
                <div key={t.size} className="grid grid-cols-1 items-baseline gap-2 py-5 sm:grid-cols-[120px_1fr]">
                  <div className="flex items-baseline gap-3">
                    <span className="font-utility text-xs text-ink-soft">{t.size}px</span>
                    <span className="font-utility text-xs text-ink-soft">{t.kind}</span>
                  </div>
                  <p className={cn(t.cls, t.kind === 'utility' && 'font-utility')}>
                    {t.size === 12 ? 'WHOLESALE ENQUIRY · MOQ 24' : 'The loom runs on discipline'}
                  </p>
                  <span className="hidden text-xs text-ink-soft sm:col-span-2 sm:block">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <SpecRow label="headings">Bodoni Moda 400–500 · line-height 1.1 · letter-spacing −0.01em</SpecRow>
            <SpecRow label="body">Karla · line-height 1.7 · sentence case only</SpecRow>
            <SpecRow label="eyebrow">JetBrains Mono 12px · 500 · letter-spacing 0.18em · uppercase</SpecRow>
            <SpecRow label="never">Title Case · ALL CAPS outside eyebrows · Playfair Display</SpecRow>
          </div>
        </div>

        <SelvedgeRule />

        {/* 3 · Layout */}
        <div className="section-y">
          <SectionHeading
            index="03"
            title="Layout"
            blurb="One container, one rhythm. Max width 1440, an 80px gutter on desktop and 24px on mobile, 160px of vertical padding per section on desktop and 80px on mobile. Radius is zero everywhere — this house does not round corners."
          />
          <div className="border border-zari/40 p-3">
            <div className="border border-dashed border-zari/40 px-6 py-10 sm:px-10 lg:px-20">
              <div className="border border-ink/15 p-6 text-center">
                <p className="font-utility text-xs text-ink-soft">content — max-width 1440px</p>
                <p className="mt-2 text-sm text-ink-soft">
                  gutter 24px mobile · 80px desktop
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <SpecRow label="container">.container-site — max-width 1440px, centered</SpecRow>
            <SpecRow label="gutter">80px ≥1024px · 24px below</SpecRow>
            <SpecRow label="section padding">160px ≥1024px · 80px below</SpecRow>
            <SpecRow label="divider">the selvedge rule — the only divider on the site</SpecRow>
          </div>
        </div>

        <SelvedgeRule />

        {/* 4 · Motion */}
        <div className="section-y">
          <SectionHeading
            index="04"
            title="Motion"
            blurb="Slow, calm, deliberate. Nothing bouncy, nothing springy, nothing that overshoots. Every animation carries a prefers-reduced-motion guard."
          />
          <div className="mt-6">
            <SpecRow label="duration fast">600ms</SpecRow>
            <SpecRow label="duration slow">800ms</SpecRow>
            <SpecRow label="easing">cubic-bezier(0.16, 1, 0.3, 1) — fast start, long settle</SpecRow>
            <SpecRow label="reduced motion">all animation and transition durations collapse to ~0</SpecRow>
          </div>
        </div>

        <SelvedgeRule />

        {/* 5 · Signature */}
        <div className="section-y">
          <SectionHeading
            index="05"
            title="Signature — the selvedge rule"
            blurb="The house divider. A 2px band of repeating woven-pattern SVG in zari at 40% opacity. Used between every section — never a plain line."
          />
          <div className="bg-paper-deep px-6 py-16">
            <div className="container-site p-0">
              <p className="font-utility text-xs text-ink-soft">section end · paper-deep</p>
              <p className="mt-6 text-lg">Wholesale sarees and designer lehengas, from one family loom-room to your shelves.</p>
              <div className="mt-10" />
              <SelvedgeRule />
              <div className="mt-10" />
              <p className="font-utility text-xs text-ink-soft">section start · paper</p>
            </div>
          </div>
        </div>

        <SelvedgeRule />

        {/* 6 · Rules of the house */}
        <div className="section-y">
          <SectionHeading
            index="06"
            title="Rules of the house"
            blurb="Rejected by the client and banned from this build — they read as generic."
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'Terracotta or clay accents',
              'Warm cream backgrounds',
              'Gradient meshes',
              'Glassmorphism',
              'Drop shadows',
              'Playfair Display',
              'Rounded corners',
              'Marketing filler copy',
              'Exclamation marks',
              'Checkout, cart or pricing',
            ].map((rule) => (
              <li key={rule} className="flex items-baseline gap-3 border border-zari/30 px-4 py-3 text-sm">
                <span aria-hidden="true" className="text-zari">✕</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
