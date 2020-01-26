import { Deck, createDeck } from './deck.model';
import { Player } from './player.model';

export class Game {
  playerOne: Player;
  playerTwo: Player;

  constructor() {
    this.playerOne = new Player('warrior');
    this.playerTwo = new Player('rogue');
  }
}
