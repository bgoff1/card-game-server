import WebSocket from 'ws';
import { Deck } from './deck.model';

export class Server {
  wss: WebSocket.Server;
  playerOneSocket?: WebSocket;
  playerTwoSocket?: WebSocket;
  constructor() {
    console.log(Number(process.env.PORT) || 8080);
    this.wss = new WebSocket.Server({ port: Number(process.env.PORT) || 8080 });
    this.setupServer();
  }

  setupServer() {
    this.wss.on('connection', ws => {
      console.log('Connection established!');

      if (this.wss.clients.size > 2) {
        for (const connection of this.wss.clients) {
          connection.close();
        }
      }
      if (this.wss.clients.size === 2) {
        this.setupConnections();
        this.startGame();
      }

      ws.on('message', message => {
        console.log('received: %s', message);
      });

      ws.on('close', () => {
        console.log('Connection closed!');
      });
    });
  }

  setupConnections() {
    let index = 0;
    for (const connection of this.wss.clients) {
      if (index === 0) {
        this.playerOneSocket = connection;
      } else {
        this.playerTwoSocket = connection;
      }
      ++index;
    }
  }

  startGame() {
    if (this.playerOneSocket && this.playerTwoSocket) {
      const { playerOne, playerTwo } = new Deck().splitDeck();
      console.log(playerOne.cards);
      console.log(playerTwo.cards);
      this.playerOneSocket.send(JSON.stringify(playerOne.cards));
      this.playerTwoSocket.send(JSON.stringify(playerTwo.cards));
    }
  }
}
