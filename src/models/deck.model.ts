import { Card } from './card.model.js';
import cards from '../config/cards.json';

class Deck {
  private deck: Card[];
  constructor(deck?: Card[]) {
    // if a deck is provided, set deck to be that, otherwise set to empty array
    this.deck = deck ? deck : [];
    this.shuffleDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  // Gets the cards and removes unneeded properties, such as effects and class name
  getCards() {
    return this.deck.map(card => {
      return {
        name: card.name,
        description: card.description,
        cost: card.cost
      };
    });
  }
}

export function numberOfCards(card: Card, deckCards: Card[]) {
  let quantity: number = 0;
  for (let cards of deckCards) {
    if (cards.name === card.name) {
      quantity++;
    }
  }
  return quantity;
}

// Creates deck from name of class playing
// i.e. make a deck from all warrior cards, etc.
export function createDeck(deckName?: string) {
  const deckCards: Card[] = deckName
    ? cards.filter(
        card =>
          card.class.toLowerCase() === deckName.toLowerCase() &&
          card.rarity.toLowerCase() === 'starter' // is a starter deck card
      )
    : cards;
  // if the number of this card is less than it's maxQuantity
  deckCards.forEach(card => {
    while (numberOfCards(card, deckCards) < card.maxQuantity) {
      // push the card back on the deck again
      deckCards.push(card);
    }
  });
  return new Deck(deckCards);
}
