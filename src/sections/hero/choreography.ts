import type { Variants } from 'framer-motion'
import { ease, fadeUp, reducedFade } from '../../lib/motion'

/** Hero page-load timeline (spec §6), in seconds after the first commit. */
export const heroTimeline = {
  pills: [0.06, 0.12],
  lines: [0.12, 0.19],
  photo: 0.14,
  role: 0.3,
  lead: 0.36,
  ctas: 0.42,
  motivation: 0.48,
  place: 0.54,
  seam: 0.8,
} as const

/** Plays the `hidden` → `show` variants once, on mount (the hero is above the fold). */
export const onLoad = { initial: 'hidden', animate: 'show' } as const

/** Status pills: opacity, y 8→0, 400 ms. */
export const pillIn = (reduce: boolean, delay: number) => fadeUp(reduce, { y: 8, delay, duration: 0.4 })

/** Role line, lead, CTA row: opacity, y 12→0, 450 ms. */
export const blockIn = (reduce: boolean, delay: number) => fadeUp(reduce, { y: 12, delay, duration: 0.45 })

/** Tiles D and C: opacity, y 16→0, 500 ms. */
export const tileIn = (reduce: boolean, delay: number) => fadeUp(reduce, { y: 16, delay, duration: 0.5 })

/** H1 line rising inside its clip wrapper, 650 ms ease.emph. Reduced motion: fade in place. */
export function lineIn(reduce: boolean, delay: number): Variants {
  if (reduce) return reducedFade(delay)
  return {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.65, ease: ease.emph, delay } },
  }
}

/** Photo tile B: opacity, scale 0.97→1, 700 ms (the image itself settles inside <Photo>). */
export function photoIn(reduce: boolean, delay: number): Variants {
  if (reduce) return reducedFade(delay)
  return {
    hidden: { opacity: 0, scale: 0.97 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: ease.emph, delay } },
  }
}
