const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    // !!! IMPORTANT: Replace with your actual YouTube channel URL !!!
    const url = "https://www.youtube.com/@LeongrayJ"; // Example: Use your actual channel handle or ID
    try {
        const res = await fetch(url);
        const html = await res.text();

        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
        const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/);

        const candidate = (canonical?.[1] || ogUrl?.[1] || "");
        // More robust check: look for specific live indicators in the HTML
        const isLive = candidate.includes("/watch?v=") && html.includes('"isLive":true'); // Refined check
        const liveUrl = isLive ? candidate : null;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for local testing, can be more restrictive in production
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isLive, liveUrl })
        };
    } catch (e) {
        console.error("Error fetching live status:", e);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        };
    }
};
