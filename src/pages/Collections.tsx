import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SelvedgeRule } from '../components/SelvedgeRule'
import BlurText from '../components/bits/BlurText'
import FadeContent from '../components/bits/FadeContent'
import Magnet from '../components/bits/Magnet'
import { useBasket } from '../context/BasketContext'
import { BRANDS, FIRM_LABELS } from '../data/brands'
import { PIECES } from '../data/pieces'
import type { Piece } from '../data/types'
import { cn } from '../lib/cn'
import { usePageMeta } from '../lib/usePageMeta'

type Facet = 'firm' | 'fabric' | 'work' | 'occasion' | 'colourway' | 'moq'

const PAGE_SIZE = 24
const NEXT_SIZE = 12

const FACETS: { key: Facet; label: string; values: string[] }[] = [
  { key: 'firm', label: 'Firm', values: ['jdt', 'jdw'] },
  { key: 'fabric', label: 'Fabric', values: [] },
  { key: 'work', label: 'Work', values: ['zari', 'embroidery', 'print', 'handwoven'] },
  { key: 'occasion', label: 'Occasion', values: [] },
  { key: 'colourway', label: 'Colourway', values: [] },
  { key: 'moq', label: 'MOQ', values: ['lt12', '12-23', '24-47', 'ge48'] }
]

function deriveFacetValues(key: Facet): string[] {
  const set = new Set<string>()
  PIECES.forEach(p => {
    if (key === 'moq') {
      const band = moqBand(p.moq)
      if (band) set.add(band)
    } else if (key === 'firm') {
      set.add(p.firm)
    } else if (key === 'fabric') {
      set.add(p.fabric)
    } else if (key === 'work') {
      set.add(p.work)
    } else if (key === 'occasion') {
      set.add(p.occasion)
    } else if (key === 'colourway') {
      set.add(p.colourway)
    }
  })
  return Array.from(set).sort()
}

function moqBand(moq: number): string {
  if (moq < 12) return 'lt12'
  if (moq < 24) return '12-23'
  if (moq < 48) return '24-47'
  return 'ge48'
}

const BAND_LABEL: Record<string, string> = {
  lt12: '< 12 pieces',
  '12-23': '12 – 23 pieces',
  '24-47': '24 – 47 pieces',
  ge48: '48+ pieces'
}

