import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import StepLanguage   from '../components/onboarding/StepLanguage'
import StepWelcome    from '../components/onboarding/StepWelcome'
import StepProfile    from '../components/onboarding/StepProfile'
import StepSkin       from '../components/onboarding/StepSkin'
import StepGoals      from '../components/onboarding/StepGoals'
import StepRoutine    from '../components/onboarding/StepRoutine'
import StepDiet       from '../components/onboarding/StepDiet'
import StepSafety     from '../components/onboarding/StepSafety'
import StepCommitment from '../components/onboarding/StepCommitment'
import type { ProfileData }    from '../components/onboarding/StepProfile'
import type { SkinData }       from '../components/onboarding/StepSkin'
import type { GoalsData }      from '../components/onboarding/StepGoals'
import type { RoutineData }    from '../components/onboarding/StepRoutine'
import type { DietData }       from '../components/onboarding/StepDiet'
import type { SafetyData }     from '../components/onboarding/StepSafety'
import type { CommitmentData } from '../components/onboarding/StepCommitment'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const handleFinish = async (commitment: CommitmentData) => {
    // Sauvegarde dans Supabase user metadata (on étendra avec une vraie table après)
    await supabase.auth.updateUser({
      data: { onboarding_complete: true }
    })
    navigate('/scan')
  }

  switch (step) {
    case 1: return <StepLanguage   onContinue={next} />
    case 2: return <StepWelcome    onBack={back} onContinue={next} />
    case 3: return <StepProfile    onBack={back} onContinue={next} />
    case 4: return <StepSkin       onBack={back} onContinue={next} />
    case 5: return <StepGoals      onBack={back} onContinue={next} />
    case 6: return <StepRoutine    onBack={back} onContinue={next} />
    case 7: return <StepDiet       onBack={back} onContinue={next} />
    case 8: return <StepSafety     onBack={back} onContinue={next} />
    case 9: return <StepCommitment onBack={back} onContinue={handleFinish} />
    default: return null
  }
}