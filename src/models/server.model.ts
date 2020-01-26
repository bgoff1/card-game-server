import WebSocket from 'ws';
import { createDeck, Deck } from './deck.model';
import logger from '../config/logger';
import { Game } from './game.model';

export class Server {
  private static server: Server;
  private playerOneSocket?: WebSocket;
  private playerTwoSocket?: WebSocket;
  private wss: WebSocket.Server;

  private constructor() {
    logger.debug(Number(process.env.PORT) || 8080);
    this.wss = new WebSocket.Server({ port: Number(process.env.PORT) || 8080 });
    this.setupServer();
  }

  static start() {
    if (!Server.server) {
      Server.server = new Server();
    } else {
      throw new Error('Server already started!');
    }
  }

  private setupServer() {
    this.wss.on('connection', ws => {
      logger.info('Connection established!');

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
        logger.debug('received: %s');
        logger.debug(message);
      });

      ws.on('close', () => {
        logger.info('Connection closed!');
      });
    });
  }

  private setupConnections() {
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

  private startGame() {
    if (this.playerOneSocket && this.playerTwoSocket) {
      const game = new Game();
      logger.debug(game.playerOne.hand.getCards());
      logger.debug(game.playerTwo.hand.getCards());
      this.playerOneSocket.send(JSON.stringify(game.playerOne.hand.getCards()));
      this.playerTwoSocket.send(JSON.stringify(game.playerTwo.hand.getCards()));
    }
  }
}
