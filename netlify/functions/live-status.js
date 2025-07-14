const fetch = require('node-fetch');

exports.handler = async () => {
  const URL = 'https://www.youtube.com/@LeonGrayJ/live';
  console.log('---- 🔍 Checking live status via badge + URL parsing ----');

  try {
    const res = await fetch(URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow'
    });
    const html = await res.text();
    console.log('✅ HTML fetched, length:', html.length);

    // Look for the "Live now" badge
    const hasBadge = html.includes('yt-badge-live">Live now');

    // Detect viewer count text like "123 watching"
    const hasViewCount = /"text":"\d{1,3}(?:,\d{3})* watching"/.test(html);

    const isLive = hasBadge || hasViewCount;

    let liveUrl = null;
    if (isLive) {
      // Try capturing from canonical link
      const can = html.match(/<link rel="canonical" href="https?:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/);
      if (can) {
        liveUrl = `https://www.youtube.com/watch?v=${can[1]}`;
      } else {
        // fallback: catch videoId from player JSON
        const jsonMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});<\/script>/s);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[1]);
          const vid = data?.videoDetails?.videoId;
          if (vid) liveUrl = `https://www.youtube.com/watch?v=${vid}`;
        }
      }
    }

    console.log('✅ isLive:', isLive, 'liveUrl:', liveUrl);
    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };

  } catch (err) {
    console.error('❌ Error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
