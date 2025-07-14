const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const url = "https://www.youtube.com/@LeonGrayJ/live";
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });
        const html = await res.text();

        const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
        const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)"/);
        const playerResponseMatch = html.match(/var ytInitialPlayerResponse = (.*?});/);

        const canonical = canonicalMatch?.[1];
        const ogUrl = ogUrlMatch?.[1];

        const candidate = canonical || ogUrl || "";
        const videoUrl = candidate.includes("/watch") ? candidate : null;

        // Fallback check using ytInitialPlayerResponse JSON if available
        let isLive = false;
        if (playerResponseMatch) {
            const playerData = JSON.parse(playerResponseMatch[1]);
            isLive = playerData?.videoDetails?.isLive === true;
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isLive,
                liveUrl: isLive ? videoUrl : null
            })
        };
    } catch (e) {
        console.error("Error fetching live status:", e);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        };
    }
};
