import { Check, ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Pill } from '../components/ui/Pill'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tile } from '../components/ui/Tile'
import { sections, services, whatsappLink, type Pack } from '../data/profile'
import { cn } from '../lib/cn'

/**
 * Services: full-bleed canvas-subtle band (like Projets).
 * ≥1024: 3 pack cards side by side, then the 4 steps, conditions | FAQ, and a closing CTA tile.
 * <1024: everything stacked, one card per row (most visitors arrive on a phone from WhatsApp).
 * Every pack button opens WhatsApp with a pre-filled message.
 */
export default function Services() {
  const s = sections.services
  const titleId = `${s.id}-title`
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
          {services.packs.map((pack, i) => (
            <PackCard key={pack.id} pack={pack} rowIndex={i} />
          ))}
          <StepsTile />
          <ListTile title={services.terms.title} items={services.terms.items} rowIndex={0} />
          <FaqTile />
          <FinalTile />
        </div>
      </div>
    </section>
  )
}

function PackCard({ pack, rowIndex }: { pack: Pack; rowIndex: number }) {
  const titleId = `pack-${pack.id}`
  return (
    <Tile
      as="article"
      feature={pack.featured}
      rowIndex={rowIndex}
      aria-labelledby={titleId}
      className={cn('flex flex-col sm:col-span-6 lg:col-span-4', pack.featured && 'border-accent-line')}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="type-eyebrow text-fg-3">{services.eyebrow}</p>
        {pack.featured && <Pill tone="accent">{services.featuredBadge}</Pill>}
      </div>
      <h3 id={titleId} className="type-h3 mt-4 text-fg">
        {pack.name}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2 sm:text-base">{pack.audience}</p>
      <ul role="list" className="mt-6 flex flex-col gap-3 border-t border-line-subtle pt-6">
        {pack.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[0.9375rem] leading-snug text-fg-2">
            <Check
              aria-hidden
              className={cn('mt-0.5 size-[18px] shrink-0', pack.featured ? 'text-accent-text' : 'text-success')}
              strokeWidth={2}
            />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Button
          href={whatsappLink(pack.message)}
          target="_blank"
          rel="noreferrer noopener"
          variant={pack.featured ? 'primary' : 'secondary'}
          icon={MessageCircle}
          fullWidth
        >
          {pack.cta}
        </Button>
      </div>
    </Tile>
  )
}

function StepsTile() {
  return (
    <Tile className="sm:col-span-6 lg:col-span-12">
      <h3 className="type-h3 text-fg">{services.steps.title}</h3>
      <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.steps.items.map((step, i) => (
          <li key={step} className="flex gap-4 sm:flex-col sm:gap-3">
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-accent-line bg-accent-soft font-mono text-sm font-medium text-accent-text"
            >
              {i + 1}
            </span>
            <p className="text-[0.9375rem] leading-relaxed text-fg-2">{step}</p>
          </li>
        ))}
      </ol>
    </Tile>
  )
}

function ListTile({ title, items, rowIndex }: { title: string; items: string[]; rowIndex: number }) {
  return (
    <Tile rowIndex={rowIndex} className="sm:col-span-6 lg:col-span-6">
      <h3 className="type-h3 text-fg">{title}</h3>
      <ul role="list" className="mt-4 divide-y divide-line-subtle">
        {items.map((item) => (
          <li key={item} className="py-3 text-[0.9375rem] leading-relaxed text-fg-2 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </Tile>
  )
}

function FaqTile() {
  return (
    <Tile rowIndex={1} className="sm:col-span-6 lg:col-span-6">
      <h3 className="type-h3 text-fg">{services.faq.title}</h3>
      <div className="mt-4 divide-y divide-line-subtle">
        {services.faq.items.map((item) => (
          <details key={item.question} className="group">
            <summary className="-mx-3 flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-3 py-2 text-base font-semibold text-fg transition-colors duration-200 hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                aria-hidden
                className="size-[18px] shrink-0 text-fg-3 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                strokeWidth={1.75}
              />
            </summary>
            <p className="pb-4 text-[0.9375rem] leading-relaxed text-fg-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </Tile>
  )
}

function FinalTile() {
  return (
    <Tile
      feature
      className="flex flex-col gap-6 sm:col-span-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-12"
    >
      <h3 className="type-h3 text-fg">{services.final.title}</h3>
      <Button
        href={whatsappLink(services.final.message)}
        target="_blank"
        rel="noreferrer noopener"
        icon={MessageCircle}
        className="w-full sm:w-auto"
      >
        {services.final.cta}
      </Button>
    </Tile>
  )
}
