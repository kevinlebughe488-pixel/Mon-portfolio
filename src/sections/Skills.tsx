import { BadgeCheck, Telescope, type LucideIcon } from 'lucide-react'
import { Pill } from '../components/ui/Pill'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tile } from '../components/ui/Tile'
import { exploringBadge, sections, skills, type SkillGroup } from '../data/profile'
import { cn } from '../lib/cn'
import Constellation from './skills/Constellation'

/**
 * Grid placement (spec §5.4). 640–1023: Dév | IA · Conception (full) · Outils | Langues.
 * ≥1280: Dév (1–5) · IA (6–12) / Conception (1–5) · Outils (6–9) · Langues (10–12).
 * 1024–1279: the second row uses equal thirds, so « Anglais professionnel » never breaks inside its pill.
 * `rowIndex` delays the reveal by index × 60 ms within a desktop row.
 */
const placement: Record<SkillGroup['id'], { className: string; rowIndex: number }> = {
  dev: { className: 'sm:col-span-3 lg:col-span-5', rowIndex: 0 },
  ai: { className: 'sm:col-span-3 lg:col-span-7', rowIndex: 1 },
  systems: { className: 'sm:col-span-6 lg:col-span-4 xl:col-span-5', rowIndex: 0 },
  tools: { className: 'sm:col-span-3 lg:col-span-4', rowIndex: 1 },
  languages: { className: 'sm:col-span-3 lg:col-span-4 xl:col-span-3', rowIndex: 2 },
}

export default function Skills() {
  const s = sections.skills
  const titleId = `${s.id}-title`
  return (
    <section id={s.id} aria-labelledby={titleId} className="section-pad">
      <div className="container-page">
        <SectionHeader index={s.index} label={s.label} title={s.title} titleId={titleId} intro={s.intro} />
        <ul role="list" className="bento">
          {skills.map((group) => (
            <SkillTile key={group.id} group={group} {...placement[group.id]} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function SkillTile({ group, className, rowIndex }: { group: SkillGroup; className: string; rowIndex: number }) {
  const featured = !!group.exploring
  return (
    <Tile
      as="li"
      feature={featured}
      rowIndex={rowIndex}
      staggerChildren
      className={cn('flex flex-col', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <IconWell icon={group.icon} accent={featured} />
        {featured && <ExploringBadge />}
      </div>

      <div className={cn('flex flex-col', featured && 'lg:max-w-[min(25rem,68%)]')}>
        <h3 className="type-h3 mt-5 text-fg">{group.title}</h3>
        <p className="mt-2 max-w-[34rem] text-[0.9375rem] leading-relaxed text-fg-2 sm:text-base">
          {group.description}
        </p>
        <ul role="list" className="mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <Pill key={item} as="li" reveal tone={featured ? 'accent' : 'neutral'} className="rounded-2xl! text-left">
              <PillText text={item} />
            </Pill>
          ))}
        </ul>
        {group.note && (
          <p className="type-meta mt-4 flex items-center gap-1.5 text-fg-3">
            <BadgeCheck aria-hidden className="size-3.5 shrink-0" strokeWidth={1.75} />
            {group.note}
          </p>
        )}
      </div>

      {featured && <Constellation className="absolute right-0 bottom-0 -z-10 hidden w-[min(34%,16.5rem)] lg:block" />}
    </Tile>
  )
}

/** 40px icon well: neutral (surface-2) or accent (AI tile). */
function IconWell({ icon: Icon, accent }: { icon: LucideIcon; accent: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-xl border',
        accent ? 'border-accent-line bg-accent-soft text-accent-text' : 'border-line-subtle bg-surface-2 text-fg-2',
      )}
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  )
}

/** « En exploration »: mono, dashed accent-line border. */
function ExploringBadge() {
  return (
    <span className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-dashed border-accent-line px-3 font-mono text-xs font-medium tracking-[0.08em] text-accent-text uppercase">
      <Telescope aria-hidden className="size-3.5" strokeWidth={1.75} />
      {exploringBadge}
    </span>
  )
}

/**
 * Keeps a trailing parenthetical together, so a long pill breaks cleanly on narrow tiles:
 * « Microsoft Office / (Word, Excel, PowerPoint) ».
 */
function PillText({ text }: { text: string }) {
  const match = /^(.+?) (\(.+\))$/.exec(text)
  if (!match) return text
  return (
    <>
      {match[1]} <span className="whitespace-nowrap">{match[2]}</span>
    </>
  )
}
