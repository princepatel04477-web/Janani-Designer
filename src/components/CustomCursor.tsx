import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

interface CursorState {
  x: number
  y: number
  targetX: number
  targetY: number
  isHovered: boolean
  isClicking: boolean
  isVisible: boolean
  cursorText: string | null
  cursorVariant: 'default' | 'link' | 'view' | 'drag' | 'jdt' | 'jdw'
}

export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const stateRef = useRef<CursorState>({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    isHovered: false,
    isClicking: false,
    isVisible: false,
    cursorText: null,
    cursorVariant: 'default'
  })

  // Detect pointer capability (fine = mouse/trackpad, coarse = touch)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: fine)')
    setIsTouchDevice(!mq.matches)

    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isTouchDevice || reducedMotion) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.targetX = e.clientX
      stateRef.current.targetY = e.clientY
      if (!stateRef.current.isVisible) {
        stateRef.current.isVisible = true
        stateRef.current.x = e.clientX
        stateRef.current.y = e.clientY
      }

      // Check what is hovered
      const target = e.target as HTMLElement | null
      if (!target) return

      const explicitCursor = target.closest<HTMLElement>('[data-cursor]')
      const explicitText = explicitCursor?.getAttribute('data-cursor')

      const isPieceLink = target.closest('a[href*="/design/"], .piece-card, [data-piece-card]')
      const isGallery = target.closest('[data-cursor="drag"], .circular-gallery, .gallery-track')
      const isJdt = target.closest('[data-brand="jdt"], a[href*="/sarees"]')
      const isJdw = target.closest('[data-brand="jdw"], a[href*="/lehengas"]')
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], label[for], summary, .clickable'
      )

      if (explicitText && explicitText !== 'true') {
        stateRef.current.isHovered = true
        stateRef.current.cursorText = explicitText.toUpperCase()
        stateRef.current.cursorVariant =
          explicitText === 'drag' ? 'drag' : explicitText === 'view' ? 'view' : 'link'
      } else if (isGallery) {
        stateRef.current.isHovered = true
        stateRef.current.cursorText = 'DRAG'
        stateRef.current.cursorVariant = 'drag'
      } else if (isPieceLink) {
        stateRef.current.isHovered = true
        stateRef.current.cursorText = 'VIEW'
        stateRef.current.cursorVariant = 'view'
      } else if (isJdt && isInteractive) {
        stateRef.current.isHovered = true
        stateRef.current.cursorText = null
        stateRef.current.cursorVariant = 'jdt'
      } else if (isJdw && isInteractive) {
        stateRef.current.isHovered = true
        stateRef.current.cursorText = null
        stateRef.current.cursorVariant = 'jdw'
      } else if (isInteractive) {
        stateRef.current.isHovered = true
        stateRef.current.cursorText = null
        stateRef.current.cursorVariant = 'link'
      } else {
        stateRef.current.isHovered = false
        stateRef.current.cursorText = null
        stateRef.current.cursorVariant = 'default'
      }
    }

    const handleMouseDown = () => {
      stateRef.current.isClicking = true
    }

    const handleMouseUp = () => {
      stateRef.current.isClicking = false
    }

    const handleMouseLeave = () => {
      stateRef.current.isVisible = false
    }

    const handleMouseEnter = () => {
      stateRef.current.isVisible = true
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    // Animation Loop: Lerp follower frame smoothly
    const render = () => {
      const state = stateRef.current
      const factor = 0.18

      state.x += (state.targetX - state.x) * factor
      state.y += (state.targetY - state.y) * factor

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.targetX}px, ${state.targetY}px, 0)`
        dotRef.current.style.opacity = state.isVisible ? '1' : '0'
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
        ringRef.current.style.opacity = state.isVisible ? '1' : '0'

        // Dynamic classes and dimensions based on variant
        const isSpecialBadge = state.cursorVariant === 'view' || state.cursorVariant === 'drag'
        const isHover = state.isHovered
        const isClick = state.isClicking

        let size = 28
        let borderClass = 'border-zari/60'
        let bgClass = 'bg-transparent'
        let rotate = 'rotate-0'
        let scale = isClick ? 'scale-75' : 'scale-100'

        if (isSpecialBadge) {
          size = 56
          // AGENTS.md compliance: solid bg-paper, zero glassmorphism backdrop-blur
          borderClass = 'border-ink bg-paper text-ink shadow-none'
          scale = isClick ? 'scale-90' : 'scale-100'
        } else if (state.cursorVariant === 'jdt') {
          size = 40
          borderClass = 'border-neel bg-neel/10'
          rotate = 'rotate-45'
        } else if (state.cursorVariant === 'jdw') {
          size = 40
          borderClass = 'border-lac bg-lac/10'
          rotate = 'rotate-45'
        } else if (isHover) {
          size = 38
          borderClass = 'border-ink bg-ink/5'
          rotate = 'rotate-45'
        }

        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.marginLeft = `${-size / 2}px`
        ringRef.current.style.marginTop = `${-size / 2}px`

        ringRef.current.className = `fixed top-0 left-0 pointer-events-none z-[99999] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center border ${borderClass} ${bgClass} ${rotate} ${scale}`
      }

      if (labelRef.current) {
        if (state.cursorText) {
          labelRef.current.textContent = state.cursorText
          labelRef.current.style.opacity = '1'
        } else {
          labelRef.current.style.opacity = '0'
        }
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouchDevice, reducedMotion])

  if (isTouchDevice || reducedMotion) {
    return null
  }

  return (
    <>
      {/* Precision Needle Core */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[100000] -ml-[2px] -mt-[2px] w-1 h-1 bg-ink opacity-0 transition-opacity duration-200"
      />

      {/* Textile Reticle / Loupe Follower */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] opacity-0 flex items-center justify-center border border-zari/60"
      >
        {/* Weave Reticle Corner Marks (architectural textile motif) */}
        <span className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] border-t border-l border-zari" />
        <span className="absolute -top-[2px] -right-[2px] w-[3px] h-[3px] border-t border-r border-zari" />
        <span className="absolute -bottom-[2px] -left-[2px] w-[3px] h-[3px] border-b border-l border-zari" />
        <span className="absolute -bottom-[2px] -right-[2px] w-[3px] h-[3px] border-b border-r border-zari" />

        {/* Dynamic Micro Label */}
        <span
          ref={labelRef}
          className="font-utility text-[9px] tracking-widest text-ink font-medium uppercase select-none opacity-0 transition-opacity duration-200"
        />
      </div>
    </>
  )
}
