import type { HTMLAttributes } from 'react'
import { LogoWordmark } from './LogoWordmark'
import { LogoMonogram } from './LogoMonogram'
import { BRANDS } from '../../data/brands'
import { cn } from '../../lib/cn'

export type FirmId = 'jdt' | 'jdw'

export interface LogoProps extends HTMLAttributes<HTMLElement> {
  /** wordmark = JANANI in Bodoni Moda. monogram = the rosette mark alone. lockup = wordmark + firm line. */
  variant?: 'wordmark' | 'monogram' | 'lockup'
  /** Only meaningful for variant="lockup". Drives the firm line and its accent. */
  firm?: FirmId
  /** Height or font-size in px. */
  height?: number
  /** Decorative instances get aria-hidden; parent link/button supplies name. */
  decorative?: boolean
  className?: string
}

/**
 * Logo — authoritative brand mark component for Janani textile house.
 * Supports the original Bodoni Moda wordmark, the house rosette monogram, and firm lockups.
 */
export function Logo({
  variant = 'wordmark',
  firm,
  height,
  decorative = true,
  className,
  ...props
}: LogoProps) {
  if (variant === 'monogram') {
    const defaultHeight = height ?? 28
    return (
      <LogoMonogram
        height={defaultHeight}
        className={className}
        aria-hidden={decorative ? 'true' : undefined}
        {...(props as any)}
      />
    )
  }

  if (variant === 'lockup' && firm) {
    const defaultHeight = height ?? 22
    const firmData = BRANDS[firm]
    const accentClass = firm === 'jdt' ? 'text-neel' : 'text-lac'

    return (
      <div
        className={cn('inline-flex flex-col items-start', className)}
        aria-hidden={decorative ? 'true' : undefined}
        {...props}
      >
        <LogoWordmark height={defaultHeight} />
        <div className="my-2 h-px w-full bg-zari opacity-40" aria-hidden="true" />
        <span
          className={cn(
            'font-utility text-[11px] font-medium uppercase tracking-[0.18em]',
            accentClass
          )}
        >
          {firmData.name}
        </span>
      </div>
    )
  }

  const defaultHeight = height ?? 24
  return (
    <LogoWordmark
      height={defaultHeight}
      className={className}
      aria-hidden={decorative ? 'true' : undefined}
      {...props}
    />
  )
}
