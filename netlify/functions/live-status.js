// netlify/functions/live-status.js
const fetch = require('node-fetch');
const xml2js = require('xml2js');

// !!! IMPORTANT: Replace 'UCp1YTK3TMMKGE6F6U_IYlsQ' with your actual YouTube Channel ID !!!
const CHANNEL_ID = 'UCp1YTK3TMMKGE6F6U_IYlsQ'; 
// This is the correct YouTube RSS feed URL format for a channel
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

exports.handler = async () => {
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) {
      console.error(`Failed to fetch YouTube feed: ${res.status} ${res.statusText}`);
      return { statusCode: res.status, body: JSON.stringify({ isLive: false, latestVideo: null, error: `Failed to fetch YouTube feed: ${res.statusText}` }) };
    }
    const xml = await res.text();

    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });

    const entries = parsed.feed.entry;
    // Ensure entries is an array, or handle the single entry case
    const latest = Array.isArray(entries) ? entries[0] : entries;

    if (!latest) { // No videos found
        return { statusCode: 200, body: JSON.stringify({ isLive: false, latestVideo: null }) };
    }

    const isLive = latest['media:group']['yt:liveBroadcastContent'] === 'live';
    const latestVideoUrl = latest.link.$.href; // Access href attribute directly
    const latestVideoTitle = latest.title;
    const latestVideoThumbnail = latest['media:group']['media:thumbnail'] ? latest['media:group']['media:thumbnail'].$.url : null; // Access url attribute directly

    return {
      statusCode: 200,
      body: JSON.stringify({
        isLive,
        liveUrl: isLive ? latestVideoUrl : null,
        latestVideo: {
          url: latestVideoUrl,
          title: latestVideoTitle,
          thumbnail: latestVideoThumbnail
        }
      })
    };
  } catch (error) {
    console.error("Error fetching live status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ isLive: false, latestVideo: null, error: error.message }),
    };
  }
};
