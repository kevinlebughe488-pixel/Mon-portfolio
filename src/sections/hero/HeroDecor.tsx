import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../../lib/motion'

/**
 * Hero backdrop: the 56px grid (radial mask) with the accent glow above it, full-bleed up to 1920px.
 * Tiles are opaque, so the grid only shows in the seams between them. Fades in over 800 ms.
 */
export function HeroDecor() {
  const reduce = !!useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-full max-w-[1920px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.8, ease: ease.out }}
    >
      <div className="bg-hero-grid absolute inset-0" />
      <div className="bg-glow absolute inset-0" />
    </motion.div>
  )
}
