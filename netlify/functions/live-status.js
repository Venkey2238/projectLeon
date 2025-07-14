// netlify/functions/live-status.js
const fetch = require('node-fetch');

exports.handler = async () => {
  const LIVE_URL = 'https://www.youtube.com/@LeonGrayJ/live';
  console.log('→ Checking live status via HTTP redirect');

  try {
    // Make request without following redirects
    const res = await fetch(LIVE_URL, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'manual'
    });

    // If YouTube issues a 302 or 303 redirect, it's live
    const isLive = res.status === 302 || res.status === 303;
    let liveUrl = null;

    if (isLive) {
      // Grab the Location header (should be "/watch?v=VIDEOID")
      const location = res.headers.get('location');
      if (location && location.startsWith('/watch')) {
        liveUrl = `https://www.youtube.com${location}`;
      }
    }

    console.log({ status: res.status, isLive, liveUrl });
    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };

  } catch (err) {
    console.error('Error fetching live URL:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
