import WebSocket, { WebSocketServer } from 'ws';
// import { createServer } from 'https';
import { createSecureServer } from 'http2';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';

// const server = createServer({
//   cert: readFileSync('/path/to/cert.pem'),
//   key: readFileSync('/path/to/key.pem')
// });

const server = createSecureServer({
  cert: readFileSync('/certs/cert.pem'),
  key: readFileSync('/certs/key.pem'),
  allowHTTP1: true // Enable HTTP/1 support
});


const wss = new WebSocketServer({
  server,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
});





wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  
    ws.send('something');
});


