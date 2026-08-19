import { useEffect } from 'react'

interface Meta {
  title: string
  description: string
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
    setMeta('description', desc)
    setMeta('og:title', title, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:image', '/hero-sarees.jpg', 'property')
    setMeta('og:type', 'website', 'property')
    return () => {
      document.title = DEFAULTS.title
    }
  }, [meta.title, meta.description])
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
