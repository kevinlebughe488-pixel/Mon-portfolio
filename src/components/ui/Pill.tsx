import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { itemReveal } from '../../lib/motion'

export type PillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'tag'

type PillProps = {
  as?: 'span' | 'li'
  tone?: PillTone
  icon?: LucideIcon
  /** Inherit the parent's `hidden`/`show` reveal (parent must stagger its children). */
  reveal?: boolean
  className?: string
  children: ReactNode
}

const tones: Record<PillTone, string> = {
  neutral: 'min-h-8 px-3 text-sm font-medium border-line-subtle bg-surface-2 text-fg',
  accent: 'min-h-8 px-3 text-sm font-medium border-accent-line bg-accent-soft text-accent-text',
  success: 'min-h-8 px-3 text-sm font-medium border-transparent bg-success-soft text-success',
  warning: 'min-h-8 px-3 text-sm font-medium border-transparent bg-warning-soft text-warning',
  tag: 'min-h-6 px-2.5 font-mono text-xs tracking-[0.02em] border-line-subtle bg-surface-2 text-fg-3',
}

/**
 * Rounded pill (32px; `tag` tone is a 24px mono tag). Text may wrap on very narrow screens,
 * so pills never overflow their tile.
 */
export function Pill({ as = 'span', tone = 'neutral', icon: Icon, reveal = false, className, children }: PillProps) {
  const reduce = !!useReducedMotion()
  const classes = cn(
    'inline-flex max-w-full items-center gap-1.5 rounded-full border py-1 leading-snug',
    tones[tone],
    className,
  )
  const inner = (
    <>
      {Icon && <Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />}
      <span className="min-w-0">{children}</span>
    </>
  )
  if (as === 'li') {
    return (
      <motion.li variants={reveal ? itemReveal(reduce) : undefined} className={classes}>
        {inner}
      </motion.li>
    )
  }
  return (
    <motion.span variants={reveal ? itemReveal(reduce) : undefined} className={classes}>
      {inner}
    </motion.span>
  )
}
