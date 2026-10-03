import { motion, useReducedMotion } from 'framer-motion'
import { Download, GraduationCap } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '../../components/ui/Button'
import { Tile } from '../../components/ui/Tile'
import { hero, profile } from '../../data/profile'
import { TABLET_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'
import { blockIn, heroTimeline, lineIn, onLoad, pillIn } from './choreography'
import { Seam } from './Seam'

/** Part of the role line set in accent-text (the rest of the copy stays fg-2). */
const ACCENT_PHRASE = 'intelligence artificielle'

/**
 * Tile A: status pills, the H1, role line, lead and the three CTAs.
 * Below 640px the tile is bare (no surface, border, shadow, glow or padding).
 */
export function IntroTile({ className }: { className?: string }) {
  const reduce = !!useReducedMotion()
  const tablet = useMediaQuery(TABLET_QUERY)

  return (
    <Tile
      feature
      pad="hero"
      reveal={false}
      spotlight={tablet}
      className={cn(
        'max-sm:overflow-visible max-sm:border-0 max-sm:bg-transparent max-sm:bg-none max-sm:p-0 max-sm:shadow-none',
        className,
      )}
    >
      <Seam delay={heroTimeline.seam} />
      <StatusPills reduce={reduce} />
      <HeroTitle reduce={reduce} />
      <motion.p
        {...onLoad}
        variants={blockIn(reduce, heroTimeline.role)}
        className="type-role mt-5 text-balance text-fg-2 sm:mt-6"
      >
        <RoleLine />
      </motion.p>
      <motion.p
        {...onLoad}
        variants={blockIn(reduce, heroTimeline.lead)}
        className="type-lead mt-3 max-w-[36rem] text-fg-2 sm:mt-4"
      >
        {profile.lead}
      </motion.p>
      <motion.div
        {...onLoad}
        variants={blockIn(reduce, heroTimeline.ctas)}
        className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2"
      >
        <Button href="#projets" className="w-full sm:w-auto">
          {hero.ctaPrimary}
        </Button>
        <Button
          href={profile.cv.href}
          download={profile.cv.fileName}
          variant="secondary"
          icon={Download}
          trailing={<PdfTag />}
          className="w-full sm:w-auto"
        >
          {hero.ctaSecondary}
        </Button>
        <Button href="#contact" variant="tertiary" className="self-center">
          {hero.ctaTertiary}
        </Button>
      </motion.div>
    </Tile>
  )
}

/** Two adjoining 32px pills, so the status wraps cleanly on narrow phones. */
function StatusPills({ reduce }: { reduce: boolean }) {
  const pill = 'inline-flex min-h-8 items-center rounded-full px-2.5 py-1 text-[0.8125rem] font-medium leading-tight'
  return (
    <ul className="flex flex-wrap gap-2">
      <motion.li
        {...onLoad}
        variants={pillIn(reduce, heroTimeline.pills[0])}
        className={cn(pill, 'gap-1.5 border border-line-subtle bg-surface-2 text-fg')}
      >
        <GraduationCap aria-hidden className="size-4 shrink-0 text-fg-2" strokeWidth={1.75} />
        {profile.status}
      </motion.li>
      <motion.li
        {...onLoad}
        variants={pillIn(reduce, heroTimeline.pills[1])}
        className={cn(pill, 'gap-2 border border-transparent bg-success-soft text-success')}
      >
        <span aria-hidden className="relative flex size-2 shrink-0">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-success" />
          <span className="relative size-2 rounded-full bg-success" />
        </span>
        {profile.availability}
      </motion.li>
    </ul>
  )
}

/**
 * H1 on two lines that rise inside clip wrappers. The wrapper's negative margin and the line's padding
 * keep the descenders visible (and painted by the gradient) without changing the layout.
 */
function HeroTitle({ reduce }: { reduce: boolean }) {
  const lines = [profile.firstName, profile.lastName]
  return (
    <h1 id="hero-title" tabIndex={-1} className="type-display mt-7 outline-none sm:mt-9">
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && ' '}
          <span className="-mb-[0.1em] block overflow-clip">
            <motion.span
              {...onLoad}
              variants={lineIn(reduce, heroTimeline.lines[i])}
              className="text-name block pb-[0.1em]"
            >
              {line}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </h1>
  )
}

/** « Développeur · Passionné d'intelligence artificielle », with the dot and the AI phrase in accent-text. */
function RoleLine() {
  const { role, passion } = profile
  const at = passion.indexOf(ACCENT_PHRASE)
  return (
    <>
      {role}{' '}
      <span aria-hidden className="text-accent-text">
        ·
      </span>{' '}
      {at === -1 ? (
        passion
      ) : (
        <>
          {passion.slice(0, at)}
          <span className="text-accent-text">{ACCENT_PHRASE}</span>
          {passion.slice(at + ACCENT_PHRASE.length)}
        </>
      )}
    </>
  )
}

function PdfTag() {
  return (
    <span className="type-meta rounded-md border border-line px-1.5 py-0.5 text-fg-3">{hero.ctaSecondaryTag}</span>
  )
}
