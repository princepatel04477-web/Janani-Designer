/**
 * House motion tokens — single source for durations and easing.
 *
 * CSS/framer-motion: EASE_SIGNATURE_CSS (cubic-bezier array)
 * GSAP:              EASE_SIGNATURE (numeric function implementing the
 *                    same cubic-bezier curve)
 */

export const EASE_SIGNATURE_CSS = [0.16, 1, 0.3, 1] as const

export const DURATION_FAST = 0.6 // 600ms
export const DURATION_SLOW = 0.8 // 800ms

/** Solve a cubic-bezier curve numerically (for GSAP, which needs a function). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const sampleDerivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx

  const solveX = (x: number) => {
    let t = x
    for (let i = 0; i < 8; i += 1) {
      const xErr = sampleX(t) - x
      if (Math.abs(xErr) < 1e-6) return t
      const d = sampleDerivX(t)
      if (Math.abs(d) < 1e-6) break
      t -= xErr / d
    }
    // Binary-search fallback
    let lo = 0
    let hi = 1
    t = x
    while (lo < hi) {
      const xErr = sampleX(t) - x
      if (Math.abs(xErr) < 1e-6) return t
      if (xErr > 0) hi = t
      else lo = t
      t = (lo + hi) / 2
    }
    return t
  }

  return (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : sampleY(solveX(t)))
}

/** cubic-bezier(0.16, 1, 0.3, 1) — the house easing, as a numeric function. */
export const EASE_SIGNATURE = cubicBezier(0.16, 1, 0.3, 1)

/** True when the user prefers reduced motion — used by GSAP-based components. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
