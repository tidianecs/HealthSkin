interface Props {
  step: number
  total: number
  title: string
  onBack?: () => void
  onContinue: () => void
  continueDisabled?: boolean
  children: React.ReactNode
}

export default function OnboardingLayout({
  step, total, title, onBack, onContinue, continueDisabled = false, children
}: Props) {
  const progress = (step / total) * 100

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cream px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--green-dark)] text-sm">
              🌿
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
          </div>
          <span className="text-sm text-[var(--text-muted)]">{step} / {total}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-[var(--border)]">
          <div
            className="h-1.5 rounded-full bg-[#c0392b] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step - 1
                  ? 'w-6 bg-[var(--green-dark)]'
                  : i < step - 1
                  ? 'w-2 bg-[var(--green-dark)] opacity-40'
                  : 'w-2 bg-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-28 pb-28 max-w-lg mx-auto w-full">
        {children}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-[var(--border)] px-4 py-4 flex gap-3 max-w-lg mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--green-dark)] transition-all flex-shrink-0"
          >
            ‹
          </button>
        )}
        <button
          onClick={onContinue}
          disabled={continueDisabled}
          className="flex-1 flex items-center justify-center gap-2 rounded-pill bg-[var(--green-dark)] py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
        >
          Continue ›
        </button>
      </div>

    </div>
  )
}