import WebSocket from 'ws';
import fs from 'fs';

const caCert = fs.readFileSync('certs/cert.pem'); // Load CA certificate

const socket = new WebSocket('wss://localhost:8080/websocket', {
    ca: caCert,
   // rejectUnauthorized: true
});

socket.onopen = () => {
    console.log('Connected to WebSocket server');
    socket.send('Hello Server!');
}; 

socket.addEventListener('open', () => {
  console.log('WebSocket connected');

  // Send a ping message every 1 minute (60 seconds)
  const pingInterval = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.ping();
      
    } else {
      clearInterval(pingInterval); // Stop sending pings if WebSocket is closed or not open
    }
  }, 60000); // 60 seconds in milliseconds

  // Handle pong messages (optional)
  socket.addEventListener('pong', () => {
    console.log('Received pong from server');
  });
});

socket.onmessage = (event) => {
    console.log(`Received: ${event.data}`);
};
