import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface RoutineData { water: string; exfoliation: string; naturalSkincare: string }
interface Props { onBack: () => void; onContinue: (data: RoutineData) => void }

function RadioList({ options, value, onChange }: {
  options: { label: string; sub: string }[]
  value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      {options.map(({ label, sub }) => (
        <button key={label} onClick={() => onChange(label)}
          className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
            value === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
          }`}
        >
          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            value === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
          }`}>
            {value === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
            <div className="text-xs text-[var(--text-muted)]">{sub}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default function StepRoutine({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [water, setWater]             = useState('')
  const [exfoliation, setExfoliation] = useState('')
  const [naturalSkincare, setNatural] = useState('')

  const waterOpts       = t('onboarding.routine.water',       { returnObjects: true }) as { label: string; sub: string }[]
  const exfoliationOpts = t('onboarding.routine.exfoliation', { returnObjects: true }) as { label: string; sub: string }[]
  const naturalOpts     = t('onboarding.routine.natural',     { returnObjects: true }) as { label: string; sub: string }[]

  const canContinue = water && exfoliation && naturalSkincare

  return (
    <OnboardingLayout
      step={6} total={9}
      title={t('onboarding.routine.title')}
      onBack={onBack}
      onContinue={() => canContinue && onContinue({ water, exfoliation, naturalSkincare })}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">{t('onboarding.routine.title')}</h2>
        <p className="text-sm text-[var(--text-muted)] mb-1">{t('onboarding.routine.subtitle')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-6">📍 {t('onboarding.routine.hint')}</p>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.routine.waterLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.routine.waterHint')}</p>
        <RadioList options={waterOpts} value={water} onChange={setWater} />

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.routine.exfoliationLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.routine.exfoliationHint')}</p>
        <RadioList options={exfoliationOpts} value={exfoliation} onChange={setExfoliation} />

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.routine.naturalLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.routine.naturalHint')}</p>
        <RadioList options={naturalOpts} value={naturalSkincare} onChange={setNatural} />
      </div>
    </OnboardingLayout>
  )
}