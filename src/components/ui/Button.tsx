import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { ease, spring } from '../../lib/motion'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

type CommonProps = {
  variant?: ButtonVariant
  /** md = 44px (default); sm = 40px from 640px up, still 44px on phones for touch */
  size?: 'md' | 'sm'
  /** Leading 18px icon */
  icon?: LucideIcon
  /** Trailing arrow that nudges 3px on hover (default: on for primary and tertiary) */
  arrow?: boolean
  /** Extra trailing content, e.g. a mono « PDF » tag */
  trailing?: ReactNode
  /** Stretch to the full width of the parent (e.g. stacked CTAs below 640px) */
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type AnchorButtonProps = CommonProps &
  Omit<HTMLMotionProps<'a'>, keyof CommonProps | 'children'> & { href: string }
type NativeButtonProps = CommonProps &
  Omit<HTMLMotionProps<'button'>, keyof CommonProps | 'children'> & { href?: undefined }
export type ButtonProps = AnchorButtonProps | NativeButtonProps

// Layout classes only; size and look live in separate maps so callers never need to override them.
const base =
  'relative isolate inline-flex h-11 shrink-0 select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium leading-none whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 ease-out'

const sizes = {
  md: 'px-5 text-[0.9375rem]',
  sm: 'px-4 text-sm sm:h-10',
}

const looks: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-fg shadow-[var(--shadow-accent)] hover:bg-accent-hover hover:shadow-[var(--shadow-accent-strong)]',
  secondary: 'border border-line bg-surface text-fg hover:border-line-strong hover:bg-surface-2',
  tertiary: 'text-fg-2 hover:text-fg',
}

const rootVariants: Record<ButtonVariant, Variants> = {
  primary: { rest: { y: 0, scale: 1 }, hover: { y: -1, transition: spring.hover }, press: { scale: 0.97, transition: spring.press } },
  secondary: { rest: { scale: 1 }, hover: {}, press: { scale: 0.97, transition: spring.press } },
  tertiary: { rest: { scale: 1 }, hover: {}, press: { scale: 0.98, transition: spring.press } },
}

const arrowVariants: Variants = {
  rest: { x: 0, transition: { duration: 0.18, ease: ease.out } },
  hover: { x: 3, transition: { duration: 0.18, ease: ease.out } },
}

/** One white sweep per hover; snaps back invisibly when the pointer leaves. */
const shineVariants: Variants = {
  rest: { x: '-120%', transition: { duration: 0 } },
  hover: { x: '220%', transition: { duration: 0.7, ease: ease.inOut } },
}

/**
 * Pill button, 44px tall. Renders an <a> when `href` is given, otherwise a <button type="button">.
 * Primary: accent fill + shine sweep; secondary: surface + hairline; tertiary: text link with arrow.
 * Reduced motion: MotionConfig disables the transforms, colour changes remain.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon: Icon, arrow, trailing, fullWidth, className, children, ...rest } = props
  const showArrow = arrow ?? variant !== 'secondary'
  const classes = cn(
    base,
    variant === 'tertiary' ? 'px-1 text-[0.9375rem]' : sizes[size],
    looks[variant],
    fullWidth && 'w-full',
    className,
  )
  const motionProps = {
    initial: 'rest',
    animate: 'rest',
    whileHover: 'hover',
    whileTap: 'press',
    variants: rootVariants[variant],
  } as const

  const content = (
    <>
      {variant === 'primary' && (
        <motion.span
          aria-hidden
          variants={shineVariants}
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 bg-[linear-gradient(100deg,transparent,rgb(255_255_255/0.18),transparent)]"
        />
      )}
      {Icon && <Icon aria-hidden className="size-[18px] shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
      {trailing}
      {showArrow && (
        <motion.span aria-hidden variants={arrowVariants} className="inline-flex">
          <ArrowRight className="size-[18px]" strokeWidth={1.75} />
        </motion.span>
      )}
    </>
  )

  if (rest.href !== undefined) {
    return (
      <motion.a {...motionProps} {...(rest as HTMLMotionProps<'a'>)} className={classes}>
        {content}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" {...motionProps} {...(rest as HTMLMotionProps<'button'>)} className={classes}>
      {content}
    </motion.button>
  )
}
