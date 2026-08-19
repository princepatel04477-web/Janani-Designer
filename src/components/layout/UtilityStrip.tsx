/**
 * UtilityStrip — the 32px ink band above the nav.
 * Mobile collapses to the phone number only.
 */
export function UtilityStrip() {
  return (
    <div className="bg-ink text-paper">
      <div className="container-site flex h-8 items-center justify-between font-utility text-xs">
        <div className="hidden gap-6 sm:flex">
          <span>Wholesale enquiries · +91 98765 43210</span>
          <a
            href="/contact"
            className="hover:text-zari focus-visible:text-zari"
          >
            Visit the Surat showroom
          </a>
        </div>
        <a
          href="tel:+919876543210"
          className="sm:hidden"
          aria-label="Call wholesale on +91 98765 43210"
        >
          +91 98765 43210
        </a>
        <div className="flex gap-6">
          <a
            href="/contact"
            className="hidden hover:text-zari focus-visible:text-zari sm:inline"
          >
            Contact
          </a>
          <a
            href="/partner"
            className="hover:text-zari focus-visible:text-zari"
          >
            Download catalogue
          </a>
        </div>
      </div>
    </div>
  )
}
