const fetch = require("node-fetch");

// Recursively search for any object containing isLive: true and videoId
function findLiveData(obj) {
    if (typeof obj !== "object" || obj === null) return null;
    if (obj.isLive === true && obj.videoId) return obj;

    for (const key in obj) {
        const found = findLiveData(obj[key]);
        if (found) return found;
    }

    return null;
}

exports.handler = async (event, context) => {
    const url = "https://www.youtube.com/channel/UCNxPNmokJwOsJANF4BlGbKA/live";

    try {
        console.log("---- LIVE STATUS FUNCTION CALLED ----");

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const html = await res.text();
        console.log("HTML length:", html.length);
        console.log("Contains ytInitialPlayerResponse?", html.includes("ytInitialPlayerResponse"));

        const start = "var ytInitialPlayerResponse = ";
        const startIndex = html.indexOf(start);
        if (startIndex === -1) throw new Error("ytInitialPlayerResponse not found");

        const sub = html.substring(startIndex + start.length);
        const endIndex = sub.indexOf(";</script>");
        if (endIndex === -1) throw new Error("ytInitialPlayerResponse block not closed");

        const jsonStr = sub.substring(0, endIndex);
        console.log("Extracted JSON snippet preview:", jsonStr.slice(0, 300));

        let data;
        try {
            data = JSON.parse(jsonStr);
        } catch (e) {
            console.error("JSON parsing failed:", e.message);
            throw new Error("Invalid ytInitialPlayerResponse JSON");
        }

        // Log structure for debugging
        console.log("Top-level keys in parsed JSON:", Object.keys(data));
        console.log("Stringified sample:", JSON.stringify(data).slice(0, 1000));

        // Try to find live stream info
        const liveData = findLiveData(data);
        const isLive = liveData?.isLive === true;
        const liveUrl = isLive && liveData?.videoId
            ? `https://www.youtube.com/watch?v=${liveData.videoId}`
            : null;

        console.log("Final result →", { isLive, liveUrl });

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
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: e.message })
        };
    }
};
