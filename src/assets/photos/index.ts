// Photos cropped and graded from the originals (spec « Sur mesure », section 4).
// Low resolution sources: never display them wider than 520 CSS px.
import office400Avif from './office-400.avif'
import office400Webp from './office-400.webp'
import office607Avif from './office-607.avif'
import office607Webp from './office-607.webp'
import portrait400Avif from './portrait-400.avif'
import portrait400Webp from './portrait-400.webp'
import portrait528Avif from './portrait-528.avif'
import portrait528Webp from './portrait-528.webp'

export const photos = {
  /** Formal portrait (grey suit, blue tie), 528×660, 4:5. Focal point 70% 40%. */
  portrait: {
    width: 528,
    height: 660,
    avif: `${portrait400Avif} 400w, ${portrait528Avif} 528w`,
    webp: `${portrait400Webp} 400w, ${portrait528Webp} 528w`,
    fallback: portrait528Webp,
  },
  /** At the desk in front of monitors, 607×630. Focal point 59% 36%. */
  office: {
    width: 607,
    height: 630,
    avif: `${office400Avif} 400w, ${office607Avif} 607w`,
    webp: `${office400Webp} 400w, ${office607Webp} 607w`,
    fallback: office607Webp,
  },
}

export type PhotoKey = keyof typeof photos
