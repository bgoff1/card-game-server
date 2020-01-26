import { Player } from './player.model';
import { Card } from './card.model';
import logger from '../config/logger';

export class Game {
  playerOne: Player;
  playerTwo: Player;

  constructor() {
    this.playerOne = new Player('warrior');
    this.playerTwo = new Player('rogue');
  }

  playCard(card: Card, playedBy: 'playerOne' | 'playerTwo') {
    logger.debug(`${playedBy} playing ${JSON.stringify(card)}`);
    if (playedBy === 'playerOne') {
      for (const effect of card.effects) {
        if (effect.type === 'attack') {
          this.playerTwo.hero.takeDamage(effect.value);
        }
      }
    } else {
      for (const effect of card.effects) {
        if (effect.type === 'attack') {
          this.playerOne.hero.takeDamage(effect.value);
        }
      }
    }
  }
}
