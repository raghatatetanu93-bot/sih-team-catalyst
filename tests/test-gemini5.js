require('dotenv').config();
const axios = require('axios');

async function testGeminiRest() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  
  try {
    console.log("Calling REST API directly...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: "Hello! Reply with 'OK'." }] }]
      }
    );
    
    console.log("Success! Response: ", response.data);
  } catch (err) {
    console.error("Error occurred:", err.response ? err.response.data : err.message);
  }
}

testGeminiRest().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
