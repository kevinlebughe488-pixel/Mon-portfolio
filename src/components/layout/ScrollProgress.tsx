import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** 2px accent hairline fixed at the very top, scaled with the page scroll (spring-smoothed unless reduced motion). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}
