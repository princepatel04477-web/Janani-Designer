import { Link } from 'react-router-dom'
import { SelvedgeRule } from '../components/SelvedgeRule'
import { usePageMeta } from '../lib/usePageMeta'

const MOQ = [
  { label: 'Everyday cotton silk', value: '48 pieces' },
  { label: 'Banarasi, georgette, organza', value: '24 pieces' },
  { label: 'Kanjivaram', value: '12 pieces' },
  { label: 'Bridal lehenga', value: '6 pieces' },
  { label: 'Reception / sangeet lehenga', value: '8 – 12 pieces' },
  { label: 'Lightweight festive', value: '24 pieces' }
]

const LEAD = [
  { label: 'Everyday', value: '3 – 4 weeks' },
  { label: 'Reception & sangeet', value: '6 – 8 weeks' },
  { label: 'Couture bridal', value: '10 – 12 weeks' },
  { label: 'Custom colourway (existing design)', value: '+2 weeks' }
]

const CUSTOMISATION = [
  { label: 'Colourway', value: 'Two additional colourways inside the same lead time. Min. 50 pieces per colourway.' },
  { label: 'Private label', value: 'Buyer label, hangtag, bar-coded SKU. Care labels and price tickets included.' },
  { label: 'Embroidery name', value: 'Buyer\'s initials or house mark in the blouse piece or dupatta, by arrangement.' },
  { label: 'Packing', value: 'Single-piece polybag + outer box, six per master carton. Custom box print from 200 pieces.' }
]

const SHIPPING = [
  { label: 'Pan-India', value: 'Door-to-door, 7 days from Surat or Jaipur.' },
  { label: 'Export — Gulf', value: 'FOB Mumbai and CIF Jebel Ali, 21 days.' },
  { label: 'Export — UK & Europe', value: 'FOB Mumbai, 28 days via sea.' },
  { label: 'Export — North America', value: 'FOB Mumbai, 35 days via sea or air on request.' }
]

const PAYMENT = [
  { label: 'Domestic', value: '30% advance, 70% against invoice before dispatch. NEFT, RTGS, UPI.' },
  { label: 'Export', value: '30% advance by T/T, 70% against scanned shipping documents. LC at sight on orders above ₹25 lakh.' }
]

export default function Partner() {
  usePageMeta({
    title: 'Partner with us',
    description: 'MOQ by category, lead times, customisation, packaging, shipping and payment terms — the commercial side of the house.'
  })
  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Partner with us</p>
          <h1 className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Buyers place on the floor, not behind it. Numbers here, in plain text.
          </h1>
          <p className="mt-6 max-w-prose text-ink-soft">
            This page is the commercial side of the house. Every figure here is the figure we trade at — no negotiation tier, no preferential bands. Larger buyers run on the same terms, scaled by volume.
          </p>
        </div>
      </section>

      <SelvedgeRule />

      <Section title="MOQ by category" rows={MOQ} />

      <SelvedgeRule />

      <Section title="Lead times" rows={LEAD} />

      <SelvedgeRule />

      <Section title="Customisation" rows={CUSTOMISATION} />

      <SelvedgeRule />

      <Section title="Packaging" rows={[
        { label: 'Single piece', value: 'Polybag, folded, single-piece pack.' },
        { label: 'Master carton', value: '6 polybags per master carton. Reinforced for export.' },
        { label: 'Custom packing', value: 'Custom box print from 200 pieces per design.' }
      ]} />

      <SelvedgeRule />

      <Section title="Shipping and export" rows={SHIPPING} />

      <SelvedgeRule />

      <Section title="Payment terms" rows={PAYMENT} />

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site py-24 lg:py-32">
          <p className="eyebrow">Send the catalogue</p>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Forty pieces, two firms, one PDF. We send it the same hour.
          </h2>
          <form
            className="mt-12 flex flex-col items-stretch gap-3 border-b border-ink/30 pb-3 sm:flex-row sm:items-end"
            onSubmit={e => e.preventDefault()}
          >
            <label className="flex-1">
              <span className="sr-only">Email</span>
              <input
                type="email"
                placeholder="trade@yourstore.com"
                className="w-full bg-transparent py-3 text-lg focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="self-start border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors duration-base ease-signature sm:self-end"
            >
              Send catalogue
            </button>
          </form>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/enquiry" className="border border-zari px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature">
              Open enquiry basket
            </Link>
            <Link to="/collections" className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors duration-base ease-signature">
              Browse the catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

interface Row { label: string; value: string }

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section className="bg-paper">
      <div className="container-site py-20 lg:py-24">
        <p className="eyebrow">{title}</p>
        <dl className="mt-8 divide-y divide-zari/30 border-y border-zari/30">
          {rows.map(r => (
            <div key={r.label} className="grid grid-cols-[1fr_2fr] gap-8 py-5">
              <dt className="font-utility text-xs text-ink-soft">{r.label}</dt>
              <dd className="text-sm">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
