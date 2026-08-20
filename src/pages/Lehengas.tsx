import { BrandLanding } from '../components/brand/BrandLanding'
import { BRANDS } from '../data/brands'
import { PIECES } from '../data/pieces'
import { usePageMeta } from '../lib/usePageMeta'

export default function Lehengas() {
  usePageMeta({
    title: 'Lehengas · Janani Designer World',
    description: 'Wholesale designer lehengas from Janani Designer World — bridal, reception, sangeet, festive, lightweight, embroidered in Surat.',
    image: '/og-lehengas.png'
  })
  const pieces = PIECES.filter(p => p.firm === 'jdw')
  return <BrandLanding brand={BRANDS.jdw} pieces={pieces} />
}
