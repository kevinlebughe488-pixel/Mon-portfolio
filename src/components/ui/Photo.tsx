import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { photos, type PhotoKey } from '../../assets/photos'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'

type PhotoProps = {
  photo: PhotoKey
  alt: string
  /** Hero photo: eager + fetchpriority high */
  priority?: boolean
  sizes?: string
  /** CSS object-position, e.g. '70% 40%' */
  objectPosition?: string
  /** Scroll parallax: y −2.5% → 2.5% on a wrapper scaled to 1.06 (off with reduced motion) */
  parallax?: boolean
  /** Load "settle": image scale 1.04 → 1 over 900 ms (off with reduced motion) */
  settle?: boolean
  /** Sizing of the box. The photo fills it (object-fit: cover), so give it an aspect ratio or stretch it. */
  className?: string
}

const DEFAULT_SIZES = '(min-width: 1024px) 490px, (min-width: 640px) 46vw, 92vw'

/** <picture> with AVIF/WebP sources, explicit dimensions, a 5% grain overlay and optional parallax. */
export function Photo({
  photo,
  alt,
  priority = false,
  sizes = DEFAULT_SIZES,
  objectPosition = '50% 50%',
  parallax = false,
  settle = false,
  className,
}: PhotoProps) {
  const source = photos[photo]
  const ref = useRef<HTMLDivElement>(null)
  const reduce = !!useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%'])
  const moving = parallax && !reduce
  const settling = settle && !reduce

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div className="absolute inset-0" style={moving ? { y, scale: 1.06 } : undefined}>
        <picture>
          <source type="image/avif" srcSet={source.avif} sizes={sizes} />
          <source type="image/webp" srcSet={source.webp} sizes={sizes} />
          <motion.img
            src={source.fallback}
            width={source.width}
            height={source.height}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            initial={settling ? { scale: 1.04 } : false}
            animate={settling ? { scale: 1 } : undefined}
            transition={{ duration: 0.9, ease: ease.emph }}
          />
        </picture>
      </motion.div>
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 z-[2] opacity-[0.05]" />
    </div>
  )
}
