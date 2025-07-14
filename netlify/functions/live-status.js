// netlify/functions/live-status.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const channelUrl = "https://www.youtube.com/@LeonGrayJ"; // or use the channel ID URL for reliability

    try {
        const response = await fetch("https://www.youtube.com/@LeonGrayJ");
        if (!response.ok) {
            throw new Error(`Failed to fetch channel page: ${response.statusText}`);
        }

        const html = await response.text();

        const isLive = html.includes("hqdefault_live.jpg");
        const liveUrl = isLive ? `${channelUrl}/live` : null;

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
