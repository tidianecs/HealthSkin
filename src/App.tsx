import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { Session } from '@supabase/supabase-js'
import Home       from './pages/Home'
import Auth       from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard  from './pages/Dashboard'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-[var(--text-muted)] text-sm">Loading...</div>
      </div>
    )
  }

  // true seulement si le champ existe ET est explicitement true
  const onboardingDone = session?.user?.user_metadata?.onboarding_complete === true

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Auth — si déjà connecté, redirige selon onboarding */}
        <Route
          path="/auth"
          element={
            !session
              ? <Auth />
              : onboardingDone
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/onboarding" replace />
          }
        />

        {/* Onboarding — seulement si connecté ET onboarding pas fait */}
        <Route
          path="/onboarding"
          element={
            !session
              ? <Navigate to="/auth" replace />
              : onboardingDone
                ? <Navigate to="/dashboard" replace />
                : <Onboarding />
          }
        />

        {/* Dashboard — seulement si connecté ET onboarding fait */}
        <Route
          path="/dashboard"
          element={
            !session
              ? <Navigate to="/auth" replace />
              : !onboardingDone
                ? <Navigate to="/onboarding" replace />
                : <Dashboard />
          }
        />

        {/* Scan — après onboarding */}
        <Route
          path="/scan"
          element={
            !session
              ? <Navigate to="/auth" replace />
              : <Dashboard />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}