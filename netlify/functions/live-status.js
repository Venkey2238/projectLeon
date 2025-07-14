// netlify/functions/live-status.js
const isLive = require("isyoutubelive");

exports.handler = async () => {
  try {
    const data = await isLive("UCNxPNmokJwOsJANF4BlGbKA");
    const isStreaming = data.stream !== null;
    const liveUrl = isStreaming 
      ? `https://www.youtube.com/watch?v=${data.stream.id}` 
      : null;

    console.log("✅ isStreaming:", isStreaming, liveUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive: isStreaming, liveUrl })
    };
  } catch (err) {
    console.error("❌ Error using isyoutubelive:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
