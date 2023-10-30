const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

// Load the credentials from the service account key file
const keyFile = require('./path/to/your-key-file.json');

// Create a JWT client
const jwtClient = new google.auth.JWT(
  keyFile.client_email,
  null,
  keyFile.private_key,
  ['https://www.googleapis.com/auth/drive']
);

// Authorize the client
jwtClient.authorize((err) => {
  if (err) {
    console.error('Authorization error:', err);
  }
});

// Initialize the Google Drive API
const drive = google.drive({ version: 'v3', auth: jwtClient });

// Define a route to handle file uploads
router.post('/upload-to-drive', (req, res) => {
  const fileMetadata = {
    name: req.body.filename, // Set the desired file name
  };

  const media = {
    mimeType: req.body.mimeType, // Set the appropriate MIME type
    body: req.file.buffer, // Use the file buffer from the request
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
    },
    (uploadErr, file) => {
      if (uploadErr) {
        console.error('File upload error:', uploadErr);
        res.status(500).json({ error: 'Error uploading file to Google Drive' });
      } else {
        console.log('File uploaded:', file.data);
        res.json({ success: true, fileId: file.data.id });
      }
    }
  );
});

module.exports = router;
