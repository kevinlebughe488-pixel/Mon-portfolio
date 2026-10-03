import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { THEME_COLORS, THEME_STORAGE_KEY, ThemeContext, type Theme } from './theme-context'

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

/** Applies a theme to <html data-theme>, with one frame of disabled transitions to avoid a colour smear. */
function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme-switching', '')
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  requestAnimationFrame(() => requestAnimationFrame(() => root.removeAttribute('data-theme-switching')))
}

/**
 * Light + dark themes. The initial theme is set before first paint by the inline script in index.html;
 * while the visitor has not chosen, the page follows system changes. The toggle stores the choice.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (readStored()) return
      const next: Theme = event.matches ? 'dark' : 'light'
      applyTheme(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* private mode: the choice simply is not remembered */
    }
    setTheme(next)
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
