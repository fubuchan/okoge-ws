const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('✅ クライアント接続');

  ws.on('message', (message) => {
    // 💬 messageがBufferの場合もあるので文字列に変換
    const msgText = message.toString();
    console.log('📩 受信:', msgText);

    // 🔁 他の全クライアントにテキスト形式で送信
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgText);  // 🔧 必ずテキストとして送る
      }
    });

    // ✅ 自分に応答
    ws.send(JSON.stringify({
      type: 'response',
      message: 'okogeから応答！'
    }));
  });
});

server.listen(process.env.PORT || 10000, () => {
  console.log('🚀 サーバー起動');
});
