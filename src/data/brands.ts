import type { Brand } from './types'

const currentYear = new Date().getFullYear()
const yearsSince2016 = currentYear - 2016

export const BRANDS: Record<'jdt' | 'jdw', Brand> = {
  jdt: {
    id: 'jdt',
    name: 'Janani Dreams TexFab',
    legalName: 'Janani Dreams TexFab Pvt Ltd',
    accentClass: 'text-neel',
    accentHex: '#1F3A5F',
    product: 'sarees',
    founded: 2016,
    positioning: 'Wholesale sarees, woven and woven-finished under one roof in Surat.',
    story: [
      `Janani Dreams TexFab was established in Surat in 2016 with one core principle: complete control over weaving, processing and finishing under one roof. That discipline has guided the firm for over ${yearsSince2016} years.`,
      'Today the house operates 420 looms across modern weaving sheds, producing over nine thousand finished sarees every month for boutique owners, retail chains and export buyers across India and worldwide.'
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
    founded: 2016,
    positioning: 'Wholesale designer lehengas, embroidered and finished in-house in Jaipur.',
    story: [
      `Janani Designer World was established in 2016 in Jaipur as a specialized designer lehenga manufacturing house. Over ${yearsSince2016} years, it has built state-of-the-art zardozi and embroidery floors.`,
      'The house produces twelve bridal and festive cycles a year, bringing master karigars together with contemporary design teams to deliver high-margin, heirloom bridal collections directly to premium retail buyers.'
    ],
    categories: ['Bridal', 'Reception', 'Sangeet', 'Festive', 'Lightweight']
  }
}

export const FIRM_LABELS: Record<'jdt' | 'jdw', string> = {
  jdt: 'Janani Dreams TexFab',
  jdw: 'Janani Designer World'
}
