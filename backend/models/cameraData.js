const mongoose = require('mongoose');

// Define the schema for video data
const cameraDataSchema = new mongoose.Schema({
  uri: String,        // URI or URL of the video file
  timestamp: Date,    // Timestamp when the video was recorded
  metadata: {
    title: String,    // Video title
    description: String,  // Video description
    tags: [String]     // Array of tags or keywords
    // Add other custom metadata properties as needed
  }
});

// Create a model for video data using the schema
const CameraData = mongoose.model('CameraData', cameraDataSchema);

module.exports = CameraData;
