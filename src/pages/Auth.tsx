import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const EMOJIS = [
  { emoji: '🍋', style: { top: '8%',    left: '5%',      animationDelay: '0s'   } },
  { emoji: '🍑', style: { top: '15%',   right: '7%',     animationDelay: '0.5s' } },
  { emoji: '🥑', style: { top: '50%',   left: '3%',      animationDelay: '1s'   } },
  { emoji: '🥒', style: { top: '30%',   right: '4%',     animationDelay: '0.8s' } },
  { emoji: '🍃', style: { top: '60%',   right: '6%',     animationDelay: '2s'   } },
  { emoji: '🍓', style: { bottom: '15%', right: '10%',   animationDelay: '1.2s' } },
  { emoji: '🥝', style: { bottom: '20%', left: '12%',    animationDelay: '0.3s' } },
]

export default function Auth() {
  const navigate = useNavigate()

  const [mode, setMode]         = useState<'signup' | 'login'>('signup')
  const [fullName, setFullName] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [success, setSuccess]   = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) setError(error.message)
      else setSuccess(true)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/dashboard')
    }

    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  // ── Écran confirmation email ──
  if (success) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-cream flex flex-col items-center justify-center px-4 py-12">
        {EMOJIS.map(({ emoji, style }) => (
          <span
            key={emoji}
            className="pointer-events-none absolute select-none text-3xl opacity-60"
            style={{ ...style, animation: 'float 3s ease-in-out infinite' }}
          >
            {emoji}
          </span>
        ))}

        <div className="relative z-10 flex flex-col items-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--green-dark)] text-2xl mb-3">
            🌿
          </div>
          <span className="font-bold text-lg text-[var(--text-primary)]">HealthSkin</span>
        </div>

        <div className="relative z-10 w-full max-w-md bg-[var(--bg-secondary)] rounded-2xl p-10 shadow-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--border)]">
            <svg className="w-7 h-7 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Check your inbox</h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            We've sent you a verification email. If you don't see it within a minute, check your spam or junk folder — it sometimes lands there.
          </p>

          <div className="flex items-start gap-3 rounded-xl bg-[#f0d9c0] px-4 py-3 text-left mb-6">
            <span className="text-lg">📬</span>
            <p className="text-xs text-[#7a4a1a] leading-relaxed">
              Also check your Spam, Promotions, or Junk folders if the email doesn't arrive in your main inbox.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm font-bold text-[var(--text-primary)] underline hover:opacity-70 transition-opacity disabled:opacity-40"
          >
            {loading ? 'Sending...' : 'Resend email'}
          </button>

          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Sent to <span className="font-semibold">{email}</span>
          </p>
        </div>

        <p className="relative z-10 mt-8 max-w-xs text-center text-xs text-[var(--text-muted)]">
          By signing up you agree to our Terms. HealthSkin is for wellness purposes only — not medical advice.
        </p>
      </div>
    )
  }

  // ── Écran principal Login / Signup ──
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream flex flex-col items-center justify-center px-4 py-12">

      {EMOJIS.map(({ emoji, style }) => (
        <span
          key={emoji}
          className="pointer-events-none absolute select-none text-3xl opacity-60"
          style={{ ...style, animation: 'float 3s ease-in-out infinite' }}
        >
          {emoji}
        </span>
      ))}

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--green-dark)] text-2xl mb-3">
          🌿
        </div>
        <span className="font-bold text-lg text-[var(--text-primary)]">HealthSkin</span>
      </div>

      {/* Subtitle */}
      <h1 className="relative z-10 text-xl font-bold text-[#c0392b] mb-5 text-center">
        Build your custom skin routine
      </h1>

        {/* Tags */}
        <div className="relative z-10 flex flex-col items-center gap-2 mb-8">
        {/* Ligne 1 — 2 tags */}
        <div className="flex gap-2">
            <span className="flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm text-[var(--text-primary)]"
            style={{ backgroundColor: '#d4e8c2' }}>
            🥤 Drink your skincare
            </span>
            <span className="flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm text-[var(--text-primary)]"
            style={{ backgroundColor: '#f0d9c0' }}>
            🥗 Eat your skincare
            </span>
        </div>
        {/* Ligne 2 — 1 tag centré */}
        <div>
            <span className="flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm text-[var(--text-primary)]"
            style={{ backgroundColor: '#f0d0cc' }}>
            🧴 Put your skincare
            </span>
        </div>
        </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-sm">
        {/* Full name — signup only */}
        {mode === 'signup' && (
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-cream px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--green-dark)] transition-colors placeholder:text-[var(--text-muted)]"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--green-dark)] transition-colors placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-cream px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--green-dark)] transition-colors placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-pill bg-[var(--green-dark)] py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
        >
          {loading
            ? 'Loading...'
            : mode === 'signup' ? 'Create account →' : 'Sign in →'
          }
        </button>

        {/* Séparateur */}
        <div className="flex items-center gap-3 mb-5"> </div>

        {/* Bouton Google */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:shadow-sm transition-all mb-5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Séparateur */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--text-muted)]">or</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Switch mode */}
        <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
          {mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => { setMode('login'); setError(null) }}
                className="font-bold text-[var(--text-primary)] hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => { setMode('signup'); setError(null) }}
                className="font-bold text-[var(--text-primary)] hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-8 max-w-xs text-center text-xs text-[var(--text-muted)]">
        By signing up you agree to our Terms. HealthSkin is for wellness purposes only — not medical advice.
      </p>
    </div>
  )
}