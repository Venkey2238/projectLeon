
// netlify/functions/ai-message.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { prompt } = JSON.parse(event.body);

  // !!! IMPORTANT: Set GEMINI_API_KEY as an environment variable in Netlify !!!
  const apiKey = process.env.GEMINI_API_KEY; 

  if (!apiKey) {
    return { statusCode: 500, body: 'GEMINI_API_KEY not configured.' };
  }

  try {
    const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    const aiData = await aiRes.json();

    if (aiData.candidates && aiData.candidates[0] && aiData.candidates[0].content && aiData.candidates[0].content.parts[0]) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: aiData.candidates[0].content.parts[0].text }),
      };
    } else {
      console.error("AI response format error:", aiData);
      return { statusCode: 500, body: 'Failed to get a valid response from AI.' };
    }

  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
