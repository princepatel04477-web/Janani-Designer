import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'
import SplitText from '../components/bits/SplitText'
import BlurText from '../components/bits/BlurText'
import ShinyText from '../components/bits/ShinyText'
import ScrollReveal from '../components/bits/ScrollReveal'
import AnimatedContent from '../components/bits/AnimatedContent'
import FadeContent from '../components/bits/FadeContent'
import Magnet from '../components/bits/Magnet'
import FlowingMenu from '../components/bits/FlowingMenu'
import CircularGallery from '../components/bits/CircularGallery'
import LogoLoop, { type LogoItem } from '../components/bits/LogoLoop'
import { Logo } from '../components/brand/Logo'
import { SelvedgeRule } from '../components/SelvedgeRule'
import { Picture } from '../components/Picture'
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
   Split hero (Prompt 4)
-------------------------------------------------------------------------- */

function HomeHero() {
  const [hovered, setHovered] = useState<'jdt' | 'jdw' | null>(null)

  return (
    <section
      aria-label="Janani — two firms"
      className="relative isolate h-[calc(100dvh-100px)] min-h-[580px] w-full overflow-hidden border-b border-zari/30"
    >
      <h1 className="sr-only">Janani — Wholesale Sarees &amp; Designer Lehengas</h1>
      <div className="flex h-full flex-col lg:flex-row">
        <HeroPanel
          firm="jdt"
          hovered={hovered}
          setHovered={setHovered}
          image="/hero-sarees.webp"
          alt="Janani Dreams TexFab — indigo Banarasi saree with gold zari"
          eyebrow={`Established ${BRANDS.jdt.founded}`}
          heading={BRANDS.jdt.name}
          copy="Wholesale sarees, woven and woven-finished under one roof."
          link="/sarees"
        />
        <HeroPanel
          firm="jdw"
          hovered={hovered}
          setHovered={setHovered}
          image="/hero-lehengas.webp"
          alt="Janani Designer World — bridal lehenga in lac red with gold zardozi"
          eyebrow={`Established ${BRANDS.jdw.founded}`}
          heading={BRANDS.jdw.name}
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
      <motion.div
        aria-hidden
        animate={{ opacity: isHovered ? 0.7 : 0.85 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0%, ${accent} 100%)`
        }}
      />
      <motion.div
        animate={{ opacity: !reducedMotion && otherHovered ? 0.6 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 pt-24 text-paper sm:px-10 lg:px-16"
      >
        <Logo variant="monogram" decorative height={28} className="mb-4 text-paper opacity-90" />
        <p className="font-utility text-xs uppercase tracking-[0.18em] text-paper/80">
          {eyebrow}
        </p>
        <SplitText
          tag="h2"
          text={heading}
          className="mt-4 block font-display text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl"
          duration={0.8}
          delay={0.18}
        />
        <p className="mt-5 max-w-md text-lg text-paper/90">{copy}</p>
        <div className="mt-8 inline-block">
          <Magnet padding={40} magnetStrength={3}>
            <Link
              to={link}
              className="inline-flex items-center border border-paper px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-paper bg-transparent hover:bg-paper hover:text-ink transition-colors duration-base ease-signature focus-visible:outline-2 focus-visible:outline-paper"
            >
              See the catalogue →
            </Link>
          </Magnet>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* --------------------------------------------------------------------------
   Legacy strip (Prompt 5 §1)
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
      { threshold: 0.4 }
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
        <FadeContent blur duration={800}>
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
        </FadeContent>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Two brand introductions (Prompt 5 §2)
-------------------------------------------------------------------------- */

function TwoBrandIntroductions() {
  return (
    <section aria-label="The two firms" className="bg-paper">
      <div className="container-site py-24 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sarees — image left, text right */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <AnimatedContent className="aspect-[4/5] w-full" distance={48}>
              <Picture
                src="/hero-sarees.webp"
                alt="Janani Dreams TexFab weaving showcase"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
              />
            </AnimatedContent>
          </div>
          <div className="lg:col-span-5 lg:order-2 order-1">
            <AnimatedContent distance={48} reverse>
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
            </AnimatedContent>
          </div>

          {/* Lehengas — flipped: text left, image right */}
          <div className="lg:col-span-5 lg:order-3 order-3">
            <AnimatedContent distance={48}>
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
            </AnimatedContent>
          </div>
          <div className="lg:col-span-7 lg:order-4 order-4">
            <AnimatedContent className="aspect-[4/5] w-full" distance={48} reverse>
              <Picture
                src="/hero-lehengas.webp"
                alt="Janani Designer World bridal finishing showcase"
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
              />
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  )
}

function TextLink({ to, label, accent }: { to: string; label: string; accent: string }) {
  return (
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
  )
}

/* --------------------------------------------------------------------------
   Signature collections (Prompt 5 §3) — CircularGallery
-------------------------------------------------------------------------- */

function SignatureCollections() {
  return (
    <section aria-label="Signature collections" className="bg-paper-deep">
      <div className="container-site pt-24 lg:pt-32">
        <div className="mb-12">
          <p className="eyebrow">Signature collections</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl text-ink">
            Pieces from both houses, dragged into view.
          </h2>
        </div>
      </div>
      <div className="h-[480px] w-full">
        <CircularGallery
          items={GALLERY}
          bend={1.4}
          textColor="#1a1a18"
          borderRadius={0}
          font='400 22px "Bodoni Moda", serif'
        />
      </div>
      <div className="container-site pb-24 lg:pb-32">
        <Magnet padding={40} magnetStrength={3}>
          <Link
            to="/collections"
            className="mt-10 inline-flex items-center border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature"
          >
            Open the full catalogue
          </Link>
        </Magnet>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Craft section (Prompt 5 §4) — parallax pull quote
-------------------------------------------------------------------------- */

function CraftSection() {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el || !imgRef.current) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / total))
      setOffset(progress * 0.15)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} aria-label="Craft" className="relative isolate overflow-hidden">
      <div
        ref={imgRef}
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/placeholders/fabric-3.webp)',
          transform: `translateY(${offset * 100}%)`
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-ink/55" aria-hidden />
      <div className="container-site py-32 lg:py-40">
        <div className="max-w-[20ch]">
          <ScrollReveal>
            Every weave carries the house mark — the same loom, the same bench, the same master.
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   House Directory (FlowingMenu)
-------------------------------------------------------------------------- */

function HouseDirectory() {
  return (
    <section aria-label="House departments" className="bg-ink text-paper">
      <div className="container-site py-20 lg:py-24">
        <p className="eyebrow text-paper/60">House directory</p>
        <h2 className="mt-5 max-w-2xl font-display text-2xl font-normal leading-[1.1] tracking-tight text-paper lg:text-3xl">
          Two firms, distinct crafts, unified under one ledger.
        </h2>
      </div>
      <div className="h-[440px] w-full border-y border-zari/30">
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
   Why partner with us (Prompt 5 §5)
-------------------------------------------------------------------------- */

function WhyPartner() {
  return (
    <section aria-label="Why partner with us" className="bg-paper">
      <div className="container-site py-24 lg:py-40">
        <p className="eyebrow">Why partner with us</p>
        <BlurText
          text="Five things a buyer evaluates, in order."
          className="mt-5 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl"
          delay={50}
        />
        <ul className="mt-16 grid grid-cols-1 lg:grid-cols-5">
          {CAPABILITIES.map((cap, i) => (
            <li
              key={cap.index}
              className={cn(
                'px-6 py-8 lg:py-0 lg:px-8',
                i > 0 && 'lg:border-l lg:border-zari/30'
              )}
            >
              <p className="font-utility text-xs text-ink-soft">{cap.index}</p>
              <p className="mt-6 font-display text-xl leading-tight text-ink">{cap.title}</p>
              <p className="mt-4 text-sm text-ink-soft">{cap.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Retail partners (Prompt 5 §6) — LogoLoop marquee
-------------------------------------------------------------------------- */

function RetailPartners() {
  return (
    <section aria-label="Retail partners" className="bg-paper-deep">
      <div className="container-site py-20 lg:py-24">
        <p className="eyebrow">Retail partners across India</p>
        <h2 className="mt-5 max-w-2xl font-display text-2xl font-normal leading-[1.1] tracking-tight lg:text-4xl text-ink">
          On the floor at boutique owners, multi-brand stores and export buyers.
        </h2>
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
   Catalogue CTA (Prompt 5 §7)
-------------------------------------------------------------------------- */

function CatalogueCTA() {
  return (
    <section aria-label="Catalogue request" className="bg-ink text-paper">
      <div className="container-site py-32 lg:py-40">
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
            <button
              type="submit"
              className="border border-paper px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-paper hover:bg-paper hover:text-ink transition-colors duration-base ease-signature"
            >
              Send catalogue
            </button>
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
      <CraftSection />
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
