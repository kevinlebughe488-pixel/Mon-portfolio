import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode, type Ref } from 'react'
import { DESKTOP_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { useSpotlight } from '../../hooks/useSpotlight'
import { cn } from '../../lib/cn'
import { ROW_STAGGER, tileReveal, viewport } from '../../lib/motion'

const tags = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
  a: motion.a,
  aside: motion.aside,
  section: motion.section,
}

export type TileProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  as?: keyof typeof tags
  /** Only for as="a" (link tiles) */
  href?: string
  /** Accent glow in the top-right corner */
  feature?: boolean
  /** Photo tile: no padding, no spotlight, inner photo-edge hairline */
  media?: boolean
  /** default = fluid tile padding, hero = larger hero padding, none = no padding */
  pad?: 'default' | 'hero' | 'none'
  /** Pointer spotlight (fine pointers only). Defaults to true except for media tiles. */
  spotlight?: boolean
  /** Scroll reveal (opacity, y 24→0, scale 0.985→1). Pass false to drive your own animation. */
  reveal?: boolean
  /** Position in its row at ≥1024px: delays the reveal by rowIndex × 60 ms. */
  rowIndex?: number
  /** Stagger `hidden`/`show` children (pills) after the tile appears. */
  staggerChildren?: boolean
  children?: ReactNode
}

/**
 * Bento tile: surface, hairline border, tile radius and shadow; border/shadow deepen on hover.
 * Any motion prop passed in (initial, animate, variants…) overrides the default reveal.
 */
export function Tile({
  as = 'div',
  feature = false,
  media = false,
  pad,
  spotlight,
  reveal = true,
  rowIndex = 0,
  staggerChildren = false,
  className,
  children,
  ...rest
}: TileProps) {
  const ref = useRef<HTMLElement>(null)
  const withSpotlight = spotlight ?? !media
  useSpotlight(ref, withSpotlight)
  const reduce = !!useReducedMotion()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const padding = pad ?? (media ? 'none' : 'default')
  const Comp = tags[as] as typeof motion.div

  const revealProps = reveal
    ? {
        initial: 'hidden',
        whileInView: 'show',
        viewport,
        variants: tileReveal(reduce, { delay: desktop ? rowIndex * ROW_STAGGER : 0, staggerChildren }),
      }
    : {}

  return (
    <Comp
      ref={ref as Ref<HTMLDivElement>}
      className={cn(
        'tile',
        feature && 'tile-feature',
        media && 'tile-media',
        withSpotlight && 'spotlight',
        padding === 'default' && 'tile-pad',
        padding === 'hero' && 'tile-pad-hero',
        className,
      )}
      {...revealProps}
      {...rest}
    >
      {children}
    </Comp>
  )
}
