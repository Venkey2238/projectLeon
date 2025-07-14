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
        console.log("Extracted JSON snippet preview:", jsonStr.slice(0, 300));

        const data = JSON.parse(jsonStr);

        // 🔥 NEW LOGIC: fallback to nested object
        const videoDetails = data?.videoDetails || data?.[""] || {};
        const isLive = videoDetails.isLive === true;
        const videoId = videoDetails.videoId;
        const liveUrl = isLive && videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

        console.log("Final result →", { isLive, liveUrl });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isLive, liveUrl })
        };
    } catch (e) {
        console.error("Live status error:", e);
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
