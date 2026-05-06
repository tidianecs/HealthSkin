export default function ScanLoader() {
  const steps = [
    'Analyzing your skin tone...',
    'Detecting skin concerns...',
    'Generating your routine...',
    'Personalizing recipes...',
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--green-dark)] text-4xl mb-8 animate-pulse">
        🌿
      </div>
      <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3">
        Analyzing your skin
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-10 max-w-xs leading-relaxed">
        Our AI is reviewing your photo and profile to create your personalized routine.
      </p>

      <div className="w-full max-w-xs flex flex-col gap-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl bg-[var(--bg-secondary)] px-4 py-3"
            style={{ animation: `fadeIn 0.5s ease forwards ${i * 0.4}s`, opacity: 0 }}
          >
            <div className="w-6 h-6 rounded-full bg-[#d4e8c2] flex items-center justify-center text-xs">
              ✓
            </div>
            <span className="text-sm text-[var(--text-primary)]">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}