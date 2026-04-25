import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Theme {
  isDark: boolean
  toggle: () => void
}

export const theme = create<Theme>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggle: () => {
        const next = !get().isDark
        document.documentElement.classList.toggle('dark', next)
        set({ isDark: next })
      },
    }),
    { name: 'healthskin-theme' }
  )
)

// Init au chargement (avant React)
export function initTheme() {
  const raw = localStorage.getItem('healthskin-theme')
  if (raw) {
    const { state } = JSON.parse(raw)
    if (state?.isDark) document.documentElement.classList.add('dark')
  }
}