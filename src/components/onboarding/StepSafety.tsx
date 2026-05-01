import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface SafetyData { pregnant: string; reaction: string }
interface Props { onBack: () => void; onContinue: (data: SafetyData) => void }

export default function StepSafety({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [pregnant, setPregnant] = useState('')
  const [reaction, setReaction] = useState('')

  const pregnantOpts = t('onboarding.safety.pregnant',  { returnObjects: true }) as { label: string }[]
  const reactionOpts = t('onboarding.safety.reactions', { returnObjects: true }) as { label: string; sub: string }[]

  const canContinue = pregnant && reaction

  return (
    <OnboardingLayout
      step={8} total={9}
      title={t('onboarding.safety.title')}
      onBack={onBack}
      onContinue={() => canContinue && onContinue({ pregnant, reaction })}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">{t('onboarding.safety.title')}</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">{t('onboarding.safety.subtitle')}</p>

        <div className="flex gap-3 rounded-xl bg-[#f0d9c0] px-4 py-3 mb-6">
          <span>⚠️</span>
          <p className="text-xs text-[#7a4a1a] leading-relaxed">{t('onboarding.safety.warning')}</p>
        </div>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.safety.pregnantLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.safety.pregnantHint')}</p>
        <div className="flex flex-col gap-2 mb-6">
          {pregnantOpts.map(({ label }) => (
            <button key={label} onClick={() => setPregnant(label)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                pregnant === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                pregnant === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {pregnant === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{label}</span>
            </button>
          ))}
        </div>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.safety.reactionLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.safety.reactionHint')}</p>
        <div className="flex flex-col gap-2">
          {reactionOpts.map(({ label, sub }) => (
            <button key={label} onClick={() => setReaction(label)}
              className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                reaction === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                reaction === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {reaction === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
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