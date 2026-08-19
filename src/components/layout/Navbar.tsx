import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useBasket } from '../../context/BasketContext'
import { cn } from '../../lib/cn'

const LEFT = [
  { to: '/sarees', label: 'Sarees' },
  { to: '/lehengas', label: 'Lehengas' },
  { to: '/collections', label: 'Collections' }
]
const RIGHT = [
  { to: '/craft', label: 'Craft' },
  { to: '/partner', label: 'Partner with us' },
  { to: '/contact', label: 'Contact' }
]

/**
 * Navbar — transparent over the hero, transitions to solid --paper with a 1px
 * zari bottom rule once scrolled past 80vh. Mobile becomes a full-screen
 * FlowingMenu overlay.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, toggle } = useBasket()
  const location = useLocation()

  useEffect(() => {
    const handler = () => {
      const threshold = window.innerHeight * 0.8
      setScrolled(window.scrollY > threshold)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // The split hero covers the whole homepage, so the navbar starts transparent
  // there and only becomes solid after 80vh. Everywhere else it starts solid.
  const transparent = location.pathname === '/' && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-8 z-40 transition-[background-color,border-color,box-shadow] duration-slow ease-signature',
          transparent ? 'bg-transparent' : 'bg-paper border-b border-zari/30'
        )}
      >
        <div className="container-site flex h-[68px] items-center justify-between gap-6">
          <nav className="hidden flex-1 gap-8 text-sm md:flex">
            {LEFT.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'hover:opacity-70 focus-visible:opacity-70',
                    transparent ? 'text-paper' : 'text-ink',
                    isActive && 'underline decoration-zari decoration-1 underline-offset-[6px]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/"
            aria-label="Janani — back to home"
            className={cn(
              'font-display text-2xl tracking-[0.32em] focus-visible:outline-1 focus-visible:outline-zari focus-visible:outline-offset-4',
              transparent ? 'text-paper' : 'text-ink'
            )}
          >
            JANANI
          </Link>

          <nav className="hidden flex-1 items-center justify-end gap-8 text-sm md:flex">
            {RIGHT.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'hover:opacity-70 focus-visible:opacity-70',
                    transparent ? 'text-paper' : 'text-ink',
                    isActive && 'underline decoration-zari decoration-1 underline-offset-[6px]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={toggle}
              className={cn(
                'flex h-7 w-7 items-center justify-center border border-zari/60 font-utility text-xs',
                transparent ? 'text-paper' : 'text-ink'
              )}
              aria-label={`Enquiry basket, ${count} pieces`}
            >
              {count}
            </button>
          </nav>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
            className={cn(
              'md:hidden font-utility text-xs uppercase tracking-[0.2em]',
              transparent ? 'text-paper' : 'text-ink'
            )}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <MobileOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

function MobileOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [
    { link: '/sarees', text: 'Sarees', image: '/placeholders/fabric-1.webp' },
    { link: '/lehengas', text: 'Lehengas', image: '/placeholders/fabric-2.webp' },
    { link: '/collections', text: 'Collections', image: '/placeholders/fabric-3.webp' },
    { link: '/craft', text: 'Craft', image: '/placeholders/fabric-4.webp' },
    { link: '/partner', text: 'Partner with us', image: '/placeholders/fabric-5.webp' },
    { link: '/contact', text: 'Contact', image: '/placeholders/fabric-6.webp' }
  ]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/40"
        tabIndex={-1}
      />
      <div className="absolute inset-0 z-10 overflow-hidden bg-ink text-paper">
        <MobileMenuList items={items} />
      </div>
    </div>
  )
}

function MobileMenuList({ items }: { items: { link: string; text: string; image: string }[] }) {
  return (
    <nav className="flex h-full flex-col" aria-label="Mobile site menu">
      {items.map(item => (
        <Link
          key={item.link}
          to={item.link}
          className="group relative flex flex-1 items-center justify-center overflow-hidden border-t border-zari/30 font-display text-5xl font-normal leading-none tracking-tight focus-visible:outline-1 focus-visible:outline-zari focus-visible:outline-offset-4"
        >
          <span className="relative z-10 transition-transform duration-slow ease-signature group-hover:-translate-y-1">
            {item.text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-slow ease-signature group-hover:opacity-30"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        </Link>
      ))}
    </nav>
  )
}
