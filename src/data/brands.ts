import type { Brand } from './types'

export const BRANDS: Record<'jdt' | 'jdw', Brand> = {
  jdt: {
    id: 'jdt',
    name: 'Janani Dreams TexFab',
    legalName: 'Janani Dreams TexFab Pvt Ltd',
    accentClass: 'text-neel',
    accentHex: '#1F3A5F',
    product: 'sarees',
    founded: 1987,
    positioning: 'Wholesale sarees, woven and woven-finished under one roof in Surat.',
    story: [
      'Janani Dreams TexFab started as a small saree-weaving house in Surat in 1987 and grew with one promise: every loom under the roof is the firm\'s, never contract. That has stayed the rule for thirty-eight years.',
      'Today the house runs four hundred and twenty looms across two sheds and supplies more than nine thousand finished pieces a month to retailers across India and the Gulf. Buyers come for the floor, the colour line and the consistency.'
    ],
    categories: ['Banarasi', 'Kanjivaram', 'Georgette', 'Organza', 'Cotton silk']
  },
  jdw: {
    id: 'jdw',
    name: 'Janani Designer World',
    legalName: 'Janani Designer World',
    accentClass: 'text-lac',
    accentHex: '#7A1F2B',
    product: 'lehengas',
    founded: 2004,
    positioning: 'Wholesale designer lehengas, embroidered and finished in-house in Jaipur.',
    story: [
      'Janani Designer World was founded in 2004 by the second generation as a single-floor lehenga finishing house in Jaipur. Twenty-one years on, it runs three finishing floors, a kalamkari block unit and a separate embroidery shed.',
      'The house produces twelve bridal and reception cycles a year, with the same karigars on the same benches season after season. Buyers are placed on the floor with the design team before each cycle, not after.'
    ],
    categories: ['Bridal', 'Reception', 'Sangeet', 'Festive', 'Lightweight']
  }
}

export const FIRM_LABELS: Record<'jdt' | 'jdw', string> = {
  jdt: 'Janani Dreams TexFab',
  jdw: 'Janani Designer World'
}
