import { firestore } from 'firebase';
import { RollInput, AttackRollInput } from '../Roll';
import { StaticValue } from '../Generic';
import { MoteCount, WillpowerCount } from '../Combatant';

type CharacterSheet = QuickCharacterSheet | FullCharacterSheet;

// Everything that all characters sheet types have
interface SheetDefaults {
  type: 'QUICK_CHARACTER_SHEET' | 'FULL_CHARACTER_SHEET';

  name: string;
  evasion: StaticValue;
  parry: StaticValue;
  owner: firestore.DocumentReference;

  motes: {
    personal: MoteCount;
    peripheral: MoteCount;
  } | null;

  health: {
    levels: Record<0 | 1 | 2 | 4 | 'I', number>;
    damage: {
      bashing: number;
      lethal: number;
      aggravated: number;
    };
  };

  willpower: WillpowerCount;
}

// QUICK CHARACTER
export interface QuickCharacterSheet extends SheetDefaults {
  type: 'QUICK_CHARACTER_SHEET';
  // FLUFF
  description: string;

  // STATBLOCK
  //   exalt: false;
  essence: number;
  joinBattle: RollInput;

  actions: { roll: RollInput; label: string }[];

  appearance: StaticValue;
  resolve: StaticValue;
  guile: StaticValue;

  // COMBAT
  attacks: { label: string; roll: AttackRollInput }[];
  combatMovement: RollInput;

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

// FULL CHARACTER
export interface FullCharacterSheet extends SheetDefaults {
  type: 'FULL_CHARACTER_SHEET';
}

export default CharacterSheet;
