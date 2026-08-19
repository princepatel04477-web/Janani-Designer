import { cn } from '../lib/cn'

/**
 * The selvedge rule — the house's only divider.
 * A 2px band of repeating woven-pattern SVG in zari at 40% opacity.
 * See the .selvedge-rule class in src/styles/tokens.css for the weave.
 */
export function SelvedgeRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('selvedge-rule', className)} />
}
