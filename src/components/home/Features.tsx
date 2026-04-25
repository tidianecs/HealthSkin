import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import mainPic from '../../assets/colorful-juices-1.jpg'
import secondPic from '../../assets/colorful-juices-2.jpg'
import thirdPic from '../../assets/colorful-juices-3.jpg'
//import fourthPic from '../../assets/colorful-juices-4.jpg'


const FEATURE_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const

export default function Features() {
  const { t } = useTranslation()

  return (
    <section className="bg-[var(--bg-primary)] px-6 md:px-12 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto items-center">

        {/* Left — text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] leading-snug mb-6 md:mb-8">
            {t('features.title')}
          </h2>
          <ul className="mb-8 md:mb-9 space-y-3">
            {FEATURE_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                <span className="mt-0.5 text-[var(--green-dark)] font-bold text-base">✓</span>
                {t(`features.${key}`)}
              </li>
            ))}
          </ul>
          <Button>{t('features.cta')} →</Button>
        </div>

        {/* Right — photo grid décalée */}
        <div className="flex gap-3 h-[320px] md:h-[480px]">
          <div className="w-1/2 rounded-2xl overflow-hidden">
            <img
              src={mainPic}
              alt="skincare drink"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-3">
            <div className="flex-1 rounded-2xl overflow-hidden">
              <img
                src={secondPic}
                alt="healthy food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden">
              <img
                src={thirdPic}
                alt="skincare routine"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
                alt="natural ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}