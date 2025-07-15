const fetch = require('node-fetch');

exports.handler = async () => {
  const LIVE_URL = 'https://www.youtube.com/@LeonGrayJ/live';

  try {
    const res = await fetch(LIVE_URL, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'manual'
    });

    const isLive = [302, 303].includes(res.status);
    let liveUrl = null;

    if (isLive) {
      const location = res.headers.get('location');
      if (location && location.startsWith('/watch')) {
        liveUrl = `https://www.youtube.com${location}`;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };

  } catch (err) {
    // fallback to not live
    return {
      statusCode: 200,
      body: JSON.stringify({ isLive: false, liveUrl: null })
    };
  }
};
