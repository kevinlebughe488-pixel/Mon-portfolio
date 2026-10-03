import { motion, stagger, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Project } from '../../data/profile'
import { ease } from '../../lib/motion'

/*
 * Decorative line drawings of the project cards (spec §5.5): stroke 1.25 in line-strong, one accent element.
 * They inherit the card's reveal: once the card is in, each step draws (pathLength 0→1, 700 ms, 80 ms apart).
 * Reduced motion: no variants at all, so the final drawing shows immediately with the card's fade.
 */

type ArtMotion = { root?: Variants; step?: Variants; draw?: Variants; fade?: Variants; pop?: Variants }

const MOTION: ArtMotion = {
  root: { hidden: {}, show: { transition: { delayChildren: stagger(0.08, { startDelay: 0.35 }) } } },
  step: { hidden: {}, show: {} },
  draw: {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 0.7, ease: ease.inOut }, opacity: { duration: 0.25, ease: ease.out } },
    },
  },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, ease: ease.out } } },
  pop: {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: ease.out } },
  },
}
const STATIC: ArtMotion = {}

const STROKE = 1.25

type Point = readonly [x: number, y: number]

/** Rounded rectangle as a path, so its outline can be drawn with pathLength. */
function rr(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`
}
function circlePath(cx: number, cy: number, r: number) {
  return `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}Z`
}

type ArtProps = { m: ArtMotion; className?: string }

function ArtSvg({ viewBox, m, className, children }: ArtProps & { viewBox: string; children: ReactNode }) {
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      variants={m.root}
    >
      {children}
    </motion.svg>
  )
}

/** P1 « Ce portfolio »: the hero bento in miniature (nav, tiles A B D C, primary button); tile A in accent-soft. */
function BentoArt({ m, className }: ArtProps) {
  const tile = { stroke: 'var(--line-strong)', strokeWidth: STROKE, fill: 'var(--surface)', variants: m.draw }
  const line = { stroke: 'var(--line-strong)', strokeWidth: STROKE, variants: m.draw }
  const bar = { stroke: 'var(--line)', strokeWidth: 3, variants: m.draw }
  return (
    <ArtSvg viewBox="0 0 320 240" m={m} className={className}>
      <motion.g variants={m.step}>
        <motion.path d={rr(24, 29, 272, 14, 7)} {...tile} />
        <motion.circle cx={34} cy={36} r={3} fill="var(--line-strong)" variants={m.pop} />
      </motion.g>
      <motion.g variants={m.step}>
        <motion.path
          d={rr(24, 51, 154, 100, 10)}
          stroke="var(--accent)"
          strokeWidth={STROKE}
          fill="var(--accent-soft)"
          variants={m.draw}
        />
      </motion.g>
      <motion.g variants={m.step}>
        <motion.path d={rr(186, 51, 110, 100, 10)} {...tile} />
      </motion.g>
      <motion.g variants={m.step}>
        <motion.path d={rr(24, 159, 154, 52, 10)} {...tile} />
      </motion.g>
      <motion.g variants={m.step}>
        <motion.path d={rr(186, 159, 110, 52, 10)} {...tile} />
      </motion.g>
      {/* Tile A: name on two lines, role line, primary button */}
      <motion.g variants={m.step} stroke="var(--accent-text)" strokeOpacity={0.55} strokeWidth={7}>
        <motion.path d="M38 77H74" variants={m.draw} />
        <motion.path d="M38 92H116" variants={m.draw} />
      </motion.g>
      <motion.g variants={m.step}>
        <motion.path d="M38 108H134" stroke="var(--accent-line)" strokeWidth={3} variants={m.draw} />
        <motion.path d={rr(37, 123, 44, 14, 7)} fill="var(--accent)" variants={m.pop} />
        <motion.path d="M90 130H114" stroke="var(--accent-line)" strokeWidth={3} variants={m.draw} />
      </motion.g>
      {/* Tile B: portrait */}
      <motion.g variants={m.step}>
        <motion.path d={circlePath(241, 88, 13)} {...line} />
        <motion.path d="M213 151C213 127 226 113 241 113C256 113 269 127 269 151" {...line} />
      </motion.g>
      {/* Tile D: eyebrow, line, arrow. Tile C: clock and caption */}
      <motion.g variants={m.step}>
        <motion.path d="M38 175H70" {...bar} />
        <motion.path d="M38 190H124" {...bar} strokeWidth={4.5} />
        <motion.path d="M150 185H163M158 180L163 185L158 190" {...line} />
        <motion.path d={circlePath(208, 185, 9)} {...line} />
        <motion.path d="M208 185V180M208 185H212" {...line} />
        <motion.path d="M228 179H274" {...bar} />
        <motion.path d="M228 191H258" {...bar} strokeWidth={4.5} />
      </motion.g>
    </ArtSvg>
  )
}

type EntityProps = { x: number; y: number; w: number; h: number; rows: number[]; accent?: boolean; m: ArtMotion }

/** One entity box: outline, header rule, title bar and attribute rows. */
function Entity({ x, y, w, h, rows, accent = false, m }: EntityProps) {
  return (
    <motion.g variants={m.step}>
      <motion.path
        d={rr(x, y, w, h, 9)}
        stroke={accent ? 'var(--accent)' : 'var(--line-strong)'}
        strokeWidth={STROKE}
        fill={accent ? 'var(--accent-soft)' : 'var(--surface)'}
        variants={m.draw}
      />
      <motion.path
        d={`M${x} ${y + 22}H${x + w}`}
        stroke={accent ? 'var(--accent-line)' : 'var(--line-strong)'}
        strokeWidth={STROKE}
        variants={m.draw}
      />
      <motion.path
        d={`M${x + 12} ${y + 11}H${x + 50}`}
        stroke={accent ? 'var(--accent-text)' : 'var(--line-strong)'}
        strokeOpacity={accent ? 0.55 : 1}
        strokeWidth={4}
        variants={m.draw}
      />
      {rows.map((length, i) => (
        <motion.path
          key={i}
          d={`M${x + 12} ${y + 35 + i * 13}H${x + 12 + length}`}
          stroke={accent ? 'var(--accent-line)' : 'var(--line)'}
          strokeWidth={3}
          variants={m.draw}
        />
      ))}
    </motion.g>
  )
}

/** P2 « Conception de systèmes d'information »: three entities, orthogonal links labelled 1,n / 0,n. */
function EntitiesArt({ m, className }: ArtProps) {
  const label = { className: 'font-mono', fontSize: 10, fill: 'var(--fg-3)', variants: m.fade }
  return (
    <ArtSvg viewBox="0 0 320 180" m={m} className={className}>
      <Entity x={28} y={22} w={96} h={74} rows={[60, 46, 54]} m={m} />
      <Entity x={196} y={22} w={96} h={74} rows={[60, 44, 52]} m={m} />
      <Entity x={112} y={124} w={96} h={44} rows={[50]} accent m={m} />
      <motion.g variants={m.step} stroke="var(--line-strong)" strokeWidth={STROKE}>
        <motion.path d="M112 146H84A8 8 0 0 1 76 138V96" variants={m.draw} />
        <motion.path d="M208 146H236A8 8 0 0 0 244 138V96" variants={m.draw} />
      </motion.g>
      <motion.g variants={m.step} fill="var(--line-strong)">
        <motion.circle cx={76} cy={96} r={2.5} variants={m.pop} />
        <motion.circle cx={244} cy={96} r={2.5} variants={m.pop} />
        <motion.text x={83} y={114} {...label}>
          1,n
        </motion.text>
        <motion.text x={237} y={114} textAnchor="end" {...label}>
          0,n
        </motion.text>
      </motion.g>
    </ArtSvg>
  )
}

const INPUTS: readonly Point[] = [
  [84, 52],
  [84, 90],
  [84, 128],
]
const HIDDEN: readonly Point[] = [
  [160, 33],
  [160, 71],
  [160, 109],
  [160, 147],
]
const OUTPUTS: readonly Point[] = [
  [236, 71],
  [236, 109],
]

/** P3 « Explorations en IA »: a 3–4–2 network, the first output node in accent. */
function NetworkArt({ m, className }: ArtProps) {
  const edges = (from: readonly Point[], to: readonly Point[]) =>
    from.flatMap(([x1, y1]) =>
      to.map(([x2, y2]) => (
        <motion.path key={`${x1},${y1}-${x2},${y2}`} d={`M${x1} ${y1}L${x2} ${y2}`} variants={m.draw} />
      )),
    )
  const nodes = (layer: readonly Point[]) =>
    layer.map(([cx, cy]) => (
      <motion.circle
        key={`${cx},${cy}`}
        cx={cx}
        cy={cy}
        r={8}
        fill="var(--surface)"
        stroke="var(--line-strong)"
        strokeWidth={STROKE}
        variants={m.pop}
      />
    ))
  const [out, ...otherOutputs] = OUTPUTS
  return (
    <ArtSvg viewBox="0 0 320 180" m={m} className={className}>
      <motion.g variants={m.step} stroke="var(--line-strong)" strokeWidth={STROKE}>
        {INPUTS.map(([x, y]) => (
          <motion.path key={y} d={`M${x - 36} ${y}H${x - 8}`} variants={m.draw} />
        ))}
      </motion.g>
      <motion.g variants={m.step} stroke="var(--line-strong)" strokeWidth={1}>
        {edges(INPUTS, HIDDEN)}
      </motion.g>
      <motion.g variants={m.step}>{nodes(INPUTS)}</motion.g>
      <motion.g variants={m.step} stroke="var(--line-strong)" strokeWidth={1}>
        {edges(HIDDEN, OUTPUTS)}
      </motion.g>
      <motion.g variants={m.step}>{nodes(HIDDEN)}</motion.g>
      <motion.g variants={m.step}>
        {nodes(otherOutputs)}
        <motion.g variants={m.pop}>
          <circle cx={out[0]} cy={out[1]} r={14} fill="var(--accent-soft)" stroke="var(--accent-line)" strokeWidth={STROKE} />
          <circle cx={out[0]} cy={out[1]} r={8} fill="var(--accent)" />
        </motion.g>
      </motion.g>
      <motion.g variants={m.step} stroke="var(--line-strong)" strokeWidth={STROKE}>
        {OUTPUTS.map(([x, y], i) => (
          <motion.path key={y} d={`M${x + (i === 0 ? 14 : 8)} ${y}H${x + 36}`} variants={m.draw} />
        ))}
      </motion.g>
    </ArtSvg>
  )
}

const ARTS: Record<Project['art'], (props: ArtProps) => ReactNode> = {
  bento: BentoArt,
  entities: EntitiesArt,
  network: NetworkArt,
}

export default function ProjectArt({ art, className }: { art: Project['art']; className?: string }) {
  const reduce = !!useReducedMotion()
  const Art = ARTS[art]
  return <Art m={reduce ? STATIC : MOTION} className={className} />
}
