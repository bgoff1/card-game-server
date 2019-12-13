import WebSocket from 'ws';
console.log(Number(process.env.PORT) || 8080);
const wss = new WebSocket.Server({ port: Number(process.env.PORT) || 8080 });


wss.on('connection', ws => {
  console.log('Connection established!');

  if (wss.clients.size > 2) {
    for (const connection of wss.clients) {
      connection.close();
    }
  }
  if (wss.clients.size === 2) {
    startGame();
  }

  ws.on('message', message => {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('Connection closed!');
  });
});

function startGame() {}
