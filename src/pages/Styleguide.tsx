import { SelvedgeRule } from '../components/SelvedgeRule'
import { cn } from '../lib/cn'
import SplitText from '../components/bits/SplitText'
import BlurText from '../components/bits/BlurText'
import ScrollReveal from '../components/bits/ScrollReveal'
import AnimatedContent from '../components/bits/AnimatedContent'
import FadeContent from '../components/bits/FadeContent'
import ShinyText from '../components/bits/ShinyText'
import Magnet from '../components/bits/Magnet'
import CircularGallery from '../components/bits/CircularGallery'
import Masonry from '../components/bits/Masonry'
import FlowingMenu from '../components/bits/FlowingMenu'
import LogoLoop, { type LogoItem } from '../components/bits/LogoLoop'
import { Logo } from '../components/brand/Logo'
import { usePageMeta } from '../lib/usePageMeta'

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
   React Bits fixtures
--------------------------------------------------------------------------- */

const CATALOGUE = [
  { code: 'JDT-2401', firm: 'Dreams TexFab' },
  { code: 'JDT-2412', firm: 'Dreams TexFab' },
  { code: 'JDT-2418', firm: 'Dreams TexFab' },
  { code: 'JDW-3104', firm: 'Designer World' },
  { code: 'JDW-3116', firm: 'Designer World' },
  { code: 'JDW-3122', firm: 'Designer World' },
]

const GALLERY_ITEMS = CATALOGUE.map((c, i) => ({
  image: `/placeholders/fabric-${(i % 6) + 1}.webp`,
  text: c.code
}))

const MASONRY_ITEMS = [
  { id: 'f1', img: '/placeholders/fabric-1.webp', url: '/sarees', height: 320 },
  { id: 'f2', img: '/placeholders/fabric-2.webp', url: '/lehengas', height: 420 },
  { id: 'f3', img: '/placeholders/fabric-3.webp', url: '/sarees', height: 360 },
  { id: 'f4', img: '/placeholders/fabric-4.webp', url: '/sarees', height: 280 },
  { id: 'f5', img: '/placeholders/fabric-5.webp', url: '/lehengas', height: 380 },
  { id: 'f6', img: '/placeholders/fabric-6.webp', url: '/sarees', height: 300 }
]

const FLOWING_ITEMS = [
  { link: '/sarees', text: 'Sarees', image: '/placeholders/fabric-1.webp' },
  { link: '/lehengas', text: 'Lehengas', image: '/placeholders/fabric-2.webp' },
  { link: '/collections', text: 'Collections', image: '/placeholders/fabric-3.webp' },
  { link: '/craft', text: 'Craft', image: '/placeholders/fabric-4.webp' }
]

const PARTNER_LOGOS: LogoItem[] = [
  { node: <span>Mulberry Boutique · Surat</span> },
  { node: <span>Vastra &amp; Co · Mumbai</span> },
  { node: <span>Nimbus · Bangalore</span> },
  { node: <span>Kothari Textiles · Delhi</span> },
  { node: <span>Ethnic Wardrobe · Kolkata</span> },
  { node: <span>Shriji Silk House · Ahmedabad</span> },
  { node: <span>House of Paisley · Chennai</span> },
  { node: <span>Veda Atelier · Hyderabad</span> }
]

