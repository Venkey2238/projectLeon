const fetch = require('node-fetch');

exports.handler = async () => {
  const channelId = 'UCNxPNmokJwOsJANF4BlGbKA';
  const liveUrl = `https://www.youtube.com/channel/${channelId}/live`;

  console.log('🔍 Checking live status via canonical tag');

  try {
    // Make request **without auto-redirect**
    const res = await fetch(liveUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'manual'
    });
    const html = await res.text();

    // Find the link rel="canonical"
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    const href = m?.[1] ?? '';

    const isLive = href.includes('/watch?v=');
    const liveVideoUrl = isLive ? href : null;

    console.log('✅ canonical href:', href);
    console.log('🔴 isLive:', isLive, '→', liveVideoUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl: liveVideoUrl })
    };
  } catch (err) {
    console.error('❌ Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
