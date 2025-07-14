const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const CHANNEL_URL = 'https://www.youtube.com/@LeonGrayJ/live';

  console.log('---- ✅ CHECKING LIVE STATUS ----');

  try {
    const response = await fetch(CHANNEL_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();

    console.log('✅ HTML fetched. Length:', html.length);

    // Extract the ytInitialPlayerResponse JSON safely
    const jsonMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.*?});<\/script>/s);
    if (!jsonMatch) {
      console.error('❌ Could not find ytInitialPlayerResponse in the HTML');
      return {
        statusCode: 200,
        body: JSON.stringify({ isLive: false, liveUrl: null })
      };
    }

    const jsonRaw = jsonMatch[1];
    const playerResponse = JSON.parse(jsonRaw);

    const isLive = playerResponse.videoDetails?.isLive === true;
    const videoId = playerResponse.videoDetails?.videoId || null;
    const liveUrl = isLive && videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

    console.log(`✅ Final result → { isLive: ${isLive}, liveUrl: ${liveUrl} }`);

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };
  } catch (err) {
    console.error('❌ Error checking live status:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
