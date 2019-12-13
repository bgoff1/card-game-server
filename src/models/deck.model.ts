import ranks from '../config/ranks.json';
import suits from '../config/suits.json';
import { Card } from './card.model.js';
import { Hand } from './hand.model.js';
import { PlayerHands } from './player-hands.model.js';

export class Deck {
  private deck: Card[];
  constructor() {
    this.deck = [];
    for (let rank = 0; rank < ranks.length; ++rank) {
      for (let suit = 0; suit < suits.length; ++suit) {
        this.deck.push(new Card(ranks[rank], suits[suit]));
      }
    }
    this.shuffleDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  splitDeck(): PlayerHands {
    const hand1: Card[] = [];
    for (let i = 0; i < this.deck.length / 2; ++i) {
      hand1.push(this.deck[i]);
    }
    const hand2: Card[] = [];
    for (let i = this.deck.length / 2; i < this.deck.length; ++i) {
      hand2.push(this.deck[i]);
    }
    return {
      playerOne: new Hand(hand1),
      playerTwo: new Hand(hand2)
    };
  }
}
