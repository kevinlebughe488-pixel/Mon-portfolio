/**
 * Motion system (spec « Sur mesure », section 6).
 * Rules: animate opacity/transform only (filter blur is reserved for the H2 entrance),
 * nothing replays and nothing animates out on scroll, every effect has a reduced-motion fallback.
 * Variant names are always `hidden` / `show`, so children inherit their parent's reveal.
 */
import { stagger, type Transition, type Variants } from 'framer-motion'

export type Bezier = [number, number, number, number]

export const ease = {
  /** reveals, hovers */
  out: [0.22, 1, 0.36, 1] as Bezier,
  /** H1 lines, photo settle */
  emph: [0.16, 1, 0.3, 1] as Bezier,
  /** seam, button shine */
  inOut: [0.65, 0, 0.35, 1] as Bezier,
  /** exits */
  in: [0.4, 0, 1, 1] as Bezier,
}

/** Seconds. */
export const duration = { instant: 0.1, fast: 0.18, base: 0.3, slow: 0.6, slower: 0.9 }

export const spring = {
  press: { type: 'spring', stiffness: 600, damping: 32, mass: 0.6 },
  hover: { type: 'spring', stiffness: 400, damping: 28 },
  /** nav active pill (layoutId) */
  layout: { type: 'spring', bounce: 0.18, visualDuration: 0.35 },
  /** badges that pop in */
  pop: { type: 'spring', bounce: 0.45, visualDuration: 0.4 },
  /** mobile menu panel */
  panel: { type: 'spring', bounce: 0, visualDuration: 0.3 },
} satisfies Record<string, Transition>

/** Default whileInView viewport for tiles and blocks. */
export const viewport = { once: true, amount: 0.3 } as const
/** Section headers trigger a bit later. */
export const viewportHeader = { once: true, amount: 0.6 } as const

/** Delay between tiles of the same row at ≥1024px (seconds). Below 1024px tiles reveal on their own, no delay. */
export const ROW_STAGGER = 0.06

/** Reduced-motion entrance: 200 ms opacity fade in place, delay capped at 100 ms. */
export function reducedFade(delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2, delay: Math.min(delay, 0.1) } },
  }
}

type FadeUpOptions = { y?: number; delay?: number; duration?: number; ease?: Bezier }

/** Generic rise: opacity + y. Used for hero lines, CTA rows, small blocks. */
export function fadeUp(
  reduce: boolean,
  { y = 12, delay = 0, duration: d = 0.45, ease: e = ease.out }: FadeUpOptions = {},
): Variants {
  if (reduce) return reducedFade(delay)
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: d, ease: e, delay } },
  }
}

type TileRevealOptions = {
  delay?: number
  /** Stagger variant children (pills, list items) after the tile appears. */
  staggerChildren?: boolean
}

/** Tile entrance: opacity, y 24→0, scale 0.985→1, 600 ms ease.out. */
export function tileReveal(
  reduce: boolean,
  { delay = 0, staggerChildren = false }: TileRevealOptions = {},
): Variants {
  const children = staggerChildren
    ? { delayChildren: stagger(reduce ? 0 : 0.025, { startDelay: reduce ? 0 : 0.15 }) }
    : {}
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.2, delay: Math.min(delay, 0.1), ...children } },
    }
  }
  return {
    hidden: { opacity: 0, y: 24, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: ease.out, delay, ...children } },
  }
}

/** Child item (pill, list row) that inherits a parent's reveal; the parent must stagger its children. */
export function itemReveal(reduce: boolean, y = 6): Variants {
  if (reduce) return { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: ease.out } },
  }
}

/** Parent that only orchestrates its variant children. */
export function staggerParent(interval = 0.025, startDelay = 0.15): Variants {
  return { hidden: {}, show: { transition: { delayChildren: stagger(interval, { startDelay }) } } }
}

/**
 * Section header parts: 0 = eyebrow (y 8), 1 = H2 (+80 ms, y 16, blur 6px→0), 2 = intro (+160 ms).
 * 600 ms ease.out. Reduced motion: plain fade.
 */
export function headerPart(reduce: boolean, part: 0 | 1 | 2): Variants {
  if (reduce) return reducedFade(0)
  const transition = { duration: 0.6, ease: ease.out, delay: part * 0.08 }
  if (part === 1) {
    return {
      hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition },
    }
  }
  return {
    hidden: { opacity: 0, y: part === 0 ? 8 : 12 },
    show: { opacity: 1, y: 0, transition },
  }
}
