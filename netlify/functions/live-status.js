const fetch = require("node-fetch");

exports.handler = async () => {
  const channelId = "UCNxPNmokJwOsJANF4BlGbKA"; // LeonGrayJ channel ID
  const apiUrl = `https://yt.lemnoslife.com/channels?part=live&id=${channelId}`;

  console.log("---- CHECKING LIVE STATUS VIA LEMNOS ----");
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    const isLive = data?.items?.[0]?.live?.status === "live";
    const videoId = data?.items?.[0]?.live?.videoId;
    const liveUrl = isLive ? `https://www.youtube.com/watch?v=${videoId}` : null;

    console.log("✅ isLive:", isLive);
    console.log("📺 liveUrl:", liveUrl);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ isLive, liveUrl }),
    };
  } catch (error) {
    console.error("❌ Error checking live status:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
