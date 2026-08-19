import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SelvedgeRule } from '../components/SelvedgeRule'
import { useBasket } from '../context/BasketContext'
import { BRANDS, FIRM_LABELS } from '../data/brands'
import { PIECES } from '../data/pieces'
import type { Piece } from '../data/types'
import { cn } from '../lib/cn'
import { usePageMeta } from '../lib/usePageMeta'

export default function Design() {
  const { code } = useParams<{ code: string }>()
  const { add } = useBasket()
  const piece = PIECES.find(p => p.code === code)
  usePageMeta({
    title: piece ? `${piece.code} · ${piece.name}` : 'Design not found',
    description: piece
      ? `${piece.code} — ${piece.fabric}, ${piece.work}. MOQ ${piece.moq}, lead ${piece.leadWeeks} weeks.`
      : 'Design not in the catalogue.'
  })

  if (!piece) {
    return <NotFound />
  }

  const brand = BRANDS[piece.firm]
  const accent = `var(--${piece.firm === 'jdt' ? 'neel' : 'lac'})`
  const [selectedColourway, setSelectedColourway] = useState(piece.colourway)
  const [zoomOpen, setZoomOpen] = useState(false)

  const related = PIECES.filter(
    p => p.code !== piece.code && (p.collection === piece.collection || p.fabric === piece.fabric)
  ).slice(0, 6)

  const waMessage = encodeURIComponent(
    `Hello Janani — I would like to enquire about ${piece.code} (${selectedColourway}). Please send me MOQ and lead time.`
  )
  const waHref = `https://wa.me/919876543210?text=${waMessage}`

  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-12 lg:py-16">
          <p className="eyebrow">
            <Link to={`/collections?firm=${piece.firm}`} className="hover:text-ink">
              {brand.name}
            </Link>
            {' · '}
            <Link to={`/collections?category=${encodeURIComponent(piece.category)}`} className="hover:text-ink">
              {piece.category}
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-site grid grid-cols-1 gap-12 pb-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:pb-24">
          {/* LEFT — imagery */}
          <div>
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="block w-full text-left"
              aria-label="Open zoomed view"
            >
              <div
                className="aspect-[3/4] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${piece.image})` }}
              />
            </button>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[piece.image, piece.altImage, piece.image, piece.image]
                .filter((img): img is string => Boolean(img))
                .slice(0, 4)
                .map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className="aspect-square border border-zari/30 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
            </div>
          </div>

          {/* RIGHT — spec (sticky) */}
          <aside className="self-start lg:sticky lg:top-[140px]">
            <p className="font-utility text-2xl text-ink lg:text-3xl">{piece.code}</p>
            <p className="mt-3 font-display text-xl" style={{ color: accent }}>
              {brand.name}
            </p>

            <dl className="mt-10 divide-y divide-zari/30 border-y border-zari/30 text-sm">
              <SpecRow label="Fabric" value={piece.fabric} />
              <SpecRow label="Work" value={piece.work} />
              <SpecRow label="Length" value={`${piece.lengthM} m`} />
              <SpecRow label="Blouse / dupatta" value={piece.firm === 'jdt' ? '0.8 m blouse piece' : '2.5 m dupatta'} />
              <SpecRow label="Weight" value={`${piece.weightG} g`} />
              <SpecRow label="Wash care" value={piece.washCare} />
            </dl>

            <div className="mt-10">
              <p className="font-utility text-xs text-ink-soft">Colourway · {selectedColourway}</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {piece.colourways.map(c => (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => setSelectedColourway(c.name)}
                      aria-label={`Select ${c.name}`}
                      aria-pressed={selectedColourway === c.name}
                      className={cn(
                        'block h-8 w-8 border',
                        selectedColourway === c.name
                          ? 'border-zari outline outline-3 outline-offset-3 outline-paper-deep'
                          : 'border-zari/40'
                      )}
                      style={{ backgroundColor: c.swatch }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border border-zari/40 p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-utility text-xs text-ink-soft">MOQ</p>
                <p className="font-utility text-sm">{piece.moq} pieces</p>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="font-utility text-xs text-ink-soft">Lead time</p>
                <p className="font-utility text-sm">{piece.leadWeeks} weeks</p>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="font-utility text-xs text-ink-soft">Price</p>
                <p className="font-utility text-sm text-ink-soft">On request</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  addToBasket(piece, selectedColourway)
                }
                className="border border-zari px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
                style={{
                  backgroundColor: accent,
                  color: 'var(--paper)',
                  borderColor: accent
                }}
              >
                Add to enquiry
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer noopener"
                className="border border-zari px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed view"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 border border-paper/40 px-4 py-2 font-utility text-xs uppercase tracking-[0.18em] text-paper"
            onClick={(e) => { e.stopPropagation(); setZoomOpen(false) }}
          >
            Close
          </button>
          <img
            src={piece.image}
            alt={piece.imageAlt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      <SelvedgeRule />

      {related.length > 0 && (
        <section className="bg-paper-deep">
          <div className="container-site py-20 lg:py-24">
            <p className="eyebrow">More from this collection</p>
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-normal leading-[1.1] tracking-tight lg:text-3xl">
              Pieces in {piece.collection} and on {piece.fabric}.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(p => (
                <Link key={p.code} to={`/design/${p.code}`} className="group block">
                  <div
                    className="aspect-[3/4] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <p className="font-utility text-xs">{p.code}</p>
                    <p className="text-xs text-ink-soft">{p.fabric}</p>
                  </div>
                  <p className="mt-1 text-sm text-ink">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )

  function addToBasket(p: Piece, colourway: string) {
    add({
      code: p.code,
      firm: p.firm,
      name: p.name,
      image: p.image,
      swatch: p.swatch,
      colourway
    })
  }
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 py-3">
      <dt className="font-utility text-xs text-ink-soft">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  )
}

function NotFound() {
  return (
    <section className="bg-paper">
      <div className="container-site py-32 text-center">
        <p className="eyebrow">Not in catalogue</p>
        <h1 className="mt-6 font-display text-3xl">This design code is not on the floor.</h1>
        <p className="mt-4 text-ink-soft">
          Browse the full list at the{' '}
          <Link to="/collections" className="underline decoration-zari underline-offset-4 hover:text-ink">
            catalogue
          </Link>
          .
        </p>
        <p className="mt-4 font-utility text-xs text-ink-soft">Brands: {Object.values(FIRM_LABELS).join(' · ')}</p>
      </div>
    </section>
  )
}
