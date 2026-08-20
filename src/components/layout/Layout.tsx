import type { ReactNode } from 'react'
import { UtilityStrip } from './UtilityStrip'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { BasketDrawer } from './BasketDrawer'
import { CustomCursor } from '../CustomCursor'

/**
 * Layout — the persistent shell around every page.
 * The fixed top container holds the utility strip and navbar together to prevent content bleed.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <header className="fixed inset-x-0 top-0 z-40">
        <UtilityStrip />
        <Navbar />
      </header>
      <div className="pt-[100px]">{children}</div>
      <Footer />
      <FloatingWhatsApp />
      <BasketDrawer />
    </>
  )
}
