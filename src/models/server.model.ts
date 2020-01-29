import WebSocket from 'ws';
import logger from '../config/logger';
import { Game } from './game.model';

export class Server {
  private static server: Server;
  private playerOneSocket!: WebSocket;
  private playerTwoSocket!: WebSocket;
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
      if (this.wss.clients.size === 1) {
        for (const connection of this.wss.clients) {
          this.playerOneSocket = connection;
        }
      }
      if (this.wss.clients.size === 2) {
        for (const connection of this.wss.clients) {
          if (connection !== this.playerOneSocket) {
            this.playerTwoSocket = connection;
          }
        }
        this.startGame();
      }
      if (this.wss.clients.size > 2) {
        for (const connection of this.wss.clients) {
          if (
            connection !== this.playerOneSocket &&
            connection !== this.playerTwoSocket
          ) {
            connection.close();
          }
        }
      }

      ws.on('close', () => {
        logger.info('Connection closed!');
      });
    });
  }

  private startGame() {
    const game = new Game();

    this.playerOneSocket.on('message', message => {
      const card = JSON.parse(message.toString());
      game.playCard(card, 'playerOne');
      this.playerTwoSocket.send(
        JSON.stringify({
          type: 'cardPlayed',
          card,
          players: game.getPlayersHealth('playerTwo')
        })
      );
      this.playerOneSocket.send(
        JSON.stringify({
          type: 'updateHeros',
          players: game.getPlayersHealth('playerOne')
        })
      );
    });

    this.playerTwoSocket.on('message', message => {
      const card = JSON.parse(message.toString());
      game.playCard(card, 'playerTwo');
      this.playerOneSocket.send(
        JSON.stringify({
          type: 'cardPlayed',
          card,
          players: game.getPlayersHealth('playerOne')
        })
      );
      this.playerTwoSocket.send(
        JSON.stringify({
          type: 'updateHeros',
          players: game.getPlayersHealth('playerTwo')
        })
      );
    });

    this.playerOneSocket.send(
      JSON.stringify({
        type: 'start',
        player: game.playerOne,
        players: game.getPlayersHealth('playerOne')
      })
    );
    this.playerTwoSocket.send(
      JSON.stringify({
        type: 'start',
        player: game.playerTwo,
        players: game.getPlayersHealth('playerTwo')
      })
    );
  }
}
