import type { SVGProps } from 'react'

interface LogoWordmarkProps extends SVGProps<SVGSVGElement> {
  height?: number
}

/**
 * LogoWordmark — the "JANANI" house wordmark.
 * Outlined paths only (no <text>), fill="currentColor", zero hardcoded hex.
 */
export function LogoWordmark({ height = 28, className, ...props }: LogoWordmarkProps) {
  // Aspect ratio is 520 : 80 (6.5 : 1)
  const width = Math.round(height * 6.5)
  return (
    <svg
      viewBox="0 0 520 80"
      height={height}
      width={width}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <g>
        <path d="M 22 14 H 56 V 21 H 44 V 58 C 44 68 38 75 25 75 C 12 75 6 66 6 59 C 6 53 11 49 17 49 C 23 49 27 53 27 59 C 27 65 30 68 36 68 C 40 68 43 64 43 56 V 21 H 22 Z" />
        <path d="M 112 14 H 126 L 156 74 H 143 L 135 58 H 103 L 95 74 H 82 L 112 14 Z M 119 25 L 107 51 H 131 L 119 25 Z" />
        <path d="M 184 14 H 196 V 34 L 232 14 H 244 V 74 H 232 V 54 L 196 74 H 184 V 14 Z" />
        <path d="M 298 14 H 312 L 342 74 H 329 L 321 58 H 289 L 281 74 H 268 L 298 14 Z M 305 25 L 293 51 H 317 L 305 25 Z" />
        <path d="M 370 14 H 382 V 34 L 418 14 H 430 V 74 H 418 V 54 L 382 74 H 370 V 14 Z" />
        <path d="M 468 14 H 502 V 21 H 490 V 67 H 502 V 74 H 468 V 67 H 480 V 21 H 468 Z" />
      </g>
    </svg>
  )
}
