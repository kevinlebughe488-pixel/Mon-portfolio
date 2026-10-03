import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { ThemeProvider } from './theme/ThemeProvider'

/** Motion respects the visitor's reduced-motion setting; theme context for the toggle. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>{children}</ThemeProvider>
    </MotionConfig>
  )
}
