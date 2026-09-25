require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testGemini() {
  console.log("Starting test...");
  console.log("Key starting with: " + (process.env.GEMINI_API_KEY || "").substring(0, 10));
  
  if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    console.log("Calling generateContent...");
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: "Hello! Reply with 'OK'.",
    });
    
    // Also test gemini-3.6-flash which the code originally asked for
    console.log("Testing gemini-3.6-flash...");
    const response2 = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: "Hello! Reply with 'OK'.",
    });
    
    console.log("Success with gemini-3.6-flash!");
  } catch (err) {
    console.error("Error occurred:", err.message);
  }
}

testGemini().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
