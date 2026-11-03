import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

declare global {
  interface Window {
    app?: { setTheme: (mode: ThemeMode) => Promise<boolean> }
  }
}

const KEY = 'glbs-theme'

function resolve(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(
    () => (localStorage.getItem(KEY) as ThemeMode | null) ?? 'system'
  )

  useEffect(() => {
    const apply = () => document.documentElement.classList.toggle('dark', resolve(mode) === 'dark')
    apply()
    window.app?.setTheme(mode)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [mode])

  const setMode = useCallback((m: ThemeMode) => {
    localStorage.setItem(KEY, m)
    setModeState(m)
  }, [])

  return { mode, setMode }
}
