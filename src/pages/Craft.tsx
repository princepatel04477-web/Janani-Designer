import { SelvedgeRule } from '../components/SelvedgeRule'
import { Picture } from '../components/Picture'
import ScrollReveal from '../components/bits/ScrollReveal'
import BlurText from '../components/bits/BlurText'
import AnimatedContent from '../components/bits/AnimatedContent'
import { usePageMeta } from '../lib/usePageMeta'

const TIMELINE = [
  { year: 2016, text: 'Janani Dreams TexFab and Janani Designer World established in Surat.' },
  { year: 2018, text: 'Second weaving shed added; loom capacity expands to over 150 looms.' },
  { year: 2020, text: 'Direct wholesale distribution established across retail boutiques and multi-brand buyers nationwide.' },
  { year: 2022, text: 'Dedicated zardozi and hand-embroidery units commissioned on the Surat finishing floor.' },
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
        <div className="container-site grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow">The loom</p>
            <h2 className="mt-4 font-display text-2xl font-normal leading-tight text-ink lg:text-3xl">
              Four hundred and twenty looms across two sheds. All owned. None contract.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-[1.7] text-ink-soft">
            <p>
              When a buyer places a forty-piece run with Janani, the warp is dressed in our shed,
              on our beam, by weavers on our ledger. We do not subcontract overflow. When capacity
              is full, we quote longer lead times rather than farm out to unknown looms.
            </p>
            <p>
              This is why a boutique owner can reorder a colourway eighteen months later and receive
              the exact hand-feel and weight they sold the previous season.
            </p>
          </div>
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
              Inside the Surat shed, the warping, dyeing, weaving and finishing happen within sight of each other. A thread breaks in the loom and the weaver is at it before it leaves the reed. The lehenga finishing floor is laid out with equal care — design sampling first, then the embroidery shed, then the press, then the pack room.
            </p>
          </AnimatedContent>
        </div>
      </section>

      <SelvedgeRule />

      <section className="bg-paper-deep">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow">The record</p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-normal leading-[1.1] tracking-tight lg:text-4xl">
            Continuous production and craft excellence under one roof in Surat.
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
    <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden bg-ink">
      <Picture
        src={image}
        alt={alt}
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}
