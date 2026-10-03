import { motion, useInView, useReducedMotion, useScroll, type MotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tile } from '../components/ui/Tile'
import { progressLabel, sections, timeline, type TimelineEntry } from '../data/profile'
import { cn } from '../lib/cn'
import { ease, spring } from '../lib/motion'

/** A node lights up once it crosses the upper 60% of the viewport (where the rail fill leads). */
const NODE_MARGIN = '0px 0px -40% 0px'

/**
 * Parcours: a timeline <ol> with one continuous rail. The accent fill is scroll-linked so its leading
 * edge stays at the viewport centre; each node lights up as the fill passes it. When the Licence node
 * lights up, the L1 → L2 → L3 bars fill one after another and « Licence 3 terminée » pops in (§7.2).
 */
export default function Journey() {
  const s = sections.journey
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] })

  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="section-pad">
      <div className="container-page">
        <SectionHeader index={s.index} label={s.label} title={s.title} intro={s.intro} titleId={`${s.id}-title`} />
        <ol ref={listRef} className="relative flex flex-col gap-4 sm:gap-5">
          <Rail progress={scrollYProgress} />
          {timeline.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  )
}

/** Rail centred in the 1.5rem node column: 0.75rem below 1024px, 8rem + 1.5rem gap + 0.75rem above. */
function Rail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      aria-hidden
      className="absolute top-2 bottom-0 left-[calc(0.75rem-1px)] w-0.5 overflow-hidden rounded-full bg-surface-3 [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] lg:left-[calc(10.25rem-1px)]"
    >
      <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY: progress }} />
    </div>
  )
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const lit = useInView(nodeRef, { once: true, margin: NODE_MARGIN })
  const reduce = !!useReducedMotion()

  return (
    <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-1 sm:gap-x-2 lg:grid-cols-[8rem_1.5rem_minmax(0,1fr)] lg:gap-x-6">
      <p className="type-meta hidden pt-[1.85rem] text-right text-fg-3 tabular-nums lg:block">{entry.period}</p>
      <span className="flex justify-center pt-7 sm:pt-8">
        <span
          ref={nodeRef}
          aria-hidden
          className={cn(
            'relative z-10 size-3 rounded-full border-2',
            !reduce && 'transition-[background-color,border-color,box-shadow] duration-300 ease-out',
            lit
              ? 'border-accent bg-accent shadow-[0_0_0_4px_var(--accent-soft)]'
              : 'border-line bg-canvas',
          )}
        />
      </span>
      <Tile className="min-w-0">
        <p className="type-eyebrow mb-3 text-fg-3 tabular-nums lg:hidden">{entry.period}</p>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-6">
          <h3 className="type-h3 text-fg">{entry.title}</h3>
          {entry.badge && <DoneBadge label={entry.badge} run={lit} reduce={reduce} />}
        </div>
        <p className="mt-2 text-fg-2">{entry.org}</p>
        {entry.detail && <p className="mt-1 text-fg-3">{entry.detail}</p>}
        {entry.milestones && <Milestones items={entry.milestones} run={lit} reduce={reduce} />}
        {entry.checklist && (
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-4">
            {entry.checklist.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-fg-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text">
                  <Check aria-hidden className="size-3" strokeWidth={2.5} />
                </span>
                <span className="text-[0.9375rem] leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </Tile>
    </li>
  )
}

/** Bar fill timing of the « L3 validée » moment: 280 ms per bar, 120 ms pause between bars. */
const BAR_DURATION = 0.28
const BAR_STEP = BAR_DURATION + 0.12

function Milestones({
  items,
  run,
  reduce,
}: {
  items: NonNullable<TimelineEntry['milestones']>
  run: boolean
  reduce: boolean
}) {
  return (
    <ol aria-label={progressLabel} className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
      {items.map((step, index) => (
        <li key={step.label} className="min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="type-meta font-medium text-fg">{step.label}</span>
            <Check aria-hidden className="size-3.5 text-accent-text" strokeWidth={2.5} />
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              className="h-full origin-left rounded-full bg-accent"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: run || reduce ? 1 : 0 }}
              transition={{ duration: BAR_DURATION, ease: ease.out, delay: index * BAR_STEP }}
            />
          </div>
          {/* Compact « 2023–2024 » so it stays on one line in the narrow mobile columns */}
          <p className="type-meta mt-2 whitespace-nowrap text-fg-3 tabular-nums">{step.period.replace(/\s*–\s*/, '–')}</p>
        </li>
      ))}
    </ol>
  )
}

/** « Licence 3 terminée »: pops in after the last bar while its check mark draws. */
function DoneBadge({ label, run, reduce }: { label: string; run: boolean; reduce: boolean }) {
  const delay = 3 * BAR_STEP - 0.12
  const shown = run || reduce
  return (
    <motion.span
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-success-soft px-3 text-[0.8125rem] font-medium text-success"
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={reduce ? { duration: 0 } : { ...spring.pop, delay }}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none">
        <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.5" />
        <motion.path
          d="M5.25 8.25 7.1 10.1 10.9 6.2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: ease.out, delay: reduce ? 0 : delay + 0.1 }}
        />
      </svg>
      {label}
    </motion.span>
  )
}
