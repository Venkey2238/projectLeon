const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  console.log('---- ✅ CHECKING LIVE STATUS FROM YOUTUBE ----');

  const url = 'https://www.youtube.com/@LeonGrayJ/live';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const html = await response.text();
    console.log('✅ HTML fetched, length:', html.length);

    // Match ytInitialPlayerResponse JSON
    const match = html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});<\/script>/s);

    if (!match) {
      console.error('❌ ytInitialPlayerResponse not found');
      return {
        statusCode: 200,
        body: JSON.stringify({ isLive: false, liveUrl: null })
      };
    }

    const ytInitialPlayerResponse = JSON.parse(match[1]);

    const isLive = ytInitialPlayerResponse?.videoDetails?.isLive === true;
    const videoId = ytInitialPlayerResponse?.videoDetails?.videoId;

    const liveUrl = isLive ? `https://www.youtube.com/watch?v=${videoId}` : null;

    console.log('✅ Final result →', { isLive, liveUrl });

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
