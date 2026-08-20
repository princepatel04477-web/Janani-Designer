import { Link } from 'react-router-dom'
import AnimatedContent from '../bits/AnimatedContent'
import FadeContent from '../bits/FadeContent'
import BlurText from '../bits/BlurText'
import ShinyText from '../bits/ShinyText'
import Magnet from '../bits/Magnet'
import Masonry from '../bits/Masonry'
import { Picture } from '../Picture'
import { SelvedgeRule } from '../SelvedgeRule'
import { useBasket } from '../../context/BasketContext'
import type { Brand, Piece } from '../../data/types'
import { cn } from '../../lib/cn'

interface BrandLandingProps {
  brand: Brand
  pieces: Piece[]
}

export function BrandLanding({ brand, pieces }: BrandLandingProps) {
  const accentVar = `var(--${brand.id === 'jdt' ? 'neel' : 'lac'})`

  const categoryItems = brand.categories.map((cat: string) => {
    const matching = pieces.filter(p => p.category === cat)
    return {
      id: cat,
      label: cat,
      img: matching[0]?.image ?? '/placeholders/fabric-1.webp',
      url: `/collections?firm=${brand.id}&category=${encodeURIComponent(cat)}`,
      height: 320 + (cat.length % 3) * 80
    }
  })

  return (
    <>
      {/* Brand hero */}
      <section
        aria-label={brand.name}
        className="relative isolate h-[70svh] min-h-[480px] w-full overflow-hidden border-b border-zari/30 bg-ink"
      >
        <img
          src={brand.id === 'jdt' ? '/hero-sarees.webp' : '/hero-lehengas.webp'}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(26,26,24,0.55) 0%, ${accentVar} 100%)`
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 text-paper">
          <div className="container-site pb-20 lg:pb-24">
            <p className="font-utility text-xs uppercase tracking-[0.18em] text-paper/80">
              <ShinyText text={`${brand.legalName} · est. ${brand.founded}`} color="rgba(240, 238, 230, 0.85)" shineColor="var(--zari)" speed={6} />
            </p>
            <BlurText
              tag="h1"
              text={brand.name}
              className="mt-5 font-display text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl"
              delay={50}
            />
            <p className="mt-6 max-w-2xl text-lg text-paper/90">{brand.positioning}</p>
          </div>
        </div>
      </section>

      <SelvedgeRule />

      {/* Brand story */}
      <section className="bg-paper">
        <div className="container-site py-24 lg:py-32">
          <div className="mx-auto max-w-[60ch]">
            <AnimatedContent distance={32}>
              <p className="eyebrow" style={{ color: accentVar }}>
                The story
              </p>
              <div className="mt-8 space-y-6 text-lg leading-[1.7] text-ink">
                <p>{brand.story[0]}</p>
                <p className="text-ink-soft">{brand.story[1]}</p>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <SelvedgeRule />

      {/* Capability block — above the fold on mobile */}
      <section className="bg-paper-deep">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Capabilities</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            <CapabilityItem label="MOQ" value={brand.id === 'jdt' ? '24 pieces' : '6 pieces'} />
            <CapabilityItem label="Lead time" value={brand.id === 'jdt' ? '6 – 8 weeks' : '8 – 12 weeks'} />
            <CapabilityItem label="Customisation" value="Colourway, label, SKU" />
            <CapabilityItem label="Packaging" value="Care label + bar-coded SKU" />
          </dl>
        </div>
      </section>

      <SelvedgeRule />

      {/* Category grid — Masonry */}
      <section className="bg-paper">
        <div className="container-site pt-24 lg:pt-32">
          <p className="eyebrow">Browse the floor</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            {brand.categories.length} categories, woven or embroidered on the same benches.
          </h2>
        </div>
        <div className="container-site py-12 lg:py-16">
          <FadeContent blur duration={800} className="h-[640px]">
            <Masonry items={categoryItems} hoverScale={0.98} />
          </FadeContent>
        </div>
      </section>

      <SelvedgeRule />

      {/* Enquiry CTA */}
      <section className="bg-paper-deep">
        <div className="container-site py-24 lg:py-32">
          <p className="eyebrow" style={{ color: accentVar }}>
            Place an enquiry
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Add pieces to the basket, or send the team a direct line.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Magnet padding={30} magnetStrength={3}>
              <Link
                to={`/collections?firm=${brand.id}`}
                className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature"
              >
                Open the catalogue
              </Link>
            </Magnet>
            <Magnet padding={30} magnetStrength={3}>
              <Link
                to="/enquiry"
                className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
              >
                See the basket
              </Link>
            </Magnet>
          </div>
        </div>
      </section>
    </>
  )
}

function CapabilityItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-utility text-xs text-ink-soft">{label}</dt>
      <dd className="mt-2 font-display text-xl leading-tight">{value}</dd>
    </div>
  )
}

interface PieceTileProps {
  piece: Piece
  accent: string
}

export function PieceTile({ piece, accent }: PieceTileProps) {
  const { add } = useBasket()
  return (
    <article
      className={cn(
        'group relative block overflow-hidden border border-zari/40 bg-paper transition-colors hover:border-ink'
      )}
    >
      <Link to={`/design/${piece.code}`} className="block">
        <div className="aspect-[3/4] w-full overflow-hidden bg-paper-deep">
          <Picture
            src={piece.image}
            alt={piece.imageAlt}
            className="h-full w-full object-cover object-center transition-transform duration-slow ease-signature group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex items-baseline justify-between gap-3 px-4 py-4">
        <div>
          <Link to={`/design/${piece.code}`} className="font-utility text-xs font-medium text-ink hover:underline">
            {piece.code}
          </Link>
          <p className="mt-1 text-sm text-ink-soft">{piece.fabric}</p>
        </div>
        <span className="font-utility text-xs font-medium" style={{ color: accent }}>
          {piece.category}
        </span>
      </div>
      <button
        type="button"
        onClick={() =>
          add(
            {
              code: piece.code,
              firm: piece.firm,
              name: piece.name,
              image: piece.image,
              swatch: piece.swatch,
              colourway: piece.colourway
            },
            1
          )
        }
        className="absolute right-3 top-3 hidden h-9 w-9 items-center justify-center border border-ink bg-paper font-utility text-sm text-ink opacity-0 transition-all duration-base ease-signature hover:bg-ink hover:text-paper group-hover:opacity-100 sm:flex"
        aria-label={`Add ${piece.code} to enquiry`}
      >
        +
      </button>
    </article>
  )
}
