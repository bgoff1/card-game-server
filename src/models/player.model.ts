import { Deck, createDeck } from './deck.model';
import { Hero } from './hero.model';
import { Class } from './class.model';

export class Player {
  hand: Deck; // might need "deck" as well later
  hero: Hero;

  constructor(heroClass: Class) {
    this.hand = createDeck(heroClass);
    this.hero = new Hero(heroClass);
  }
}
