import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import type { FirmId } from '../data/types'

export interface BasketItem {
  code: string
  firm: FirmId
  name: string
  image: string
  swatch: string
  colourway: string
  quantity: number
}

interface BasketContextValue {
  items: BasketItem[]
  isOpen: boolean
  count: number
  add: (item: Omit<BasketItem, 'quantity'>, quantity?: number) => void
  remove: (code: string, colourway: string) => void
  setQuantity: (code: string, colourway: string, quantity: number) => void
  clear: () => void
  open: () => void
  close: () => void
  toggle: () => void
}

const BasketContext = createContext<BasketContextValue | null>(null)
const STORAGE_KEY = 'janani.basket.v1'

function loadInitial(): BasketItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as BasketItem[]
  } catch {
    return []
  }
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>(loadInitial)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore quota errors */
    }
  }, [items])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const add = useCallback((item: Omit<BasketItem, 'quantity'>, quantity = 1) => {
    setItems(prev => {
      const key = `${item.code}|${item.colourway}`
      const found = prev.find(i => `${i.code}|${i.colourway}` === key)
      if (found) {
        return prev.map(i => (i === found ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...item, quantity }]
    })
  }, [])

  const remove = useCallback((code: string, colourway: string) => {
    setItems(prev => prev.filter(i => !(i.code === code && i.colourway === colourway)))
  }, [])

  const setQuantity = useCallback((code: string, colourway: string, quantity: number) => {
    const safe = Math.max(1, Math.min(9999, Math.floor(quantity || 1)))
    setItems(prev =>
      prev.map(i => (i.code === code && i.colourway === colourway ? { ...i, quantity: safe } : i))
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(v => !v), [])

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const value = useMemo(
    () => ({ items, isOpen, count, add, remove, setQuantity, clear, open, close, toggle }),
    [items, isOpen, count, add, remove, setQuantity, clear, open, close, toggle]
  )

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export function useBasket(): BasketContextValue {
  const ctx = useContext(BasketContext)
  if (!ctx) throw new Error('useBasket must be used inside BasketProvider')
  return ctx
}
