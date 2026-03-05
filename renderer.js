// renderer.js
// Launches Puppeteer and renders each HTML template to a PNG buffer.

const puppeteer = require('puppeteer');
const axios = require('axios');
const templates = require('./templates');

async function fetchImageAsBase64(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 15000,
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const mimeType = response.headers['content-type'] || 'image/jpeg';
  const base64 = Buffer.from(response.data).toString('base64');
  return { base64, mimeType };
}

const SIZES = [
  { name: 'meta-square-1080x1080',  fn: 'metaSquare',    w: 1080, h: 1080 },
  { name: 'meta-story-1080x1920',   fn: 'metaStory',     w: 1080, h: 1920 },
  { name: 'gdn-300x250',            fn: 'gdnSquare',     w: 300,  h: 250  },
  { name: 'gdn-728x90',             fn: 'gdnLandscape',  w: 728,  h: 90   },
  { name: 'gdn-300x600',            fn: 'gdnPortrait',   w: 300,  h: 600  },
];

async function renderAll(brief) {
  // brief = { headline, subheadline, cta, bgImageUrl }
  const { base64: bgBase64, mimeType } = await fetchImageAsBase64(brief.bgImageUrl);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  });

  const results = [];

  for (const size of SIZES) {
    const html = templates[size.fn](brief, bgBase64, mimeType);
    const page = await browser.newPage();
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    const buffer = await page.screenshot({ type: 'png' });
    await page.close();
    results.push({ name: size.name + '.png', buffer });
  }

  await browser.close();
  return results;
}

module.exports = { renderAll };
