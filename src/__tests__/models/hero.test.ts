import { Hero } from '@models/hero.model';

let hero: Hero;

beforeEach(() => {
  hero = new Hero();
});

test('it should do something', () => {
  expect(hero.health).toEqual(30);
  expect(hero.handSize).toEqual(10);
  expect(hero.armor).toEqual(0);
  expect(hero.mana).toEqual(1);
  expect(hero.maxMana).toEqual(10);
});

test('it should take damage', () => {
  hero.takeDamage(5);
  expect(hero.health).toEqual(30 - 5);
});