export default function Collections({ firmPreset }: { firmPreset?: 'jdt' | 'jdw' } = {}) {
  usePageMeta({
    title: firmPreset === 'jdt' ? 'Saree catalogue' : firmPreset === 'jdw' ? 'Lehenga catalogue' : 'Catalogue',
    description: 'Forty pieces from both Janani firms. Filter by firm, fabric, work, occasion, colourway and MOQ.'
  })
  const [search, setSearch] = useSearchParams()
  const [shown, setShown] = useState(PAGE_SIZE)

  // Apply a firm preset from the route (/sarees/collections, /lehengas/collections)
  // unless the buyer has already edited the firm filter.
  useEffect(() => {
    if (!firmPreset) return
    if (search.has('firm')) return
    const next = new URLSearchParams(search)
    next.append('firm', firmPreset)
    setSearch(next, { replace: true })
  }, [firmPreset, search, setSearch])

  const filterState = useMemo(() => {
    const out: Record<Facet, string[]> = {
      firm: search.getAll('firm'),
      fabric: search.getAll('fabric'),
      work: search.getAll('work'),
      occasion: search.getAll('occasion'),
      colourway: search.getAll('colourway'),
      moq: search.getAll('moq')
    }
    return out
  }, [search])

  const facets = useMemo(
    () =>
      FACETS.map(f => ({
        ...f,
        values: f.values.length ? f.values : deriveFacetValues(f.key)
      })),
    []
  )

  const filtered = useMemo(() => {
    return PIECES.filter(p => {
      if (filterState.firm.length && !filterState.firm.includes(p.firm)) return false
      if (filterState.fabric.length && !filterState.fabric.includes(p.fabric)) return false
      if (filterState.work.length && !filterState.work.includes(p.work)) return false
      if (filterState.occasion.length && !filterState.occasion.includes(p.occasion)) return false
      if (filterState.colourway.length && !filterState.colourway.includes(p.colourway)) return false
      if (filterState.moq.length) {
        const b = moqBand(p.moq)
        if (!filterState.moq.includes(b)) return false
      }
      return true
    })
  }, [filterState])

  const visible = filtered.slice(0, shown)
  const hasMore = shown < filtered.length

  const toggleFilter = (key: Facet, value: string) => {
    setSearch(prev => {
      const existing = prev.getAll(key)
      const next = new URLSearchParams(prev)
      next.delete(key)
      const set = new Set(existing)
      if (set.has(value)) set.delete(value)
      else set.add(value)
      set.forEach(v => next.append(key, v))
      return next
    })
    setShown(PAGE_SIZE)
  }

  const clearAll = () => setSearch(new URLSearchParams())

  const activeChips: { key: Facet; value: string; label: string }[] = []
  ;(Object.keys(filterState) as Facet[]).forEach(k => {
    filterState[k].forEach(v => {
      let label = v
      if (k === 'firm') label = FIRM_LABELS[v as 'jdt' | 'jdw']
      else if (k === 'moq') label = BAND_LABEL[v] ?? v
      activeChips.push({ key: k, value: v, label })
    })
  })

  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-12 lg:py-16">
          <p className="eyebrow">The catalogue</p>
          <BlurText
            text="Forty pieces, two firms. Filter and send."
            className="mt-5 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl"
            delay={50}
          />
          <p className="mt-4 font-utility text-sm text-ink-soft tabular-nums">
            {filtered.length} pieces match.
          </p>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site flex flex-col gap-10 py-12 lg:flex-row lg:gap-16 lg:py-16">
          {/* Filter rail (desktop) */}
          <aside className="hidden w-[260px] shrink-0 lg:block" aria-label="Filters">
            <FilterRail facets={facets} state={filterState} onToggle={toggleFilter} onClear={clearAll} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {activeChips.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-zari/30 pb-6">
                {activeChips.map(c => (
                  <button
                    key={`${c.key}-${c.value}`}
                    type="button"
                    onClick={() => toggleFilter(c.key, c.value)}
                    className="inline-flex items-center gap-2 border border-zari/40 px-3 py-1.5 font-utility text-xs uppercase tracking-[0.12em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
                  >
                    <span>{c.label}</span>
                    <span aria-hidden>×</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-2 font-utility text-xs uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
                >
                  Clear all
                </button>
              </div>
            )}

            {visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-display text-2xl">No pieces match these filters.</p>
                <Magnet padding={30} magnetStrength={3}>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-6 border border-zari px-6 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
                  >
                    Clear filters
                  </button>
                </Magnet>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {visible.map((p, idx) => (
                    <FadeContent key={p.code} blur duration={600} delay={Math.min(idx * 0.05, 0.4)}>
                      <PieceCard piece={p} />
                    </FadeContent>
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-12 flex justify-center">
                    <Magnet padding={40} magnetStrength={3}>
                      <button
                        type="button"
                        onClick={() => setShown(s => s + NEXT_SIZE)}
                        className="border border-zari px-8 py-4 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
                      >
                        Load {Math.min(NEXT_SIZE, filtered.length - shown)} more
                      </button>
                    </Magnet>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function FilterRail({
  facets,
  state,
  onToggle,
  onClear
}: {
  facets: typeof FACETS
  state: Record<Facet, string[]>
  onToggle: (k: Facet, v: string) => void
  onClear: () => void
}) {
  return (
    <div className="sticky top-[140px] space-y-10">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-xl">Filters</p>
        <button
          type="button"
          onClick={onClear}
          className="font-utility text-xs uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
        >
          Clear all
        </button>
      </div>
      {facets.map(f => (
        <fieldset key={f.key}>
          <legend className="font-utility text-xs text-ink-soft">{f.label}</legend>
          <ul className="mt-3 space-y-2">
            {f.values.map(v => {
              const checked = state[f.key].includes(v)
              const label =
                f.key === 'firm' ? FIRM_LABELS[v as 'jdt' | 'jdw'] : f.key === 'moq' ? BAND_LABEL[v] ?? v : v
              return (
                <li key={v}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(f.key, v)}
                      className="h-4 w-4 cursor-pointer border border-zari bg-paper accent-zari"
                    />
                    <span>{label}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  )
}

function PieceCard({ piece }: { piece: Piece }) {
  const { add } = useBasket()
  const accent = piece.firm === 'jdt' ? 'var(--neel)' : 'var(--lac)'

  return (
    <Link to={`/design/${piece.code}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-deep">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-base ease-signature group-hover:opacity-0"
          style={{ backgroundImage: `url(${piece.image})` }}
        />
        {piece.altImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-base ease-signature group-hover:opacity-100"
            style={{ backgroundImage: `url(${piece.altImage})` }}
          />
        )}
        <button
          type="button"
          onClick={e => {
            e.preventDefault()
            add({
              code: piece.code,
              firm: piece.firm,
              name: piece.name,
              image: piece.image,
              swatch: piece.swatch,
              colourway: piece.colourway
            })
          }}
          className="absolute right-3 top-3 hidden h-9 w-9 items-center justify-center border border-zari/70 bg-paper/85 font-utility text-base text-ink transition-colors duration-base ease-signature hover:bg-zari hover:text-paper sm:flex"
          aria-label={`Add ${piece.code} to enquiry`}
        >
          +
        </button>
        <span
          className="absolute bottom-3 left-3 inline-flex items-center gap-1 border border-zari/40 bg-paper/85 px-2 py-1 font-utility text-xs"
          style={{ color: accent }}
        >
          {BRANDS[piece.firm].name}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="font-utility text-xs">{piece.code}</p>
        <p className="text-xs text-ink-soft">{piece.fabric}</p>
      </div>
      <p className="mt-1 text-sm text-ink">{piece.name}</p>
    </Link>
  )
}

// Hint TypeScript the type helpers exist for tooltips/IDE
export const _brandLabels = FIRM_LABELS
export const _cn = cn
