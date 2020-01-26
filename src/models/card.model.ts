import { Effect } from './effect.model';
import { EffectType } from './effect-type.model';

export interface Card {
  name: string;
  description: string;
  cost: number;
  effects: Effect[];
  class: string; // this should maybe become a sort of enum?
  rarity: string; // this should maybe become a sort of enum?
  maxQuantity: number; // this is a quick and cheap way of starting the deck with multiple of a card
}

export function formatCard(card): Card {
  return {
    // keep all current card properties
    ...card,
    // update effects array
    effects: card.effects.map(effect => {
      // for each effect in the array
      return {
        // keep current properties
        ...effect,
        // update only the Type to be of EffectType
        type: effect.type as EffectType
      };
    })
  };
}
