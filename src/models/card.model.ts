import { Effect } from './effect.model';

export interface Card {
  name: string;
  description: string;
  cost: number;
  effects: Effect[];
  class: string;
}
