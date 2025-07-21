// // netlify/functions/ai-message.js
// const fetch = require('node-fetch'); // Required for making HTTP requests

// exports.handler = async (event) => {
//   // Only allow POST requests
//   if (event.httpMethod !== 'POST') {
//     return { statusCode: 405, body: 'Method Not Allowed' };
//   }

//   // Parse the request body to get the prompt from the frontend
//   const { prompt } = JSON.parse(event.body);

//   // !!! IMPORTANT: The GEMINI_API_KEY MUST be set as an environment variable in Netlify !!!
//   // Go to your Netlify site settings -> Build & deploy -> Environment variables
//   const apiKey = process.env.GEMINI_API_KEY; 

//   // Check if the API key is configured
//   if (!apiKey) {
//     console.error('GEMINI_API_KEY not configured in Netlify environment variables.');
//     return { statusCode: 500, body: 'GEMINI_API_KEY not configured.' };
//   }

//   try {
//     // Make a request to the Gemini API
//     const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: prompt // The prompt received from the frontend
//           }]
//         }]
//       }),
//     });

//     // Check if the AI API response was successful
//     if (!aiRes.ok) {
//       const errorText = await aiRes.text(); // Get raw error text for debugging
//       console.error(`AI API request failed with status ${aiRes.status}: ${errorText}`);
//       return { statusCode: aiRes.status, body: `AI API error: ${errorText}` };
//     }

//     const aiData = await aiRes.json(); // Parse the JSON response from the AI

//     // Check if the AI response contains valid content
//     if (aiData.candidates && aiData.candidates[0] && aiData.candidates[0].content && aiData.candidates[0].content.parts && aiData.candidates[0].content.parts[0]) {
//       // Return the AI's generated text as a success response
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ message: aiData.candidates[0].content.parts[0].text }),
//       };
//     } else {
//       // Handle cases where the AI response structure is unexpected or content is missing
//       console.error("AI response format error or no content:", aiData);
//       return { statusCode: 500, body: 'Unexpected AI response format or no content.' };
//     }
//   } catch (error) {
//     // Catch any network or other unexpected errors during the fetch
//     console.error("Error calling Gemini API:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Failed to communicate with AI service.', details: error.message }),
//     };
//   }
// };
