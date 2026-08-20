import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Picture } from '../components/Picture'
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

  // Unconditional top-level hooks (Rules of Hooks)
  const [selectedColourway, setSelectedColourway] = useState(piece?.colourway ?? '')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [zoomOpen, setZoomOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (piece) {
      setSelectedColourway(piece.colourway)
      setSelectedImage(null)
    }
  }, [piece?.code])

  // Zoom modal keyboard trap & body scroll lock
  useEffect(() => {
    if (!zoomOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomOpen(false)
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [zoomOpen])

  if (!piece) {
    return <NotFound />
  }

  const brand = BRANDS[piece.firm]
  const accent = `var(--${piece.firm === 'jdt' ? 'neel' : 'lac'})`
  const activeImage = selectedImage ?? piece.image

  const availableImages = [piece.image, piece.altImage].filter(
    (img): img is string => Boolean(img)
  )

  const related = PIECES.filter(
    p => p.code !== piece.code && (p.collection === piece.collection || p.fabric === piece.fabric)
  ).slice(0, 6)

  const waMessage = encodeURIComponent(
    `Hello Janani — I would like to enquire about ${piece.code} (${selectedColourway}). Please send me MOQ and lead time.`
  )
  const waPhone = piece.firm === 'jdt' ? '919876543210' : '919876543211'
  const waHref = `https://wa.me/${waPhone}?text=${waMessage}`

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
              className="block w-full text-left focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
              aria-label="Open zoomed view"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-paper-deep">
                <Picture
                  src={activeImage}
                  alt={piece.imageAlt}
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </button>
            {availableImages.length > 1 && (
              <div className="mt-4 flex gap-3">
                {availableImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      'aspect-square w-20 overflow-hidden border bg-paper-deep transition-all',
                      (selectedImage === img || (!selectedImage && i === 0))
                        ? 'border-ink outline outline-2 outline-offset-2 outline-ink'
                        : 'border-zari/60 hover:border-ink'
                    )}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Picture
                      src={img}
                      alt={`${piece.name} - perspective ${i + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — spec (sticky) */}
          <aside className="self-start lg:sticky lg:top-[140px]">
            <h1 className="font-utility text-2xl text-ink lg:text-3xl">{piece.code}</h1>
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
                      onClick={() => {
                        setSelectedColourway(c.name)
                        if (c.image) {
                          setSelectedImage(c.image)
                        }
                      }}
                      aria-label={`Select ${c.name}`}
                      aria-pressed={selectedColourway === c.name}
                      className={cn(
                        'block h-8 w-8 border transition-transform',
                        selectedColourway === c.name
                          ? 'border-ink outline outline-2 outline-offset-2 outline-ink scale-110'
                          : 'border-zari/60 hover:border-ink'
                      )}
                      style={{ backgroundColor: c.swatch }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border border-zari/60 p-5">
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
                onClick={() => addToBasket(piece, selectedColourway)}
                className={cn(
                  'border px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] transition-colors duration-base ease-signature text-paper',
                  piece.firm === 'jdt'
                    ? 'bg-neel border-neel hover:bg-ink hover:border-ink'
                    : 'bg-lac border-lac hover:bg-ink hover:border-ink'
                )}
              >
                Add to enquiry
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer noopener"
                className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {zoomOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed view"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 border border-paper/40 px-4 py-2 font-utility text-xs uppercase tracking-[0.18em] text-paper hover:bg-paper hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-paper"
            onClick={(e) => { e.stopPropagation(); setZoomOpen(false) }}
          >
            Close (Esc)
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] max-w-[90vw]">
            <Picture
              src={activeImage}
              alt={piece.imageAlt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
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
                <Link key={p.code} to={`/design/${p.code}`} className="group block border border-zari/30 bg-paper p-2 hover:border-zari transition-colors">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-paper-deep">
                    <Picture
                      src={p.image}
                      alt={p.imageAlt}
                      className="h-full w-full object-cover object-center transition-transform duration-slow ease-signature group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3 px-2">
                    <p className="font-utility text-xs font-medium text-ink">{p.code}</p>
                    <p className="text-xs text-ink-soft">{p.fabric}</p>
                  </div>
                  <p className="mt-1 px-2 text-sm text-ink">{p.name}</p>
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
