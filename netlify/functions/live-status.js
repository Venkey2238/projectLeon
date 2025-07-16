const fetch = require('node-fetch');
const xml2js = require('xml2js');

// Corrected YouTube Channel ID
const CHANNEL_ID = 'UCp1YTK3TMMKGE6F6U_IYlsQ';
// Correct YouTube Atom Feed URL
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

exports.handler = async () => {
  try {
    const res = await fetch(FEED_URL);
    const xml = await res.text();

    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });

    const entries = parsed.feed.entry;
    if (!entries) {
      return { statusCode: 200, body: JSON.stringify({ isLive: false }) };
    }

   const title = latest.title || 'Latest Stream';
const videoId = latest['yt:videoId'] || null;
const liveUrl = latest.link.href || null;
const published = latest.published || null;

return {
  statusCode: 200,
  body: JSON.stringify({ isLive, liveUrl, videoId, title, published })
};

  } catch (err) {
    console.error('Error checking YouTube live status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
