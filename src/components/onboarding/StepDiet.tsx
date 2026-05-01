import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

export interface DietData { diet: string[]; drinks: string[]; allergies: string; digestion: string }
interface Props { onBack: () => void; onContinue: (data: DietData) => void }

export default function StepDiet({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [diet, setDiet]           = useState<string[]>([])
  const [drinks, setDrinks]       = useState<string[]>([])
  const [allergies, setAllergies] = useState('')
  const [digestion, setDigestion] = useState('')

  const dietOpts      = t('onboarding.diet.diet',      { returnObjects: true }) as string[]
  const drinkOpts     = t('onboarding.diet.drinks',    { returnObjects: true }) as string[]
  const digestionOpts = t('onboarding.diet.digestion', { returnObjects: true }) as { label: string; sub: string }[]

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const canContinue = diet.length > 0 && drinks.length > 0 && allergies && digestion

  return (
    <OnboardingLayout
      step={7} total={9}
      title={t('onboarding.diet.title')}
      onBack={onBack}
      onContinue={() => canContinue && onContinue({ diet, drinks, allergies, digestion })}
      continueDisabled={!canContinue}
    >
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">{t('onboarding.diet.title')}</h2>
        <p className="text-sm text-[var(--text-muted)] mb-1">{t('onboarding.diet.subtitle')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-6">📍 {t('onboarding.diet.hint')}</p>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.diet.dietLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.diet.dietHint')}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {dietOpts.map(d => (
            <button key={d} onClick={() => toggle(diet, d, setDiet)}
              className={`rounded-pill px-4 py-2 text-sm font-medium border-2 transition-all ${
                diet.includes(d) ? 'border-[var(--green-dark)] bg-[#d4e8c2] text-[var(--green-dark)]' : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}>{d}</button>
          ))}
        </div>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.diet.drinksLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.diet.drinksHint')}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {drinkOpts.map(d => (
            <button key={d} onClick={() => toggle(drinks, d, setDrinks)}
              className={`rounded-pill px-4 py-2 text-sm font-medium border-2 transition-all ${
                drinks.includes(d) ? 'border-[var(--green-dark)] bg-[#d4e8c2] text-[var(--green-dark)]' : 'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}>{d}</button>
          ))}
        </div>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.diet.allergiesLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.diet.allergiesHint')}</p>
        <div className="flex flex-col gap-2 mb-6">
          {[t('onboarding.diet.yes'), t('onboarding.diet.no')].map(opt => (
            <button key={opt} onClick={() => setAllergies(opt)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                allergies === opt ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                allergies === opt ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {allergies === opt && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{opt}</span>
            </button>
          ))}
        </div>

        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{t('onboarding.diet.digestionLabel')}</p>
        <p className="text-xs text-[var(--text-muted)] mb-3">{t('onboarding.diet.digestionHint')}</p>
        <div className="flex flex-col gap-2">
          {digestionOpts.map(({ label, sub }) => (
            <button key={label} onClick={() => setDigestion(label)}
              className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                digestion === label ? 'border-[var(--green-dark)] bg-[#d4e8c2]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                digestion === label ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
              }`}>
                {digestion === label && <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-dark)]" />}
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