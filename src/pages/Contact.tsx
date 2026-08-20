import { useState } from 'react'
import { SelvedgeRule } from '../components/SelvedgeRule'
import { Logo, type FirmId } from '../components/brand/Logo'
import { usePageMeta } from '../lib/usePageMeta'

interface FirmContact {
  id: FirmId
  name: string
  gst: string
  address: string[]
  phone: string
  email: string
  visiting: string
}

const FIRMS: FirmContact[] = [
  {
    id: 'jdt',
    name: 'Janani Dreams TexFab Pvt Ltd',
    gst: 'GST 24ABCDE1234F1Z5',
    address: ['Plot 17, GIDC Sachin', 'Surat 394230, Gujarat, India'],
    phone: '+91 98765 43210',
    email: 'trade@janani.in',
    visiting: 'Mon – Sat · 10:00 – 18:00 IST · by appointment'
  },
  {
    id: 'jdw',
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
                <Logo variant="lockup" firm={f.id} height={24} className="text-ink" decorative />
                <p className="mt-4 font-utility text-xs text-ink-soft">{f.gst}</p>
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
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={`tel:${f.phone.replace(/\s/g, '')}`}
                    className="border border-ink px-5 py-2 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
                  >
                    Call
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-ink px-5 py-2 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper-deep">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">General enquiry</p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            For retail partnerships, export accounts, or visiting both showrooms.
          </h2>

          <div className="mt-12 max-w-xl">
            {submitted ? (
              <div className="border border-zari/60 bg-paper p-8">
                <p className="font-display text-2xl text-ink">Thank you</p>
                <p className="mt-3 text-base text-ink-soft">
                  We have received your note. The trade desk will respond within four working hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border border-ink px-6 py-2.5 font-utility text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-paper transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block font-utility text-xs uppercase tracking-[0.18em] text-ink">
                    Name / Store
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="mt-2 w-full border border-zari/60 bg-paper px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-utility text-xs uppercase tracking-[0.18em] text-ink">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="mt-2 w-full border border-zari/60 bg-paper px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-utility text-xs uppercase tracking-[0.18em] text-ink">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="mt-2 w-full border border-zari/60 bg-paper px-4 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="border border-ink px-8 py-3.5 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Visiting us</p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Showroom appointments are scheduled one day in advance.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="border border-zari/40 p-6 bg-paper">
              <p className="font-utility text-xs uppercase tracking-[0.18em] text-neel font-semibold">Surat Showroom</p>
              <p className="mt-2 font-display text-lg text-ink">Janani Dreams TexFab Pvt Ltd</p>
              <p className="mt-1 text-sm text-ink-soft">Plot 17, GIDC Sachin, Surat, Gujarat 394230</p>
              <p className="mt-4 text-xs font-utility text-ink-soft">20 mins from Surat Airport (STV) · 30 mins from Surat Railway Station</p>
            </div>
            <div className="border border-zari/40 p-6 bg-paper">
              <p className="font-utility text-xs uppercase tracking-[0.18em] text-lac font-semibold">Jaipur Showroom</p>
              <p className="mt-2 font-display text-lg text-ink">Janani Designer World</p>
              <p className="mt-1 text-sm text-ink-soft">B-22, Sitapura Industrial Area, Jaipur, Rajasthan 302022</p>
              <p className="mt-4 text-xs font-utility text-ink-soft">15 mins from Jaipur International Airport (JAI)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
