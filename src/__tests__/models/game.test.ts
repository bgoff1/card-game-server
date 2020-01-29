import { Game } from '@models/game.model';
import cards from '../data/cards.json';
import { formatCard } from '@models/card.model';

let game: Game;

beforeEach(() => {
  game = new Game();
});

test('it should do something', () => {
  expect(game.playerOne).toBeTruthy();
  expect(game.playerTwo).toBeTruthy();
});

test('it should play a card', () => {
  const p1hp = game.playerOne.hero.health;
  const p2hp = game.playerTwo.hero.health;
  const card = formatCard(cards.find(c => c.name === 'Strike'));

  game.playCard(card, 'playerOne');

  expect(game.playerOne.hero.health).toEqual(p1hp);
  expect(game.playerTwo.hero.health).not.toEqual(p2hp);

  game.playCard(card, 'playerTwo');

  expect(game.playerOne.hero.health).not.toEqual(p1hp);
  expect(game.playerTwo.hero.health).not.toEqual(p2hp);

  expect(game.playerOne.hero.health).toEqual(p1hp - card.effects[0].value);
  expect(game.playerOne.hero.health).toEqual(p2hp - card.effects[0].value);
  expect(game.playerOne.hero.health).toEqual(game.playerTwo.hero.health);
});

test('block should not do damage', () => {
  const card = formatCard(
    cards.find(c => !c.effects.map(effect => effect.type).includes('attack'))
  );
  const p1hp = game.playerOne.hero.health;
  const p2hp = game.playerTwo.hero.health;

  game.playCard(card, 'playerOne');

  expect(game.playerOne.hero.health).toEqual(p1hp);
  expect(game.playerTwo.hero.health).toEqual(p2hp);

  game.playCard(card, 'playerTwo');

  expect(game.playerOne.hero.health).toEqual(p1hp);
  expect(game.playerTwo.hero.health).toEqual(p2hp);
});

test('it should get the players health relative to who calls it', () => {
  expect(game.getPlayersHealth('playerOne')).toEqual({
    me: game.playerOne.hero,
    you: game.playerTwo.hero
  });
  expect(game.getPlayersHealth('playerTwo')).toEqual({
    me: game.playerTwo.hero,
    you: game.playerOne.hero
  });
});
