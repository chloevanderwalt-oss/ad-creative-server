// driveUploader.js
// Uploads PNG buffers to Google Drive using a service account.

const { google } = require('googleapis');
const { Readable } = require('stream');

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
}

async function createSubfolder(drive, parentFolderId, name) {
  // Check if folder already exists (handles re-runs)
  const existing = await drive.files.list({
    q: `name='${name}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id)',
  });
  if (existing.data.files.length > 0) {
    return existing.data.files[0].id;
  }
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    },
    fields: 'id',
  });
  return res.data.id;
}

async function uploadFiles(outputFolderId, clientName, files) {
  // files = [{ name, buffer }]
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });

  // Create dated subfolder
  const date = new Date().toISOString().split('T')[0];
  const folderName = `${clientName} - ${date}`;
  const folderId = await createSubfolder(drive, outputFolderId, folderName);

  // Upload each file
  for (const file of files) {
    const stream = Readable.from(file.buffer);
    await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [folderId],
      },
      media: {
        mimeType: 'image/png',
        body: stream,
      },
    });
  }

  return `https://drive.google.com/drive/folders/${folderId}`;
}

module.exports = { uploadFiles };
