import { Card, formatCard } from './card.model.js';
import cards from '../data/cards.json';
import { EffectType } from './effect-type.model.js';

export class Deck {
  private deck: Card[];
  constructor(deck?: Card[]) {
    // if a deck is provided, set deck to be that, otherwise set to empty array
    this.deck = deck ? deck : [];
    // this.shuffleDeck();
  }

  // shuffle seems not to be working, or at least is working inconsistently
  // shuffleDeck() {
  //   for (let i = this.deck.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
  //   }
  // }

  // Gets the cards and removes unneeded properties, such as effects and class name
  getCards() {
    return this.deck;
    // .map(card => {
    //   return {
    //     name: card.name,
    //     description: card.description,
    //     cost: card.cost
    //   };
    // });
  }
}

// Creates deck from name of class playing
// i.e. make a deck from all warrior cards, etc.
export function createDeck(deckName?: string) {
  const deckCards: Card[] = deckName
    ? cards
        .filter(
          card =>
            card.class.toLowerCase() === deckName.toLowerCase() &&
            card.rarity.toLowerCase() === 'starter' // is a starter deck card
        )
        .map(card => formatCard(card))
    : cards.map(card => formatCard(card));
  // if the number of this card is less than it's maxQuantity
  for (const card of deckCards) {
    while (
      deckCards.filter(eachCard => eachCard.name === card.name).length <
      card.maxQuantity
    ) {
      deckCards.push(card);
    }
  }
  return new Deck(deckCards);
}
