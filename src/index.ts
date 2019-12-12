import WebSocket from "ws";
console.log(Number(process.env.PORT) || 8080);
const wss = new WebSocket.Server({ port: Number(process.env.PORT) || 8080 });

let connectionCount = 0;

wss.on("connection", ws => {
  console.log("Connection established!");
  ++connectionCount;

  if (connectionCount > 2) {
    for (const connection of wss.clients) {
      connection.close();
      --connectionCount;
    }
  }

  ws.on("message", message => {
    console.log("received: %s", message);
  });

  ws.on("close", () => {
    console.log("Connection closed!");
  });
});
