import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useBasket } from '../../context/BasketContext'
import { Logo } from '../brand/Logo'
import Magnet from '../bits/Magnet'
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
      <div
        className={cn(
          'w-full transition-[background-color,border-color] duration-slow ease-signature',
          transparent
            ? 'bg-ink/80 text-paper'
            : 'bg-paper text-ink border-b border-zari/40'
        )}
      >
        <div className="container-site flex h-[68px] items-center justify-between gap-6">
          <nav className="hidden flex-1 gap-8 text-sm md:flex" aria-label="Main Navigation Left">
            {LEFT.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-2 focus-visible:outline-ink',
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
              'inline-flex items-center focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4',
              transparent ? 'text-paper' : 'text-ink'
            )}
          >
            <Logo variant="wordmark" decorative height={24} className="hidden md:block" />
            <Logo variant="monogram" decorative height={28} className="block md:hidden" />
          </Link>

          <nav className="hidden flex-1 items-center justify-end gap-8 text-sm md:flex" aria-label="Main Navigation Right">
            {RIGHT.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-2 focus-visible:outline-ink',
                    transparent ? 'text-paper' : 'text-ink',
                    isActive && 'underline decoration-zari decoration-1 underline-offset-[6px]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Magnet padding={40} magnetStrength={4}>
              <button
                type="button"
                onClick={toggle}
                className={cn(
                  'flex h-7 min-w-7 items-center justify-center border px-2 font-utility text-xs tabular-nums transition-colors duration-base ease-signature focus-visible:outline-2 focus-visible:outline-ink',
                  transparent
                    ? 'border-paper/60 text-paper hover:bg-paper hover:text-ink'
                    : 'border-zari/60 text-ink hover:bg-ink hover:text-paper'
                )}
                aria-label={`Enquiry basket, ${count} pieces`}
              >
                {count}
              </button>
            </Magnet>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle site navigation"
            className={cn(
              'border px-3 py-1 font-utility text-xs uppercase tracking-[0.18em] transition-colors md:hidden focus-visible:outline-2 focus-visible:outline-ink',
              transparent
                ? 'border-paper/60 text-paper hover:bg-paper hover:text-ink'
                : 'border-zari/60 text-ink hover:bg-ink hover:text-paper'
            )}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

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
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-ink text-paper" role="dialog" aria-modal="true" aria-label="Site menu">
      {/* Top action header with explicit, accessible Close button & house monogram */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-zari/30 relative z-20">
        <Link
          to="/"
          onClick={onClose}
          aria-label="Janani — back to home"
          className="inline-flex items-center text-paper focus-visible:outline-2 focus-visible:outline-paper"
        >
          <Logo variant="monogram" decorative height={32} />
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="border border-paper/40 px-4 py-2 font-utility text-xs uppercase tracking-[0.18em] text-paper hover:bg-paper hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-paper"
        >
          Close (Esc)
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative z-10">
        <MobileMenuList items={items} onItemClick={onClose} />
      </div>
    </div>
  )
}

function MobileMenuList({
  items,
  onItemClick
}: {
  items: { link: string; text: string; image: string }[]
  onItemClick: () => void
}) {
  return (
    <nav className="flex min-h-full flex-col" aria-label="Mobile site menu">
      {items.map((item, idx) => (
        <Link
          key={item.link}
          to={item.link}
          onClick={onItemClick}
          className={cn(
            'group relative flex min-h-[72px] flex-1 items-center justify-between px-6 py-4 transition-colors hover:bg-paper hover:text-ink border-b border-zari/20',
            idx === 0 && 'border-t border-zari/20'
          )}
        >
          <span className="font-display text-2xl font-normal tracking-tight sm:text-3xl">
            {item.text}
          </span>
          <span
            aria-hidden
            className="font-utility text-xs uppercase tracking-[0.18em] opacity-40 transition-opacity group-hover:opacity-100"
          >
            →
          </span>
        </Link>
      ))}
    </nav>
  )
}
