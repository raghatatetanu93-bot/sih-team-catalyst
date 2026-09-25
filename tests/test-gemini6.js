require('dotenv').config();

async function testGeminiRest() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  
  try {
    console.log("Calling REST API directly...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello! Reply with 'OK'." }] }]
        })
      }
    );
    
    const data = await response.json();
    console.log("Success! Response: ", JSON.stringify(data));
  } catch (err) {
    console.error("Error occurred:", err.message);
  }
}

testGeminiRest().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
