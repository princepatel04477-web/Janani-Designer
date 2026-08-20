import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Reveal — Universal scroll entrance primitive for Janani.
 * Opacity + 24px Y (or 0px Y on reduced motion) over 700ms with house signature easing.
 * Viewport threshold: 0.15, margin: '0px 0px -8% 0px', triggers once.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
