import { BrandLanding } from '../components/brand/BrandLanding'
import { BRANDS } from '../data/brands'
import { PIECES } from '../data/pieces'
import { usePageMeta } from '../lib/usePageMeta'

export default function Sarees() {
  usePageMeta({
    title: 'Sarees · Janani Dreams TexFab',
    description: 'Wholesale sarees from Janani Dreams TexFab — Banarasi, Kanjivaram, Georgette, Organza, Cotton silk, woven on 420 looms we own.'
  })
  const pieces = PIECES.filter(p => p.firm === 'jdt')
  return <BrandLanding brand={BRANDS.jdt} pieces={pieces} />
}
