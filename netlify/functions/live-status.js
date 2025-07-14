const fetch = require('node-fetch');

exports.handler = async () => {
  const channelId = 'UCNxPNmokJwOsJANF4BlGbKA';
  const url = `https://www.youtube.com/channel/${channelId}/live`;

  console.log('🔍 Checking via canonical redirect hack');

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'manual' // prevent auto-following redirects
    });

    const html = await res.text();

    // Extract canonical href
    const match = html.match(/<link rel="canonical" href="([^"]+)"/);
    const href = match?.[1] || '';

    const isLive = href.includes('/watch?v=');
    const liveUrl = isLive ? href : null;

    console.log('✅ canonical href:', href);
    console.log('🔴 isLive:', isLive, 'liveUrl:', liveUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };
  } catch (err) {
    console.error('❌ Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
