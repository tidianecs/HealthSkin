import { useNavigate } from 'react-router-dom'

interface Routine {
  step: number
  title: string
  description: string
  duration: string
}

interface Recipe {
  name: string
  ingredients: string[]
  benefits: string
}

export interface SkinAnalysis {
  skinType: string
  skinScore: number
  detectedIssues: string[]
  morningRoutine: Routine[]
  eveningRoutine: Routine[]
  recipes: {
    drink: Recipe
    eat:   Recipe
    put:   Recipe
  }
  tips: string[]
}

interface Props {
  analysis: SkinAnalysis
  photo: string
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 70 ? '#2d4a2d' : score >= 40 ? '#f59e0b' : '#c0392b'
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold border-4"
        style={{ borderColor: color, color }}
      >
        {score}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-2">Skin Score</p>
    </div>
  )
}

function RoutineStep({ step, title, description, duration }: Routine) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
      <div className="w-7 h-7 rounded-full bg-[#d4e8c2] flex items-center justify-center text-xs font-bold flex-shrink-0 text-[var(--green-dark)]">
        {step}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-bold text-[var(--text-primary)]">{title}</span>
          <span className="text-xs text-[var(--text-muted)]">{duration}</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function RecipeCard({ emoji, recipe }: { emoji: string; recipe: Recipe }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
      <div className="text-2xl mb-2">{emoji}</div>
      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{recipe.name}</h4>
      <p className="text-xs text-[var(--text-muted)] mb-2">{recipe.benefits}</p>
      <div className="flex flex-wrap gap-1">
        {recipe.ingredients.map(ing => (
          <span key={ing} className="text-xs bg-[#d4e8c2] text-[var(--green-dark)] rounded-pill px-2 py-0.5">
            {ing}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ScanResult({ analysis, photo }: Props) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-20">

      {/* Header */}
      <div className="bg-[var(--green-dark)] px-6 pt-12 pb-8 text-center">
        <h1 className="text-2xl font-extrabold text-white mb-1">Your Skin Analysis</h1>
        <p className="text-sm text-green-200">Personalized just for you</p>
      </div>

      <div className="px-4 -mt-4 flex flex-col gap-5 max-w-lg mx-auto">

        {/* Score + photo + skin type */}
        <div className="rounded-2xl bg-[var(--bg-secondary)] p-5 flex items-center gap-5 shadow-sm">
          <img src={photo} alt="Your skin" className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-[var(--border)]" />
          <div className="flex-1">
            <p className="text-xs text-[var(--text-muted)] mb-1">Detected skin type</p>
            <p className="text-lg font-extrabold text-[var(--text-primary)] mb-2">{analysis.skinType}</p>
            <div className="flex flex-wrap gap-1">
              {analysis.detectedIssues.map(issue => (
                <span key={issue} className="text-xs bg-[#f0d0cc] text-[#7a2a1a] rounded-pill px-2 py-0.5">
                  {issue}
                </span>
              ))}
            </div>
          </div>
          <ScoreCircle score={analysis.skinScore} />
        </div>

        {/* Morning Routine */}
        <div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-3">
            ☀️ Morning Routine
          </h3>
          <div className="flex flex-col gap-2">
            {analysis.morningRoutine.map(step => (
              <RoutineStep key={step.step} {...step} />
            ))}
          </div>
        </div>

        {/* Evening Routine */}
        <div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-3">
            🌙 Evening Routine
          </h3>
          <div className="flex flex-col gap-2">
            {analysis.eveningRoutine.map(step => (
              <RoutineStep key={step.step} {...step} />
            ))}
          </div>
        </div>

        {/* Recipes */}
        <div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-3">
            🌿 Your Recipes
          </h3>
          <div className="flex flex-col gap-3">
            <RecipeCard emoji="🥤" recipe={analysis.recipes.drink} />
            <RecipeCard emoji="🥗" recipe={analysis.recipes.eat}   />
            <RecipeCard emoji="🧴" recipe={analysis.recipes.put}   />
          </div>
        </div>

        {/* Tips */}
        <div>
          <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-3">
            💡 Personalized Tips
          </h3>
          <div className="flex flex-col gap-2">
            {analysis.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] px-4 py-3">
                <span className="text-[var(--green-dark)] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full rounded-pill bg-[var(--green-dark)] py-4 text-sm font-semibold text-white hover:opacity-90 transition-all"
        >
          Go to Dashboard →
        </button>

      </div>
    </div>
  )
}