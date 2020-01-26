import { EffectType } from './effect-type.model';

export interface Effect {
    type: EffectType;
    value: number;
    trigger?: string;
}
