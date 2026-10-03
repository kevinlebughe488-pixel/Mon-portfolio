import { useEffect, type RefObject } from 'react'

/**
 * Pointer spotlight for `.spotlight` tiles: writes --mx / --my (px) on the element from a
 * rAF-throttled pointermove listener. No React state. Off on touch devices and with reduced motion.
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    let frame = 0
    let x = 0
    let y = 0
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty('--mx', `${x}px`)
        el.style.setProperty('--my', `${y}px`)
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [ref, enabled])
}
