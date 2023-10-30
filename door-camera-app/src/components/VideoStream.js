import React, { useEffect, useRef } from 'react';

function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Set the video source to your video stream endpoint
      videoElement.src = '/video-stream';

      // Add event listeners or further configuration as needed
    }
  }, []);

  return (
    <div>
      <h2>Live Video Stream</h2>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
}

export default VideoStream;
