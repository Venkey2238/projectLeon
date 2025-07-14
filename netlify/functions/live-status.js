const fetch = require('node-fetch');

exports.handler = async () => {
  const url = 'https://www.youtube.com/@LeonGrayJ/live';
  console.log('---- Checking live status via badges/viewers/URL ----');

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow'
    });
    const html = await res.text();
    console.log('HTML length:', html.length);

    const hasBadge = /<span[^>]+yt-badge-live[^>]*>Live now<\/span>/.test(html);
    const hasViewers = /"\s*text"\s*:\s*"\d{1,3}(?:,\d{3})*\s+watching"/.test(html);

    const isLive = hasBadge || hasViewers;
    let liveUrl = null;

    if (isLive) {
      const canMatch = html.match(/<link rel="canonical"\s+href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/);
      if (canMatch) {
        liveUrl = `https://www.youtube.com/watch?v=${canMatch[1]}`;
      } else {
        const jsonMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});<\/script>/s);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[1]);
          const vid = data.videoDetails?.videoId;
          if (vid) liveUrl = `https://www.youtube.com/watch?v=${vid}`;
        }
      }
    }

    console.log('Result:', { isLive, liveUrl });
    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };

  } catch (e) {
    console.error('Error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
