import { Class } from './class.model';

export class Hero {
  health: number;
  handSize: number; // may not be necessary or used
  mana: number;
  maxMana: number;
  armor: number;
  heroClass: Class;

  constructor(playerClass: Class) {
    this.health = 30;
    this.handSize = 10;
    this.mana = 1;
    this.maxMana = 10;
    this.armor = 0;
    this.heroClass = playerClass;
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }
}
