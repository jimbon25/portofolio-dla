// Netlify Function Example for Gemini API
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { question } = JSON.parse(event.body || '{}');
  if (!question) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No question provided' })
    };
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not set' })
    };
  }

  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: question }] }]
      })
    });
    const data = await geminiRes.json();
    // Try to extract the answer from Gemini API response
    let answer = "";
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
      answer = data.candidates[0].content.parts[0].text;
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ answer })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "[No answer: Gemini API error]" })
    };
  }
};
