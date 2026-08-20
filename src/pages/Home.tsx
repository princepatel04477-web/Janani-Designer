import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'
import SplitText from '../components/bits/SplitText'
import BlurText from '../components/bits/BlurText'
import ShinyText from '../components/bits/ShinyText'
import Magnet from '../components/bits/Magnet'
import FlowingMenu from '../components/bits/FlowingMenu'
import CircularGallery from '../components/bits/CircularGallery'
import LogoLoop, { type LogoItem } from '../components/bits/LogoLoop'
import { Logo } from '../components/brand/Logo'
import { SelvedgeRule } from '../components/SelvedgeRule'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/motion/Reveal'
import { ImageDrape } from '../components/motion/ImageDrape'
import { BRANDS } from '../data/brands'
import { CAPABILITIES, LEGACY, PARTNERS, PIECES } from '../data/pieces'
import { cn } from '../lib/cn'

const GALLERY = PIECES.slice(0, 8).map(p => ({ image: p.image, text: p.code }))

const DEPARTMENTS = [
  {
    link: '/sarees',
    text: 'Janani Dreams TexFab',
    image: '/hero-sarees.webp'
  },
  {
    link: '/lehengas',
    text: 'Janani Designer World',
    image: '/hero-lehengas.webp'
  },
  {
    link: '/craft',
    text: 'Karigars & Looms',
    image: '/placeholders/fabric-3.webp'
  },
  {
    link: '/partner',
    text: 'Commercial & Export Terms',
    image: '/placeholders/fabric-4.webp'
  }
]

const PARTNER_LOGOS: LogoItem[] = PARTNERS.map(p => ({
  node: <span className="font-utility text-sm">{p.name} · {p.city}</span>
}))

const EASE = [0.16, 1, 0.3, 1] as const

/* --------------------------------------------------------------------------
   Split hero
-------------------------------------------------------------------------- */

function HomeHero() {
  const [hovered, setHovered] = useState<'jdt' | 'jdw' | null>(null)

  return (
    <section
      aria-label="Janani — two firms"
      className="relative isolate h-[calc(100svh-100px)] min-h-[580px] w-full overflow-hidden border-b border-zari/30"
    >
      <h1 className="sr-only">Janani — Wholesale Sarees &amp; Designer Lehengas</h1>
      <div className="flex h-full flex-col lg:flex-row">
        <HeroPanel
          firm="jdt"
          hovered={hovered}
          setHovered={setHovered}
          image="/hero-sarees.webp"
          alt="Janani Dreams TexFab — wholesale sarees"
          eyebrow="Janani Dreams TexFab · Established 2016"
          heading="Sarees"
          copy="Wholesale sarees, woven and woven-finished under one roof."
          link="/sarees"
        />
        <HeroPanel
          firm="jdw"
          hovered={hovered}
          setHovered={setHovered}
          image="/hero-lehengas.webp"
          alt="Janani Designer World — wholesale designer lehengas"
          eyebrow="Janani Designer World · Established 2016"
          heading="Lehengas"
          copy="Wholesale designer lehengas, embroidered and finished in-house."
          link="/lehengas"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 right-0 top-1/2 z-10 h-px w-full -translate-y-1/2 bg-zari opacity-60 lg:inset-y-0 lg:left-1/2 lg:top-0 lg:h-full lg:w-px lg:-translate-x-1/2 lg:translate-y-0"
      />
    </section>
  )
}

