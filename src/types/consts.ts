import Combatant from './Combatant';

export const defaultCombatant: Combatant = {
  initiative: 3,
  name: 'Harmonious Jade',
  turnOver: false,
  onslaught: 0,
  parry: 0,
  dodge: 0,
  notes: '',

  motes: {
    personal: null,
    peripheral: null,
    hasRegainedMotesThisTurn: true,
  },

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
