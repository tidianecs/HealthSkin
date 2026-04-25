import { useTranslation } from 'react-i18next'

const STATS = [
  { key: 'recipes',    value: '100+', color: '#d4e8c2' },
  { key: 'challenges', value: '22+',  color: '#f0d9c0' },
  { key: 'groups',     value: '7',    color: '#f0d0cc' },
  { key: 'natural',    value: '100%', color: '#e8efc4' },
] as const

const AVATARS = ['👩🏽', '👩🏾', '👩🏿', '👩🏻']

export default function SocialProof() {
  const { t } = useTranslation()

  return (
    <section className="bg-[var(--bg-secondary)] px-6 md:px-12 py-10 md:py-14 flex flex-col items-center gap-8 md:gap-10">
      {/* Avatars + rating */}
      <div className="flex items-center gap-4">
        <div className="flex">
          {AVATARS.map((a, i) => (
            <div
              key={i}
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border-2 border-white text-base md:text-lg"
              style={{ marginLeft: i === 0 ? 0 : '-10px', background: '#f0d9c0' }}
            >
              {a}
            </div>
          ))}
        </div>
        <div>
          <div className="text-amber-400 text-sm md:text-base">★★★★★</div>
          <div className="text-xs md:text-sm font-semibold text-[var(--text-primary)]">
            {t('stats.happyUsers')}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl">
        {STATS.map(({ key, value, color }) => (
          <div
            key={key}
            className="rounded-2xl px-4 md:px-5 py-6 md:py-7 text-center"
            style={{ backgroundColor: color }}
          >
            <span className="block text-2xl md:text-3xl font-extrabold mb-1" style={{ color: '#1a1a1a' }}>
              {value}
            </span>
            <span className="text-xs md:text-sm" style={{ color: '#555' }}>
              {t(`stats.${key}`)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}