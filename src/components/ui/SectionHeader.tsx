import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { headerPart, viewportHeader } from '../../lib/motion'

type SectionHeaderProps = {
  /** « 01 » … « 05 » */
  index: string
  label: string
  title: string
  /** id of the H2, referenced by the section's aria-labelledby */
  titleId: string
  intro?: string
  className?: string
}

/**
 * Eyebrow « 0N — Label » (mono, accent-text), H2, optional intro (lead, fg-2, ≤ 40rem). Left-aligned.
 * Entrance: eyebrow → H2 (+80 ms, with a 6px blur) → intro (+160 ms) when 60% of it is visible.
 */
export function SectionHeader({ index, label, title, titleId, intro, className }: SectionHeaderProps) {
  const reduce = !!useReducedMotion()
  return (
    <motion.div
      className={cn('header-gap max-w-[48rem]', className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportHeader}
    >
      <motion.p variants={headerPart(reduce, 0)} className="type-eyebrow text-accent-text">
        {index} — {label}
      </motion.p>
      <motion.h2 id={titleId} variants={headerPart(reduce, 1)} className="type-h2 mt-4 text-fg">
        {title}
      </motion.h2>
      {intro && (
        <motion.p variants={headerPart(reduce, 2)} className="type-lead mt-4 max-w-[40rem] text-fg-2">
          {intro}
        </motion.p>
      )}
    </motion.div>
  )
}
