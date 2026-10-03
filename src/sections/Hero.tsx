import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Photo } from '../components/ui/Photo'
import { Tile } from '../components/ui/Tile'
import { hero } from '../data/profile'
import { DESKTOP_QUERY, useMediaQuery } from '../hooks/useMediaQuery'
import { heroTimeline, onLoad, photoIn } from './hero/choreography'
import { HeroDecor } from './hero/HeroDecor'
import { IntroTile } from './hero/IntroTile'
import { MotivationTile } from './hero/MotivationTile'
import { PlaceTile } from './hero/PlaceTile'

/**
 * Hero bento (spec §5.2). DOM order A, B, D, C.
 * ≥1024: A (1–7) | B (8–12, as tall as A) / D (1–7) | C (8–12).
 * 640–1023: A full width, then B (1–3, 4:5) beside D and C stacked (4–6). <640: one column, A bare.
 * At ≥1024 the bento recedes slightly while the hero scrolls away (scale 1→0.97, opacity 1→0.5).
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()
  const desktop = useMediaQuery(DESKTOP_QUERY)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97])
  const opacity = useTransform(scrollYProgress, [0.4, 1], [1, 0.5])
  const recede = desktop && !reduce

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate pt-[var(--nav-offset)]">
      <HeroDecor />
      <motion.div className="container-page" style={recede ? { scale, opacity } : { scale: 1, opacity: 1 }}>
        <div className="bento">
          <IntroTile className="sm:col-span-6 lg:col-span-7" />
          <PortraitTile reduce={reduce} />
          <MotivationTile className="sm:col-span-3 lg:col-span-7" />
          <PlaceTile className="sm:col-span-3 lg:col-span-5" />
        </div>
      </motion.div>
    </section>
  )
}

/** Tile B: the formal portrait, 4:5 below 1024px and stretched to tile A's height above. */
function PortraitTile({ reduce }: { reduce: boolean }) {
  return (
    <Tile
      media
      reveal={false}
      {...onLoad}
      variants={photoIn(reduce, heroTimeline.photo)}
      className="aspect-[4/5] w-full max-w-[520px] self-stretch justify-self-center sm:col-span-3 sm:row-span-2 lg:col-span-5 lg:row-span-1 lg:aspect-auto"
    >
      <Photo
        photo="portrait"
        alt={hero.photoAlt}
        priority
        settle
        parallax
        objectPosition="70% 40%"
        className="h-full w-full"
      />
    </Tile>
  )
}
