import { Link } from 'react-router-dom'
import { FIRM_LABELS } from '../data/brands'
import { usePageMeta } from '../lib/usePageMeta'
import { SelvedgeRule } from '../components/SelvedgeRule'

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found',
    description: 'The requested page or resource could not be found.'
  })

  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-32 text-center">
          <p className="eyebrow">404 · Not Found</p>
          <h1 className="mt-6 font-display text-4xl text-ink">The requested page is not on the floor.</h1>
          <p className="mt-4 text-ink-soft max-w-md mx-auto">
            The link you followed may have moved or no longer exists. Browse our complete catalogue or return to the main hall.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/collections"
              className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature"
            >
              Open the catalogue
            </Link>
            <Link
              to="/"
              className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
            >
              Back to home
            </Link>
          </div>
          <p className="mt-12 font-utility text-xs text-ink-soft">
            Houses: {Object.values(FIRM_LABELS).join(' · ')}
          </p>
        </div>
      </section>
      <SelvedgeRule />
    </>
  )
}
