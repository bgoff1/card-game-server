import { createDeck, Deck } from '@models/deck.model';
import cards from '@data/cards.json';

test('it should create a deck', () => {
  const all = createDeck();
  const warrior = createDeck('warrior');
  expect(all).not.toEqual(warrior);
});

test('it should remove properties on get cards', () => {
  const deck = new Deck(cards);
  expect(deck.getCards()).not.toEqual(cards);
});

it('should have no cards if not initialized with them', () => {
  const deck = new Deck();
  expect(deck.getCards()).toEqual([]);
});
