import WebSocket from 'ws';

// WebSocket server URL
const serverUrl = 'wss://localhost:8080/websocket';

// Create a WebSocket instance
const socket = new WebSocket(serverUrl);

// Event listener for successful connection
socket.addEventListener('open', () => {
  console.log('Connected to the WebSocket server');

  // Send a message to the server
  socket.send('Hello from client!');
});

// Event listener for incoming messages
socket.addEventListener('message', (event) => {
  console.log('Received message from server:', event.data);
});

// Event listener for errors
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// Event listener for connection closure
socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed:', event);
});
