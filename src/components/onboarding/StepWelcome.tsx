import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import OnboardingLayout from './OnboardingLayout'

interface Props {
  onBack: () => void
  onContinue: (photo: string | null) => void
}

export default function StepWelcome({ onBack, onContinue }: Props) {
  const { t } = useTranslation()
  const [photo, setPhoto] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
    setError(false)
  }

  const handleContinue = () => {
    if (!photo) { setError(true); return }
    onContinue(photo)
  }

  const cards = [
    { title: t('onboarding.welcome.cards.profile'), sub: t('onboarding.welcome.cards.profileSub') },
    { title: t('onboarding.welcome.cards.skin'),    sub: t('onboarding.welcome.cards.skinSub')    },
    { title: t('onboarding.welcome.cards.goals'),   sub: t('onboarding.welcome.cards.goalsSub')   },
    { title: t('onboarding.welcome.cards.diet'),    sub: t('onboarding.welcome.cards.dietSub')    },
  ]

  return (
    <OnboardingLayout
      step={2} total={9}
      title={t('onboarding.welcome.title')}
      onBack={onBack}
      onContinue={handleContinue}
    >
      <div className="flex flex-col items-center text-center mt-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-dark)] text-3xl mb-5">🌿</div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3">
          {t('onboarding.welcome.title')}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-8 max-w-xs leading-relaxed">
          {t('onboarding.welcome.subtitle')}
        </p>

        <div className="mb-2">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{t('onboarding.welcome.photoLabel')}</p>
          <p className="text-xs text-[var(--text-muted)] mb-4">{t('onboarding.welcome.photoHint')}</p>
          <button
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed transition-all ${
              photo ? 'border-[var(--green-dark)]' : 'border-[var(--border)]'
            } bg-[var(--bg-secondary)] overflow-hidden`}
          >
            {photo ? (
              <img src={photo} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <>
                <span className="text-2xl mb-1">📷</span>
                <span className="text-xs text-[var(--text-muted)]">{t('onboarding.welcome.photoAdd')}</span>
              </>
            )}
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>

        {error && <p className="text-xs text-[#c0392b] mb-4">{t('onboarding.welcome.photoError')}</p>}

        <div className="grid grid-cols-2 gap-3 w-full mt-4">
          {cards.map(({ title, sub }) => (
            <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-left">
              <div className="text-sm font-semibold text-[var(--text-primary)]">{title}</div>
              <div className="text-xs text-[var(--text-muted)]">{sub}</div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[var(--text-muted)]">🔒 {t('onboarding.welcome.privacy')}</p>
      </div>
    </OnboardingLayout>
  )
}