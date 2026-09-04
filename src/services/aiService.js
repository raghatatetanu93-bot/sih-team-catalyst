const { GoogleGenAI } = require('@google/genai');

const CATEGORIES = [
  'Water & Sanitation',
  'Roads & Transport',
  'Power & Energy',
  'Public Health',
  'Education',
  'Waste Management',
];

const extractRawText = (response) => {
  if (!response) return '';

  const fromGetter = typeof response.text === 'function' ? response.text() : response.text;
  if (fromGetter) return String(fromGetter);

  const parts = response.candidates?.[0]?.content?.parts || [];
  return parts
    .map((part) => part.text)
    .filter(Boolean)
    .join('\n');
};

const analyzeProblem = async (description) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const generatePromise = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `You are a strict JSON-only API. Do not use markdown formatting. Output only raw JSON.

You are an emergency triage AI. If a report mentions trapped people, sparking electricity, or severe flooding, you MUST output "severity": "Critical", "urgency": "Critical", "emergencyStatus": true, and a "priorityScore" above 90.

Complaint description:
"""${String(description || '').slice(0, 4000)}"""

Return a single JSON object with exactly these keys:
- category: one of ${CATEGORIES.map((item) => `"${item}"`).join(', ')}
- severity: one of "Low", "Medium", "High", "Critical"
- urgency: one of "Low", "Medium", "High", "Critical"
- affectedPopulation: integer estimate of people impacted
- emergencyStatus: boolean
- priorityScore: integer from 1 to 100
- summary: exactly one concise sentence
- suggestedSolutionArea: short intervention area, e.g. "Drainage infrastructure overhaul"`,
    config: { responseMimeType: 'application/json' },
  });

  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('AI Service Timeout')), 60000)
  );

  const response = await Promise.race([generatePromise, timeoutPromise]);

  const rawText = extractRawText(response);
  console.log('RAW AI TEXT:', rawText);

  const jsonMatch = String(rawText || '').match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from AI response: ' + rawText);
  }

  const aiData = JSON.parse(jsonMatch[0]);
  return aiData;
};

module.exports = { analyzeProblem };
