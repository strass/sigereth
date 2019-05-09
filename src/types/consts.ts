import { Omit } from '@emotion/styled-base/types/helper';
import Combatant from './Combatant';
import { QuickCharacterSheet } from './Character/Sheet';

export const defaultCombatant: Omit<Combatant, 'owner' | 'sheet'> = {
  initiative: 3,
  name: 'Harmonious Jade',
  turnOver: false,
  onslaught: 0,
  parry: 0,
  dodge: 0,
  notes: '',
  ignoreOnslaught: false,

  motes: null,

  health: {
    damage: {
      bashing: 0,
      lethal: 0,
      aggravated: 0,
    },
    levels: {
      0: 1,
      1: 2,
      2: 2,
      4: 1,
      I: 1,
    },
  },

  willpower: {
    temporary: 3,
    permanent: 3,
  },
};

export const defaultQuickCharacter: Omit<QuickCharacterSheet, 'owner'> = {
  type: 'QUICK_CHARACTER_SHEET',

  name: 'test character',
  evasion: {
    value: 1,
  },
  parry: {
    value: 2,
  },
  // owner: firestore.DocumentReference,

  motes: {
    personal: { current: 13, total: 13 },
    peripheral: { current: 33, total: 33 },
  },

  health: {
    levels: { 0: 1, 1: 2, 2: 2, 4: 1, I: 1 },
    damage: {
      bashing: 0,
      lethal: 0,
      aggravated: 0,
    },
  },

  willpower: { temporary: 3, permanent: 3 },
  // FLUFF
  description: '',

  // STATBLOCK
  //   exalt: false,
  essence: 1,
  joinBattle: { config: { dice: 6 } },

  actions: [],

  appearance: {
    value: 1,
    excellency: {
      unit: 'SUCCESSES',
      maxExcellency: 2,
      motesPerUnit: 2,
    },
  },
  resolve: {
    value: 1,
    excellency: {
      unit: 'SUCCESSES',
      maxExcellency: 2,
      motesPerUnit: 2,
    },
  },
  guile: {
    value: 1,
    excellency: {
      unit: 'SUCCESSES',
      maxExcellency: 2,
      motesPerUnit: 2,
    },
  },

  // COMBAT
  attacks: [],
  combatMovement: {
    config: {
      dice: 1,
    },
  },

  soak: 1,
  hardness: 2,

  // INTIMACIES
  intimacies: [],

  // CHARMS
  charms: {
    charmCategories: [],
    charms: [],
  },
};
