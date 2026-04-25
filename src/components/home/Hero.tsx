import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const EMOJIS = [
  { emoji: '🍋', style: { top: '15%', left: '6%',      animationDelay: '0s'   } },
  { emoji: '🥑', style: { top: '55%', left: '3%',      animationDelay: '1s'   } },
  { emoji: '🥒', style: { top: '20%', right: '5%',     animationDelay: '0.5s' } },
  { emoji: '🍓', style: { top: '60%', right: '4%',     animationDelay: '1.5s' } },
  { emoji: '🥦', style: { top: '40%', left: '12%',     animationDelay: '2s'   } },
  { emoji: '🍊', style: { bottom: '15%', right: '10%', animationDelay: '0.8s' } },
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-cream px-6 md:px-12 py-16 md:py-24 text-center flex flex-col items-center justify-center min-h-[480px] md:min-h-[520px]">

      {EMOJIS.map(({ emoji, style }) => (
        <span
          key={emoji}
          className="pointer-events-none absolute select-none text-2xl md:text-4xl opacity-70 hidden sm:block"
          style={{ ...style, animation: 'float 3s ease-in-out infinite' }}
        >
          {emoji}
        </span>
      ))}

      <Badge className="mb-6 md:mb-8 relative z-10 text-xs md:text-sm">
        {t('hero.badge')}
      </Badge>

      <h1 className="relative z-10 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-green-dark mb-5 md:mb-6">
        {t('hero.title1')}{' '}
        <span className="relative inline-block">
          {t('hero.titleHighlight')}
          <svg
            className="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6 Q50 0 100 4 Q150 8 200 3"
              stroke="#2d4a2d"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>{' '}
        {t('hero.title2')}
      </h1>

      <p className="relative z-10 max-w-lg text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-8 md:mb-10 px-4 md:px-0">
        {t('hero.subtitle')}
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4 md:mb-5 w-full px-6 sm:px-0">
        <Button className="w-full sm:w-auto">{t('hero.cta')} →</Button>
        <Button variant="outline" className="w-full sm:w-auto">{t('hero.ctaSecondary')}</Button>
      </div>

      <p className="relative z-10 text-xs text-[var(--text-muted)]">{t('hero.sub')}</p>
    </section>
  )
}