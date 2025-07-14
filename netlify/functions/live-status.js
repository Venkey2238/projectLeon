const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const url = "https://www.youtube.com/channel/UCNxPNmokJwOsJANF4BlGbKA/live";

    try {
        console.log("---- LIVE STATUS FUNCTION CALLED ----");

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const html = await res.text();
        console.log("HTML length:", html.length);
        console.log("Contains ytInitialPlayerResponse?", html.includes("ytInitialPlayerResponse"));

        const start = "var ytInitialPlayerResponse = ";
        const startIndex = html.indexOf(start);
        if (startIndex === -1) throw new Error("ytInitialPlayerResponse not found");

        const sub = html.substring(startIndex + start.length);
        const endIndex = sub.indexOf(";</script>");
        if (endIndex === -1) throw new Error("ytInitialPlayerResponse block not closed");

        const jsonStr = sub.substring(0, endIndex);
        const data = JSON.parse(jsonStr);

        const isLive = data?.videoDetails?.isLiveContent === true;
        const videoId = data?.videoDetails?.videoId || null;
        const liveUrl = isLive && videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

        console.log("✅ Detected →", { isLive, videoId });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isLive, liveUrl })
        };
    } catch (e) {
        console.error("❌ Error checking live status:", e);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: e.message })
        };
    }
};
