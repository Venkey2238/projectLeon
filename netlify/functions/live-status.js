const { getChannelInfo } = require('yt-channel-info');

exports.handler = async () => {
  const channelId = 'UCNxPNmokJwOsJANF4BlGbKA';
  console.log('🔍 Checking live status via yt-channel-info');

  try {
    const data = await getChannelInfo(channelId, 1);
    // library returns whether streaming live:
    const isLive = data.isLive;
    const liveId = data.videoId; // ID of live video, if any
    const liveUrl = isLive ? `https://www.youtube.com/watch?v=${liveId}` : null;

    console.log({ isLive, liveUrl });
    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl }),
    };

  } catch (err) {
    console.error('❌ Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
