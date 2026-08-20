import { Link } from 'react-router-dom'

/**
 * UtilityStrip — the 32px ink band above the nav.
 * Mobile collapses to the phone number only. Uses React Router Links to avoid full page reload.
 */
export function UtilityStrip() {
  return (
    <div className="bg-ink text-paper border-b border-paper/10 relative z-50">
      <div className="container-site flex h-8 items-center justify-between font-utility text-xs">
        <div className="hidden gap-6 sm:flex">
          <span>Wholesale enquiries · +91 95867 21213</span>
          <Link
            to="/contact"
            className="text-paper/80 hover:text-paper focus-visible:text-paper underline decoration-zari/60 decoration-1 underline-offset-2"
          >
            Visit the Surat showroom
          </Link>
        </div>
        <a
          href="tel:+919586721213"
          className="sm:hidden text-paper"
          aria-label="Call wholesale on +91 95867 21213"
        >
          +91 95867 21213
        </a>
        <div className="flex gap-6">
          <Link
            to="/contact"
            className="hidden text-paper/80 hover:text-paper focus-visible:text-paper sm:inline underline decoration-zari/60 decoration-1 underline-offset-2"
          >
            Contact
          </Link>
          <Link
            to="/partner"
            className="text-paper/80 hover:text-paper focus-visible:text-paper underline decoration-zari/60 decoration-1 underline-offset-2"
          >
            Download catalogue
          </Link>
        </div>
      </div>
    </div>
  )
}
