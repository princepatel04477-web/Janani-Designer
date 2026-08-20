import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface LogoWordmarkProps extends HTMLAttributes<HTMLSpanElement> {
  height?: number
  className?: string
}

/**
 * LogoWordmark — the "JANANI" house wordmark rendered in authoritative Bodoni Moda
 * with wide letter spacing (tracking-[0.32em]).
 */
export function LogoWordmark({ height, className, style, ...props }: LogoWordmarkProps) {
  return (
    <span
      className={cn(
        'font-display font-normal uppercase tracking-[0.32em] leading-none select-none inline-block',
        !height && 'text-2xl',
        className
      )}
      style={{
        fontSize: height ? `${height}px` : undefined,
        ...style
      }}
      {...props}
    >
      JANANI
    </span>
  )
}
