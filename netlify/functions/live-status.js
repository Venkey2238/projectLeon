const chromium = require('chrome-aws-lambda');

exports.handler = async () => {
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/@LeonGrayJ/live', { waitUntil: 'networkidle2' });

    const result = await page.evaluate(() => {
      const badge = document.querySelector('span.yt-badge-live');
      const viewers = document.querySelector('li:has-text("watching")');
      const canonical = document.querySelector('link[rel=canonical]')?.href;
      return {
        isLive: !!badge || !!viewers,
        liveUrl: canonical?.includes('/watch?v=') ? canonical : null
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  } finally {
    if (browser) await browser.close();
  }
};
