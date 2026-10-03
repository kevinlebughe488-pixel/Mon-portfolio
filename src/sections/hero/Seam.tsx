import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../lib/motion'

/**
 * « La couture » (spec §7.1): once per page load, a 1px line of light (40% of the tile's width)
 * travels along the top edge of tile A. ≥640px only, since tile A is bare below that.
 * Reduced motion shows the final state, which is nothing, so it is not rendered at all.
 */
export function Seam({ delay }: { delay: number }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <motion.span
      aria-hidden
      className="bg-seam pointer-events-none absolute left-0 top-0 z-[1] hidden h-px w-[40%] sm:block"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '260%', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.1, ease: ease.inOut, delay }}
    />
  )
}
