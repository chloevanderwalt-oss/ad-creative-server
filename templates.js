// templates.js
// HTML template functions for each ad size.
// Each returns a full HTML string with the brief data and background image embedded.

function baseStyles(bgBase64, mimeType) {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Arial Black', Arial, sans-serif;
      background: #111;
      overflow: hidden;
    }
    .canvas {
      position: relative;
      overflow: hidden;
    }
    .bg {
      position: absolute;
      inset: 0;
      background-image: url('data:${mimeType};base64,${bgBase64}');
      background-size: cover;
      background-position: center;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0,0,0,0.15) 0%,
        rgba(0,0,0,0.55) 50%,
        rgba(0,0,0,0.80) 100%
      );
    }
    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  `;
}

function metaSquare(brief, bgBase64, mimeType) {
  // 1080x1080
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    ${baseStyles(bgBase64, mimeType)}
    .canvas { width: 1080px; height: 1080px; }
    .content { padding: 64px; gap: 18px; }
    .headline {
      color: #fff;
      font-size: 56px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1px;
      text-shadow: 0 2px 12px rgba(0,0,0,0.5);
    }
    .subheadline {
      color: rgba(255,255,255,0.88);
      font-size: 28px;
      font-weight: 400;
      line-height: 1.4;
      font-family: Arial, sans-serif;
    }
    .cta {
      display: inline-block;
      margin-top: 12px;
      background: #fff;
      color: #111;
      font-size: 24px;
      font-weight: 900;
      padding: 18px 40px;
      border-radius: 6px;
      letter-spacing: 0.5px;
      align-self: flex-start;
    }
  </style></head><body>
  <div class="canvas">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="headline">${escapeHtml(brief.headline)}</div>
      <div class="subheadline">${escapeHtml(brief.subheadline)}</div>
      <div class="cta">${escapeHtml(brief.cta)}</div>
    </div>
  </div>
  </body></html>`;
}

function metaStory(brief, bgBase64, mimeType) {
  // 1080x1920
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    ${baseStyles(bgBase64, mimeType)}
    .canvas { width: 1080px; height: 1920px; }
    .content { padding: 80px; gap: 24px; padding-bottom: 160px; }
    .headline {
      color: #fff;
      font-size: 72px;
      font-weight: 900;
      line-height: 1.1;
      text-shadow: 0 2px 16px rgba(0,0,0,0.5);
    }
    .subheadline {
      color: rgba(255,255,255,0.9);
      font-size: 36px;
      font-weight: 400;
      line-height: 1.45;
      font-family: Arial, sans-serif;
    }
    .cta {
      display: inline-block;
      margin-top: 16px;
      background: #fff;
      color: #111;
      font-size: 32px;
      font-weight: 900;
      padding: 24px 56px;
      border-radius: 8px;
      align-self: flex-start;
    }
  </style></head><body>
  <div class="canvas">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="headline">${escapeHtml(brief.headline)}</div>
      <div class="subheadline">${escapeHtml(brief.subheadline)}</div>
      <div class="cta">${escapeHtml(brief.cta)}</div>
    </div>
  </div>
  </body></html>`;
}

function gdnSquare(brief, bgBase64, mimeType) {
  // 300x250
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    ${baseStyles(bgBase64, mimeType)}
    .canvas { width: 300px; height: 250px; }
    .content { padding: 18px; gap: 6px; }
    .headline {
      color: #fff;
      font-size: 17px;
      font-weight: 900;
      line-height: 1.2;
      text-shadow: 0 1px 6px rgba(0,0,0,0.6);
    }
    .subheadline {
      color: rgba(255,255,255,0.88);
      font-size: 11px;
      font-weight: 400;
      line-height: 1.4;
      font-family: Arial, sans-serif;
    }
    .cta {
      display: inline-block;
      margin-top: 8px;
      background: #fff;
      color: #111;
      font-size: 11px;
      font-weight: 900;
      padding: 7px 16px;
      border-radius: 3px;
      align-self: flex-start;
    }
  </style></head><body>
  <div class="canvas">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="headline">${escapeHtml(brief.headline)}</div>
      <div class="subheadline">${escapeHtml(brief.subheadline)}</div>
      <div class="cta">${escapeHtml(brief.cta)}</div>
    </div>
  </div>
  </body></html>`;
}

function gdnLandscape(brief, bgBase64, mimeType) {
  // 728x90
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    ${baseStyles(bgBase64, mimeType)}
    .canvas { width: 728px; height: 90px; }
    .overlay {
      background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%);
    }
    .content {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
    }
    .text-group { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .headline {
      color: #fff;
      font-size: 20px;
      font-weight: 900;
      line-height: 1.1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subheadline {
      color: rgba(255,255,255,0.82);
      font-size: 12px;
      font-family: Arial, sans-serif;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cta {
      background: #fff;
      color: #111;
      font-size: 13px;
      font-weight: 900;
      padding: 10px 20px;
      border-radius: 4px;
      white-space: nowrap;
      margin-left: 20px;
    }
  </style></head><body>
  <div class="canvas">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="text-group">
        <div class="headline">${escapeHtml(brief.headline)}</div>
        <div class="subheadline">${escapeHtml(brief.subheadline)}</div>
      </div>
      <div class="cta">${escapeHtml(brief.cta)}</div>
    </div>
  </div>
  </body></html>`;
}

function gdnPortrait(brief, bgBase64, mimeType) {
  // 300x600
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    ${baseStyles(bgBase64, mimeType)}
    .canvas { width: 300px; height: 600px; }
    .content { padding: 28px; gap: 12px; }
    .headline {
      color: #fff;
      font-size: 28px;
      font-weight: 900;
      line-height: 1.2;
      text-shadow: 0 1px 8px rgba(0,0,0,0.5);
    }
    .subheadline {
      color: rgba(255,255,255,0.88);
      font-size: 15px;
      font-weight: 400;
      line-height: 1.45;
      font-family: Arial, sans-serif;
    }
    .cta {
      display: inline-block;
      margin-top: 10px;
      background: #fff;
      color: #111;
      font-size: 14px;
      font-weight: 900;
      padding: 12px 24px;
      border-radius: 4px;
      align-self: flex-start;
    }
  </style></head><body>
  <div class="canvas">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="headline">${escapeHtml(brief.headline)}</div>
      <div class="subheadline">${escapeHtml(brief.subheadline)}</div>
      <div class="cta">${escapeHtml(brief.cta)}</div>
    </div>
  </div>
  </body></html>`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { metaSquare, metaStory, gdnSquare, gdnLandscape, gdnPortrait };
