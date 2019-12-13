import { Card } from './card.model';

export class Hand {
  cards: Card[] = [];
  constructor(cards: Card[]) {
    this.cards = cards;
  }
}
