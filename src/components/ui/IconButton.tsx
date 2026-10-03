import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { spring } from '../../lib/motion'

type IconButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  /** Accessible name (also used as tooltip) */
  label: string
  children: ReactNode
}

/** 44px round icon button: surface-2 on hover, scale 0.92 on press. */
export function IconButton({ label, className, children, ...rest }: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.92 }}
      transition={spring.press}
      className={cn(
        'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-fg-2 transition-colors duration-200 hover:bg-surface-2 hover:text-fg',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
