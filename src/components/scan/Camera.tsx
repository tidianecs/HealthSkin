import { useRef, useState, useCallback } from 'react'

interface Props {
  onCapture: (photo: string) => void
}

export default function Camera({ onCapture }: Props) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const [started, setStarted]   = useState(false)
  const [preview, setPreview]   = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 640 }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setStarted(true)
        setError(null)
      }
    } catch {
      setError('Camera access denied. Please allow camera access.')
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach(t => t.stop())
    setStarted(false)
  }

  const capture = useCallback(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)

    const photo = canvas.toDataURL('image/jpeg', 0.8)
    setPreview(photo)
    stopCamera()
  }, [])

  const retake = () => {
    setPreview(null)
    startCamera()
  }

  return (
    <div className="flex flex-col items-center gap-5">

      {/* Camera / Preview */}
      <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-[var(--green-dark)] bg-[var(--bg-secondary)]">
        {preview ? (
          <img src={preview} alt="captured" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
        )}

        {!started && !preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-5xl">📷</span>
            <p className="text-xs text-[var(--text-muted)] text-center px-4">
              Center your face in the circle
            </p>
          </div>
        )}

        {/* Face guide overlay */}
        {started && !preview && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-52 rounded-full border-2 border-white border-dashed opacity-60" />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {error && (
        <p className="text-sm text-red-500 text-center max-w-xs">{error}</p>
      )}

      {/* Buttons */}
      {!started && !preview && (
        <button
          onClick={startCamera}
          className="w-full max-w-xs rounded-pill bg-[var(--green-dark)] py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all"
        >
          Start Camera
        </button>
      )}

      {started && !preview && (
        <button
          onClick={capture}
          className="w-20 h-20 rounded-full bg-[var(--green-dark)] flex items-center justify-center text-white text-3xl hover:opacity-90 transition-all shadow-lg"
        >
          📸
        </button>
      )}

      {preview && (
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={retake}
            className="flex-1 rounded-pill border-2 border-[var(--border)] py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--green-dark)] transition-all"
          >
            Retake
          </button>
          <button
            onClick={() => onCapture(preview)}
            className="flex-1 rounded-pill bg-[var(--green-dark)] py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Analyze →
          </button>
        </div>
      )}
    </div>
  )
}