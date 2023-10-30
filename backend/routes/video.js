// const express = require('express');
// const router = express.Router();


// router.get('/video-stream', (req, res) => {
//   // Replace this example logic with your actual video streaming code
//   // This code is a placeholder to show the concept

//   // Example: Streaming dummy video frames (for demonstration purposes)
//   // In a real application, you would capture frames from the camera module
//   const dummyVideoFrame = generateDummyVideoFrame(); // Replace with actual video capture logic

//   // Set the response headers to indicate it's a video stream
//   res.setHeader('Content-Type', 'video/mp4');
//   res.setHeader('Connection', 'keep-alive');
//   res.setHeader('Cache-Control', 'no-store');
//   res.setHeader('Pragma', 'no-cache');

//   // Send the dummy video frame as a response
//   res.write(dummyVideoFrame);

//   // Implement the actual video streaming logic here
//   // You would replace 'generateDummyVideoFrame' with logic to capture frames

//   // Close the response when the video streaming ends
//   // (Again, actual logic would be different)
//   res.end();
// });

// // Function to generate a dummy video frame (replace with real camera module logic)
// function generateDummyVideoFrame() {
//   // This is just a placeholder to simulate a video frame
//   // In practice, you would capture frames from the camera module
//   return Buffer.from('This is a video frame');
// }

// module.exports = router;


const express = require('express');
const router = express.Router();

// Define a route for video streaming
router.get('/video-stream', (req, res) => {
  // Execute the raspivid command to capture and stream video frames
  const raspividProcess = require('child_process').spawn('raspivid', [
    '-t', '0',          // Run indefinitely
    '-w', '640',        // Video width
    '-h', '480',        // Video height
    '-o', '-'           // Output to stdout
  ]);

  // Set the appropriate response headers
  res.setHeader('Content-Type', 'video/h264');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');

  // Pipe the video stream from raspivid to the response
  raspividProcess.stdout.pipe(res);

  // Handle errors
  raspividProcess.stderr.on('data', (data) => {
    console.error(`Raspivid error: ${data}`);
  });

  // Handle process exit
  raspividProcess.on('exit', (code) => {
    console.log(`Raspivid process exited with code ${code}`);
  });

  // Handle client disconnection
  res.on('close', () => {
    // Terminate the raspivid process when the client disconnects
    raspividProcess.kill();
  });
});

module.exports = router;
