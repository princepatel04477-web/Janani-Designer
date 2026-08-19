import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../../context/BasketContext'
import { BRANDS } from '../../data/brands'
import { cn } from '../../lib/cn'

/**
 * Enquiry basket drawer — slides in from the right, groups lines by firm.
 * Replaces a checkout: no payment, no pricing, buyers send an RFQ.
 */
export function BasketDrawer() {
  const { isOpen, close, items, count, setQuantity, remove } = useBasket()
  const ref = useRef<HTMLDivElement>(null)

  // Focus management: focus first focusable element on open; trap Tab inside the drawer.
  useEffect(() => {
    if (!isOpen) return
    const drawer = ref.current
    if (!drawer) return
    const first = drawer.querySelector<HTMLElement>('[data-autofocus]')
    first?.focus()

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusables = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === firstEl || !drawer.contains(active))) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && active === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    drawer.addEventListener('keydown', trap)
    return () => drawer.removeEventListener('keydown', trap)
  }, [isOpen])

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    (acc[item.firm] ||= []).push(item)
    return acc
  }, {})

  return (
    <>
      <div
        onClick={close}
        aria-hidden={!isOpen}
        className={cn(
          'fixed inset-0 z-40 bg-ink/40 transition-opacity duration-base ease-signature',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry basket"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-[480px] flex-col bg-paper transition-transform duration-slow ease-signature',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-zari/30 px-6 py-5">
          <p className="eyebrow">Enquiry basket</p>
          <button
            data-autofocus
            type="button"
            onClick={close}
            className="font-utility text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 text-ink-soft">
              <p className="font-display text-2xl text-ink">No pieces selected yet.</p>
              <p>Browse the catalogue, then tap "Add to enquiry" on any piece.</p>
              <Link
                to="/collections"
                onClick={close}
                className="border border-zari px-5 py-3 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
              >
                Open the catalogue
              </Link>
            </div>
          ) : (
            (Object.keys(grouped) as Array<'jdt' | 'jdw'>).map(firmId => (
              <section key={firmId} className="mb-10 last:mb-0">
                <p className="eyebrow mb-3" style={{ color: BRANDS[firmId].accentHex }}>
                  {BRANDS[firmId].name}
                </p>
                <ul className="divide-y divide-zari/30 border-y border-zari/30">
                  {grouped[firmId].map(item => (
                    <li key={`${item.code}-${item.colourway}`} className="grid grid-cols-[64px_1fr_auto] gap-4 py-4">
                      <div className="aspect-[3/4] bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} aria-hidden />
                      <div>
                        <p className="font-utility text-sm">{item.code}</p>
                        <p className="mt-1 text-sm text-ink">{item.name}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="block h-3 w-3 border border-zari/40" style={{ backgroundColor: item.swatch }} aria-hidden />
                          <span className="font-utility text-xs text-ink-soft">{item.colourway}</span>
                        </div>
                        <div className="mt-3 inline-flex items-center border border-zari/40 font-utility text-xs">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.code, item.colourway, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="px-3 py-2 hover:bg-zari hover:text-paper"
                          >−</button>
                          <span className="px-3 py-2 tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.code, item.colourway, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="px-3 py-2 hover:bg-zari hover:text-paper"
                          >+</button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.code, item.colourway)}
                        className="self-start font-utility text-xs text-ink-soft hover:text-lac"
                        aria-label={`Remove ${item.code} ${item.colourway}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

        <div className="border-t border-zari/30 px-6 py-5">
          <div className="mb-4 flex items-baseline justify-between font-utility text-xs">
            <span className="text-ink-soft">Total pieces</span>
            <span className="tabular-nums">{count}</span>
          </div>
          <Link
            to="/enquiry"
            onClick={close}
            className={cn(
              'flex w-full items-center justify-center border border-zari px-6 py-4 font-utility text-xs uppercase tracking-[0.18em]',
              items.length === 0
                ? 'pointer-events-none opacity-30'
                : 'bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature'
            )}
          >
            Send enquiry
          </Link>
        </div>
      </aside>
    </>
  )
}
