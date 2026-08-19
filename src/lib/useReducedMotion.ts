import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './motion'

/** Reactive prefers-reduced-motion — re-renders when the setting changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(prefersReducedMotion)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
