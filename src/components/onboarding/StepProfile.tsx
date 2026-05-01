import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface ProfileData {
  age: string; sex: string; skinTone: string; climate: string
}

interface Props {
  onBack: () => void
  onContinue: (data: ProfileData) => void
}

function RadioGroup({ label, hint, options, value, onChange }: {
  label: string; hint?: string
  options: { label: string; sub?: string }[]
  value: string; onChange: (v: string) => void
}) {
  return (
    <div className="mb-6">
      <p className="text-base font-bold text-[var(--text-primary)] mb-1">{label}</p>
      {hint && <p className="text-xs text-[var(--text-muted)] mb-3">{hint}</p>}
      <div className="flex flex-col gap-2">
        {options.map(({ label: l, sub }) => (
          <button
            key={l}
            onClick={() => onChange(l)}
            className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
              value === l ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              value === l ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
            }`}>
              {value === l && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{l}</div>
              {sub && <div className="text-xs text-[var(--text-muted)]">{sub}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function StepProfile({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [age, setAge]           = useState('')
  const [sex, setSex]           = useState('')
  const [skinTone, setSkinTone] = useState('')
  const [climate, setClimate]   = useState('')

  const ages    = (t('onboarding.profile.ages',    { returnObjects: true }) as string[]).map(l => ({ label: l }))
  const sexes   = (t('onboarding.profile.sexes',   { returnObjects: true }) as string[]).map(l => ({ label: l }))
  const tones   =  t('onboarding.profile.tones',   { returnObjects: true }) as { label: string; sub: string }[]
  const climates = t('onboarding.profile.climates', { returnObjects: true }) as { label: string; sub: string }[]

  const canContinue = age && sex && skinTone && climate

  return (
    <OnboardingLayout
      step={3} total={9}
      title={t('onboarding.profile.title')}
      onBack={onBack}
      onContinue={() => canContinue && onContinue({ age, sex, skinTone, climate })}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">{t('onboarding.profile.title')}</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">{t('onboarding.profile.subtitle')}</p>

        <RadioGroup label={t('onboarding.profile.ageLabel')}     options={ages}     value={age}      onChange={setAge}      />
        <RadioGroup label={t('onboarding.profile.sexLabel')}     options={sexes}    value={sex}      onChange={setSex}      />
        <RadioGroup label={t('onboarding.profile.toneLabel')}    hint={t('onboarding.profile.toneHint')}
          options={tones}    value={skinTone} onChange={setSkinTone} />
        <RadioGroup label={t('onboarding.profile.climateLabel')} hint={t('onboarding.profile.climateHint')}
          options={climates} value={climate}  onChange={setClimate}  />
      </div>
    </OnboardingLayout>
  )
}