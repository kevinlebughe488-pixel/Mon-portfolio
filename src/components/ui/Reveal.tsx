import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '../../lib/motion'

const tags = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
  p: motion.p,
  section: motion.section,
  article: motion.article,
}

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  as?: keyof typeof tags
  /** Custom variants (must use `hidden` / `show`). Defaults to fadeUp. */
  variants?: Variants
  delay?: number
  y?: number
  /** Fraction of the element that must be visible (default 0.3) */
  amount?: number
  children?: ReactNode
}

/** Scroll reveal that plays once: whileInView `show`, with a reduced-motion fade fallback. */
export function Reveal({ as = 'div', variants, delay = 0, y = 16, amount = 0.3, children, ...rest }: RevealProps) {
  const reduce = !!useReducedMotion()
  const Comp = tags[as] as typeof motion.div
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants ?? fadeUp(reduce, { y, delay, duration: 0.6 })}
      {...rest}
    >
      {children}
    </Comp>
  )
}
