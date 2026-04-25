import { useTranslation } from 'react-i18next'
import drinkImg from '../../assets/drink-skincare-1.jpg'
import eatImg from '../../assets/eat-skincare-2.jpg'
import putImg from '../../assets/put-skincare-3.jpg'

const CARDS = [
  { titleKey: 'dep.drink', descKey: 'dep.drinkDesc', img: drinkImg },
  { titleKey: 'dep.eat',   descKey: 'dep.eatDesc',   img: eatImg   },
  { titleKey: 'dep.put',   descKey: 'dep.putDesc',   img: putImg   },
] as const

export default function DrinkEatPut() {
  const { t } = useTranslation()

  return (
    <section className="bg-[var(--bg-secondary)] px-6 md:px-12 py-16 md:py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-10 md:mb-12">
        {t('dep.title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {CARDS.map(({ titleKey, descKey, img }) => (
          <div
            key={titleKey}
            className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-left"
          >
            <div className="h-48 md:h-52 overflow-hidden">
              <img src={img} alt={titleKey} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                {t(titleKey)}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}