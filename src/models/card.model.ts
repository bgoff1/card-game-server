import { Effect } from './effect.model';

export interface Card {
  name: string;
  description: string;
  cost: number;
  effects: Effect[];
  class: string; // this should maybe become a sort of enum?
  rarity: string; // this should maybe become a sort of enum?
  maxQuantity: number; // this is a quick and cheap way of starting the deck with multiple of a card
}
