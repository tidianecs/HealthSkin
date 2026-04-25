import { useTranslation } from 'react-i18next'

const LANGS = ['fr', 'en'] as const

export default function Footer() {
  const { t, i18n } = useTranslation()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-6 md:px-12 py-8 md:py-10 text-center">
      <div className="mb-4 flex flex-col items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--green-dark)] text-lg">
          🌿
        </div>
        <span className="font-bold text-[var(--text-primary)]">HealthSkin</span>
      </div>
      <p className="mb-5 text-xs md:text-sm text-[var(--text-muted)]">{t('footer.tagline')}</p>
      <div className="mb-5 flex justify-center gap-2">
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => i18n.changeLanguage(lang)}
            className={`rounded-pill px-4 py-1.5 text-xs font-bold uppercase transition-all ${
              i18n.language === lang
                ? 'bg-[var(--green-dark)] text-white'
                : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--green-dark)]'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <p className="text-xs text-[var(--text-muted)]">{t('footer.rights')}</p>
    </footer>
  )
}