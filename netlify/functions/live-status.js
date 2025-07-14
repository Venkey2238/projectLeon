const fetch = require('node-fetch');

exports.handler = async function() {
  const URL = 'https://www.youtube.com/@LeonGrayJ/live';
  console.log('---- 🔍 Checking live badge in HTML ----');

  try {
    const res = await fetch(URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow'
    });
    const html = await res.text();
    console.log('✅ HTML length:', html.length);

    // 1. Look for the Live badge
    const hasBadge = /<span[^>]*class="yt-badge yt-badge-live"[^>]*>Live now<\/span>/i.test(html);

    // 2. Look for viewer count
    const viewerMatch = html.match(/{"text":"\d{1,3}(?:,\d{3})* watching"}/);
    const hasViewers = !!viewerMatch;

    const isLive = hasBadge || hasViewers;
    let liveUrl = null;

    if (isLive) {
      // Pull the videoId from the canonical or player JSON
      const vidMatch = html.match(/canonical" href="\/watch\?v=([\w-]{11})/);
      if (vidMatch) {
        liveUrl = `https://www.youtube.com/watch?v=${vidMatch[1]}`;
      } else {
        // fallback: parse the JSON snippet
        const jsonMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});<\/script>/s);
        if (jsonMatch) {
          try {
            const data = JSON.parse(jsonMatch[1]);
            const vid = data.videoDetails?.videoId;
            if (vid) liveUrl = `https://www.youtube.com/watch?v=${vid}`;
          } catch {}
        }
      }
    }

    console.log('✅ isLive:', isLive, 'liveUrl:', liveUrl);
    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };
  } catch (e) {
    console.error('❌ Error:', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
