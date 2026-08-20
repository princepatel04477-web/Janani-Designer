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
  
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
      setForm({ name: '', email: '', message: '' })
    }, 400)
  }

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
          {FIRMS.map(f => {
            const waNumber = f.phone.replace(/\D/g, '')
            const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello Janani — please contact me about ${f.name}.`)}`

            return (
              <div key={f.name} className="border border-zari/40 p-8 bg-paper">
                <p className="font-display text-2xl text-ink">{f.name}</p>
                <p className="mt-3 font-utility text-xs text-ink-soft">{f.gst}</p>
                <ul className="mt-6 space-y-1 text-base text-ink">
                  {f.address.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
                <dl className="mt-6 divide-y divide-zari/30 border-y border-zari/30 text-sm">
                  <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
                    <dt className="font-utility text-xs text-ink-soft">Phone</dt>
                    <dd><a href={`tel:${f.phone.replace(/\s/g, '')}`} className="text-ink hover:underline decoration-zari">{f.phone}</a></dd>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
                    <dt className="font-utility text-xs text-ink-soft">Email</dt>
                    <dd><a href={`mailto:${f.email}`} className="text-ink hover:underline decoration-zari">{f.email}</a></dd>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-4 py-3">
                    <dt className="font-utility text-xs text-ink-soft">Visiting</dt>
                    <dd className="text-ink">{f.visiting}</dd>
                  </div>
                </dl>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex items-center border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
                >
                  Chat on WhatsApp
                </a>
              </div>
            )
          })}
        </div>
      </section>

      <SelvedgeRule />

      {/* Showroom locations */}
      <section className="bg-paper-deep">
        <div className="container-site py-12 lg:py-16">
          <div
            role="region"
            aria-label="Surat and Jaipur showroom coordinates"
            className="relative aspect-[21/9] w-full overflow-hidden border border-zari/40 bg-paper-deep flex items-center justify-center text-ink-soft"
          >
            <div className="text-center p-6">
              <p className="font-display text-xl text-ink">Showroom Locations</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-6 justify-center">
                <div className="border border-zari/30 bg-paper p-4">
                  <p className="font-utility text-xs font-semibold text-ink">Surat Weaving Sheds</p>
                  <p className="mt-1 font-utility text-xs text-ink-soft">21.17° N · 72.83° E · Sachin GIDC</p>
                </div>
                <div className="border border-zari/30 bg-paper p-4">
                  <p className="font-utility text-xs font-semibold text-ink">Jaipur Finishing Floor</p>
                  <p className="mt-1 font-utility text-xs text-ink-soft">26.91° N · 75.79° E · Sitapura</p>
                </div>
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
            Not a bulk buyer? Drop a line.
          </h2>
          {submitted ? (
            <div className="mt-10 border border-ink bg-paper p-6 text-ink">
              <p className="font-display text-xl">Thank you for your message.</p>
              <p className="mt-2 text-ink-soft">The house will reply within one business day.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 border border-ink px-6 py-2 font-utility text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
              <label className="block">
                <span className="font-utility text-xs text-ink-soft">Your name <span aria-hidden style={{ color: 'var(--lac)' }}>*</span></span>
                <input
                  name="name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="mt-3 block w-full border-b border-zari/60 bg-transparent py-3 text-base text-ink focus:border-ink focus-visible:outline-none"
                  required
                />
              </label>
              <label className="block">
                <span className="font-utility text-xs text-ink-soft">Your email <span aria-hidden style={{ color: 'var(--lac)' }}>*</span></span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="mt-3 block w-full border-b border-zari/60 bg-transparent py-3 text-base text-ink focus:border-ink focus-visible:outline-none"
                  required
                />
              </label>
              <label className="block">
                <span className="font-utility text-xs text-ink-soft">Message <span aria-hidden style={{ color: 'var(--lac)' }}>*</span></span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="mt-3 block w-full border-b border-zari/60 bg-transparent py-3 text-base text-ink focus:border-ink focus-visible:outline-none"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="border border-ink px-8 py-4 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature disabled:opacity-50"
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
