const fetch = require("node-fetch");

exports.handler = async () => {
  const channelId = "UCNxPNmokJwOsJANF4BlGbKA"; // LeonGrayJ
  const invidiousInstance = "https://yt.artemislena.eu"; // STABLE INSTANCE

  console.log("---- ✅ CHECKING LIVE STATUS VIA INVIDIOUS ----");

  try {
    const res = await fetch(`${invidiousInstance}/api/v1/channels/${channelId}`);
    const data = await res.json();

    const latestVideo = data?.latestVideos?.find(v => v.liveNow === true);
    const isLive = !!latestVideo;
    const liveUrl = isLive ? `https://youtube.com/watch?v=${latestVideo.videoId}` : null;

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
