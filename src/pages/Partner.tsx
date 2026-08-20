import { Link } from 'react-router-dom'
import { SelvedgeRule } from '../components/SelvedgeRule'
import BlurText from '../components/bits/BlurText'
import Magnet from '../components/bits/Magnet'
import ShinyText from '../components/bits/ShinyText'
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
  { label: 'Pan-India', value: 'Door-to-door, 7 days from Surat.' },
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
          <p className="eyebrow">
            <ShinyText text="Partner with us" color="var(--ink-soft)" shineColor="var(--zari)" speed={7} />
          </p>
          <BlurText
            tag="h1"
            text="Buyers place on the floor, not behind it. Numbers here, in plain text."
            className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl"
            delay={40}
          />
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow">Minimum Order Quantities</p>
              <dl className="mt-8 divide-y divide-zari/30 border-y border-zari/30">
                {MOQ.map(item => (
                  <div key={item.label} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[1fr_140px] sm:items-baseline">
                    <dt className="text-base text-ink">{item.label}</dt>
                    <dd className="font-utility text-sm font-semibold text-ink sm:text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="eyebrow">Lead times</p>
              <dl className="mt-8 divide-y divide-zari/30 border-y border-zari/30">
                {LEAD.map(item => (
                  <div key={item.label} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[1fr_160px] sm:items-baseline">
                    <dt className="text-base text-ink">{item.label}</dt>
                    <dd className="font-utility text-sm font-semibold text-ink sm:text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper-deep">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Terms & Customisation</p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Customise the colour line, add private labeling, and agree on export terms.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-zari/40 bg-paper p-8">
              <p className="font-display text-xl text-ink">Customisation</p>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                {CUSTOMISATION.map(item => (
                  <li key={item.label}>
                    <strong className="font-utility text-xs text-ink uppercase block">{item.label}</strong>
                    <span className="mt-1 block">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-zari/40 bg-paper p-8">
              <p className="font-display text-xl text-ink">Shipping & Freight</p>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                {SHIPPING.map(item => (
                  <li key={item.label}>
                    <strong className="font-utility text-xs text-ink uppercase block">{item.label}</strong>
                    <span className="mt-1 block">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-zari/40 bg-paper p-8 sm:col-span-2 lg:col-span-1">
              <p className="font-display text-xl text-ink">Payment terms</p>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                {PAYMENT.map(item => (
                  <li key={item.label}>
                    <strong className="font-utility text-xs text-ink uppercase block">{item.label}</strong>
                    <span className="mt-1 block">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site max-w-3xl py-20 lg:py-24">
          <p className="eyebrow">Download trade deck</p>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Forty pieces, two firms, one PDF. We send it the same hour.
          </h2>
          <form
            className="mt-12 flex flex-col items-stretch gap-3 border-b border-ink/40 pb-3 sm:flex-row sm:items-end"
            onSubmit={e => {
              e.preventDefault()
              alert('Trade deck request received. The catalogue will be sent to your email.')
            }}
          >
            <label className="flex-1">
              <span className="sr-only">Email</span>
              <input
                type="email"
                required
                placeholder="trade@yourstore.com"
                className="w-full bg-transparent py-3 text-lg text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 placeholder:text-ink-soft/60"
              />
            </label>
            <Magnet padding={40} magnetStrength={3}>
              <button
                type="submit"
                className="self-start border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature sm:self-end"
              >
                Send catalogue
              </button>
            </Magnet>
          </form>
          <div className="mt-12 flex flex-wrap gap-4">
            <Magnet padding={30} magnetStrength={3}>
              <Link to="/enquiry" className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature">
                Open enquiry basket
              </Link>
            </Magnet>
            <Magnet padding={30} magnetStrength={3}>
              <Link to="/collections" className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature">
                Browse catalogue
              </Link>
            </Magnet>
          </div>
        </div>
      </section>
    </>
  )
}
