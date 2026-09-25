require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testGemini() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("Calling generateContent with gemini-3.6-flash...");
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: "Hello! Reply with 'OK'.",
    });
    
    // Using the same extractRawText logic as aiService.js
    const parts = response.candidates?.[0]?.content?.parts || [];
    const text = parts.map((part) => part.text).join('\n');
    console.log("Success! Response: ", text);
  } catch (err) {
    console.error("Error occurred:", err.message);
  }
}

testGemini().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
