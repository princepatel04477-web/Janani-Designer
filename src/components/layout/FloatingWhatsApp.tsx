import { useBasket } from '../../context/BasketContext'

/**
 * Floating WhatsApp button. Visible on every page except when the basket
 * drawer is open.
 */
export function FloatingWhatsApp() {
  const { isOpen: basketOpen, items } = useBasket()
  if (basketOpen) return null

  const phone = '919876543210'
  const hasItems = items.length > 0
  const baseText =
    'Hello Janani — I would like to enquire about a wholesale order. Please send me the latest catalogue.'
  const listText =
    '\n\nMy enquiry list:\n' +
    items.map(i => `- ${i.code} (${i.colourway}) × ${i.quantity}`).join('\n')
  const text = hasItems ? baseText + listText : baseText
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center bg-ink text-paper border border-zari hover:bg-neel transition-colors duration-base ease-signature focus-visible:outline-1 focus-visible:outline-zari focus-visible:outline-offset-2"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        aria-hidden
      >
        <path d="M3 21l1.6-4.5A8.5 8.5 0 1 1 7 19.6L3 21z" />
        <path d="M9 9c0 .8.5 1.8 1.5 2.8s2 1.5 2.8 1.5c.5 0 1-.3 1.3-.7l.6-.6c.2-.2.5-.3.7-.1l2 1c.4.2.5.7.2 1-1 1.2-2.4 1.7-4 1.2-2.5-.7-5-3.2-5.7-5.7-.5-1.6 0-3 1.2-4 .3-.3.8-.2 1 .2l1 2c.2.2.1.5-.1.7l-.6.6c-.4.3-.7.8-.7 1.3z" />
      </svg>
    </a>
  )
}
