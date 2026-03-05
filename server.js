// server.js
// Express HTTP server. Receives brief data, renders creatives, uploads to Drive.

require('dotenv').config();
const express = require('express');
const { renderAll } = require('./renderer');
const { uploadFiles } = require('./driveUploader');

const app = express();
app.use(express.json());

// Simple API key check — prevents unauthorized requests
function checkApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (key !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/generate', checkApiKey, async (req, res) => {
  const { clientName, headline, subheadline, cta, bgImageUrl, outputFolderId } = req.body;

  // Validate required fields
  const missing = ['clientName', 'headline', 'subheadline', 'cta', 'bgImageUrl', 'outputFolderId']
    .filter(k => !req.body[k]);
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing fields: ' + missing.join(', ') });
  }

  try {
    console.log(`[${new Date().toISOString()}] Generating for: ${clientName}`);

    // Render all 5 PNGs
    const files = await renderAll({ headline, subheadline, cta, bgImageUrl });

    // Upload to Drive
    const folderUrl = await uploadFiles(outputFolderId, clientName, files);

    console.log(`[${new Date().toISOString()}] Done: ${folderUrl}`);
    res.json({ success: true, folderUrl });

  } catch (err) {
    console.error('Generation error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ad Creative Server running on port ${PORT}`));
