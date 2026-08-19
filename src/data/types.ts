/**
 * Shared data types for the site.
 */

export type FirmId = 'jdt' | 'jdw'

export interface Brand {
  id: FirmId
  /** Short wordmark form. */
  name: string
  /** Full legal name as it appears on invoices and GST. */
  legalName: string
  /** Tailwind class for the firm's accent — neel for JDT, lac for JDW. */
  accentClass: string
  /** Accent hex (canvas contexts, where CSS vars don't reach). */
  accentHex: string
  /** "Sarees" / "Lehengas". */
  product: string
  /** Founding year, used as the eyebrow on the brand landing page. */
  founded: number
  /** Short positioning line under the hero on the brand landing page. */
  positioning: string
  /** Two paragraphs for the brand story block. */
  story: [string, string]
  /** Filter categories on the brand landing page. */
  categories: string[]
}

export interface Colourway {
  /** Swatch colour (CSS colour string). */
  swatch: string
  /** Public label for the colourway, used in the rail. */
  name: string
  /** Optional secondary image URL used for hover on the collections tile. */
  image?: string
}

export interface Piece {
  /** Design code, e.g. JDT-2401. The page key. */
  code: string
  firm: FirmId
  name: string
  fabric: string
  work: 'zari' | 'embroidery' | 'print' | 'handwoven'
  occasion: string
  category: string
  colourway: string
  swatch: string
  image: string
  imageAlt: string
  collection: string
  /** MOQ pieces per order for this design. */
  moq: number
  /** Lead time in weeks. */
  leadWeeks: number
  /** Length in metres (saree length, lehenga dupatta etc). */
  lengthM: number
  /** Weight in grams (per piece). */
  weightG: number
  washCare: string
  /** Colourways the design is available in. */
  colourways: Colourway[]
  /** Optional secondary image used as the hover-swap on the tile. */
  altImage?: string
  /** Optional height hint for the masonry-style uses (collections tiles are fixed). */
  height?: number
}

export interface Partner {
  name: string
  city: string
}
