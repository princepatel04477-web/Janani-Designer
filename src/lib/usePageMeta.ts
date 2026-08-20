import { useEffect } from 'react'

interface Meta {
  title: string
  description: string
  robots?: string
}

const DEFAULTS: Meta = {
  title: 'Janani — wholesale sarees & designer lehengas',
  description:
    'Two firms, one loom-room. Janani supplies wholesale sarees and designer lehengas to boutiques, multi-brand stores and export buyers across India.'
}

export function usePageMeta(meta: Partial<Meta>) {
  useEffect(() => {
    const title = meta.title ? `${meta.title} · Janani` : DEFAULTS.title
    document.title = title
    const desc = meta.description ?? DEFAULTS.description
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://janani.in'
    const currentUrl = typeof window !== 'undefined' ? window.location.href : baseUrl
    const ogImageUrl = `${baseUrl}/hero-sarees.webp`

    setMeta('description', desc)
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

    // Notice: Do NOT reset document.title to DEFAULTS.title on cleanup
    // to prevent jarring title flashing during route transitions.
  }, [meta.title, meta.description, meta.robots])
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
