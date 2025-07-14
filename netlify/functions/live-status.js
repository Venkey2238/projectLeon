const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const url = "https://www.youtube.com/channel/UCNxPNmokJwOsJANF4BlGbKA/live";

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const html = await res.text();

        // More forgiving regex (not greedy, handles line breaks)
        const match = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s);
        if (!match) {
            throw new Error("ytInitialPlayerResponse not found");
        }

        const playerResponse = JSON.parse(match[1]);
        const details = playerResponse.videoDetails;

        const isLive = details?.isLive === true;
        const videoId = details?.videoId;
        const liveUrl = isLive && videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

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
            body: JSON.stringify({ error: e.message })
        };
    }
};
