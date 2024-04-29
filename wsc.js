import WebSocket from 'uWebSockets.js';

const ws = new WebSocket('ws://localhost:9001');

ws.on('open', () => {
  console.log('Connected to WebSocket server');

  // Send a message to the server
  ws.send('Hello, WebSocket server!');
});

ws.on('message', (message) => {
  console.log('Received message from server:', message);
});

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});

// Handle errors
ws.on('error', (error) => {
  console.error('WebSocket encountered error:', error);
});
