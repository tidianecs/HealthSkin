import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

const LANGS = [
  { code: 'en', flag: 'GB', name: 'English',  native: 'English' },
  { code: 'fr', flag: 'FR', name: 'Français', native: 'French'  },
] as const

interface Props { onContinue: () => void }

export default function StepLanguage({ onContinue }: Props) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] ?? 'en'

  return (
    <OnboardingLayout
      step={1} total={9}
      title={t('onboarding.language.title')}
      onContinue={onContinue}
    >
      <div className="flex flex-col items-center text-center mt-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-dark)] text-3xl mb-5">🌐</div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">
          {t('onboarding.language.title')}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          {t('onboarding.language.subtitle')}
        </p>
        <div className="w-full flex flex-col gap-3">
          {LANGS.map(({ code, flag, name }) => (
            <button
              key={code}
              onClick={() => i18n.changeLanguage(code)}
              className={`flex items-center gap-4 w-full rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                currentLang === code
                  ? 'border-[var(--green-dark)] bg-[#d4e8c2]'
                  : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <span className="text-sm font-bold text-[var(--text-muted)] w-8">{flag}</span>
              <span className="font-semibold text-[var(--text-primary)]">{name}</span>
              {currentLang === code && <span className="ml-auto text-[var(--green-dark)] font-bold">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  )
}