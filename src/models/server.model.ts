import WebSocket from 'ws';
import { createDeck } from './deck.model';
import logger from '../config/logger';

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
      const playerOne = createDeck('warrior');
      const playerTwo = createDeck('rogue');
      logger.debug(playerOne.getCards());
      logger.debug(playerTwo.getCards());
      this.playerOneSocket.send(JSON.stringify(playerOne.getCards()));
      this.playerTwoSocket.send(JSON.stringify(playerTwo.getCards()));
    }
  }
}
