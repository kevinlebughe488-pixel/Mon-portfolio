import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Fragment } from 'react'
import { Tile } from '../../components/ui/Tile'
import { hero } from '../../data/profile'
import { cn } from '../../lib/cn'
import { heroTimeline, onLoad, tileIn } from './choreography'

/**
 * Tile D « Ce qui m'anime »: the whole tile links to #competences.
 * Hover (fine pointers): lift 2px and nudge the arrow; press: scale 0.99. Colour only with reduced motion.
 */
export function MotivationTile({ className }: { className?: string }) {
  const reduce = !!useReducedMotion()
  const { eyebrow, title, loop, link } = hero.motivation
  const steps = loop.split('→').map((step) => step.trim())

  return (
    <Tile
      as="a"
      href="#competences"
      reveal={false}
      {...onLoad}
      variants={tileIn(reduce, heroTimeline.motivation)}
      className={cn(
        'group flex flex-col gap-6 transition-[border-color,box-shadow,translate,scale] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.99]',
        className,
      )}
    >
      <div>
        <p className="type-eyebrow text-fg-3">{eyebrow}</p>
        <h3 className="type-h3 mt-2 text-fg">{title}</h3>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="font-mono text-sm tracking-[-0.01em] text-balance text-fg-2">
          {steps.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && (
                <>
                  {' '}
                  <span aria-hidden className="text-fg-3">
                    →
                  </span>
                  &nbsp;
                </>
              )}
              {i < steps.length - 1 ? (
                step
              ) : (
                // The caret stays glued to the last word.
                <span className="whitespace-nowrap">
                  {step}
                  <span
                    aria-hidden
                    className="animate-caret ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] rounded-full bg-accent"
                  />
                </span>
              )}
            </Fragment>
          ))}
        </p>
        <span className="inline-flex min-h-6 items-center gap-2 text-[0.9375rem] font-medium text-fg-2 transition-colors duration-300 group-hover:text-fg">
          {link}
          <ArrowRight
            aria-hidden
            className="size-[18px] transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-[3px]"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </Tile>
  )
}
