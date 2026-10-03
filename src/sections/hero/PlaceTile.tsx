import { useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tile } from '../../components/ui/Tile'
import { hero, profile } from '../../data/profile'
import { cn } from '../../lib/cn'
import { heroTimeline, onLoad, tileIn } from './choreography'

const clock = new Intl.DateTimeFormat('fr-FR', {
  timeZone: profile.timeZone,
  hour: '2-digit',
  minute: '2-digit',
})

/** Current time, refreshed on every minute boundary (one render per minute, nothing per frame). */
function useMinuteClock(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let interval = 0
    const tick = () => setNow(new Date())
    const timeout = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])
  return now
}

/** Tile C: where Kevin is based, with the local time in Kinshasa (no aria-live: it is not an alert). */
export function PlaceTile({ className }: { className?: string }) {
  const reduce = !!useReducedMotion()
  const now = useMinuteClock()

  return (
    <Tile
      reveal={false}
      {...onLoad}
      variants={tileIn(reduce, heroTimeline.place)}
      className={cn('flex flex-col gap-6', className)}
    >
      <div className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-subtle bg-surface-2 text-fg-2">
          <MapPin aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="type-eyebrow text-fg-3">{hero.place.eyebrow}</p>
          <h3 className="type-h3 mt-1 text-fg">{profile.location}</h3>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <time dateTime={now.toISOString()} className="type-clock text-fg">
          {clock.format(now)}
        </time>
        <p className="type-meta pb-0.5 text-fg-3">{hero.place.caption}</p>
      </div>
    </Tile>
  )
}
