const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8081 });

// Store WebSocket connections for audio communication
const audioConnections = new Set();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected for audio communication');

  // Add the WebSocket connection to the set
  audioConnections.add(ws);

  // Handle WebSocket messages (audio data)
  ws.on('message', (message) => {
    // Broadcast the audio data to all connected clients (except the sender)
    audioConnections.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket close
  ws.on('close', () => {
    console.log('Client disconnected from audio communication');
    // Remove the WebSocket connection from the set
    audioConnections.delete(ws);
  });
});
