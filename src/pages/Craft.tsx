import { SelvedgeRule } from '../components/SelvedgeRule'
import ScrollReveal from '../components/bits/ScrollReveal'
import { usePageMeta } from '../lib/usePageMeta'

const TIMELINE = [
  { year: 1987, text: 'Janani Dreams TexFab founded in Surat as a six-loom weaving house.' },
  { year: 1993, text: 'Second shed added in Sachin GIDC; capacity grows to forty-two looms.' },
  { year: 2001, text: 'First export order to the Gulf; same packing room that we use today.' },
  { year: 2004, text: 'Janani Designer World opens in Jaipur as a finishing floor for the second generation.' },
  { year: 2010, text: 'Loom count crosses two hundred; sarees and lehenga run as separate books under one ledger.' },
  { year: 2018, text: 'In-house kalamkari block unit added to the Jaipur floor.' },
  { year: 2026, text: 'Twelve bridal and reception cycles a year; nine thousand finished pieces a month; one hundred and twenty karigars on the roll.' }
]

export default function Craft() {
  usePageMeta({
    title: 'Craft and legacy',
    description: 'Two firms, one ledger, three generations on the same benches. The loom, the bench, the mark.'
  })
  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Craft and legacy</p>
          <h1 className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Two firms, one ledger, three generations on the same benches.
          </h1>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site mx-auto max-w-[65ch] py-20 lg:py-24">
          <p className="font-display text-xl leading-snug text-ink lg:text-2xl">
            Janani started as one loom-room in Surat. The cloth runs across two firms now, but the rule that began it is still the rule: every loom under the roof is the firm\'s, never contract, and every karigar on the bench has a name.
          </p>
          <p className="mt-10 text-base leading-[1.7]">
            We do not commission weaving outside. We do not buy readymade and stamp the label. The weavers are on the roll, the finishers on the bench, and the embroidery house is a stone\'s throw from the loom-room. That is how a saree from JDT-2401 is the same saree in Surat and in Surat.
          </p>
        </div>
      </section>

      <FullBleed image="/placeholders/fabric-3.webp" alt="Macro of zari brocade on silk" />

      <section className="bg-paper">
        <div className="container-site mx-auto max-w-[60ch] py-20 lg:py-24">
          <ScrollReveal>
            The weaver marks his bench before he begins. The mark is the same one his father used.
          </ScrollReveal>
          <p className="mt-12 text-base leading-[1.7]">
            Inside the Surat shed, the warping, dyeing, weaving and finishing happen within sight of each other. A thread breaks in the loom and the weaver is at it before it leaves the reed. The finishing floor at Jaipur is laid out the same way — kalamkari first, then the embroidery shed, then the press, then the pack room. We have not changed the order in twenty-one years.
          </p>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper-deep">
        <div className="container-site mx-auto max-w-2xl py-20 lg:py-24">
          <p className="eyebrow">Timeline</p>
          <ol className="mt-10 divide-y divide-zari/30 border-y border-zari/30">
            {TIMELINE.map(t => (
              <li key={t.year} className="grid grid-cols-[80px_1fr] gap-6 py-6">
                <span className="font-utility text-sm">{t.year}</span>
                <span className="text-base">{t.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

function FullBleed({ image, alt }: { image: string; alt: string }) {
  return (
    <section className="relative isolate h-[60vh] w-full overflow-hidden bg-ink">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    </section>
  )
}
