import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useId, useState, type MouseEvent } from 'react'
import { navLinks, profile, sectionIds, ui } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { DESKTOP_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'
import { ease, spring } from '../../lib/motion'
import { Button } from '../ui/Button'
import { IconButton } from '../ui/IconButton'
import { MobileMenu } from './MobileMenu'
import { ScrollProgress } from './ScrollProgress'
import { ThemeToggle } from './ThemeToggle'

const MENU_BUTTON_ID = 'menu-button'

/**
 * Fixed floating nav bar (12px from the top, 8px on phones). Transparent at the top of the page,
 * frosted glass after 16px of scroll. Desktop: links with a gliding active pill + theme + CTA.
 * Below 1024px: theme + menu button opening <MobileMenu>.
 */
export default function Navbar() {
  const reduce = !!useReducedMotion()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16))

  const active = useActiveSection(sectionIds)
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const [open, setOpen] = useState(false)
  const menuOpen = open && !desktop
  const panelId = useId()

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) document.getElementById(MENU_BUTTON_ID)?.focus()
  }, [])

  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpen(false)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  const glass = scrolled || menuOpen

  return (
    <>
      <ScrollProgress />
      <header className="pointer-events-none fixed inset-x-0 top-2 z-50 sm:top-3">
        <div className="container-page">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.4, ease: ease.out }}
            className={cn(
              'pointer-events-auto flex h-14 items-center justify-between gap-2 rounded-2xl border pr-1.5 pl-1.5 transition-[background-color,border-color,box-shadow] duration-[250ms] ease-out sm:pl-2',
              glass
                ? 'border-line-subtle bg-[var(--nav-glass)] shadow-[var(--shadow-tile)] backdrop-blur-[14px] backdrop-saturate-[1.4]'
                : 'border-transparent bg-transparent shadow-none',
            )}
          >
            <a
              href="#"
              onClick={toTop}
              aria-label={ui.homeLabel}
              className="flex h-11 min-w-0 items-center gap-2.5 rounded-xl px-1"
            >
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-fg text-[13px] font-semibold tracking-[-0.02em] text-canvas"
              >
                {profile.monogram}
              </span>
              <span aria-hidden className="truncate text-[15px] font-semibold tracking-[-0.01em] text-fg">
                {profile.shortName}
              </span>
            </a>

            <nav aria-label={ui.menuLabel} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = active === link.id
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200',
                          isActive ? 'text-fg' : 'text-fg-2 hover:text-fg',
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden
                            transition={spring.layout}
                            className="absolute inset-0 rounded-full border border-line-subtle bg-surface-2"
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-1">
              <ThemeToggle />
              <div className="ml-1 hidden lg:block">
                <Button href="#contact" size="sm">
                  {ui.navCta}
                </Button>
              </div>
              <IconButton
                id={MENU_BUTTON_ID}
                label={menuOpen ? ui.menuClose : ui.menuOpen}
                aria-expanded={menuOpen}
                aria-controls={panelId}
                onClick={() => setOpen((value) => !value)}
                className="lg:hidden"
              >
                {menuOpen ? (
                  <X aria-hidden className="size-5" strokeWidth={1.75} />
                ) : (
                  <Menu aria-hidden className="size-5" strokeWidth={1.75} />
                )}
              </IconButton>
            </div>
          </motion.div>

          <MobileMenu open={menuOpen} id={panelId} active={active} onClose={closeMenu} />
        </div>
      </header>
    </>
  )
}
