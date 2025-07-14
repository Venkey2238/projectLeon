// netlify/functions/live-status.js
const fetch = require('node-fetch'); // Make sure to npm install node-fetch in your Netlify function directory or project

exports.handler = async (event, context) => {
    // !! IMPORTANT !!
    // Replace "YOUR_CHANNEL_ID" with LeongrayJ's actual YouTube Channel ID.
    // Example: "UCCt4L-q7-r5bF9_zF_r-6g"
    const channelId = "YOUR_CHANNEL_ID"; // <--- REPLACE THIS WITH THE REAL CHANNEL ID

    try {
        const response = await fetch(`http://googleusercontent.com/youtube.com/channel/${channelId}`);
        if (!response.ok) {
            // If the fetch itself fails (e.g., 404, 500 from YouTube)
            throw new Error(`Failed to fetch channel page: ${response.statusText}`);
        }
        const html = await response.text();

        // Check for the "hqdefault_live.jpg" marker in the HTML
        const isLive = html.includes("hqdefault_live.jpg");

        // Construct a direct link to the live stream if available.
        // This URL pattern is generally used for live streams from a channel page.
        const liveUrl = isLive ? `http://googleusercontent.com/youtube.com/channel/${channelId}/live` : null;

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                // Allow requests from any origin for development.
                // In production, consider restricting this to your specific domain.
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
                isLive: isLive,
                liveUrl: liveUrl
            })
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
