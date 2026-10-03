import { motion, stagger, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'

type Point = readonly [x: number, y: number]

/** 12 nodes, denser towards the bottom-right corner where the drawing sits (viewBox 240 × 180). */
const NODES: readonly Point[] = [
  [34, 150],
  [70, 118],
  [58, 166],
  [108, 146],
  [104, 82],
  [146, 112],
  [150, 164],
  [186, 134],
  [164, 54],
  [206, 86],
  [222, 158],
  [128, 28],
]
/** 16 edges between node indexes. */
const EDGES: readonly (readonly [number, number])[] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [3, 5],
  [3, 6],
  [4, 5],
  [4, 11],
  [5, 7],
  [5, 8],
  [6, 7],
  [7, 10],
  [8, 9],
  [9, 7],
  [11, 8],
]
/** The three accent nodes. */
const ACCENT = new Set([1, 5, 9])

// Nodes pop in first, then the edges draw between them. Driven by the AI tile's reveal (variant inheritance).
const root: Variants = { hidden: {}, show: {} }
const nodeGroup: Variants = { hidden: {}, show: { transition: { delayChildren: stagger(0.03, { startDelay: 0.05 }) } } }
const edgeGroup: Variants = { hidden: {}, show: { transition: { delayChildren: stagger(0.04, { startDelay: 0.25 }) } } }
const node: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: ease.out } },
}
const edge: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.6, ease: ease.inOut }, opacity: { duration: 0.1 } },
  },
}

/**
 * Decorative constellation of the « Intelligence artificielle » tile: edges in line-strong,
 * three accent nodes. Reduced motion: drawn in its final state, it simply fades in with the tile.
 */
export default function Constellation({ className }: { className?: string }) {
  const reduce = !!useReducedMotion()
  const v = (variants: Variants) => (reduce ? undefined : variants)

  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 180"
      fill="none"
      className={cn('pointer-events-none', className)}
      variants={v(root)}
    >
      <motion.g variants={v(edgeGroup)} stroke="var(--line-strong)" strokeWidth={1} strokeLinecap="round">
        {EDGES.map(([a, b]) => (
          <motion.path
            key={`${a}-${b}`}
            d={`M${NODES[a][0]} ${NODES[a][1]}L${NODES[b][0]} ${NODES[b][1]}`}
            variants={v(edge)}
          />
        ))}
      </motion.g>
      <motion.g variants={v(nodeGroup)}>
        {NODES.map(([x, y], i) =>
          ACCENT.has(i) ? (
            <motion.g key={i} variants={v(node)}>
              <circle cx={x} cy={y} r={7.5} fill="var(--accent-soft)" stroke="var(--accent-line)" />
              <circle cx={x} cy={y} r={3.5} fill="var(--accent)" />
            </motion.g>
          ) : (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={3}
              fill="var(--surface)"
              stroke="var(--line-strong)"
              strokeWidth={1.25}
              variants={v(node)}
            />
          ),
        )}
      </motion.g>
    </motion.svg>
  )
}
