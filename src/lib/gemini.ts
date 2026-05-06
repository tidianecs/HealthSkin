import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export const geminiVision = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export function imageToBase64Part(base64: string, mimeType = 'image/jpeg') {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType,
    },
  }
}

export function buildSkinPrompt(formData: Record<string, unknown>): string {
  return `You are a professional skincare expert and dermatologist assistant. Analyze this facial photo and provide a detailed personalized skincare analysis.

USER PROFILE FROM ONBOARDING:
${JSON.stringify(formData, null, 2)}

Based on the photo AND the user profile above, provide a JSON response with EXACTLY this structure (no markdown, no backticks, pure JSON):
{
  "skinType": "string (Dry / Oily / Combination / Normal / Sensitive)",
  "skinScore": number between 0 and 100,
  "detectedIssues": ["array of detected skin issues"],
  "morningRoutine": [
    { "step": number, "title": "string", "description": "string", "duration": "string" }
  ],
  "eveningRoutine": [
    { "step": number, "title": "string", "description": "string", "duration": "string" }
  ],
  "recipes": {
    "drink": { "name": "string", "ingredients": ["array"], "benefits": "string" },
    "eat":   { "name": "string", "ingredients": ["array"], "benefits": "string" },
    "put":   { "name": "string", "ingredients": ["array"], "benefits": "string" }
  },
  "tips": ["array of 3 personalized tips"]
}

IMPORTANT: Return ONLY valid JSON. No explanation, no markdown.`
}