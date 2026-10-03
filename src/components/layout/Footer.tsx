import { useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { profile, ui } from '../../data/profile'
import { Button } from '../ui/Button'

const YEAR = new Date().getFullYear()

/** Canvas-subtle footer with a top hairline. « Retour en haut » scrolls up and moves focus to the H1. */
export default function Footer() {
  const reduce = useReducedMotion()

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('hero-title')?.focus({ preventScroll: true })
  }

  return (
    <footer className="border-t border-line-subtle bg-canvas-subtle">
      <div className="container-page flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="flex flex-col gap-1 text-sm text-fg-3 sm:flex-row sm:flex-wrap sm:gap-x-2">
          <span>
            © {YEAR} {profile.fullName}
          </span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>{ui.footerCredit}</span>
        </p>
        <div className="shrink-0">
          <Button variant="secondary" size="sm" icon={ArrowUp} arrow={false} onClick={backToTop}>
            {ui.backToTop}
          </Button>
        </div>
      </div>
    </footer>
  )
}
