import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface SkinData {
  feeling: string; concerns: string[]; sensitivity: string
}

interface Props {
  onBack: () => void
  onContinue: (data: SkinData) => void
}

export default function StepSkin({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [feeling, setFeeling]         = useState('')
  const [concerns, setConcerns]       = useState<string[]>([])
  const [sensitivity, setSensitivity] = useState('')

  const feelings      = t('onboarding.skin.feelings',      { returnObjects: true }) as { label: string; sub: string }[]
  const concerns_list = t('onboarding.skin.concerns',      { returnObjects: true }) as string[]
  const sensitivities = t('onboarding.skin.sensitivities', { returnObjects: true }) as { label: string; sub: string }[]

  const toggleConcern = (c: string) =>
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const canContinue = feeling && concerns.length > 0 && sensitivity

  return (
    <OnboardingLayout
      step={4} total={9}
      title={t('onboarding.skin.title')}
      onBack={onBack}
      onContinue={() => canContinue && onContinue({ feeling, concerns, sensitivity })}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">{t('onboarding.skin.title')}</h2>
        <p className="text-sm text-[var(--text-muted)] mb-1">{t('onboarding.skin.subtitle')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-6">📍 {t('onboarding.skin.hint')}</p>

        {/* Feeling */}
        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.skin.feelingLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.skin.feelingHint')}</p>
        <div className="flex flex-col gap-2 mb-6">
          {feelings.map(({ label, sub }) => (
            <button key={label} onClick={() => setFeeling(label)}
              className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                feeling === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                feeling === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {feeling === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
                <div className="text-xs text-[var(--text-muted)]">{sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Concerns */}
        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.skin.concernsLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.skin.concernsHint')}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {concerns_list.map(c => (
            <button key={c} onClick={() => toggleConcern(c)}
              className={`rounded-pill px-4 py-2 text-sm font-medium border-2 transition-all ${
                concerns.includes(c)
                  ? 'border-[var(--green-dark)] bg-[#d4e8c2] text-[var(--green-dark)]'
                  : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}
            >{c}</button>
          ))}
        </div>

        {/* Sensitivity */}
        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.skin.sensitivityLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.skin.sensitivityHint')}</p>
        <div className="flex flex-col gap-2">
          {sensitivities.map(({ label, sub }) => (
            <button key={label} onClick={() => setSensitivity(label)}
              className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                sensitivity === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                sensitivity === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {sensitivity === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
                <div className="text-xs text-[var(--text-muted)]">{sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  )
}