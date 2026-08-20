import { SelvedgeRule } from '../components/SelvedgeRule'
import { Picture } from '../components/Picture'
import ScrollReveal from '../components/bits/ScrollReveal'
import BlurText from '../components/bits/BlurText'
import AnimatedContent from '../components/bits/AnimatedContent'
import { usePageMeta } from '../lib/usePageMeta'

const TIMELINE = [
  { year: 2016, text: 'Janani Dreams TexFab and Janani Designer World established in Surat and Jaipur.' },
  { year: 2018, text: 'Second weaving shed added in Sachin GIDC; loom capacity expands to over 150 looms.' },
  { year: 2020, text: 'Direct wholesale distribution established across retail boutiques and multi-brand buyers nationwide.' },
  { year: 2022, text: 'Dedicated zardozi and hand-embroidery units commissioned on the Jaipur finishing floor.' },
  { year: 2024, text: 'Loom capacity expands to 420 looms with 9,000 finished sarees and bridal pieces per month.' },
  { year: 2026, text: 'Twelve bridal and reception cycles a year; master karigars supplying leading retail boutiques across India.' }
]

export default function Craft() {
  usePageMeta({
    title: 'Craft and legacy',
    description: 'Two firms, one ledger, master karigars on the same benches. The loom, the bench, the mark.'
  })

  return (
    <>
      <section className="bg-paper">
        <div className="container-site py-20 lg:py-24">
          <p className="eyebrow">Craft and legacy</p>
          <BlurText
            tag="h1"
            text="Two firms, one ledger, master karigars on the same benches."
            className="mt-6 max-w-3xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl"
            delay={50}
          />
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper">
        <div className="container-site mx-auto max-w-[65ch] py-20 lg:py-24">
          <AnimatedContent distance={32}>
            <p className="font-display text-xl leading-snug text-ink lg:text-2xl">
              Janani started as one loom-room in Surat. The cloth runs across two firms now, but the rule that began it is still the rule: every loom under the roof is the firm's, never contract, and every karigar on the bench has a name.
            </p>
            <p className="mt-10 text-base leading-[1.7] text-ink">
              We do not commission weaving outside. We do not buy readymade and stamp the label. The weavers are on the roll, the finishers on the bench, and the embroidery house is a stone's throw from the loom-room. That is how a saree from JDT-2401 is the same saree in Surat and in Surat.
            </p>
          </AnimatedContent>
        </div>
      </section>

      <FullBleed image="/placeholders/fabric-3.webp" alt="Macro of zari brocade on silk" />

      <section className="bg-paper">
        <div className="container-site mx-auto max-w-[60ch] py-20 lg:py-24">
          <ScrollReveal>
            The weaver marks his bench before he begins. The mark is the same one his father used.
          </ScrollReveal>
          <AnimatedContent distance={32} delay={0.2}>
            <p className="mt-12 text-base leading-[1.7] text-ink">
              Inside the Surat shed, the warping, dyeing, weaving and finishing happen within sight of each other. A thread breaks in the loom and the weaver is at it before it leaves the reed. The finishing floor at Jaipur is laid out the same way — kalamkari first, then the embroidery shed, then the press, then the pack room. We have not changed the order in twenty-one years.
            </p>
          </AnimatedContent>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper-deep">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow">The record</p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Thirty-nine years of continuous production across Surat and Jaipur.
          </h2>
          <div className="mt-16 divide-y divide-zari/30 border-y border-zari/30">
            {TIMELINE.map(item => (
              <div key={item.year} className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[120px_1fr] sm:items-baseline">
                <span className="font-utility text-sm font-semibold text-ink">{item.year}</span>
                <p className="text-base text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function FullBleed({ image, alt }: { image: string; alt: string }) {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden bg-ink">
      <Picture
        src={image}
        alt={alt}
        className="h-full w-full object-cover object-center opacity-85"
        loading="lazy"
      />
    </section>
  )
}
