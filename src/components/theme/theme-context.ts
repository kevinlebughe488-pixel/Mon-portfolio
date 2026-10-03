import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'
export type ThemeContextValue = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>')
  return value
}

export const THEME_STORAGE_KEY = 'theme'
export const THEME_COLORS: Record<Theme, string> = { light: '#F5F6F8', dark: '#0A0C10' }
