import { createDeck, Deck } from '@models/deck.model';

test('it should create a deck', () => {
  const all = createDeck();
  const warrior = createDeck('warrior');
  expect(all).not.toEqual(warrior);
});

it('should have no cards if not initialized with them', () => {
  const deck = new Deck();
  expect(deck.deck).toEqual([]);
});
