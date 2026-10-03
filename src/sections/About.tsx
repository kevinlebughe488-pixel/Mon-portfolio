import { Fragment } from 'react'
import { Photo } from '../components/ui/Photo'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tile } from '../components/ui/Tile'
import { about, sections } from '../data/profile'
import { cn } from '../lib/cn'

type Fact = (typeof about.facts)[number]

/**
 * À propos (spec §5.3).
 * ≥1024: bio (1–7) over a 2×2 <dl> of facts, office photo (8–12) spanning both rows.
 * 640–1023: bio full width, then photo (1–3) beside the stacked facts (4–6).
 * <640: bio → photo 4:5 → facts (2 columns from 400px).
 */
export default function About() {
  const s = sections.about
  const titleId = `${s.id}-title`

  return (
    <section id={s.id} aria-labelledby={titleId} className="section-pad">
      <div className="container-page">
        <SectionHeader index={s.index} label={s.label} title={s.title} titleId={titleId} />
        <div className="bento">
          <BioTile className="sm:col-span-6 lg:col-span-7" />
          <Tile
            media
            rowIndex={1}
            className="aspect-[4/5] w-full max-w-[520px] self-stretch justify-self-center sm:col-span-3 lg:col-span-5 lg:row-span-2 lg:aspect-auto"
          >
            <Photo photo="office" alt={about.photoAlt} parallax objectPosition="59% 36%" className="h-full w-full" />
          </Tile>
          <dl className="grid gap-3 min-[400px]:grid-cols-2 sm:col-span-3 sm:grid-cols-1 sm:gap-4 lg:col-span-7 lg:grid-cols-2">
            {about.facts.map((fact, i) => (
              <FactTile key={fact.label} fact={fact} rowIndex={i % 2} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/** Bio in fg-2, with its key phrases in fg. */
function BioTile({ className }: { className?: string }) {
  return (
    <Tile rowIndex={0} className={cn('flex flex-col gap-4 sm:gap-5', className)}>
      {about.paragraphs.map((segments, i) => (
        <p key={i} className="type-body max-w-[62ch] text-fg-2">
          {segments.map((segment, j) =>
            segment.strong ? (
              <strong key={j} className="font-medium text-fg">
                {segment.text}
              </strong>
            ) : (
              <Fragment key={j}>{segment.text}</Fragment>
            ),
          )}
        </p>
      ))}
    </Tile>
  )
}

/**
 * One fact = one small tile (a valid <div> group inside the <dl>): 36px icon well, <dt> as eyebrow,
 * <dd> at 16px/600. The well sits left of the text, except in the 2-column phone layout (400–639px)
 * where the tiles are narrow and it stacks above.
 */
function FactTile({ fact, rowIndex }: { fact: Fact; rowIndex: number }) {
  const Icon = fact.icon
  return (
    <Tile
      pad="none"
      rowIndex={rowIndex}
      className="p-4 pl-[4.25rem] min-[400px]:max-sm:pl-4 sm:p-5 sm:pl-[4.5rem]"
    >
      <dt className="type-eyebrow text-fg-3">
        <span
          aria-hidden
          className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-xl border border-line-subtle bg-surface-2 text-fg-2 min-[400px]:max-sm:static min-[400px]:max-sm:mb-3 sm:left-5 sm:top-5"
        >
          <Icon className="size-[18px]" strokeWidth={1.75} />
        </span>
        {fact.label}
      </dt>
      <dd className="mt-1.5 text-base font-semibold leading-[1.35] tracking-[-0.01em] text-fg">{fact.value}</dd>
    </Tile>
  )
}
