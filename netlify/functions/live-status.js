// netlify/functions/live-status.js
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const channelUrl = "https://www.youtube.com/@LeonGrayJ";

    try {
        const response = await fetch(`${channelUrl}/live`, {
            method: "HEAD",
            redirect: "manual"
        });

        const location = response.headers.get("location");
        const isLive = response.status === 302 && location && location.includes("watch");
        const liveUrl = isLive ? location : null;

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
