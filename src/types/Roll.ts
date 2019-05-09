import { firestore } from 'firebase';
import { WithDates, DamageType } from './Generic';

export interface RollConfig {
  dice: number;
  double: number[];
  reroll: number[];
  autosuccesses: number;
  targetNumber: number;
  difficulty: number;
}
export interface RollExcellency {
  maxExcellency: number;
  unit: 'DICE' | 'SUCCESSES';
  motesPerUnit: number;
}
export interface RollResult {
  successes: number;
  isBotch: boolean;
  roll: number[];
}

interface BaseRoll {
  config: RollConfig;
  excellency?: RollExcellency;
  result: RollResult;
}

type Roll = WithDates<BaseRoll & { owner: firestore.DocumentReference }>;

export default Roll;

export interface RollInput {
  config: Partial<BaseRoll['config']> & { dice: number };
  excellency?: BaseRoll['excellency'];
}

export interface AttackRollBase {
  // postLabel: string; // (for stuff like `at short range`)
  damage: {
    dice: number;
    type: DamageType;
    overwhelming?: number;
  };
}

export interface AttackRollInput extends RollInput, AttackRollBase {}
export interface AttackRoll extends Roll, AttackRollBase {}
