import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { geminiVision, imageToBase64Part, buildSkinPrompt } from '../lib/gemini'
import Camera from '../components/scan/Camera'
import ScanLoader from '../components/scan/ScanLoader'
import ScanResult, { type SkinAnalysis } from '../components/scan/ScanResult'

type Stage = 'camera' | 'loading' | 'result'

export default function Scan() {
  const navigate = useNavigate()
  const [stage, setStage]       = useState<Stage>('camera')
  const [photo, setPhoto]       = useState<string>('')
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null)
  const [error, setError]       = useState<string | null>(null)

  const handleCapture = async (capturedPhoto: string) => {
    setPhoto(capturedPhoto)
    setStage('loading')
    setError(null)

    try {
      // 1. Récupère les données du formulaire depuis Supabase
      const { data: { user } } = await supabase.auth.getUser()
      const formData = user?.user_metadata ?? {}

      // 2. Prépare le prompt + image
      const prompt    = buildSkinPrompt(formData)
      const imagePart = imageToBase64Part(capturedPhoto)

      // 3. Appel Gemini Vision
      const result = await geminiVision.generateContent([prompt, imagePart])
      const text   = result.response.text()

      // 4. Parse le JSON
      const clean  = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean) as SkinAnalysis

      // 5. Sauvegarde dans Supabase
      await supabase.from('skin_analyses').insert({
        user_id:    user?.id,
        photo_url:  capturedPhoto,
        analysis:   parsed,
        created_at: new Date().toISOString(),
      })

      // 6. Marque le scan comme fait
      await supabase.auth.updateUser({
        data: { scan_complete: true }
      })
      await supabase.auth.refreshSession()

      setAnalysis(parsed)
      setStage('result')

    } catch (err) {
      console.error(err)
      setError('Analysis failed. Please try again.')
      setStage('camera')
    }
  }

  if (stage === 'loading') return <ScanLoader />

  if (stage === 'result' && analysis) {
    return <ScanResult analysis={analysis} photo={photo} />
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-12">

      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--green-dark)] text-2xl mb-4">
          🌿
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">
          Skin Analysis
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
          Take a clear photo of your face in good lighting for the most accurate analysis.
        </p>
      </div>

      {/* Tips */}
      <div className="w-full max-w-xs mb-8">
        {[
          '💡 Good natural lighting',
          '😐 Neutral expression',
          '🧼 Clean, product-free skin',
        ].map(tip => (
          <div key={tip} className="flex items-center gap-2 py-1.5">
            <span className="text-sm text-[var(--text-muted)]">{tip}</span>
          </div>
        ))}
      </div>

      {/* Camera */}
      <Camera onCapture={handleCapture} />

      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 text-sm text-[var(--text-muted)] underline hover:opacity-70"
      >
        Back to Dashboard
      </button>

    </div>
  )
}