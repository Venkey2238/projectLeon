const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const url = "https://www.youtube.com/channel/UCNxPNmokJwOsJANF4BlGbKA/live";

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            },
            redirect: 'manual' // Don't auto-follow redirects
        });

        // Check if YouTube redirects to a real /watch?v=... stream
        const location = res.headers.get('location');
        const isRedirect = res.status === 302 && location?.includes("/watch?v=");

        const isLive = Boolean(isRedirect);
        const liveUrl = isLive ? `https://www.youtube.com${location}` : null;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
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
