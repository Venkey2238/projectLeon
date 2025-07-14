const fetch = require('node-fetch');

exports.handler = async () => {
  const channelId = 'UCNxPNmokJwOsJANF4BlGbKA';
  const url = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;

  console.log('🔍 Checking embed/live_stream endpoint for live status');

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const html = await res.text();

    console.log('✅ Fetched embed HTML length:', html.length);

    // Look for playerMicroformatRenderer.urlCanonical (only present when live)
    const isLive = html.includes('playerMicroformatRenderer');
    let liveUrl = null;

    if (isLive) {
      const match = html.match(/"urlCanonical":"(https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11}))"/);
      if (match) {
        liveUrl = match[1].replace(/\\u0026/g, '&');
      }
    }

    console.log('🔴 isLive:', isLive, '→', liveUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };
  } catch(err) {
    console.error('❌ Error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
