import { useCallback, useSyncExternalStore } from 'react'

/** Live boolean for a CSS media query, e.g. useMediaQuery(DESKTOP_QUERY). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** ≥1024px, the desktop bento layout. */
export const DESKTOP_QUERY = '(min-width: 64rem)'
/** ≥640px, the tablet bento layout. */
export const TABLET_QUERY = '(min-width: 40rem)'
