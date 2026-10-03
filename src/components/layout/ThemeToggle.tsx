import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { ui } from '../../data/profile'
import { ease } from '../../lib/motion'
import { useTheme } from '../theme/theme-context'
import { IconButton } from '../ui/IconButton'

/** Sun/Moon toggle. The icon swaps with a ±90° rotation and a 0.6→1 scale (instant with reduced motion). */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const dark = theme === 'dark'
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }
  const gone = reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }

  return (
    <IconButton label={dark ? ui.themeToLight : ui.themeToDark} onClick={toggleTheme}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="inline-flex"
          initial={hidden}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={gone}
          transition={{ duration: reduce ? 0 : 0.25, ease: ease.out }}
        >
          {dark ? (
            <Sun aria-hidden className="size-[18px]" strokeWidth={1.75} />
          ) : (
            <Moon aria-hidden className="size-[18px]" strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </IconButton>
  )
}
