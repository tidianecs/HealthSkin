import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const onboardingDone = session.user?.user_metadata?.onboarding_complete === true
        navigate(onboardingDone ? '/dashboard' : '/onboarding', { replace: true })
      } else {
        navigate('/auth', { replace: true })
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--green-dark)] text-2xl">
          🌿
        </div>
        <p className="text-[var(--text-muted)] text-sm">Connexion en cours...</p>
      </div>
    </div>
  )
}