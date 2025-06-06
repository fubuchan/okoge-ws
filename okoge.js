const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('クライアント接続');
  ws.on('message', (message) => {
    console.log('受信:', message);
    ws.send(JSON.stringify({
      type: "response",
      message: "okogeから応答！"
    }));
  });
});

server.listen(process.env.PORT || 10000, () => {
  console.log('サーバ起動');
});
