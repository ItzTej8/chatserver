import { createServer } from 'http';
import { createSecureServer } from 'http2';
import { readFileSync } from 'fs';
import WebSocket, { WebSocketServer } from 'ws';
import cors from 'cors';

const corsOptions = {
    origin: 'https://localhost:8080',
    optionsSuccessStatus: 200
};

// Load the certificate, key, and CA files
const key = readFileSync('certs/key.pem');
const cert = readFileSync('certs/cert.pem');
const ca = readFileSync('certs/cert.pem');

// Create credentials object with passphrase via HTTP2
const credentials = {
    key: key,
    cert: cert,
    ca: ca,
    allowHTTP1: true,
    passphrase: 'Tej8'
};
// Create credentials object with passphrase via HTTP1
const credentials2 = {
  key: key,
  cert: cert,
  ca: ca,
  passphrase: 'Tej8'
};

const server = createSecureServer(credentials);
server.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});


// Create HTTPS server with credentials
//const server = https.createServer(credentials);

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
    //console.log('Received message:', message);
    try {
      const binaryData = Buffer.from(message);
      const data = JSON.parse(binaryData.toString());
      console.log('Received JSON:', data);

      switch (data.handler) {
        case 'chat':
          handleChatMessage(ws, data);
          break;
        case 'status':
          handleStatusUpdate(ws, data);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
      
      // ws.send(JSON.stringify({ response: 'Received your JSON data' }));
    } catch (error) {
      //console.error('Error parsing JSON:', error.message);
    }
  });

  ws.send('something');
});

