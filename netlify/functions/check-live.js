// netlify/functions/check-live.js
export async function handler() {
  try {
    const res = await fetch("https://www.youtube.com/@LeonGrayJ/live", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Failed to fetch YouTube page" }),
      };
    }

    const text = await res.text();
    const isLive = text.includes('\"isLive\":true');

    // This code checks for the existence of the `"isLive":true` string in the page's HTML.
    // It's the most reliable string-based check without using the YouTube Data API.

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isLive,
        liveUrl: "https://www.youtube.com/@LeonGrayJ/live"
      }),
    };
  } catch (error) {
    console.error("Error checking live status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
