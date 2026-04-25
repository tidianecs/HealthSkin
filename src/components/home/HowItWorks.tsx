import { useTranslation } from 'react-i18next'

const STEPS = [
  { num: '01', icon: '🔍', iconBg: 'bg-badge-green', titleKey: 'step1Title', descKey: 'step1Desc' },
  { num: '02', icon: '🥤', iconBg: 'bg-badge-peach', titleKey: 'step2Title', descKey: 'step2Desc' },
  { num: '03', icon: '✨', iconBg: 'bg-badge-pink',  titleKey: 'step3Title', descKey: 'step3Desc' },
] as const

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section className="bg-[var(--bg-primary)] px-6 md:px-12 py-16 md:py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-12 md:mb-16">
        {t('howItWorks.title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 max-w-3xl mx-auto">
        {STEPS.map(({ num, icon, iconBg, titleKey, descKey }) => (
          <div key={num} className="flex flex-col items-center text-center">
            <div className={`${iconBg} w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-3xl mb-5`}>
              {icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Step {num}
            </p>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
              {t(`howItWorks.${titleKey}`)}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t(`howItWorks.${descKey}`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}