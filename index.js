import { createServer } from 'http';
import { createSecureServer } from 'http2';
import { readFileSync } from 'fs';
import WebSocket, { WebSocketServer } from 'ws';

const server = createSecureServer({
  cert: readFileSync('certs/cert.pem'),
  key: readFileSync('certs/key.pem'),
  allowHTTP1: true // Enable HTTP/1 support
});

// const server = createServer();

const wss = new WebSocketServer({
  server,
  path: '/websocket',
  backlog: 511,
  noServer: false,
  clientTracking: true,
  maxPayload: 1024 * 1024, // 1MB
  verifyClient: (info, callback) => {
    // Your validation logic here
    const isValid = true; // Example validation always returning true
    callback(isValid);
  },
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});

wss.on('connection', function connection(ws) {
  ws.on('error', function(error) {
    console.error('WebSocket error:', error);
  });

  ws.on('message', function(message) {
    console.log('Received message:', message);
  });

  ws.send('something');
});

server.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});
