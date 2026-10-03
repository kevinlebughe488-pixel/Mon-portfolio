import { LocateFixed } from 'lucide-react'
import { Pill } from '../components/ui/Pill'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { Tile } from '../components/ui/Tile'
import { projects, sections, type Project } from '../data/profile'
import { cn } from '../lib/cn'
import ProjectArt from './projects/ProjectArt'

/** Accessible name of each card's tag list (UI string, not in profile.ts). */
const TAGS_LABEL = 'Technologies utilisées'

/**
 * Projets (spec §5.5): full-bleed canvas-subtle band between hairlines.
 * ≥1024: P1 wide (text | 4:3 media well at 45%), then P2 | P3 with 16:9 wells on top.
 * 640–1023: P1 full width with its media on top, P2 | P3. <640: stacked, media on top.
 * Cards are not links: spotlight only, default cursor, no lift.
 */
export default function Projects() {
  const s = sections.projects
  const titleId = `${s.id}-title`
  const [featured, ...others] = projects
  return (
    <section
      id={s.id}
      aria-labelledby={titleId}
      className="section-pad relative isolate border-y border-line-subtle bg-canvas-subtle"
    >
      {/* The page grain sits under opaque backgrounds, so the band carries its own. */}
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[var(--grain)]" />
      <div className="container-page">
        <SectionHeader index={s.index} label={s.label} title={s.title} titleId={titleId} intro={s.intro} />
        <div className="bento">
          {featured && <FeaturedCard project={featured} />}
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} rowIndex={i % 2} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ project }: { project: Project }) {
  const titleId = `projet-${project.id}`
  return (
    <Tile
      as="article"
      pad="none"
      staggerChildren
      aria-labelledby={titleId}
      className="flex flex-col sm:col-span-6 lg:col-span-12 lg:grid lg:grid-cols-[minmax(0,1fr)_45%]"
    >
      <MediaWell art={project.art} large className="aspect-[4/3] sm:aspect-video lg:order-last lg:aspect-[4/3]" />
      <div className="tile-pad flex flex-1 flex-col lg:justify-center">
        <ProjectBody project={project} titleId={titleId} featured />
      </div>
    </Tile>
  )
}

function ProjectCard({ project, rowIndex }: { project: Project; rowIndex: number }) {
  const titleId = `projet-${project.id}`
  return (
    <Tile
      as="article"
      pad="none"
      rowIndex={rowIndex}
      staggerChildren
      aria-labelledby={titleId}
      className="flex flex-col sm:col-span-3 lg:col-span-6"
    >
      <MediaWell art={project.art} className="aspect-video" />
      <div className="tile-pad flex flex-1 flex-col">
        <ProjectBody project={project} titleId={titleId} />
      </div>
    </Tile>
  )
}

/** Inset 8px well with a dot grid; its radius stays concentric with the card (tile radius − 8px). */
function MediaWell({ art, large = false, className }: { art: Project['art']; large?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'bg-dot-grid relative m-2 shrink-0 overflow-hidden rounded-[calc(var(--radius-tile)-8px)] border border-line-subtle',
        className,
      )}
    >
      {/* Capped so the 1.25 stroke stays close to 1:1 (≤ 1.2×) on large wells */}
      <ProjectArt
        art={art}
        className={cn('absolute inset-0 m-auto h-[88%] max-h-60 w-[88%] max-w-84', large && 'sm:max-h-72 sm:max-w-96')}
      />
    </div>
  )
}

function ProjectBody({ project, titleId, featured = false }: { project: Project; titleId: string; featured?: boolean }) {
  return (
    <>
      <StatusBadge status={project.status} className="self-start" />
      <h3 id={titleId} className="type-h3 mt-4 text-fg">
        {project.title}
      </h3>
      <p className="mt-3 max-w-[36rem] text-[0.9375rem] leading-relaxed text-fg-2 sm:text-base">
        {project.description}
      </p>
      <div className={cn('flex flex-col gap-4 pt-6', !featured && 'mt-auto')}>
        <ul role="list" aria-label={TAGS_LABEL} className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Pill key={tag} as="li" tone="tag" reveal>
              {tag}
            </Pill>
          ))}
        </ul>
        {project.note && (
          <p className="flex items-center gap-1.5 text-sm text-fg-3">
            <LocateFixed aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
            {project.note}
          </p>
        )}
      </div>
    </>
  )
}
