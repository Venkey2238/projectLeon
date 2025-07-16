const fetch = require('node-fetch');
const xml2js = require('xml2js');

// Your actual channel ID
const CHANNEL_ID = 'UCp1YTK3TMMKGE6F6U_IYlsQ';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

exports.handler = async () => {
  try {
    const res = await fetch(FEED_URL);
    const xml = await res.text();

    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });

    const entries = parsed.feed.entry;
    if (!entries || entries.length === 0) { // Check if entries array is empty
      return { statusCode: 200, body: JSON.stringify({ isLive: false, latestVideo: null }) };
    }

    const latest = Array.isArray(entries) ? entries[0] : entries;
    const isLive = latest['media:group']['yt:liveBroadcastContent'] === 'live';
    const latestVideoUrl = latest.link.href;
    const latestVideoTitle = latest.title;
    const latestVideoThumbnail = latest['media:group']['media:thumbnail'] ? latest['media:group']['media:thumbnail'].$.url : null; // Get thumbnail

    return {
      statusCode: 200,
      body: JSON.stringify({
        isLive,
        liveUrl: isLive ? latestVideoUrl : null,
        latestVideo: {
          url: latestVideoUrl,
          title: latestVideoTitle,
          thumbnail: latestVideoThumbnail // Include thumbnail
        }
      })
    };
  } catch (err) {
    console.error('Error checking YouTube live status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
