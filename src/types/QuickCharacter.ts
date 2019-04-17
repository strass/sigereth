import { damageLevelKeys, DamageType } from './Generic';

type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Roll {
  dice: number;
  excellency?: {
    maxExcellency: number;
    unit: 'DICE' | 'SUCCESSES';
    motesPerUnit: number;
  };

  doubles?: OneToTen[];
  targetNumber?: OneToTen;
  reroll?: OneToTen[];
  autosuccesses?: number;
}

interface AttackRoll extends Roll {
  postLabel: string; // (for stuff like `at short range`)
  damage: {
    dice: number;
    type: DamageType;
  };
}

interface StaticValue {
  value: number;
  excellency: {
    maxExcellency: number;
    unit: 'SUCCESSES';
    motesPerUnit: number;
  };
}

interface QuickCharacter {
  // FLUFF
  name: string;
  description: string;

  // STATBLOCK
  //   exalt: false;
  essence: OneToTen;
  willpower: OneToTen;
  joinBattle: Roll;
  personalMotes: number;
  peripheralMotes: number;
  healthLevels: Record<0 | 1 | 2 | 4 | 'I', number>;
  actions: { roll: Roll; label: string }[];

  // COMBAT
  attacks: { label: string; roll: AttackRoll }[];
  combatMovement: Roll;
  evasion: StaticValue;
  parry: StaticValue;
  soak: number;
  hardness: number;

  // INTIMACIES
  intimacies: {
    type: 'PRINCIPLE' | 'TIE';
    level: 'MINOR' | 'MAJOR' | 'DEFINING';
    description: string;
  }[];

  // CHARMS
  charms: {
    charmCategories: string[];
    charms: {}[];
  };

  // CUSTOM SECTIONS (probably a collection?)

  // DISPLAY + ORDERING
}

export default QuickCharacter;
