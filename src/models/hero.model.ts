export class Hero {
  health: number;
  handSize: number; //may not be necessary or used
  mana: number;
  maxMana: number;
  armor: number;

  constructor() {
    this.health = 30;
    this.handSize = 10;
    this.mana = 1;
    this.maxMana = 10;
    this.armor = 0;
  }

  takeDamage(damage: number) {
    this.health -= damage;
  }
}
