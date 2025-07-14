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

        // Extract ytInitialPlayerResponse JSON
        const match = html.match(/var ytInitialPlayerResponse = ({.*?});<\/script>/);
        let isLive = false;
        let videoId = null;

        if (match) {
            try {
                const playerResponse = JSON.parse(match[1]);
                const details = playerResponse?.videoDetails;
                isLive = details?.isLive === true;
                videoId = details?.videoId;
            } catch (err) {
                console.error("Failed to parse ytInitialPlayerResponse:", err);
            }
        }

        const liveUrl = isLive && videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : null;

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
