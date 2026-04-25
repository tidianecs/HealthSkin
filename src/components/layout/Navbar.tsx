import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { theme } from '../../core/theme'
import Button from '../ui/Button'

const LANGS = ['fr', 'en'] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { isDark, toggle } = theme()

  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setVisible(currentY < lastY || currentY < 10)
      setLastY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-6 md:px-12 py-4 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 no-underline">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--green-dark)] text-base">
          🌿
        </div>
        <div>
          <div className="font-bold text-sm text-[var(--text-primary)]">HealthSkin</div>
          <div className="text-xs text-[var(--text-muted)] hidden sm:block">Drink · Eat · Put</div>
        </div>
      </a>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Lang switcher */}
        <div className="flex gap-1">
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`rounded-pill px-2 md:px-3 py-1 text-xs font-bold uppercase transition-all ${
                i18n.language === lang
                  ? 'bg-[var(--green-dark)] text-white'
                  : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--green-dark)] hover:text-[var(--green-dark)]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full border border-[var(--border)] text-base transition-all hover:border-[var(--green-dark)]"
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <Button className="text-xs md:text-sm px-4 md:px-7 py-2.5 md:py-3.5">
          {t('nav.getStarted')}
        </Button>
      </div>
    </nav>
  )
}