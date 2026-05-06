import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface CommitmentData { time: string; complexity: string; reminders: string }
interface Props { onBack: () => void; onContinue: (data: CommitmentData) => void }

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

export default function StepCommitment({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [time, setTime]             = useState('')
  const [complexity, setComplexity] = useState('')
  const [reminders, setReminders]   = useState('')

  const timeOpts       = t('onboarding.commitment.time',       { returnObjects: true }) as { label: string; sub: string }[]
  const complexityOpts = t('onboarding.commitment.complexity', { returnObjects: true }) as { label: string; sub: string }[]
  const reminderOpts   = t('onboarding.commitment.reminders',  { returnObjects: true }) as { label: string; sub: string }[]

  const canContinue = Boolean(time && complexity && reminders)

  const handleContinue = () => {
    console.log('button clicked', { canContinue, time, complexity, reminders })
    if (canContinue) {
      onContinue({ time, complexity, reminders })
    }
  }

  return (
    <OnboardingLayout
      step={9} total={9}
      title={t('onboarding.commitment.title')}
      onBack={onBack}
      onContinue={handleContinue}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">
          {t('onboarding.commitment.title')}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-1">
          {t('onboarding.commitment.subtitle')}
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-6">
          📍 {t('onboarding.commitment.hint')}
        </p>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">
          {t('onboarding.commitment.timeLabel')}
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-3">
          {t('onboarding.commitment.timeHint')}
        </p>
        <RadioList options={timeOpts} value={time} onChange={setTime} />

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">
          {t('onboarding.commitment.complexityLabel')}
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-3">
          {t('onboarding.commitment.complexityHint')}
        </p>
        <RadioList options={complexityOpts} value={complexity} onChange={setComplexity} />

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">
          {t('onboarding.commitment.remindersLabel')}
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-3">
          {t('onboarding.commitment.remindersHint')}
        </p>
        <RadioList options={reminderOpts} value={reminders} onChange={setReminders} />
      </div>
    </OnboardingLayout>
  )
}