import Combatant from './Combatant';
import { Omit } from '@emotion/styled-base/types/helper';

export const defaultCombatant: Omit<Combatant, 'owner'> = {
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
