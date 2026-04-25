import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import pic1 from '../../assets/community-1.jpg'
import pic2 from '../../assets/community-2.jpg'
import pic3 from '../../assets/community-3.jpg'
import pic4 from '../../assets/community-4.jpg'
import pic5 from '../../assets/community-5.jpg'
import pic6 from '../../assets/community-6.jpg'
import pic7 from '../../assets/community-7.jpg'
// import pic8 from '../../assets/community-8.jpg'


// Unsplash images — femmes + nourriture/skincare naturelle
const PHOTOS = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7
] as const


export default function Community() {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let position = 0
    const speed = 0.5
    const animate = () => {
      position += speed
      if (position >= track.scrollWidth / 2) position = 0
      track.style.transform = `translateX(-${position}px)`
      requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="bg-cream py-16 md:py-20 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] text-center mb-8 md:mb-12 px-6">
        {t('community.title')}
      </h2>
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-3 md:gap-4 will-change-transform" style={{ width: 'max-content' }}>
          {[...PHOTOS, ...PHOTOS].map((src, i) => (
            <div key={i} className="w-36 h-48 md:w-44 md:h-60 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={src} alt="Community member" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}