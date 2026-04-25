import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const REVIEWS = [
  { text: "I was skeptical about DIY skincare but the avocado mask recipe changed my mind completely. My skin feels so hydrated.", name: 'Marcia T.', skin: 'Oily skin', avatar: '👩🏽' },
  { text: "I have eczema-prone skin and the allergy-aware ingredient matching gave me so much peace of mind. Zero reactions.", name: 'Naomi L.', skin: 'Sensitive skin', avatar: '👩🏻' },
  { text: "The personalized routine is exactly what I needed. I stopped wasting money on products that don't work for my skin type.", name: 'Sophie L.', skin: 'Combination skin', avatar: '👩🏼' },
  { text: "J'adore les recettes smoothies ! Ma peau est visiblement plus lumineuse après seulement 2 semaines.", name: 'Amina D.', skin: 'Dry skin', avatar: '👩🏾' },
  { text: "The DIY masks are incredible. I replaced my entire skincare routine with HealthSkin recipes and my skin has never looked better.", name: 'Priya K.', skin: 'Normal skin', avatar: '👩🏿' },
  { text: "Finally a platform that understands that what you eat affects your skin. The meal plans are delicious and my skin shows it.", name: 'Clara M.', skin: 'Acne-prone skin', avatar: '👩🏻' },
  { text: "I've tried every skincare brand out there. Nothing worked until I started following my HealthSkin routine. Game changer.", name: 'Rita F.', skin: 'Oily skin', avatar: '👩🏽' },
  { text: "The morning routine takes only 10 minutes and my colleagues keep asking what I'm doing differently. Love it!", name: 'Sara B.', skin: 'Combination skin', avatar: '👩🏼' },
] as const

export default function Testimonials() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const review = REVIEWS[active]

  const prev = () => setActive((i) => (i === 0 ? REVIEWS.length - 1 : i - 1))
  const next = () => setActive((i) => (i === REVIEWS.length - 1 ? 0 : i + 1))

  return (
    <section className="bg-[#f0f2f5] dark:bg-[#0d1a0d] px-6 md:px-12 py-16 md:py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-2">
        {t('testimonials.title')}
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-10 md:mb-12">
        {t('testimonials.subtitle')}
      </p>

      <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-sm text-left transition-all duration-300">
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed mb-6">
          "{review.text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-xl md:text-2xl bg-[#f0d9c0]">
            {review.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--text-primary)]">{review.name}</div>
            <div className="text-xs text-[var(--text-muted)]">{review.skin}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
        <button onClick={prev} className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--green-dark)] hover:text-[var(--green-dark)] transition-all">‹</button>
        <div className="flex items-center gap-1.5">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[var(--green-dark)]' : 'w-2 bg-[var(--border)]'}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--green-dark)] hover:text-[var(--green-dark)] transition-all">›</button>
      </div>
    </section>
  )
}