function HeroPanel({
  firm,
  hovered,
  setHovered,
  image,
  alt,
  eyebrow,
  heading,
  copy,
  link
}: {
  firm: 'jdt' | 'jdw'
  hovered: 'jdt' | 'jdw' | null
  setHovered: (f: 'jdt' | 'jdw' | null) => void
  image: string
  alt: string
  eyebrow: string
  heading: string
  copy: string
  link: string
}) {
  const reducedMotion = usePrefersReducedMotion()
  const isHovered = hovered === firm
  const otherHovered = hovered !== null && hovered !== firm
  const accent = firm === 'jdt' ? 'var(--neel)' : 'var(--lac)'

  return (
    <motion.div
      onMouseEnter={() => setHovered(firm)}
      onMouseLeave={() => setHovered(null)}
      animate={{
        flexBasis: reducedMotion ? '50%' : isHovered ? '58%' : otherHovered ? '42%' : '50%'
      }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
      className="relative isolate h-1/2 overflow-hidden bg-ink lg:h-full lg:flex-[1_1_0%]"
    >
      <motion.div
        animate={{ scale: !reducedMotion && isHovered ? 1.05 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
        className="absolute inset-0 h-full w-full"
      >
        <Picture
          src={image}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/30"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: isHovered ? 0.4 : 0.25 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: accent }}
      />
      <motion.div
        animate={{ opacity: !reducedMotion && otherHovered ? 0.6 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 pt-24 text-paper sm:px-10 lg:px-16"
      >
        <Logo variant="monogram" decorative height={28} className="mb-4 text-paper opacity-90" />
        <p className="font-utility text-xs uppercase tracking-[0.18em] text-paper/90 font-medium">
          {eyebrow}
        </p>
        <SplitText
          tag="h2"
          text={heading}
          className="mt-4 block font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-paper"
          duration={0.8}
          delay={0.18}
        />
        <p className="mt-5 max-w-md text-lg text-paper/90">{copy}</p>
        <div className="mt-8 inline-block">
          <Magnet padding={40} magnetStrength={3}>
            <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.12 }}>
              <Link
                to={link}
                className="inline-flex items-center border border-paper px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-paper bg-transparent hover:bg-paper hover:text-ink transition-colors duration-base ease-signature focus-visible:outline-2 focus-visible:outline-paper"
              >
                See the catalogue →
              </Link>
            </motion.div>
          </Magnet>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* --------------------------------------------------------------------------
   Legacy strip
-------------------------------------------------------------------------- */

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const start = performance.now()
          const dur = 1200
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / dur)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(eased * to))
            if (t < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to])

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

function LegacyStrip() {
  const items = [
    { value: LEGACY.year, suffix: '', label: 'Established' },
    { value: LEGACY.karigars, suffix: '+', label: 'Karigars employed' },
    { value: LEGACY.cities, suffix: '+', label: 'Cities served' },
    { value: LEGACY.piecesPerMonth, suffix: '+', label: 'Pieces per month' }
  ]
  return (
    <section aria-label="Legacy" className="bg-paper-deep">
      <div className="container-site py-24 lg:py-32">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {items.map((it, i) => (
              <li
                key={it.label}
                className={cn(
                  'px-6 lg:px-10',
                  i > 0 && 'lg:border-l lg:border-zari/30'
                )}
              >
                <p className="font-display text-5xl font-normal leading-none tracking-tight lg:text-6xl text-ink">
                  <CountUp to={it.value} suffix={it.suffix} />
                </p>
                <p className="mt-4 font-utility text-xs text-ink-soft">{it.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Two brand introductions
-------------------------------------------------------------------------- */

function TwoBrandIntroductions() {
  return (
    <section aria-label="The two firms" className="bg-paper">
      <div className="container-site py-24 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sarees — image left, text right */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <ImageDrape
              src="/hero-sarees.webp"
              alt="Janani Dreams TexFab weaving showcase"
              className="aspect-[4/5] w-full"
            />
          </div>
          <div className="lg:col-span-5 lg:order-2 order-1">
            <Reveal>
              <p className="eyebrow" style={{ color: 'var(--neel)' }}>
                {BRANDS.jdt.name}
              </p>
              <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl text-ink">
                Woven on four hundred and twenty looms we own.
              </h2>
              <div className="mt-6 max-w-prose space-y-4 text-base text-ink">
                <p>{BRANDS.jdt.story[0]}</p>
                <p className="text-ink-soft">{BRANDS.jdt.story[1]}</p>
              </div>
              <TextLink to="/sarees" label="See the saree catalogue" accent="var(--neel)" />
            </Reveal>
          </div>

          {/* Lehengas — flipped: text left, image right */}
          <div className="lg:col-span-5 lg:order-3 order-3">
            <Reveal>
              <p className="eyebrow" style={{ color: 'var(--lac)' }}>
                {BRANDS.jdw.name}
              </p>
              <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl text-ink">
                Embroidered on the same benches season after season.
              </h2>
              <div className="mt-6 max-w-prose space-y-4 text-base text-ink">
                <p>{BRANDS.jdw.story[0]}</p>
                <p className="text-ink-soft">{BRANDS.jdw.story[1]}</p>
              </div>
              <TextLink to="/lehengas" label="See the lehenga catalogue" accent="var(--lac)" />
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:order-4 order-4">
            <ImageDrape
              src="/hero-lehengas.webp"
              alt="Janani Designer World bridal finishing showcase"
              className="aspect-[4/5] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function TextLink({ to, label, accent }: { to: string; label: string; accent: string }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.12 }} className="inline-block">
      <Link
        to={to}
        className="group mt-8 inline-flex items-center gap-3 font-utility text-xs uppercase tracking-[0.18em] text-ink"
      >
        <span className="relative pb-1">
          {label}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-base ease-signature group-hover:scale-x-100"
            style={{ backgroundColor: accent }}
          />
        </span>
        <span aria-hidden style={{ color: accent }}>→</span>
      </Link>
    </motion.div>
  )
}

/* --------------------------------------------------------------------------
   Signature collections — CircularGallery (Desktop) / Native CSS Rail (Mobile)
-------------------------------------------------------------------------- */

function SignatureCollections() {
  return (
    <section aria-label="Signature collections" className="bg-paper-deep overflow-x-clip">
      <div className="container-site pt-24 lg:pt-32">
        <Reveal>
          <div className="mb-12">
            <p className="eyebrow">Signature collections</p>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl text-ink">
              Pieces from both houses, dragged into view.
            </h2>
          </div>
        </Reveal>
      </div>

      {/* Desktop WebGL CircularGallery */}
      <div className="hidden md:block h-[480px] w-full">
        <CircularGallery
          items={GALLERY}
          bend={1.4}
          textColor="#1a1a18"
          borderRadius={0}
          font='400 22px "Bodoni Moda", serif'
        />
      </div>

      {/* Mobile Native CSS Scroll-Snap Rail */}
      <div className="block md:hidden w-full overflow-x-auto px-6 py-4 [scroll-snap-type:x_mandatory] [overscroll-behavior-x:contain] [scrollbar-width:none]">
        <div className="flex gap-4 w-max">
          {PIECES.slice(0, 8).map(piece => (
            <motion.div
              key={piece.code}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="flex-none w-[78vw] max-w-[300px] [scroll-snap-align:start] border border-zari/40 bg-paper p-4"
            >
              <Link to={`/design/${piece.code}`} className="block">
                <div className="aspect-[3/4] w-full overflow-hidden bg-paper-deep">
                  <ImageDrape
                    src={piece.image}
                    alt={piece.name}
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-utility text-xs font-medium text-ink">{piece.code}</span>
                  <span className="font-utility text-xs text-ink-soft">{piece.fabric}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container-site pb-24 lg:pb-32">
        <Magnet padding={40} magnetStrength={3}>
          <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.12 }}>
            <Link
              to="/collections"
              className="mt-10 inline-flex items-center border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature"
            >
              Open the full catalogue
            </Link>
          </motion.div>
        </Magnet>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   House Directory (FlowingMenu)
-------------------------------------------------------------------------- */

function HouseDirectory() {
  return (
    <section aria-label="House departments" className="bg-ink text-paper overflow-x-clip">
      <div className="container-site py-20 lg:py-24">
        <Reveal>
          <p className="eyebrow text-paper/60">House directory</p>
          <h2 className="mt-5 max-w-2xl font-display text-2xl font-normal leading-[1.1] tracking-tight text-paper lg:text-3xl">
            Two firms, distinct crafts, unified under one ledger.
          </h2>
        </Reveal>
      </div>
      <div className="h-auto md:h-[440px] w-full border-y border-zari/30 overflow-x-clip">
        <FlowingMenu
          items={DEPARTMENTS}
          speed={18}
          textColor="var(--paper)"
          bgColor="var(--ink)"
          marqueeBgColor="var(--paper)"
          marqueeTextColor="var(--ink)"
          borderColor="rgba(168, 135, 75, 0.3)"
        />
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Why partner with us
-------------------------------------------------------------------------- */

function WhyPartner() {
  return (
    <section aria-label="Why partner with us" className="bg-paper">
      <div className="container-site py-24 lg:py-40">
        <Reveal>
          <p className="eyebrow">Why partner with us</p>
          <BlurText
            text="Five things a buyer evaluates, in order."
            className="mt-5 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl"
            delay={50}
          />
        </Reveal>
        <ul className="mt-16 grid grid-cols-1 lg:grid-cols-5">
          {CAPABILITIES.map((cap, i) => (
            <li
              key={cap.index}
              className={cn(
                'px-6 py-8 lg:py-0 lg:px-8',
                i > 0 && 'lg:border-l lg:border-zari/30'
              )}
            >
              <Reveal delay={i * 0.08}>
                <p className="font-utility text-xs text-ink-soft">{cap.index}</p>
                <p className="mt-6 font-display text-xl leading-tight text-ink">{cap.title}</p>
                <p className="mt-4 text-sm text-ink-soft">{cap.copy}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Retail partners
-------------------------------------------------------------------------- */

function RetailPartners() {
  return (
    <section aria-label="Retail partners" className="bg-paper-deep">
      <div className="container-site py-20 lg:py-24">
        <Reveal>
          <p className="eyebrow">Retail partners across India</p>
          <h2 className="mt-5 max-w-2xl font-display text-2xl font-normal leading-[1.1] tracking-tight lg:text-4xl text-ink">
            On the floor at boutique owners, multi-brand stores and export buyers.
          </h2>
        </Reveal>
      </div>
      <div className="border-y border-zari/30 py-8">
        <LogoLoop
          logos={PARTNER_LOGOS}
          renderItem={(item, _key) => (
            <span className="font-utility whitespace-nowrap text-sm text-ink opacity-60 transition-opacity duration-base ease-signature hover:opacity-100">
              {(item as { node: React.ReactNode }).node}
            </span>
          )}
        />
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Catalogue CTA
-------------------------------------------------------------------------- */

function CatalogueCTA() {
  return (
    <section aria-label="Catalogue request" className="bg-ink text-paper">
      <div className="container-site py-32 lg:py-40">
        <Reveal>
          <p className="eyebrow text-paper/60">Wholesale · catalogue 2026</p>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-5xl">
            <ShinyText
              text="Send the catalogue to your inbox."
              color="var(--paper)"
              shineColor="var(--zari)"
              speed={8}
              spread={140}
              className="font-display"
            />
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            Forty pieces, two firms, one PDF. We send it the same hour, Monday through Friday.
          </p>
        </Reveal>
        <form
          className="mt-12 flex flex-col items-stretch gap-3 border-b border-paper/30 pb-3 sm:flex-row sm:items-end"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Trade deck request received. The catalogue will be sent to your email.')
          }}
        >
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              required
              placeholder="trade@yourstore.com"
              className="w-full bg-transparent py-3 text-lg text-paper placeholder:text-paper/40 focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2"
            />
          </label>
          <Magnet padding={40} magnetStrength={3}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
              type="submit"
              className="border border-paper px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-paper hover:bg-paper hover:text-ink transition-colors duration-base ease-signature"
            >
              Send catalogue
            </motion.button>
          </Magnet>
        </form>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Page
-------------------------------------------------------------------------- */

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } }
}

export default function Home() {
  usePageMeta({ title: 'Two firms, one loom-room' })
  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible">
      <HomeHero />
      <SelvedgeRule />
      <LegacyStrip />
      <SelvedgeRule />
      <TwoBrandIntroductions />
      <SelvedgeRule />
      <SignatureCollections />
      <SelvedgeRule />
      <HouseDirectory />
      <SelvedgeRule />
      <WhyPartner />
      <SelvedgeRule />
      <RetailPartners />
      <SelvedgeRule />
      <CatalogueCTA />
    </motion.div>
  )
}
