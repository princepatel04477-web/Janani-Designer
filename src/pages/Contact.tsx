import { useState } from 'react'
import { SelvedgeRule } from '../components/SelvedgeRule'
import { usePageMeta } from '../lib/usePageMeta'

const FIRMS = [
  {
    name: 'Janani Dreams TexFab Pvt Ltd',
    gst: 'GST 24ABCDE1234F1Z5',
    address: ['Plot 17, GIDC Sachin', 'Surat 394230, Gujarat, India'],
    phone: '+91 98765 43210',
    email: 'trade@janani.in',
    visiting: 'Mon – Sat · 10:00 – 18:00 IST · by appointment'
  },
  {
    name: 'Janani Designer World',
    gst: 'GST 08ABCDE5678G1Z9',
    address: ['B-22, Sitapura Industrial Area', 'Jaipur 302022, Rajasthan, India'],
    phone: '+91 98765 43211',
    email: 'bridal@janani.in',
    visiting: 'Mon – Sat · 10:00 – 19:00 IST · by appointment'
  }
]

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description: 'Janani showrooms in Surat and Jaipur, plus phone, email and a general enquiry form.'
  })
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Two firms, two floors. Pick the one you need.
          </h1>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          {FIRMS.map(f => (
            <div key={f.name}>
              <p className="font-display text-2xl">{f.name}</p>
              <p className="mt-3 font-utility text-xs text-ink-soft">{f.gst}</p>
              <ul className="mt-6 space-y-1 text-base">
                {f.address.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
              <dl className="mt-6 divide-y divide-zari/30 border-y border-zari/30 text-sm">
                <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
                  <dt className="font-utility text-xs text-ink-soft">Phone</dt>
                  <dd><a href={`tel:${f.phone.replace(/\s/g, '')}`} className="hover:text-zari">{f.phone}</a></dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
                  <dt className="font-utility text-xs text-ink-soft">Email</dt>
                  <dd><a href={`mailto:${f.email}`} className="hover:text-zari">{f.email}</a></dd>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
                  <dt className="font-utility text-xs text-ink-soft">Visiting</dt>
                  <dd>{f.visiting}</dd>
                </div>
              </dl>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Janani — please contact me about ${f.name}.`)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center border border-zari px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
              >
                Chat on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </section>

      <SelvedgeRule />

      {/* Embedded map — placeholder div with a label, no third-party API key required */}
      <section className="bg-paper-deep">
        <div className="container-site py-12 lg:py-16">
          <div
            role="img"
            aria-label="Map of Surat and Jaipur showrooms (placeholder)"
            className="relative aspect-[21/9] w-full overflow-hidden border border-zari/30 bg-paper-deep"
          >
            <div className="absolute inset-0 flex items-center justify-center text-ink-soft">
              <div className="text-center">
                <p className="font-utility text-xs">Surat · 21.17° N · 72.83° E</p>
                <p className="mt-2 font-utility text-xs">Jaipur · 26.91° N · 75.79° E</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site max-w-2xl py-20 lg:py-24">
          <p className="eyebrow">General enquiry</p>
          <h2 className="mt-6 font-display text-2xl font-normal leading-[1.1] tracking-tight lg:text-3xl">
            Not a buyer? Drop a line.
          </h2>
          {submitted ? (
            <p className="mt-10 text-ink-soft">
              Thank you. The house will reply within a business day.
            </p>
          ) : (
            <form
              className="mt-10 space-y-8"
              onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
            >
              <Row label="Your name"><input className="block w-full border-b border-zari/40 bg-transparent py-3 text-base focus:border-zari focus:outline-none" required /></Row>
              <Row label="Your email"><input className="block w-full border-b border-zari/40 bg-transparent py-3 text-base focus:border-zari focus:outline-none" type="email" required /></Row>
              <Row label="Message"><textarea rows={4} className="block w-full border-b border-zari/40 bg-transparent py-3 text-base focus:border-zari focus:outline-none" required /></Row>
              <button
                type="submit"
                className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-utility text-xs text-ink-soft">{label}</span>
      <div className="mt-3">{children}</div>
    </label>
  )
}
