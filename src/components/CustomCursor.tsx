import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

/**
 * CustomCursor — Portaled directly to document.body to ensure coordinate
 * independence from transformed ancestor containers (such as carousels/tracks).
 *
 * Driven with MotionValues on transform (x, y) rather than left/top.
 * Gated to matchMedia('(pointer: fine)') and prefers-reduced-motion.
 * Spec shape: 6px ink dot, transitioning to a 32px 1px zari ring over interactive elements.
 */
export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const sx = useSpring(x, { stiffness: 500, damping: 45, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 500, damping: 45, mass: 0.35 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mqPointer = window.matchMedia('(pointer: fine)')
    if (!mqPointer.matches || reducedMotion) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    setMounted(true)
    document.documentElement.classList.add('has-custom-cursor')

    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, [data-interactive], [data-cursor], .clickable, summary'
      )
      setIsInteractive(Boolean(interactive))
    }

    const handlePointerLeave = () => setIsVisible(false)
    const handlePointerEnter = () => setIsVisible(true)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    document.documentElement.addEventListener('mouseenter', handlePointerEnter)

    const handlePointerMediaChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        setMounted(false)
        document.documentElement.classList.remove('has-custom-cursor')
      } else if (!reducedMotion) {
        setMounted(true)
        document.documentElement.classList.add('has-custom-cursor')
      }
    }

    mqPointer.addEventListener('change', handlePointerMediaChange)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter)
      mqPointer.removeEventListener('change', handlePointerMediaChange)
    }
  }, [x, y, isVisible, reducedMotion])

  if (!mounted || reducedMotion) return null

  return createPortal(
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      animate={{
        width: isInteractive ? 32 : 6,
        height: isInteractive ? 32 : 6,
        marginLeft: isInteractive ? -16 : -3,
        marginTop: isInteractive ? -16 : -3,
        backgroundColor: isInteractive ? 'transparent' : 'var(--ink)',
        borderColor: isInteractive ? 'var(--zari)' : 'transparent',
        borderWidth: isInteractive ? 1 : 0,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-[99999] border-solid"
    />,
    document.body
  )
}
