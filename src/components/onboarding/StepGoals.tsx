import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface GoalsData { goals: string[]; timeline: string }
interface Props { onBack: () => void; onContinue: (data: GoalsData) => void }

export default function StepGoals({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [goals, setGoals]       = useState<string[]>([])
  const [timeline, setTimeline] = useState('')

  const goalsList  = t('onboarding.goals.goals',     { returnObjects: true }) as string[]
  const timelines  = t('onboarding.goals.timelines', { returnObjects: true }) as { label: string; sub: string }[]

  const toggleGoal = (g: string) =>
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])

  const canContinue = goals.length > 0 && timeline

  return (
    <OnboardingLayout
      step={5} total={9}
      title={t('onboarding.goals.title')}
      onBack={onBack}
      onContinue={() => canContinue && onContinue({ goals, timeline })}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">{t('onboarding.goals.title')}</h2>
        <p className="text-sm text-[var(--text-muted)] mb-1">{t('onboarding.goals.subtitle')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-6">📍 {t('onboarding.goals.hint')}</p>

        <p className="text-base font-bold text-[var(--text-primary)] mb-3">{t('onboarding.goals.goalsLabel')}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {goalsList.map(g => (
            <button key={g} onClick={() => toggleGoal(g)}
              className={`rounded-pill px-4 py-2 text-sm font-medium border-2 transition-all ${
                goals.includes(g)
                  ? 'border-[var(--green-dark)] bg-[#d4e8c2] text-[var(--green-dark)]'
                  : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}
            >{g}</button>
          ))}
        </div>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.goals.timelineLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.goals.timelineHint')}</p>
        <div className="flex flex-col gap-2">
          {timelines.map(({ label, sub }) => (
            <button key={label} onClick={() => setTimeline(label)}
              className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                timeline === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                timeline === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {timeline === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
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