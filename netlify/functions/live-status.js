const fetch = require('node-fetch');
const xml2js = require('xml2js');

const CHANNEL_ID = 'UCNxPNmokJwOsJANF4BlGbKA'; // your actual channel ID
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

exports.handler = async () => {
  try {
    const res = await fetch(FEED_URL);
    const xml = await res.text();

    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });

    const entries = parsed.feed.entry;
    if (!entries) {
      return { statusCode: 200, body: JSON.stringify({ isLive: false }) };
    }

    const latest = Array.isArray(entries) ? entries[0] : entries;
    const liveContent = latest['media:group']['yt:liveBroadcastContent'];

    const isLive = liveContent === 'live';
    const liveUrl = isLive ? latest.link.href : null;

    return {
      statusCode: 200,
      body: JSON.stringify({ isLive, liveUrl })
    };
  } catch (err) {
    console.error('Error checking YouTube live status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
