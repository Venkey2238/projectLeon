const fetch = require('node-fetch');
const YT_CHANNEL_URL = 'https://www.youtube.com/@LeonGrayJ';

exports.handler = async () => {
  try {
    const res = await fetch(YT_CHANNEL_URL, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const html = await res.text();

    // Look for the canonical link tag pointing to a live video
    const canonicalMatch = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)"/);

    if (canonicalMatch) {
      const liveVideoId = canonicalMatch[1];
      const liveUrl = `https://www.youtube.com/watch?v=${liveVideoId}`;
      return {
        statusCode: 200,
        body: JSON.stringify({ isLive: true, liveUrl })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ isLive: false, liveUrl: null })
      };
    }
  } catch (err) {
    console.error('Error checking YouTube live status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
