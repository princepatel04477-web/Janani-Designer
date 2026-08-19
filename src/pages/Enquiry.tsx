import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../context/BasketContext'
import { BRANDS } from '../data/brands'
import { usePageMeta } from '../lib/usePageMeta'

type FormState = {
  businessName: string
  contactName: string
  phone: string
  email: string
  city: string
  gst: string
  buyerType: 'boutique' | 'multi-brand store' | 'distributor' | 'export' | ''
  notes: string
}

const initialForm: FormState = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  city: '',
  gst: '',
  buyerType: '',
  notes: ''
}

type FieldErrors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): FieldErrors {
  const errs: FieldErrors = {}
  if (!form.businessName.trim()) errs.businessName = 'Required'
  if (!form.contactName.trim()) errs.contactName = 'Required'
  if (!form.phone.trim()) errs.phone = 'Required'
  if (!form.email.trim()) errs.email = 'Required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Use a valid email'
  if (!form.city.trim()) errs.city = 'Required'
  if (!form.buyerType) errs.buyerType = 'Choose one'
  return errs
}

export default function Enquiry() {
  usePageMeta({
    title: 'Send enquiry',
    description: 'Send your enquiry basket to Janani. We reply within one business day with MOQ, lead time and pricing.'
  })
  const { items, count, clear } = useBasket()
  const [form, setForm] = useState<FormState>(initialForm)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<{ codes: string[]; firms: string[] } | null>(null)

  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }
  const markTouched = (key: keyof FormState) => setTouched(t => ({ ...t, [key]: true }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) {
      setTouched({
        businessName: true,
        contactName: true,
        phone: true,
        email: true,
        city: true,
        buyerType: true
      })
      return
    }
    setSubmitting(true)
    // Placeholder POST — replace with real endpoint.
    setTimeout(() => {
      const firms = Array.from(new Set(items.map(i => BRANDS[i.firm].name)))
      setSubmitted({ codes: items.map(i => i.code), firms })
      setSubmitting(false)
    }, 600)
  }

  const waText =
    `Hello Janani — please send a quote on:\n` +
    items.map(i => `- ${i.code} (${i.colourway}) × ${i.quantity}`).join('\n')
  const waHref = `https://wa.me/919876543210?text=${encodeURIComponent(waText)}`

  if (submitted) {
    return (
      <section className="bg-paper">
        <div className="container-site max-w-2xl py-24 lg:py-32">
          <p className="eyebrow">Enquiry received</p>
          <h1 className="mt-6 font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Thank you. The house will reply within one business day.
          </h1>
          <p className="mt-6 text-ink-soft">
            The enquiry covers the following designs:
          </p>
          <ul className="mt-4 divide-y divide-zari/30 border-y border-zari/30 font-utility text-sm">
            {submitted.codes.map(c => (
              <li key={c} className="py-3">{c}</li>
            ))}
          </ul>
          <p className="mt-8 text-ink-soft">
            A copy of this list has been retained on this device until you sign in.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/collections" className="border border-zari px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature">
              Back to catalogue
            </Link>
            <button
              type="button"
              onClick={() => { clear(); setSubmitted(null); setForm(initialForm) }}
              className="border border-ink px-7 py-3 font-utility text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors duration-base ease-signature"
            >
              Start a new enquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-paper">
      <div className="container-site max-w-3xl py-16 lg:py-20">
        <p className="eyebrow">Send enquiry</p>
        <h1 className="mt-5 font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
          A few details, and the house replies within a day.
        </h1>

        {items.length === 0 ? (
          <p className="mt-8 max-w-prose text-ink-soft">
            The basket is empty.{' '}
            <Link to="/collections" className="underline decoration-zari underline-offset-4 hover:text-ink">
              Open the catalogue
            </Link>{' '}
            and add a few designs first.
          </p>
        ) : (
          <>
            <div className="mt-10 border border-zari/30 p-6">
              <p className="eyebrow">Enquiry list</p>
              <ul className="mt-3 divide-y divide-zari/30 border-y border-zari/30 font-utility text-sm">
                {items.map(i => (
                  <li key={`${i.code}-${i.colourway}`} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 py-3">
                    <span>{i.code}</span>
                    <span className="text-ink-soft">{i.colourway}</span>
                    <span className="text-ink-soft">× {i.quantity}</span>
                    <span style={{ color: BRANDS[i.firm].accentHex }}>{BRANDS[i.firm].name.split(' ').slice(0, 2).join(' ')}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-utility text-xs text-ink-soft">{count} pieces across {new Set(items.map(i => i.firm)).size} firm(s)</p>
              <Link to="/" className="mt-3 inline-block font-utility text-xs underline decoration-zari underline-offset-4 hover:text-ink">
                Edit the list
              </Link>
            </div>

            <form noValidate onSubmit={onSubmit} className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <Field label="Business name" required error={touched.businessName ? errors.businessName : undefined}>
                <input
                  className={inputClass}
                  value={form.businessName}
                  onChange={e => set('businessName', e.target.value)}
                  onBlur={() => markTouched('businessName')}
                  aria-invalid={touched.businessName && !!errors.businessName}
                />
              </Field>
              <Field label="Contact name" required error={touched.contactName ? errors.contactName : undefined}>
                <input
                  className={inputClass}
                  value={form.contactName}
                  onChange={e => set('contactName', e.target.value)}
                  onBlur={() => markTouched('contactName')}
                  aria-invalid={touched.contactName && !!errors.contactName}
                />
              </Field>
              <Field label="Phone" required error={touched.phone ? errors.phone : undefined}>
                <input
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  onBlur={() => markTouched('phone')}
                  aria-invalid={touched.phone && !!errors.phone}
                />
              </Field>
              <Field label="Email" required error={touched.email ? errors.email : undefined}>
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  onBlur={() => markTouched('email')}
                  aria-invalid={touched.email && !!errors.email}
                />
              </Field>
              <Field label="City" required error={touched.city ? errors.city : undefined}>
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={e => set('city', e.target.value)}
                  onBlur={() => markTouched('city')}
                  aria-invalid={touched.city && !!errors.city}
                />
              </Field>
              <Field label="GST number" hint="Optional">
                <input
                  className={inputClass}
                  value={form.gst}
                  onChange={e => set('gst', e.target.value)}
                />
              </Field>

              <Field label="Buyer type" required error={touched.buyerType ? errors.buyerType : undefined} className="sm:col-span-2">
                <div className="flex flex-wrap gap-3">
                  {(['boutique', 'multi-brand store', 'distributor', 'export'] as const).map(opt => (
                    <label key={opt} className="flex cursor-pointer items-center gap-3 border border-zari/40 px-4 py-3 text-sm hover:border-zari">
                      <input
                        type="radio"
                        name="buyerType"
                        checked={form.buyerType === opt}
                        onChange={() => { set('buyerType', opt); markTouched('buyerType') }}
                        className="h-4 w-4 cursor-pointer border border-zari accent-zari"
                      />
                      <span>{opt[0].toUpperCase() + opt.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Notes" hint="Optional — colourway preferences, delivery window, anything we should know" className="sm:col-span-2">
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                />
              </Field>

              <div className="sm:col-span-2 flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="border border-ink px-8 py-4 font-utility text-xs uppercase tracking-[0.18em] bg-ink text-paper hover:bg-neel transition-colors duration-base ease-signature disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Send enquiry'}
                </button>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-zari px-8 py-4 font-utility text-xs uppercase tracking-[0.18em] hover:bg-zari hover:text-paper transition-colors duration-base ease-signature"
                >
                  Send this list on WhatsApp
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  )
}

const inputClass =
  'block w-full border-b border-zari/40 bg-transparent py-3 text-base focus:border-zari focus:outline-none'

function Field({
  label,
  hint,
  required,
  error,
  children,
  className
}: {
  label: string
  hint?: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block">
        <span className="font-utility text-xs text-ink-soft">
          {label}{required && <span aria-hidden style={{ color: 'var(--lac)' }}> *</span>}
          {hint && <span className="ml-2 text-ink-soft/70">{hint}</span>}
        </span>
        <div className="mt-3">{children}</div>
      </label>
      {error && (
        <p className="mt-2 font-utility text-xs" style={{ color: 'var(--lac)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
