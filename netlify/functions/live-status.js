const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const url = "https://www.youtube.com/@LeonGrayJ/live";
    try {
        const res = await fetch(url);
        const html = await res.text();

        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
        const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/);

        const candidate = (canonical?.[1] || ogUrl?.[1] || "");
        const isLive = candidate.includes("/watch");
        const liveUrl = isLive ? candidate : null;

        return {
            statusCode: 200,
            headers: {/* ...CORS headers... */},
            body: JSON.stringify({ isLive, liveUrl })
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        };
    }
};
