import { useEffect, useState } from 'react'

/**
 * Scroll spy: returns the id of the section crossing a thin band in the middle of the viewport.
 * `ids` must be a stable array (module constant or memoized).
 * At the very bottom of the page the last id wins, so a short final section can still become active.
 */
export function useActiveSection(ids: readonly string[], fallback = ''): string {
  const [active, setActive] = useState(fallback)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Map<string, boolean>()
    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

    const pick = () => {
      if (atBottom()) {
        setActive(ids[ids.length - 1])
        return
      }
      setActive(ids.find((id) => visible.get(id)) ?? fallback)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        pick()
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    window.addEventListener('scroll', pick, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', pick)
    }
  }, [ids, fallback])

  return active
}
