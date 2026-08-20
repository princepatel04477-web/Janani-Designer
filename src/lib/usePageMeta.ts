import { useEffect } from 'react'

export interface Meta {
  title: string
  description: string
  image?: string
  robots?: string
}

const DEFAULTS: Meta = {
  title: 'Janani — wholesale sarees & designer lehengas',
  description:
    'Two firms, one loom-room. Janani supplies wholesale sarees and designer lehengas to boutiques, multi-brand stores and export buyers across India.',
  image: '/og-default.png'
}

export function usePageMeta(meta: Partial<Meta>) {
  useEffect(() => {
    const title = meta.title ? `${meta.title} · Janani` : DEFAULTS.title
    document.title = title
    const desc = meta.description ?? DEFAULTS.description
    
    const origin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : 'https://janani-designer.vercel.app'
    const currentUrl = typeof window !== 'undefined' && window.location?.href ? window.location.href : origin
    
    const imagePath = meta.image ?? DEFAULTS.image ?? '/og-default.png'
    const ogImageUrl = imagePath.startsWith('http') ? imagePath : new URL(imagePath, origin).href

    setMeta('description', desc)
    setMeta('og:site_name', 'Janani', 'property')
    setMeta('og:title', title, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:url', currentUrl, 'property')
    setMeta('og:image', ogImageUrl, 'property')
    setMeta('og:type', 'website', 'property')

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image', 'name')
    setMeta('twitter:title', title, 'name')
    setMeta('twitter:description', desc, 'name')
    setMeta('twitter:image', ogImageUrl, 'name')

    if (meta.robots) {
      setMeta('robots', meta.robots, 'name')
    } else {
      setMeta('robots', 'index, follow', 'name')
    }

    // No document.title reset on cleanup to avoid title flashing between routes.
  }, [meta.title, meta.description, meta.image, meta.robots])
}

function setMeta(name: string, value: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}
