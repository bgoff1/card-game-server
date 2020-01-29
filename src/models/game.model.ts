import { Player } from './player.model';
import { Card } from './card.model';

export class Game {
  playerOne: Player;
  playerTwo: Player;

  constructor() {
    this.playerOne = new Player('warrior');
    this.playerTwo = new Player('rogue');
  }

  playCard(card: Card, playedBy: 'playerOne' | 'playerTwo') {
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

  getPlayersHealth(player: 'playerOne' | 'playerTwo') {
    if (player === 'playerOne') {
      return { me: this.playerOne.hero, you: this.playerTwo.hero };
    } else {
      return { me: this.playerTwo.hero, you: this.playerOne.hero };
    }
  }
}
