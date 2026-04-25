import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import SocialProof from '../components/home/SocialProof'
import HowItWorks from '../components/home/HowItWorks'
import DrinkEatPut from '../components/home/DrinkEatPut'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import Community from '../components/home/Community'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[73px]">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <DrinkEatPut />
        <Features />
        <Testimonials />
        <Community />
      </main>
      <Footer />
    </>
  )
}