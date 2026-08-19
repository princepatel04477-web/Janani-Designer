import type { ReactNode } from 'react'
import { UtilityStrip } from './UtilityStrip'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { BasketDrawer } from './BasketDrawer'
import { CustomCursor } from '../CustomCursor'

/**
 * Layout — the persistent shell around every page.
 * The navbar is fixed; content gets the top padding so the utility strip and
 * navbar don't overlap the first section.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <UtilityStrip />
      <Navbar />
      <div className="pt-[100px]">{children}</div>
      <Footer />
      <FloatingWhatsApp />
      <BasketDrawer />
    </>
  )
}
