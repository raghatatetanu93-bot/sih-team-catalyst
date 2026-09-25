require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testGemini() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("Calling generateContent with gemini-2.5-flash...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Hello! Reply with 'OK'.",
    });
    
    console.log("Success! Response: ", response);
  } catch (err) {
    console.error("Error occurred:", err.message);
  }
}

testGemini().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
