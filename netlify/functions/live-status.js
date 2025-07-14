const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const channelLivePage = "https://www.youtube.com/@LeonGrayJ/live";

    try {
        const res = await fetch(channelLivePage);
        const html = await res.text();

        const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
        const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;

        const isLive = canonicalUrl && canonicalUrl.includes("/watch");
        const liveUrl = isLive ? canonicalUrl : null;

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ isLive, liveUrl })
        };
    } catch (error) {
        console.error("Error in Netlify Function (live-status.js):", error.message);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                error: "Failed to fetch livestream status from backend.",
                details: error.message
            })
        };
    }
};