function BitRow({
  index,
  name,
  restyle,
  children,
  height,
}: {
  index: string
  name: string
  restyle: string
  children: React.ReactNode
  height?: number
}) {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-zari/25 py-12 lg:grid-cols-[260px_1fr]">
      <div>
        <p className="font-utility text-xs text-ink-soft">{index}</p>
        <p className="mt-1 font-display text-xl">{name}</p>
        <p className="mt-3 text-sm text-ink-soft">{restyle}</p>
      </div>
      <div className={cn('relative', height ? '' : '')} style={height ? { minHeight: height } : undefined}>
        {children}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Styleguide page
--------------------------------------------------------------------------- */

export default function Styleguide() {
  usePageMeta({
    title: 'Styleguide · Design System',
    description: 'Internal token system and component preview.',
    robots: 'noindex, nofollow'
  })

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

        {/* 0 · The mark */}
        <div className="section-y">
          <SectionHeading
            index="00"
            title="The mark"
            blurb="One house mark, three variants, two firm lockups. Inline vector SVG with fill='currentColor'. Zero hardcoded hex. Scaled via viewBox with strict clear space."
          />
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* On --paper ground */}
            <div className="border border-zari/30 bg-paper p-8">
              <p className="eyebrow mb-6 text-ink-soft">On --paper ground (15:1 contrast)</p>
              
              <div className="space-y-8">
                <div>
                  <span className="font-utility text-xs text-ink-soft block mb-2">Wordmark (default 28px)</span>
                  <div className="inline-block p-4 border border-dashed border-zari/40">
                    <Logo variant="wordmark" height={28} className="text-ink" decorative />
                  </div>
                </div>

                <div>
                  <span className="font-utility text-xs text-ink-soft block mb-2">Monogram (default 28px · min 20px)</span>
                  <div className="flex items-center gap-6">
                    <div className="inline-block p-3 border border-dashed border-zari/40">
                      <Logo variant="monogram" height={28} className="text-ink" decorative />
                    </div>
                    <div className="inline-block p-2 border border-dashed border-zari/40">
                      <Logo variant="monogram" height={20} className="text-ink" decorative />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zari/20">
                  <div>
                    <span className="font-utility text-xs text-ink-soft block mb-2">Lockup · Janani Dreams TexFab</span>
                    <Logo variant="lockup" firm="jdt" height={22} className="text-ink" decorative />
                  </div>
                  <div>
                    <span className="font-utility text-xs text-ink-soft block mb-2">Lockup · Janani Designer World</span>
                    <Logo variant="lockup" firm="jdw" height={22} className="text-ink" decorative />
                  </div>
                </div>
              </div>
            </div>

            {/* On --ink ground */}
            <div className="border border-zari/30 bg-ink p-8 text-paper">
              <p className="eyebrow mb-6 text-paper/60">On --ink ground (15:1 contrast)</p>
              
              <div className="space-y-8">
                <div>
                  <span className="font-utility text-xs text-paper/60 block mb-2">Wordmark (default 28px)</span>
                  <div className="inline-block p-4 border border-dashed border-zari/40">
                    <Logo variant="wordmark" height={28} className="text-paper" decorative />
                  </div>
                </div>

                <div>
                  <span className="font-utility text-xs text-paper/60 block mb-2">Monogram (default 28px · min 20px)</span>
                  <div className="flex items-center gap-6">
                    <div className="inline-block p-3 border border-dashed border-zari/40">
                      <Logo variant="monogram" height={28} className="text-paper" decorative />
                    </div>
                    <div className="inline-block p-2 border border-dashed border-zari/40">
                      <Logo variant="monogram" height={20} className="text-paper" decorative />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-paper/20">
                  <div>
                    <span className="font-utility text-xs text-paper/60 block mb-2">Lockup · Janani Dreams TexFab</span>
                    <Logo variant="lockup" firm="jdt" height={22} className="text-paper" decorative />
                  </div>
                  <div>
                    <span className="font-utility text-xs text-paper/60 block mb-2">Lockup · Janani Designer World</span>
                    <Logo variant="lockup" firm="jdw" height={22} className="text-paper" decorative />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <SpecRow label="clear space">1x cap-height on all 4 sides, bounded by a 1px zari hairline</SpecRow>
            <SpecRow label="min height">Monogram: 20px · Wordmark: 28px</SpecRow>
            <SpecRow label="color rule">Inherits parent text-ink or text-paper class. Zari is never a fill on the mark.</SpecRow>
          </div>
        </div>

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

        <SelvedgeRule />

        {/* 7 · React Bits — integral to the system */}
        <div className="section-y">
          <SectionHeading
            index="07"
            title="React Bits — integral"
            blurb="Eleven components vendored and restyled to the token system. Defaults rebased: Bodoni Moda captions, paper-deep or ink grounds, signature easing, 600–800ms durations, no rounding, no shadows — these look like Janani now."
          />
          <p className="mb-10 max-w-2xl text-base text-ink-soft">
            Two notes for review: <span className="font-utility text-xs text-ink">ScrollReveal</span> and
            <span className="font-utility text-xs text-ink"> SplitText</span> animate on entering the viewport,
            so scroll into them. <span className="font-utility text-xs text-ink">LogoLoop</span>
            stands in for the retired <em>InfiniteScroll</em>; both come from React Bits and serve the same
            marquee intent.
          </p>

          <BitRow
            index="01 · text"
            name="SplitText"
            restyle="Per-word tween, 0.8s, cubic-bezier(0.16,1,0.3,1), 24px travel. Under reduced motion the text appears without splitting."
            height={120}
          >
            <SplitText
              tag="h3"
              text="The loom runs on discipline"
              className="font-display text-3xl leading-[1.1]"
            />
          </BitRow>

          <BitRow
            index="02 · text"
            name="BlurText"
            restyle="Settled blur of 6px, two-step keyframes, 0.4s each step, 120ms stagger between words. Reduced motion renders a static line."
            height={120}
          >
            <BlurText
              text="Wholesale. Not retail."
              className="font-display text-3xl leading-[1.1]"
            />
          </BitRow>

          <BitRow
            index="03 · scroll"
            name="ScrollReveal"
            restyle="Bodoni Moda 32 → 48, line-height 1.1, tracking tight. Rotation narrowed to 2°, blur 3px. Triggers and cleanups are scoped to the element — no leaks across sections."
            height={220}
          >
            <div className="space-y-2 bg-paper-deep p-8">
              <p className="font-utility text-xs text-ink-soft">Scroll the demo into view</p>
              <ScrollReveal>Every weave carries the house mark</ScrollReveal>
            </div>
          </BitRow>

          <BitRow
            index="04 · entry"
            name="AnimatedContent"
            restyle="48px travel, 0.8s, signature easing, opacity-on. Container overlaying the entry is positioned lower on this page so the effect is visible on scroll."
            height={180}
          >
            <AnimatedContent className="border border-zari/30 p-8">
              <p className="font-utility text-xs text-ink-soft">JDT-2401 · Banarasi silk</p>
              <p className="mt-3 font-display text-2xl">A counter that earns its place.</p>
            </AnimatedContent>
          </BitRow>

          <BitRow
            index="05 · entry"
            name="FadeContent"
            restyle="0.8s, signature easing, blur-on hidden at 6px. Disabled under reduced motion."
            height={120}
          >
            <FadeContent className="border border-zari/30 p-6">
              <p className="text-base">Twelve private-label cycles a year, all under one roof.</p>
            </FadeContent>
          </BitRow>

          <BitRow
            index="06 · accent"
            name="ShinyText"
            restyle="Zari shine on ink-or-paper type, six-second cycle, 160° spread, gentler anxiety. Stops under reduced motion."
            height={120}
          >
            <ShinyText
              text="Catalogue 2026 · request a copy"
              className="font-display text-3xl leading-[1.1]"
            />
          </BitRow>

          <BitRow
            index="07 · gesture"
            name="Magnet"
            restyle="Subtler pull (strength 3), transitions retimed to 0.7s / 0.8s with the signature cubic-bezier. Disabled under reduced motion."
            height={110}
          >
            <Magnet padding={80} magnetStrength={4}>
              <button className="border border-ink px-10 py-5 font-utility text-sm uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-fast ease-[cubic-bezier(0.16,1,0.3,1)]">
                Enquire
              </button>
            </Magnet>
          </BitRow>

          <BitRow
            index="08 · gallery"
            name="CircularGallery"
            restyle="Square corners (borderRadius 0), Bodoni Moda caption 28px 400, ink text colour by default. Wheel input scoped to the carousel so the page never double-scrolls, uTime wave halts under reduced motion."
            height={460}
          >
            <div className="h-[460px] w-full overflow-hidden border border-zari/25 bg-paper">
              <CircularGallery
                items={GALLERY_ITEMS}
                bend={1.2}
                textColor="#1a1a18"
                font='400 22px "Bodoni Moda", serif'
              />
            </div>
          </BitRow>

          <BitRow
            index="09 · grid"
            name="Masonry"
            restyle="No rounded corners, no drop shadow, no gradient overlay. Variable item heights, 24px gutter, hover scale at 0.97 with the signature easing, blue-focus reduced to 6px."
            height={600}
          >
            <div className="h-[600px] w-full">
              <Masonry items={MASONRY_ITEMS} />
            </div>
          </BitRow>

          <BitRow
            index="10 · nav"
            name="FlowingMenu"
            restyle="Full-screen overlay built on top of the house palette: ink ground, paper type, zari hairlines. Bodoni Moda 8vh link type, square image cells with a 1px zari/30 outline, marquee animation paused under reduced motion."
            height={420}
          >
            <div className="h-[420px] w-full overflow-hidden border border-zari/25">
              <FlowingMenu items={FLOWING_ITEMS} speed={15} />
            </div>
          </BitRow>

          <BitRow
            index="11 · marquee"
            name="LogoLoop"
            restyle="Stand-in for the retired InfiniteScroll. Default speed 60px/s, pause on hover, logo height 28px, gap 56px, monotonic heading rendered at 16px from the partner list. Grayscaled to 60% opacity, full opacity on hover."
            height={80}
          >
            <div className="border border-zari/25 p-6">
              <LogoLoop
                logos={PARTNER_LOGOS}
                renderItem={(item, _key) => (
                  <span className="font-utility text-sm font-utility whitespace-nowrap text-ink opacity-60 transition-opacity duration-fast ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:opacity-100 hover:opacity-100">
                    {(item as { node: React.ReactNode }).node}
                  </span>
                )}
              />
            </div>
          </BitRow>

          <p className="mt-12 font-utility text-xs text-ink-soft">
            Source: github.com/DavidHDev/react-bits · MIT + Commons Clause — used as part of this product, not redistributed standalone.
          </p>
        </div>
      </div>
    </main>
  )
}
