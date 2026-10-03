import { AnimatePresence, motion, stagger, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { hero, navLinks, profile, ui } from '../../data/profile'
import { cn } from '../../lib/cn'
import { ease, spring } from '../../lib/motion'
import { Button } from '../ui/Button'

type MobileMenuProps = {
  open: boolean
  id: string
  active: string
  /** restoreFocus: give focus back to the menu button (Esc), not after a link click */
  onClose: (restoreFocus: boolean) => void
}

/** Frees the page right away, so a link's native anchor navigation can scroll and focus its target. */
function releasePage() {
  document.getElementById('contenu')?.removeAttribute('inert')
  document.querySelector('footer')?.removeAttribute('inert')
  document.documentElement.style.overflow = ''
}

/**
 * Mobile navigation panel (<1024px): scrim, 56px link rows, contact + CV buttons.
 * While open: page content is inert, page scroll is locked, Esc or a scrim tap closes it,
 * focus moves to the first link (and back to the menu button on Esc).
 */
export function MobileMenu({ open, id, active, onClose }: MobileMenuProps) {
  const reduce = !!useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const main = document.getElementById('contenu')
    const footer = document.querySelector('footer')
    main?.setAttribute('inert', '')
    footer?.setAttribute('inert', '')
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose(true)
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true })
    return () => {
      releasePage()
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const list: Variants = {
    hidden: {},
    show: { transition: { delayChildren: reduce ? 0 : stagger(0.04, { startDelay: 0.06 }) } },
  }
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.15 } } }
    : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: ease.out } } }

  const closeAfterLink = () => {
    releasePage()
    onClose(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            aria-hidden
            className="pointer-events-auto fixed inset-0 -z-10 bg-[var(--scrim)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.25 }}
            onClick={() => onClose(false)}
          />
          <motion.div
            key="panel"
            id={id}
            ref={panelRef}
            className="tile pointer-events-auto mt-2 max-h-[calc(100dvh-5.5rem)] overflow-y-auto p-2 lg:hidden"
            style={{ transformOrigin: 'top center' }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={reduce ? { duration: 0.15 } : spring.panel}
          >
            <nav aria-label={ui.menuLabel}>
              <motion.ul variants={list} initial="hidden" animate="show" className="flex flex-col">
                {navLinks.map((link) => (
                  <motion.li key={link.id} variants={item}>
                    <a
                      href={`#${link.id}`}
                      onClick={closeAfterLink}
                      aria-current={active === link.id ? 'location' : undefined}
                      className={cn(
                        'flex h-14 items-center justify-between rounded-xl px-4 text-base font-medium transition-colors hover:bg-surface-2',
                        active === link.id ? 'bg-surface-2 text-fg' : 'text-fg-2 hover:text-fg',
                      )}
                    >
                      {link.label}
                      <ArrowRight aria-hidden className="size-[18px] text-fg-3" strokeWidth={1.75} />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <motion.div
              variants={item}
              initial="hidden"
              animate="show"
              className="mt-2 grid gap-2 border-t border-line-subtle p-2 pt-4 sm:grid-cols-2"
            >
              <Button href="#contact" onClick={closeAfterLink} fullWidth>
                {ui.navCta}
              </Button>
              <Button variant="secondary" href={profile.cv.href} download={profile.cv.fileName} icon={Download} fullWidth>
                {hero.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
