import { Effect } from './effect.model';

export interface Card {
  name: string;
  description: string;
  cost: number;
  effects: Effect[];
  class: string; // this should maybe become a sort of enum?
  rarity: string; // this should maybe become a sort of enum?
}
